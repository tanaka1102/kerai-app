import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "メール認証",
  description: "メールアドレスの確認ページ",
  robots: { index: false, follow: false },
};

interface Props {
  searchParams: Promise<{ success?: string; error?: string; email?: string }>;
}

export default async function VerifyEmailPage({ searchParams }: Props) {
  const params = await searchParams;

  if (params.success === "1") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">認証完了！</h1>
          <p className="text-gray-500 mb-8">
            メールアドレスの確認が完了しました。
            <br />
            ログインして家来を採用しましょう。
          </p>
          <Link
            href="/login"
            className="inline-block py-3 px-8 rounded-xl text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
          >
            ログインする 🏯
          </Link>
        </div>
      </div>
    );
  }

  if (params.error === "expired") {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          <div className="text-6xl mb-6">⏰</div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">リンクの有効期限切れ</h1>
          <p className="text-gray-500 mb-8">
            認証リンクの有効期限（24時間）が過ぎています。
            <br />
            再度サインアップして新しいリンクを受け取ってください。
          </p>
          <Link
            href="/signup"
            className="inline-block py-3 px-8 rounded-xl text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
          >
            再登録する
          </Link>
        </div>
      </div>
    );
  }

  // error=invalid, error=missing_token, or default (メール送信後の案内)
  const isError = params.error && params.error !== "";

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md text-center">
        {isError ? (
          <>
            <div className="text-6xl mb-6">❌</div>
            <h1 className="text-2xl font-black text-gray-900 mb-3">認証リンクが無効です</h1>
            <p className="text-gray-500 mb-8">
              リンクが無効または改ざんされています。
              <br />
              再度サインアップしてください。
            </p>
            <Link
              href="/signup"
              className="inline-block py-3 px-8 rounded-xl text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
            >
              再登録する
            </Link>
          </>
        ) : (
          <>
            <div className="text-6xl mb-6">📨</div>
            <h1 className="text-2xl font-black text-gray-900 mb-3">確認メールを送信しました</h1>
            <p className="text-gray-500 mb-4">
              登録したメールアドレスに確認リンクを送りました。
              <br />
              24時間以内にリンクをクリックして登録を完了してください。
            </p>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700 mb-8">
              迷惑メールフォルダも確認してみてください
            </div>
            <Link href="/login" className="text-sm hover:underline" style={{ color: "#00D4FF" }}>
              すでにアカウントをお持ちの方はこちら
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
