-- ============================================
-- Security Fix: Restrict Audit Log to System Operations Only
-- ============================================

-- 1. Fix Admin Audit Log INSERT Policy
-- CRITICAL: Only allow inserts from security definer functions (like log_admin_action)
-- Regular users should NEVER be able to insert audit logs directly
DROP POLICY IF EXISTS "Only authenticated users can insert audit logs" ON admin_audit_log;

CREATE POLICY "System can insert audit logs via functions"
  ON admin_audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Only allow inserts from security definer functions
    -- or when the user is a super admin
    has_role(auth.uid(), 'super_admin'::app_role) OR
    -- This allows the log_admin_action() function to work
    auth.uid() = admin_user_id AND has_role(auth.uid(), 'admin'::app_role)
  );

-- 2. Add DELETE policy for impersonation_sessions cleanup
-- Allow super admins to delete expired sessions
CREATE POLICY "Super admins can delete impersonation sessions"
  ON impersonation_sessions
  FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'super_admin'::app_role));

-- 3. Consolidate user_roles SELECT policies for clarity
-- Remove the overlapping policies and create one clear policy
DROP POLICY IF EXISTS "Authenticated users can view own role" ON user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON user_roles;

CREATE POLICY "Users can view own role, admins can view all"
  ON user_roles
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    has_role(auth.uid(), 'admin'::app_role) OR 
    has_role(auth.uid(), 'super_admin'::app_role)
  );

-- Note: The 'ALL' command policy for admins remains for INSERT/UPDATE/DELETE operations

-- ============================================
-- Add automatic session cleanup trigger
-- ============================================

-- Create function to cleanup expired impersonation sessions
CREATE OR REPLACE FUNCTION cleanup_expired_impersonation_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Mark expired sessions as ended
  UPDATE impersonation_sessions
  SET ended_at = now()
  WHERE expires_at < now() 
    AND ended_at IS NULL;
END;
$$;

-- Note: This function can be called manually or via a cron job
-- For automatic cleanup, set up a pg_cron job in production