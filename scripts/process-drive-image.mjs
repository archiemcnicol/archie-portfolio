import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const [fileId] = process.argv.slice(2);

if (!fileId || !/^[A-Za-z0-9_-]+$/.test(fileId)) {
  throw new Error("A valid Google Drive file ID is required.");
}

const sentinel = Buffer.from("\n__DRIVE_IMAGE_END__\n");
const chunks = [];
let pending = Buffer.alloc(0);

for await (const chunk of process.stdin) {
  const input = Buffer.concat([pending, chunk]);
  const sentinelIndex = input.indexOf(sentinel);
  if (sentinelIndex !== -1) {
    if (sentinelIndex > 0) chunks.push(input.subarray(0, sentinelIndex));
    break;
  }

  const safeLength = Math.max(0, input.length - sentinel.length + 1);
  if (safeLength > 0) chunks.push(input.subarray(0, safeLength));
  pending = input.subarray(safeLength);
}

const encoded = Buffer.concat(chunks).toString("utf8").trim();
if (!encoded) throw new Error(`No image data received for ${fileId}.`);

const source = Buffer.from(encoded, "base64");
const outputDirectory = path.join(process.cwd(), "public", "portfolio", "archive");
const outputPath = path.join(outputDirectory, `${fileId}.webp`);

await fs.mkdir(outputDirectory, { recursive: true });

const result = await sharp(source, { failOn: "none" })
  .rotate()
  .resize({
    width: 1440,
    height: 1440,
    fit: "inside",
    withoutEnlargement: true,
  })
  .webp({ quality: 70, effort: 4, smartSubsample: true })
  .toFile(outputPath);

process.stdout.write(
  JSON.stringify({
    id: fileId,
    src: `/portfolio/archive/${fileId}.webp`,
    width: result.width,
    height: result.height,
    size: result.size,
  }),
);
