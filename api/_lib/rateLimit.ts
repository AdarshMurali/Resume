/**
 * rateLimit.ts — per-IP token-bucket-ish limiter for /api/chat.
 *
 * Deliberately in-memory (per CLAUDE.md §1 non-goals: "no heavy backend").
 * This is BEST-EFFORT ONLY: Vercel Edge Functions do not guarantee the same
 * isolate handles consecutive requests, so this module-level Map can reset
 * on a cold start or when a request lands on a different instance. That's an
 * acceptable tradeoff for a personal résumé site's traffic volume — if abuse
 * becomes a real problem, replace this with Vercel KV / Upstash Redis (see
 * docs/ARCHITECTURE.md ADR log before making that change).
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 10;

const hitsByIp = new Map<string, number[]>();

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recentHits = (hitsByIp.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recentHits.push(now);
  hitsByIp.set(ip, recentHits);
  return recentHits.length > MAX_REQUESTS_PER_WINDOW;
}
