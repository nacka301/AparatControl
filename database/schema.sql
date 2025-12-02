create extension if not exists "uuid-ossp";

create table if not exists public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    full_name text not null,
    role text not null check (role in ('owner','staff')) default 'staff',
    created_at timestamptz not null default now()
);

create table if not exists public.apartments (
    id uuid primary key default uuid_generate_v4(),
    owner_id uuid not null references public.users(id) on delete cascade,
    name text not null,
    location text,
    cover_url text,
    notes text,
    created_at timestamptz not null default now()
);

create table if not exists public.inventory (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    quantity integer not null default 0,
    minimum_quantity integer not null default 5,
    unit text not null default 'kom',
    updated_at timestamptz not null default now()
);

create table if not exists public.tasks (
    id uuid primary key default uuid_generate_v4(),
    apartment_id uuid references public.apartments(id) on delete set null,
    assigned_to uuid references public.users(id) on delete set null,
    title text not null,
    status text not null default 'open' check (status in ('open','in_progress','completed','issue')),
    notes text,
    due_date date,
    issue_image_url text,
    completed_at timestamptz,
    created_at timestamptz not null default now()
);

create index if not exists idx_tasks_status on public.tasks(status);
create index if not exists idx_tasks_assigned_to on public.tasks(assigned_to);

comment on table public.inventory is 'Stanje inventara (papir, kava, sapun, itd.)';
comment on column public.inventory.minimum_quantity is 'Granica za low-stock upozorenja';
