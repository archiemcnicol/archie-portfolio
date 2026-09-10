# Archie McNicol Portfolio

Production portfolio for Archie McNicol — UK content creator, photographer, community manager and digital creative.

## Public routes

- `/` — portfolio overview
- `/creator` — creator campaigns, brand work and selected performance
- `/photography` — public photography projects and full archive
- `/business` — commercial and digital work index
- `/business/web` — web and digital project detail
- `/affiliate` — anonymised public commerce-performance overview
- `/professional` — professional operating experience and creator-operations case study
- `/professional/capcut` — detailed CapCut UK creator-community and cross-border operations experience
- `/about` — background, experience, toolkit and profile
- `/contact` — public contact routes

`/cv` is a legacy redirect to `/about#background` and is not part of the public route index.

Nested affiliate reporting routes are not shipped in the public app. Partner-level reporting remains private and outside the public source tree.

## Photography

The photography route renders 616 public photographs across destination-led projects and a fullscreen archive viewer. Full-resolution originals remain private in the source archive; the public site serves web-ready derivatives described by `src/lib/portfolio-archive.ts`.

Original filenames are used only for server-side curation and exclusion rules. Before archive records cross the React Server Component boundary, they are reduced to the fields the client gallery needs.

Public project taxonomy and display curation live in the photography taxonomy/display modules and are used to build project pages, covers and the sitemap.

## Creator work

Public creator data lives in `src/lib/brand-work.ts`. Client names, campaign partners and commissioning contacts are represented separately so agencies or distribution platforms are not mistaken for the end client. Public links use canonical TikTok video URLs where they have been recovered and verified.

## Profile and performance data

- `src/lib/profile-data.ts` holds public background, experience and toolkit data used by the About and Professional sections.
- `src/lib/affiliate-public.ts` holds only the anonymised public commerce aggregates used by the Performance page.
- Partner-level performance records are retained in private Supabase storage rather than in the public GitHub source tree.
- Public contact email: `fitswitharchie@gmail.com`.
- Personal contact information, more specific personal location details and unpublished commercial terms must not be added to public data files.

## Discoverability

The site uses Next.js metadata routes and file conventions for route-specific metadata, canonical URLs, `sitemap.xml`, `robots.txt`, `llms.txt`, Person/WebSite structured data, OpenGraph/Twitter images, a custom 404 page and the site favicon.

The current public app ships no admin utility or nested affiliate-reporting pages. `robots.txt` keeps `/admin/`, `/api/` and nested `/affiliate/` paths blocked as a fail-safe against future private tooling or reporting accidentally becoming crawlable.

## Stack

- Next.js App Router
- React
- Vercel
- Supabase for private/source data and future authenticated functionality
- Cloudinary for managed media workflows

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin when running outside Vercel's automatic production URL environment.
4. Add the Supabase public URL and publishable key when using Supabase-backed features.
5. `npm run dev`

Do not commit `.env.local`.

## Verification

Run `npm run verify` before publishing. It performs the security scan, public-surface privacy checks, production build, TypeScript check, accessibility baseline and release invariants. GitHub Actions runs the same verification on pushes and pull requests targeting `main`.
