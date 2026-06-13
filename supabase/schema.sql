-- ============================================================================
-- Portfolio — Supabase schema
-- Run this in the Supabase SQL Editor before seeding.
-- ============================================================================

-- Projects table -------------------------------------------------------------
create table if not exists public.projects (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  description     text not null default '',
  description_tr  text,                                   -- Turkish description (optional)
  type            text not null check (type in ('github_open', 'github_private', 'app_store', 'hardware')),
  github_repo_url text,
  app_store_url   text,
  tech_stack      text[] not null default '{}',
  is_visible      boolean not null default true,
  display_order   int not null default 0,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Keep github_repo_url unique so the GitHub sync can upsert cleanly.
create unique index if not exists projects_github_repo_url_key
  on public.projects (github_repo_url)
  where github_repo_url is not null;

create index if not exists projects_visible_order_idx
  on public.projects (is_visible, display_order);

-- Unique title keeps the seed script idempotent (ON CONFLICT DO NOTHING).
create unique index if not exists projects_title_key
  on public.projects (title);

-- Auto-update updated_at -----------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

-- Row Level Security ---------------------------------------------------------
alter table public.projects enable row level security;

-- Anyone (anonymous visitors) can read visible projects.
drop policy if exists "public_read_visible" on public.projects;
create policy "public_read_visible"
  on public.projects for select
  to anon, authenticated
  using (is_visible = true);

-- Authenticated admin can read everything (incl. hidden).
drop policy if exists "authenticated_read_all" on public.projects;
create policy "authenticated_read_all"
  on public.projects for select
  to authenticated
  using (true);

-- Authenticated admin can create / edit / delete.
drop policy if exists "authenticated_insert" on public.projects;
create policy "authenticated_insert"
  on public.projects for insert
  to authenticated
  with check (true);

drop policy if exists "authenticated_update" on public.projects;
create policy "authenticated_update"
  on public.projects for update
  to authenticated
  using (true) with check (true);

drop policy if exists "authenticated_delete" on public.projects;
create policy "authenticated_delete"
  on public.projects for delete
  to authenticated
  using (true);
