import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const BASE_URL = "https://kerai-app.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AI社員ケライ | 休まない。辞めない。文句言わない。",
    template: "%s | AI社員ケライ",
  },
  description:
    "中小企業向けAI社員サービス。ゲーム感覚で家来を採用し、事務・営業・経理をAIが代行。月額0円から始められます。",
  keywords: ["AI社員", "AI自動化", "中小企業", "業務効率化", "AI代行", "業務自動化", "ケライ"],
  authors: [{ name: "AI社員ケライ" }],
  creator: "AI社員ケライ",
  publisher: "AI社員ケライ",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "8nDBohHIHF7czzQOLk0hZ1Be3hMEr0qa9fRra3QcC60",
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "AI社員ケライ | 休まない。辞めない。文句言わない。",
    description:
      "中小企業向けAI社員サービス。ゲーム感覚で家来を採用し、事務・営業・経理をAIが代行。月額0円から始められます。",
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "AI社員ケライ",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "AI社員ケライ — 休まない。辞めない。文句言わない。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI社員ケライ | 休まない。辞めない。文句言わない。",
    description:
      "中小企業向けAI社員サービス。ゲーム感覚で家来を採用し、事務・営業・経理をAIが代行。月額0円から。",
    images: [`${BASE_URL}/og-image.png`],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "AI社員ケライ",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://kerai-app.vercel.app",
  description:
    "中小企業向けAI社員サービス。ゲーム感覚で家来を採用し、事務・営業・経理をAIが代行。月額0円から始められます。",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
  },
  publisher: {
    "@type": "Organization",
    name: "AI社員ケライ",
    url: "https://kerai-app.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${notoSansJP.className} min-h-full bg-white text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
