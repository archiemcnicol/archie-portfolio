# Archie Portfolio System — v0.1

A modular portfolio shell built with Next.js App Router and prepared for Supabase-backed content and permissioned access.

## Current routes
- `/` public / universal homepage
- `/creator`
- `/photography`
- `/business`
- `/affiliate`
- `/professional`
- `/about`
- `/contact`

## Architecture direction
- Next.js on Vercel
- Supabase for project/content records, analytics, authentication, RLS and private media
- GitHub for version control
- Role/access layer will be added after the public content architecture is visually approved

## Local setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and add the Supabase project URL + publishable key.
3. `npm run dev`

Do not commit `.env.local`.

## Private audit helper

The partnership audit keeps evidence separate from public copy. To create a
local TikTok manifest for cross-referencing Gmail/DM evidence, run:

```bash
node scripts/build-tiktok-audit.mjs /path/to/user_data_tiktok.json
```

The generated `analysis/` directory is ignored and must not be deployed or
committed. Public TikTok URLs are only added after they are independently
verified; raw export CDN links are never presented as public links.

Run `npm run verify:release` before publishing. It checks the public campaign
metadata, logo/image configuration, TikTok links, Sketch.co attribution and
the Google Drive archive/public-edit counts.
