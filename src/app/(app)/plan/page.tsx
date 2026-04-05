import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プラン・課金",
  description: "AI社員ケライの料金プランと小判購入ページです。",
  robots: { index: false, follow: false },
};

const plans = [
  {
    name: "無料",
    price: "¥0",
    period: "/月",
    color: "#6B7280",
    highlight: false,
    features: ["家来1体", "月10件まで", "基本機能のみ", "コミュニティサポート"],
    cta: "現在のプラン",
    current: true,
  },
  {
    name: "スターター",
    price: "¥9,800",
    period: "/月",
    color: "#00D4FF",
    highlight: false,
    features: ["家来3体", "月100件まで", "全機能利用可", "メールサポート"],
    cta: "アップグレード",
    current: false,
  },
  {
    name: "スタンダード",
    price: "¥29,800",
    period: "/月",
    color: "#0088FF",
    highlight: true,
    features: ["家来10体", "月500件まで", "優先サポート", "分析ダッシュボード", "ガチャボーナス×2"],
    cta: "人気No.1",
    current: false,
  },
  {
    name: "グロース",
    price: "¥49,800",
    period: "/月",
    color: "#7C3AED",
    highlight: false,
    features: ["家来無制限", "件数無制限", "専任サポート", "カスタム設定", "API連携", "ガチャボーナス×5"],
    cta: "問い合わせ",
    current: false,
  },
];

const coinPacks = [
  { amount: 500, price: "¥500", bonus: "" },
  { amount: 1200, price: "¥1,000", bonus: "+200ボーナス" },
  { amount: 3000, price: "¥2,500", bonus: "+500ボーナス" },
  { amount: 7000, price: "¥5,000", bonus: "+2000ボーナス" },
];

export default function PlanPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 mb-1">💎 プラン・課金</h1>
        <p className="text-sm text-gray-500">プランのアップグレードと小判購入</p>
      </div>

      {/* Plans */}
      <section className="mb-12">
        <h2 className="text-lg font-bold text-gray-900 mb-4">料金プラン</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border transition-all ${
                plan.highlight ? "shadow-xl scale-105" : "border-gray-200"
              }`}
              style={
                plan.highlight
                  ? { borderColor: "#00D4FF", background: "linear-gradient(135deg, #00D4FF08, #0088FF08)" }
                  : undefined
              }
            >
              {plan.highlight && (
                <div
                  className="text-xs font-bold text-white text-center py-1 px-3 rounded-full mb-4"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
                >
                  人気No.1
                </div>
              )}
              <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-3xl font-black" style={{ color: plan.color }}>
                  {plan.price}
                </span>
                <span className="text-sm text-gray-400">{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <span style={{ color: "#00D4FF" }} className="mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={plan.current}
                className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                  plan.current
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : plan.highlight
                    ? "text-white hover:opacity-90"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={
                  plan.highlight && !plan.current
                    ? { background: "linear-gradient(135deg, #00D4FF, #0088FF)" }
                    : undefined
                }
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Coin Purchase */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">🪙 小判購入</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {coinPacks.map((pack) => (
            <div key={pack.amount} className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
              <div className="text-4xl mb-2">🪙</div>
              <div className="text-2xl font-black text-yellow-600 mb-0.5">
                {pack.amount.toLocaleString()}枚
              </div>
              {pack.bonus && (
                <div className="text-xs text-green-600 font-medium mb-2">{pack.bonus}</div>
              )}
              <div className="text-sm text-gray-500 mb-4">{pack.price}</div>
              <button
                className="w-full py-2 rounded-xl text-white text-sm font-bold"
                style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
              >
                購入する
              </button>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center">
          ※ 購入した小判は返金・換金できません。利用規約をご確認ください。
        </p>
      </section>
    </div>
  );
}
