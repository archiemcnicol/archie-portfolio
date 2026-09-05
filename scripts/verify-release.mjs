import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(repoRoot, relativePath));

const brandWork = read("src/lib/brand-work.ts");
const creatorPage = read("src/app/creator/page.tsx");
const brandConsistency = read("src/app/creator/brand-work-consistency.module.css");
const portfolioArchive = read("src/lib/portfolio-archive.ts");
const photographyPage = read("src/app/photography/page.tsx");
const portfolioComponent = read("src/components/portfolio-archive.tsx");
const nextConfig = read("next.config.ts");
const siteConfig = read("src/lib/site.ts");
const llms = read("public/llms.txt");
const icon = read("src/app/icon.svg");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const publicCampaignIds = ["nike", "boss-bottled-beyond", "moschino-toy", "superdry-2024"];
for (const id of publicCampaignIds) assert(brandWork.includes(`id: "${id}"`), `public campaign is missing: ${id}`);

assert(/analytics:\s*\{ views: "22\.5K", likes: "1,077" \}/.test(brandWork), "Nike performance baseline has changed unexpectedly");
assert(brandWork.includes('views: "1.8K", likes: "88"'), "BOSS video 1 metrics are missing");
assert(brandWork.includes('views: "2.9K", likes: "134"'), "BOSS video 2 metrics are missing");
assert(brandWork.includes('views: "1.1K", likes: "37"'), "Whatnot metrics are missing");

