import { NextRequest } from "next/server";

/**
 * CSRF対策: OriginヘッダーがAPPのホストと一致することを確認。
 * next-auth v5はSameSite=LaxのJWT CookieでCSRF保護しているが、
 * 追加の多層防御としてOriginチェックを行う。
 *
 * @returns true = 正常（同一オリジン）、false = CSRF疑いあり
 */
export function isValidOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  // Origin ヘッダーがない場合（サーバーサイドからの呼び出し等）は通過
  if (!origin) return true;

  // APP_URLが設定されている場合はそちらを優先
  const appUrl = process.env.NEXTAUTH_URL ?? process.env.VERCEL_URL;
  if (appUrl) {
    try {
      const allowedOrigin = new URL(appUrl).origin;
      return origin === allowedOrigin;
    } catch {
      // URL解析失敗時はhostフォールバック
    }
  }

  // hostベースの確認（http/https両方許可）
  if (host) {
    return origin === `https://${host}` || origin === `http://${host}`;
  }

  return true;
}
