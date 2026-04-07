import type { Metadata } from "next";
import { auth } from "@/auth";
import { getCoins, getMissions, type MissionRecord } from "@/lib/db";

export const metadata: Metadata = {
  title: "任務履歴 | AI社員ケライ",
  description: "家来たちの任務履歴を確認できます。",
};

const roleIcon: Record<string, string> = {
  事務: "📝",
  営業: "⚔️",
  経理: "🧮",
  "SNS/マーケ": "📢",
  サポート: "💬",
  Web制作: "🖥️",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function HistoryPage() {
  const session = await auth();
  const userId = (session?.user as { id?: string })?.id ?? session?.user?.email ?? "anonymous";

  let coins = 300;
  let missions: MissionRecord[] = [];
  try {
    [coins, missions] = await Promise.all([getCoins(userId), getMissions(userId)]);
  } catch {
    // Redis障害時はデフォルト値
  }

  const totalCoins = missions.reduce((s, m) => s + m.coinReward, 0);
  const thisMonth = new Date().getMonth();
  const thisMonthCount = missions.filter(
    (m) => new Date(m.completedAt).getMonth() === thisMonth
  ).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">📋 任務履歴</h1>
        <p className="text-sm text-gray-500">家来たちの活躍記録</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "今月の任務", value: `${thisMonthCount}件`, icon: "📜" },
          { label: "小判残高", value: `${coins.toLocaleString()}枚`, icon: "🪙" },
          { label: "総獲得小判", value: `${totalCoins.toLocaleString()}枚`, icon: "💰" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-xl font-black text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* History List */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-900">直近の任務</h2>
          <span className="text-xs text-gray-400">最新{missions.length}件</span>
        </div>

        {missions.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-4xl mb-3">📜</div>
            <p className="text-gray-400 text-sm">まだ任務がありません</p>
            <a
              href="/mission"
              className="inline-block mt-4 px-4 py-2 rounded-xl text-white text-sm font-bold"
              style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
            >
              最初の任務を依頼する
            </a>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {missions.map((m) => (
              <div key={m.id} className="flex items-center gap-4 px-6 py-4">
                <div className="text-2xl flex-shrink-0">
                  {roleIcon[m.keraiRole] ?? "⚔️"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-gray-900">{m.taskType}</span>
                    <span className="text-xs text-gray-400">— {m.keraiName}</span>
                  </div>
                  <div className="text-xs text-gray-400">{formatDate(m.completedAt)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                    完了
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-yellow-600">
                    <span>🪙</span>
                    <span>+{m.coinReward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
