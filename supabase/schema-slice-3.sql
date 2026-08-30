-- Slice 3: owner admin + public verify
-- Run entire file in Supabase SQL Editor (empty result = success)

create table if not exists public.owner_settings (
  id int primary key default 1 check (id = 1),
  password_hash text,
  updated_at timestamptz not null default now()
);

alter table public.owner_settings enable row level security;
revoke all on table public.owner_settings from anon, authenticated, public;

create or replace function public.set_owner_password(p_password text)
returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
begin
  if coalesce(length(trim(p_password)), 0) < 8 then
    raise exception 'Password must be at least 8 characters';
  end if;

  insert into public.owner_settings (id, password_hash, updated_at)
  values (1, extensions.crypt(trim(p_password), extensions.gen_salt('bf')), now())
  on conflict (id) do update
    set password_hash = excluded.password_hash,
        updated_at = now();

  return 'set_owner_password';
end;
$$;

create or replace function public.verify_owner_password(p_password text)
returns boolean
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_hash text;
begin
  select password_hash
    into v_hash
    from public.owner_settings
   where id = 1;

  if v_hash is null then
    return false;
  end if;

  return extensions.crypt(coalesce(p_password, ''), v_hash) = v_hash;
end;
$$;

create or replace function public.get_public_receipt_status(p_receipt_number text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_proof public.payment_proofs%rowtype;
begin
  select *
    into v_proof
    from public.payment_proofs
   where receipt_number = trim(p_receipt_number);

  if v_proof.id is null then
    raise exception 'Receipt not found';
  end if;

  return jsonb_build_object(
    'receipt_number', v_proof.receipt_number,
    'status', v_proof.status
  );
end;
$$;

create or replace function public.owner_list_proofs(p_password text)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_items jsonb;
begin
  if not public.verify_owner_password(p_password) then
    raise exception 'Unauthorized';
  end if;

  select coalesce(jsonb_agg(item order by sort_pending, sort_submitted desc), '[]'::jsonb)
    into v_items
    from (
      select jsonb_build_object(
        'proof_id', pp.id,
        'receipt_number', pp.receipt_number,
        'access_token', pp.access_token,
        'status', pp.status,
        'amount_cents', pp.amount_cents,
        'amount_display', case
          when pp.amount_cents is null then null
          else to_char(pp.amount_cents / 100.0, 'FM$999,999.00')
        end,
        'screenshot_url', pp.screenshot_url,
        'submitted_at', pp.submitted_at,
        'application_id', a.application_id,
        'applicant_name', a.applicant_name,
        'applicant_email', a.applicant_email,
        'property_address', coalesce(a.property_address, '')
      ) as item,
      case when pp.status = 'pending' then 0 else 1 end as sort_pending,
      pp.submitted_at as sort_submitted
      from public.payment_proofs pp
      join public.applications a on a.id = pp.application_uuid
      order by sort_pending, sort_submitted desc
    ) q;

  return v_items;
end;
$$;

create or replace function public.owner_confirm_proof(
  p_password text,
  p_proof_id uuid,
  p_amount_cents integer default null
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_proof public.payment_proofs%rowtype;
  v_app public.applications%rowtype;
begin
  if not public.verify_owner_password(p_password) then
    raise exception 'Unauthorized';
  end if;

  select *
    into v_proof
    from public.payment_proofs
   where id = p_proof_id
   for update;

  if v_proof.id is null then
    raise exception 'Payment proof not found';
  end if;

  if v_proof.status = 'paid' then
    select * into v_app from public.applications where id = v_proof.application_uuid;
    return jsonb_build_object(
      'replay', true,
      'status', 'paid',
      'receipt_number', v_proof.receipt_number,
      'access_token', v_proof.access_token,
      'amount_cents', v_proof.amount_cents,
      'application_id', v_app.application_id,
      'applicant_email', v_app.applicant_email,
      'applicant_name', v_app.applicant_name,
      'property_address', coalesce(v_app.property_address, '')
    );
  end if;

  if v_proof.status = 'rejected' then
    raise exception 'Cannot confirm a rejected proof';
  end if;

  update public.payment_proofs
     set status = 'paid',
         confirmed_at = now(),
         amount_cents = coalesce(p_amount_cents, amount_cents),
         amount_source = case
           when p_amount_cents is not null then 'owner'
           else amount_source
         end
   where id = v_proof.id
   returning * into v_proof;

  select * into v_app from public.applications where id = v_proof.application_uuid;

  return jsonb_build_object(
    'replay', false,
    'status', 'paid',
    'receipt_number', v_proof.receipt_number,
    'access_token', v_proof.access_token,
    'amount_cents', v_proof.amount_cents,
    'amount_display', case
      when v_proof.amount_cents is null then null
      else to_char(v_proof.amount_cents / 100.0, 'FM$999,999.00')
    end,
    'application_id', v_app.application_id,
    'applicant_email', v_app.applicant_email,
    'applicant_name', v_app.applicant_name,
    'property_address', coalesce(v_app.property_address, '')
  );
end;
$$;

create or replace function public.owner_reject_proof(
  p_password text,
  p_proof_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_proof public.payment_proofs%rowtype;
begin
  if not public.verify_owner_password(p_password) then
    raise exception 'Unauthorized';
  end if;

  select *
    into v_proof
    from public.payment_proofs
   where id = p_proof_id
   for update;

  if v_proof.id is null then
    raise exception 'Payment proof not found';
  end if;

  if v_proof.status = 'paid' then
    raise exception 'Cannot reject a paid proof';
  end if;

  if v_proof.status = 'rejected' then
    return jsonb_build_object(
      'replay', true,
      'status', 'rejected',
      'receipt_number', v_proof.receipt_number
    );
  end if;

  update public.payment_proofs
     set status = 'rejected',
         rejected_at = now()
   where id = v_proof.id
   returning * into v_proof;

  return jsonb_build_object(
    'replay', false,
    'status', 'rejected',
    'receipt_number', v_proof.receipt_number
  );
end;
$$;

revoke all on function public.set_owner_password(text) from public;
revoke all on function public.verify_owner_password(text) from public;
revoke all on function public.get_public_receipt_status(text) from public;
revoke all on function public.owner_list_proofs(text) from public;
revoke all on function public.owner_confirm_proof(text, uuid, integer) from public;
revoke all on function public.owner_reject_proof(text, uuid) from public;

grant execute on function public.get_public_receipt_status(text) to anon, authenticated;
grant execute on function public.owner_list_proofs(text) to anon, authenticated;
grant execute on function public.owner_confirm_proof(text, uuid, integer) to anon, authenticated;
grant execute on function public.owner_reject_proof(text, uuid) to anon, authenticated;

-- set_owner_password and verify_owner_password are NOT granted to anon.
