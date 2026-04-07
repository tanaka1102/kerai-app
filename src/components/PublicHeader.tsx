"use client";

import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black" style={{ color: "#00D4FF" }}>
            ⚔️ ケライ
          </span>
          <span className="text-xs text-gray-400 hidden sm:block">AI社員</span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/#features"
            className="text-sm text-gray-600 hover:text-gray-900 hidden md:block"
          >
            機能
          </Link>
          <Link
            href="/#kerai"
            className="text-sm text-gray-600 hover:text-gray-900 hidden md:block"
          >
            家来
          </Link>
          <Link
            href="/plan"
            className="text-sm text-gray-600 hover:text-gray-900 hidden md:block"
          >
            プラン
          </Link>
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ログイン
          </Link>
          <Link href="/signup" className="kerai-btn-primary text-sm">
            無料で始める
          </Link>
        </nav>
      </div>
    </header>
  );
}
