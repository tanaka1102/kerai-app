"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function SignupPage() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/home");
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">⚔️</div>
          <h1 className="text-2xl font-black text-gray-900">AI社員ケライ</h1>
          <p className="text-sm text-gray-500 mt-1">家来との新たな物語が始まります</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">無料アカウント作成</h2>
          <p className="text-sm text-gray-500 mb-6">クレジットカード不要・月額0円から</p>

          {/* Google Sign In */}
          <GoogleSignInButton label="Googleで登録" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">または</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                お名前
              </label>
              <input
                id="name"
                type="text"
                placeholder="田中 太郎"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                会社名 <span className="text-gray-400 font-normal">（任意）</span>
              </label>
              <input
                id="company"
                type="text"
                placeholder="株式会社○○"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                メールアドレス
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                placeholder="8文字以上"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent text-sm"
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input type="checkbox" id="terms" className="mt-0.5" />
              <label htmlFor="terms" className="text-xs text-gray-500">
                <a href="#" className="underline">利用規約</a>・
                <a href="#" className="underline">プライバシーポリシー</a>
                に同意します
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
            >
              家来を採用する ⚔️
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              すでにアカウントをお持ちの方は{" "}
              <Link href="/login" className="font-medium hover:underline" style={{ color: "#00D4FF" }}>
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
