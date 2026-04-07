"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const ownedKerai = [
  { name: "ブン子", role: "事務", imgPath: "/characters/事務/ブン子_ノーマル.png", mvp: true },
  { name: "コスケ", role: "営業", imgPath: "/characters/営業/コスケ_ノーマル.png", mvp: false },
  { name: "ソロ丸", role: "経理", imgPath: "/characters/経理/ソロ丸_ノーマル.png", mvp: false },
];

const bunkoTaskTypes = [
  "請求書・書類作成",
  "メール文作成",
  "議事録・まとめ",
  "スケジュール調整",
  "データ整理・リスト作成",
];

type ChatMessage = {
  id: number;
  from: "kerai" | "user";
  text: string;
  isResult?: boolean;
  coins?: number;
};

export default function MissionPage() {
  const [tab, setTab] = useState<"chat" | "form">("chat");
  const [selectedKerai, setSelectedKerai] = useState(ownedKerai[0]);

  // Chat state
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 0, from: "kerai", text: "お任せください、殿。どのような任務でしょうか？" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [chatStep, setChatStep] = useState<"idle" | "selecting_type" | "waiting_detail" | "loading" | "done">("idle");
  const [chatTaskType, setChatTaskType] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formTaskType, setFormTaskType] = useState(bunkoTaskTypes[0]);
  const [formDetail, setFormDetail] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formResult, setFormResult] = useState<{ text: string; coins: number } | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const addMessage = (msg: Omit<ChatMessage, "id">) => {
    setChatMessages((prev) => [...prev, { ...msg, id: prev.length }]);
  };

  const callMissionApi = async (taskType: string, detail: string) => {
    const res = await fetch("/api/mission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keraiName: selectedKerai.name,
        keraiRole: selectedKerai.role,
        taskType,
        detail,
      }),
    });
    if (!res.ok) throw new Error("mission api error");
    return res.json() as Promise<{ result: string; coinReward: number }>;
  };

  const handleChatSend = async () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");

    if (chatStep === "idle") {
      // 最初のメッセージ → タスク種別選択へ
      addMessage({ from: "user", text });
      addMessage({
        from: "kerai",
        text: "承知いたしました。どのような種類の任務でしょうか？",
      });
      setChatStep("selecting_type");
      return;
    }

    if (chatStep === "waiting_detail") {
      // 詳細入力 → API呼び出し
      addMessage({ from: "user", text });
      addMessage({ from: "kerai", text: "少々お待ちを……只今取り掛かっております。" });
      setChatStep("loading");

      try {
        const data = await callMissionApi(chatTaskType, text);
        addMessage({
          from: "kerai",
          text: data.result,
          isResult: true,
          coins: data.coinReward,
        });
        setChatStep("done");
      } catch {
        addMessage({ from: "kerai", text: "申し訳ございません、殿。処理中に問題が発生いたしました。" });
        setChatStep("idle");
      }
      return;
    }

    if (chatStep === "done") {
      // 続けて依頼
      addMessage({ from: "user", text });
      addMessage({ from: "kerai", text: "かしこまりました。次の任務、お聞きします。" });
      setChatStep("selecting_type");
    }
  };

  const handleTaskTypeSelect = (type: string) => {
    setChatTaskType(type);
    addMessage({ from: "user", text: type });
    addMessage({ from: "kerai", text: `${type}ですね。詳細をお聞かせください。どのような内容でしょうか？` });
    setChatStep("waiting_detail");
  };

  const handleFormSubmit = async () => {
    setFormLoading(true);
    setFormResult(null);
    try {
      const data = await callMissionApi(formTaskType, formDetail);
      setFormResult({ text: data.result, coins: data.coinReward });
    } catch {
      setFormResult({ text: "処理中にエラーが発生いたしました。再度お試しください。", coins: 0 });
    } finally {
      setFormLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const resetChat = () => {
    setChatMessages([{ id: 0, from: "kerai", text: "お任せください、殿。どのような任務でしょうか？" }]);
    setChatInput("");
    setChatStep("idle");
    setChatTaskType("");
  };

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
                onClick={() => { setSelectedKerai(k); resetChat(); }}
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
                {k.mvp && (
                  <span className="text-xs px-1.5 py-0.5 rounded-full font-bold text-white" style={{ background: "#00D4FF" }}>
                    MVP
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Chat messages */}
          <div className="h-96 p-4 space-y-4 overflow-y-auto bg-gray-50/30">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.from === "user" ? "flex-row-reverse" : ""}`}
              >
                {msg.from === "kerai" && (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-cyan-50 flex-shrink-0">
                    <Image
                      src={selectedKerai.imgPath}
                      alt={selectedKerai.name}
                      fill
                      className="object-contain p-0.5"
                      sizes="36px"
                    />
                  </div>
                )}
                <div className={`max-w-[75%] ${msg.from === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  {msg.from === "kerai" && (
                    <span className="text-xs text-gray-400 font-medium ml-1">
                      {selectedKerai.name}（{selectedKerai.role}）
                    </span>
                  )}
                  {msg.isResult ? (
                    <div className="rounded-2xl rounded-tl-none border border-cyan-200 bg-cyan-50 overflow-hidden">
                      <div className="px-4 py-2 border-b border-cyan-200 flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-700">任務完了</span>
                        <button
                          onClick={() => handleCopy(msg.text)}
                          className="text-xs text-cyan-600 hover:text-cyan-800 font-medium"
                        >
                          コピー
                        </button>
                      </div>
                      <pre className="px-4 py-3 text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                        {msg.text}
                      </pre>
                      {msg.coins && msg.coins > 0 && (
                        <div className="px-4 py-2 border-t border-cyan-200 flex items-center gap-1.5">
                          <span className="text-base">🪙</span>
                          <span className="text-sm font-black text-yellow-600">+{msg.coins} 小判獲得！</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.from === "kerai"
                          ? "bg-white rounded-tl-none border border-gray-100 text-gray-700"
                          : "text-white rounded-tr-none"
                      }`}
                      style={msg.from === "user" ? { background: "linear-gradient(135deg, #00D4FF, #0088FF)" } : undefined}
                    >
                      {msg.text}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* タスク種別選択ボタン */}
            {chatStep === "selecting_type" && selectedKerai.role === "事務" && (
              <div className="flex flex-col gap-2 ml-12">
                <span className="text-xs text-gray-400 ml-1">任務の種類を選んでください</span>
                <div className="flex flex-wrap gap-2">
                  {bunkoTaskTypes.map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTaskTypeSelect(t)}
                      className="px-3 py-1.5 rounded-xl border border-cyan-300 text-cyan-700 bg-cyan-50 text-sm font-medium hover:bg-cyan-100 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {chatStep === "selecting_type" && selectedKerai.role !== "事務" && (
              <div className="ml-12 text-sm text-gray-500 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                ⚠️ {selectedKerai.name}はただいま準備中です。事務担当のブン子にお任せください。
              </div>
            )}

            {chatStep === "done" && (
              <div className="flex gap-2 ml-12 flex-wrap">
                <button
                  onClick={resetChat}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  新しい任務を依頼する
                </button>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-100 p-4 flex gap-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleChatSend()}
              placeholder={
                chatStep === "idle" ? "例：請求書を作りたい" :
                chatStep === "waiting_detail" ? "詳細を入力してください..." :
                chatStep === "done" ? "続けて任務を依頼する..." : ""
              }
              disabled={chatStep === "loading" || chatStep === "selecting_type"}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-300 text-sm disabled:bg-gray-50 disabled:text-gray-400"
            />
            <button
              onClick={handleChatSend}
              disabled={chatStep === "loading" || chatStep === "selecting_type" || !chatInput.trim()}
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
            >
              {chatStep === "loading" ? "..." : "送信"}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
            {/* Kerai selector */}
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
                      {k.mvp && (
                        <span className="text-xs px-1.5 py-0.5 rounded-full font-bold text-white mt-0.5 inline-block" style={{ background: "#00D4FF" }}>
                          MVP
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">任務の種類</label>
              {selectedKerai.role === "事務" ? (
                <select
                  value={formTaskType}
                  onChange={(e) => setFormTaskType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {bunkoTaskTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              ) : (
                <div className="px-4 py-3 rounded-xl border border-yellow-200 bg-yellow-50 text-sm text-yellow-700">
                  ⚠️ {selectedKerai.name}はただいま準備中です。事務担当のブン子をお選びください。
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">任務の詳細</label>
              <textarea
                rows={4}
                value={formDetail}
                onChange={(e) => setFormDetail(e.target.value)}
                placeholder={
                  selectedKerai.role === "事務"
                    ? "例：来月分の請求書（株式会社○○向け、金額50,000円）を作りたい"
                    : "家来を選択してください"
                }
                disabled={selectedKerai.role !== "事務"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300 resize-none disabled:bg-gray-50"
              />
            </div>

            <button
              onClick={handleFormSubmit}
              disabled={formLoading || selectedKerai.role !== "事務"}
              className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
            >
              {formLoading ? "ブン子が作業中..." : `${selectedKerai.name}に任務を依頼する 📜`}
            </button>
          </div>

          {/* Form Result */}
          {formResult && (
            <div className="bg-white rounded-2xl border border-cyan-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-cyan-200 flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, #00D4FF10, #0088FF10)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden bg-cyan-50">
                    <Image src="/characters/事務/ブン子_ノーマル.png" alt="ブン子" fill className="object-contain" sizes="28px" />
                  </div>
                  <span className="text-sm font-bold text-gray-900">任務完了</span>
                </div>
                <div className="flex items-center gap-3">
                  {formResult.coins > 0 && (
                    <span className="flex items-center gap-1 text-sm font-black text-yellow-600">
                      🪙 +{formResult.coins}
                    </span>
                  )}
                  <button
                    onClick={() => handleCopy(formResult.text)}
                    className="text-xs font-medium px-3 py-1 rounded-lg border border-cyan-300 text-cyan-700 hover:bg-cyan-50 transition-colors"
                  >
                    コピー
                  </button>
                </div>
              </div>
              <pre className="p-5 text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                {formResult.text}
              </pre>
              <div className="px-5 py-3 border-t border-gray-100">
                <button
                  onClick={() => { setFormResult(null); setFormDetail(""); }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  新しい任務を依頼する →
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
