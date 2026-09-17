const token = process.env.VERCEL_TOKEN;

if (!token) {
  console.error("Missing VERCEL_TOKEN. Add it as a GitHub Actions repository secret before running this workflow.");
  process.exit(1);
}

const teamId = "team_DmJG03IKZDcgfhTBTtrkv20m";
const projects = [
  { id: "prj_MoGTzcK0VwAU75w6FBADSIzW478i", name: "archie-portfolio" },
  { id: "prj_1rA5U9qsxmb8vF4sysqPOSJSVEl8", name: "creator-ops-agent" },
];

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

async function listAllDeployments(projectId) {
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

async function deleteDeployment(id) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
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

    if (response.ok) return;

    if (response.status === 429 && attempt < 4) {
      const retryAfter = Number(response.headers.get("retry-after") ?? "2");
      await new Promise((resolve) => setTimeout(resolve, Math.max(1, retryAfter) * 1000));
      continue;
    }

    const body = await response.text();
    throw new Error(`DELETE ${id} -> ${response.status}: ${body}`);
  }
}

let totalCandidates = 0;
let totalDeleted = 0;
let totalFailed = 0;

for (const project of projects) {
  const deployments = await listAllDeployments(project.id);
  deployments.sort((a, b) => (b.created ?? b.createdAt ?? 0) - (a.created ?? a.createdAt ?? 0));

  const readyProduction = deployments.filter(
    (deployment) => deployment.state === "READY" && deployment.target === "production",
  );

  // Always keep the two newest healthy production deployments for rollback safety.
  const keepIds = new Set(
    readyProduction.slice(0, 2).map((deployment) => deployment.uid ?? deployment.id),
  );

  const candidates = deployments.filter((deployment) => {
    const id = deployment.uid ?? deployment.id;
    if (!id || keepIds.has(id)) return false;
    return terminalStates.has(deployment.state);
  });

  console.log("\n============================================================");
  console.log(`${project.name}: ${deployments.length} deployments found`);
  console.log("KEEP:");
  for (const deployment of deployments.filter((d) => keepIds.has(d.uid ?? d.id))) {
    console.log(
      `  ${deployment.uid ?? deployment.id}  ${deployment.state}  ${deployment.target ?? "preview"}  ${deployment.url ?? ""}`,
    );
  }
  console.log(`DELETE: ${candidates.length} old/preview/failed deployments`);

  totalCandidates += candidates.length;

  for (const deployment of candidates) {
    const id = deployment.uid ?? deployment.id;
    try {
      await deleteDeployment(id);
      totalDeleted += 1;
      console.log(`deleted ${project.name} ${id} ${deployment.state} ${deployment.target ?? "preview"}`);
      await new Promise((resolve) => setTimeout(resolve, 150));
    } catch (error) {
      totalFailed += 1;
      console.error(`FAILED ${project.name} ${id}: ${error.message}`);
    }
  }
}

console.log("\n============================================================");
console.log(`Cleanup finished. Candidates: ${totalCandidates}; deleted: ${totalDeleted}; failed: ${totalFailed}.`);

if (totalFailed > 0) process.exitCode = 1;
