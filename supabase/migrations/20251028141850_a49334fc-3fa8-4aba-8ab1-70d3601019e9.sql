-- ============================================
-- Base44 Database Import: Create Tables with Realtime (FIXED)
-- ============================================

-- 1. AdCampaign Table
CREATE TABLE IF NOT EXISTS public.ad_campaigns (
  id TEXT PRIMARY KEY,
  vendor_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  creative_url TEXT,
  cta_link TEXT,
  status TEXT DEFAULT 'pending',
  billing_model TEXT,
  cpc_rate NUMERIC,
  weekly_fee NUMERIC,
  monthly_fee NUMERIC,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  revenue_generated NUMERIC DEFAULT 0,
  rejection_reason TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 2. AdClick Table
CREATE TABLE IF NOT EXISTS public.ad_clicks (
  id TEXT PRIMARY KEY,
  campaign_id TEXT REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
  user_id TEXT,
  cost NUMERIC,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 3. AdImpression Table
CREATE TABLE IF NOT EXISTS public.ad_impressions (
  id TEXT PRIMARY KEY,
  campaign_id TEXT REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
  user_id TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 4. AdTransaction Table (empty but ready for future use)
CREATE TABLE IF NOT EXISTS public.ad_transactions (
  id TEXT PRIMARY KEY,
  campaign_id TEXT REFERENCES public.ad_campaigns(id) ON DELETE CASCADE,
  vendor_id TEXT,
  amount NUMERIC,
  transaction_type TEXT,
  payment_status TEXT,
  payment_method TEXT,
  transaction_date TIMESTAMPTZ DEFAULT now(),
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 5. Advisors Table
CREATE TABLE IF NOT EXISTS public.advisors_base44 (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  specialization JSONB,
  sebi_registration_number TEXT,
  sebi_document_url TEXT,
  status TEXT DEFAULT 'pending',
  follower_count INTEGER DEFAULT 0,
  success_rate NUMERIC,
  commission_override_rate NUMERIC,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 6. AdvisorPost Table
CREATE TABLE IF NOT EXISTS public.advisor_posts_base44 (
  id TEXT PRIMARY KEY,
  advisor_id TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT,
  stock_symbol TEXT,
  recommendation_type TEXT,
  target_price NUMERIC,
  stop_loss NUMERIC,
  time_horizon TEXT,
  required_plan_id TEXT,
  status TEXT DEFAULT 'draft',
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 7. AdvisorPlan Table (empty but ready)
CREATE TABLE IF NOT EXISTS public.advisor_plans_base44 (
  id TEXT PRIMARY KEY,
  advisor_id TEXT,
  plan_name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  duration_days INTEGER,
  features JSONB,
  is_active BOOLEAN DEFAULT true,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 8. AdvisorRecommendation Table (empty but ready)
CREATE TABLE IF NOT EXISTS public.advisor_recommendations_base44 (
  id TEXT PRIMARY KEY,
  advisor_id TEXT,
  post_id TEXT,
  stock_symbol TEXT NOT NULL,
  recommendation_type TEXT NOT NULL,
  entry_price NUMERIC,
  target_price NUMERIC,
  stop_loss NUMERIC,
  risk_level TEXT,
  time_horizon TEXT,
  rationale TEXT,
  status TEXT DEFAULT 'active',
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 9. AdvisorReview Table (empty but ready)
CREATE TABLE IF NOT EXISTS public.advisor_reviews_base44 (
  id TEXT PRIMARY KEY,
  advisor_id TEXT,
  user_id TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 10. AdvisorSubscription Table (empty but ready)
CREATE TABLE IF NOT EXISTS public.advisor_subscriptions_base44 (
  id TEXT PRIMARY KEY,
  advisor_id TEXT,
  user_id TEXT NOT NULL,
  plan_id TEXT,
  start_date TIMESTAMPTZ DEFAULT now(),
  end_date TIMESTAMPTZ,
  status TEXT DEFAULT 'active',
  payment_status TEXT,
  amount_paid NUMERIC,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE public.ad_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_impressions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisors_base44 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_posts_base44 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_plans_base44 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_recommendations_base44 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_reviews_base44 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisor_subscriptions_base44 ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies with proper type casting
-- ============================================

-- Ad Campaigns
CREATE POLICY "Anyone can view ad campaigns"
  ON public.ad_campaigns FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Vendors can manage their campaigns"
  ON public.ad_campaigns FOR ALL TO authenticated
  USING (created_by_id = auth.uid()::text OR has_role(auth.uid(), 'admin'::app_role));

-- Ad Clicks
CREATE POLICY "Users can view ad clicks"
  ON public.ad_clicks FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "System can track clicks"
  ON public.ad_clicks FOR INSERT TO authenticated
  WITH CHECK (true);

-- Ad Impressions
CREATE POLICY "Users can view ad impressions"
  ON public.ad_impressions FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "System can track impressions"
  ON public.ad_impressions FOR INSERT TO authenticated
  WITH CHECK (true);

-- Ad Transactions
CREATE POLICY "Users can view their ad transactions"
  ON public.ad_transactions FOR SELECT TO authenticated
  USING (vendor_id = auth.uid()::text OR has_role(auth.uid(), 'admin'::app_role));

-- Advisors
CREATE POLICY "Anyone can view advisors"
  ON public.advisors_base44 FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Advisors can manage their profile"
  ON public.advisors_base44 FOR ALL TO authenticated
  USING (user_id = auth.uid()::text OR has_role(auth.uid(), 'admin'::app_role));

-- Advisor Posts
CREATE POLICY "Anyone can view advisor posts"
  ON public.advisor_posts_base44 FOR SELECT TO authenticated
  USING (status = 'published' OR created_by_id = auth.uid()::text OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Advisors can manage their posts"
  ON public.advisor_posts_base44 FOR ALL TO authenticated
  USING (created_by_id = auth.uid()::text OR has_role(auth.uid(), 'admin'::app_role));

-- Advisor Plans
CREATE POLICY "Anyone can view advisor plans"
  ON public.advisor_plans_base44 FOR SELECT TO authenticated
  USING (is_active = true OR created_by_id = auth.uid()::text);

CREATE POLICY "Advisors can manage their plans"
  ON public.advisor_plans_base44 FOR ALL TO authenticated
  USING (created_by_id = auth.uid()::text OR has_role(auth.uid(), 'admin'::app_role));

-- Advisor Recommendations
CREATE POLICY "Anyone can view recommendations"
  ON public.advisor_recommendations_base44 FOR SELECT TO authenticated
  USING (status = 'active' OR created_by_id = auth.uid()::text);

CREATE POLICY "Advisors can manage recommendations"
  ON public.advisor_recommendations_base44 FOR ALL TO authenticated
  USING (created_by_id = auth.uid()::text OR has_role(auth.uid(), 'admin'::app_role));

-- Advisor Reviews
CREATE POLICY "Anyone can view advisor reviews"
  ON public.advisor_reviews_base44 FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews"
  ON public.advisor_reviews_base44 FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update their reviews"
  ON public.advisor_reviews_base44 FOR UPDATE TO authenticated
  USING (user_id = auth.uid()::text);

-- Advisor Subscriptions
CREATE POLICY "Users can view their subscriptions"
  ON public.advisor_subscriptions_base44 FOR SELECT TO authenticated
  USING (user_id = auth.uid()::text OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can create subscriptions"
  ON public.advisor_subscriptions_base44 FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid()::text);

-- ============================================
-- Enable Realtime for all tables
-- ============================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.ad_campaigns;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ad_clicks;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ad_impressions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ad_transactions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.advisors_base44;
ALTER PUBLICATION supabase_realtime ADD TABLE public.advisor_posts_base44;
ALTER PUBLICATION supabase_realtime ADD TABLE public.advisor_plans_base44;
ALTER PUBLICATION supabase_realtime ADD TABLE public.advisor_recommendations_base44;
ALTER PUBLICATION supabase_realtime ADD TABLE public.advisor_reviews_base44;
ALTER PUBLICATION supabase_realtime ADD TABLE public.advisor_subscriptions_base44;

-- ============================================
-- Create indexes for better query performance
-- ============================================

CREATE INDEX idx_ad_campaigns_vendor ON public.ad_campaigns(vendor_id);
CREATE INDEX idx_ad_campaigns_status ON public.ad_campaigns(status);
CREATE INDEX idx_ad_clicks_campaign ON public.ad_clicks(campaign_id);
CREATE INDEX idx_ad_impressions_campaign ON public.ad_impressions(campaign_id);
CREATE INDEX idx_advisors_base44_user ON public.advisors_base44(user_id);
CREATE INDEX idx_advisors_base44_status ON public.advisors_base44(status);
CREATE INDEX idx_advisor_posts_base44_advisor ON public.advisor_posts_base44(advisor_id);
CREATE INDEX idx_advisor_posts_base44_status ON public.advisor_posts_base44(status);
CREATE INDEX idx_advisor_subscriptions_base44_user ON public.advisor_subscriptions_base44(user_id);
CREATE INDEX idx_advisor_subscriptions_base44_advisor ON public.advisor_subscriptions_base44(advisor_id);