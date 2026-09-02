"use client";

import { ChangeEvent, useMemo, useState } from "react";
import {
  BrandRule,
  promotionalCandidates,
  scanTikTokExport,
  ScannedTikTokPost,
  TikTokExport,
} from "@/lib/tiktok/scanner";
import {
  CAMPAIGN_AUDIT_LEADS,
  CAMPAIGN_EVIDENCE_RULES,
  KNOWN_BRAND_RULES,
} from "@/lib/tiktok/campaigns";

const DEFAULT_BRANDS = KNOWN_BRAND_RULES.map((rule) => rule.brand).join(", ");

function brandRules(value: string): BrandRule[] {
  return value
    .split(",")
    .map((brand) => brand.trim())
    .filter(Boolean)
    .map((brand) => ({
      brand,
      aliases:
        KNOWN_BRAND_RULES.find(
          (rule) => rule.brand.toLowerCase() === brand.toLowerCase(),
        )?.aliases ?? [brand, brand.replace("&", "and")],
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
      setPosts(
        scanTikTokExport(
          parsed,
          brandRules(brandInput),
          CAMPAIGN_EVIDENCE_RULES,
        ),
      );
    } catch (err) {
      setPosts([]);
      setError(err instanceof Error ? err.message : "Unable to read this export.");
    }
  }

  return (
    <div className="admin-stack">
      <section className="admin-panel">
        <div className="admin-heading-row">
          <div>
            <div className="eyebrow">Evidence ledger</div>
            <h2>Known campaign history</h2>
            <p className="admin-muted">
              Confirmed work, candidates and unresolved leads are deliberately kept
              separate. A campaign can be real without the exact TikTok being known yet.
            </p>
          </div>
          <span className="admin-pill">No automatic publishing</span>
        </div>

        <div className="admin-ledger">
          {CAMPAIGN_AUDIT_LEADS.map((lead) => (
            <article className="admin-ledger-card" key={`${lead.brand}-${lead.campaign}`}>
              <div className="admin-ledger-topline">
                <strong>{lead.brand}</strong>
                <span data-status={lead.status}>{lead.status.replaceAll("-", " ")}</span>
              </div>
              <h3>{lead.campaign}</h3>
              <p>{lead.summary}</p>
              <small>Next: {lead.nextCheck}</small>
            </article>
          ))}
        </div>
      </section>

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
            <div><strong>{CAMPAIGN_EVIDENCE_RULES.filter((rule) => rule.status === "confirmed").length}</strong><span>confirmed evidence rules</span></div>
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
                    const campaign = [...post.campaignMatches].sort(
                      (a, b) => b.confidence - a.confidence,
                    )[0];
                    return (
                      <tr key={`${post.sourceIndex}-${post.date}`}>
                        <td>{post.date || "Unknown"}</td>
                        <td>{post.likes?.toLocaleString() ?? "—"}</td>
                        <td>
                          {campaign?.brand ?? topMatch?.brand ?? "Brand not identified"}
                          {campaign ? <small className="admin-cell-note">{campaign.campaign}</small> : null}
                        </td>
                        <td>
                          {Math.max(
                            post.promotionalConfidence,
                            campaign?.confidence ?? 0,
                            topMatch?.confidence ?? 0,
                          )}%
                          {campaign ? <small className="admin-cell-note" data-status={campaign.status}>{campaign.status.replaceAll("-", " ")}</small> : null}
                        </td>
                        <td>
                          {[
                            campaign?.summary,
                            ...post.reasons,
                            ...(topMatch?.reasons ?? []),
                            post.visibility ? `Visibility: ${post.visibility}` : "",
                            post.sound ? `Sound: ${post.sound}` : "",
                          ]
                            .filter(Boolean)
                            .join(" · ") || "Manual review"}
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
