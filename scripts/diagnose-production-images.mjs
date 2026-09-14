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
  console.log(`optimiser src refs: ${optimiserRefs.length}`);
  const first = optimiserRefs[0];
  if (!first) {
    console.log("NO OPTIMISER SRC FOUND");
    console.log(srcValues.slice(0, 5));
    continue;
  }

  const imageUrl = first.startsWith("http") ? first : base + first;
  console.log(`first optimiser URL: ${imageUrl}`);
  try {
    const output = curl(imageUrl, ["--output", "/tmp/prod-image", "--write-out", "%{http_code} %{content_type} %{size_download} %{url_effective}"]);
    console.log(`optimiser GET: ${output}`);
    const preview = execFileSync("head", ["-c", "200", "/tmp/prod-image"], { encoding: "utf8" });
    console.log(`optimiser body prefix: ${JSON.stringify(preview)}`);
  } catch (error) {
    console.log("optimiser GET transport failed");
    console.log(error.stdout?.toString() || "");
    console.log(error.stderr?.toString() || "");
  }

  const decoded = new URL(imageUrl).searchParams.get("url") || "";
  console.log(`upstream URL: ${decoded}`);
  if (decoded) {
    const upstream = curl(decoded, ["--output", "/tmp/upstream-image", "--write-out", "%{http_code} %{content_type} %{size_download} %{url_effective}"]);
    console.log(`upstream GET: ${upstream}`);
  }
}
