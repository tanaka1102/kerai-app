"use client";

import { useState } from "react";
import Image from "next/image";

const ownedKerai = [
  { name: "コスケ", role: "営業", imgPath: "/characters/営業/コスケ_ノーマル.png" },
  { name: "ブン子", role: "事務", imgPath: "/characters/事務/ブン子_ノーマル.png" },
  { name: "ソロ丸", role: "経理", imgPath: "/characters/経理/ソロ丸_ノーマル.png" },
];

export default function MissionPage() {
  const [tab, setTab] = useState<"chat" | "form">("chat");
  const [message, setMessage] = useState("");
  const [selectedKerai, setSelectedKerai] = useState(ownedKerai[0]);

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
          {/* Kerai selector */}
          <div className="px-4 pt-4 pb-3 border-b border-gray-100 flex gap-2 overflow-x-auto">
            {ownedKerai.map((k) => (
              <button
                key={k.name}
                onClick={() => setSelectedKerai(k)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all flex-shrink-0 text-sm font-medium ${
                  selectedKerai.name === k.name
                    ? "border-cyan-400 bg-cyan-50 text-cyan-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden bg-gray-100">
                  <Image src={k.imgPath} alt={k.name} fill className="object-contain" sizes="24px" />
                </div>
                <span>{k.name}</span>
                <span className="text-xs text-gray-400">({k.role})</span>
              </button>
            ))}
          </div>

          {/* Chat messages */}
          <div className="h-80 p-6 space-y-4 overflow-y-auto">
            <div className="flex gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden bg-cyan-50 flex-shrink-0">
                <Image
                  src={selectedKerai.imgPath}
                  alt={selectedKerai.name}
                  fill
                  className="object-contain p-0.5"
                  sizes="36px"
                />
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-none px-4 py-3 max-w-xs">
                <p className="text-xs text-gray-400 mb-1 font-medium">{selectedKerai.name}（{selectedKerai.role}）</p>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">担当家来を選ぶ</label>
            <div className="grid grid-cols-3 gap-3">
              {ownedKerai.map((k) => (
                <button
                  key={k.name}
                  onClick={() => setSelectedKerai(k)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    selectedKerai.name === k.name
                      ? "border-cyan-400 bg-cyan-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50">
                    <Image src={k.imgPath} alt={k.name} fill className="object-contain p-1" sizes="56px" />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-bold text-gray-900">{k.name}</div>
                    <div className="text-xs text-gray-400">{k.role}</div>
                  </div>
                </button>
              ))}
            </div>
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
            {selectedKerai.name}に任務を依頼する 📜
          </button>
        </div>
      )}
    </div>
  );
}
