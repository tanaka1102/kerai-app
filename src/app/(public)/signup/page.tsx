import type { Metadata } from "next";
import SignupForm from "./SignupForm";

export const metadata: Metadata = {
  title: "無料登録",
  description: "AI社員ケライに無料登録。クレジットカード不要、最短2分で家来を採用できます。",
  alternates: {
    canonical: "https://kerai-app.vercel.app/signup",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function SignupPage() {
  return <SignupForm />;
}
