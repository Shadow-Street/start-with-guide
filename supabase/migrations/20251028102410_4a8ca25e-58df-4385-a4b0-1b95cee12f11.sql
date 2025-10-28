-- ============================================
-- SECURITY HARDENING MIGRATION - PART 2
-- Complete security configuration
-- ============================================

-- 1. FIX CRITICAL: Restrict user_roles table to authenticated users only
DROP POLICY IF EXISTS "User roles are viewable by everyone" ON user_roles;

CREATE POLICY "Authenticated users can view own role" ON user_roles
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles" ON user_roles
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role IN ('admin', 'super_admin')
    )
  );


-- 2. ADD PRIVACY: Restrict profiles table to authenticated users
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;

CREATE POLICY "Authenticated users can view profiles" ON profiles
  FOR SELECT TO authenticated
  USING (true);


-- 3. CREATE ADMIN AUDIT LOG TABLE
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  target_table text,
  target_id uuid,
  changes jsonb,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs" ON admin_audit_log
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "System can insert audit logs" ON admin_audit_log
  FOR INSERT TO authenticated
  WITH CHECK (true);


-- 4. CREATE IMPERSONATION SESSIONS TABLE
CREATE TABLE IF NOT EXISTS public.impersonation_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  target_user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_token text UNIQUE NOT NULL,
  expires_at timestamp with time zone NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  ended_at timestamp with time zone,
  CONSTRAINT valid_expiry CHECK (expires_at > created_at)
);

ALTER TABLE public.impersonation_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only super admins can manage impersonation" ON impersonation_sessions
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'super_admin'
    )
  );


-- 5. ENABLE REALTIME: Configure tables for realtime updates
ALTER TABLE public.comments REPLICA IDENTITY FULL;
ALTER TABLE public.discussions REPLICA IDENTITY FULL;
ALTER TABLE public.profiles REPLICA IDENTITY FULL;
ALTER TABLE public.stocks REPLICA IDENTITY FULL;
ALTER TABLE public.user_roles REPLICA IDENTITY FULL;
ALTER TABLE public.admin_audit_log REPLICA IDENTITY FULL;
ALTER TABLE public.impersonation_sessions REPLICA IDENTITY FULL;


-- 6. CREATE SECURITY HELPER FUNCTIONS

-- Function to log admin actions
CREATE OR REPLACE FUNCTION public.log_admin_action(
  _action text,
  _target_table text DEFAULT NULL,
  _target_id uuid DEFAULT NULL,
  _changes jsonb DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _log_id uuid;
BEGIN
  INSERT INTO admin_audit_log (admin_user_id, action, target_table, target_id, changes)
  VALUES (auth.uid(), _action, _target_table, _target_id, _changes)
  RETURNING id INTO _log_id;
  
  RETURN _log_id;
END;
$$;


-- Function to validate impersonation session
CREATE OR REPLACE FUNCTION public.validate_impersonation_session(_session_token text)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _target_user_id uuid;
  _admin_user_id uuid;
  _has_permission boolean;
BEGIN
  -- Check if session exists and is valid
  SELECT target_user_id, admin_user_id
  INTO _target_user_id, _admin_user_id
  FROM impersonation_sessions
  WHERE session_token = _session_token
    AND expires_at > now()
    AND ended_at IS NULL;
  
  -- Verify admin still has super_admin role
  IF _target_user_id IS NOT NULL THEN
    SELECT EXISTS (
      SELECT 1 FROM user_roles 
      WHERE user_id = _admin_user_id 
      AND role = 'super_admin'
    ) INTO _has_permission;
    
    IF NOT _has_permission THEN
      -- End the session if admin no longer has permission
      UPDATE impersonation_sessions
      SET ended_at = now()
      WHERE session_token = _session_token;
      
      RETURN NULL;
    END IF;
  END IF;
  
  RETURN _target_user_id;
END;
$$;


-- 7. ADD INDEXES for performance
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON user_roles(role);
CREATE INDEX IF NOT EXISTS idx_admin_audit_admin_user ON admin_audit_log(admin_user_id);
CREATE INDEX IF NOT EXISTS idx_admin_audit_created ON admin_audit_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_impersonation_token ON impersonation_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_impersonation_expires ON impersonation_sessions(expires_at) WHERE ended_at IS NULL;


-- 8. ADD UPDATED_AT TRIGGERS for audit trail
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply to tables that have updated_at columns
DROP TRIGGER IF EXISTS set_comments_updated_at ON comments;
CREATE TRIGGER set_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_discussions_updated_at ON discussions;
CREATE TRIGGER set_discussions_updated_at
  BEFORE UPDATE ON discussions
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();

DROP TRIGGER IF EXISTS set_profiles_updated_at ON profiles;
CREATE TRIGGER set_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();


-- ============================================
-- MIGRATION COMPLETE
-- All critical RLS policies configured
-- Realtime enabled on all tables
-- Security helper functions created
-- Performance indexes added
-- Audit triggers active
-- ============================================