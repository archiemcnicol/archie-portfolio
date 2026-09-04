import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(repoRoot, relativePath));

const brandWork = read("src/lib/brand-work.ts");
const portfolioArchive = read("src/lib/portfolio-archive.ts");
const portfolioFinal = read("src/lib/portfolio-final.ts");
const photographyPage = read("src/app/photography/page.tsx");
const siteFrame = read("src/components/site-frame.tsx");
const nextConfig = read("next.config.ts");

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
assert(!nextConfig.includes("/api/portfolio-final"), "obsolete photography API config is still present");

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

const excludedNames = [
  "IMG_2473.jpg",
  "IMG_2469.jpg",
  "Screenshot_20200502-010759_Instagram-Enhanced.jpg",
];

const archiveRecords = [...portfolioArchive.matchAll(
  /\{\s*"id":\s*"([^"]+)",\s*"src":\s*"([^"]+)",\s*"width":\s*(\d+),\s*"height":\s*(\d+),\s*"originalName":\s*"([^"]+)"\s*\}/g,
)].map((match) => ({
  id: match[1],
  src: match[2],
  originalName: match[5],
}));

const finalRecords = [...portfolioFinal.matchAll(
  /\{ id: "([^"]+)", src: PACK_SRC, width: (\d+), height: (\d+), originalName: "([^"]+)" \}/g,
)].map((match) => ({ id: match[1], originalName: match[4] }));

const excludedArchiveRecords = archiveRecords.filter((record) => excludedNames.includes(record.originalName));
const excludedFinalRecords = finalRecords.filter((record) => excludedNames.includes(record.originalName));
const publicPhotoCount =
  archiveRecords.length + finalRecords.length - excludedArchiveRecords.length - excludedFinalRecords.length;

assert(archiveRecords.length > 0, "the photography archive must not be empty");
assert(finalRecords.length === 16, `expected 16 packed final photographs, found ${finalRecords.length}`);
assert(publicPhotoCount === 617, `expected 617 public photographs, found ${publicPhotoCount}`);
assert(photographyPage.includes("<PortfolioArchive photos={PHOTOS} />"), "photography page must render the scrolling archive");
assert(!photographyPage.includes("photo-hero"), "photography hero must stay removed");
assert(!photographyPage.includes("<h1"), "photography page must stay image-only");
assert(siteFrame.includes('pathname === "/photography"'), "site frame must recognise the photography route");
assert(siteFrame.includes("!isPhotography ? <SiteNav /> : null"), "photography route must hide the site navigation");
assert(exists("public/portfolio/archive/final-16-avif.pack"), "packed final photography asset is missing");
assert(!exists("src/app/api/portfolio-final/[id]/route.ts"), "obsolete final-photo API route still exists");
assert(!exists("src/lib/portfolio.ts"), "superseded featured photography data still exists");

for (const record of archiveRecords) {
  if (excludedNames.includes(record.originalName)) continue;

  const isLocalFeaturedImage = record.src.startsWith("/portfolio/web/");
  const isArchiveCdnImage = record.src.startsWith(
    "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/",
  );
  assert(isLocalFeaturedImage || isArchiveCdnImage, `unexpected photography source: ${record.src}`);

  const assetPath = isLocalFeaturedImage
    ? path.join(repoRoot, "public", record.src.replace(/^\//, ""))
    : path.join(repoRoot, "public", "portfolio", "archive", path.basename(record.src));
  assert(fs.existsSync(assetPath), `missing photography asset: ${record.src}`);
}

if (failures.length) {
  console.error("Release verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Release verification passed: ${publicCampaignIds.length} public campaigns and ${publicPhotoCount} public photographs.`,
);
