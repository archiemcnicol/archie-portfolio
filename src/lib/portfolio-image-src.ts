const JSDELIVR_PORTFOLIO_PREFIX =
  "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@main/public/portfolio/archive/";

const RAW_GITHUB_PORTFOLIO_PREFIX =
  "https://raw.githubusercontent.com/archiemcnicol/archie-portfolio/main/public/portfolio/archive/";

const LOCAL_PORTFOLIO_PREFIX = "/portfolio/archive/";

const PINNED_PORTFOLIO_PREFIX =
  "https://cdn.jsdelivr.net/gh/archiemcnicol/archie-portfolio@c1d1e173c706b9b4e250668b7aaa31747d5290ce/public/portfolio/archive/";

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
