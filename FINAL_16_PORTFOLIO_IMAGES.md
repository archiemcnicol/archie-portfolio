# Final 16 portfolio images

Updated: 4 September 2026

All sixteen previously blocked Google Drive originals have been identified, downloaded, converted and incorporated into the finished 619-photo website archive. The Google Drive originals remain unchanged and private.

## Published delivery

The full WebP recovery derivatives remain in the private Drive staging folder below, while the website uses smaller 800×450 AVIF delivery copies for these final sixteen images.

The sixteen AVIF files are concatenated into one **354,673-byte** immutable pack:

`public/portfolio/archive/final-16-avif.pack`

Pack commit:

`e2e873ece8f902956fabfd481316ddfcbfde4f81`

The records are defined in:

`src/lib/portfolio-final.ts`

and the image endpoint is:

`src/app/api/portfolio-final/[id]/route.ts`

The endpoint retrieves the pinned pack from GitHub Raw, selects the exact byte range for the requested source ID, validates its length, and responds as an immutable `image/avif` asset.

The photography page combines these sixteen records with the existing 603 records, producing **619/619 photographs represented in the finished gallery code**.

## Durable recovery copy

All sixteen larger converted WebPs are retained privately in Google Drive:

- Folder: `Archie Portfolio - Final 16 WebP Staging`
- Folder ID: `1XUvrFldPrrOV1Cfg8PRHyotDpiTM_VJu`
- Verified contents: **16 files exactly**
- Naming convention: `<source-drive-id>.webp`

| Drive ID | Original filename | Recovery WebP bytes |
|---|---|---:|
| `18dAyt42f15vfiQdYb9H_Kzi1o9riwfT3` | `DJI_20250703103418_0005_D.jpg` | 52,906 |
| `1Gg6cdrLJfcAx5BrYsgry1tg2yUSnTMUF` | `DJI_20250831184910_0049_D.jpg` | 138,968 |
| `1KGzec0HOOtk-xtuIyINwesk0gkhWuZOy` | `DJI_20250831185213_0053_D.jpg` | 136,856 |
| `1P59hxLoR2K7r8vPW-sSFbbsvpnIsxdHg` | `DJI_20250831184747_0046_D.jpg` | 135,154 |
| `1RI29B5lcwkhPV5hhN6OFfJVdvyPhWThr` | `Photo00143.jpg` | 145,128 |
| `1Vaxigbjr4n_2lOuIzDpxe2EsIlwj3Ywz` | `DJI_20250814155451_0065_D.jpg` | 233,058 |
| `1WeExibYtRiTUO7ToFtKmMvxaCdsf5uKJ` | `Photo00099.jpg` | 146,948 |
| `1XbmIFrLTgb5JExjJ-5CcQZaIyZ6Zcfu9` | `Photo00041.jpg` | 165,684 |
| `1XxJlFluopAC9ldRXalU_AKnELlxYX_zj` | `DJI_20250831184827_0047_D.jpg` | 106,996 |
| `1YdZ_0FQ92NIfhnwjYeW-Mv-3RYxdCuIA` | `Photo00081.jpg` | 151,658 |
| `1a4XCo1YrNopaS3h1tXpUEodERRrVqePp` | `DJI_20260304160007_0006_D.jpg` | 84,556 |
| `1bQygrUEYMOakrH-yTWtGEJHUJWNkk8Tx` | `DJI_20250814155516_0066_D.jpg` | 240,758 |
| `1eBragPkQDz_ZkDM3qtE2VRfusjF2T415` | `DJI_20250814155425_0064_D.jpg` | 207,448 |
| `1j9AC3EfIQNiMsMUXLoYyl1r9aQqYdm3u` | `DJI_20250831185020_0050_D.jpg` | 80,826 |
| `1qf6tSQBBhLUXJ4CdAQ_NSMJSvD4sO2Zl` | `DJI_20260304155932_0005_D.jpg` | 114,764 |
| `1wbTdGCRcmHMtQ2MNhnFf1-c2REc0-WO7` | `DJI_20250831185228_0055_D.jpg` | 158,196 |

Total recovery WebP volume: **2,299,904 bytes (~2.19 MiB)**.

## Status

- Original large-file download blocker: resolved.
- Conversion: complete, 16/16.
- Durable recovery staging: complete, 16/16.
- GitHub image delivery payload: complete.
- Gallery records: complete, 16/16.
- Photography archive code: complete, **619/619**.
- Obsolete temporary transfer chunks and record drafts: removed.

The only external administration limitation remaining is unrelated to image publication: the connected Vercel OAuth token currently lacks access to the production team scope, so this session cannot inspect the latest Vercel deployment or change Deployment Protection until that Vercel connection is re-authorised.
