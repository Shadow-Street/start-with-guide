-- =============================================
-- Create tables for Meetings, Messages, Notifications, Permissions, and Settings
-- =============================================

-- 1. Meetings Table
CREATE TABLE IF NOT EXISTS public.meetings (
  id TEXT PRIMARY KEY,
  chat_room_id TEXT NOT NULL,
  stock_symbol TEXT,
  meeting_url TEXT NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'active', 'ended', 'cancelled')),
  start_time TIMESTAMPTZ,
  end_time TIMESTAMPTZ,
  participant_count INTEGER DEFAULT 0,
  max_participants INTEGER DEFAULT 50,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 2. Messages Table
CREATE TABLE IF NOT EXISTS public.messages (
  id TEXT PRIMARY KEY,
  chat_room_id TEXT NOT NULL,
  user_id TEXT,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'bot_insight', 'system', 'image', 'file', 'poll')),
  mentioned_stock TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 3. Moderation Logs Table
CREATE TABLE IF NOT EXISTS public.moderation_logs (
  id TEXT PRIMARY KEY,
  moderator_id TEXT NOT NULL,
  moderator_name TEXT,
  action TEXT NOT NULL CHECK (action IN ('delete_message', 'ban_user', 'unban_user', 'warn_user', 'delete_poll', 'edit_message')),
  target_type TEXT CHECK (target_type IN ('message', 'user', 'poll', 'post')),
  target_id TEXT,
  target_user_id TEXT,
  chat_room_id TEXT,
  reason TEXT,
  details TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 4. Module Approval Requests Table
CREATE TABLE IF NOT EXISTS public.module_approval_requests (
  id TEXT PRIMARY KEY,
  module_name TEXT NOT NULL,
  module_key TEXT NOT NULL,
  requested_by_id TEXT NOT NULL,
  requested_by_name TEXT,
  description TEXT,
  justification TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by_id TEXT,
  reviewed_by_name TEXT,
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 5. News Table
CREATE TABLE IF NOT EXISTS public.news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT,
  summary TEXT,
  source TEXT,
  source_url TEXT,
  stock_symbols JSONB,
  category TEXT CHECK (category IN ('market', 'company', 'economy', 'policy', 'technology', 'general')),
  sentiment TEXT CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  image_url TEXT,
  published_date TIMESTAMPTZ,
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 6. Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('informational', 'important', 'critical')),
  category TEXT CHECK (category IN ('security', 'admin_pick', 'pledge_update', 'achievement', 'event_reminder', 'price_alert', 'general')),
  is_read BOOLEAN DEFAULT false,
  link_url TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 7. Notification Settings Table
CREATE TABLE IF NOT EXISTS public.notification_settings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('price_alert', 'profit_alert', 'loss_alert', 'consensus_alert', 'advisor_post', 'pledge_update', 'event_reminder', 'general')),
  in_app_enabled BOOLEAN DEFAULT true,
  email_enabled BOOLEAN DEFAULT false,
  push_enabled BOOLEAN DEFAULT false,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false,
  UNIQUE(user_id, category)
);

-- 8. Payout Requests Table
CREATE TABLE IF NOT EXISTS public.payout_requests (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  entity_type TEXT CHECK (entity_type IN ('finfluencer', 'advisor', 'event', 'ad')),
  entity_id TEXT,
  requested_amount NUMERIC NOT NULL,
  available_balance NUMERIC NOT NULL,
  payout_method TEXT CHECK (payout_method IN ('bank_transfer', 'upi', 'paypal')),
  bank_details JSONB,
  upi_id TEXT,
  paypal_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'processed')),
  admin_notes TEXT,
  processed_date TIMESTAMPTZ,
  processed_by TEXT,
  transaction_reference TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 9. Permissions Table
