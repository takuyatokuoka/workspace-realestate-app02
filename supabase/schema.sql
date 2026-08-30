-- ============================================================
-- 不動産管理アプリ: properties テーブル
-- Supabase の SQL Editor に貼り付けて実行する
-- ============================================================

-- 物件テーブル
create table if not exists public.properties (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,                       -- 物件名
  rent       integer     not null check (rent >= 0),     -- 家賃（円）
  area       text        not null,                       -- エリア名
  layout     text        not null,                       -- 間取り（例: 1LDK）
  user_id    uuid        not null default auth.uid()
                         references auth.users (id) on delete cascade, -- 登録したユーザー
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 一覧取得を速くするためのインデックス
create index if not exists properties_user_id_idx on public.properties (user_id);

-- updated_at を自動更新するトリガー
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists properties_set_updated_at on public.properties;
create trigger properties_set_updated_at
  before update on public.properties
  for each row execute function public.set_updated_at();

-- ============================================================
-- RLS（行レベルセキュリティ）
-- ============================================================

-- RLS を有効化
alter table public.properties enable row level security;

-- 既存ポリシーがあれば削除（再実行できるように）
drop policy if exists "自分の物件のみ参照可能" on public.properties;
drop policy if exists "自分の物件のみ登録可能" on public.properties;
drop policy if exists "自分の物件のみ更新可能" on public.properties;
drop policy if exists "自分の物件のみ削除可能" on public.properties;

-- SELECT: 自分が登録した物件のみ表示できる
create policy "自分の物件のみ参照可能"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- INSERT: user_id が自分自身の場合のみ登録できる
create policy "自分の物件のみ登録可能"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- UPDATE: 自分が登録した物件のみ編集できる
create policy "自分の物件のみ更新可能"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- DELETE: 自分が登録した物件のみ削除できる
create policy "自分の物件のみ削除可能"
  on public.properties
  for delete
  using (auth.uid() = user_id);
