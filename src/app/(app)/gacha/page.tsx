"use client";

import { useState } from "react";

const gachaTypes = [
  {
    id: "town",
    name: "街装飾ガチャ",
    icon: "🏯",
    desc: "城下町を彩る装飾アイテムが手に入る",
    cost: 100,
    color: "#FF8C00",
  },
  {
    id: "skin",
    name: "スキンガチャ",
    icon: "🎴",
    desc: "家来のスキンと衣装が手に入る",
    cost: 150,
    color: "#9333EA",
  },
];

export default function GachaPage() {
  const [coins] = useState(1200);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  const handleGacha = (cost: number, name: string) => {
    if (coins < cost) return;
    setSpinning(true);
    setResult(null);
    setTimeout(() => {
      setSpinning(false);
      setResult(`${name}を1回引きました！✨ 「彩り灯篭」（R）を獲得！`);
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">🎲 ガチャ</h1>
        <p className="text-sm text-gray-500">小判を使って城を強化しよう</p>
      </div>

      {/* Coins */}
      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-2xl px-5 py-3 mb-8 w-fit">
        <span className="text-2xl">🪙</span>
        <span className="text-xl font-black text-yellow-700">{coins.toLocaleString()}</span>
        <span className="text-sm text-yellow-500">小判</span>
      </div>

      {/* Gacha Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {gachaTypes.map((g) => (
          <div key={g.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div
              className="h-40 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${g.color}15, ${g.color}30)`,
              }}
            >
              <span className="text-7xl">{spinning ? "🌀" : g.icon}</span>
            </div>
            <div className="p-5">
              <h2 className="text-lg font-black text-gray-900 mb-1">{g.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{g.desc}</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleGacha(g.cost, g.name)}
                  disabled={spinning || coins < g.cost}
                  className="flex-1 py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-50"
                  style={{ background: `linear-gradient(135deg, ${g.color}, ${g.color}CC)` }}
                >
                  1回 🪙{g.cost}
                </button>
                <button
                  onClick={() => handleGacha(g.cost * 10, g.name)}
                  disabled={spinning || coins < g.cost * 10}
                  className="flex-1 py-3 rounded-xl font-bold text-sm border-2 transition-all disabled:opacity-50"
                  style={{ borderColor: g.color, color: g.color }}
                >
                  10回 🪙{(g.cost * 10).toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Result */}
      {result && (
        <div
          className="rounded-2xl p-5 text-center text-white font-medium"
          style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
        >
          <div className="text-3xl mb-2">🎉</div>
          <p>{result}</p>
        </div>
      )}

      {/* Rates */}
      <div className="mt-8 p-5 bg-gray-50 rounded-2xl">
        <h3 className="text-sm font-bold text-gray-700 mb-3">排出率</h3>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[
            { rarity: "SSR", rate: "3%", color: "#FF4500" },
            { rarity: "SR", rate: "12%", color: "#9333EA" },
            { rarity: "R", rate: "35%", color: "#00D4FF" },
            { rarity: "N", rate: "50%", color: "#6B7280" },
          ].map((r) => (
            <div key={r.rarity}>
              <div className="font-black" style={{ color: r.color }}>{r.rarity}</div>
              <div className="text-gray-500">{r.rate}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
