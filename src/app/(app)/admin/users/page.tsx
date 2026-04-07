import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { getAllUsers, type AdminUserRecord } from "@/lib/db";

export const metadata: Metadata = {
  title: "ユーザー管理 | ケライ",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!isAdminEmail(session?.user?.email)) {
    redirect("/home");
  }

  let users: AdminUserRecord[] = [];
  let fetchError: string | null = null;

  try {
    users = await getAllUsers();
    users.sort((a, b) => b.coins - a.coins);
  } catch (err) {
    console.error(err);
    fetchError = "ユーザーデータの取得に失敗しました";
  }

  const totalCoins = users.reduce((sum, u) => sum + u.coins, 0);
  const totalMissions = users.reduce((sum, u) => sum + u.missionCount, 0);
  const activeUsers = users.filter((u) => u.missionCount > 0).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <div className="mb-6 flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-gray-900">👑 管理者画面</h1>
            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">ADMIN</span>
          </div>
          <p className="text-sm text-gray-500">登録ユーザーの状況を管理できます</p>
        </div>
      </div>

      {/* サマリーカード */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "総ユーザー数", value: `${users.length}`, icon: "👤", color: "text-blue-600", bg: "bg-blue-50" },
          { label: "アクティブ", value: `${activeUsers}`, icon: "✅", color: "text-green-600", bg: "bg-green-50" },
          { label: "総小判残高", value: `${totalCoins.toLocaleString()}`, icon: "🪙", color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: "総ミッション数", value: `${totalMissions.toLocaleString()}`, icon: "📜", color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} text-xl mb-3`}>
              {stat.icon}
            </div>
            <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ユーザーテーブル */}
      {fetchError ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-600 text-sm">
          {fetchError}
        </div>
      ) : users.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">👤</div>
          <p className="text-gray-400 text-sm">ユーザーが見つかりませんでした</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-gray-900">ユーザー一覧</h2>
            <span className="text-xs text-gray-400">{users.length}件</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ユーザーID
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    小判残高
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ミッション数
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    ステータス
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user, i) => (
                  <tr key={user.hashedId} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-300 w-5 text-right">{i + 1}</span>
                        <span className="font-mono text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg">
                          {user.hashedId.slice(0, 16)}…
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-bold text-yellow-600">
                        🪙 {user.coins.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-gray-700 font-medium">{user.missionCount}件</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium ${
                          user.missionCount > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {user.missionCount > 0 ? "利用中" : "未利用"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">
        ※ プライバシー保護のため、ユーザーIDはSHA-256ハッシュで表示しています
      </p>
    </div>
  );
}
