-- =============================================
-- Create tables for Alert System, Chat, and Commission data
-- =============================================

-- 1. Alert Configurations Table
CREATE TABLE IF NOT EXISTS public.alert_configurations (
  id TEXT PRIMARY KEY,
  alert_type TEXT NOT NULL,
  threshold_value NUMERIC,
  severity TEXT CHECK (severity IN ('info', 'warning', 'critical')),
  is_enabled BOOLEAN DEFAULT true,
  email_enabled BOOLEAN DEFAULT false,
  push_enabled BOOLEAN DEFAULT false,
  description TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 2. Alert Logs Table
CREATE TABLE IF NOT EXISTS public.alert_logs (
  id TEXT PRIMARY KEY,
  alert_type TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  stock_symbol TEXT,
  title TEXT NOT NULL,
  message TEXT,
  severity TEXT CHECK (severity IN ('info', 'warning', 'critical')),
  triggered_value NUMERIC,
  threshold_value NUMERIC,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'acknowledged', 'resolved', 'dismissed')),
  resolved_by TEXT,
  resolved_at TIMESTAMPTZ,
  admin_notes TEXT,
  action_taken TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 3. Alert Settings Table (User-specific)
CREATE TABLE IF NOT EXISTS public.alert_settings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  stock_symbol TEXT,
  price_change_percent NUMERIC,
  profit_target_percent NUMERIC,
  loss_limit_percent NUMERIC,
  notify_on_consensus_change BOOLEAN DEFAULT false,
  notify_on_advisor_update BOOLEAN DEFAULT false,
  daily_portfolio_summary BOOLEAN DEFAULT false,
  push_notifications_enabled BOOLEAN DEFAULT false,
  email_notifications_enabled BOOLEAN DEFAULT false,
  last_price_alert NUMERIC,
  last_consensus TEXT,
  is_active BOOLEAN DEFAULT true,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 4. Chat Rooms Table
CREATE TABLE IF NOT EXISTS public.chat_rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  stock_symbol TEXT,
  room_type TEXT CHECK (room_type IN ('general', 'stock_specific', 'sector', 'admin')),
  is_premium BOOLEAN DEFAULT false,
  required_plan TEXT,
  participant_count INTEGER DEFAULT 0,
  is_meeting_active BOOLEAN DEFAULT false,
  meeting_url TEXT,
  admin_only_post BOOLEAN DEFAULT false,
  success_rate NUMERIC,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 5. Chat Polls Table
