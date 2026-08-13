import { z } from "zod";

import { getServerEnv } from "@/env";
import { ApiError, handle } from "@/lib/api";

/**
 * Example `app/api` endpoint — a contact / lead submission.
 *
 * Demonstrates the convention: the handler owns the work — it validates input,
 * reads a secret env var, and calls an upstream service inline. Secrets are
 * safe here because `route.ts` is never bundled to the browser.
 */

// Request schema — kept in the route since it isn't shared. Lift to a shared
// module only once another route needs it.
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  message: z.string().min(1).max(2000),
});

// A simple in-memory rate limiter (resets on server restart).
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();
const MAX_REQUESTS = 3;
const WINDOW_MS = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || record.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_REQUESTS) {
    return false;
  }
  record.count += 1;
  return true;
}

export const POST = handle(async (req) => {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "127.0.0.1";
  if (!checkRateLimit(ip)) {
    throw new ApiError(429, "rate_limited", "Too many requests. Please try again later.");
  }

  const input = contactSchema.parse(await req.json());

  const { CONTACT_ENDPOINT } = getServerEnv();

  if (CONTACT_ENDPOINT) {
    // Forward the lead to the configured upstream (CRM, webhook, …).
    const upstream = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
    });
    if (!upstream.ok) {
      throw new ApiError(502, "upstream_error", "Failed to deliver the message.");
    }
  } else {
    // No upstream configured — log server-side so the starter runs as-is.
    console.log("[api/contact] submission:", input);
  }

  return { received: true };
});
