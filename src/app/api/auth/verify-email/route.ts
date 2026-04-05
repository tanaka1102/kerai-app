import { NextRequest, NextResponse } from "next/server";
import { verifyEmailToken } from "@/lib/email-token";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(
      new URL("/verify-email?error=missing_token", req.nextUrl.origin)
    );
  }

  const result = await verifyEmailToken(token);

  if (!result.valid) {
    const reason = result.reason === "expired" ? "expired" : "invalid";
    return NextResponse.redirect(
      new URL(`/verify-email?error=${reason}`, req.nextUrl.origin)
    );
  }

  // TODO: DBでユーザーのemail_verified フラグをtrueに更新する
  // DB導入後: await db.user.update({ where: { email: result.email }, data: { emailVerified: new Date() } });

  return NextResponse.redirect(
    new URL(`/verify-email?success=1&email=${encodeURIComponent(result.email)}`, req.nextUrl.origin)
  );
}
