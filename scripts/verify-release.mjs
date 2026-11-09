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
const photographySeries = read("src/lib/photography-series.ts");
const photographyExplorer = read("src/components/photography-explorer.tsx");
const portfolioComponent = read("src/components/portfolio-archive.tsx");
const portfolioStyles = read("src/components/portfolio-archive.module.css");
const rootLayout = read("src/app/layout.tsx");
const nextConfig = read("next.config.ts");
const siteConfig = read("src/lib/site.ts");
const profileData = read("src/lib/profile-data.ts");
const homePage = read("src/app/page.tsx");
const businessPage = read("src/app/business/page.tsx");
const llms = read("public/llms.txt");
const icon = read("src/app/icon.svg");
const affiliateData = read("src/lib/affiliate-public.ts");
const affiliateLanding = read("src/app/affiliate/page.tsx");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

const publicCampaignIds = ["nike", "boss-bottled-beyond", "jean-paul-gaultier-le-male-2025", "moschino-toy", "puma-suede-2026", "superdry-2024"];
for (const id of publicCampaignIds) assert(brandWork.includes(`id: "${id}"`), `public campaign is missing: ${id}`);

assert(/analytics:\s*\{ views: "22\.5K", likes: "1,077" \}/.test(brandWork), "Nike performance baseline has changed unexpectedly");
assert(brandWork.includes('views: "1.8K", likes: "88"'), "BOSS video 1 metrics are missing");
assert(brandWork.includes('views: "2.9K", likes: "134"'), "BOSS video 2 metrics are missing");
assert(brandWork.includes('href: "https://www.tiktok.com/@fitswitharchie/video/7702502196876709142"'), "new October 2026 BOSS video is missing");
assert(brandWork.includes('views: "1,948", likes: "86"'), "new October 2026 BOSS video metrics are missing");
assert(brandWork.includes('href: "https://www.tiktok.com/@fitswitharchie/video/7703245313171066134"'), "Afrikana published video is missing");
assert(brandWork.includes('views: "4,827", likes: "164"'), "Afrikana video metrics are missing");
assert(brandWork.includes('brand: "PUMA"') && brandWork.includes("PUMA Suede Classic"), "PUMA confirmed product gifting is missing");
// Whatnot archive: seven original posts, from first publication to seventh.
const whatnotStart = brandWork.indexOf('brand: "Whatnot"');
const whatnotEnd = brandWork.indexOf("\n  },", whatnotStart);
const whatnotSection = whatnotStart >= 0 && whatnotEnd > whatnotStart ? brandWork.slice(whatnotStart, whatnotEnd) : "";
const expectedWhatnotPosts = [
  ["TikTok 1 · 3 Sep", "474.4K", "282"],
  ["TikTok 2 · 10 Sep", "370.5K", "156"],
  ["TikTok 3 · 16 Sep", "258.5K", "121"],
  ["TikTok 4 · 23 Sep", "349.5K", "180"],
  ["TikTok 5 · 1 Oct", "163.4K", "101"],
  ["TikTok 6 · 9 Oct", "175.2K", "72"],
  ["TikTok 7 · 18 Oct", "366.1K", "141"],
];
let previousWhatnotIndex = -1;
for (const [label, views, likes] of expectedWhatnotPosts) {
  const row = `label: "${label}"`;
  const index = whatnotSection.indexOf(row);
  assert(index > previousWhatnotIndex, `Whatnot chronology or video row is wrong: ${label}`);
  previousWhatnotIndex = index;
  assert(whatnotSection.includes(`views: "${views}", likes: "${likes}"`), `Whatnot metrics are incorrect for ${label}`);
}
assert(whatnotSection.split('analytics: { views:').length - 1 === 7, "Whatnot must have exactly seven measured rows");
assert(whatnotSection.includes("Performance captured 9 Nov 2026"), "Whatnot metrics require a snapshot date");

