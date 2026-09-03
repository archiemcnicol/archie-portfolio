# Archie Portfolio — release handover

Updated: 3 September 2026

## Published source

- Repository: <https://github.com/archiemcnicol/archie-portfolio>
- Archive release: `957cd9fbf5c0c91aa8a6713c9db232b888b6906c`
- CDN delivery update: `d4fdc4fa9a0d67449a0e2a2d722d050419e8d618`
- Latest archive checkpoint: `13022e2a4579c9222a8f461c4322c729b5e31d07`
- Final-16 queue record: see `FINAL_16_PORTFOLIO_IMAGES.md`
- Branch: `main`

## Production deployment

- Latest recorded production deployment: <https://archie-portfolio-5ar6088s7-archiemcnicol002-8423.vercel.app>
- Production alias: <https://archie-portfolio-archiemcnicol002-8423.vercel.app>
- Vercel inspector: <https://vercel.com/archiemcnicol002-8423/archie-portfolio/D23DQKm7bMhyXnecTZiuBZo2DHbM>
- Deployment ID: `dpl_D23DQKm7bMhyXnecTZiuBZo2DHbM`
- Current connector state: `Vercel.list_teams` returns zero teams and protected deployment fetches return `403`, so production verification/deployment must not be claimed until the Vercel connection regains access to team `archiemcnicol002-8423`.

## Completed website work

- Complete responsive portfolio site with home, creator, photography, business, affiliate, professional, about and contact routes.
- Creator showcase and campaign evidence for Nike, Hugo Boss, Moschino and Superdry.
- TikTok cover endpoint and supporting campaign data.
- Ten curated featured photographs.
- Expanded photography gallery with progressive loading, fullscreen viewing, keyboard navigation and responsive layout.
- Generated archive manifest and release-verification scripts.
- Google Drive import/conversion pipeline using bounded WebP output.
- Archive images delivered from the GitHub-backed jsDelivr CDN so the Vercel source upload remains below its transport limit.
- Supabase preparation retained from the earlier implementation.

## UI fixes completed on 3 September 2026

- Featured photography image failure fixed in commit `bc85926aefa36b795debd869b41992f862e2fb2b` by allowing `/portfolio/web/**` in `next.config.ts` local image patterns. This addresses the Featured Edit images being rejected by the Next.js image optimiser even though the JPG files exist in the repository.
- Archive “Load 36 more” visibility fixed in commit `d22d47e75f42ad39142a82cfeb6ec637337fd871` by giving the control an explicit default background, border and text colour instead of relying on hover state for visibility.

## Image state

- Google Drive source records: **619**
- Images currently represented in the published gallery manifest: **603**
- Featured local images: **10**
- Converted archive images currently published: **593**
- Previously remaining Drive originals: **16**
- Final 16 originals identified/downloaded: **16 of 16**
- Final 16 WebP derivatives generated: **16 of 16**
- Final 16 WebP derivatives persisted in Drive staging: **16 of 16**
- Final 16 WebP derivatives attached to GitHub/jsDelivr archive: **0 of 16 at this checkpoint**
- Final target after publication: **619/619 represented**
- Google Drive originals were not changed or deleted.

All sixteen formerly blocked originals were successfully streamed from Google Drive despite being roughly 38–46 MB each. They were converted to **1120×630 WebP, quality 58**. The sixteen derivatives total **2,299,904 bytes (~2.19 MiB)**.

### Durable final-16 staging

The converted binaries are no longer dependent on the current workspace. They are stored in:

- Google Drive folder: `Archie Portfolio - Final 16 WebP Staging`
- Folder ID: `1XUvrFldPrrOV1Cfg8PRHyotDpiTM_VJu`
- Verified folder contents: **exactly 16 private WebP files**
- Naming convention: `<source-drive-id>.webp`

The exact source IDs, filenames and derivative sizes are recorded in `FINAL_16_PORTFOLIO_IMAGES.md`.

The final two previously unresolved source records were:

- `1qf6tSQBBhLUXJ4CdAQ_NSMJSvD4sO2Zl` — `DJI_20260304155932_0005_D.jpg` — 41,299,780-byte original.
- `1a4XCo1YrNopaS3h1tXpUEodERRrVqePp` — `DJI_20260304160007_0006_D.jpg` — 39,593,972-byte original.

## Verification previously completed

- `npm run typecheck`
- `npm run verify:release`
- `NEXT_TELEMETRY_DISABLED=1 npm run build`

The previous release verifier passed with four public campaigns, ten featured images and 603 gallery images from the 619-image Drive source. Next.js 16.3.4 built all twelve routes successfully.

A fresh 619-image verification has **not** yet been claimed because the sixteen staged WebPs still need to be attached to the repository archive and added to `src/lib/portfolio-archive.ts`.

## Remaining publication task

1. Attach the sixteen staged WebPs to `public/portfolio/archive/<drive-id>.webp`.
2. Add their sixteen records to `src/lib/portfolio-archive.ts` using the existing jsDelivr URL convention.
3. Confirm the manifest represents all **619/619** Drive source records.
4. Run typecheck, release verification and build again.
5. Push/deploy the resulting lightweight source change and verify the photography page and Featured Edit on production.

## Current binary transport limitation

The previous large-original blocker is solved. The only remaining issue is transporting the already-generated small WebP binaries into a public host from the current tool environment:

- GitHub’s connector exposes binary `create_blob` only through inline base64 content and no top-level local-file upload parameter.
- Cloudinary’s upload action has its file argument nested inside `upload_request`; the connector runtime cannot rewrite proxied local mount paths in that nested position. Passing a `sediment://` connector file reference returns a file-argument rewrite error.
- Direct outbound networking from the workspace is DNS-blocked, so the normal GitHub/Cloudinary HTTP upload endpoints cannot be called from a local script.
- Supabase’s connected management toolset exposes database/Edge Function administration but no Storage object upload action.
- The staged WebPs are small enough to fetch with inline base64, so this is now strictly a connector field-handoff problem rather than a file-size problem.

Do not mark the final sixteen as published until their actual binary files are present on the public CDN/archive path.
