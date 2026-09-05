import { spawnSync } from "node:child_process";

const patterns = [
  ["OpenAI-style secret", "sk-[A-Za-z0-9_-]{20,}"],
  ["GitHub classic token", "ghp_[A-Za-z0-9]{30,}"],
  ["GitHub fine-grained token", "github_pat_[A-Za-z0-9_]{30,}"],
  ["Google API key", "AIza[0-9A-Za-z_-]{30,}"],
  ["AWS access key", "AKIA[0-9A-Z]{16}"],
  ["Supabase secret key", "sb_secret_[A-Za-z0-9_-]{20,}"],
  ["private key material", "-----BEGIN ([A-Z0-9 ]+ )?PRIVATE KEY-----"],
];

const exclusions = [":(exclude)package-lock.json", ":(exclude)scripts/scan-secrets.mjs"];
const findings = [];

for (const [label, pattern] of patterns) {
  const current = spawnSync(
    "git",
    ["grep", "-I", "-n", "-E", pattern, "--", ".", ...exclusions],
    { encoding: "utf8" },
  );

  if (current.status === 0 && current.stdout.trim()) {
    findings.push(`${label}: detected in the current tree`);
  } else if (current.status !== 0 && current.status !== 1) {
    throw new Error(`git grep failed while checking ${label}: ${current.stderr}`);
  }

  const history = spawnSync(
    "git",
    ["log", "--all", `-G${pattern}`, "--pretty=format:%H", "--", ".", ...exclusions],
    { encoding: "utf8" },
  );

  if (history.status !== 0) {
    throw new Error(`git log failed while checking ${label}: ${history.stderr}`);
  }

  if (history.stdout.trim()) {
    findings.push(`${label}: detected in Git history`);
  }
}

if (findings.length) {
  console.error("Potential secret material detected. Values are intentionally not printed:");
  for (const finding of [...new Set(findings)]) console.error(`- ${finding}`);
  process.exit(1);
}

console.log(`Secret scan passed: ${patterns.length} high-risk credential patterns checked in the current tree and full Git history.`);
