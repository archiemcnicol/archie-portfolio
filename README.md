# Archie McNicol Portfolio

Production portfolio for Archie McNicol — content creator, photographer, community manager and digital creative based in Buckinghamshire, UK.

## Public routes

- `/` — portfolio overview
- `/creator` — creator campaigns, brand work and selected performance
- `/photography` — public photography archive
- `/business` — commercial web, photography and content work
- `/affiliate` — affiliate and performance partnership experience
- `/professional` — community management and professional experience
- `/about` — background and disciplines
- `/contact` — public contact routes

## Photography

The photography route renders a large scrolling archive with a fullscreen viewer. Full-resolution originals remain private in the source Google Drive archive; the public site serves web-ready derivatives described by `src/lib/portfolio-archive.ts`.

Original filenames are used only on the server for curation and exclusion rules. Before the archive crosses the React Server Component boundary, each record is reduced to the fields the client gallery needs: ID, image URL, width and height.

## Creator work

Public creator data lives in `src/lib/brand-work.ts`. Client names, campaign partners and commissioning contacts are intentionally represented as separate fields so agencies or distribution platforms are not mistaken for the end client. Public links use canonical TikTok video URLs where they have been recovered and verified.

## Discoverability

The site uses Next.js metadata routes and file conventions for:

- route-specific titles and descriptions
- canonical URLs
- `sitemap.xml`
- `robots.txt`
- `llms.txt`
- Person and WebSite structured data
- a custom 404 page
- the site favicon

Private `/admin/` and `/api/` routes are excluded from crawling. Admin content also remains unavailable in production unless explicitly enabled.

## Stack

- Next.js App Router
- React
- Vercel
- GitHub
- Supabase for private data and future authenticated functionality

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local`.
3. Set `NEXT_PUBLIC_SITE_URL` to the canonical production origin when running outside Vercel's automatic production URL environment.
4. Add the Supabase public URL and publishable key when using Supabase-backed features.
5. `npm run dev`

Do not commit `.env.local`.

## Verification

Run `npm run verify` before publishing. It builds the site, type-checks the project and checks the current public campaign, photography and SEO baseline. GitHub Actions also runs the same verification on pushes and pull requests targeting `main`, giving the project an independent build check even when an external deployment provider is rate-limited.
