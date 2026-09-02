# TikTok data service — architecture proposal

## Purpose

Create a private creator-data service that keeps the website's account statistics,
video performance and partnership evidence current. The public site should consume
approved, presentation-ready records; it should never receive TikTok access tokens,
raw DMs or unreviewed partnership guesses.

## What TikTok can provide

| Source | Useful data | Important limitation |
| --- | --- | --- |
| Display API + Login Kit | Authorised profile data, follower/following/like/video counts, public videos, cover, share URL, title, description, duration, views, likes, comments and shares | Requires a TikTok developer app, Login Kit approval and the user's consented scopes. Video covers are CDN URLs with a short lifetime, so they need refreshing. |
| Data Portability API | Consent-based exports of posts/profile, activity and direct messages; one-time or ongoing requests | Available to UK/EEA users subject to application and privacy/security approval. Requests are asynchronous and delivered as downloadable data. |
| TikTok Analytics / Web Business Suite export | Audience age, gender, top countries, top cities, activity and period-based reach/engagement data | These audience dimensions are not part of the normal Display API profile fields. Start with an official CSV/XLSX/ZIP import, then revisit direct access only if TikTok approves a suitable product. |
| Gmail + TikTok data | Evidence that a post was a completed brand partnership, including the company, dates, deliverables and links | Matching should produce suggestions for review, not automatically publish a collaboration. |

The Research API is not the right dependency for this project: TikTok's own FAQ says
creators, advertisers and commercial users are not eligible for Research Tools.

## Proposed flow

```text
TikTok OAuth / Data Portability
          ↓
Server-only Vercel API routes
          ↓
Private Supabase tables with RLS
          ↓
Normalised metrics + evidence suggestions
          ↓
Admin review and approval
          ↓
Public creator page and private analytics views
```

### Server endpoints

- `/api/tiktok/oauth/start` — begin Login Kit consent.
- `/api/tiktok/oauth/callback` — exchange the code and store the token server-side.
- `/api/tiktok/sync` — refresh account and public-video data, protected for admin or
  an authenticated scheduled job.
- `/api/tiktok/portability/request` — request a posts/profile, activity or DM export.
- `/api/tiktok/portability/webhook` — receive the ready notification and queue the
  download/normalisation step.
- `/api/tiktok/analytics/import` — accept an official analytics export for audience
  and period-based insights.
- `/api/tiktok/status` — show the last successful sync, token health and missing
  data categories in the private admin area.

No synchronisation endpoint should be public or callable with only the publishable
Supabase key.

## Supabase data model

The first schema should be deliberately small and time-series friendly:

- `tiktok_accounts` — one row for the connected account and consent metadata.
- `tiktok_account_snapshots` — follower, following, total likes and public video
  count with `captured_at` and `source`.
- `tiktok_videos` — stable TikTok video ID, share URL, title, description, date,
  cover reference and visibility state.
- `tiktok_video_snapshots` — view, like, comment, share and favourite counts with
  `captured_at`.
- `tiktok_audience_snapshots` — period, metric, dimension and value for age, gender,
  country, city and activity exports.
- `tiktok_data_requests` — portability request ID, category, status, expiry and
  processing errors.
- `tiktok_evidence_suggestions` — candidate brand, video, evidence references and
  confidence; never public until approved.

All private tables should have RLS enabled. Raw DMs and downloaded export files
should stay in a private schema or private storage area, with only the minimum
normalised evidence exposed to the admin interface. The browser must never receive
the TikTok client secret, access token or service-role key.

## Derived information for the site

The service can calculate and refresh:

- current follower count and follower growth;
- total likes and public video count;
- total views across the current public catalogue, clearly labelled as a catalogue
  total rather than an immutable lifetime figure;
- average and median views per video;
- engagement rate using views, likes, comments and shares;
- highest-performing videos and campaign-specific performance;
- audience mix by age, gender, country and city for a stated reporting period;
- verified campaign links, covers and export-date labels.

Every displayed metric should carry `captured_at`, `source`, `period_start`,
`period_end` and an optional freshness/status label. That prevents a historical
export from being mistaken for a live number.

## Partnership matching

The existing Gmail/DM audit can feed a suggestion engine that compares:

- company names and aliases from messages;
- caption/title/hashtag/mention text;
- branded-content disclosure;
- sound, location and posting date;
- exact TikTok or Instagram links;
- offer, acceptance, delivery, posting and payment evidence.

The result should be a review queue with states such as `candidate`, `accepted_unresolved`,
`completed_unverified`, `completed_public` and `rejected`. Only `completed_public`
records should flow into the public brand-work page.

## Automation and resilience

- Run a scheduled sync at least daily once OAuth access is available.
- Use portability webhooks for export readiness rather than repeatedly polling.
- Refresh short-lived cover URLs during sync and keep a safe fallback cover state.
- Make every sync idempotent using TikTok video IDs and snapshot timestamps.
- Preserve the last successful snapshot when TikTok is unavailable; show its age in
  the admin area instead of blanking the website.
- Log failures without storing tokens or full private message bodies in logs.

## What we can build before approval

1. Normalise the existing 500-post export into the new video/snapshot contract.
2. Build the analytics CSV/XLSX/ZIP importer and audience-dimension normaliser.
3. Add aggregation functions for views, engagement and follower growth.
4. Create the private sync-status/admin view and the partnership review queue.
5. Prepare the RLS migration and server-only environment-variable contract.
6. Register the TikTok developer app, request only the scopes we need, then wire the
   OAuth and scheduled sync once TikTok approves the products.

## Official references

- Display API overview: https://developers.tiktok.com/docs/en/display-api-overview
- Display API user info: https://developers.tiktok.com/docs/en/tiktok-api-v2-get-user-info
- Display API list videos: https://developers.tiktok.com/docs/en/tiktok-api-v2-video-list
- Display API video object: https://developers.tiktok.com/docs/en/tiktok-api-v2-video-object
- Data Portability API getting started: https://developers.tiktok.com/docs/en/data-portability-api-get-started
- Data Portability API data requests: https://developers.tiktok.com/docs/en/data-portability-api-add-data-request
- TikTok developer scopes: https://developers.tiktok.com/docs/en/tiktok-api-scopes
