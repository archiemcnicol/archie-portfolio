import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const sourcePath = resolve("src/lib/tiktok-profile-avatar.ts");
const outputPath = resolve("public/brand-work/tiktok-profile-avatar.png");
const source = readFileSync(sourcePath, "utf8");
const match = source.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);

if (!match) {
  throw new Error("TikTok profile avatar data URI was not found.");
}

const png = Buffer.from(match[1], "base64");
const pngSignature = png.subarray(0, 8).toString("hex");

if (pngSignature !== "89504e470d0a1a0a") {
  throw new Error("TikTok profile avatar data is not a valid PNG.");
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, png);
console.log(`Generated ${outputPath} (${png.length} bytes)`);
