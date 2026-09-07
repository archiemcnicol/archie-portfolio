begin;

update public.tiktok_brand_matches as match
set approved_for_portfolio = true,
    visibility_key = 'public',
    updated_at = now()
from public.tiktok_posts as post
where post.id = match.tiktok_post_id
  and post.source_index in (99, 148, 200, 309, 316)
  and match.match_status = 'confirmed';

update public.tiktok_brand_matches as match
set approved_for_portfolio = false,
    visibility_key = 'brand_agency',
    updated_at = now()
from public.tiktok_posts as post
where post.id = match.tiktok_post_id
  and post.source_index not in (99, 148, 200, 309, 316);

commit;
