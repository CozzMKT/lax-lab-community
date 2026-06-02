-- ============================================================
-- LAX LAB — SUPABASE DATABASE SCHEMA
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────
-- Extends Supabase auth.users with app-specific data
create table if not exists public.profiles (
  id                              uuid references auth.users on delete cascade primary key,
  email                           text,
  full_name                       text,
  avatar_url                      text,
  role                            text default 'athlete' check (role in ('athlete', 'parent', 'coach', 'admin')),

  -- Subscription
  stripe_customer_id              text unique,
  subscription_id                 text,
  subscription_status             text default 'inactive' check (
    subscription_status in ('active', 'inactive', 'past_due', 'canceled', 'trialing')
  ),
  subscription_current_period_end timestamptz,

  -- Gamification
  xp                              integer default 0,
  streak_days                     integer default 0,
  last_active_date                date,
  rank_title                      text default 'Rookie',

  -- Profile customization
  position                        text,
  grad_year                       integer,
  team                            text,
  state                           text,

  created_at                      timestamptz default now(),
  updated_at                      timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── DRILLS ──────────────────────────────────────────────────
create table if not exists public.drills (
  id          uuid default uuid_generate_v4() primary key,
  slug        text unique not null,
  title       text not null,
  categories  text[] not null default '{}',
  coach       text not null default 'Jules Heningburg',
  description text,
  thumbnail   text,  -- local path e.g. /drills/one-knee-pop.png
  mux_id      text,  -- Mux playback ID after upload
  month1      boolean default false,
  featured    boolean default false,
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- ─── PROGRAMS ────────────────────────────────────────────────
create table if not exists public.programs (
  id          uuid default uuid_generate_v4() primary key,
  slug        text unique not null,
  title       text not null,
  description text,
  duration    text,
  frequency   text,
  icon        text,
  color       text,
  sort_order  integer default 0,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

-- ─── ENROLLMENTS ─────────────────────────────────────────────
create table if not exists public.enrollments (
  id                uuid default uuid_generate_v4() primary key,
  user_id           uuid references public.profiles on delete cascade,
  program_id        uuid references public.programs on delete cascade,
  enrolled_at       timestamptz default now(),
  completed_at      timestamptz,
  unique(user_id, program_id)
);

-- ─── DRILL COMPLETIONS ───────────────────────────────────────
create table if not exists public.drill_completions (
  id           uuid default uuid_generate_v4() primary key,
  user_id      uuid references public.profiles on delete cascade,
  drill_id     uuid references public.drills on delete cascade,
  completed_at timestamptz default now(),
  xp_earned    integer default 10,
  unique(user_id, drill_id)
);

-- ─── CHANNELS (community) ────────────────────────────────────
create table if not exists public.channels (
  id          uuid default uuid_generate_v4() primary key,
  slug        text unique not null,
  name        text not null,
  description text,
  icon        text default 'hash',
  sort_order  integer default 0,
  created_at  timestamptz default now()
);

-- ─── MESSAGES ────────────────────────────────────────────────
create table if not exists public.messages (
  id         uuid default uuid_generate_v4() primary key,
  channel_id uuid references public.channels on delete cascade,
  user_id    uuid references public.profiles on delete cascade,
  content    text not null,
  pinned     boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── MESSAGE REACTIONS ───────────────────────────────────────
create table if not exists public.reactions (
  id         uuid default uuid_generate_v4() primary key,
  message_id uuid references public.messages on delete cascade,
  user_id    uuid references public.profiles on delete cascade,
  emoji      text not null,
  created_at timestamptz default now(),
  unique(message_id, user_id, emoji)
);

-- ─── DIRECT MESSAGES ─────────────────────────────────────────
create table if not exists public.direct_messages (
  id           uuid default uuid_generate_v4() primary key,
  sender_id    uuid references public.profiles on delete cascade,
  recipient_id uuid references public.profiles on delete cascade,
  content      text not null,
  read_at      timestamptz,
  created_at   timestamptz default now()
);

-- ─── CAMPS ───────────────────────────────────────────────────
create table if not exists public.camps (
  id           uuid default uuid_generate_v4() primary key,
  title        text not null,
  location     text,
  date         date,
  time         text,
  price        integer, -- cents
  spots_total  integer,
  spots_taken  integer default 0,
  description  text,
  image_url    text,
  is_active    boolean default true,
  created_at   timestamptz default now()
);

-- ─── CAMP REGISTRATIONS ──────────────────────────────────────
create table if not exists public.camp_registrations (
  id              uuid default uuid_generate_v4() primary key,
  camp_id         uuid references public.camps on delete cascade,
  user_id         uuid references public.profiles on delete cascade,
  athlete_name    text,
  parent_name     text,
  email           text,
  phone           text,
  payment_status  text default 'pending' check (payment_status in ('pending', 'paid', 'refunded')),
  stripe_session_id text,
  registered_at   timestamptz default now(),
  unique(camp_id, user_id)
);

-- ─── LEADERBOARD VIEW ────────────────────────────────────────
create or replace view public.leaderboard as
  select
    p.id,
    p.full_name,
    p.xp,
    p.streak_days,
    p.rank_title,
    p.avatar_url,
    row_number() over (order by p.xp desc) as rank
  from public.profiles p
  where p.subscription_status = 'active'
  order by p.xp desc;

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.reactions enable row level security;
alter table public.direct_messages enable row level security;
alter table public.drill_completions enable row level security;
alter table public.enrollments enable row level security;
alter table public.camp_registrations enable row level security;

-- Profiles: users can read all, update only their own
create policy "Public profiles are viewable by subscribers"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Messages: subscribers can read/write
create policy "Subscribers can read messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and subscription_status in ('active', 'trialing')
    )
  );

create policy "Subscribers can insert messages"
  on public.messages for insert
  with check (
    auth.uid() = user_id and
    exists (
      select 1 from public.profiles
      where id = auth.uid()
      and subscription_status in ('active', 'trialing')
    )
  );

-- Reactions: subscribers can manage their own
create policy "Subscribers can manage reactions"
  on public.reactions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Direct messages: only sender/recipient can see
create policy "DMs visible to participants"
  on public.direct_messages for select
  using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Users can send DMs"
  on public.direct_messages for insert
  with check (auth.uid() = sender_id);

-- Drill completions: users see their own
create policy "Users see own completions"
  on public.drill_completions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Enrollments
create policy "Users see own enrollments"
  on public.enrollments for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ─── SEED DATA ───────────────────────────────────────────────
-- Default channels
insert into public.channels (slug, name, description, icon, sort_order) values
  ('general', 'general', 'Hang out and chat with the Lax Lab community', 'hash', 1),
  ('announcements', 'announcements', 'Official updates from Jules and the Lax Lab team', 'megaphone', 2),
  ('wins', 'wins', 'Celebrate your victories — on and off the field', 'trophy', 3),
  ('webinar', 'webinar', 'Live webinar replays, Q&A, and upcoming session info', 'video', 4)
on conflict (slug) do nothing;

-- Programs
insert into public.programs (slug, title, description, duration, frequency, icon, color, sort_order) values
  (
    'offensive-skills-foundation',
    'Offensive Skills Foundation',
    'A focused 4-week program designed to master the fundamentals of offense. Built by Jules Heningburg — 6 days a week, each day targeting a specific offensive pillar.',
    '4 Weeks',
    '6 days/week',
    'Target',
    'brand-green',
    1
  ),
  (
    'd1-recruiting-roadmap',
    'D1 Recruiting Roadmap',
    'Everything parents and athletes need to know about the college recruiting process. Step-by-step plan from highlight reel to signing day.',
    'Self-Paced',
    'At your pace',
    'GraduationCap',
    'blue-400',
    2
  )
on conflict (slug) do nothing;

-- ─── ENABLE REALTIME ─────────────────────────────────────────
-- Run in Supabase Dashboard → Database → Replication
-- Or uncomment below (may need superuser):
-- alter publication supabase_realtime add table public.messages;
-- alter publication supabase_realtime add table public.reactions;
-- alter publication supabase_realtime add table public.direct_messages;
