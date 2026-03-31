import type { Metadata } from "next";
import Link from "next/link";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  title: "AI社員ケライ | 休まない。辞めない。文句言わない。",
  description:
    "中小企業向けAI社員サービス。ゲーム感覚で家来を採用し、事務・営業・経理をAIが代行。月額0円から。",
};

const features = [
  {
    icon: "📜",
    title: "任務依頼",
    desc: "チャットで話しかけるだけ。「見積書を作って」「メールを返して」——家来が即座に動きます。",
  },
  {
    icon: "⚔️",
    title: "6種類の専門家来",
    desc: "営業・事務・経理・SNS・サポート・Web制作。得意分野を持つ家来が揃っています。",
  },
  {
    icon: "🎲",
    title: "ガチャで強化",
    desc: "小判を集めてガチャを回し、レアな家来スキンや城下町を装飾。仕事がゲームになる。",
  },
  {
    icon: "🏯",
    title: "城下町",
    desc: "あなたの会社がゲームの城に。業務実績が積まれるほど城下町が発展していきます。",
  },
  {
    icon: "🪙",
    title: "小判システム",
    desc: "任務完了で小判ゲット。ガチャや装飾に使えるインセンティブが仕事のモチベを上げます。",
  },
  {
    icon: "📊",
    title: "実績管理",
    desc: "家来の働きをすべて記録。いつ何をしたか、どれだけ時間を節約したか一目でわかります。",
  },
];

const plans = [
  {
    name: "無料",
    price: "¥0",
    period: "/月",
    color: "#6B7280",
    highlight: false,
    features: ["家来1体", "月10件まで", "基本機能のみ"],
    cta: "無料で始める",
  },
  {
    name: "スターター",
    price: "¥2,980",
    period: "/月",
    color: "#00D4FF",
    highlight: false,
    features: ["家来3体", "月100件まで", "全機能利用可"],
    cta: "始める",
  },
  {
    name: "スタンダード",
    price: "¥9,800",
    period: "/月",
    color: "#0088FF",
    highlight: true,
    features: ["家来10体", "月500件まで", "優先サポート", "分析ダッシュボード"],
    cta: "最も人気",
  },
  {
    name: "グロース",
    price: "¥29,800",
    period: "/月",
    color: "#7C3AED",
    highlight: false,
    features: ["家来無制限", "件数無制限", "専任サポート", "カスタム設定"],
    cta: "問い合わせ",
  },
];

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 md:py-36">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(circle, #00D4FF, transparent)" }}
          />

          <div className="relative max-w-5xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm mb-8">
              <span style={{ color: "#00D4FF" }}>⚔️</span>
              <span>最短2分で採用開始</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6">
              <span className="gradient-text">休まない。</span>
              <br />
              <span className="gradient-text">辞めない。</span>
              <br />
              <span className="gradient-text">文句言わない。</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium">
              あなたの家来を最短2分で採用。
            </p>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
              中小企業の事務・営業・経理をAI家来が代行。
              ゲーム感覚で業務を自動化し、本当にやりたい仕事に集中できます。
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup" className="kerai-btn-primary text-base">
                無料で家来を採用する ⚔️
              </Link>
              <Link
                href="/#features"
                className="text-gray-300 hover:text-white flex items-center gap-2 text-sm"
              >
                機能を見る →
              </Link>
            </div>

            <p className="mt-6 text-xs text-gray-500">
              クレジットカード不要 · 月額0円から · いつでも解約可能
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 py-12 border-y border-gray-100">
          <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
            {[
              { value: "2分", label: "平均採用時間" },
              { value: "98%", label: "タスク完了率" },
              { value: "40時間", label: "月平均削減時間" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-black" style={{ color: "#00D4FF" }}>
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              家来たちの力
            </h2>
            <p className="text-gray-500">
              6種類の専門AIが、あなたの城を守ります
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="washi-border p-6 hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                使い方はシンプル
              </h2>
              <p className="text-gray-400">3ステップで業務自動化スタート</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: "👤",
                  title: "アカウント作成",
                  desc: "メールアドレスだけで無料登録。2分以内に完了します。",
                },
                {
                  step: "02",
                  icon: "⚔️",
                  title: "家来を採用",
                  desc: "得意分野を選んで家来を採用。最初の1体は無料です。",
                },
                {
                  step: "03",
                  icon: "📜",
                  title: "任務を依頼",
                  desc: "チャットで話しかけるだけ。家来がすぐに動き始めます。",
                },
              ].map((step) => (
                <div key={step.step} className="text-center">
                  <div
                    className="text-5xl font-black mb-4 opacity-30"
                    style={{ color: "#00D4FF" }}
                  >
                    {step.step}
                  </div>
                  <div className="text-3xl mb-3">{step.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              料金プラン
            </h2>
            <p className="text-gray-500">
              月額0円から。いつでもアップグレード・ダウングレード可能
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border transition-all ${
                  plan.highlight
                    ? "border-transparent shadow-xl scale-105"
                    : "border-gray-200"
                }`}
                style={
                  plan.highlight
                    ? {
                        background: "linear-gradient(135deg, #00D4FF15, #0088FF15)",
                        borderColor: "#00D4FF",
                      }
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
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black" style={{ color: plan.color }}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-400">{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span style={{ color: "#00D4FF" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block text-center py-2.5 rounded-xl text-sm font-bold transition-all ${
                    plan.highlight ? "text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  style={
                    plan.highlight
                      ? { background: "linear-gradient(135deg, #00D4FF, #0088FF)" }
                      : undefined
                  }
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20 text-white text-center"
          style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}
        >
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-5xl mb-6">⚔️</div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              さあ、家来を召喚せよ
            </h2>
            <p className="text-gray-400 mb-8">
              今すぐ無料登録して、最初の家来を採用しましょう。
              <br />
              あなたの城が、今日から変わります。
            </p>
            <Link href="/signup" className="kerai-btn-primary text-base">
              無料で始める ——最短2分
            </Link>
          </div>
        </section>
      </main>
      <PublicFooter />
    </>
  );
}
