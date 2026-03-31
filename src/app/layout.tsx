import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI社員ケライ | 休まない。辞めない。文句言わない。",
  description:
    "中小企業向けAI社員サービス。ゲーム感覚で家来を採用し、事務・営業・経理をAIが代行。月額0円から。",
  keywords: "AI社員, AI自動化, 中小企業, 業務効率化, AI代行",
  openGraph: {
    title: "AI社員ケライ | 休まない。辞めない。文句言わない。",
    description:
      "中小企業向けAI社員サービス。ゲーム感覚で家来を採用し、事務・営業・経理をAIが代行。月額0円から。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className={`${notoSansJP.className} min-h-full bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
