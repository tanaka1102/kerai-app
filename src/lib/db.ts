/**
 * Upstash Redis を使ったユーザーデータ永続化層。
 * 無料枠: 10,000コマンド/日
 *
 * データ構造:
 *   user:{hashedUserId}:coins     → number（小判残高）
 *   user:{hashedUserId}:missions  → JSON list（ミッション履歴、最新50件）
 *
 * セキュリティ設計:
 *   - userIdはSHA-256でハッシュ化してRedisキーに使用（PII保護）
 *   - ミッションのdetail（ユーザー入力本文）はRedisに保存しない
 *   - taskTypeやkeraiNameのみ記録（機密性低）
 */

import { Redis } from "@upstash/redis";
import { createHash } from "crypto";

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

export type MissionRecord = {
  id: string;
  keraiName: string;
  keraiRole: string;
  taskType: string;
  completedAt: string;
  coinReward: number;
};

const INITIAL_COINS = 300;
const MAX_HISTORY = 50;

/**
 * userIdをSHA-256でハッシュ化してRedisキーに使用。
 * Googleのsub IDが直接Redisキーに露出しないようにする。
 */
function hashUserId(userId: string): string {
  return createHash("sha256").update(userId).digest("hex").slice(0, 32);
}

function userKey(userId: string, suffix: string): string {
  return `user:${hashUserId(userId)}:${suffix}`;
}

// ---- 小判 ----

export async function getCoins(userId: string): Promise<number> {
  const r = getRedis();
  const val = await r.get<number>(userKey(userId, "coins"));
  if (val === null) {
    await r.set(userKey(userId, "coins"), INITIAL_COINS);
    return INITIAL_COINS;
  }
  return val;
}

export async function addCoins(userId: string, amount: number): Promise<number> {
  const r = getRedis();
  const next = await r.incrby(userKey(userId, "coins"), amount);
  return next;
}

// ---- ミッション履歴 ----

export async function getMissions(userId: string): Promise<MissionRecord[]> {
  const r = getRedis();
  const raw = await r.get<MissionRecord[]>(userKey(userId, "missions"));
  return raw ?? [];
}

export async function addMission(
  userId: string,
  mission: MissionRecord
): Promise<void> {
  const r = getRedis();
  const key = userKey(userId, "missions");
  const current = await r.get<MissionRecord[]>(key) ?? [];
  const updated = [mission, ...current].slice(0, MAX_HISTORY);
  await r.set(key, updated);
}
