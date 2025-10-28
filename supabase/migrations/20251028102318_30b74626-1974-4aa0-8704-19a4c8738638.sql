-- ============================================
-- SECURITY HARDENING MIGRATION - PART 1
-- Add super_admin enum value separately
-- ============================================

-- Add super_admin role to enum if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'super_admin' AND enumtypid = 'app_role'::regtype) THEN
    ALTER TYPE app_role ADD VALUE 'super_admin';
  END IF;
END $$;