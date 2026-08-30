# CLAUDE.md

このファイルは Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイドです。

## プロジェクト概要

`realestate-app02` — 不動産関連 Web アプリの開発用プロジェクト（2 作目）。
現時点ではディレクトリはほぼ空で、技術スタックは未定。
実装を始めたら、この CLAUDE.md に「スタック」「ディレクトリ構成」「起動・テスト方法」を追記していく。

### 決まり次第ここに追記する項目

- 言語 / フレームワーク（例: PHP + Laravel、Ruby on Rails、Next.js など）
- データベース（例: MySQL、PostgreSQL、SQLite）
- 開発サーバーの起動コマンド
- テストの実行コマンド
- Lint / フォーマッタの設定

## Git 運用ルール

- **コードやファイルを変更するたびに、コミットして GitHub にプッシュする。**
  1. `git add -A`
  2. `git commit -m "変更内容を説明する日本語メッセージ"`
  3. `git push origin main`
- ブランチは `main`。
- コミットメッセージは日本語で、何をしたかが分かる粒度にする。
- コミット / プッシュは、ユーザーに確認せず変更のたびに実行してよい（このプロジェクトの明示ルール）。

### 初回セットアップ（このディレクトリはまだ Git 管理下ではない）

```bash
git init
git branch -M main
git add -A
git commit -m "初期コミット"
git remote add origin <GitHub リポジトリの URL>
git push -u origin main
```

以降は変更のたびに「add → commit → push」を繰り返す。

## 文字コードの注意

新規ファイルは UTF-8 で作成する。
