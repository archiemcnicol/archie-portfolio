# Partnership audit handoff

This is the working boundary between the private evidence audit and the public
brand-work page. It is deliberately a status handoff, not a copy of Gmail or
TikTok records. Do not add message bodies, addresses, tracking tokens or other
private data to the repository.

## Evidence states

| State | Meaning | Public page? |
| --- | --- | --- |
| `completed_public` | A deliverable is supported by a live post URL (or exact post mapping), plus campaign/approval evidence. | Yes, after a final content check |
| `accepted_unresolved` | The opportunity was accepted or products were shipped/received, but the exact published post is not yet recovered. | No |
| `offer_only` | A brand or intermediary proposed work, but acceptance, delivery or publication is not evidenced. | No |
| `platform_invite` | A generic mission, affiliate invitation or creator-platform email without a campaign-specific completion trail. | No |

## Current high-signal findings

| Company shown publicly | Evidence status | Matching notes |
| --- | --- | --- |
| Nike | `completed_public` | Source index 99; 7 January 2026; branded-content disclosure; verified short link is already stored. Keep SuperAwesome as internal provenance only. |
| BOSS | `completed_public` | Source index 148; BOSS Bottled Beyond; verified short link is already stored. |
| Moschino | `completed_public` | Source index 200; Buttermilk approval trail; TikTok and Instagram links are already stored. |
| Superdry | `completed_public` | August 2024 gifted campaign: products received, two posts agreed for 16 and 21 September, and the follow-up thank-you confirms the TikToks were created. Exact links are already stored against source indices 316 and 309. |
| Sketch.co | `completed_public` (event work) | Client is Sketch.co. All Points East / Tyler, The Creator is the event context, not a claim of working for the event organiser. |

## Keep private until matched

- Superdry Ski: accepted gifted collaboration; exact trip post still unresolved.
- SUGARGOO, ACBuy and USFans: relationship/affiliate evidence exists, but each
  needs post-level mapping before public display.
- Jean Paul Gaultier, Lyle & Scott, Firmoo and Tilt / Redpill: evidence supports
  a relationship or completed commercial work, but one or more exact links or
  deliverables remain unresolved.
- SKIMS: a selection/profile-completion email only; no shipment, acceptance,
  payment or published post found in the reviewed thread.
- soundcore and Vipa Car Parts: direct opportunities with creator responses,
  but no completed deliverable or payment trail found in the reviewed threads.
- PWDR and In Print We Trust: platform/activation opportunities; do not treat
  as completed brand work without receipt and publication evidence.

## Required fields for the next cross-reference pass

Every candidate should carry `sourceIndex`, `postedAt`, `rawVideoUrl`,
`publicUrl`, `publicUrlStatus`, `coverUrl`, `likesSnapshot`, `viewsSnapshot`,
`contentDisclosure`, `sound`, `whoCanView`, `campaignId` and evidence references.

`publicUrl` must remain null when the only available URL is TikTok's raw export
CDN link. The local `scripts/build-tiktok-audit.mjs` helper creates this safe
manifest from the export without promoting any link to public status.
