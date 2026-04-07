import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import FirstTimeModal from "./FirstTimeModal";

export const metadata: Metadata = {
  title: "城下町",
  description: "あなたの城下町。家来たちの活躍で城が発展します。",
  robots: { index: false, follow: false },
};

const myKerai = [
  { name: "コスケ", role: "営業", level: 8, imgPath: "/characters/営業/コスケ_ノーマル.png", status: "任務中" },
  { name: "ブン子", role: "事務", level: 12, imgPath: "/characters/事務/ブン子_ノーマル.png", status: "待機中" },
  { name: "ソロ丸", role: "経理", level: 5, imgPath: "/characters/経理/ソロ丸_ノーマル.png", status: "待機中" },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <FirstTimeModal />
      {/* Welcome Banner */}
      <div
        className="rounded-2xl p-6 md:p-8 text-white mb-8"
        style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">お帰りなさい</p>
            <h1 className="text-2xl font-black mb-2">田中 こういち 様の城</h1>
            <p className="text-gray-400 text-sm">
              家来3体が待機中。今日も業務を任せましょう。
            </p>
          </div>
          <div className="flex items-center gap-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-3 py-1.5">
            <span>🪙</span>
            <span className="text-yellow-400 font-bold">1,200</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 城下町プレースホルダー */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">🏯 城下町</h2>
              <span className="text-xs text-gray-400">Lv.3 — 発展中</span>
            </div>
            <div
              className="aspect-video flex flex-col items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #e8f4f8, #f0f8ff)",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div className="text-6xl mb-4">🏯</div>
              <p className="text-gray-400 text-sm mb-2">城下町ビューはここに表示されます</p>
              <p className="text-xs text-gray-300">
                任務完了→経験値獲得→城が発展するシステム
              </p>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {[
                { label: "今月の任務", value: "23件", icon: "📜" },
                { label: "節約時間", value: "18時間", icon: "⏱️" },
                { label: "獲得小判", value: "450枚", icon: "🪙" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-3 bg-gray-50 rounded-xl">
                  <div className="text-xl mb-1">{stat.icon}</div>
                  <div className="text-lg font-black text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右サイドバー */}
        <div className="space-y-4">
          {/* 家来一覧 */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-sm">⚔️ 家来</h2>
              <Link
                href="/collection"
                className="text-xs hover:underline"
                style={{ color: "#00D4FF" }}
              >
                図鑑を見る
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {myKerai.map((k) => (
                <div key={k.name} className="flex items-center gap-3 px-4 py-3">
                  <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={k.imgPath}
                      alt={k.name}
                      fill
                      className="object-contain p-0.5"
                      sizes="36px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{k.name}</div>
                    <div className="text-xs text-gray-400">
                      {k.role} · Lv.{k.level}
                    </div>
                  </div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      k.status === "任務中"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {k.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* クイックアクション */}
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h2 className="font-bold text-gray-900 text-sm">クイックアクション</h2>
            </div>
            <div className="p-3 space-y-2">
              <Link
                href="/mission"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <span className="text-xl">📜</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  任務を依頼する
                </span>
                <span className="ml-auto text-gray-300">→</span>
              </Link>
              <Link
                href="/gacha"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
              >
                <span className="text-xl">🎲</span>
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  ガチャを回す
                </span>
                <span className="ml-auto text-gray-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
