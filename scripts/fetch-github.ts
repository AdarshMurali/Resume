/**
 * fetch-github.ts — pulls live star count/language/last-push for each
 * project's GitHub repo into a build-time JSON cache, per
 * docs/ARCHITECTURE.md §5: "Fetch at build time into a JSON cache to avoid
 * rate limits and runtime failures."
 *
 * Never fails the build: a network error or a rate limit for one repo just
 * keeps that repo's previous cached entry (or omits it, so the UI falls back
 * to no repoStats) rather than throwing.
 */
import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { projects } from "../src/content/projects";
import type { RepoStats } from "../src/content/types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_PATH = resolve(__dirname, "../src/content/github-cache.json");

function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com\/([^/]+)\/([^/]+?)\/?$/);
  return match ? { owner: match[1], repo: match[2] } : null;
}

async function fetchRepoStats(owner: string, repo: string): Promise<RepoStats> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status} for ${owner}/${repo}`);
  const data = (await res.json()) as {
    stargazers_count?: number;
    language?: string;
    pushed_at?: string;
    updated_at?: string;
  };
  return {
    stars: data.stargazers_count ?? 0,
    language: data.language ?? "Unknown",
    updated: data.pushed_at ?? data.updated_at ?? new Date().toISOString(),
  };
}

async function main() {
  const existing: Record<string, RepoStats> = existsSync(CACHE_PATH)
    ? JSON.parse(readFileSync(CACHE_PATH, "utf-8"))
    : {};

  const cache = { ...existing };

  for (const project of projects) {
    const githubUrl = project.links.github;
    if (!githubUrl) continue;

    const parsed = parseGitHubUrl(githubUrl);
    if (!parsed) continue;

    try {
      cache[githubUrl] = await fetchRepoStats(parsed.owner, parsed.repo);
      console.log(`[fetch-github] ${githubUrl} -> ${JSON.stringify(cache[githubUrl])}`);
    } catch (err) {
      console.warn(
        `[fetch-github] Failed to fetch ${githubUrl}, keeping previous cache entry:`,
        (err as Error).message,
      );
    }
  }

  writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n");
}

main();
