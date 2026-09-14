import { execFileSync } from "node:child_process";

const base = "https://archiemcnicol.com";
const routes = [
  "/photography",
  "/photography/new-york-2026-06-10",
  "/photography/buckinghamshire-2026-04-29",
  "/photography/landscape-2026-04-18",
];

function curl(url, output = "/tmp/out") {
  return execFileSync(
    "curl",
    [
      "--silent",
      "--show-error",
      "--location",
      "--max-time",
      "30",
      "--output",
      output,
      "--write-out",
      "%{http_code} %{content_type} %{size_download} %{url_effective}",
      url,
    ],
    { encoding: "utf8" },
  );
}

for (const route of routes) {
  const page = `${base}${route}`;
  const html = execFileSync("curl", ["--fail", "--silent", "--show-error", "--location", page], { encoding: "utf8" });
  const optimiserCount = (html.match(/\/_next\/image\?/g) ?? []).length;
  const cloudinaryCount = (html.match(/res\.cloudinary\.com\/i1xhlvd6\/image\/fetch\//g) ?? []).length;
  const srcSetCount = (html.match(/srcset=/gi) ?? []).length;
  console.log(`${route}: optimiser=${optimiserCount} cloudinary=${cloudinaryCount} srcset=${srcSetCount}`);
  if (optimiserCount !== 0) throw new Error(`${route} still emits Vercel optimiser URLs`);
  if (cloudinaryCount === 0) throw new Error(`${route} does not emit Cloudinary fetch URLs`);
  if (srcSetCount === 0) throw new Error(`${route} does not emit responsive srcset`);
}

const pinned = "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@c1d1e173c706b9b4e250668b7aaa31747d5290ce/public/portfolio/archive/1brvBeAr_V3HreAuopD87U6K0hxffR63F.webp";
const hiRes = `https://res.cloudinary.com/i1xhlvd6/image/fetch/c_scale,w_3200/f_auto/q_auto:best/${encodeURIComponent(pinned)}`;
const status = curl(hiRes, "/tmp/hires");
const kind = execFileSync("file", ["-b", "/tmp/hires"], { encoding: "utf8" }).trim();
console.log(`3200 delivery: ${status}`);
console.log(`3200 file: ${kind}`);
if (!status.startsWith("200 ")) throw new Error("3200 Cloudinary delivery failed");
if (!kind.includes("3200x")) throw new Error(`Unexpected high-resolution dimensions: ${kind}`);
