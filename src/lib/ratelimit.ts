/**
 * Upstash Redis + @upstash/ratelimit を使ったrate limiting。
 * 無料枠: 10,000コマンド/日
 *
 * 用途:
 * - login: 同一IPから1時間に10回失敗でブロック
 * - email_send: 1日100通までのメール送信上限
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let redis: Redis | null = null;

function getRedis(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL ?? "",
      token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
    });
  }
  return redis;
}

/** ログイン試行: 1時間に10回まで（IPごと） */
let loginLimiter: Ratelimit | null = null;
export function getLoginRatelimit(): Ratelimit {
  if (!loginLimiter) {
    loginLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(10, "1 h"),
      prefix: "rl:login",
    });
  }
  return loginLimiter;
}

/** サインアップ試行: 1時間に5回まで（IPごと） */
let signupLimiter: Ratelimit | null = null;
export function getSignupRatelimit(): Ratelimit {
  if (!signupLimiter) {
    signupLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "rl:signup",
    });
  }
  return signupLimiter;
}

/** メール送信: 1日100通まで（グローバル） */
let emailLimiter: Ratelimit | null = null;
export function getEmailRatelimit(): Ratelimit {
  if (!emailLimiter) {
    emailLimiter = new Ratelimit({
      redis: getRedis(),
      limiter: Ratelimit.fixedWindow(100, "24 h"),
      prefix: "rl:email",
    });
  }
  return emailLimiter;
}
