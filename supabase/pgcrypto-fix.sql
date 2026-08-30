-- If set_owner_password fails with "function gen_salt does not exist", run this first:

create extension if not exists pgcrypto with schema extensions;

-- Then run supabase/set-owner-password.sql again.
