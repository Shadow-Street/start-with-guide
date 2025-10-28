-- =============================================
-- Create tables for Pledges, Polls, and Audit data
-- =============================================

-- 1. Pledges Table
CREATE TABLE IF NOT EXISTS public.pledges (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  demat_account_id TEXT NOT NULL,
  stock_symbol TEXT NOT NULL,
  qty INTEGER NOT NULL,
  price_target NUMERIC,
  side TEXT CHECK (side IN ('buy', 'sell')),
  consent_hash TEXT,
  risk_acknowledgment BOOLEAN DEFAULT false,
  digital_consent BOOLEAN DEFAULT false,
  trading_limits_validated BOOLEAN DEFAULT false,
  convenience_fee_paid BOOLEAN DEFAULT false,
  convenience_fee_amount NUMERIC,
  convenience_fee_payment_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'executed', 'cancelled', 'failed')),
  execution_notes TEXT,
  admin_notes TEXT,
  expected_execution_at TIMESTAMPTZ,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 2. Pledge Access Requests Table
CREATE TABLE IF NOT EXISTS public.pledge_access_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT,
  user_email TEXT,
  demat_account_id TEXT NOT NULL,
  broker TEXT,
  consent_given BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  request_reason TEXT,
  trading_experience TEXT,
  annual_income_range TEXT,
  admin_notes TEXT,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT,
  approval_conditions TEXT,
  risk_score INTEGER,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 3. Pledge Audit Logs Table
CREATE TABLE IF NOT EXISTS public.pledge_audit_logs (
  id TEXT PRIMARY KEY,
  actor_id TEXT NOT NULL,
  actor_role TEXT,
  action TEXT NOT NULL,
  target_type TEXT,
  target_pledge_id TEXT,
  target_session_id TEXT,
  payload_json JSONB,
  ip_address TEXT,
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 4. Pledge Execution Records Table
CREATE TABLE IF NOT EXISTS public.pledge_execution_records (
  id TEXT PRIMARY KEY,
  pledge_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  demat_account_id TEXT NOT NULL,
  stock_symbol TEXT NOT NULL,
  side TEXT CHECK (side IN ('buy', 'sell')),
  pledged_qty INTEGER NOT NULL,
  executed_qty INTEGER,
  executed_price NUMERIC,
  total_execution_value NUMERIC,
  broker_order_id TEXT,
  platform_commission NUMERIC DEFAULT 0,
  commission_rate NUMERIC,
  broker_commission NUMERIC DEFAULT 0,
  net_amount NUMERIC,
  raw_broker_response JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'partial')),
  execution_batch_id TEXT,
  executed_at TIMESTAMPTZ,
  settlement_date DATE,
  error_message TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 5. Pledge Orders Table
CREATE TABLE IF NOT EXISTS public.pledge_orders (
  id TEXT PRIMARY KEY,
  pledge_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  stock_symbol TEXT NOT NULL,
  order_type TEXT CHECK (order_type IN ('market', 'limit', 'stop_loss')),
  qty INTEGER NOT NULL,
  price NUMERIC,
  side TEXT CHECK (side IN ('buy', 'sell')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'placed', 'executed', 'cancelled', 'failed')),
  broker_order_id TEXT,
  placed_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 6. Pledge Payments Table
