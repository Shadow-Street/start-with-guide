-- =============================================
-- Create tables for Fund Management, Influencer Posts, and Investment data
-- =============================================

-- 1. Fund Plans Table
CREATE TABLE IF NOT EXISTS public.fund_plans (
  id TEXT PRIMARY KEY,
  plan_name TEXT NOT NULL,
  plan_code TEXT UNIQUE,
  description TEXT,
  fund_type TEXT CHECK (fund_type IN ('equity', 'debt', 'hybrid', 'other')),
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high')),
  profit_payout_frequency TEXT CHECK (profit_payout_frequency IN ('monthly', 'quarterly', 'yearly')),
  auto_payout_enabled BOOLEAN DEFAULT false,
  last_auto_payout_month TEXT,
  investment_period TEXT,
  expected_return_percent NUMERIC,
  notice_period_days INTEGER DEFAULT 30,
  minimum_investment NUMERIC,
  maximum_investment NUMERIC,
  lock_in_period_days INTEGER DEFAULT 0,
  management_fee_percent NUMERIC DEFAULT 0,
  entry_load_percent NUMERIC DEFAULT 0,
  exit_load_percent NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  total_aum NUMERIC DEFAULT 0,
  total_investors INTEGER DEFAULT 0,
  nav NUMERIC DEFAULT 10,
  nav_date DATE,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 2. Fund Transactions Table
CREATE TABLE IF NOT EXISTS public.fund_transactions (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL,
  fund_plan_id TEXT,
  allocation_id TEXT,
  transaction_type TEXT CHECK (transaction_type IN ('purchase', 'redemption', 'wallet_deposit', 'wallet_withdrawal', 'profit_payout')),
  amount NUMERIC NOT NULL,
  units NUMERIC,
  nav NUMERIC,
  payment_method TEXT,
  payment_reference TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  transaction_date TIMESTAMPTZ DEFAULT now(),
  settlement_date DATE,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 3. Fund Wallets Table
CREATE TABLE IF NOT EXISTS public.fund_wallets (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL UNIQUE,
  available_balance NUMERIC DEFAULT 0,
  locked_balance NUMERIC DEFAULT 0,
  total_deposited NUMERIC DEFAULT 0,
  total_withdrawn NUMERIC DEFAULT 0,
  last_transaction_date TIMESTAMPTZ,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 4. Fund Withdrawal Requests Table
CREATE TABLE IF NOT EXISTS public.fund_withdrawal_requests (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL,
  fund_plan_id TEXT,
  allocation_id TEXT,
  requested_amount NUMERIC NOT NULL,
  units_to_redeem NUMERIC,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processed', 'cancelled')),
  approved_by_admin_id TEXT,
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  processed_at TIMESTAMPTZ,
  transaction_id TEXT,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 5. Influencer Posts Table
CREATE TABLE IF NOT EXISTS public.influencer_posts (
  id TEXT PRIMARY KEY,
  influencer_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  post_type TEXT CHECK (post_type IN ('video', 'article', 'market_analysis', 'educational', 'recommendation', 'news')),
  video_url TEXT,
  thumbnail_url TEXT,
  duration TEXT,
  stock_mentions JSONB,
  tags JSONB,
  is_premium BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'rejected', 'archived')),
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 6. Investment Allocations Table
CREATE TABLE IF NOT EXISTS public.investment_allocations (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL,
  fund_plan_id TEXT NOT NULL,
  allocation_amount NUMERIC NOT NULL,
  allocation_date TIMESTAMPTZ DEFAULT now(),
  nav_at_allocation NUMERIC NOT NULL,
  units_allocated NUMERIC NOT NULL,
  current_value NUMERIC,
  profit_earned NUMERIC DEFAULT 0,
  last_profit_payout_date TIMESTAMPTZ,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'redeemed', 'partially_redeemed', 'cancelled')),
  days_held INTEGER,
  investment_request_id TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 7. Investment Requests Table
CREATE TABLE IF NOT EXISTS public.investment_requests (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL,
  fund_plan_id TEXT NOT NULL,
  requested_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'executed', 'cancelled')),
  payment_method TEXT,
  executed_by TEXT,
  executed_at TIMESTAMPTZ,
  allocation_id TEXT,
  cancellation_reason TEXT,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 8. Investors Table
CREATE TABLE IF NOT EXISTS public.investors (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  investor_code TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT,
  pan_number TEXT,
  pan_document_url TEXT,
  bank_account_number TEXT,
  bank_ifsc_code TEXT,
  bank_name TEXT,
  upi_id TEXT,
  profit_distribution_plan TEXT,
  kyc_status TEXT DEFAULT 'pending' CHECK (kyc_status IN ('pending', 'verified', 'rejected', 'expired')),
  kyc_rejection_reason TEXT,
  risk_profile TEXT CHECK (risk_profile IN ('conservative', 'moderate', 'aggressive')),
  total_invested NUMERIC DEFAULT 0,
  current_value NUMERIC DEFAULT 0,
  total_profit_loss NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'closed')),
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 9. Investor Profit Payouts Table
CREATE TABLE IF NOT EXISTS public.investor_profit_payouts (
  id TEXT PRIMARY KEY,
  investor_id TEXT NOT NULL,
  fund_plan_id TEXT NOT NULL,
  allocation_id TEXT,
  payout_amount NUMERIC NOT NULL,
  payout_date TIMESTAMPTZ DEFAULT now(),
  payout_period_start DATE,
  payout_period_end DATE,
  profit_rate NUMERIC,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processed', 'failed', 'reversed')),
  transaction_id TEXT,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 10. Investor Requests Table
CREATE TABLE IF NOT EXISTS public.investor_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT,
  pan_number TEXT,
  pan_document_url TEXT,
  bank_account_number TEXT,
  bank_ifsc_code TEXT,
  bank_name TEXT,
  annual_income_range TEXT,
  investment_experience TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  rejection_reason TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE public.fund_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fund_withdrawal_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_allocations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_profit_payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investor_requests ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies - Fund Plans
-- =============================================
CREATE POLICY "Anyone can view active fund plans"
  ON public.fund_plans FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage fund plans"
  ON public.fund_plans FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Fund Transactions
-- =============================================
CREATE POLICY "Investors can view their transactions"
  ON public.fund_transactions FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create transactions"
  ON public.fund_transactions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update transactions"
  ON public.fund_transactions FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Fund Wallets
-- =============================================
CREATE POLICY "Investors can view their wallet"
  ON public.fund_wallets FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can manage wallets"
  ON public.fund_wallets FOR ALL
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Fund Withdrawal Requests
-- =============================================
CREATE POLICY "Investors can view their withdrawal requests"
  ON public.fund_withdrawal_requests FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Investors can create withdrawal requests"
  ON public.fund_withdrawal_requests FOR INSERT
  WITH CHECK (investor_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update withdrawal requests"
  ON public.fund_withdrawal_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Influencer Posts
-- =============================================
CREATE POLICY "Anyone can view approved posts"
  ON public.influencer_posts FOR SELECT
  USING (status = 'approved' OR influencer_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Influencers can manage their posts"
  ON public.influencer_posts FOR ALL
  USING (influencer_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Investment Allocations
-- =============================================
CREATE POLICY "Investors can view their allocations"
  ON public.investment_allocations FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage allocations"
  ON public.investment_allocations FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Investment Requests
-- =============================================
CREATE POLICY "Investors can view their requests"
  ON public.investment_requests FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Investors can create requests"
  ON public.investment_requests FOR INSERT
  WITH CHECK (investor_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update requests"
  ON public.investment_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Investors
-- =============================================
CREATE POLICY "Investors can view their profile"
  ON public.investors FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage investors"
  ON public.investors FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Investor Profit Payouts
-- =============================================
CREATE POLICY "Investors can view their payouts"
  ON public.investor_profit_payouts FOR SELECT
  USING (investor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create payouts"
  ON public.investor_profit_payouts FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update payouts"
  ON public.investor_profit_payouts FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Investor Requests
-- =============================================
CREATE POLICY "Users can view their investor requests"
  ON public.investor_requests FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create investor requests"
  ON public.investor_requests FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update investor requests"
  ON public.investor_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- Enable Realtime
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_plans;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_wallets;
ALTER PUBLICATION supabase_realtime ADD TABLE public.fund_withdrawal_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.influencer_posts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.investment_allocations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.investment_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.investors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.investor_profit_payouts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.investor_requests;

-- =============================================
-- Create Indexes for Performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_fund_plans_plan_code ON public.fund_plans(plan_code);
CREATE INDEX IF NOT EXISTS idx_fund_plans_is_active ON public.fund_plans(is_active);
CREATE INDEX IF NOT EXISTS idx_fund_transactions_investor_id ON public.fund_transactions(investor_id);
CREATE INDEX IF NOT EXISTS idx_fund_transactions_fund_plan_id ON public.fund_transactions(fund_plan_id);
CREATE INDEX IF NOT EXISTS idx_fund_transactions_status ON public.fund_transactions(status);
CREATE INDEX IF NOT EXISTS idx_fund_transactions_transaction_date ON public.fund_transactions(transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_fund_wallets_investor_id ON public.fund_wallets(investor_id);
CREATE INDEX IF NOT EXISTS idx_fund_withdrawal_requests_investor_id ON public.fund_withdrawal_requests(investor_id);
CREATE INDEX IF NOT EXISTS idx_fund_withdrawal_requests_status ON public.fund_withdrawal_requests(status);
CREATE INDEX IF NOT EXISTS idx_influencer_posts_influencer_id ON public.influencer_posts(influencer_id);
CREATE INDEX IF NOT EXISTS idx_influencer_posts_status ON public.influencer_posts(status);
CREATE INDEX IF NOT EXISTS idx_influencer_posts_post_type ON public.influencer_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_investment_allocations_investor_id ON public.investment_allocations(investor_id);
CREATE INDEX IF NOT EXISTS idx_investment_allocations_fund_plan_id ON public.investment_allocations(fund_plan_id);
CREATE INDEX IF NOT EXISTS idx_investment_allocations_status ON public.investment_allocations(status);
CREATE INDEX IF NOT EXISTS idx_investment_requests_investor_id ON public.investment_requests(investor_id);
CREATE INDEX IF NOT EXISTS idx_investment_requests_fund_plan_id ON public.investment_requests(fund_plan_id);
CREATE INDEX IF NOT EXISTS idx_investment_requests_status ON public.investment_requests(status);
CREATE INDEX IF NOT EXISTS idx_investors_user_id ON public.investors(user_id);
CREATE INDEX IF NOT EXISTS idx_investors_investor_code ON public.investors(investor_code);
CREATE INDEX IF NOT EXISTS idx_investors_kyc_status ON public.investors(kyc_status);
CREATE INDEX IF NOT EXISTS idx_investor_profit_payouts_investor_id ON public.investor_profit_payouts(investor_id);
CREATE INDEX IF NOT EXISTS idx_investor_profit_payouts_fund_plan_id ON public.investor_profit_payouts(fund_plan_id);
CREATE INDEX IF NOT EXISTS idx_investor_requests_user_id ON public.investor_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_investor_requests_status ON public.investor_requests(status);