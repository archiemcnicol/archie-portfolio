#!/usr/bin/env node

/**
 * Build a private, evidence-ready manifest from TikTok's exported JSON.
 *
 * The output is intentionally local-only. It keeps TikTok's raw export link
 * and cover URL for matching, but leaves publicUrl null until a public link is
 * independently evidenced by an email, DM or other source.
 *
 * Usage:
 *   node scripts/build-tiktok-audit.mjs /path/to/user_data_tiktok.json [output]
 */

import fs from "node:fs";
import path from "node:path";

const inputPath = process.argv[2];
const outputPath = process.argv[3] || "analysis/tiktok-audit.json";

if (!inputPath) {
  console.error("Usage: node scripts/build-tiktok-audit.mjs <tiktok-export.json> [output]");
  process.exit(1);
}

const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const sourcePosts = input?.Post?.Posts?.VideoList;

if (!Array.isArray(sourcePosts)) {
  throw new Error("TikTok export does not contain Post.Posts.VideoList");
}

const asNumberOrNull = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const asStringOrNull = (value) => {
  if (value === undefined || value === null || value === "") return null;
  return String(value);
};

const posts = sourcePosts.map((post, sourceIndex) => ({
  sourceIndex,
  postedAt: asStringOrNull(post.Date),
  rawVideoUrl: asStringOrNull(post.Link),
  publicUrl: null,
  publicUrlStatus: "unverified",
  coverUrl: asStringOrNull(post.CoverImage),
  likesSnapshot: asNumberOrNull(post.Likes),
  whoCanView: asStringOrNull(post.WhoCanView),
  contentDisclosure: asStringOrNull(post.ContentDisclosure),
  sound: asStringOrNull(post.Sound),
  location: asStringOrNull(post.Location),
  title: asStringOrNull(post.Title),
  alternateText: asStringOrNull(post.AlternateText),
}));

const manifest = {
  schemaVersion: 1,
  source: "TikTok data export",
  sourcePostCount: posts.length,
  publicUrlPolicy: "Only populate publicUrl after independent evidence confirms the link.",
  posts,
};

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");

const disclosed = posts.filter((post) => post.contentDisclosure).length;
const covers = posts.filter((post) => post.coverUrl).length;
const privatePosts = posts.filter((post) => /only you|private/i.test(post.whoCanView || "")).length;

console.log(
  JSON.stringify(
    {
      outputPath,
      sourcePostCount: posts.length,
      postsWithCovers: covers,
      postsWithDisclosure: disclosed,
      postsMarkedPrivate: privatePosts,
    },
    null,
    2,
  ),
);
