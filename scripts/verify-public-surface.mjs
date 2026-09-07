import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function readTreeFiles(relativeDir) {
  const absoluteDir = path.join(root, relativeDir);
  const files = [];

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const relativePath = path.join(relativeDir, entry.name);
    if (entry.isDirectory()) {
      files.push(...readTreeFiles(relativePath));
      continue;
    }

    if (/\.(?:ts|tsx|js|mjs|json|md|txt|css)$/i.test(entry.name)) {
      files.push({ path: relativePath, content: read(relativePath) });
    }
  }

  return files;
}

const site = read("src/lib/site.ts");
const llms = read("public/llms.txt");
const readme = read("README.md");
const openGraph = read("src/app/opengraph-image.tsx");
const sitemap = read("src/app/sitemap.ts");
const robots = read("src/app/robots.ts");
const layout = read("src/app/layout.tsx");
const affiliatePublic = read("src/lib/affiliate-public.ts");
const publicSourceFiles = [...readTreeFiles("src"), ...readTreeFiles("public")];

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(site.includes('location: "United Kingdom"'), "public location must remain United Kingdom");
assert(!site.includes("github:"), "GitHub must not return to PUBLIC_PROFILE");
assert(!layout.includes("PUBLIC_PROFILE.github"), "GitHub must not return to public structured data");

for (const [label, content] of [
  ["llms.txt", llms],
  ["README", readme],
  ["OpenGraph image", openGraph],
]) {
  assert(!/based in Buckinghamshire|Buckinghamshire · United Kingdom/i.test(content), `${label} exposes a more specific personal location`);
}

assert(!/github\.com\/archiemcnicol/i.test(llms), "llms.txt must not promote the GitHub profile");
assert(!/^\s*- \/cv\b/m.test(llms), "llms.txt must not list the legacy /cv redirect as a public route");
assert(readme.includes("`/cv` is a legacy redirect"), "README must describe /cv as a legacy redirect");
assert(/Partner-level performance records are retained in private Supabase storage/i.test(readme), "README must describe private performance storage accurately");

assert(sitemap.includes("PHOTOGRAPHY_SERIES"), "sitemap must include the public photography taxonomy");
assert(sitemap.includes("`/photography/${series.slug}`"), "sitemap must emit individual photography project URLs");
assert(robots.includes('"/affiliate/"'), "robots.txt must block any future nested affiliate routes generically");

const affiliateDir = path.join(root, "src/app/affiliate");
const nestedAffiliateDirs = fs.readdirSync(affiliateDir, { withFileTypes: true }).filter((entry) => entry.isDirectory());
assert(nestedAffiliateDirs.length === 0, `public source contains nested affiliate route directories: ${nestedAffiliateDirs.map((entry) => entry.name).join(", ")}`);
assert(!exists("src/lib/affiliate-work.ts"), "partner-level affiliate data file must not exist in the public tree");
assert(exists("src/lib/affiliate-public.ts"), "anonymised public affiliate data file is missing");
assert(!/\bactivations?\b/i.test(affiliatePublic), "activation detail must not be stored in the public affiliate data file");
assert(!/partner_key|display_name/i.test(affiliatePublic), "private partner-record fields leaked into the public affiliate data file");

for (const privatePartnerName of ["ACBuy", "USFans", "SugarGoo"]) {
  const matcher = new RegExp(privatePartnerName, "i");
  const matches = publicSourceFiles.filter((file) => matcher.test(file.content)).map((file) => file.path);
  assert(matches.length === 0, `${privatePartnerName} leaked back into current public source: ${matches.join(", ")}`);
}

if (failures.length) {
  console.error("Public surface verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Public surface verification passed: privacy, public-route documentation, sitemap coverage and crawler exclusions are aligned.");
