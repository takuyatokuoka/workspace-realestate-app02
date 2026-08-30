# CLAUDE.md

このファイルは Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドです。

## プロジェクト概要

`realestate-app02` — Supabase 認証機能付きの不動産管理 Web アプリ。

- メールアドレス＋パスワードで会員登録・ログイン
- ログイン後は物件一覧画面（ダミーデータ）へ遷移
- 未ログインでログイン画面へリダイレクト
- ログアウトボタンあり

## 技術スタック

- React 18 + Vite 5
- ルーティング: react-router-dom v6
- 認証・バックエンド: Supabase (`@supabase/supabase-js`)
- スタイル: プレーン CSS（`src/index.css`）

## ディレクトリ構成

```
supabase/
  schema.sql                properties テーブル定義 + RLS ポリシー（SQL Editor で実行）
src/
  main.jsx                  エントリーポイント
  App.jsx                   ルーティング定義
  index.css                 全体スタイル
  supabaseClient.js         Supabase クライアント（.env から接続情報を読む）
  context/AuthContext.jsx   認証状態の共有（signUp / signIn / signOut）
  components/ProtectedRoute.jsx  未ログイン時に /login へリダイレクト
  components/PropertyForm.jsx    物件の登録／編集フォーム（共通）
  api/properties.js         properties テーブルの CRUD 関数
  pages/Login.jsx           ログイン画面
  pages/Register.jsx        会員登録画面
  pages/Properties.jsx      物件一覧 + CRUD 画面（要ログイン）
```

## データベース

- テーブル: `public.properties`（`name` / `rent` / `area` / `layout` / `user_id` / `created_at` / `updated_at`）
- `user_id` は `default auth.uid()` で登録ユーザーを自動記録
- RLS 有効。SELECT / INSERT / UPDATE / DELETE すべて `auth.uid() = user_id` の行のみ許可
- スキーマ変更時は `supabase/schema.sql` を更新し、Supabase の SQL Editor で再実行する（再実行可能なように書いてある）

## 開発コマンド

- `npm install` — 依存インストール
- `npm run dev` — 開発サーバー起動
- `npm run build` — 本番ビルド（`dist/`）
- `npm run preview` — ビルド結果のプレビュー

## 環境変数

`.env`（`.gitignore` 済み。コミット禁止）に以下を設定する。雛形は `.env.example`。

```
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb-publishable-xxxxxxxx
```

## コーディング規約

- コメントは日本語で記載する。

## Git 運用ルール

- **コードやファイルを変更するたびに、コミットして GitHub にプッシュする。**
  1. `git add -A`
  2. `git commit -m "変更内容を説明する日本語メッセージ"`
  3. `git push origin main`
- ブランチは `main`。
- コミットメッセージは日本語で、何をしたかが分かる粒度にする。
- コミット / プッシュは、ユーザーに確認せず変更のたびに実行してよい（このプロジェクトの明示ルール）。
- リモート: `https://github.com/takuyatokuoka/workspace-realestate-app02.git`
- `.env` は絶対にコミットしないこと。

## 文字コードの注意

新規ファイルは UTF-8 で作成する。
