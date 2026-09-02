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
  CAMPAIGN_EVIDENCE_RULES,
  KNOWN_BRAND_RULES,
  PARTNERSHIP_AUDIT_RECORDS,
  PartnershipAuditStatus,
} from "@/lib/tiktok/campaigns";

const DEFAULT_BRANDS = KNOWN_BRAND_RULES.map((rule) => rule.brand).join(", ");

type AuditFilter = "all" | "confirmed" | "unresolved" | "offers" | "excluded";

const STATUS_LABELS: Record<PartnershipAuditStatus, string> = {
  "confirmed-post": "Confirmed + linked",
  "confirmed-no-url": "Confirmed · URL missing",
  "candidate-post": "Post candidate",
  "accepted-unresolved": "Accepted · unresolved",
  "offer-only": "Offer only",
  excluded: "Excluded",
  suspicious: "Suspicious",
};

function auditBucket(status: PartnershipAuditStatus): Exclude<AuditFilter, "all"> {
  if (status === "confirmed-post" || status === "confirmed-no-url") return "confirmed";
  if (status === "candidate-post" || status === "accepted-unresolved") return "unresolved";
  if (status === "offer-only") return "offers";
  return "excluded";
}

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
  const [auditFilter, setAuditFilter] = useState<AuditFilter>("all");

  const candidates = useMemo(() => promotionalCandidates(posts), [posts]);
  const disclosureCount = useMemo(
    () => posts.filter((post) => Boolean(post.disclosure)).length,
    [posts],
  );
  const filteredAudit = useMemo(
    () =>
      PARTNERSHIP_AUDIT_RECORDS.filter(
        (record) => auditFilter === "all" || auditBucket(record.status) === auditFilter,
      ),
    [auditFilter],
  );
  const linkedAuditCount = PARTNERSHIP_AUDIT_RECORDS.filter(
    (record) => record.tiktokUrl,
  ).length;

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
            <div className="eyebrow">Full-account evidence ledger</div>
            <h2>Partnership audit</h2>
            <p className="admin-muted">
              This separates completed work from accepted campaigns, post candidates,
              cold offers and exclusions. A relationship is never treated as a public
              post unless the evidence supports that step.
            </p>
          </div>
          <span className="admin-pill">Private · no automatic publishing</span>
        </div>

        <div className="admin-audit-basis">
          <div><strong>34,131</strong><span>Gmail messages read</span></div>
          <div><strong>500</strong><span>TikToks cross-referenced</span></div>
          <div><strong>{PARTNERSHIP_AUDIT_RECORDS.length}</strong><span>campaign records</span></div>
          <div><strong>{linkedAuditCount}</strong><span>exact TikTok URLs recovered</span></div>
        </div>

        <div className="admin-filter-row" aria-label="Filter partnership audit">
          {([
            ["all", "All records"],
            ["confirmed", "Confirmed work"],
            ["unresolved", "Needs matching"],
            ["offers", "Offers only"],
            ["excluded", "Excluded / suspicious"],
          ] as const).map(([value, label]) => (
            <button
              className="admin-filter"
              data-active={auditFilter === value}
              key={value}
              onClick={() => setAuditFilter(value)}
              type="button"
            >
              {label}
              <span>
                {value === "all"
                  ? PARTNERSHIP_AUDIT_RECORDS.length
                  : PARTNERSHIP_AUDIT_RECORDS.filter(
                      (record) => auditBucket(record.status) === value,
                    ).length}
              </span>
            </button>
          ))}
        </div>

        <div className="admin-audit-list">
          {filteredAudit.map((record) => (
            <article className="admin-audit-card" key={record.id}>
              <div className="admin-audit-card-main">
                <div className="admin-ledger-topline">
                  <strong>{record.brand}</strong>
                  <span data-status={record.status}>{STATUS_LABELS[record.status]}</span>
                </div>
                <h3>{record.campaign}</h3>
                <div className="admin-audit-meta">
                  <span>{record.date}</span>
                  <span>{record.category}</span>
                  <span>{record.confidence}% confidence</span>
                </div>
                <p>{record.summary}</p>
                <ul className="admin-evidence-list">
                  {record.evidence.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {record.nextCheck ? <small>Next check: {record.nextCheck}</small> : null}
              </div>
              <div className="admin-audit-links">
                {record.tiktokUrl ? (
                  <a href={record.tiktokUrl} rel="noreferrer" target="_blank">
                    Open TikTok
                  </a>
                ) : (
                  <span>Public URL not recovered</span>
                )}
                {record.instagramUrl ? (
                  <a href={record.instagramUrl} rel="noreferrer" target="_blank">
                    Open Instagram
                  </a>
                ) : null}
                {record.sourceIndexes?.length ? (
                  <small>TikTok index {record.sourceIndexes.join(", ")}</small>
                ) : null}
              </div>
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
                    <th>Post</th>
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
                          {campaign?.tiktokUrl || post.mediaUrl ? (
                            <a
                              className="admin-table-link"
                              href={campaign?.tiktokUrl || post.mediaUrl}
                              rel="noreferrer"
                              target="_blank"
                            >
                              Open TikTok
                            </a>
                          ) : (
                            "URL missing"
                          )}
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
