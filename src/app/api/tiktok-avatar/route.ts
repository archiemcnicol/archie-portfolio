import { TIKTOK_PROFILE_AVATAR } from "../../../lib/tiktok-profile-avatar";

export const dynamic = "force-static";

export async function GET() {
  const base64 = TIKTOK_PROFILE_AVATAR.split(",", 2)[1];

  if (!base64) {
    return new Response(null, { status: 404 });
  }

  const bytes = Buffer.from(base64, "base64");

  return new Response(bytes, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": "image/png",
    },
  });
}
