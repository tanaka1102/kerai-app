"use client";

import { useState } from "react";

const tabs = ["全て", "営業", "事務", "経理", "SNS", "サポート", "Web制作"] as const;
type Tab = typeof tabs[number];

const kerai = [
  { name: "武蔵", role: "営業", level: 8, icon: "⚔️", rarity: "SR", owned: true },
  { name: "さくら", role: "事務", level: 12, icon: "🌸", rarity: "R", owned: true },
  { name: "そろばん斎", role: "経理", level: 5, icon: "🧮", rarity: "R", owned: true },
  { name: "つぶやき姫", role: "SNS", level: 0, icon: "🎴", rarity: "SR", owned: false },
  { name: "おもてなし太郎", role: "サポート", level: 0, icon: "🍵", rarity: "R", owned: false },
  { name: "絵師の卜伝", role: "Web制作", level: 0, icon: "🖌️", rarity: "SSR", owned: false },
  { name: "虎之助", role: "営業", level: 0, icon: "🐯", rarity: "N", owned: false },
  { name: "算盤次郎", role: "経理", level: 0, icon: "📊", rarity: "N", owned: false },
  { name: "文書の蛍", role: "事務", level: 0, icon: "💡", rarity: "N", owned: false },
];

const rarityColor: Record<string, string> = {
  SSR: "#FF4500",
  SR: "#9333EA",
  R: "#00D4FF",
  N: "#6B7280",
};

export default function CollectionPage() {
  const [activeTab, setActiveTab] = useState<Tab>("全て");

  const filtered = activeTab === "全て" ? kerai : kerai.filter((k) => k.role === activeTab);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">📖 家来図鑑</h1>
        <p className="text-sm text-gray-500">集めた家来と未解放の家来を確認できます</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeTab === t ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={activeTab === t ? { background: "linear-gradient(135deg, #00D4FF, #0088FF)" } : undefined}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {filtered.map((k) => (
          <div
            key={k.name}
            className={`rounded-2xl border-2 p-3 text-center transition-all ${
              k.owned ? "" : "opacity-40 grayscale"
            }`}
            style={{ borderColor: rarityColor[k.rarity] + "60" }}
          >
            <div
              className="text-xs font-bold mb-1 px-1 py-0.5 rounded-full inline-block"
              style={{
                color: rarityColor[k.rarity],
                background: rarityColor[k.rarity] + "15",
              }}
            >
              {k.rarity}
            </div>
            <div className="text-4xl my-2">{k.icon}</div>
            <div className="text-xs font-bold text-gray-900 leading-tight">{k.name}</div>
            <div className="text-xs text-gray-400">{k.role}</div>
            {k.owned && (
              <div className="text-xs text-gray-500 mt-1">Lv.{k.level}</div>
            )}
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-8">
        {kerai.filter((k) => k.owned).length}/{kerai.length} 体を収集済み
      </p>
    </div>
  );
}
