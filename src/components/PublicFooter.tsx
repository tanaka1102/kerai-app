import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-black mb-2" style={{ color: "#00D4FF" }}>
              ⚔️ ケライ
            </div>
            <p className="text-sm text-gray-500">
              休まない。辞めない。文句言わない。
              <br />
              あなたの家来を最短2分で採用。
            </p>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">サービス</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="hover:text-white transition-colors">機能紹介</Link></li>
              <li><Link href="/plan" className="hover:text-white transition-colors">料金プラン</Link></li>
              <li><Link href="/collection" className="hover:text-white transition-colors">家来図鑑</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">アカウント</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/signup" className="hover:text-white transition-colors">無料登録</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">ログイン</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-medium mb-3 text-sm">法的情報</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">利用規約</a></li>
              <li><a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a></li>
              <li><a href="#" className="hover:text-white transition-colors">特定商取引法</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <p>© 2026 AI社員ケライ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
