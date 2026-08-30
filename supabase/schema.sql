-- Slice 1: applications table + submit / lookup RPCs
-- Property Management Group — run entire file in Supabase SQL Editor (empty result = success)
--
-- Fee amount is NOT stored on applications. Applicants often pay a different amount
-- than household size implies; the paid amount is captured from the payment screenshot
-- on payment_proofs (Slice 2) and used on receipts.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  default_fee_cents int not null default 8500,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id, default_fee_cents)
values (1, 8500)
on conflict (id) do nothing;

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  application_id text not null unique,
  access_token uuid not null unique default gen_random_uuid(),
  applicant_name text not null,
  applicant_email text not null,
  applicant_phone text,
  property_address text,
  selected_language text not null default 'en',
  form_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists applications_access_token_idx
  on public.applications (access_token);

alter table public.applications enable row level security;
alter table public.site_settings enable row level security;

revoke all on table public.applications from anon, authenticated, public;
revoke all on table public.site_settings from anon, authenticated, public;

grant usage on schema public to anon, authenticated;

create or replace function public.submit_application(
  p_application_id text,
  p_applicant_name text,
  p_applicant_email text,
  p_applicant_phone text default null,
  p_property_address text default null,
  p_selected_language text default 'en',
  p_form_payload jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_row public.applications%rowtype;
begin
  if coalesce(trim(p_application_id), '') = '' then
    raise exception 'application_id is required';
  end if;
  if coalesce(trim(p_applicant_name), '') = '' then
    raise exception 'applicant_name is required';
  end if;
  if coalesce(trim(p_applicant_email), '') = '' then
    raise exception 'applicant_email is required';
  end if;

  insert into public.applications (
    application_id,
    applicant_name,
    applicant_email,
    applicant_phone,
    property_address,
    selected_language,
    form_payload
  ) values (
    trim(p_application_id),
    trim(p_applicant_name),
    lower(trim(p_applicant_email)),
    nullif(trim(coalesce(p_applicant_phone, '')), ''),
    nullif(trim(coalesce(p_property_address, '')), ''),
    coalesce(nullif(trim(coalesce(p_selected_language, '')), ''), 'en'),
    coalesce(p_form_payload, '{}'::jsonb)
  )
  on conflict (application_id) do nothing
  returning * into v_row;

  if v_row.id is null then
    select *
      into v_row
      from public.applications
     where application_id = trim(p_application_id);
  end if;

  if v_row.id is null then
    raise exception 'Could not save application';
  end if;

  return jsonb_build_object(
    'application_id', v_row.application_id,
    'access_token', v_row.access_token
  );
end;
$$;

create or replace function public.get_application_by_token(p_token uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_row public.applications%rowtype;
begin
  select *
    into v_row
    from public.applications
   where access_token = p_token;

  if v_row.id is null then
    raise exception 'Application not found';
  end if;

  return jsonb_build_object(
    'application_id', v_row.application_id,
    'applicant_name', v_row.applicant_name,
    'applicant_email', v_row.applicant_email,
    'applicant_phone', coalesce(v_row.applicant_phone, ''),
    'property_address', coalesce(v_row.property_address, ''),
    'selected_language', v_row.selected_language
  );
end;
$$;

revoke all on function public.submit_application(text, text, text, text, text, text, jsonb) from public;
revoke all on function public.get_application_by_token(uuid) from public;

grant execute on function public.submit_application(text, text, text, text, text, text, jsonb)
  to anon, authenticated;
grant execute on function public.get_application_by_token(uuid)
  to anon, authenticated;
