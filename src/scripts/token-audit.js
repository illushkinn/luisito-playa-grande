#!/usr/bin/env node
/**
 * token-audit.js — Scans all .astro files for hardcoded visual values
 * and suggests the correct design token for each violation.
 *
 * Usage: node src/scripts/token-audit.js
 * Returns exit code 0 if clean, 1 if violations found.
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, relative } from "path";

const ROOT = new URL("../..", import.meta.url).pathname;
const SRC_DIR = join(ROOT, "src");

// Patterns to detect hardcoded visual values
const PATTERNS = [
  // Hex colors (excluding common patterns like #fff, #000)
  {
    regex: /#[0-9a-fA-F]{3,8}(?![^"')]*["')])/g,
    check: (match) => {
      const hex = match.toLowerCase();
      // Known tokens — these are allowed fallbacks in tokens.css
      const allowed = ["#c73e2b", "#d4943a", "#ece3d8", "#2c2420", "#6b8f5e", "#3a7ca8",
        "#fff", "#ffffff", "#000", "#000000"];
      if (allowed.includes(hex)) return null;
      return { severity: "warn", message: `Hardcoded hex color: ${match}. Convert to OKLCH token.` };
    }
  },
  // Transition: all
  {
    regex: /transition:\s*all/g,
    check: () => ({ severity: "error", message: "Found 'transition: all'. Use specific properties instead." })
  },
  // 100vh (should use 100dvh)
  {
    regex: /(?<!-)100vh/g,
    check: () => ({ severity: "warn", message: "Found '100vh'. Use '100dvh' for dynamic viewport." })
  },
  // Fixed pixel heights on sections (over 100px)
  {
    regex: /height:\s*\d{3,4}px/g,
    check: (match) => ({ severity: "warn", message: `Fixed pixel height: ${match}. Consider using min-height or relative units.` })
  },
  // Hardcoded font-size in px
  {
    regex: /font-size:\s*\d+px/g,
    check: (match) => ({ severity: "info", message: `Fixed font-size: ${match}. Consider clamp() for fluid typography.` })
  },
  // Missing aspect-ratio on images (within style blocks)
  {
    regex: /<img[^>]+(?!aspect-ratio)[^>]*>/g,
    check: (match) => {
      if (!match.includes("aspect-ratio") && !match.includes("width") && match.includes("src")) {
        return { severity: "warn", message: "Image missing aspect-ratio or width/height attributes." };
      }
      return null;
    }
  },
  // Hardcoded CSS linear-gradient (should use tokens)
  {
    regex: /linear-gradient\([^)]+\)/g,
    check: (match) => {
      const gradientHex = match.match(/#[0-9a-fA-F]{3,8}/g);
      if (gradientHex && gradientHex.length > 0) {
        return { severity: "warn", message: `Hardcoded gradient: use --ds-gradient-* tokens instead.` };
      }
      return null;
    }
  },
  // font-display missing in @font-face
  {
    regex: /@font-face\s*\{[^}]*\}/gs,
    check: (match) => {
      if (!match.includes("font-display")) {
        return { severity: "error", message: "@font-face rule missing font-display: swap." };
      }
      return null;
    }
  },
  // will-change: all
  {
    regex: /will-change:\s*all/g,
    check: () => ({ severity: "error", message: "Found 'will-change: all'. Use specific properties (transform, opacity, filter) only." })
  },
];

function walkDir(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules") {
      walkDir(fullPath, files);
    } else if (entry.isFile() && entry.name.endsWith(".astro")) {
      files.push(fullPath);
    }
  }
  return files;
}

function audit() {
  const files = walkDir(SRC_DIR);
  let hasErrors = false;
  let totalIssues = 0;

  console.log("\n🔍 Token Audit — Scanning .astro files...\n");

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const content = readFileSync(file, "utf-8");
    const fileIssues = [];

    for (const { regex, check } of PATTERNS) {
      const matches = content.matchAll(regex);
      for (const match of matches) {
        const result = check(match[0]);
        if (result) {
          fileIssues.push({ match: match[0], ...result });
        }
      }
    }

    if (fileIssues.length > 0) {
      console.log(`\n📄 ${relPath}`);
      for (const issue of fileIssues) {
        const icon = issue.severity === "error" ? "❌" : issue.severity === "warn" ? "⚠️" : "💡";
        console.log(`  ${icon} [${issue.severity.toUpperCase()}] ${issue.message}`);
        totalIssues++;
        if (issue.severity === "error") hasErrors = true;
      }
    }
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`📊 Audit complete: ${totalIssues} issue(s) found`);
  console.log(`${"=".repeat(50)}\n`);

  process.exit(hasErrors ? 1 : 0);
}

audit();
