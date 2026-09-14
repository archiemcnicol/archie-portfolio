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
  const matches = [...html.matchAll(/(?:src|srcSet)="([^"]*\/_next\/image\?[^\"]+)"/g)];
  console.log(`optimised image refs: ${matches.length}`);
  const first = matches[0]?.[1]?.replaceAll("&amp;", "&");
  if (!first) {
    console.log("NO OPTIMISED IMAGE URL FOUND");
    continue;
  }
  const imageUrl = first.startsWith("http") ? first : base + first;
  console.log(`first optimiser URL: ${imageUrl}`);
  try {
    const output = curl(imageUrl, ["--fail", "--output", "/tmp/prod-image", "--write-out", "%{http_code} %{content_type} %{size_download} %{url_effective}"]);
    console.log(`optimiser GET: ${output}`);
  } catch (error) {
    console.log("optimiser GET failed");
    console.log(error.stdout?.toString() || "");
    console.log(error.stderr?.toString() || "");
  }

  const decoded = new URL(imageUrl).searchParams.get("url") || "";
  console.log(`upstream URL: ${decoded}`);
  if (decoded) {
    try {
      const upstream = curl(decoded, ["--fail", "--output", "/tmp/upstream-image", "--write-out", "%{http_code} %{content_type} %{size_download} %{url_effective}"]);
      console.log(`upstream GET: ${upstream}`);
    } catch (error) {
      console.log("upstream GET failed");
      console.log(error.stdout?.toString() || "");
      console.log(error.stderr?.toString() || "");
    }
  }
}
