begin;

insert into public.brands (name, slug, category, notes)
values
  ('NOTION MGMT', 'notion-mgmt', 'music / creator campaign', 'Paid sound-promotion work administered through Creator Core.'),
  ('KORA Works', 'kora-works', 'music / creator campaign', 'Paid sound-promotion work for Omar+.'),
  ('Tilt / Redpill', 'tilt-redpill', 'creator campaign', '£350 agreement and matching payment confirm completed commercial work; exact deliverable remains unresolved.'),
  ('Firmoo', 'firmoo', 'eyewear', 'Creation and payment correspondence confirms work beyond an unaccepted offer; exact content remains unresolved.'),
  ('All Points East', 'all-points-east', 'event / entertainment', 'Promotional creator work completed in August 2026 in exchange for event tickets.'),
  ('ACBuy', 'acbuy', 'affiliate / shipping agent', 'Long-running affiliate and creator relationship; exact post mapping remains a separate audit stream.'),
  ('USFans', 'usfans', 'affiliate / shipping agent', 'Affiliate and creator relationship with verified registrations and activations.')
on conflict (slug) do update
set updated_at = now();

insert into public.brand_campaigns
  (brand_id, name, campaign_type, started_at, ended_at, evidence_summary, source_type, status, metadata)
select b.id, v.name, v.campaign_type, v.started_at, v.ended_at,
       v.evidence_summary, v.source_type, v.status, v.metadata
from (
  values
    ('notion-mgmt', 'KiLLOWEN — Pick Your Poison', 'paid sound promotion', date '2025-03-10', date '2025-03-10',
     'Exact public sound match, campaign approval trail and matching NOTION payment evidence.', 'TikTok export + prior campaign/payment evidence', 'completed',
     jsonb_build_object('sound', 'pick your poison - KiLLOWEN')),
    ('notion-mgmt', 'KiLLOWEN — ALL 2 U', 'paid sound promotion', date '2025-06-26', date '2025-06-26',
     'Exact public sound match immediately after the £30 brief, supported by Creator Core payment evidence.', 'TikTok export + Gmail/payment evidence', 'completed',
     jsonb_build_object('sound', 'ALL 2 U - KiLLOWEN')),
    ('notion-mgmt', 'Charlotte Plank — Chemical Fashion', 'sound promotion / private drafts', date '2025-03-15', date '2025-03-16',
     'Two exact-sound records exist, but both are Only You. They are retained for audit and excluded from completed public work.', 'TikTok export', 'candidate',
     jsonb_build_object('portfolio_exclusion', true, 'reason', 'Only You records')),
    ('kora-works', 'Omar+ — Frozen', 'paid sound promotion', date '2025-11-26', date '2025-11-27',
     'Exact public sound match, £50 invoice the following day and matching £50 KORA Works payment.', 'TikTok export + invoice + payment evidence', 'completed',
     jsonb_build_object('sound', 'Frozen - omarplus', 'fee_gbp', 50)),
    ('superdry', 'Superdry Ski', 'gifted creator collaboration', date '2025-01-23', date '2025-02-20',
     'Superdry offered two ski pieces for TikTok content and Archie accepted for his 13–20 February trip. The campaign is confirmed; the exact public trip post is unresolved.', 'Gmail + TikTok export', 'confirmed',
     jsonb_build_object('exact_post', 'unresolved', 'public_candidate_source_indexes', jsonb_build_array(260, 259, 258))),
    ('boss', 'BOSS Bottled — 14 November audit lead', 'gifted fragrance creator / PR', date '2025-11-14', date '2025-11-14',
     'Archie directly identified BOSS Bottled against 14 November 2025. This remains separate from the confirmed 4 October BOSS Bottled Beyond link until the second evidence trail is reconciled.', 'user correction + TikTok export', 'candidate',
     jsonb_build_object('source_index', 128, 'exact_post', 'candidate')),
    ('lyle-and-scott', 'Historic Lyle & Scott creator collaboration', 'gifted / creator collaboration', null::date, null::date,
     'Prior records confirm genuine historical collaboration, but the exact TikTok and deliverable have not yet been recovered.', 'prior conversation evidence', 'confirmed',
     jsonb_build_object('exact_post', 'unresolved')),
    ('tilt-redpill', 'Tilt / Redpill paid creator campaign', 'paid creator campaign', null::date, null::date,
     'A £350 agreement and matching £350 payment confirm completed commercial work; the exact TikTok remains unresolved.', 'agreement + payment evidence', 'completed',
     jsonb_build_object('fee_gbp', 350, 'exact_post', 'unresolved')),
    ('firmoo', 'Firmoo eyewear creator work', 'affiliate / creator collaboration', null::date, null::date,
     'Creation and payment correspondence confirms work beyond an unaccepted offer. Exact content and final payment status still need isolating.', 'prior correspondence evidence', 'confirmed',
     jsonb_build_object('exact_post', 'unresolved')),
    ('all-points-east', 'Tyler, The Creator promotional content', 'event promotion', date '2026-08-26', date '2026-08-28',
     'Two promotional pieces were completed for All Points East in exchange for event tickets.', 'prior conversation + ticket transfer evidence', 'completed',
     jsonb_build_object('deliverables', 2, 'exact_posts', 'newer export or live links required')),
    ('acbuy', 'ACBuy affiliate and creator relationship', 'affiliate / shipping-agent content', date '2025-04-01', date '2026-01-28',
     'Verified affiliate relationship with tracked invites, activations, commission and repeated creator content. Exact post mapping remains in progress.', 'affiliate records + prior conversation evidence', 'completed',
     jsonb_build_object('exact_posts', 'unresolved')),
    ('usfans', 'USFans affiliate and creator relationship', 'affiliate / shipping-agent content', date '2025-03-14', date '2025-05-14',
     'Verified two-month affiliate relationship with registrations and activations. Exact post mapping remains in progress.', 'affiliate records + prior conversation evidence', 'completed',
     jsonb_build_object('exact_posts', 'unresolved'))
) as v(brand_slug, name, campaign_type, started_at, ended_at, evidence_summary, source_type, status, metadata)
join public.brands b on b.slug = v.brand_slug
on conflict (brand_id, name) do update
set campaign_type = excluded.campaign_type,
    started_at = excluded.started_at,
    ended_at = excluded.ended_at,
    evidence_summary = excluded.evidence_summary,
    source_type = excluded.source_type,
    status = excluded.status,
    metadata = public.brand_campaigns.metadata || excluded.metadata,
    updated_at = now();

