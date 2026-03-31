import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "任務履歴 | AI社員ケライ",
  description: "家来たちの任務履歴を確認できます。",
};

const history = [
  {
    id: 1,
    date: "2026-03-31 14:32",
    type: "書類作成",
    kerai: "事務のさくら",
    icon: "🌸",
    result: "完了",
    coins: 50,
  },
  {
    id: 2,
    date: "2026-03-31 11:15",
    type: "メール対応",
    kerai: "営業の武蔵",
    icon: "⚔️",
    result: "完了",
    coins: 30,
  },
  {
    id: 3,
    date: "2026-03-30 16:44",
    type: "データ分析",
    kerai: "経理のそろばん斎",
    icon: "🧮",
    result: "完了",
    coins: 80,
  },
  {
    id: 4,
    date: "2026-03-30 09:20",
    type: "SNS投稿",
    kerai: "事務のさくら",
    icon: "🌸",
    result: "完了",
    coins: 40,
  },
  {
    id: 5,
    date: "2026-03-29 15:00",
    type: "書類作成",
    kerai: "営業の武蔵",
    icon: "⚔️",
    result: "完了",
    coins: 50,
  },
];

export default function HistoryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">📋 任務履歴</h1>
        <p className="text-sm text-gray-500">家来たちの活躍記録</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "今月の任務", value: "23件", icon: "📜" },
          { label: "獲得小判", value: "850枚", icon: "🪙" },
          { label: "節約時間", value: "18時間", icon: "⏱️" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-black text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* History List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">直近の任務</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {history.map((h) => (
            <div key={h.id} className="flex items-center gap-4 px-6 py-4">
              <div className="text-2xl">{h.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-gray-900">{h.type}</span>
                  <span className="text-xs text-gray-400">— {h.kerai}</span>
                </div>
                <div className="text-xs text-gray-400">{h.date}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  {h.result}
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-yellow-600">
                  <span>🪙</span>
                  <span>+{h.coins}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
