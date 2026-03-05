import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_DATABASE_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_DATABASE_KV_REST_API_TOKEN!,
});

// Rate limit: 10 quote requests per minute per IP
export const quoteLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "ratelimit:quote",
});

// Rate limit: 30 measurement lookups per minute per IP
export const measurementLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
  prefix: "ratelimit:measurement",
});
