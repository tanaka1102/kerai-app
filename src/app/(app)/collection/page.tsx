"use client";

import { useState } from "react";
import Image from "next/image";

const tabs = ["全て", "営業", "事務", "経理", "SNS/マーケ", "サポート", "Web制作"] as const;
type Tab = typeof tabs[number];

const kerai = [
  // 営業
  { name: "コスケ", role: "営業", level: 8, imgPath: "/characters/営業/コスケ_ノーマル.png", rarity: "SR", owned: true },
  { name: "タヌ吉", role: "営業", level: 0, imgPath: "/characters/営業/タヌ吉_ノーマル.png", rarity: "R", owned: false },
  { name: "フクじい", role: "営業", level: 0, imgPath: "/characters/営業/フクじい_ノーマル.png", rarity: "N", owned: false },
  // 事務
  { name: "ブン子", role: "事務", level: 12, imgPath: "/characters/事務/ブン子_ノーマル.png", rarity: "R", owned: true },
  { name: "ネコ判", role: "事務", level: 0, imgPath: "/characters/事務/ネコ判_ノーマル.png", rarity: "SR", owned: false },
  { name: "カエル書記", role: "事務", level: 0, imgPath: "/characters/事務/カエル書記_ノーマル.png", rarity: "N", owned: false },
  // 経理
  { name: "ソロ丸", role: "経理", level: 5, imgPath: "/characters/経理/ソロ丸_ノーマル.png", rarity: "R", owned: true },
  { name: "コダヌキ金兵衛", role: "経理", level: 0, imgPath: "/characters/経理/コダヌキ金兵衛_ノーマル.png", rarity: "SR", owned: false },
  { name: "帳ロボ", role: "経理", level: 0, imgPath: "/characters/経理/帳ロボ_ノーマル.png", rarity: "N", owned: false },
  // SNS/マーケ
  { name: "ドンドン", role: "SNS/マーケ", level: 0, imgPath: "/characters/SNS_マーケ/ドンドン_ノーマル.png", rarity: "R", owned: false },
  { name: "のぼり犬", role: "SNS/マーケ", level: 0, imgPath: "/characters/SNS_マーケ/のぼり犬_ノーマル.png", rarity: "SR", owned: false },
  { name: "旗振りカッパ", role: "SNS/マーケ", level: 0, imgPath: "/characters/SNS_マーケ/旗振りカッパ_ノーマル.png", rarity: "N", owned: false },
  // サポート
  { name: "オチャ丸", role: "サポート", level: 0, imgPath: "/characters/サポート/オチャ丸_ノーマル.png", rarity: "R", owned: false },
  { name: "クスリ猫", role: "サポート", level: 0, imgPath: "/characters/サポート/クスリ猫_ノーマル.png", rarity: "SR", owned: false },
  { name: "ヌイグルミ兵", role: "サポート", level: 0, imgPath: "/characters/サポート/ヌイグルミ兵_ノーマル.png", rarity: "N", owned: false },
  // Web制作
  { name: "トン太", role: "Web制作", level: 0, imgPath: "/characters/Web制作/トン太_ノーマル.png", rarity: "R", owned: false },
  { name: "のこぎりウサギ", role: "Web制作", level: 0, imgPath: "/characters/Web制作/のこぎりウサギ_ノーマル.png", rarity: "SR", owned: false },
  { name: "設計カラス", role: "Web制作", level: 0, imgPath: "/characters/Web制作/設計カラス_ノーマル.png", rarity: "SSR", owned: false },
];

const rarityColor: Record<string, string> = {
  SSR: "#FF4500",
  SR: "#9333EA",
  R: "#00D4FF",
  N: "#6B7280",
};

export default function CollectionPage() {
  const [activeTab, setActiveTab] = useState<Tab>("全て");
  const [selected, setSelected] = useState<typeof kerai[number] | null>(null);

  const filtered =
    activeTab === "全て" ? kerai : kerai.filter((k) => k.role === activeTab);
  const ownedCount = kerai.filter((k) => k.owned).length;

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
          <button
            key={k.name}
            onClick={() => k.owned && setSelected(k)}
            className={`rounded-2xl border-2 p-3 text-center transition-all ${
              k.owned ? "hover:shadow-md cursor-pointer" : "opacity-40 grayscale cursor-default"
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
            <div className="relative w-full aspect-square mb-2 rounded-xl overflow-hidden bg-gray-50">
              <Image
                src={k.imgPath}
                alt={k.name}
                fill
                className="object-contain p-1"
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
              />
            </div>
            <div className="text-xs font-bold text-gray-900 leading-tight truncate">{k.name}</div>
            <div className="text-xs text-gray-400">{k.role}</div>
            {k.owned && (
              <div className="text-xs text-gray-500 mt-1">Lv.{k.level}</div>
            )}
          </button>
        ))}
      </div>

      <p className="text-center text-sm text-gray-400 mt-8">
        {ownedCount}/{kerai.length} 体を収集済み
      </p>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    color: rarityColor[selected.rarity],
                    background: rarityColor[selected.rarity] + "15",
                  }}
                >
                  {selected.rarity}
                </span>
                <h2 className="text-xl font-black text-gray-900 mt-1">{selected.name}</h2>
                <p className="text-sm text-gray-400">{selected.role}</p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
              <Image
                src={selected.imgPath}
                alt={selected.name}
                fill
                className="object-contain p-4"
                sizes="100vw"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-500">Lv.{selected.level}</span>
                <span className="text-gray-400">次まで 200 XP</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "40%",
                    background: "linear-gradient(135deg, #00D4FF, #0088FF)",
                  }}
                />
              </div>
            </div>

            <a
              href="/mission"
              className="block w-full text-center py-3 rounded-xl text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
            >
              {selected.name}に任務を依頼する 📜
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
