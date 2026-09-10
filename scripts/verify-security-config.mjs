import fs from "node:fs";

const read = (path) => fs.readFileSync(path, "utf8");
const exists = (path) => fs.existsSync(path);
const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const gitignore = read(".gitignore");
const envExample = read(".env.example");
const nextConfig = read("next.config.ts");
const rootLayout = read("src/app/layout.tsx");
const packageJson = read("package.json");

assert(gitignore.includes(".env*"), "all .env variants must be ignored");
assert(gitignore.includes("!.env.example"), ".env.example must remain explicitly trackable");
assert(!/SUPABASE/i.test(envExample), "public runtime must not document unused Supabase environment variables");
assert(!/@supabase\//i.test(packageJson), "Supabase SDKs must not return as unused public runtime dependencies");

for (const retiredAdminVariable of ["ENABLE_ADMIN", "ADMIN_USERNAME", "ADMIN_PASSWORD", "NEXT_PUBLIC_ADMIN_"]) {
  assert(!envExample.includes(retiredAdminVariable), `retired admin variable remains documented: ${retiredAdminVariable}`);
}

assert(!exists("src/app/admin"), "retired admin utility must not return to the public source tree");
assert(!exists("src/app/api"), "public API routes require explicit security and rate-limit review");
assert(!exists("src/proxy.ts"), "authentication proxy should not exist without a private route that requires it");
assert(!exists("src/components/tiktok-scanner.tsx"), "retired TikTok audit UI must not return to the public source tree");
assert(!exists("src/lib/tiktok/campaigns.ts"), "private campaign audit data must not return to the public source tree");
assert(!exists("src/lib/supabase"), "unused Supabase runtime clients must not return to the public source tree");
assert(!exists("supabase/audit"), "private or one-off Supabase audit exports must not be committed to the public repository");

for (const header of [
  "Strict-Transport-Security",
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
]) {
  assert(nextConfig.includes(header), `security header missing: ${header}`);
}

// The public portfolio currently has no server API surface. If one is introduced,
// this guard intentionally fails so authentication, input validation and durable
// rate limiting are reviewed for the real endpoint instead of assumed globally.
assert(!nextConfig.includes('/api/tiktok-cover'), "removed TikTok proxy must not remain in image configuration");

// The only intentional raw HTML is static JSON-LD. Keep the '<' escaping that prevents
// an injected closing script tag if this metadata ever becomes dynamic in the future.
assert(rootLayout.includes('.replace(/</g, "\\\\u003c")'), "JSON-LD output must preserve '<' escaping");

if (failures.length) {
  console.error("Security configuration verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Security configuration verification passed.");
