/**
 * メール認証トークン（DB不要・HMAC-SHA256署名付きJWT方式）
 * NEXTAUTH_SECRET を使って署名するためDB不要。
 * 欠点: 使用済みトークンを無効化できないが、有効期限(24h)で十分。
 */

const EXPIRY_HOURS = 24;

function base64url(buf: Uint8Array): string {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function hmac(secret: string, data: string): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return new Uint8Array(sig);
}

export async function createVerificationToken(email: string): Promise<string> {
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "";
  const payload = base64url(
    new TextEncoder().encode(
      JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + EXPIRY_HOURS * 3600 })
    )
  );
  const sig = base64url(await hmac(secret, payload));
  return `${payload}.${sig}`;
}

export async function verifyEmailToken(
  token: string
): Promise<{ valid: true; email: string } | { valid: false; reason: string }> {
  const secret = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET ?? "";
  const parts = token.split(".");
  if (parts.length !== 2) return { valid: false, reason: "invalid_format" };

  const [payload, sig] = parts;
  const expectedSig = base64url(await hmac(secret, payload));
  if (sig !== expectedSig) return { valid: false, reason: "invalid_signature" };

  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (Math.floor(Date.now() / 1000) > decoded.exp) {
      return { valid: false, reason: "expired" };
    }
    return { valid: true, email: decoded.email };
  } catch {
    return { valid: false, reason: "parse_error" };
  }
}
