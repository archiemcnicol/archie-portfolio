"use client";

import {
  type CSSProperties,
  type SyntheticEvent,
  useState,
} from "react";
import {
  PORTFOLIO_CARD_WIDTHS,
  portfolioImageSrc,
  portfolioRawImageSrc,
  portfolioResponsiveSrc,
  portfolioResponsiveSrcSet,
} from "@/lib/portfolio-image-src";

type ResilientPortfolioImageProps = {
  alt: string;
  source: string;
  sizes: string;
  priority?: boolean;
  quality?: "good" | "best";
  width?: number;
  style?: CSSProperties;
  className?: string;
};

export function ResilientPortfolioImage({
  alt,
  source,
  sizes,
  priority = false,
  quality = "good",
  width = 1280,
  style,
  className,
}: ResilientPortfolioImageProps) {
  const [fallbackStage, setFallbackStage] = useState(0);

  function handleError(event: SyntheticEvent<HTMLImageElement>) {
    const image = event.currentTarget;
    image.removeAttribute("srcset");

    if (fallbackStage === 0) {
      setFallbackStage(1);
      image.src = portfolioImageSrc(source);
      return;
    }

    if (fallbackStage === 1) {
      setFallbackStage(2);
      image.src = portfolioRawImageSrc(source);
    }
  }

  const useResponsiveSource = fallbackStage === 0;

  return (
    <img
      alt={alt}
      className={className}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      loading={priority ? "eager" : "lazy"}
      onError={handleError}
      sizes={sizes}
      src={
        useResponsiveSource
          ? portfolioResponsiveSrc(source, width, quality)
          : fallbackStage === 1
            ? portfolioImageSrc(source)
            : portfolioRawImageSrc(source)
      }
      srcSet={
        useResponsiveSource
          ? portfolioResponsiveSrcSet(source, PORTFOLIO_CARD_WIDTHS, quality)
          : undefined
      }
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }}
    />
  );
}
