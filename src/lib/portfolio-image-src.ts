const JSDELIVR_PORTFOLIO_PREFIX =
  "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/";

const RAW_GITHUB_PORTFOLIO_PREFIX =
  "https://raw.githubusercontent.com/archiemcnicol/archie-portfolio/main/public/portfolio/archive/";

/**
 * Portfolio photographs are already deployed inside /public/portfolio/archive.
 * Always prefer the same-origin copy so image delivery does not depend on a
 * third-party GitHub CDN. Existing catalogue data can keep its historical URL;
 * this normaliser makes the rendered site deterministic.
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