CREATE TABLE IF NOT EXISTS public.pledge_payments (
  id TEXT PRIMARY KEY,
  pledge_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'INR',
  payment_provider TEXT,
  payment_ref TEXT,
  payment_method TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  gateway_response JSONB,
  invoice_number TEXT,
  receipt_url TEXT,
  refund_amount NUMERIC,
  refund_reason TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 7. Pledge Sessions Table
CREATE TABLE IF NOT EXISTS public.pledge_sessions (
  id TEXT PRIMARY KEY,
  created_by TEXT,
  stock_symbol TEXT NOT NULL,
  stock_name TEXT,
  description TEXT,
  execution_reason TEXT,
  is_advisor_recommended BOOLEAN DEFAULT false,
  is_analyst_certified BOOLEAN DEFAULT false,
  session_start TIMESTAMPTZ NOT NULL,
  session_end TIMESTAMPTZ NOT NULL,
  session_mode TEXT CHECK (session_mode IN ('buy_only', 'sell_only', 'buy_sell_cycle')),
  execution_rule TEXT CHECK (execution_rule IN ('manual', 'session_end', 'target_reached', 'immediate')),
  allow_amo BOOLEAN DEFAULT false,
  convenience_fee_type TEXT CHECK (convenience_fee_type IN ('flat', 'percentage')),
  convenience_fee_amount NUMERIC,
  commission_rate_override NUMERIC,
  min_qty INTEGER,
  max_qty INTEGER,
  capacity INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'executing', 'completed', 'cancelled')),
  total_pledges INTEGER DEFAULT 0,
  total_pledge_value NUMERIC DEFAULT 0,
  buy_pledges_count INTEGER DEFAULT 0,
  sell_pledges_count INTEGER DEFAULT 0,
  buy_pledges_value NUMERIC DEFAULT 0,
  sell_pledges_value NUMERIC DEFAULT 0,
  execution_notes TEXT,
  last_executed_at TIMESTAMPTZ,
  notification_sent BOOLEAN DEFAULT false,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 8. Polls Table
CREATE TABLE IF NOT EXISTS public.polls (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  stock_symbol TEXT,
  chatroom_id TEXT,
  poll_type TEXT DEFAULT 'buy_sell_hold' CHECK (poll_type IN ('buy_sell_hold', 'bullish_bearish_neutral', 'yes_no')),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  is_premium BOOLEAN DEFAULT false,
  created_by_role TEXT,
  buy_votes INTEGER DEFAULT 0,
  sell_votes INTEGER DEFAULT 0,
  hold_votes INTEGER DEFAULT 0,
  bullish_votes INTEGER DEFAULT 0,
  bearish_votes INTEGER DEFAULT 0,
  neutral_votes INTEGER DEFAULT 0,
  yes_votes INTEGER DEFAULT 0,
  no_votes INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0,
  total_pledges INTEGER DEFAULT 0,
  total_pledge_amount NUMERIC DEFAULT 0,
  created_by_admin BOOLEAN DEFAULT false,
  target_price NUMERIC,
  confidence_score INTEGER,
  creation_source TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 9. Poll Votes Table
CREATE TABLE IF NOT EXISTS public.poll_votes (
  id TEXT PRIMARY KEY,
  poll_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  vote TEXT NOT NULL,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false,
  UNIQUE(poll_id, user_id)
);

-- 10. Profit Payout Schedules Table
CREATE TABLE IF NOT EXISTS public.profit_payout_schedules (
  id TEXT PRIMARY KEY,
  fund_plan_id TEXT NOT NULL,
  payout_date DATE NOT NULL,
  payout_frequency TEXT CHECK (payout_frequency IN ('monthly', 'quarterly', 'yearly')),
  profit_rate NUMERIC NOT NULL,
  total_amount NUMERIC NOT NULL,
  total_investors INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'processing', 'completed', 'failed')),
  processed_at TIMESTAMPTZ,
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
ALTER TABLE public.pledges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledge_access_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledge_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledge_execution_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledge_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledge_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pledge_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profit_payout_schedules ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies - Pledges
-- =============================================
CREATE POLICY "Users can view their pledges"
  ON public.pledges FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create pledges"
  ON public.pledges FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update pledges"
  ON public.pledges FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Pledge Access Requests
-- =============================================
CREATE POLICY "Users can view their access requests"
  ON public.pledge_access_requests FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create access requests"
  ON public.pledge_access_requests FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update access requests"
  ON public.pledge_access_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Pledge Audit Logs
-- =============================================
CREATE POLICY "Admins can view audit logs"
  ON public.pledge_audit_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can create audit logs"
  ON public.pledge_audit_logs FOR INSERT
  WITH CHECK (true);

-- =============================================
-- RLS Policies - Pledge Execution Records
-- =============================================
CREATE POLICY "Users can view their execution records"
  ON public.pledge_execution_records FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create execution records"
  ON public.pledge_execution_records FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update execution records"
  ON public.pledge_execution_records FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Pledge Orders
