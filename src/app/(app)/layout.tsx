import AppHeader from "@/components/AppHeader";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      <main className="pt-16 pb-20 md:pb-0 min-h-screen bg-gray-50">
        {children}
      </main>
    </>
  );
}
