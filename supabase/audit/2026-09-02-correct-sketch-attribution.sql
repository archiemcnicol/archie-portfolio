-- Correct the client/event distinction for the All Points East / Tyler, The Creator work.
-- Sketch.co is the client relationship; All Points East is the event context.

update public.brands
set
  name = 'Sketch.co',
  slug = 'sketch-co',
  notes = 'Ticket and promotional-content relationship for All Points East / Tyler, The Creator; All Points East is the event, not the client.'
where id = '8bb9e8ad-6d4c-40a6-9fb3-9470201869af';

update public.brand_campaigns
set
  name = 'Sketch.co — All Points East / Tyler, The Creator',
  evidence_summary = 'Two promotional pieces were completed for Sketch.co in connection with All Points East / Tyler, The Creator in exchange for event tickets. All Points East is the event context, not the client.',
  source_type = 'prior conversation + ticket transfer evidence',
  metadata = coalesce(metadata, '{}'::jsonb) || '{"client":"Sketch.co","event":"All Points East","artist":"Tyler, The Creator","deliverables":2}'::jsonb
where id = '4d63fe57-05a9-437a-b3af-e1edb8aad9d6';
