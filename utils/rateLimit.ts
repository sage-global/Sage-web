interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 10 minutes)
  max?: number;      // Maximum allowed requests in window (default: 3)
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetTimeMs: number;
}

const ipHistory = new Map<string, number[]>();
const duplicateHistory = new Map<string, number>();

/**
 * Purge expired timestamps to prevent unbounded memory growth.
 */
function cleanup(windowMs: number) {
  const now = Date.now();

  ipHistory.forEach((timestamps: number[], ip: string) => {
    const valid = timestamps.filter((t: number) => now - t < windowMs);
    if (valid.length === 0) {
      ipHistory.delete(ip);
    } else {
      ipHistory.set(ip, valid);
    }
  });

  duplicateHistory.forEach((timestamp: number, hash: string) => {
    if (now - timestamp > windowMs) {
      duplicateHistory.delete(hash);
    }
  });
}

/**
 * Sliding-window rate limiter per client IP.
 */
export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const windowMs = options.windowMs || 10 * 60 * 1000; // 10 minutes
  const max = options.max || 3;
  const now = Date.now();

  cleanup(windowMs);

  const cleanIp = ip || 'unknown-ip';
  const timestamps = (ipHistory.get(cleanIp) || []).filter((t: number) => now - t < windowMs);

  if (timestamps.length >= max) {
    const oldest = timestamps[0] || now;
    const resetTimeMs = Math.max(1000, windowMs - (now - oldest));
    return {
      success: false,
      limit: max,
      remaining: 0,
      resetTimeMs,
    };
  }

  timestamps.push(now);
  ipHistory.set(cleanIp, timestamps);

  return {
    success: true,
    limit: max,
    remaining: max - timestamps.length,
    resetTimeMs: windowMs,
  };
}

/**
 * Check if the exact same submission was sent within the duplicate window (default: 5 minutes).
 */
export function isDuplicateSubmission(
  hash: string,
  duplicateWindowMs: number = 5 * 60 * 1000
): boolean {
  const now = Date.now();
  const lastTime = duplicateHistory.get(hash);

  if (lastTime && now - lastTime < duplicateWindowMs) {
    return true;
  }

  duplicateHistory.set(hash, now);
  return false;
}
