"use client";

import { ChangeEvent, useMemo, useState } from "react";
import {
  BrandRule,
  promotionalCandidates,
  scanTikTokExport,
  ScannedTikTokPost,
  TikTokExport,
} from "@/lib/tiktok/scanner";

const DEFAULT_BRANDS = "Superdry, Nike, Lyle & Scott, Moschino, BOSS";

function brandRules(value: string): BrandRule[] {
  return value
    .split(",")
    .map((brand) => brand.trim())
    .filter(Boolean)
    .map((brand) => ({
      brand,
      aliases: [brand, brand.replace("&", "and")],
    }));
}

export function TikTokScanner() {
  const [brandInput, setBrandInput] = useState(DEFAULT_BRANDS);
  const [posts, setPosts] = useState<ScannedTikTokPost[]>([]);
  const [error, setError] = useState("");
  const [filename, setFilename] = useState("");

  const candidates = useMemo(() => promotionalCandidates(posts), [posts]);
  const disclosureCount = useMemo(
    () => posts.filter((post) => Boolean(post.disclosure)).length,
    [posts],
  );

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError("");
      setFilename(file.name);
      const text = await file.text();
      const parsed = JSON.parse(text) as TikTokExport;
      setPosts(scanTikTokExport(parsed, brandRules(brandInput)));
    } catch (err) {
      setPosts([]);
      setError(err instanceof Error ? err.message : "Unable to read this export.");
    }
  }

  return (
    <div className="admin-stack">
      <section className="admin-panel">
        <div>
          <div className="eyebrow">Historical import</div>
          <h2>TikTok content scanner</h2>
          <p className="admin-muted">
            First-pass metadata scanner. It never publishes anything. Campaign-email,
            visual and manual evidence are layered on during review.
          </p>
        </div>

        <label className="admin-field">
          <span>Brands to look for</span>
          <input
            value={brandInput}
            onChange={(event) => setBrandInput(event.target.value)}
            placeholder="Superdry, Nike, Moschino…"
          />
        </label>

        <label className="admin-upload">
          <span>Choose TikTok JSON export</span>
          <input type="file" accept="application/json,.json" onChange={handleFile} />
        </label>

        {filename ? <p className="admin-muted">Loaded: {filename}</p> : null}
        {error ? <p className="admin-error">{error}</p> : null}
      </section>

      {posts.length ? (
        <>
          <section className="admin-stats">
            <div><strong>{posts.length}</strong><span>posts in export</span></div>
            <div><strong>{disclosureCount}</strong><span>TikTok disclosures</span></div>
            <div><strong>{candidates.length}</strong><span>metadata candidates</span></div>
            <div><strong>0</strong><span>auto-published</span></div>
          </section>

          <section className="admin-panel">
            <div className="admin-heading-row">
              <div>
                <div className="eyebrow">Review queue</div>
                <h2>Likely promotional posts</h2>
              </div>
              <span className="admin-pill">Human approval required</span>
            </div>

            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Likes snapshot</th>
                    <th>Brand</th>
                    <th>Confidence</th>
                    <th>Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((post) => {
                    const topMatch = [...post.matches].sort(
                      (a, b) => b.confidence - a.confidence,
                    )[0];
                    return (
                      <tr key={`${post.sourceIndex}-${post.date}`}>
                        <td>{post.date || "Unknown"}</td>
                        <td>{post.likes?.toLocaleString() ?? "—"}</td>
                        <td>{topMatch?.brand ?? "Brand not identified"}</td>
                        <td>{Math.max(post.promotionalConfidence, topMatch?.confidence ?? 0)}%</td>
                        <td>
                          {[...post.reasons, ...(topMatch?.reasons ?? [])].join(" · ") ||
                            "Manual review"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}
