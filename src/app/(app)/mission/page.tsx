"use client";

import { useState } from "react";

const kerai = [
  { name: "事務のさくら", role: "事務", icon: "🌸" },
  { name: "営業の武蔵", role: "営業", icon: "⚔️" },
  { name: "経理のそろばん斎", role: "経理", icon: "🧮" },
];

export default function MissionPage() {
  const [tab, setTab] = useState<"chat" | "form">("chat");
  const [message, setMessage] = useState("");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">📜 任務依頼</h1>
        <p className="text-sm text-gray-500">家来に仕事を任せましょう</p>
      </div>

      {/* Tab */}
      <div className="flex gap-2 mb-6">
        {(["chat", "form"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              tab === t ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={tab === t ? { background: "linear-gradient(135deg, #00D4FF, #0088FF)" } : undefined}
          >
            {t === "chat" ? "💬 チャット型" : "📝 フォーム型"}
          </button>
        ))}
      </div>

      {tab === "chat" ? (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Chat messages */}
          <div className="h-96 p-6 space-y-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-sm flex-shrink-0">
                🌸
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                <p className="text-sm text-gray-700">お任せください、殿。どのような任務でしょうか？</p>
              </div>
            </div>
          </div>
          {/* Input */}
          <div className="border-t border-gray-100 p-4 flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="例：今週の売上レポートを作って"
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 text-sm"
            />
            <button
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
            >
              送信
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">担当家来</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none">
              {kerai.map((k) => (
                <option key={k.name}>{k.icon} {k.name}（{k.role}）</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">任務の種類</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none">
              <option>書類作成</option>
              <option>メール対応</option>
              <option>データ分析</option>
              <option>SNS投稿</option>
              <option>その他</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">任務の詳細</label>
            <textarea
              rows={4}
              placeholder="具体的にどんなことをして欲しいか記入してください"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none resize-none"
            />
          </div>
          <button
            className="w-full py-3 rounded-xl text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
          >
            任務を依頼する 📜
          </button>
        </div>
      )}
    </div>
  );
}
