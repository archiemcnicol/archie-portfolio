import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const repoRoot = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), "utf8");

const siteFrame = read("src/components/site-frame.tsx");
const siteNav = read("src/components/site-nav.tsx");
const layout = read("src/app/layout.tsx");
const accessibilityStyles = read("src/app/accessibility.css");

const failures = [];
const assert = (condition, message) => {
  if (!condition) failures.push(message);
};

assert(siteFrame.includes('className="skip-link"'), "skip-to-content link is missing");
assert(siteFrame.includes('href="#main-content"'), "skip link does not target the main content container");
assert(siteFrame.includes('id="main-content"'), "main content target is missing");
assert(siteFrame.includes("tabIndex={-1}"), "main content target must remain programmatically focusable");

assert(siteNav.includes("menuButtonRef"), "mobile navigation must retain its menu-button focus reference");
assert(siteNav.includes("mobileNavRef"), "mobile navigation must retain its navigation focus reference");
assert(siteNav.includes('event.key === "Escape"'), "mobile navigation must close with Escape");
assert(siteNav.includes('event.key !== "Tab"'), "mobile navigation focus trap is missing");
assert(siteNav.includes("last.focus()"), "mobile navigation must wrap backward focus");
assert(siteNav.includes("first.focus()"), "mobile navigation must wrap forward focus");
assert(siteNav.includes('aria-hidden="true"'), "decorative mobile navigation content must remain hidden from assistive technology");

assert(layout.includes('import "./accessibility.css";'), "accessibility stylesheet is not loaded globally");
assert(accessibilityStyles.includes(".skip-link"), "skip-link styling is missing");
assert(accessibilityStyles.includes("prefers-reduced-motion: reduce"), "accessibility motion fallback is missing");

if (failures.length) {
  console.error("Accessibility verification failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Accessibility verification passed: skip navigation, mobile focus containment and reduced-motion support are present.");
