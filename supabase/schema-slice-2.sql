-- Slice 2: payment_proofs + submit / receipt lookup
-- Run entire file in Supabase SQL Editor (empty result = success)

create table if not exists public.payment_proofs (
  id uuid primary key default gen_random_uuid(),
  application_uuid uuid not null references public.applications(id) on delete cascade,
  receipt_number text not null unique,
  access_token uuid not null unique default gen_random_uuid(),
  status text not null default 'pending'
    check (status in ('pending', 'paid', 'rejected')),
  screenshot_url text not null,
  cloudinary_public_id text,
  amount_cents integer check (amount_cents is null or amount_cents >= 0),
  amount_detected_cents integer check (amount_detected_cents is null or amount_detected_cents >= 0),
  amount_source text not null default 'unknown'
    check (amount_source in ('ocr', 'owner', 'unknown')),
  ocr_detected_amounts jsonb not null default '[]'::jsonb,
  submitted_at timestamptz not null default now(),
  confirmed_at timestamptz,
  rejected_at timestamptz
);

create index if not exists payment_proofs_application_uuid_idx
  on public.payment_proofs (application_uuid);

create unique index if not exists payment_proofs_one_active_per_application
  on public.payment_proofs (application_uuid)
  where status in ('pending', 'paid');

alter table public.payment_proofs enable row level security;

revoke all on table public.payment_proofs from anon, authenticated, public;

create or replace function public.generate_receipt_number()
returns text
language plpgsql
volatile
set search_path = public
as $$
declare
  v_date text;
  v_candidate text;
  v_attempt int := 0;
begin
  v_date := to_char(timezone('utc', now()), 'YYYYMMDD');

  loop
    v_attempt := v_attempt + 1;
    v_candidate := 'PMG-' || v_date || '-' || lpad(floor(random() * 1000000)::text, 6, '0');
    exit when not exists (
      select 1 from public.payment_proofs where receipt_number = v_candidate
    );
    if v_attempt > 25 then
      raise exception 'Could not generate unique receipt number';
    end if;
  end loop;

  return v_candidate;
end;
$$;

create or replace function public.submit_payment_proof(
  p_token uuid,
  p_screenshot_url text,
  p_cloudinary_public_id text default null,
  p_amount_cents integer default null,
  p_amount_detected_cents integer default null,
  p_amount_source text default 'unknown',
  p_ocr_detected_amounts jsonb default '[]'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_app public.applications%rowtype;
  v_existing public.payment_proofs%rowtype;
  v_row public.payment_proofs%rowtype;
  v_source text;
begin
  if p_token is null then
    raise exception 'token is required';
  end if;
  if coalesce(trim(p_screenshot_url), '') = '' then
    raise exception 'screenshot_url is required';
  end if;

  select *
    into v_app
    from public.applications
   where access_token = p_token;

  if v_app.id is null then
    raise exception 'Application not found';
  end if;

  select *
    into v_existing
    from public.payment_proofs
   where application_uuid = v_app.id
     and status in ('pending', 'paid')
   order by submitted_at desc
   limit 1;

  if v_existing.id is not null then
    return jsonb_build_object(
      'replay', true,
      'receipt_number', v_existing.receipt_number,
      'access_token', v_existing.access_token,
      'status', v_existing.status,
      'amount_cents', v_existing.amount_cents,
      'amount_display', case
        when v_existing.amount_cents is null then null
        else to_char(v_existing.amount_cents / 100.0, 'FM$999,999.00')
      end
    );
  end if;

  v_source := coalesce(nullif(trim(coalesce(p_amount_source, '')), ''), 'unknown');
  if v_source not in ('ocr', 'owner', 'unknown') then
    v_source := 'unknown';
  end if;

  insert into public.payment_proofs (
    application_uuid,
    receipt_number,
    screenshot_url,
    cloudinary_public_id,
    amount_cents,
    amount_detected_cents,
    amount_source,
    ocr_detected_amounts
  ) values (
    v_app.id,
    public.generate_receipt_number(),
    trim(p_screenshot_url),
    nullif(trim(coalesce(p_cloudinary_public_id, '')), ''),
    p_amount_cents,
    p_amount_detected_cents,
    v_source,
    coalesce(p_ocr_detected_amounts, '[]'::jsonb)
  )
  returning * into v_row;

  return jsonb_build_object(
    'replay', false,
    'receipt_number', v_row.receipt_number,
    'access_token', v_row.access_token,
    'status', v_row.status,
    'amount_cents', v_row.amount_cents,
    'amount_display', case
      when v_row.amount_cents is null then null
      else to_char(v_row.amount_cents / 100.0, 'FM$999,999.00')
    end
  );
end;
$$;

create or replace function public.get_receipt_by_token(p_token uuid)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_proof public.payment_proofs%rowtype;
  v_app public.applications%rowtype;
begin
  select *
    into v_proof
    from public.payment_proofs
   where access_token = p_token;

  if v_proof.id is null then
    raise exception 'Receipt not found';
  end if;

  select *
    into v_app
    from public.applications
   where id = v_proof.application_uuid;

  return jsonb_build_object(
    'receipt_number', v_proof.receipt_number,
    'status', v_proof.status,
    'amount_cents', v_proof.amount_cents,
    'amount_display', case
      when v_proof.amount_cents is null then null
      else to_char(v_proof.amount_cents / 100.0, 'FM$999,999.00')
    end,
    'submitted_at', v_proof.submitted_at,
    'confirmed_at', v_proof.confirmed_at,
    'application_id', v_app.application_id,
    'applicant_name', v_app.applicant_name,
    'property_address', coalesce(v_app.property_address, ''),
    'screenshot_url', v_proof.screenshot_url
  );
end;
$$;

revoke all on function public.generate_receipt_number() from public;
revoke all on function public.submit_payment_proof(uuid, text, text, integer, integer, text, jsonb) from public;
revoke all on function public.get_receipt_by_token(uuid) from public;

grant execute on function public.submit_payment_proof(uuid, text, text, integer, integer, text, jsonb)
  to anon, authenticated;
grant execute on function public.get_receipt_by_token(uuid)
  to anon, authenticated;
