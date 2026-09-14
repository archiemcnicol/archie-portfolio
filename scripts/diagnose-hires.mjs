import { execFileSync } from "node:child_process";

const id = "1brvBeAr_V3HreAuopD87U6K0hxffR63F";
const pinned = "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@c1d1e173c706b9b4e250668b7aaa31747d5290ce/public/portfolio/archive/1brvBeAr_V3HreAuopD87U6K0hxffR63F.webp";
const cloud = "i1xhlvd6";
const encodedPinned = encodeURIComponent(pinned);

const urls = {
  driveUc: `https://drive.google.com/uc?export=download&id=${id}`,
  driveThumbnail: `https://drive.google.com/thumbnail?id=${id}&sz=w3200`,
  googleusercontent: `https://lh3.googleusercontent.com/d/${id}=w3200`,
  cloudinaryFetch1600: `https://res.cloudinary.com/${cloud}/image/fetch/f_auto,q_auto:good,c_limit,w_1600/${encodedPinned}`,
  cloudinaryFetch2560: `https://res.cloudinary.com/${cloud}/image/fetch/f_auto,q_auto:good,c_scale,w_2560/${encodedPinned}`,
};

for (const [name, url] of Object.entries(urls)) {
  const out = `/tmp/${name}`;
  let status = "";
  try {
    status = execFileSync(
      "curl",
      ["--silent", "--show-error", "--location", "--max-time", "30", "--output", out, "--write-out", "%{http_code} %{content_type} %{size_download} %{url_effective}", url],
      { encoding: "utf8" },
    );
  } catch (error) {
    status = `transport-error ${error.message}`;
  }
  let kind = "missing";
  try {
    kind = execFileSync("file", ["-b", out], { encoding: "utf8" }).trim();
  } catch {}
  console.log(`${name}: ${status}`);
  console.log(`${name} file: ${kind}`);
}
