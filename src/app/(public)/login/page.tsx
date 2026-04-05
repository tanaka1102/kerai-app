import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "ログイン",
  description: "AI社員ケライにログインして、家来たちの城に戻りましょう。",
  alternates: {
    canonical: "https://kerai-app.vercel.app/login",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
