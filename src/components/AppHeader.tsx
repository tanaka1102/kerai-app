"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/home", label: "城下町", icon: "🏯" },
  { href: "/mission", label: "任務依頼", icon: "📜" },
  { href: "/history", label: "履歴", icon: "📋" },
  { href: "/collection", label: "図鑑", icon: "📖" },
  { href: "/gacha", label: "ガチャ", icon: "🎲" },
  { href: "/plan", label: "プラン", icon: "💎" },
  { href: "/settings", label: "設定", icon: "⚙️" },
];

export default function AppHeader() {
  const pathname = usePathname();
  const [coins, setCoins] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/user")
      .then((r) => r.json())
      .then((d) => setCoins(d.coins ?? null))
      .catch(() => {});
  }, [pathname]); // ページ遷移のたびに更新

  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2">
            <span className="text-2xl font-black" style={{ color: "#00D4FF" }}>
              ⚔️ ケライ
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === item.href
                    ? "text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                style={
                  pathname === item.href
                    ? { backgroundColor: "#00D4FF" }
                    : undefined
                }
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200">
              <span className="text-lg">🪙</span>
              <span className="text-sm font-bold text-yellow-700">
                {coins !== null ? coins.toLocaleString() : "…"}
              </span>
              <span className="text-xs text-yellow-500">小判</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
              👤
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 h-16">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-0.5 text-xs font-medium transition-colors ${
                pathname === item.href
                  ? "text-cyan-500"
                  : "text-gray-500"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
