import { execFileSync } from "node:child_process";

function fetchText(url) {
  return execFileSync(
    "curl",
    ["--fail", "--silent", "--show-error", "--location", "--max-time", "30", url],
    { encoding: "utf8", maxBuffer: 30 * 1024 * 1024 },
  );
}

function count(text, pattern) {
  return (text.match(pattern) ?? []).length;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function inspectPage(path) {
  const html = fetchText(`https://archiemcnicol.com${path}`);
  const metrics = {
    images: count(html, /<img\b/gi),
    srcsets: count(html, /srcset=/gi),
    cloudinary: count(html, /res\.cloudinary\.com\/i1xhlvd6\/image\/fetch\//g),
    good: count(html, /q_auto:good/g),
    best: count(html, /q_auto:best/g),
    optimiser: count(html, /\/_next\/image\?/g),
    highPriority: count(html, /fetchpriority=["']high["']/gi),
    eager: count(html, /loading=["']eager["']/gi),
  };
  console.log(`${path}: ${JSON.stringify(metrics)}`);
  assert(metrics.optimiser === 0, `${path} still emits Vercel image optimiser URLs`);
  assert(metrics.cloudinary > 0, `${path} is not using Cloudinary delivery`);
  assert(metrics.good > 0, `${path} is not using q_auto:good for card delivery`);
  // React may emit a matching preload hint as well as the single high-priority img.
  assert(metrics.highPriority >= 1 && metrics.highPriority <= 2, `${path} has an unexpected number of high-priority image hints: ${metrics.highPriority}`);
  assert(metrics.eager === 1, `${path} should have exactly one eager initial image`);
  return { html, metrics };
}

const landing = inspectPage("/photography");
assert(landing.metrics.srcsets >= 40 && landing.metrics.srcsets < 80, `Landing page should render one initial srcset per project, got ${landing.metrics.srcsets}`);
assert(landing.metrics.cloudinary < 450, `Landing page still emits too many initial Cloudinary candidates: ${landing.metrics.cloudinary}`);
assert(landing.html.includes("https://res.cloudinary.com"), "Cloudinary origin missing from photography HTML");
assert(/rel=["']preconnect["'][^>]*href=["']https:\/\/res\.cloudinary\.com["']|href=["']https:\/\/res\.cloudinary\.com["'][^>]*rel=["']preconnect["']/i.test(landing.html), "Cloudinary preconnect is missing");

const newYork = inspectPage("/photography/new-york-2026-06-10");
assert(newYork.metrics.images === 30, `New York should render 30 initial photo elements, got ${newYork.metrics.images}`);
assert(newYork.metrics.srcsets >= 30 && newYork.metrics.srcsets <= 31, `New York should emit 30 photo srcsets plus at most one preload srcset, got ${newYork.metrics.srcsets}`);

const pinned = "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@c1d1e173c706b9b4e250668b7aaa31747d5290ce/public/portfolio/archive/1brvBeAr_V3HreAuopD87U6K0hxffR63F.webp";
const encoded = encodeURIComponent(pinned);
const goodUrl = `https://res.cloudinary.com/i1xhlvd6/image/fetch/c_scale,w_1280/f_auto/q_auto:good/${encoded}`;
const bestUrl = `https://res.cloudinary.com/i1xhlvd6/image/fetch/c_scale,w_1280/f_auto/q_auto:best/${encoded}`;

function downloadSize(url, output) {
  const result = execFileSync(
    "curl",
    ["--fail", "--silent", "--show-error", "--location", "--max-time", "30", "--output", output, "--write-out", "%{http_code} %{size_download}", url],
    { encoding: "utf8" },
  ).trim();
  const [status, size] = result.split(/\s+/).map(Number);
  assert(status === 200, `Image delivery failed for ${url}`);
  return size;
}

const goodBytes = downloadSize(goodUrl, "/tmp/card-good");
const bestBytes = downloadSize(bestUrl, "/tmp/card-best");
console.log(`1280 sample: good=${goodBytes} bytes, best=${bestBytes} bytes`);
assert(goodBytes <= bestBytes, `q_auto:good should not be larger than q_auto:best (${goodBytes} > ${bestBytes})`);

const viewerUrl = `https://res.cloudinary.com/i1xhlvd6/image/fetch/c_scale,w_3200/f_auto/q_auto:best/${encoded}`;
downloadSize(viewerUrl, "/tmp/viewer-best");
const kind = execFileSync("file", ["-b", "/tmp/viewer-best"], { encoding: "utf8" }).trim();
console.log(`3200 viewer: ${kind}`);
assert(kind.includes("3200x"), `Viewer no longer delivers a 3200px image: ${kind}`);

console.log("Live photography performance diagnostic passed.");
