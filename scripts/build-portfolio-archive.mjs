import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

const root = process.cwd();
const sourcePath = path.join(root, "analysis", "drive-portfolio-files.json");
const outputPath = path.join(root, "src", "lib", "portfolio-archive.ts");

const selectedSources = new Map([
  ["20250530_215358.jpg", "/portfolio/web/20250530_215358.jpg"],
  ["20260611_093538.jpg", "/portfolio/web/20260611_093538.jpg"],
  ["20251114_144521.jpg", "/portfolio/web/20251114_144521.jpg"],
  ["20250214_123915.jpg", "/portfolio/web/20250214_123915.jpg"],
  ["DSC03611.jpg", "/portfolio/web/DSC03611.jpg"],
  ["DSC03777.jpg", "/portfolio/web/DSC03777.jpg"],
  ["DSC04631.jpg", "/portfolio/web/DSC04631.jpg"],
  ["DSC05991.jpg", "/portfolio/web/DSC05991.jpg"],
  [
    "Photo_6553867_DJI_267_jpg_4637425_0_202112818318_photo_original.jpg",
    "/portfolio/web/Photo_6553867_DJI_267_jpg_4637425_0_202112818318_photo_original.jpg",
  ],
  [
    "Photo_6553875_DJI_275_jpg_4447555_0_2021129174952_photo_original.jpg",
    "/portfolio/web/Photo_6553875_DJI_275_jpg_4447555_0_2021129174952_photo_original.jpg",
  ],
]);

const sourceFiles = JSON.parse(await fs.readFile(sourcePath, "utf8"));

const resolvedSourceFiles = (
  await Promise.all(
    sourceFiles.map(async (file) => {
      if (selectedSources.has(file.title)) return file;

      try {
        await fs.access(path.join(root, "public", "portfolio", "archive", `${file.id}.webp`));
        return file;
      } catch {
        return null;
      }
    }),
  )
).filter(Boolean);

const photos = await Promise.all(
  resolvedSourceFiles.map(async (file) => {
    const src = selectedSources.get(file.title) ?? `/portfolio/archive/${file.id}.webp`;
    const assetPath = path.join(root, "public", src.replace(/^\//, ""));
    const metadata = await sharp(assetPath).metadata();

    if (!metadata.width || !metadata.height) {
      throw new Error(`Missing dimensions for ${file.title}`);
    }

    return {
      id: file.id,
      src,
      width: metadata.width,
      height: metadata.height,
      originalName: file.title,
    };
  }),
);

const output = `export type ArchivePhoto = {
  id: string;
  src: string;
  width: number;
  height: number;
  originalName: string;
};

// Generated from My Website Portfolio Photos in Google Drive.
export const PORTFOLIO_ARCHIVE_PHOTOS: ArchivePhoto[] = ${JSON.stringify(photos, null, 2)};
`;

await fs.writeFile(outputPath, output);
console.log(
  `Generated ${photos.length} portfolio records from ${sourceFiles.length} Drive photographs.`,
);
