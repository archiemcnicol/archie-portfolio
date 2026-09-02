const TIKTOK_HOSTS = new Set(["tiktok.com", "www.tiktok.com", "vm.tiktok.com"]);

function fallbackCover(label = "TikTok cover") {
  const safeLabel = label.replace(/[<&>"']/g, "").slice(0, 80);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 1200" role="img" aria-label="${safeLabel}"><rect width="900" height="1200" fill="#171717"/><circle cx="735" cy="190" r="220" fill="#d8ff34" opacity=".9"/><circle cx="170" cy="1035" r="260" fill="#2955ff" opacity=".8"/><path d="M418 450v300a116 116 0 1 0 116-116V470h80v-86c-51 0-91-38-91-86h-86v452a35 35 0 1 1-35-35V450h16z" fill="#fff"/><text x="72" y="1100" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="700" fill="#fff">${safeLabel}</text></svg>`;
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
    const response = await fetch(
      `https://www.tiktok.com/oembed?url=${encodeURIComponent(videoUrl.toString())}`,
      {
        headers: { Accept: "application/json", "User-Agent": "archie-portfolio/1.0" },
        next: { revalidate: 86400 },
      },
    );

    if (!response.ok) throw new Error(`TikTok oEmbed returned ${response.status}`);
    const data = (await response.json()) as { thumbnail_url?: string; title?: string };

    if (!data.thumbnail_url) throw new Error("TikTok did not return a cover image");
    return Response.redirect(data.thumbnail_url, 307);
  } catch {
    return new Response(fallbackCover("TikTok cover unavailable"), {
      headers: {
        "Cache-Control": "public, max-age=3600",
        "Content-Type": "image/svg+xml; charset=utf-8",
      },
    });
  }
}
