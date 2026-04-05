import { NextRequest, NextResponse } from "next/server";
import { createVerificationToken } from "@/lib/email-token";
import { sendVerificationEmail } from "@/lib/mailer";
import { getSignupRatelimit, getEmailRatelimit } from "@/lib/ratelimit";

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous"
  );
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // サインアップrate limit（同一IPから1時間5回まで）
  const signupRL = getSignupRatelimit();
  const signupCheck = await signupRL.limit(ip);
  if (!signupCheck.success) {
    return NextResponse.json(
      { error: "しばらく時間をおいてから再試行してください" },
      { status: 429 }
    );
  }

  let body: { name?: string; email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "リクエストが不正です" }, { status: 400 });
  }

  const { name, email, password } = body;

  // バリデーション
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "お名前を入力してください" }, { status: 400 });
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "有効なメールアドレスを入力してください" }, { status: 400 });
  }
  if (!password || typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ error: "パスワードは8文字以上で入力してください" }, { status: 400 });
  }

  // メール送信rate limit（1日100通まで・グローバル）
  const emailRL = getEmailRatelimit();
  const emailCheck = await emailRL.limit("global");
  if (!emailCheck.success) {
    return NextResponse.json(
      { error: "本日のメール送信数が上限に達しました。明日再度お試しください" },
      { status: 429 }
    );
  }

  // TODO: DBにユーザー仮登録（パスワードハッシュ保存）
  // 現時点ではトークン発行のみ実装。DB導入時にここを拡張する。

  const token = await createVerificationToken(email.toLowerCase().trim());
  const baseUrl = process.env.NEXTAUTH_URL ?? "https://kerai-app.vercel.app";

  try {
    await sendVerificationEmail({ to: email.trim(), token, baseUrl });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "メール送信に失敗しました。しばらくしてから再試行してください" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