-- =============================================
CREATE POLICY "Users can view their orders"
  ON public.pledge_orders FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can manage orders"
  ON public.pledge_orders FOR ALL
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS Policies - Pledge Payments
-- =============================================
CREATE POLICY "Users can view their payments"
  ON public.pledge_payments FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "System can create payments"
  ON public.pledge_payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update payments"
  ON public.pledge_payments FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Pledge Sessions
-- =============================================
CREATE POLICY "Anyone can view active sessions"
  ON public.pledge_sessions FOR SELECT
  USING (status = 'active' OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage sessions"
  ON public.pledge_sessions FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Polls
-- =============================================
CREATE POLICY "Anyone can view active polls"
  ON public.polls FOR SELECT
  USING (is_active = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create polls"
  ON public.polls FOR INSERT
  WITH CHECK (created_by_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update polls"
  ON public.polls FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Poll Votes
-- =============================================
CREATE POLICY "Anyone can view poll votes"
  ON public.poll_votes FOR SELECT
  USING (true);

CREATE POLICY "Users can create votes"
  ON public.poll_votes FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Users can update their votes"
  ON public.poll_votes FOR UPDATE
  USING (user_id = (auth.uid())::TEXT);

-- =============================================
-- RLS Policies - Profit Payout Schedules
-- =============================================
CREATE POLICY "Anyone can view payout schedules"
  ON public.profit_payout_schedules FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage payout schedules"
  ON public.profit_payout_schedules FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- Enable Realtime
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.pledges;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pledge_access_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pledge_audit_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pledge_execution_records;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pledge_orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pledge_payments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.pledge_sessions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.polls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.poll_votes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profit_payout_schedules;

-- =============================================
-- Create Indexes for Performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_pledges_session_id ON public.pledges(session_id);
CREATE INDEX IF NOT EXISTS idx_pledges_user_id ON public.pledges(user_id);
CREATE INDEX IF NOT EXISTS idx_pledges_status ON public.pledges(status);
CREATE INDEX IF NOT EXISTS idx_pledge_access_requests_user_id ON public.pledge_access_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_pledge_access_requests_status ON public.pledge_access_requests(status);
CREATE INDEX IF NOT EXISTS idx_pledge_audit_logs_actor_id ON public.pledge_audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_pledge_audit_logs_target_pledge_id ON public.pledge_audit_logs(target_pledge_id);
CREATE INDEX IF NOT EXISTS idx_pledge_audit_logs_created_date ON public.pledge_audit_logs(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_pledge_execution_records_pledge_id ON public.pledge_execution_records(pledge_id);
CREATE INDEX IF NOT EXISTS idx_pledge_execution_records_user_id ON public.pledge_execution_records(user_id);
CREATE INDEX IF NOT EXISTS idx_pledge_execution_records_status ON public.pledge_execution_records(status);
CREATE INDEX IF NOT EXISTS idx_pledge_orders_pledge_id ON public.pledge_orders(pledge_id);
CREATE INDEX IF NOT EXISTS idx_pledge_orders_user_id ON public.pledge_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_pledge_payments_pledge_id ON public.pledge_payments(pledge_id);
CREATE INDEX IF NOT EXISTS idx_pledge_payments_user_id ON public.pledge_payments(user_id);
CREATE INDEX IF NOT EXISTS idx_pledge_sessions_stock_symbol ON public.pledge_sessions(stock_symbol);
CREATE INDEX IF NOT EXISTS idx_pledge_sessions_status ON public.pledge_sessions(status);
CREATE INDEX IF NOT EXISTS idx_pledge_sessions_session_start ON public.pledge_sessions(session_start DESC);
CREATE INDEX IF NOT EXISTS idx_polls_stock_symbol ON public.polls(stock_symbol);
CREATE INDEX IF NOT EXISTS idx_polls_is_active ON public.polls(is_active);
CREATE INDEX IF NOT EXISTS idx_polls_created_date ON public.polls(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_poll_votes_poll_id ON public.poll_votes(poll_id);
CREATE INDEX IF NOT EXISTS idx_poll_votes_user_id ON public.poll_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_profit_payout_schedules_fund_plan_id ON public.profit_payout_schedules(fund_plan_id);
CREATE INDEX IF NOT EXISTS idx_profit_payout_schedules_payout_date ON public.profit_payout_schedules(payout_date DESC);