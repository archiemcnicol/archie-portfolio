const JSDELIVR_PORTFOLIO_PREFIX =
  "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/";

const RAW_GITHUB_PORTFOLIO_PREFIX =
  "https://raw.githubusercontent.com/archiemcnicol/archie-portfolio/main/public/portfolio/archive/";

/**
 * Portfolio photographs are already deployed inside /public/portfolio/archive.
 * Prefer the same-origin copy so production delivery does not depend on an
 * external GitHub CDN cache. Existing catalogue data can keep its historical
 * URL; this normaliser makes the rendered site deterministic.
 */
export function portfolioImageSrc(src: string) {
  if (src.startsWith(JSDELIVR_PORTFOLIO_PREFIX)) {
    return `/portfolio/archive/${src.slice(JSDELIVR_PORTFOLIO_PREFIX.length)}`;
  }

  if (src.startsWith(RAW_GITHUB_PORTFOLIO_PREFIX)) {
    return `/portfolio/archive/${src.slice(RAW_GITHUB_PORTFOLIO_PREFIX.length)}`;
  }

  return src;
}
