import { readFile } from "node:fs/promises";
import { join } from "node:path";

const PACK_PATH = join(
  process.cwd(),
  "public",
  "portfolio",
  "archive",
  "final-16-avif.pack",
);

const INDEX: Record<string, { offset: number; length: number }> = {
  "18dAyt42f15vfiQdYb9H_Kzi1o9riwfT3": { offset: 0, length: 10612 },
  "1Gg6cdrLJfcAx5BrYsgry1tg2yUSnTMUF": { offset: 10612, length: 22451 },
  "1KGzec0HOOtk-xtuIyINwesk0gkhWuZOy": { offset: 33063, length: 25787 },
  "1P59hxLoR2K7r8vPW-sSFbbsvpnIsxdHg": { offset: 58850, length: 21527 },
  "1RI29B5lcwkhPV5hhN6OFfJVdvyPhWThr": { offset: 80377, length: 22230 },
  "1Vaxigbjr4n_2lOuIzDpxe2EsIlwj3Ywz": { offset: 102607, length: 29569 },
  "1WeExibYtRiTUO7ToFtKmMvxaCdsf5uKJ": { offset: 132176, length: 21739 },
  "1XbmIFrLTgb5JExjJ-5CcQZaIyZ6Zcfu9": { offset: 153915, length: 26794 },
  "1XxJlFluopAC9ldRXalU_AKnELlxYX_zj": { offset: 180709, length: 19835 },
  "1YdZ_0FQ92NIfhnwjYeW-Mv-3RYxdCuIA": { offset: 200544, length: 15726 },
  "1a4XCo1YrNopaS3h1tXpUEodERRrVqePp": { offset: 216270, length: 17842 },
  "1bQygrUEYMOakrH-yTWtGEJHUJWNkk8Tx": { offset: 234112, length: 31329 },
  "1eBragPkQDz_ZkDM3qtE2VRfusjF2T415": { offset: 265441, length: 24461 },
  "1j9AC3EfIQNiMsMUXLoYyl1r9aQqYdm3u": { offset: 289902, length: 15069 },
  "1qf6tSQBBhLUXJ4CdAQ_NSMJSvD4sO2Zl": { offset: 304971, length: 20407 },
  "1wbTdGCRcmHMtQ2MNhnFf1-c2REc0-WO7": { offset: 325378, length: 29295 },
};

export const runtime = "nodejs";

let packPromise: Promise<Buffer> | null = null;

function getPack() {
  packPromise ??= readFile(PACK_PATH);
  return packPromise;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const entry = INDEX[id];

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const pack = await getPack();
    const image = pack.subarray(entry.offset, entry.offset + entry.length);

    if (image.length !== entry.length) {
      return new Response("Image unavailable", { status: 502 });
    }

    const payload = Uint8Array.from(image).buffer;

    return new Response(payload, {
      headers: {
        "Content-Type": "image/avif",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Image unavailable", { status: 502 });
  }
}
