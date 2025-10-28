-- =============================================
-- Create tables for Promo Codes, Referrals, Reviews, Roles, and Revenue
-- =============================================

-- 1. Promo Codes Table
CREATE TABLE IF NOT EXISTS public.promo_codes (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  discount_type TEXT CHECK (discount_type IN ('flat', 'percentage')),
  discount_value NUMERIC NOT NULL,
  expiry_date DATE,
  usage_limit INTEGER,
  current_usage INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 2. Referrals Table
CREATE TABLE IF NOT EXISTS public.referrals (
  id TEXT PRIMARY KEY,
  inviter_id TEXT NOT NULL,
  invitee_id TEXT,
  referral_code TEXT NOT NULL UNIQUE,
  invitee_email TEXT,
  signup_completed BOOLEAN DEFAULT false,
  kyc_completed BOOLEAN DEFAULT false,
  is_active_member BOOLEAN DEFAULT false,
  reward_claimed BOOLEAN DEFAULT false,
  signup_date TIMESTAMPTZ,
  verification_date TIMESTAMPTZ,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 3. Referral Badges Table
CREATE TABLE IF NOT EXISTS public.referral_badges (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_type TEXT CHECK (badge_type IN ('bronze', 'silver', 'gold', 'platinum', 'special')),
  description TEXT,
  criteria TEXT,
  referrals_required INTEGER,
  icon_url TEXT,
  earned_at TIMESTAMPTZ DEFAULT now(),
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 4. Refund Requests Table
CREATE TABLE IF NOT EXISTS public.refund_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  entity_type TEXT CHECK (entity_type IN ('subscription', 'course', 'event', 'pledge')),
  entity_id TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processed')),
  admin_notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  processed_at TIMESTAMPTZ,
  refund_method TEXT,
  transaction_reference TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 5. Revenue Transactions Table
CREATE TABLE IF NOT EXISTS public.revenue_transactions (
  id TEXT PRIMARY KEY,
  enrollment_id TEXT,
  influencer_id TEXT,
  course_id TEXT,
  user_id TEXT NOT NULL,
  gross_amount NUMERIC NOT NULL,
  platform_commission NUMERIC NOT NULL,
  influencer_payout NUMERIC NOT NULL,
  commission_rate NUMERIC NOT NULL,
  transaction_type TEXT CHECK (transaction_type IN ('course_purchase', 'event_purchase', 'subscription', 'advisor_subscription', 'ad_payment')),
  payout_status TEXT DEFAULT 'pending' CHECK (payout_status IN ('pending', 'approved', 'processed', 'cancelled')),
  payout_date TIMESTAMPTZ,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 6. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  username TEXT,
  profile_url TEXT,
  review_text TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_public BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  social_platform TEXT,
  social_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  admin_notes TEXT,
  rejection_reason TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 7. Roles Table
CREATE TABLE IF NOT EXISTS public.roles (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_system_role BOOLEAN DEFAULT false,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 8. Role Permissions Table
CREATE TABLE IF NOT EXISTS public.role_permissions (
  id TEXT PRIMARY KEY,
  role_id TEXT NOT NULL,
  permission_id TEXT NOT NULL,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false,
  UNIQUE(role_id, permission_id)
);

-- 9. Role Templates Table
CREATE TABLE IF NOT EXISTS public.role_templates (
  id TEXT PRIMARY KEY,
  template_name TEXT NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 10. Role Template Permissions Table
CREATE TABLE IF NOT EXISTS public.role_template_permissions (
  id TEXT PRIMARY KEY,
  template_id TEXT NOT NULL,
  permission_id TEXT NOT NULL,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false,
  UNIQUE(template_id, permission_id)
);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_template_permissions ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies - Promo Codes
-- =============================================
CREATE POLICY "Anyone can view active promo codes"
  ON public.promo_codes FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage promo codes"
  ON public.promo_codes FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Referrals
-- =============================================
CREATE POLICY "Users can view their referrals"
  ON public.referrals FOR SELECT
  USING (inviter_id = (auth.uid())::TEXT OR invitee_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create referrals"
  ON public.referrals FOR INSERT
  WITH CHECK (inviter_id = (auth.uid())::TEXT);

CREATE POLICY "Users can update their referrals"
  ON public.referrals FOR UPDATE
  USING (inviter_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS Policies - Referral Badges
-- =============================================
CREATE POLICY "Users can view their badges"
  ON public.referral_badges FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create badges"
  ON public.referral_badges FOR INSERT
  WITH CHECK (true);

-- =============================================
-- RLS Policies - Refund Requests
-- =============================================
CREATE POLICY "Users can view their refund requests"
  ON public.refund_requests FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create refund requests"
  ON public.refund_requests FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update refund requests"
  ON public.refund_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Revenue Transactions
-- =============================================
CREATE POLICY "Admins can view revenue transactions"
  ON public.revenue_transactions FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can create revenue transactions"
  ON public.revenue_transactions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update revenue transactions"
  ON public.revenue_transactions FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Reviews
-- =============================================
CREATE POLICY "Anyone can view approved public reviews"
  ON public.reviews FOR SELECT
  USING (status = 'approved' AND is_public = true OR user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update reviews"
  ON public.reviews FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Roles
-- =============================================
CREATE POLICY "Anyone can view roles"
  ON public.roles FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage roles"
  ON public.roles FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Role Permissions
-- =============================================
CREATE POLICY "Anyone can view role permissions"
  ON public.role_permissions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage role permissions"
  ON public.role_permissions FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Role Templates
-- =============================================
CREATE POLICY "Anyone can view active role templates"
  ON public.role_templates FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage role templates"
  ON public.role_templates FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Role Template Permissions
-- =============================================
CREATE POLICY "Anyone can view template permissions"
  ON public.role_template_permissions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage template permissions"
  ON public.role_template_permissions FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- Enable Realtime
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.promo_codes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.referrals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.referral_badges;
ALTER PUBLICATION supabase_realtime ADD TABLE public.refund_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.revenue_transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reviews;
ALTER PUBLICATION supabase_realtime ADD TABLE public.roles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.role_permissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.role_templates;
ALTER PUBLICATION supabase_realtime ADD TABLE public.role_template_permissions;

-- =============================================
-- Create Indexes for Performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_promo_codes_code ON public.promo_codes(code);
CREATE INDEX IF NOT EXISTS idx_promo_codes_is_active ON public.promo_codes(is_active);
CREATE INDEX IF NOT EXISTS idx_referrals_inviter_id ON public.referrals(inviter_id);
CREATE INDEX IF NOT EXISTS idx_referrals_invitee_id ON public.referrals(invitee_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referral_code ON public.referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referral_badges_user_id ON public.referral_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_refund_requests_user_id ON public.refund_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_refund_requests_status ON public.refund_requests(status);
CREATE INDEX IF NOT EXISTS idx_refund_requests_entity_type ON public.refund_requests(entity_type);
CREATE INDEX IF NOT EXISTS idx_revenue_transactions_user_id ON public.revenue_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_revenue_transactions_influencer_id ON public.revenue_transactions(influencer_id);
CREATE INDEX IF NOT EXISTS idx_revenue_transactions_transaction_type ON public.revenue_transactions(transaction_type);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_is_featured ON public.reviews(is_featured);
CREATE INDEX IF NOT EXISTS idx_roles_name ON public.roles(name);
CREATE INDEX IF NOT EXISTS idx_role_permissions_role_id ON public.role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission_id ON public.role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_role_templates_template_name ON public.role_templates(template_name);
CREATE INDEX IF NOT EXISTS idx_role_template_permissions_template_id ON public.role_template_permissions(template_id);
CREATE INDEX IF NOT EXISTS idx_role_template_permissions_permission_id ON public.role_template_permissions(permission_id);