const archiveData = brandWork.slice(brandWork.indexOf("export const PARTNERSHIP_ROSTER:"));
const archiveBrandOrder = [...archiveData.matchAll(/\n  \{\n    brand: "([^"]+)"/g)].map((m) => m[1]);
// Full archive is chronological by the last dated deliverable in each campaign.
// Campaigns with several publications retain their earliest-to-latest order internally.
const expectedArchiveOrder = [
  "Offshore Clothing", "Vintage Crest", "In Print We Trust", "Nowhere Specific",
  "ALY", "Superdry", "Unfounded Studios", "SPYDA", "VSZN", "TEE CLAN",
  "Firmoo", "WINTR", "KiLLOWEN", "Lyle & Scott", "Domno Vintage",
  "Inflation", "The Supermade", "Moschino", "DAVIDOFF", "TILT",
  "Jean Paul Gaultier", "Moschino Toy Boy 2", "KORA Works", "Nike", "All Points East",
  "PUMA", "Whatnot", "BOSS", "Afrikana", "Snoop",
];
assert(
  archiveBrandOrder.length === expectedArchiveOrder.length &&
  expectedArchiveOrder.every((name, index) => archiveBrandOrder[index] === name),
  "Creator archive must be complete and oldest-to-newest by final dated deliverable",
);
for (const [brand, first, second] of [
  ["All Points East", "TikTok 1", "TikTok 2"],
  ["TILT", "TikTok 1", "TikTok 2"],
  ["Unfounded Studios", "TikTok 1", "TikTok 2"],
]) {
  const start = archiveData.indexOf(`brand: "${brand}"`);
  const end = archiveData.indexOf("\n  },", start);
  const card = archiveData.slice(start, end);
  assert(card.indexOf(`label: "${first}"`) < card.indexOf(`label: "${second}"`), `${brand} videos must display oldest first`);
}
assert(archiveBrandOrder.at(-1) === "Snoop", "Undated brand work should remain after dated campaigns");


const selectedCampaignData = brandWork.slice(
  brandWork.indexOf("export const PUBLIC_CAMPAIGNS:"),
  brandWork.indexOf("export const SELECTED_PERFORMANCE:"),
);
assert(!selectedCampaignData.includes('id: "afrikana-2026-11"'), "Afrikana must remain archive-only, not selected creative work");
assert(archiveData.includes('brand: "Afrikana"'), "Afrikana gifted PR must remain in Work Archive");
assert(!/ebay/i.test(brandWork), "Uncompleted eBay opportunity must not be represented as collaboration work");
assert(selectedCampaignData.includes('id: "jean-paul-gaultier-le-male-2025"'), "Jean Paul Gaultier must be a featured campaign");
assert(selectedCampaignData.includes('video/7552940839467633923'), "Jean Paul Gaultier featured TikTok link missing");
assert(creatorPage.includes('videoId: "7552940839467633923"'), "Jean Paul Gaultier must reuse the TikTok preview player without hosting media");
assert(selectedCampaignData.includes('id: "puma-suede-2026"'), "Confirmed PUMA gifting must be featured");
const pumaSelectedStart = selectedCampaignData.indexOf('id: "puma-suede-2026"');
const pumaSelectedEnd = selectedCampaignData.indexOf('id: "superdry-2024"', pumaSelectedStart);
const featuredPuma = selectedCampaignData.slice(pumaSelectedStart, pumaSelectedEnd);
assert(featuredPuma.includes("links: []") && !featuredPuma.includes("analytics:"), "PUMA gifting must not be assigned unverified video statistics");
assert(creatorPage.includes("styles.coverFallback") && creatorPage.includes("styles.coverFallbackBrand"), "PUMA text-only campaign media fallback is missing");
const toyBoy2Start = archiveData.indexOf('brand: "Moschino Toy Boy 2"');
const toyBoy2End = archiveData.indexOf("\n  },", toyBoy2Start);
const toyBoy2Section = archiveData.slice(toyBoy2Start, toyBoy2End);
assert(toyBoy2Section.includes("submitted for approval") && !toyBoy2Section.includes("analytics:") && !toyBoy2Section.includes("href:"), "Moschino Toy Boy 2 must not imply unverified public publication or metrics");

const logoSources = [...brandWork.matchAll(/logoSrc:\s*"([^"]+)"/g)].map((match) => match[1]);
assert(logoSources.length === publicCampaignIds.length - 2, "Only JPG and PUMA should use text wordmarks; approved existing campaign logos must be preserved");
assert(creatorPage.includes("styles.logoWordmark"), "Selected work text wordmarks need a verified non-hosted fallback");
assert(brandWork.includes('logoAlt: "Jean Paul Gaultier wordmark"'), "Jean Paul Gaultier text wordmark missing");
assert(brandWork.includes('logoAlt: "PUMA wordmark"'), "PUMA text wordmark missing");
assert(brandConsistency.includes(".performanceAction"), "organic performance content action styling is missing");
for (const logoSource of logoSources) assert(/^https:\/\//.test(logoSource), `logo source is not HTTPS: ${logoSource}`);
assert(nextConfig.includes('hostname: "commons.wikimedia.org"'), "Next image config must allow the logo host");

const tiktokLinks = [...brandWork.matchAll(/href:\s*"(https:\/\/www\.tiktok\.com\/@fitswitharchie\/video\/\d+)"/g)].map((match) => match[1]);
assert(tiktokLinks.length >= 20, `expected a substantial canonical TikTok archive, found ${tiktokLinks.length} links`);
// Permit only these links supplied in the Whatnot Creator Programme's official
// video-specific selection emails; all other campaign links stay canonical.
const whatnotSelectionLinks = new Set([
  "https://vm.tiktok.com/ZGdQPEYYo/",
  "https://vm.tiktok.com/ZGdQbQc9e/",
  "https://vm.tiktok.com/ZGdQo9JoQ/",
  "https://vm.tiktok.com/ZGdCr52WA/",
  "https://vm.tiktok.com/ZGdCQoba8/",
]);
const shortLinks = [...brandWork.matchAll(/href:\s*"(https:\/\/vm\.tiktok\.com\/[^"]+)"/g)].map((match) => match[1]);
assert(shortLinks.length === whatnotSelectionLinks.size && shortLinks.every((url) => whatnotSelectionLinks.has(url)), "Unexpected or missing TikTok short links in brand-work data");

const featuredBoss = brandWork.slice(brandWork.indexOf('id: "boss-bottled-beyond"'), brandWork.indexOf('id: "jean-paul-gaultier-le-male-2025"'));
assert(featuredBoss.includes('coverSrc: "/brand-work/boss-bottled-beyond-2025-10-04.webp"'), "BOSS selected work must reuse its stable, existing hero cover");
assert((featuredBoss.match(/coverSrc:/g) ?? []).length === 1, "BOSS selected work must not request another hosted cover");
const archiveBossStart = archiveData.indexOf('brand: "BOSS"');
const archiveBossEnd = archiveData.indexOf("\n  },", archiveBossStart);
const archiveBoss = archiveData.slice(archiveBossStart, archiveBossEnd);
assert(archiveBoss.split("analytics: { views:").length - 1 === 3, "BOSS archive must retain three individually measured videos");
assert(archiveBoss.indexOf("TikTok 1 · 4 Oct") < archiveBoss.indexOf("TikTok 2 · 7 Jan") && archiveBoss.indexOf("TikTok 2 · 7 Jan") < archiveBoss.indexOf("TikTok 3 · 30 Oct"), "BOSS archive must display all three videos oldest to newest");
const pumaStart = archiveData.indexOf('brand: "PUMA"');
const pumaEnd = archiveData.indexOf("\n  },", pumaStart);
const pumaSection = archiveData.slice(pumaStart, pumaEnd);
assert(pumaSection.includes("no posting obligation") && !pumaSection.includes("analytics:"), "PUMA product gifting must not be represented as measured posted content");

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
assert(creatorPage.includes('alternates: { canonical: "/creator" }'), "Brand Work canonical URL is missing");
assert(creatorPage.includes("styles.covers"), "selected creative work must retain the preferred large-cover layout");
assert(creatorPage.includes("styles.analytics"), "selected creative work analytics treatment is missing");
assert(creatorPage.includes("const featuredAnalytics = featuredLink?.analytics ?? campaign.analytics"), "featured campaign metric fallback is missing");
assert(creatorPage.includes(").slice(0, 1);"), "selected work must display only one hero cover per campaign");
assert(!creatorPage.includes("styles.measuredDeliverables"), "selected work still shows the old duplicate metric tiles");
assert(creatorPage.includes('href="#work-archive"'), "additional selected campaign posts must link to the archive");
assert(creatorPage.includes("styles.archiveDeliverables"), "work archive must retain the preferred compact deliverable layout");
assert(creatorPage.includes("styles.archiveLinks"), "work archive compact link treatment is missing");
assert(brandConsistency.includes(".performanceAction"), "organic performance content action styling is missing");
assert(brandConsistency.includes(":global(.brand-page .brand-section)"), "Brand Work compact section spacing is missing");

const snoopStart = brandWork.indexOf('brand: "Snoop"');
const snoopEnd = brandWork.indexOf("\n  },", snoopStart);
const snoopSection = snoopStart >= 0 && snoopEnd > snoopStart ? brandWork.slice(snoopStart, snoopEnd) : "";
assert(snoopSection.includes("TikTok One"), "Snoop entry must retain TikTok One context");
assert(snoopSection.includes("Creators at For You Advertising"), "Snoop entry must identify Creators at For You Advertising as the creator-side source");
assert(!/Redpill|Candyce/i.test(snoopSection), "Snoop entry still contains the rejected Redpill/Candyce attribution");

assert(siteConfig.includes('email: "fitswitharchie@gmail.com"'), "public contact email must be fitswitharchie@gmail.com");
assert(!siteConfig.includes("archiemcnicol002@gmail.com"), "personal email remains in public site config");
assert(!llms.includes("archiemcnicol002@gmail.com"), "personal email remains in llms.txt");

assert(!icon.includes("<circle"), "favicon must not regress to the notification-dot treatment");
assert(!/#D8FF34/i.test(icon), "legacy green favicon accent has returned");
assert(!/<rect[^>]+rx=/i.test(icon), "favicon must not regress to the rounded app-tile frame");
assert(icon.includes('aria-label="Archie McNicol editorial A mark"'), "editorial A favicon identity is missing");
assert(icon.includes('fill="#F4F4F1"'), "favicon must retain the off-white editorial A");
assert(rootLayout.includes('card: "summary_large_image"'), "large Twitter/X share cards must remain enabled");

// The public performance page is intentionally aggregate-only. It may show the approved
// users-versus-parcels monthly graph, but partner identity and activation detail stay outside
// the public source tree.
assert(affiliateLanding.includes("COMMERCE_LIFETIME_PUBLIC"), "affiliate landing page must remain lifetime-first");
assert(affiliateLanding.includes("COMMERCE_MONTHLY_PUBLIC"), "public affiliate landing must retain the approved monthly users-versus-parcels graph");
assert(!/activation/i.test(affiliateLanding), "activation detail has returned to the public affiliate landing");
assert(!/\bactivations?\b/i.test(affiliateData), "activation detail has returned to the public affiliate data file");
assert(!exists("src/lib/affiliate-work.ts"), "legacy partner-level affiliate data file still exists");

const affiliateDir = path.join(repoRoot, "src/app/affiliate");
const nestedAffiliateDirs = fs.readdirSync(affiliateDir, { withFileTypes: true }).filter((entry) => entry.isDirectory());
assert(nestedAffiliateDirs.length === 0, `nested affiliate route directories remain in public source: ${nestedAffiliateDirs.map((entry) => entry.name).join(", ")}`);
const nestedPublicRoutes = [...siteConfig.matchAll(/"\/affiliate\/[^\"]+"/g)];
assert(nestedPublicRoutes.length === 0, "nested affiliate route leaked into PUBLIC_ROUTES");

const excludedNames = new Set(["IMG_2473.jpg", "IMG_2469.jpg", "Screenshot_20200502-010759_Instagram-Enhanced.jpg"]);
const archiveRecords = [...portfolioArchive.matchAll(/\{\s*"id":\s*"([^"]+)",\s*"src":\s*"([^"]+)",\s*"width":\s*(\d+),\s*"height":\s*(\d+),\s*"originalName":\s*"([^"]+)"\s*\}/g)].map((match) => ({ id: match[1], src: match[2], originalName: match[5] }));
const publicRecords = archiveRecords.filter((record) => !excludedNames.has(record.originalName));
assert(publicRecords.length > 500, `photography archive looks unexpectedly small: ${publicRecords.length}`);

const catalogueType = photographySeries.match(/export type CataloguePhoto = ([\s\S]*?)\n};/)?.[0] ?? "";
assert(catalogueType.length > 0, "CataloguePhoto public client type could not be located");
assert(catalogueType.includes('Pick<ArchivePhoto, "id" | "src" | "width" | "height">'), "CataloguePhoto must derive its archive fields from the approved public render subset");
assert(!catalogueType.includes("originalName"), "original photography filenames must not enter CataloguePhoto client data");
assert(photographyPage.includes("buildPhotographyCatalogue(RAW_PHOTOS)"), "photography page must pass archive records through the public catalogue builder");
assert(photographyPage.includes("<PhotographyExplorer photos={PHOTOS} series={SERIES} />"), "photography page must render the current filtered photography explorer");
assert(photographyExplorer.includes("photos: CataloguePhoto[]"), "photography explorer must only accept public CataloguePhoto records");
assert(portfolioComponent.includes("type PortfolioPhoto = CataloguePhoto"), "portfolio viewer must consume the public CataloguePhoto type");
assert(portfolioStyles.includes("content-visibility: auto"), "photography archive must preserve off-screen rendering containment");
assert(portfolioComponent.includes("returnFocusRef"), "photography viewer must restore focus after closing");
assert(portfolioComponent.includes("closeButtonRef"), "photography viewer must focus its close control when opened");

for (const record of publicRecords) {
  const isLocalFeaturedImage = record.src.startsWith("/portfolio/web/");
  const isArchiveCdnImage = record.src.startsWith("https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/");
  assert(isLocalFeaturedImage || isArchiveCdnImage, `unexpected photography source: ${record.src}`);
  const sourcePath = isArchiveCdnImage ? new URL(record.src).pathname : record.src;
  const assetPath = isLocalFeaturedImage
    ? path.join(repoRoot, "public", sourcePath.replace(/^\//, ""))
    : path.join(repoRoot, "public", "portfolio", "archive", path.basename(sourcePath));
  assert(fs.existsSync(assetPath), `missing photography asset: ${record.src}`);
}

const requiredPublicFiles = [
  "src/app/not-found.tsx",
  "src/app/sitemap.ts",
  "src/app/robots.ts",
  "src/app/icon.svg",
  "src/app/opengraph-image.tsx",
  "src/app/twitter-image.tsx",
  "public/llms.txt",
  "src/lib/site.ts",
  "src/lib/profile-data.ts",
  "src/lib/affiliate-public.ts",
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

assert(!profileData.includes("github.com"), "GitHub should not return to public profile data");
assert(!homePage.includes("archiemcnicol002@gmail.com"), "personal email remains on the homepage");
assert(!businessPage.includes("archiemcnicol002@gmail.com"), "personal email remains on the business page");

if (failures.length) {
  console.error("Release verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Release verification passed: ${publicCampaignIds.length} selected campaigns, ${selectedPerformanceLinks.length} linked organic-performance posts, ${tiktokLinks.length} archived TikTok links, ${publicRecords.length} public photographs and ${publicPages.length} checked public pages.`);
