import { NextRequest, NextResponse } from "next/server";
import { getLoginRatelimit } from "@/lib/ratelimit";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous"
  );
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // rate limit: 同一IPから1時間10回まで
  const loginRL = getLoginRatelimit();
  const check = await loginRL.limit(ip);

  if (!check.success) {
    return NextResponse.json(
      {
        error: "ログイン試行回数が多すぎます。1時間後に再試行してください",
        retryAfter: check.reset,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((check.reset - Date.now()) / 1000)),
        },
      }
    );
  }

  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストが不正です" }, { status: 400 });
  }

  const { email, password } = body;

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "メールアドレスを入力してください" }, { status: 400 });
  }
  if (!password || typeof password !== "string") {
    return NextResponse.json({ error: "パスワードを入力してください" }, { status: 400 });
  }

  // TODO: DBでユーザー検索・パスワード検証・メール認証済み確認
  // DB導入後にここで実際の認証処理を実装する。
  // 現時点はrate limitingのみ有効。NextAuth Credentialsプロバイダーと組み合わせる。

  return NextResponse.json({ ok: true });
}
