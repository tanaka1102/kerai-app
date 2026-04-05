import type { Metadata } from "next";
import PublicHeader from "@/components/PublicHeader";
import PublicFooter from "@/components/PublicFooter";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="pt-16">{children}</main>
      <PublicFooter />
    </>
  );
}
