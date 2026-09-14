import { execFileSync } from "node:child_process";

const base = "https://archiemcnicol.com";
const routes = [
  "/photography",
  "/photography/new-york-2026-06-10",
  "/photography/buckinghamshire-2026-04-29",
  "/photography/landscape-2026-04-18",
];

function curl(url, extra = []) {
  return execFileSync("curl", ["--silent", "--show-error", "--location", "--max-time", "30", ...extra, url], { encoding: "utf8" });
}

for (const route of routes) {
  const url = base + route;
  console.log(`\n=== ${url} ===`);
  const html = curl(url, ["--fail"]);
  console.log(`html bytes: ${Buffer.byteLength(html)}`);

  const srcValues = [...html.matchAll(/\ssrc="([^"]+)"/g)].map((match) => match[1].replaceAll("&amp;", "&"));
  const optimiserRefs = srcValues.filter((src) => src.includes("/_next/image?"));
  const directPhotoRefs = srcValues.filter((src) => src.includes("cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@c1d1e173"));

  console.log(`optimiser src refs: ${optimiserRefs.length}`);
  console.log(`direct pinned photo refs: ${directPhotoRefs.length}`);
  if (optimiserRefs.length) {
    throw new Error(`Production still renders ${optimiserRefs.length} Vercel optimiser URLs on ${route}`);
  }
  if (!directPhotoRefs.length) {
    throw new Error(`No direct pinned photography URLs found on ${route}`);
  }

  const imageUrl = directPhotoRefs[0];
  const output = curl(imageUrl, ["--fail", "--output", "/tmp/prod-image", "--write-out", "%{http_code} %{content_type} %{size_download} %{url_effective}"]);
  console.log(`direct image GET: ${output}`);
}
