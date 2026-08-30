# realestate-app02

Supabase 認証機能付きの不動産管理 Web アプリ（React + Vite）。

## 機能

- メールアドレス＋パスワードでの会員登録・ログイン
- ログイン後に物件一覧画面（物件名・家賃・エリアをカード表示、ダミーデータ）へ遷移
- 未ログイン時はログイン画面へリダイレクト
- ログアウトボタン

## セットアップ

```bash
npm install
cp .env.example .env   # .env を編集して Supabase の値を入れる
npm run dev
```

## 環境変数（.env）

`.env` は `.gitignore` 済みなのでコミットされません。

| キー | 説明 |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase の Project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase の Publishable key |

## Supabase 側の設定

- Authentication > Providers で「Email」を有効化
- 動作確認だけなら Authentication > Providers > Email の
  「Confirm email」をオフにすると、確認メールなしで即ログインできます
- SQL Editor で `supabase/schema.sql` を実行して
  `properties` テーブルと RLS ポリシーを作成する

## スクリプト

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー |
| `npm run build` | 本番ビルド |
| `npm run preview` | ビルド結果のプレビュー |
