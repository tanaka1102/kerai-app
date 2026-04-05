/**
 * Resend経由でメール送信。
 * 無料枠: 3,000通/月、100通/日。
 * 1日の送信数上限はrate limiting（ratelimit.ts）で担保する。
 */

interface SendVerificationEmailParams {
  to: string;
  token: string;
  baseUrl: string;
}

export async function sendVerificationEmail({
  to,
  token,
  baseUrl,
}: SendVerificationEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");

  const verifyUrl = `${baseUrl}/verify-email?token=${encodeURIComponent(token)}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "AI社員ケライ <noreply@kerai-app.vercel.app>",
      to: [to],
      subject: "【AI社員ケライ】メールアドレスの確認",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;">
          <h1 style="font-size:24px;font-weight:900;color:#111;margin-bottom:8px;">⚔️ AI社員ケライ</h1>
          <p style="color:#555;margin-bottom:24px;">メールアドレスの確認が必要です。<br>以下のボタンをクリックして登録を完了してください。</p>
          <a href="${verifyUrl}"
             style="display:inline-block;background:linear-gradient(135deg,#00D4FF,#0088FF);color:#fff;text-decoration:none;padding:14px 28px;border-radius:12px;font-weight:700;font-size:15px;">
            メールアドレスを確認する
          </a>
          <p style="color:#999;font-size:12px;margin-top:24px;">
            このリンクは24時間有効です。<br>
            心当たりがない場合はこのメールを無視してください。
          </p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;" />
          <p style="color:#bbb;font-size:11px;">AI社員ケライ — 休まない。辞めない。文句言わない。</p>
        </div>
      `,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend API error ${res.status}: ${body}`);
  }
}
