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
const adminPage = read("src/app/admin/content/page.tsx");
const proxy = read("src/proxy.ts");
const rootLayout = read("src/app/layout.tsx");

assert(gitignore.includes(".env*"), "all .env variants must be ignored");
assert(gitignore.includes("!.env.example"), ".env.example must remain explicitly trackable");
assert(envExample.includes("ENABLE_ADMIN=false"), "admin utility must be disabled by default");
assert(envExample.includes("ADMIN_USERNAME="), "admin username variable is undocumented");
assert(envExample.includes("ADMIN_PASSWORD="), "admin password variable is undocumented");
assert(!envExample.includes("NEXT_PUBLIC_ADMIN_"), "admin credentials must never be public environment variables");

assert(proxy.includes('matcher: ["/admin/:path*"]'), "admin proxy matcher is missing");
assert(proxy.includes('authorization?.startsWith("Basic ")'), "admin authentication challenge is missing");
assert(proxy.includes('process.env.ADMIN_PASSWORD ?? ""'), "admin password must come from a server-only environment variable");
assert(proxy.includes("timingSafeEqual"), "admin credential comparison must remain timing-safe");
assert(!proxy.includes("VERCEL_ENV"), "preview deployments must not bypass admin authentication");
assert(!adminPage.includes("VERCEL_ENV"), "admin page must not auto-enable on preview deployments");
assert(adminPage.includes('process.env.ENABLE_ADMIN === "true"'), "admin page must fail closed unless explicitly enabled");

assert(proxy.includes("function logSecurityEvent"), "blocked admin access must emit security logs");
for (const event of [
  "admin_disabled_probe",
  "admin_auth_missing",
  "admin_auth_malformed",
  "admin_auth_invalid",
]) {
  assert(proxy.includes(event), `security event is missing: ${event}`);
}
assert(!/console\.(?:warn|log|error)[\s\S]{0,240}authorization/i.test(proxy), "security logs must not include Authorization headers");
assert(!/console\.(?:warn|log|error)[\s\S]{0,240}cookie/i.test(proxy), "security logs must not include cookies");

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
assert(!exists("src/app/api"), "public API routes require explicit security and rate-limit review");
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
