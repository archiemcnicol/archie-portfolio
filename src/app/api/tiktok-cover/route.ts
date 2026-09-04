const TIKTOK_HOSTS = new Set(["tiktok.com", "www.tiktok.com", "vm.tiktok.com"]);

const IMAGE_ACCEPT = "image/avif,image/webp,image/apng,image/*,*/*;q=0.8";
const USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/152.0 Safari/537.36";

function fallbackCover(label = "TikTok cover") {
  const safeLabel = label.replace(/[<&>"']/g, "").slice(0, 80);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" role="img" aria-label="${safeLabel}"><rect width="900" height="1200" fill="#e8e4dc"/><path d="M405 400v320a124 124 0 1 0 124-124V420h86v-92c-55 0-98-41-98-92h-92v484a38 38 0 1 1-38-38V400h18z" fill="#111"/><text x="72" y="1090" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="700" fill="#111">${safeLabel}</text></svg>`;
}

async function proxyImage(url: string) {
  const imageUrl = new URL(url);
  if (imageUrl.protocol !== "https:") return null;

  const response = await fetch(imageUrl, {
    headers: {
      Accept: IMAGE_ACCEPT,
      Referer: "https://www.tiktok.com/",
      "User-Agent": USER_AGENT,
    },
    redirect: "follow",
    next: { revalidate: 604800 },
  });

  if (!response.ok) return null;

  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  if (!contentType.startsWith("image/")) return null;

  return {
    bytes: await response.arrayBuffer(),
    contentType,
  };
}

async function getTikWmCover(source: string) {
  const apiUrl = new URL("https://www.tikwm.com/api/");
  apiUrl.searchParams.set("url", source);
  apiUrl.searchParams.set("hd", "1");

  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/json",
      "User-Agent": USER_AGENT,
    },
    next: { revalidate: 604800 },
  });

  if (!response.ok) return null;

  const payload = (await response.json()) as {
    code?: number;
    data?: {
      cover?: string;
      origin_cover?: string;
    };
  };

  if (payload.code !== 0 || !payload.data) return null;

  const candidates = [payload.data.origin_cover, payload.data.cover].filter(
    (value): value is string => Boolean(value),
  );

  for (const candidate of candidates) {
    try {
      const image = await proxyImage(candidate);
      if (image) return image;
    } catch {
      // Try the next cover candidate.
    }
  }

  return null;
}

async function resolveTikTokUrl(source: URL) {
  if (source.hostname.toLowerCase() !== "vm.tiktok.com") return source.toString();

  try {
    const response = await fetch(source.toString(), {
      redirect: "follow",
      headers: {
        "User-Agent": USER_AGENT,
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

async function getTikTokOembedCover(source: URL) {
  const canonicalUrl = await resolveTikTokUrl(source);
  const oembedResponse = await fetch(
    `https://www.tiktok.com/oembed?url=${encodeURIComponent(canonicalUrl)}`,
    {
      headers: {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      },
      next: { revalidate: 86400 },
    },
  );

  if (!oembedResponse.ok) return null;

  const data = (await oembedResponse.json()) as { thumbnail_url?: string };
  if (!data.thumbnail_url) return null;

  return proxyImage(data.thumbnail_url);
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
    const image =
      (await getTikWmCover(videoUrl.toString())) ??
      (await getTikTokOembedCover(videoUrl));

    if (!image) throw new Error("No TikTok cover provider returned an image");

    return new Response(image.bytes, {
      headers: {
        "Cache-Control":
          "public, max-age=604800, s-maxage=2592000, stale-while-revalidate=31536000",
        "Content-Type": image.contentType,
      },
    });
  } catch {
    return new Response(fallbackCover("TikTok cover unavailable"), {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  }
}
