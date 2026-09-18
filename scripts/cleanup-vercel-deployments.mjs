const token = process.env.VERCEL_TOKEN;
const projectName = process.env.VERCEL_PROJECT;

if (!token) {
  console.error("Missing VERCEL_TOKEN.");
  process.exit(1);
}

const teamId = "team_DmJG03IKZDcgfhTBTtrkv20m";
const projects = {
  "archie-portfolio": "prj_MoGTzcK0VwAU75w6FBADSIzW478i",
  "creator-ops-agent": "prj_1rA5U9qsxmb8vF4sysqPOSJSVEl8",
};

const projectId = projects[projectName];
if (!projectId) {
  console.error(`Unknown or missing VERCEL_PROJECT: ${projectName ?? "(unset)"}`);
  process.exit(1);
}

const api = async (path, init = {}) => {
  const response = await fetch(`https://api.vercel.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${init.method ?? "GET"} ${path} -> ${response.status}: ${body}`);
  }

  if (response.status === 204) return null;
  return response.json();
};

async function listAllDeployments() {
  const deployments = [];
  let until;

  for (;;) {
    const params = new URLSearchParams({
      projectId,
      teamId,
      limit: "100",
    });
    if (until) params.set("until", String(until));

    const data = await api(`/v6/deployments?${params}`);
    const page = data.deployments ?? [];
    deployments.push(...page);

    const next = data.pagination?.next;
    if (!next || page.length === 0) break;
    until = next;
  }

  const seen = new Set();
  return deployments.filter((deployment) => {
    const id = deployment.uid ?? deployment.id;
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

const terminalStates = new Set(["READY", "ERROR", "CANCELED", "BLOCKED"]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function deleteDeployment(id) {
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    const response = await fetch(
      `https://api.vercel.com/v13/deployments/${encodeURIComponent(id)}?teamId=${encodeURIComponent(teamId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.ok || response.status === 404) return;

    if (response.status === 429 && attempt < 8) {
      const retryAfter = Number(response.headers.get("retry-after"));
      const waitSeconds = Number.isFinite(retryAfter)
        ? Math.max(1, retryAfter)
        : Math.min(30, 2 ** attempt);
      await sleep(waitSeconds * 1000);
      continue;
    }

    const body = await response.text();
    throw new Error(`DELETE ${id} -> ${response.status}: ${body}`);
  }
}

const deployments = await listAllDeployments();
deployments.sort((a, b) => (b.created ?? b.createdAt ?? 0) - (a.created ?? a.createdAt ?? 0));

const readyProduction = deployments.filter(
  (deployment) => deployment.state === "READY" && deployment.target === "production",
);

// Preserve the two newest healthy production deployments as rollback points.
const keepIds = new Set(
  readyProduction.slice(0, 2).map((deployment) => deployment.uid ?? deployment.id),
);

const candidates = deployments.filter((deployment) => {
  const id = deployment.uid ?? deployment.id;
  if (!id || keepIds.has(id)) return false;
  return terminalStates.has(deployment.state);
});

console.log("\n============================================================");
console.log(`${projectName}: ${deployments.length} deployments found`);
console.log("KEEP:");
for (const deployment of deployments.filter((d) => keepIds.has(d.uid ?? d.id))) {
  console.log(
    `  ${deployment.uid ?? deployment.id}  ${deployment.state}  ${deployment.target ?? "preview"}  ${deployment.url ?? ""}`,
  );
}
console.log(`DELETE: ${candidates.length} old/preview/failed deployments`);

let deleted = 0;
let failed = 0;
let cursor = 0;
const concurrency = 8;

async function worker() {
  for (;;) {
    const index = cursor;
    cursor += 1;
    if (index >= candidates.length) return;

    const deployment = candidates[index];
    const id = deployment.uid ?? deployment.id;

    try {
      await deleteDeployment(id);
      deleted += 1;
      console.log(
        `deleted ${projectName} ${id} ${deployment.state} ${deployment.target ?? "preview"}`,
      );
    } catch (error) {
      failed += 1;
      console.error(`FAILED ${projectName} ${id}: ${error.message}`);
    }
  }
}

await Promise.all(Array.from({ length: Math.min(concurrency, Math.max(1, candidates.length)) }, worker));

console.log("\n============================================================");
console.log(
  `Cleanup finished for ${projectName}. Candidates: ${candidates.length}; deleted: ${deleted}; failed: ${failed}; kept: ${keepIds.size}.`,
);

if (failed > 0) process.exitCode = 1;
