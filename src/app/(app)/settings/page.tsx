import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "設定",
  description: "アカウント設定ページ。",
  robots: { index: false, follow: false },
};

export default function SettingsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 mb-1">⚙️ 設定</h1>
        <p className="text-sm text-gray-500">アカウント情報と各種設定</p>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">アカウント情報</h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">お名前</label>
            <input
              type="text"
              defaultValue="田中 こういち"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">メールアドレス</label>
            <input
              type="email"
              defaultValue="koichi@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">会社名</label>
            <input
              type="text"
              defaultValue="株式会社ヒカリ"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
            />
          </div>
          <button
            className="py-2.5 px-6 rounded-xl text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
          >
            変更を保存
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">パスワード変更</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">現在のパスワード</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">新しいパスワード</label>
            <input
              type="password"
              placeholder="8文字以上"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none"
            />
          </div>
          <button
            className="py-2.5 px-6 rounded-xl text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
          >
            パスワードを変更
          </button>
        </div>
      </div>

      {/* Plan Info */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">現在のプラン</h2>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="text-lg font-black text-gray-900">無料プラン</div>
            <div className="text-sm text-gray-400">家来1体・月10件まで</div>
          </div>
          <a
            href="/plan"
            className="py-2 px-5 rounded-xl text-white text-sm font-bold"
            style={{ background: "linear-gradient(135deg, #00D4FF, #0088FF)" }}
          >
            アップグレード
          </a>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl border border-red-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-red-100">
          <h2 className="font-bold text-red-600">アカウント削除</h2>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-500 mb-4">
            アカウントを削除すると、全ての家来・小判・データが失われます。この操作は取り消せません。
          </p>
          <button className="py-2.5 px-6 rounded-xl border-2 border-red-300 text-red-600 font-bold text-sm hover:bg-red-50 transition-colors">
            アカウントを削除する
          </button>
        </div>
      </div>
    </div>
  );
}
