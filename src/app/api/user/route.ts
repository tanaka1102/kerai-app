import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCoins, getMissions } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id?: string }).id ?? session.user?.email ?? "anonymous";

  try {
    const [coins, missions] = await Promise.all([
      getCoins(userId),
      getMissions(userId),
    ]);

    return NextResponse.json({ coins, missions });
  } catch {
    return NextResponse.json({ coins: 300, missions: [] });
  }
}
