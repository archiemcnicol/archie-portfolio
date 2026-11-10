import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), "utf8");
const exists = (relativePath) => fs.existsSync(path.join(repoRoot, relativePath));

const brandWork = read("src/lib/brand-work.ts");
const creatorPage = read("src/app/creator/page.tsx");
const brandConsistency = read("src/app/creator/brand-work-consistency.module.css");
const creatorWorkStyles = read("src/app/creator/brand-work.module.css");
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

const publicCampaignIds = ["superdry-2024", "nike", "all-points-east-2026", "jean-paul-gaultier-le-male-2025", "moschino-toy", "puma-suede-2026", "boss-bottled-beyond"];
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
assert((whatnotSection.match(/platform: "TikTok"/g) ?? []).length === 7, "Whatnot must retain its original seven TikToks");
assert((whatnotSection.match(/platform: "Instagram"/g) ?? []).length === 8, "Whatnot must include eight verified Instagram Reels");
assert(whatnotSection.split('analytics: { views:').length - 1 === 15, "Whatnot must have seven TikTok and eight Instagram metric snapshots");
assert(whatnotSection.includes("TikTok figures captured 9 Nov; Instagram figures 10 Nov 2026"), "Whatnot platform-specific metric snapshot dates missing");
// Verify oldest-first ordering when the TikTok deliverables and Instagram Reels are interleaved.
const expectedWhatnotSequence = [
  "TikTok 1 · 3 Sep", "TikTok 2 · 10 Sep", "Instagram Reel · 10 Sep",
  "TikTok 3 · 16 Sep", "Instagram Reel · 16 Sep",
  "Instagram · wardrobe clear-out · 17 Sep",
  "TikTok 4 · 23 Sep", "Instagram Reel · 23 Sep",
  "TikTok 5 · 1 Oct", "Instagram Reel · 1 Oct",
  "TikTok 6 · 9 Oct", "Instagram Reel · 9 Oct",
  "TikTok 7 · 18 Oct", "Instagram Reel · 18 Oct",
  "Instagram Reel · 25 Oct",
];
let previousWhatnotDeliverable = -1;
for (const label of expectedWhatnotSequence) {
  const index = whatnotSection.indexOf(`label: "${label}"`);
  assert(index > previousWhatnotDeliverable, `Whatnot cross-platform chronology is wrong: ${label}`);
  previousWhatnotDeliverable = index;
}
assert(whatnotSection.includes("period: \"3 Sep–25 Oct 2026\""), "Whatnot period must include the additional 25 Oct Instagram Reel");

