# Final 16 portfolio images

Updated: 3 September 2026

All sixteen previously-blocked Google Drive originals have now been identified, downloaded successfully and converted locally to 1120×630 WebP derivatives at quality 58. The Google Drive originals remain unchanged and private.

The remaining task is publication only: place each WebP at `public/portfolio/archive/<drive-id>.webp`, add the corresponding record to `src/lib/portfolio-archive.ts`, verify 619/619, and redeploy.

| Drive ID | Original filename | WebP bytes | Output |
|---|---|---:|---|
| `18dAyt42f15vfiQdYb9H_Kzi1o9riwfT3` | `DJI_20250703103418_0005_D.jpg` | 52,906 | 1120×630 |
| `1Gg6cdrLJfcAx5BrYsgry1tg2yUSnTMUF` | `DJI_20250831184910_0049_D.jpg` | 138,968 | 1120×630 |
| `1KGzec0HOOtk-xtuIyINwesk0gkhWuZOy` | `DJI_20250831185213_0053_D.jpg` | 136,856 | 1120×630 |
| `1P59hxLoR2K7r8vPW-sSFbbsvpnIsxdHg` | `DJI_20250831184747_0046_D.jpg` | 135,154 | 1120×630 |
| `1RI29B5lcwkhPV5hhN6OFfJVdvyPhWThr` | `Photo00143.jpg` | 145,128 | 1120×630 |
| `1Vaxigbjr4n_2lOuIzDpxe2EsIlwj3Ywz` | `DJI_20250814155451_0065_D.jpg` | 233,058 | 1120×630 |
| `1WeExibYtRiTUO7ToFtKmMvxaCdsf5uKJ` | `Photo00099.jpg` | 146,948 | 1120×630 |
| `1XbmIFrLTgb5JExjJ-5CcQZaIyZ6Zcfu9` | `Photo00041.jpg` | 165,684 | 1120×630 |
| `1XxJlFluopAC9ldRXalU_AKnELlxYX_zj` | `DJI_20250831184827_0047_D.jpg` | 106,996 | 1120×630 |
| `1YdZ_0FQ92NIfhnwjYeW-Mv-3RYxdCuIA` | `Photo00081.jpg` | 151,658 | 1120×630 |
| `1a4XCo1YrNopaS3h1tXpUEodERRrVqePp` | `DJI_20260304160007_0006_D.jpg` | 84,556 | 1120×630 |
| `1bQygrUEYMOakrH-yTWtGEJHUJWNkk8Tx` | `DJI_20250814155516_0066_D.jpg` | 240,758 | 1120×630 |
| `1eBragPkQDz_ZkDM3qtE2VRfusjF2T415` | `DJI_20250814155425_0064_D.jpg` | 207,448 | 1120×630 |
| `1j9AC3EfIQNiMsMUXLoYyl1r9aQqYdm3u` | `DJI_20250831185020_0050_D.jpg` | 80,826 | 1120×630 |
| `1qf6tSQBBhLUXJ4CdAQ_NSMJSvD4sO2Zl` | `DJI_20260304155932_0005_D.jpg` | 114,764 | 1120×630 |
| `1wbTdGCRcmHMtQ2MNhnFf1-c2REc0-WO7` | `DJI_20250831185228_0055_D.jpg` | 158,196 | 1120×630 |

Total derivative volume: **2,299,904 bytes (~2.19 MiB)**.

## Resolved blockers

- The earlier Google Drive inline/base64 ceiling is no longer a blocker: `download_raw_file=true` with streamed file references successfully downloaded every remaining 38–46 MB original.
- All sixteen derivatives were generated successfully in the working environment.

## Remaining transport blocker

The current GitHub connector can create binary Git blobs from base64 text but does not expose a top-level local-file upload parameter. The Cloudinary upload action accepts local files conceptually, but its file parameter is nested and the connector runtime cannot rewrite proxied local mounts in that position. Direct outbound networking from the workspace is DNS-blocked. Therefore the derivatives are complete, but must not be marked published until the binary files have actually been attached to the GitHub tree or another public image host.