insert into public.tiktok_brand_matches
  (tiktok_post_id, brand_id, campaign_id, confidence, match_status, promo_type,
   evidence_summary, evidence, approved_for_portfolio, visibility_key)
select tp.id, b.id, bc.id, v.confidence, v.match_status, v.promo_type,
       v.evidence_summary, v.evidence, false, 'brand_agency'
from (
  values
    (249, 'notion-mgmt', 'KiLLOWEN — Pick Your Poison', 99, 'confirmed', 'paid sound promotion',
     'Exact public sound match, campaign trail and payment evidence.', jsonb_build_object('sound_match', true, 'public_post', true)),
    (197, 'notion-mgmt', 'KiLLOWEN — ALL 2 U', 99, 'confirmed', 'paid sound promotion',
     'Exact public sound match and Creator Core payment evidence.', jsonb_build_object('sound_match', true, 'public_post', true)),
    (245, 'notion-mgmt', 'Charlotte Plank — Chemical Fashion', 45, 'candidate', 'private sound-campaign draft',
     'Exact sound match, but this record is Only You and is not completed public work.', jsonb_build_object('portfolio_exclusion', true, 'visibility', 'Only You')),
    (244, 'notion-mgmt', 'Charlotte Plank — Chemical Fashion', 45, 'candidate', 'private sound-campaign draft',
     'Exact sound match, but this record is Only You and is not completed public work.', jsonb_build_object('portfolio_exclusion', true, 'visibility', 'Only You')),
    (123, 'kora-works', 'Omar+ — Frozen', 100, 'confirmed', 'paid sound promotion',
     'Exact public sound match with £50 invoice and payment trail.', jsonb_build_object('sound_match', true, 'invoice_gbp', 50, 'payment_match', true)),
    (148, 'boss', 'BOSS Bottled Beyond PR Gifting', 100, 'confirmed', 'gifted fragrance creator / PR',
     'The supplied BOSS live link resolves to this exact 4 October 2025 TikTok.', jsonb_build_object('live_tiktok', 'https://vm.tiktok.com/ZNd7Wft36/', 'resolved_video_id', '7557375899180485910')),
    (128, 'boss', 'BOSS Bottled — 14 November audit lead', 82, 'candidate', 'gifted fragrance creator / PR',
     'Archie directly identified BOSS Bottled against 14 November 2025. Kept as a separate candidate from the confirmed 4 October post.', jsonb_build_object('user_identified_date', '2025-11-14', 'requires_second_evidence_trail', true))
) as v(source_index, brand_slug, campaign_name, confidence, match_status, promo_type, evidence_summary, evidence)
join public.tiktok_posts tp on tp.source_index = v.source_index
join public.brands b on b.slug = v.brand_slug
join public.brand_campaigns bc on bc.brand_id = b.id and bc.name = v.campaign_name
on conflict (tiktok_post_id, brand_id) do update
set campaign_id = excluded.campaign_id,
    confidence = excluded.confidence,
    match_status = excluded.match_status,
    promo_type = excluded.promo_type,
    evidence_summary = excluded.evidence_summary,
    evidence = public.tiktok_brand_matches.evidence || excluded.evidence,
    approved_for_portfolio = false,
    visibility_key = excluded.visibility_key,
    updated_at = now();

commit;
