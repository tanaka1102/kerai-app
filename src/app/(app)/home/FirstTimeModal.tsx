"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const STORAGE_KEY = "kerai_first_visit_done";

const keraiOptions = [
  {
    role: "営業",
    label: "営業番",
    desc: "メール作成・営業リスト・提案書の下書きをお任せ",
    kerai: { name: "コスケ", imgPath: "/characters/営業/コスケ_ノーマル.png" },
    color: "#EF4444",
    icon: "⚔️",
  },
  {
    role: "事務",
    label: "文書番",
    desc: "請求書・議事録・スケジュール管理をお任せ",
    kerai: { name: "ブン子", imgPath: "/characters/事務/ブン子_ノーマル.png" },
    color: "#00D4FF",
    icon: "📝",
  },
  {
    role: "経理",
    label: "算盤番",
    desc: "売上レポート・経費精算・帳簿管理をお任せ",
    kerai: { name: "ソロ丸", imgPath: "/characters/経理/ソロ丸_ノーマル.png" },
    color: "#10B981",
    icon: "🧮",
  },
  {
    role: "SNS/マーケ",
    label: "発信番",
    desc: "投稿文作成・ハッシュタグ・メルマガ作成をお任せ",
    kerai: { name: "ドンドン", imgPath: "/characters/SNS_マーケ/ドンドン_ノーマル.png" },
    color: "#F59E0B",
    icon: "📢",
  },
  {
    role: "サポート",
    label: "応対番",
    desc: "問い合わせ対応・FAQ・顧客満足度分析をお任せ",
    kerai: { name: "オチャ丸", imgPath: "/characters/サポート/オチャ丸_ノーマル.png" },
    color: "#8B5CF6",
    icon: "💬",
  },
  {
    role: "Web制作",
    label: "造作番",
    desc: "LP作成・HP更新・SEO対策・フォーム設置をお任せ",
    kerai: { name: "トン太", imgPath: "/characters/Web制作/トン太_ノーマル.png" },
    color: "#6366F1",
    icon: "🖥️",
  },
];

export default function FirstTimeModal() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<"select" | "confirm" | "done">("select");

  useEffect(() => {
    const done = localStorage.getItem(STORAGE_KEY);
    if (!done) {
      setShow(true);
    }
  }, []);

  const selectedOption = keraiOptions.find((k) => k.role === selected);

  const handleAdopt = () => {
    setStep("done");
    localStorage.setItem(STORAGE_KEY, "1");
    setTimeout(() => setShow(false), 1800);
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(10,10,20,0.85)" }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {step === "select" && (
          <>
            <div
              className="px-6 pt-8 pb-6 text-center text-white"
              style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
            >
              <div className="text-4xl mb-3">⚔️</div>
              <h2 className="text-xl font-black mb-2">ようこそ、殿！</h2>
              <p className="text-gray-400 text-sm">
                最初の家来を選んでください。<br />
                あなたの仕事で最も助けて欲しいことは何ですか？
              </p>
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {keraiOptions.map((opt) => (
                <button
                  key={opt.role}
                  onClick={() => setSelected(opt.role)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-left ${
                    selected === opt.role
                      ? "scale-[1.02] shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  style={
                    selected === opt.role
                      ? { borderColor: opt.color, background: opt.color + "08" }
                      : undefined
                  }
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-50">
                    <Image
                      src={opt.kerai.imgPath}
                      alt={opt.kerai.name}
                      fill
                      className="object-contain p-0.5"
                      sizes="48px"
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs font-black text-gray-900">{opt.icon} {opt.label}</div>
                    <div className="text-xs text-gray-400 leading-tight mt-0.5">{opt.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="px-4 pb-6">
              <button
                disabled={!selected}
                onClick={() => setStep("confirm")}
                className="w-full py-3 rounded-xl text-white font-bold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
              >
                {selected ? `${selected}の家来を選ぶ →` : "家来を選んでください"}
              </button>
            </div>
          </>
        )}

        {step === "confirm" && selectedOption && (
          <div className="p-8 text-center">
            <div
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold mb-4"
              style={{ color: selectedOption.color, background: selectedOption.color + "15" }}
            >
              {selectedOption.icon} {selectedOption.label}
            </div>
            <div className="relative w-32 h-32 mx-auto rounded-2xl overflow-hidden bg-gray-50 mb-4">
              <Image
                src={selectedOption.kerai.imgPath}
                alt={selectedOption.kerai.name}
                fill
                className="object-contain p-2"
                sizes="128px"
              />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-1">{selectedOption.kerai.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{selectedOption.role}担当</p>
            <p className="text-sm text-gray-500 mb-8">
              この家来を採用しますか？<br />
              いつでも図鑑から他の家来も確認できます。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setStep("select")}
                className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors"
              >
                戻る
              </button>
              <button
                onClick={handleAdopt}
                className="flex-1 py-3 rounded-xl text-white font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
              >
                採用する ⚔️
              </button>
            </div>
          </div>
        )}

        {step === "done" && selectedOption && (
          <div className="p-10 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-black text-gray-900 mb-2">
              {selectedOption.kerai.name}を採用しました！
            </h2>
            <p className="text-sm text-gray-500">城下町へ移動します...</p>
          </div>
        )}
      </div>
    </div>
  );
}
