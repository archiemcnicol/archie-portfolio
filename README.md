# Archie McNicol Portfolio

This repository is the stage-one production baseline for Archie McNicol's portfolio website.

## Public routes

- `/` — homepage
- `/creator` — creator and brand work
- `/photography` — image-only scrolling photography archive
- `/business` — commercial work
- `/affiliate` — affiliate performance
- `/professional` — professional experience
- `/about` — about
- `/contact` — contact

## Photography

The photography route is intentionally gallery-only: no site navigation, hero, archive heading, filenames or footer are shown on the page. Photographs can be opened in a fullscreen viewer with previous/next navigation.

The current public gallery contains 617 photographs. Standard gallery derivatives live under `public/portfolio/archive` and are described by `src/lib/portfolio-archive.ts`. The final packed delivery set uses `public/portfolio/archive/final-16-avif.pack` with records in `src/lib/portfolio-final.ts`.

Full-resolution originals remain private in the source Google Drive archive and are not served by the public website. A purchase/download layer can therefore be added later without changing the public gallery foundation.

## Stack

- Next.js App Router
- React
- Vercel
- GitHub
- Supabase preparation for data, authentication and private functionality

## Local setup

1. `npm install`
2. Copy `.env.example` to `.env.local` and add the required Supabase values when using Supabase-backed features.
3. `npm run dev`

Do not commit `.env.local`.

## Verification

Run `npm run verify` before publishing. It builds the site, type-checks the project and verifies the current public campaign and photography baseline.