const logoSources = [...brandWork.matchAll(/logoSrc:\s*"([^"]+)"/g)].map((match) => match[1]);
assert(logoSources.length === publicCampaignIds.length, "every selected public campaign must have one logo source");
for (const logoSource of logoSources) assert(/^https:\/\//.test(logoSource), `logo source is not HTTPS: ${logoSource}`);
assert(nextConfig.includes('hostname: "commons.wikimedia.org"'), "Next image config must allow the logo host");

const tiktokLinks = [...brandWork.matchAll(/href:\s*"(https:\/\/www\.tiktok\.com\/@fitswitharchie\/video\/\d+)"/g)].map((match) => match[1]);
assert(tiktokLinks.length >= 20, `expected a substantial canonical TikTok archive, found ${tiktokLinks.length} links`);
assert(!brandWork.includes("https://vm.tiktok.com/"), "legacy TikTok short links remain in brand-work data");

const selectedPerformanceLinks = [
  "7524743379410881814",
  "7524371608803265814",
  "7410796625053945120",
  "7480232374132018434",
  "7447955753240939808",
  "7499465138953653526",
];
for (const videoId of selectedPerformanceLinks) {
  assert(creatorPage.includes(videoId), `selected organic performance content link is missing: ${videoId}`);
}
assert(creatorPage.includes("PERFORMANCE_CONTENT_LINKS"), "selected organic performance must keep direct content links");
assert(creatorPage.includes("contentAnalytics"), "selected campaign content must use the shared analytics treatment");
assert(creatorPage.includes("archiveContentAnalytics"), "work archive content must use the shared analytics treatment");
assert(brandConsistency.includes(".contentCard"), "Brand Work unified content card styling is missing");
assert(brandConsistency.includes(".archiveContentCard"), "Brand Work unified archive content styling is missing");

const snoopStart = brandWork.indexOf('brand: "Snoop"');
const snoopEnd = brandWork.indexOf('brand: "Whatnot"', snoopStart);
const snoopSection = snoopStart >= 0 && snoopEnd > snoopStart ? brandWork.slice(snoopStart, snoopEnd) : "";
assert(snoopSection.includes("TikTok One"), "Snoop entry must retain TikTok One context");
assert(snoopSection.includes("Creators at For You Advertising"), "Snoop entry must identify Creators at For You Advertising as the creator-side source");
assert(!/Redpill|Candyce/i.test(snoopSection), "Snoop entry still contains the rejected Redpill/Candyce attribution");

assert(siteConfig.includes('email: "fitswitharchie@gmail.com"'), "public contact email must be fitswitharchie@gmail.com");
assert(!siteConfig.includes("archiemcnicol002@gmail.com"), "personal email remains in public site config");
assert(!llms.includes("archiemcnicol002@gmail.com"), "personal email remains in llms.txt");

assert(!icon.includes("<circle"), "favicon must not regress to the notification-dot treatment");
assert(icon.includes("stroke=\"#D8FF34\""), "favicon framing detail is missing");

const excludedNames = new Set(["IMG_2473.jpg", "IMG_2469.jpg", "Screenshot_20200502-010759_Instagram-Enhanced.jpg"]);
const archiveRecords = [...portfolioArchive.matchAll(/\{\s*"id":\s*"([^"]+)",\s*"src":\s*"([^"]+)",\s*"width":\s*(\d+),\s*"height":\s*(\d+),\s*"originalName":\s*"([^"]+)"\s*\}/g)].map((match) => ({ id: match[1], src: match[2], originalName: match[5] }));
const publicRecords = archiveRecords.filter((record) => !excludedNames.has(record.originalName));
assert(publicRecords.length > 500, `photography archive looks unexpectedly small: ${publicRecords.length}`);
assert(photographyPage.includes("<PortfolioArchive photos={PHOTOS} />"), "photography page must render the public archive");
assert(photographyPage.includes(".map(({ id, src, width, height })"), "photography page must strip filenames before serialising photos to the client");
assert(portfolioComponent.includes('Pick<ArchivePhoto, "id" | "src" | "width" | "height">'), "client photography component should only accept render fields");

for (const record of publicRecords) {
  const isLocalFeaturedImage = record.src.startsWith("/portfolio/web/");
  const isArchiveCdnImage = record.src.startsWith("https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/");
  assert(isLocalFeaturedImage || isArchiveCdnImage, `unexpected photography source: ${record.src}`);
  const sourcePath = isArchiveCdnImage ? new URL(record.src).pathname : record.src;
  const assetPath = isLocalFeaturedImage ? path.join(repoRoot, "public", sourcePath.replace(/^\//, "")) : path.join(repoRoot, "public", "portfolio", "archive", path.basename(sourcePath));
  assert(fs.existsSync(assetPath), `missing photography asset: ${record.src}`);
}

const requiredPublicFiles = [
  "src/app/not-found.tsx",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/icon.svg",
  "public/llms.txt",
  "src/lib/site.ts",
  "src/lib/profile-data.ts",
  "src/lib/affiliate-work.ts",
  "src/app/creator/brand-work-consistency.module.css",
  "src/app/identity-polish.css",
];
for (const file of requiredPublicFiles) assert(exists(file), `required public/SEO file is missing: ${file}`);

const publicPages = [
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/app/cv/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/business/page.tsx",
  "src/app/business/web/page.tsx",
  "src/app/affiliate/page.tsx",
  "src/app/affiliate/acbuy/page.tsx",
  "src/app/affiliate/usfans/page.tsx",
  "src/app/professional/page.tsx",
  "src/app/professional/capcut/page.tsx",
];
for (const page of publicPages) {
  assert(exists(page), `public page is missing: ${page}`);
  if (!exists(page)) continue;
  const content = read(page);
  assert(!/\bwill later\b|\bLater:\b|placeholder/i.test(content), `placeholder copy remains in ${page}`);
  assert(!content.includes("archiemcnicol002@gmail.com"), `personal email remains in ${page}`);
}

if (failures.length) {
  console.error("Release verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Release verification passed: ${publicCampaignIds.length} selected campaigns, ${selectedPerformanceLinks.length} linked organic-performance posts, ${tiktokLinks.length} archived TikTok links, ${publicRecords.length} public photographs and ${publicPages.length} checked public pages.`);
