"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import GoogleSignInButton from "@/components/GoogleSignInButton";

export default function LoginPage() {
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
          <p className="text-sm text-gray-500 mt-1">城に戻られましたか</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ログイン</h2>

          {/* Google Sign In */}
          <GoogleSignInButton label="Googleでログイン" />

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">または</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-all"
                style={{ "--tw-ring-color": "#00D4FF" } as React.CSSProperties}
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
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:border-transparent text-sm transition-all"
                style={{ "--tw-ring-color": "#00D4FF" } as React.CSSProperties}
              />
            </div>

            <div className="flex justify-end">
              <a href="#" className="text-sm hover:underline" style={{ color: "#00D4FF" }}>
                パスワードを忘れた方
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
            >
              入城する 🏯
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              まだ登録していない方は{" "}
              <Link href="/signup" className="font-medium hover:underline" style={{ color: "#00D4FF" }}>
                無料でアカウント作成
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
