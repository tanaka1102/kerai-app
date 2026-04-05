import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AppHeader from "@/components/AppHeader";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <AppHeader />
      <main className="pt-16 pb-20 md:pb-0 min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}