const archiveData = brandWork.slice(brandWork.indexOf("export const PARTNERSHIP_ROSTER:"));
const archiveBrandOrder = [...archiveData.matchAll(/\n  \{\n    brand: "([^"]+)"/g)].map((m) => m[1]);
// Brands newest first, based on latest documented campaign activity.
// Videos within multi-video campaigns stay oldest-to-newest.
const expectedArchiveOrder = [
  "Afrikana", "BOSS", "Whatnot", "PUMA", "All Points East", "Nike",
  "KORA Works", "Jean Paul Gaultier", "TILT",
  "DAVIDOFF", "Moschino", "The Supermade", "Inflation", "Domno Vintage",
  "Lyle & Scott", "KiLLOWEN", "Snoop", "WINTR", "Firmoo",
  "TEE CLAN", "VSZN", "SPYDA", "Unfounded Studios", "Superdry",
  "ALY", "Nowhere Specific", "In Print We Trust", "Vintage Crest",
  "Offshore Clothing",
];
assert(
  archiveBrandOrder.length === expectedArchiveOrder.length &&
  expectedArchiveOrder.every((name, index) => archiveBrandOrder[index] === name),
  "Creator work brands must be complete and newest-to-oldest by latest documented activity",
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
assert(archiveBrandOrder.indexOf("Snoop") > archiveBrandOrder.indexOf("KiLLOWEN") && archiveBrandOrder.indexOf("Snoop") < archiveBrandOrder.indexOf("WINTR"), "Snoop December 2024 must be positioned among the 2024 work");


const selectedCampaignData = brandWork.slice(
  brandWork.indexOf("export const PUBLIC_CAMPAIGNS:"),
  brandWork.indexOf("export const SELECTED_PERFORMANCE:"),
);
const selectedCampaignOrder = [...selectedCampaignData.matchAll(/\n  \{\n    id: "([^"]+)"/g)].map((match) => match[1]);
assert(selectedCampaignOrder.length === publicCampaignIds.length &&
  publicCampaignIds.every((id, index) => selectedCampaignOrder[index] === id),
  "Selected creative work must be ranked by featured TikTok views, with likes breaking equal-view ties");
assert(creatorPage.includes("ordered by its recorded TikTok views"), "Featured campaign performance ordering must be clearly disclosed");
// Featured view ranking (Superdry 28.6K; Nike 22.5K; APE 16.6K;
// JPG and Moschino 2.8K, tied by likes; PUMA 2,240; BOSS 1.8K).
const performanceRanking = [
  ["superdry-2024", 'views: "28.6K", likes: "665"'],
  ["nike", 'views: "22.5K", likes: "1,077"'],
  ["all-points-east-2026", 'views: "16.6K", likes: "1,048"'],
  ["jean-paul-gaultier-le-male-2025", 'views: "2.8K", likes: "164"'],
  ["moschino-toy", 'views: "2.8K", likes: "93"'],
  ["puma-suede-2026", 'views: "2,240", likes: "57"'],
  ["boss-bottled-beyond", 'views: "1.8K", likes: "88"'],
];
for (let i = 0; i < performanceRanking.length; i++) {
  const [id, pair] = performanceRanking[i];
  const currentStart = selectedCampaignData.indexOf(`id: "${id}"`);
  const currentEnd = selectedCampaignData.indexOf("\n  },", currentStart);
  assert(currentStart >= 0 && selectedCampaignData.slice(currentStart, currentEnd).includes(pair),
    `Performance pair missing or changed: ${id}`);
}
assert(selectedCampaignData.includes('id: "all-points-east-2026"') &&
  selectedCampaignData.includes('video/7678728230278303008') &&
  selectedCampaignData.includes('views: "16.6K", likes: "1,048"'),
  "All Points East must be featured with its strongest verified 27 August video");
assert(creatorPage.includes('videoId: "7678728230278303008"'), "All Points East must reuse the existing TikTok frame preview");
assert(archiveData.includes('brand: "All Points East"') &&
  archiveData.includes('views: "11.6K", likes: "374"'),
  "All Points East first video must remain in archive");
assert(!selectedCampaignData.includes('id: "afrikana-2026-11"'), "Afrikana must remain archive-only, not selected creative work");
assert(archiveData.includes('brand: "Afrikana"'), "Afrikana gifted PR must remain in Work Archive");
assert(!/ebay/i.test(brandWork), "Uncompleted eBay opportunity must not be represented as collaboration work");
assert(selectedCampaignData.includes('id: "jean-paul-gaultier-le-male-2025"'), "Jean Paul Gaultier must be a featured campaign");
assert(selectedCampaignData.includes('video/7552940839467633923'), "Jean Paul Gaultier featured TikTok link missing");
assert(creatorPage.includes('videoId: "7552940839467633923"'), "Jean Paul Gaultier must reuse the TikTok preview player without hosting media");
assert(selectedCampaignData.includes('id: "puma-suede-2026"'), "Confirmed PUMA gifting must be featured");
const pumaSelectedStart = selectedCampaignData.indexOf('id: "puma-suede-2026"');
const pumaSelectedEnd = selectedCampaignData.indexOf("\n  },", pumaSelectedStart);
const featuredPuma = selectedCampaignData.slice(pumaSelectedStart, pumaSelectedEnd);
assert(featuredPuma.includes("video/7695800477748972832"), "PUMA selected work must link to its 12 October published post");
assert(featuredPuma.includes('analytics: { views: "2,240", likes: "57" }'), "PUMA 12 October video must preserve the user-supplied view and like snapshot");
assert(creatorPage.includes('videoId: "7695800477748972832"'), "PUMA must use the existing TikTok video player instead of uploading another cover");
assert(creatorPage.includes("styles.coverFallback") && creatorPage.includes("styles.coverFallbackBrand"), "Selected campaigns without video must retain a safe fallback");
assert(!archiveData.includes('brand: "Moschino Toy Boy 2"'), "Unverified November Toy Boy 2 entry must not appear in Work Archive");
assert(archiveData.includes('brand: "Moschino"') && archiveData.includes("video/7519140859351174422"), "Original verified Moschino campaign must remain");

const logoSources = [...brandWork.matchAll(/logoSrc:\s*"([^"]+)"/g)].map((match) => match[1]);
assert(logoSources.length === publicCampaignIds.length - 3, "JPG, PUMA and All Points East use existing non-hosted text wordmarks; original logos must be preserved");
assert(creatorPage.includes("styles.logoWordmark"), "Selected work text wordmarks need a verified non-hosted fallback");
// Restore the previously approved optical sizes for five logos, changing
// only the geometry of BOSS and Nike, which have different mark proportions.
const expectedLogoStyles = [
  '.logo { display: block; width: 215px; height: 54px; object-fit: contain;',
  '.logoWordmark { color: #171717; display: inline-block; font-size: clamp(25px, 3.8vw, 38px);',
  '.logoWrap[data-brand="jean-paul-gaultier-le-male-2025"] .logoWordmark { font-size: clamp(21px, 2.4vw, 28px);',
  '.logoWrap[data-brand="all-points-east-2026"] .logoWordmark { font-size: clamp(22px, 2.6vw, 31px);',
  '.logoWrap[data-brand="moschino-toy"] .logo { width: 280px; height: 67px; }',
  '.logoWrap[data-brand="superdry-2024"] .logo { width: 282px; height: 68px; transform: scale(1.2);',
  '.logoWrap[data-brand="nike"] .logo { width: 198px; height: 60px; }',
  '.logoWrap[data-brand="boss-bottled-beyond"] .logo { width: 170px; height: 41px; }',
  '  .logoWrap[data-brand="nike"] .logo { width: 180px; height: 55px; }',
  '  .logoWrap[data-brand="boss-bottled-beyond"] .logo { width: 154px; height: 38px; }',
  '  .logoWrap[data-brand="moschino-toy"] .logo { width: 248px; height: 60px; }',
  '  .logoWrap[data-brand="superdry-2024"] .logo { width: 244px; height: 61px; transform: scale(1.16);',
];
for (const rule of expectedLogoStyles) assert(creatorWorkStyles.includes(rule),
  `Selected work brand logo sizing regressed: ${rule}`);
assert(!creatorWorkStyles.includes('width: 270px; max-width: 100%; height: 56px;'),
  "Do not restore the one-size-fits-all rule that made most brand marks oversized");
assert((creatorWorkStyles.split("\n").filter((line) => /^\s*\.logo\s*\{/.test(line))).length === 2 &&
  creatorWorkStyles.includes('  .logo { max-width: 100%; }'),
  "Keep the restored desktop base SVG sizing and responsive mobile max-width rule");

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

const featuredBossStart = selectedCampaignData.indexOf('id: "boss-bottled-beyond"');
const featuredBossEnd = selectedCampaignData.indexOf("\n  },", featuredBossStart);
const featuredBoss = selectedCampaignData.slice(featuredBossStart, featuredBossEnd);
assert(featuredBoss.includes('coverSrc: "/brand-work/boss-bottled-beyond-2025-10-04.webp"'), "BOSS selected work must reuse its stable, existing hero cover");
assert((featuredBoss.match(/coverSrc:/g) ?? []).length === 1, "BOSS selected work must not request another hosted cover");
const archiveBossStart = archiveData.indexOf('brand: "BOSS"');
const archiveBossEnd = archiveData.indexOf("\n  },", archiveBossStart);
const archiveBoss = archiveData.slice(archiveBossStart, archiveBossEnd);
assert((archiveBoss.match(/platform: "TikTok"/g) ?? []).length === 3, "BOSS archive must retain three TikTok videos");
assert((archiveBoss.match(/platform: "Instagram"/g) ?? []).length === 1, "BOSS archive must include one verified Instagram Reel");
assert(archiveBoss.split("analytics: { views:").length - 1 === 4, "BOSS TikTok and Instagram must retain four distinct metric snapshots");
assert(archiveBoss.indexOf("TikTok 1 · 4 Oct") < archiveBoss.indexOf("TikTok 2 · 7 Jan") && archiveBoss.indexOf("TikTok 2 · 7 Jan") < archiveBoss.indexOf("TikTok 3 · 30 Oct"), "BOSS archive must display all three videos oldest to newest");
const pumaStart = archiveData.indexOf('brand: "PUMA"');
const pumaEnd = archiveData.indexOf("\n  },", pumaStart);
const pumaSection = archiveData.slice(pumaStart, pumaEnd);
assert(pumaSection.includes("no posting obligation") && pumaSection.includes("video/7695800477748972832"), "PUMA published gifting video must be linked in the archive");
assert(pumaSection.includes('analytics: { views: "2,240", likes: "57" }'), "PUMA archival video views and likes must match user evidence");
// These 11 Reels are verified from the connected @archie.mcnicol Metricool
// history. Each value is a per-platform snapshot on 10 November 2026.
const newlyRecoveredReels = [
  ["Afrikana", "DfNRxPcMnf_", "11,966", "64"],
  ["BOSS", "DfIDW5bsc3u", "2,925", "12"],
  ["PUMA", "DeZi8rysvZ6", "1,766", "14"],
  ["Whatnot", "DdHRAw7MpaQ", "1,740", "10"],
  ["Whatnot", "DdWkYyIsDex", "1,468", "6"],
  ["Whatnot", "DdZLA3DsyST", "2,997", "21"],
  ["Whatnot", "DdooCeaM06M", "2,129", "14"],
  ["Whatnot", "Dd9jwLkhCp5", "1,282", "10"],
  ["Whatnot", "DeR7R7Guxyy", "1,224", "6"],
  ["Whatnot", "DepBQgMs7Vk", "1,318", "5"],
  ["Whatnot", "De7E5GMMRLB", "1,068", "2"],
];
for (const [brand, reelId, views, likes] of newlyRecoveredReels) {
  const start = archiveData.indexOf(`brand: "${brand}"`);
  const end = archiveData.indexOf("\n  },", start);
  const campaign = archiveData.slice(start, end);
  const reelUrl = `https://www.instagram.com/reel/${reelId}/`;
  assert(campaign.includes(`href: "${reelUrl}"`) &&
    campaign.includes(`views: "${views}", likes: "${likes}"`),
    `Verified Instagram permalink or metrics missing for ${brand}: ${reelId}`);
}
const instagramPermalinks = [...brandWork.matchAll(/https:\/\/www\.instagram\.com\/reel\/([\w-]+)\//g)].map((match) => match[1]);
assert(new Set(instagramPermalinks).size === 12, "The 11 new Instagram Reels and original Moschino Reel must be preserved without unrelated content");
assert(brandWork.includes("https://www.instagram.com/reel/DLP4vh6s_Kk/"), "Original Moschino Instagram Reel must remain");
assert(selectedCampaignData.includes("https://www.instagram.com/reel/DfIDW5bsc3u/"), "BOSS featured work must link to the October Instagram Reel");
assert(selectedCampaignData.includes("https://www.instagram.com/reel/DeZi8rysvZ6/"), "PUMA featured work must link to its matching Instagram Reel");
assert(creatorPage.includes('const instagramReels = campaign.links.filter'), "Selected Creative Work must expose its verified Instagram links");
assert(creatorPage.includes("styles.campaignActions"), "Selected campaign actions must use a dedicated vertical stack");
assert(creatorWorkStyles.includes(".campaignActions { display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-top: 16px; }"),
  "Selected campaign archive / Instagram / brand actions must stack vertically");
const actionStart = creatorPage.indexOf('<nav className={styles.campaignActions}');
const actionEnd = creatorPage.indexOf('</nav>', actionStart);
const actionMarkup = creatorPage.slice(actionStart, actionEnd);
assert(actionStart !== -1 && actionMarkup.indexOf('href="#work-archive"') < actionMarkup.indexOf('instagramReels.map') &&
  actionMarkup.indexOf('instagramReels.map') < actionMarkup.indexOf('Visit {campaign.brand}'),
  "Selected campaign links must display archive first, Instagram second, brand website last");


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
assert(creatorPage.includes("const deliverables = publicLinks.map"), "Work Archive must normalise both one-video and multi-video partnerships into the same cards");
assert(creatorPage.includes("const hasPerPostMetrics"), "Archive single-video metrics must be correctly assigned to the linked video");
assert(!creatorPage.includes("styles.archiveLinks") && !creatorPage.includes("styles.measuredDeliverables"), "Old inconsistent work-archive layout is still used");
assert(creatorPage.includes("styles.archiveMetricPending"), "Archive rows need a consistent fallback where statistics are unavailable");
assert(creatorPage.includes("styles.archiveUnlinkedDeliverable"), "Ad-only Snoop must have a non-linked deliverable row");
assert(brandConsistency.includes(".performanceAction"), "organic performance content action styling is missing");
assert(brandConsistency.includes(":global(.brand-page .brand-section)"), "Brand Work compact section spacing is missing");

const snoopStart = brandWork.indexOf('brand: "Snoop"');
const snoopEnd = brandWork.indexOf("\n  },", snoopStart);
const snoopSection = snoopStart >= 0 && snoopEnd > snoopStart ? brandWork.slice(snoopStart, snoopEnd) : "";
assert(snoopSection.includes("TikTok One"), "Snoop entry must retain TikTok One context");
assert(snoopSection.includes('period: "Dec 2024"') && snoopSection.includes("8 Dec 2024") && snoopSection.includes("15 Dec 2024"), "Snoop December date must match the Dec 8 approval and Dec 15 deadline emails");
assert(!snoopSection.includes("href:"), "Snoop ad-distributed creative must not get an invented public post URL");
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
