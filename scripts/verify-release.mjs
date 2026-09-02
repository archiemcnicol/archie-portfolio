import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const brandWorkPath = path.join(repoRoot, "src/lib/brand-work.ts");
const portfolioPath = path.join(repoRoot, "src/lib/portfolio.ts");
const nextConfigPath = path.join(repoRoot, "next.config.ts");
const brandWork = fs.readFileSync(brandWorkPath, "utf8");
const portfolio = fs.readFileSync(portfolioPath, "utf8");
const nextConfig = fs.readFileSync(nextConfigPath, "utf8");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const publicCampaignIds = ["nike", "boss-bottled-beyond", "moschino-toy", "superdry-2024"];
for (const id of publicCampaignIds) {
  assert(brandWork.includes(`id: "${id}"`), `public campaign is missing: ${id}`);
}

const logoSources = [...brandWork.matchAll(/logoSrc:\s*"([^"]+)"/g)].map((match) => match[1]);
assert(logoSources.length === publicCampaignIds.length, "every public campaign must have one logo source");
for (const logoSource of logoSources) {
  assert(/^https:\/\//.test(logoSource), `logo source is not HTTPS: ${logoSource}`);
  assert(/commons\.wikimedia\.org|\.svg/.test(logoSource), `logo source does not look like an SVG asset: ${logoSource}`);
}
assert(nextConfig.includes('hostname: "commons.wikimedia.org"'), "Next image config must allow the logo host");
assert(nextConfig.includes('pathname: "/api/tiktok-cover"'), "Next image config must allow TikTok cover proxy images");

const tiktokLinks = [...brandWork.matchAll(/href:\s*"(https:\/\/vm\.tiktok\.com\/[^\"]+)"/g)].map(
  (match) => match[1],
);
assert(tiktokLinks.length >= publicCampaignIds.length, "each public campaign must retain a TikTok link");
assert(tiktokLinks.every((link) => link.startsWith("https://vm.tiktok.com/")), "TikTok links must use HTTPS short URLs");

assert(!/Nike[^\n]{0,100}SuperAwesome/i.test(brandWork), "agency names must not appear in the public Nike entry");
assert(
  /Sketch\.co — All Points East \/ Tyler, The Creator/.test(brandWork),
  "the roster must name Sketch.co as the client for the All Points East context",
);
assert(!/^\s*"All Points East"\s*,?$/m.test(brandWork), "All Points East must not be listed as the client");

const archiveCount = Number(portfolio.match(/sourcePhotoCount:\s*(\d+)/)?.[1] ?? 0);
const publicCount = Number(portfolio.match(/publicEditCount:\s*(\d+)/)?.[1] ?? 0);
const photoSources = [...portfolio.matchAll(/src:\s*"(\/portfolio\/web\/[^\"]+)"/g)].map((match) => match[1]);
assert(archiveCount === 619, `unexpected Drive archive count: ${archiveCount}`);
assert(publicCount === photoSources.length, `public edit count (${publicCount}) does not match photo entries (${photoSources.length})`);
assert(publicCount > 0 && publicCount < archiveCount, "the public edit should be a deliberate subset of the archive");
for (const source of photoSources) {
  const assetPath = path.join(repoRoot, "public", source.replace(/^\//, ""));
  assert(fs.existsSync(assetPath), `missing portfolio asset: ${source}`);
}

if (failures.length) {
  console.error("Release verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Release verification passed: ${publicCampaignIds.length} public campaigns, ${publicCount} portfolio images from a ${archiveCount}-image archive.`,
);
