const JSDELIVR_PORTFOLIO_PREFIX =
  "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/";

const RAW_GITHUB_PORTFOLIO_PREFIX =
  "https://raw.githubusercontent.com/archiemcnicol/archie-portfolio/main/public/portfolio/archive/";

const LOCAL_PORTFOLIO_PREFIX = "/portfolio/archive/";

const PINNED_PORTFOLIO_PREFIX =
  "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@c1d1e173c706b9b4e250668b7aaa31747d5290ce/public/portfolio/archive/";

const CLOUDINARY_FETCH_PREFIX =
  "https://res.cloudinary.com/i1xhlvd6/image/fetch/";

export const PORTFOLIO_CARD_WIDTHS = [480, 720, 960, 1280, 1600] as const;
export const PORTFOLIO_VIEWER_WIDTHS = [960, 1280, 1600, 2048, 2560, 3200] as const;

/**
 * Serve the photography archive from an immutable Git commit on jsDelivr.
 * Using @main can retain stale CDN state after a force-push/history purge, while
 * the same-origin Vercel archive has previously proved incomplete in production.
 * Pinning the known-good asset snapshot gives every catalogue item a stable URL
 * without depending on mutable branch resolution or the deployed public bundle.
 */
export function portfolioImageSrc(src: string) {
  if (src.startsWith(JSDELIVR_PORTFOLIO_PREFIX)) {
    return `${PINNED_PORTFOLIO_PREFIX}${src.slice(JSDELIVR_PORTFOLIO_PREFIX.length)}`;
  }

  if (src.startsWith(RAW_GITHUB_PORTFOLIO_PREFIX)) {
    return `${PINNED_PORTFOLIO_PREFIX}${src.slice(RAW_GITHUB_PORTFOLIO_PREFIX.length)}`;
  }

  if (src.startsWith(LOCAL_PORTFOLIO_PREFIX)) {
    return `${PINNED_PORTFOLIO_PREFIX}${src.slice(LOCAL_PORTFOLIO_PREFIX.length)}`;
  }

  return src;
}

/**
 * Build a responsive Cloudinary fetch URL without touching Vercel's image
 * optimiser. Cloudinary creates the requested delivery width and caches it at
 * the edge; f_auto/q_auto:best keeps high-density displays crisp while avoiding
 * a single oversized download for every card.
 */
export function portfolioResponsiveSrc(src: string, width: number) {
  const source = portfolioImageSrc(src);
  const safeWidth = Math.max(320, Math.min(3200, Math.round(width)));
  return `${CLOUDINARY_FETCH_PREFIX}c_scale,w_${safeWidth}/f_auto/q_auto:best/${encodeURIComponent(source)}`;
}

export function portfolioResponsiveSrcSet(
  src: string,
  widths: readonly number[],
) {
  return widths
    .map((width) => `${portfolioResponsiveSrc(src, width)} ${width}w`)
    .join(", ");
}
