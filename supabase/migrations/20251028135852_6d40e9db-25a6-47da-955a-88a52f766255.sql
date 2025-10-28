-- ============================================
-- Security Fix: Restrict Public Access & Secure Audit Log
-- ============================================

-- 1. Fix Admin Audit Log INSERT Policy
-- CRITICAL: Remove public insert access to prevent fake audit entries
DROP POLICY IF EXISTS "System can insert audit logs" ON admin_audit_log;

CREATE POLICY "Only authenticated users can insert audit logs"
  ON admin_audit_log
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = admin_user_id);

-- 2. Fix Profiles Table - Require Authentication
-- Remove public access to PII (names, emails, bios, avatars)
DROP POLICY IF EXISTS "Authenticated users can view profiles" ON profiles;

CREATE POLICY "Authenticated users can view all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- 3. Fix Comments Table - Require Authentication
-- Prevent anonymous scraping of user comments and IDs
DROP POLICY IF EXISTS "Comments are viewable by everyone" ON comments;

CREATE POLICY "Authenticated users can view comments"
  ON comments
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- 4. Fix Discussions Table - Require Authentication
-- Protect user investment interests from public profiling
DROP POLICY IF EXISTS "Discussions are viewable by everyone" ON discussions;

CREATE POLICY "Authenticated users can view discussions"
  ON discussions
  FOR SELECT
  TO authenticated
  USING (auth.uid() IS NOT NULL);

-- ============================================
-- Verification: Ensure all tables have proper RLS
-- ============================================

-- Comments: Users can still create, update, delete their own
-- Profiles: Users can still update their own
-- Discussions: Users can still create, update, delete their own
-- Admin tables: Already secured with has_role() checks

-- Note: If community features require public read access in the future,
-- consider creating a dedicated "public_discussions" or "public_comments" 
-- table separate from user-generated content.