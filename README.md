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
