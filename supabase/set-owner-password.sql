-- Run ONCE in Supabase SQL Editor after schema-slice-3.sql
-- Replace YourSecurePassword123 with your chosen admin password (8+ chars).
-- Success shows: set_owner_password

select public.set_owner_password('YourSecurePassword123');