CREATE TABLE IF NOT EXISTS public.permissions (
  id TEXT PRIMARY KEY,
  permission_key TEXT NOT NULL UNIQUE,
  category TEXT,
  description TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 10. Platform Settings Table
CREATE TABLE IF NOT EXISTS public.platform_settings (
  id TEXT PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value TEXT,
  description TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.moderation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_approval_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies - Meetings
-- =============================================
CREATE POLICY "Users can view meetings in their chat rooms"
  ON public.meetings FOR SELECT
  USING (true);

CREATE POLICY "Chat room members can create meetings"
  ON public.meetings FOR INSERT
  WITH CHECK (created_by_id = (auth.uid())::TEXT);

CREATE POLICY "Meeting creators can update meetings"
  ON public.meetings FOR UPDATE
  USING (created_by_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS Policies - Messages
-- =============================================
CREATE POLICY "Users can view messages in chat rooms"
  ON public.messages FOR SELECT
  USING (true);

CREATE POLICY "Users can create messages"
  ON public.messages FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT OR message_type = 'bot_insight');

CREATE POLICY "Users can update their messages"
  ON public.messages FOR UPDATE
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can delete their messages"
  ON public.messages FOR DELETE
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS Policies - Moderation Logs
-- =============================================
CREATE POLICY "Admins can view moderation logs"
  ON public.moderation_logs FOR SELECT
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Moderators can create logs"
  ON public.moderation_logs FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'moderator'));

-- =============================================
-- RLS Policies - Module Approval Requests
-- =============================================
CREATE POLICY "Users can view their requests"
  ON public.module_approval_requests FOR SELECT
  USING (requested_by_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create approval requests"
  ON public.module_approval_requests FOR INSERT
  WITH CHECK (requested_by_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update approval requests"
  ON public.module_approval_requests FOR UPDATE
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - News
-- =============================================
CREATE POLICY "Anyone can view published news"
  ON public.news FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage news"
  ON public.news FOR ALL
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Notifications
-- =============================================
CREATE POLICY "Users can view their notifications"
  ON public.notifications FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR user_id = 'current_user');

CREATE POLICY "System can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = (auth.uid())::TEXT);

-- =============================================
-- RLS Policies - Notification Settings
-- =============================================
CREATE POLICY "Users can view their notification settings"
  ON public.notification_settings FOR SELECT
  USING (user_id = (auth.uid())::TEXT);

CREATE POLICY "Users can manage their notification settings"
  ON public.notification_settings FOR ALL
  USING (user_id = (auth.uid())::TEXT);

-- =============================================
-- RLS Policies - Payout Requests
-- =============================================
CREATE POLICY "Users can view their payout requests"
  ON public.payout_requests FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create payout requests"
  ON public.payout_requests FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update payout requests"
  ON public.payout_requests FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Permissions
-- =============================================
CREATE POLICY "Anyone can view permissions"
  ON public.permissions FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage permissions"
  ON public.permissions FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Platform Settings
-- =============================================
CREATE POLICY "Anyone can view platform settings"
  ON public.platform_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage platform settings"
  ON public.platform_settings FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- Enable Realtime
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.meetings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.moderation_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.module_approval_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.news;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notification_settings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.payout_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.permissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.platform_settings;

-- =============================================
-- Create Indexes for Performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_meetings_chat_room_id ON public.meetings(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON public.meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_start_time ON public.meetings(start_time DESC);
CREATE INDEX IF NOT EXISTS idx_messages_chat_room_id ON public.messages(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON public.messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_date ON public.messages(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_messages_message_type ON public.messages(message_type);
CREATE INDEX IF NOT EXISTS idx_moderation_logs_moderator_id ON public.moderation_logs(moderator_id);
CREATE INDEX IF NOT EXISTS idx_moderation_logs_target_id ON public.moderation_logs(target_id);
CREATE INDEX IF NOT EXISTS idx_moderation_logs_created_date ON public.moderation_logs(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_module_approval_requests_status ON public.module_approval_requests(status);
CREATE INDEX IF NOT EXISTS idx_module_approval_requests_requested_by_id ON public.module_approval_requests(requested_by_id);
CREATE INDEX IF NOT EXISTS idx_news_published_date ON public.news(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON public.news(category);
CREATE INDEX IF NOT EXISTS idx_news_is_featured ON public.news(is_featured);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_date ON public.notifications(created_date DESC);
CREATE INDEX IF NOT EXISTS idx_notification_settings_user_id ON public.notification_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_payout_requests_user_id ON public.payout_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_payout_requests_status ON public.payout_requests(status);
CREATE INDEX IF NOT EXISTS idx_payout_requests_entity_type ON public.payout_requests(entity_type);
CREATE INDEX IF NOT EXISTS idx_permissions_permission_key ON public.permissions(permission_key);
CREATE INDEX IF NOT EXISTS idx_platform_settings_setting_key ON public.platform_settings(setting_key);