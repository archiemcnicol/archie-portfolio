<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio project guardrails

This repository is public. Treat every committed file, branch and generated artifact as publicly readable.

## Privacy and performance data

- Keep the public Performance page aggregate-only. Its approved public source is `src/lib/affiliate-public.ts`.
- Never commit partner-level performance records, partner identities tied to private reporting, activation-source detail, unpublished commercial terms, access credentials or private case-study payloads to this repository.
- Partner-level retained performance records belong in private storage, currently the non-public Supabase `private_portfolio` schema.
- Do not add nested `/affiliate/...` reporting routes unless the data source, authentication model, crawler behavior and public-repository exposure have all been reviewed first.
- Public personal location must remain `United Kingdom` / `UK-based`; do not publish a more specific home location.
- Do not reintroduce a public GitHub profile link into the site, structured data, footer or profile data unless explicitly requested.

## Photography invariants

- Project-index/contact-sheet tiles are intentionally fixed 4:3 with the existing hover treatment.
- Full archive and individual project galleries must preserve natural image ratios. Do not add fixed `aspect-ratio`, crop-oriented `object-fit: cover`, or a pale full-tile project overlay to `PortfolioArchive`.
- Preserve the final photography taxonomy correction layers and stable-ID logic; do not simplify the legacy classifier ranges without verifying dependent corrections.

## Release discipline

- Run `npm run verify` after source changes and keep GitHub Actions green before treating a change as complete.
- Do not claim rendered-browser visual QA from CI or deployment status alone.
