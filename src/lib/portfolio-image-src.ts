/**
 * Keep photography delivery on the canonical archive URL stored in the catalogue.
 * The previous same-origin rewrite caused production project thumbnails to point at
 * archive files that were not consistently present in the deployed public bundle.
 */
export function portfolioImageSrc(src: string) {
  return src;
}
