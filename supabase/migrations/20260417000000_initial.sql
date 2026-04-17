-- GemCopy by Amipi - Initial Supabase schema
-- Run via: supabase db push  (after linking a Supabase project)

-- Users extension table (Supabase auth.users holds the primary user record)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text,
  tier text not null default 'free',        -- 'free' | 'pro' | 'enterprise'
  org_id uuid,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "Users read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update using (auth.uid() = id);

-- Organizations (for agencies managing multiple jewelers in Phase H)
create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  owner_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table public.organizations enable row level security;

-- Generated descriptions
create table if not exists public.descriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  org_id uuid references public.organizations(id) on delete set null,
  stone_type text,
  carat_weight text,
  metal_type text,
  jewelry_type text,
  price text,
  tone text,
  language text default 'English',
  headline text,
  full_output text,
  created_at timestamptz not null default now()
);
create index if not exists descriptions_user_id_idx on public.descriptions(user_id, created_at desc);
alter table public.descriptions enable row level security;
create policy "Users read own descriptions" on public.descriptions for select using (auth.uid() = user_id);
create policy "Users insert own descriptions" on public.descriptions for insert with check (auth.uid() = user_id);
create policy "Users delete own descriptions" on public.descriptions for delete using (auth.uid() = user_id);

-- Integrations (Shopify, WooCommerce)
create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  provider text not null,                   -- 'shopify' | 'woocommerce'
  shop_domain text,
  encrypted_token text not null,
  created_at timestamptz not null default now()
);
alter table public.integrations enable row level security;
create policy "Users manage own integrations" on public.integrations for all using (auth.uid() = user_id);

-- Usage events (for analytics)
create table if not exists public.usage_events (
  id bigserial primary key,
  user_id uuid references public.profiles(id) on delete set null,
  event text not null,                      -- 'generate' | 'regenerate' | 'extract' | 'publish'
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);
create index if not exists usage_events_user_id_idx on public.usage_events(user_id, created_at desc);
alter table public.usage_events enable row level security;
create policy "Users read own events" on public.usage_events for select using (auth.uid() = user_id);

-- A/B tests
create table if not exists public.ab_tests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  description_id uuid references public.descriptions(id) on delete set null,
  original_copy text,
  gemcopy_output text,
  conversion_baseline numeric,
  conversion_gemcopy numeric,
  created_at timestamptz not null default now()
);
alter table public.ab_tests enable row level security;
create policy "Users manage own ab_tests" on public.ab_tests for all using (auth.uid() = user_id);

-- Auto-create profile on new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
