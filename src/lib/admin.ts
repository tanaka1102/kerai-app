/**
 * 管理者判定ロジック。
 * 環境変数 ADMIN_EMAILS にカンマ区切りで管理者メールアドレスを設定する。
 * 例: ADMIN_EMAILS=admin@example.com,other@example.com
 */

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return adminEmails.includes(email.toLowerCase());
}
