# Archie Portfolio — release handover

Updated: 4 September 2026

## Source release

- Repository: <https://github.com/archiemcnicol/archie-portfolio>
- Branch: `main`
- Final 16 image-pack commit: `e2e873ece8f902956fabfd481316ddfcbfde4f81`
- Gallery completion commit: `8e00ca0c90c489e63f9c4b641ce46c750ec564db`
- Image API hardening: `477d32401cc2d2850ae23ca965522e189e2b3d91`
- Obsolete transfer chunks and draft records removed from the finished tree.

## Production URL

- Production alias: <https://archie-portfolio-archiemcnicol002-8423.vercel.app>
- Photography: <https://archie-portfolio-archiemcnicol002-8423.vercel.app/photography>
- Vercel team: `archiemcnicol002-8423` (`team_DmJG03IKZDcgfhTBTtrkv20m`)

The repository release is complete. The connected Vercel OAuth token is currently not authorised for the production team scope, so this session cannot inspect the Git-triggered deployment or alter Deployment Protection. Vercel returns `403 Not authorized: Trying to access resource under scope "archiemcnicol002-8423"`. Do not claim connector-side production verification until that Vercel scope is re-authorised.

## Completed website work

- Complete responsive portfolio site with home, creator, photography, business, affiliate, professional, about and contact routes.
- Creator showcase and campaign evidence for Nike, Hugo Boss, Moschino and Superdry.
- TikTok cover endpoint and supporting campaign data.
- Ten curated featured photographs.
- Complete 619-photo visual archive with progressive loading, fullscreen viewing, keyboard navigation and responsive layout.
- Generated archive manifest and release-verification tooling.
- Google Drive import/conversion pipeline retained for future archive maintenance.
- Existing large archive delivered from the GitHub-backed jsDelivr CDN.
- Final sixteen difficult source files delivered through a compact immutable AVIF pack plus a local Next.js image API.
- Supabase preparation retained from the earlier implementation.

## Photography fixes and completion

- Featured Edit image loading fixed by allowing `/portfolio/web/**` in `next.config.ts`.
- Archive “Load 36 more” button now has a visible default state rather than appearing only on hover.
- `/api/portfolio-final/**` is explicitly allowed by Next Image local patterns.
- The final sixteen images are represented by `src/lib/portfolio-final.ts` and combined with the existing archive in `src/app/photography/page.tsx`.
- The photography page now computes and displays **619 photographs available to browse**.

## Final image architecture

Google Drive source records: **619**.

The first **603** gallery records continue to use the existing archive/local delivery paths. The final **16** formerly blocked originals were downloaded, converted and then optimised to 800×450 AVIF delivery copies. Those sixteen AVIF files are concatenated into:

`public/portfolio/archive/final-16-avif.pack`

The pack is committed immutably at `e2e873ece8f902956fabfd481316ddfcbfde4f81` and is **354,673 bytes** in total. The API route:

`src/app/api/portfolio-final/[id]/route.ts`

fetches the pinned GitHub Raw pack, requests the relevant byte range, safely handles hosts that return the whole pack instead of a range, validates the exact image length, and responds as `image/avif` with immutable caching.

The final records live in:

`src/lib/portfolio-final.ts`

and use local URLs of the form:

`/api/portfolio-final/<source-drive-id>`

Result: **619/619 source photographs are represented in the finished gallery code.**

## Original and recovery assets

The sixteen full WebP derivatives also remain privately staged in Google Drive as a recovery copy:

- Folder: `Archie Portfolio - Final 16 WebP Staging`
- Folder ID: `1XUvrFldPrrOV1Cfg8PRHyotDpiTM_VJu`
- Contents: exactly 16 private WebP files named `<source-drive-id>.webp`

Google Drive originals were not changed or deleted.

## Previous verification baseline

Before the final sixteen were added, the project successfully completed:

- `npm run typecheck`
- `npm run verify:release`
- `NEXT_TELEMETRY_DISABLED=1 npm run build`

That baseline built all twelve routes successfully on Next.js 16.3.4. The final source changes were additionally reviewed for Next.js local image allow-listing, route response typing, immutable pack addressing and exact byte offsets. No GitHub commit-status checks are configured for the repository, so there is no CI status to cite for the final commit.

## Only external access limitation

There is no remaining source/image transport task. The final sixteen are committed and wired into the 619-photo gallery.

The only unresolved external administration issue is Vercel OAuth scope: the currently connected Vercel account cannot access team `archiemcnicol002-8423`, so deployment inspection and Deployment Protection changes cannot be performed from this session until Vercel is re-authorised for that team.
