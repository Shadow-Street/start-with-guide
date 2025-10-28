-- =============================================
-- Create tables for Expense, Features, Feedback, Fund Management data
-- =============================================

-- 1. Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
  id TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  description TEXT,
  amount NUMERIC NOT NULL,
  expense_date DATE NOT NULL,
  added_by_admin_id TEXT,
  added_by_admin_name TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 2. Feature Configurations Table
CREATE TABLE IF NOT EXISTS public.feature_configurations (
  id TEXT PRIMARY KEY,
  feature_key TEXT NOT NULL UNIQUE,
  feature_name TEXT NOT NULL,
  description TEXT,
  module_type TEXT,
  route_path TEXT,
  icon_name TEXT,
  tier TEXT CHECK (tier IN ('basic', 'premium', 'vip')),
  status TEXT DEFAULT 'placeholder' CHECK (status IN ('placeholder', 'live', 'disabled', 'beta')),
  visibility_rule TEXT,
  release_date DATE,
  release_quarter TEXT,
  visible_to_users BOOLEAN DEFAULT false,
  page_url TEXT,
  documentation_url TEXT,
  priority TEXT,
  developer_notes TEXT,
  sort_order INTEGER,
  last_status_change_date TIMESTAMPTZ,
  changed_by_admin_id TEXT,
  changed_by_admin_name TEXT,
  reason_for_change TEXT,
  parent_module_key TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 3. Feedback Table
CREATE TABLE IF NOT EXISTS public.feedback (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  user_id TEXT,
  user_role TEXT,
  feedback_text TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  admin_notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 4. Financial Audit Log Table
CREATE TABLE IF NOT EXISTS public.financial_audit_logs (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  admin_name TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  details TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 5. Financial Influencers Table
CREATE TABLE IF NOT EXISTS public.financial_influencers (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  bio TEXT,
  specialization JSONB,
  follower_count INTEGER DEFAULT 0,
  verified BOOLEAN DEFAULT false,
  sebi_registered BOOLEAN DEFAULT false,
  success_rate NUMERIC,
  profile_image_url TEXT,
  social_links JSONB,
  subscription_price NUMERIC,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  total_revenue NUMERIC DEFAULT 0,
  commission_rate NUMERIC DEFAULT 25,
  commission_override_rate NUMERIC,
  phone_verified BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 6. Fund Admins Table
CREATE TABLE IF NOT EXISTS public.fund_admins (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT DEFAULT 'fund_manager' CHECK (role IN ('fund_manager', 'compliance_officer', 'operations')),
  permissions JSONB,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 7. Fund Allocations Table
CREATE TABLE IF NOT EXISTS public.fund_allocations (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL,
  fund_plan_id TEXT NOT NULL,
  units_held NUMERIC NOT NULL DEFAULT 0,
  average_nav NUMERIC NOT NULL,
  total_invested NUMERIC NOT NULL DEFAULT 0,
  current_value NUMERIC NOT NULL DEFAULT 0,
  profit_loss NUMERIC,
  profit_loss_percent NUMERIC,
  investment_date DATE,
  last_transaction_date TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'suspended')),
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false,
  UNIQUE(investor_id, fund_plan_id)
);

-- 8. Fund Invoices Table
CREATE TABLE IF NOT EXISTS public.fund_invoices (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL,
  transaction_id TEXT,
  invoice_number TEXT NOT NULL UNIQUE,
  invoice_type TEXT CHECK (invoice_type IN ('purchase', 'redemption', 'deposit', 'withdrawal', 'fee')),
  invoice_date DATE NOT NULL,
  gross_amount NUMERIC NOT NULL,
  tax_amount NUMERIC DEFAULT 0,
  fee_amount NUMERIC DEFAULT 0,
  net_amount NUMERIC NOT NULL,
  invoice_url TEXT,
  status TEXT DEFAULT 'generated' CHECK (status IN ('generated', 'sent', 'paid', 'cancelled')),
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 9. Fund Notifications Table
CREATE TABLE IF NOT EXISTS public.fund_notifications (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL,
  notification_type TEXT CHECK (notification_type IN ('transaction', 'alert', 'statement', 'general')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'archived')),
  related_entity_type TEXT,
  related_entity_id TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 10. Fund Payout Requests Table
CREATE TABLE IF NOT EXISTS public.fund_payout_requests (
  id TEXT PRIMARY KEY,
  fund_manager_id TEXT NOT NULL,
  fund_plan_id TEXT,
  amount NUMERIC NOT NULL,
  request_date TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paid')),
  approved_by_admin_id TEXT,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  payment_date TIMESTAMPTZ,
  payment_method TEXT,
  payment_reference TEXT,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_payout_requests ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies - Expenses
-- =============================================
CREATE POLICY "Admins can view all expenses"
  ON public.expenses FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage expenses"
  ON public.expenses FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Feature Configurations
-- =============================================
CREATE POLICY "Users can view active features"
  ON public.feature_configurations FOR SELECT
  USING (visible_to_users = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage feature configurations"
  ON public.feature_configurations FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Feedback
-- =============================================
CREATE POLICY "Users can view their feedback"
  ON public.feedback FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Anyone can create feedback"
  ON public.feedback FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update feedback"
  ON public.feedback FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Financial Audit Logs
-- =============================================
CREATE POLICY "Admins can view financial audit logs"
  ON public.financial_audit_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can create audit logs"
  ON public.financial_audit_logs FOR INSERT
  WITH CHECK (true);

-- =============================================
-- RLS Policies - Financial Influencers
-- =============================================
CREATE POLICY "Anyone can view approved influencers"
  ON public.financial_influencers FOR SELECT
  USING (status = 'approved' OR user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Influencers can manage their profile"
  ON public.financial_influencers FOR ALL
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Fund Admins
-- =============================================
CREATE POLICY "Fund admins can view their profile"
  ON public.fund_admins FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Super admins can manage fund admins"
  ON public.fund_admins FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Fund Allocations
-- =============================================
CREATE POLICY "Investors can view their allocations"
  ON public.fund_allocations FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage fund allocations"
  ON public.fund_allocations FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Fund Invoices
-- =============================================
CREATE POLICY "Investors can view their invoices"
  ON public.fund_invoices FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create invoices"
  ON public.fund_invoices FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update invoices"
  ON public.fund_invoices FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Fund Notifications
-- =============================================
CREATE POLICY "Investors can view their notifications"
  ON public.fund_notifications FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create notifications"
  ON public.fund_notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Investors can update their notifications"
  ON public.fund_notifications FOR UPDATE
  USING (investor_id = (auth.uid())::TEXT);

-- =============================================
-- RLS Policies - Fund Payout Requests
-- =============================================
CREATE POLICY "Fund managers can view their payout requests"
  ON public.fund_payout_requests FOR SELECT
  USING (fund_manager_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Fund managers can create payout requests"
  ON public.fund_payout_requests FOR INSERT
  WITH CHECK (fund_manager_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update payout requests"
  ON public.fund_payout_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- Enable Realtime
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.expenses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feature_configurations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback;
ALTER PUBLICATION supabase_realtime ADD TABLE public.financial_audit_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.financial_influencers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_admins;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_allocations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_invoices;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_payout_requests;

-- =============================================
-- Create Indexes for Performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_expenses_expense_date ON public.expenses(expense_date DESC);
CREATE INDEX IF NOT EXISTS idx_expenses_category ON public.expenses(category);
CREATE INDEX IF NOT EXISTS idx_feature_configurations_feature_key ON public.feature_configurations(feature_key);
CREATE INDEX IF NOT EXISTS idx_feature_configurations_status ON public.feature_configurations(status);
CREATE INDEX IF NOT EXISTS idx_feature_configurations_tier ON public.feature_configurations(tier);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON public.feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_audit_logs_admin_id ON public.financial_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_financial_audit_logs_created_date ON public.financial_audit_logs(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_financial_influencers_user_id ON public.financial_influencers(user_id);
CREATE INDEX IF NOT EXISTS idx_financial_influencers_status ON public.financial_influencers(status);
CREATE INDEX IF NOT EXISTS idx_fund_admins_user_id ON public.fund_admins(user_id);
CREATE INDEX IF NOT EXISTS idx_fund_allocations_investor_id ON public.fund_allocations(investor_id);
CREATE INDEX IF NOT EXISTS idx_fund_allocations_fund_plan_id ON public.fund_allocations(fund_plan_id);
CREATE INDEX IF NOT EXISTS idx_fund_invoices_investor_id ON public.fund_invoices(investor_id);
CREATE INDEX IF NOT EXISTS idx_fund_invoices_invoice_number ON public.fund_invoices(invoice_number);
CREATE INDEX IF NOT EXISTS idx_fund_notifications_investor_id ON public.fund_notifications(investor_id);
CREATE INDEX IF NOT EXISTS idx_fund_notifications_status ON public.fund_notifications(status);
CREATE INDEX IF NOT EXISTS idx_fund_payout_requests_fund_manager_id ON public.fund_payout_requests(fund_manager_id);
CREATE INDEX IF NOT EXISTS idx_fund_payout_requests_status ON public.fund_payout_requests(status);