CREATE TABLE IF NOT EXISTS public.chat_polls (
  id TEXT PRIMARY KEY,
  chat_room_id TEXT NOT NULL,
  stock_symbol TEXT,
  poll_date DATE NOT NULL,
  buy_votes INTEGER DEFAULT 0,
  sell_votes INTEGER DEFAULT 0,
  hold_votes INTEGER DEFAULT 0,
  total_votes INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 6. Chat Poll Votes Table
CREATE TABLE IF NOT EXISTS public.chat_poll_votes (
  id TEXT PRIMARY KEY,
  chat_poll_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  vote TEXT CHECK (vote IN ('buy', 'sell', 'hold')),
  vote_date DATE NOT NULL,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false,
  UNIQUE(chat_poll_id, user_id)
);

-- 7. Commission Settings Table
CREATE TABLE IF NOT EXISTS public.commission_settings (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('event', 'advisor', 'finfluencer', 'ad')),
  default_rate NUMERIC NOT NULL,
  minimum_payout_threshold NUMERIC DEFAULT 500,
  overrides JSONB,
  is_active BOOLEAN DEFAULT true,
  description TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 8. Commission Tracking Table
CREATE TABLE IF NOT EXISTS public.commission_tracking (
  id TEXT PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  transaction_id TEXT,
  base_amount NUMERIC NOT NULL,
  commission_rate NUMERIC NOT NULL,
  commission_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled')),
  payout_date TIMESTAMPTZ,
  notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 9. Campaign Billing Table
CREATE TABLE IF NOT EXISTS public.campaign_billing (
  id TEXT PRIMARY KEY,
  campaign_id TEXT NOT NULL,
  vendor_id TEXT NOT NULL,
  billing_period_start TIMESTAMPTZ NOT NULL,
  billing_period_end TIMESTAMPTZ NOT NULL,
  billing_model TEXT CHECK (billing_model IN ('cpc', 'weekly', 'monthly')),
  total_impressions INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,
  amount_due NUMERIC NOT NULL DEFAULT 0,
  amount_paid NUMERIC DEFAULT 0,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'overdue', 'cancelled')),
  payment_date TIMESTAMPTZ,
  invoice_url TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE public.alert_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alert_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_poll_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commission_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_billing ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies - Alert Configurations
-- =============================================
CREATE POLICY "Anyone can view alert configurations"
  ON public.alert_configurations FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage alert configurations"
  ON public.alert_configurations FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Alert Logs
-- =============================================
CREATE POLICY "Admins can view all alert logs"
  ON public.alert_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can create alert logs"
  ON public.alert_logs FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update alert logs"
  ON public.alert_logs FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Alert Settings
-- =============================================
CREATE POLICY "Users can view their alert settings"
  ON public.alert_settings FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can manage their alert settings"
  ON public.alert_settings FOR ALL
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS Policies - Chat Rooms
-- =============================================
CREATE POLICY "Anyone can view active chat rooms"
  ON public.chat_rooms FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage chat rooms"
  ON public.chat_rooms FOR ALL
  USING (created_by_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Chat Polls
-- =============================================
CREATE POLICY "Anyone can view chat polls"
  ON public.chat_polls FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can create chat polls"
  ON public.chat_polls FOR INSERT
  WITH CHECK (created_by_id = (auth.uid())::TEXT);

CREATE POLICY "Poll creators can update their polls"
  ON public.chat_polls FOR UPDATE
  USING (created_by_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS Policies - Chat Poll Votes
-- =============================================
CREATE POLICY "Anyone can view poll votes"
  ON public.chat_poll_votes FOR SELECT
  USING (true);

CREATE POLICY "Users can create their votes"
  ON public.chat_poll_votes FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Users can update their votes"
  ON public.chat_poll_votes FOR UPDATE
  USING (user_id = (auth.uid())::TEXT);

-- =============================================
-- RLS Policies - Commission Settings
-- =============================================
CREATE POLICY "Anyone can view commission settings"
  ON public.commission_settings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage commission settings"
  ON public.commission_settings FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Commission Tracking
-- =============================================
CREATE POLICY "Users can view their commission tracking"
  ON public.commission_tracking FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can create commission records"
  ON public.commission_tracking FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update commission tracking"
  ON public.commission_tracking FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Campaign Billing
-- =============================================
CREATE POLICY "Vendors can view their billing"
  ON public.campaign_billing FOR SELECT
  USING (vendor_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Admins can manage campaign billing"
  ON public.campaign_billing FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- Enable Realtime
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.alert_configurations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alert_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.alert_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_rooms;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_polls;
ALTER PUBLICATION supabase_realtime ADD TABLE public.chat_poll_votes;
ALTER PUBLICATION supabase_realtime ADD TABLE public.commission_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.commission_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE public.campaign_billing;

-- =============================================
-- Create Indexes for Performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_alert_logs_status ON public.alert_logs(status);
CREATE INDEX IF NOT EXISTS idx_alert_logs_severity ON public.alert_logs(severity);
CREATE INDEX IF NOT EXISTS idx_alert_logs_created_date ON public.alert_logs(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_alert_settings_user_id ON public.alert_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_alert_settings_stock_symbol ON public.alert_settings(stock_symbol);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_stock_symbol ON public.chat_rooms(stock_symbol);
CREATE INDEX IF NOT EXISTS idx_chat_rooms_room_type ON public.chat_rooms(room_type);
CREATE INDEX IF NOT EXISTS idx_chat_polls_chat_room_id ON public.chat_polls(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_chat_polls_poll_date ON public.chat_polls(poll_date DESC);
CREATE INDEX IF NOT EXISTS idx_chat_poll_votes_chat_poll_id ON public.chat_poll_votes(chat_poll_id);
CREATE INDEX IF NOT EXISTS idx_chat_poll_votes_user_id ON public.chat_poll_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_commission_tracking_user_id ON public.commission_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_commission_tracking_status ON public.commission_tracking(status);
CREATE INDEX IF NOT EXISTS idx_campaign_billing_campaign_id ON public.campaign_billing(campaign_id);
CREATE INDEX IF NOT EXISTS idx_campaign_billing_vendor_id ON public.campaign_billing(vendor_id);