const TIKTOK_HOSTS = new Set(["tiktok.com", "www.tiktok.com", "vm.tiktok.com"]);

function fallbackCover(label = "TikTok cover") {
  const safeLabel = label.replace(/[<&>"']/g, "").slice(0, 80);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" role="img" aria-label="${safeLabel}"><rect width="900" height="1200" fill="#e8e4dc"/><path d="M405 400v320a124 124 0 1 0 124-124V420h86v-92c-55 0-98-41-98-92h-92v484a38 38 0 1 1-38-38V400h18z" fill="#111"/><text x="72" y="1090" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="700" fill="#111">${safeLabel}</text></svg>`;
}

async function resolveTikTokUrl(source: URL) {
  if (source.hostname.toLowerCase() !== "vm.tiktok.com") return source.toString();

  try {
    const response = await fetch(source.toString(), {
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ArchiePortfolio/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 86400 },
    });

    const resolved = new URL(response.url);
    if (TIKTOK_HOSTS.has(resolved.hostname.toLowerCase())) {
      return resolved.toString();
    }
  } catch {
    // Fall back to the supplied short URL below.
  }

  return source.toString();
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const source = requestUrl.searchParams.get("url");

  if (!source) {
    return new Response("Missing TikTok URL", { status: 400 });
  }

  let videoUrl: URL;
  try {
    videoUrl = new URL(source);
  } catch {
    return new Response("Invalid TikTok URL", { status: 400 });
  }

  if (!TIKTOK_HOSTS.has(videoUrl.hostname.toLowerCase())) {
    return new Response("Only TikTok URLs are supported", { status: 400 });
  }

  try {
    const canonicalUrl = await resolveTikTokUrl(videoUrl);
    const oembedResponse = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(canonicalUrl)}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (compatible; ArchiePortfolio/1.0)",
        },
        next: { revalidate: 86400 },
      },
    );

    if (!oembedResponse.ok) {
      throw new Error(`TikTok oEmbed returned ${oembedResponse.status}`);
    }

    const data = (await oembedResponse.json()) as { thumbnail_url?: string };
    if (!data.thumbnail_url) throw new Error("TikTok did not return a cover image");

    const thumbnailUrl = new URL(data.thumbnail_url);
    if (thumbnailUrl.protocol !== "https:") {
      throw new Error("TikTok returned a non-HTTPS thumbnail");
    }

    const imageResponse = await fetch(thumbnailUrl, {
      headers: {
        Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: "https://www.tiktok.com/",
        "User-Agent": "Mozilla/5.0 (compatible; ArchiePortfolio/1.0)",
      },
      next: { revalidate: 86400 },
    });

    if (!imageResponse.ok) {
      throw new Error(`TikTok thumbnail returned ${imageResponse.status}`);
    }

    const contentType = imageResponse.headers.get("content-type") ?? "image/jpeg";
    if (!contentType.startsWith("image/")) {
      throw new Error("TikTok thumbnail response was not an image");
    }

    return new Response(await imageResponse.arrayBuffer(), {
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
        "Content-Type": contentType,
      },
    });
  } catch {
    return new Response(fallbackCover("TikTok cover unavailable"), {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  }
}
