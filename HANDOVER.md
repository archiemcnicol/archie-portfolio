# Archie Portfolio — release handover

Updated: 3 September 2026

## Published source

- Repository: <https://github.com/archiemcnicol/archie-portfolio>
- Archive release: `957cd9fbf5c0c91aa8a6713c9db232b888b6906c`
- CDN delivery update: `d4fdc4fa9a0d67449a0e2a2d722d050419e8d618`
- Latest archive checkpoint: `13022e2a4579c9222a8f461c4322c729b5e31d07`
- Branch: `main`
- Recovery branch retained locally: `backup/pre-publish-2026-09-03`

## Production deployment

- Latest production deployment: <https://archie-portfolio-5ar6088s7-archiemcnicol002-8423.vercel.app>
- Production alias: <https://archie-portfolio-archiemcnicol002-8423.vercel.app>
- Vercel inspector: <https://vercel.com/archiemcnicol002-8423/archie-portfolio/D23DQKm7bMhyXnecTZiuBZo2DHbM>
- Deployment ID: `dpl_D23DQKm7bMhyXnecTZiuBZo2DHbM`
- Current access state: the latest deployment responds and redirects to Vercel sign-in, confirming that it is online behind Vercel Authentication. Public visitors remain blocked until Deployment Protection is disabled for production.
- API note: direct deployment succeeded, but status/log inspection remains unavailable because the current Vercel connection exposes zero teams and returns `403` for team `archiemcnicol002-8423`.

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

## Image state

- Google Drive source records: **619**
- Images currently represented in the gallery: **603**
- Featured local images: **10**
- Converted archive images: **593**
- Remaining Drive originals: **16**
- Images converted during the continuation: **229 of 245**
- Remaining source volume: approximately **660 MB**
- Google Drive originals were not changed or deleted.

The remote GitHub archive retains the higher-quality 1440 px / quality 70 WebP files. The local continuation pipeline is configured for 1120 px / quality 58 to keep future imports and deployments manageable.

## Verification completed

- `npm run typecheck`
- `npm run verify:release`
- `NEXT_TELEMETRY_DISABLED=1 npm run build`

The release verifier passed with four public campaigns, ten featured images and 603 gallery images from the 619-image Drive source. Next.js 16.3.4 built all twelve routes successfully.

## Next actions

1. In Vercel, open the inspector link above and disable Deployment Protection for the production environment.
2. Confirm the public URL loads without a Vercel sign-in redirect.
3. Finish the final 16 Drive originals, which are 38–46 MB each and exceed the connector's legacy inline-transfer ceiling.
4. Regenerate `src/lib/portfolio-archive.ts`, run the verification commands, publish the final archive files and deploy the lightweight source bundle again.

## Final-16 transfer note

Cloudinary was connected and tested on 3 September 2026. It cannot consume Google Drive's private streamed `sediment://` reference, and a direct Drive download URL returns an HTML access response. The authenticated inline route stalled at the large-file boundary and was stopped; no Cloudinary asset was created. The remaining 16 originals and all Google Drive source files are unchanged.

Do not discard the modified files under `public/portfolio/archive/` in the working copy: they are the smaller continuation copies and are intentionally different from the higher-quality CDN copies already committed to GitHub.
