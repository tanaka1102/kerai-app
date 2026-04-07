import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー | AI社員ケライ",
  description: "AI社員ケライのプライバシーポリシー。個人情報の取り扱いについて説明します。",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black text-gray-900 mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-gray-500 mb-10">最終更新日：2026年4月1日</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-10 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">1. 事業者情報</h2>
            <p>
              本プライバシーポリシーは、AI社員ケライ（以下「本サービス」）を運営する株式会社ヒカリ（以下「当社」）が、
              ユーザーの個人情報をどのように収集・利用・保護するかを定めたものです。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">2. 収集する情報</h2>
            <p className="mb-3">当社は以下の情報を収集することがあります。</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong>アカウント情報</strong>：メールアドレス、表示名（Googleアカウント連携の場合はGoogleが提供する情報）</li>
              <li><strong>利用データ</strong>：ミッションの実行履歴、小判残高、アクセス日時</li>
              <li><strong>技術情報</strong>：IPアドレス、ブラウザ種別、Cookie・セッション情報</li>
            </ul>
            <p className="mt-3 text-gray-500 text-xs">
              ※ ミッション実行時に入力いただいたテキスト（依頼内容）は、結果生成にのみ使用し、データベースには保存しません。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">3. 情報の利用目的</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>本サービスの提供・運営・改善</li>
              <li>ユーザー認証およびアカウント管理</li>
              <li>不正アクセス・不正利用の検知・防止</li>
              <li>サポートへの対応</li>
              <li>重要なお知らせのメール送信</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">4. 第三者への提供</h2>
            <p className="mb-3">
              当社は、以下の場合を除き、ユーザーの個人情報を第三者に提供・開示しません。
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>ユーザーの同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命・身体・財産の保護のために必要な場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">5. 利用するサービス・技術</h2>
            <p className="mb-3">本サービスは以下のサービスを利用しています。それぞれのプライバシーポリシーもあわせてご確認ください。</p>
            <div className="space-y-3">
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="font-medium text-gray-900 mb-1">Google OAuth 2.0</div>
                <div className="text-gray-500 text-xs">Googleアカウントによる認証に使用。Googleの収集情報はGoogleのプライバシーポリシーに従います。</div>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="font-medium text-gray-900 mb-1">Upstash Redis</div>
                <div className="text-gray-500 text-xs">ユーザーデータ（小判残高・ミッション履歴）の保存に使用。データはハッシュ化されたIDで管理します。</div>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="font-medium text-gray-900 mb-1">Vercel</div>
                <div className="text-gray-500 text-xs">本サービスのホスティングに使用。アクセスログはVercelのポリシーに従い管理されます。</div>
              </div>
              <div className="rounded-xl border border-gray-100 p-4">
                <div className="font-medium text-gray-900 mb-1">Resend</div>
                <div className="text-gray-500 text-xs">確認メール等の送信に使用。送信先メールアドレスのみ処理されます。</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">6. Cookie・セッション</h2>
            <p>
              本サービスは認証・セキュリティ目的のCookieを使用します。
              これらは本サービスの動作に必要不可欠なものです。
              ブラウザの設定でCookieを無効にした場合、一部機能が利用できなくなる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">7. データの保管・保護</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>通信はすべてTLS（HTTPS）により暗号化されます</li>
              <li>RedisのキーにはユーザーIDをSHA-256でハッシュ化した値を使用します</li>
              <li>パスワードは業界標準のハッシュ化アルゴリズムで保護されます</li>
              <li>ミッションの入力内容（依頼テキスト）は保存されません</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">8. ユーザーの権利</h2>
            <p className="mb-3">ユーザーは以下の権利を有します。</p>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>保有する個人情報の開示・訂正・削除の請求</li>
              <li>アカウントの削除（設定画面から申請可能）</li>
            </ul>
            <p className="mt-3">
              ご要望は下記お問い合わせ先までご連絡ください。合理的な期間内に対応いたします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">9. 未成年者の利用</h2>
            <p>
              本サービスは13歳以上を対象としています。
              13歳未満の方の個人情報を意図的に収集することはありません。
              13歳未満の方が登録されていることが判明した場合、アカウントを削除します。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">10. ポリシーの変更</h2>
            <p>
              本ポリシーは必要に応じて更新されることがあります。
              重要な変更がある場合は、本ページへの掲載または登録メールアドレスへの通知によりお知らせします。
              変更後の継続利用は、改定ポリシーへの同意とみなします。
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-gray-900 mb-3">11. お問い合わせ</h2>
            <p>
              本ポリシーに関するお問い合わせは、本サービス内のサポート機能またはサービス内に掲載のメールアドレスまでご連絡ください。
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
