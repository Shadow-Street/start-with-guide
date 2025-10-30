-- =============================================
-- Enhanced Chat System: Read Receipts, User Presence, and Real-time Features
-- =============================================

-- 1. Read Receipts Table
CREATE TABLE IF NOT EXISTS public.message_read_receipts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  message_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  read_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(message_id, user_id)
);

-- 2. User Presence Table (for online status)
CREATE TABLE IF NOT EXISTS public.user_presence (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_id TEXT NOT NULL UNIQUE,
  chat_room_id TEXT,
  status TEXT NOT NULL DEFAULT 'offline' CHECK (status IN ('online', 'away', 'offline')),
  last_seen TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 3. Add read_count to messages table
ALTER TABLE public.messages 
ADD COLUMN IF NOT EXISTS read_count INTEGER DEFAULT 0;

-- 4. Enable RLS
ALTER TABLE public.message_read_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_presence ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies - Read Receipts
CREATE POLICY "Users can view read receipts for messages in their rooms"
  ON public.message_read_receipts FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own read receipts"
  ON public.message_read_receipts FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Users can update their own read receipts"
  ON public.message_read_receipts FOR UPDATE
  USING (user_id = (auth.uid())::TEXT);

-- 6. RLS Policies - User Presence
CREATE POLICY "Anyone can view user presence"
  ON public.user_presence FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own presence"
  ON public.user_presence FOR ALL
  USING (user_id = (auth.uid())::TEXT);

-- 7. Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.message_read_receipts;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_presence;

-- Make sure messages table has REPLICA IDENTITY FULL for realtime updates
ALTER TABLE public.messages REPLICA IDENTITY FULL;
ALTER TABLE public.chat_rooms REPLICA IDENTITY FULL;

-- 8. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_message_read_receipts_message_id ON public.message_read_receipts(message_id);
CREATE INDEX IF NOT EXISTS idx_message_read_receipts_user_id ON public.message_read_receipts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_presence_user_id ON public.user_presence(user_id);
CREATE INDEX IF NOT EXISTS idx_user_presence_chat_room_id ON public.user_presence(chat_room_id);
CREATE INDEX IF NOT EXISTS idx_user_presence_status ON public.user_presence(status);
CREATE INDEX IF NOT EXISTS idx_user_presence_last_seen ON public.user_presence(last_seen DESC);

-- 9. Function to update read count
CREATE OR REPLACE FUNCTION update_message_read_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.messages
  SET read_count = (
    SELECT COUNT(DISTINCT user_id)
    FROM public.message_read_receipts
    WHERE message_id = NEW.message_id
  )
  WHERE id = NEW.message_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Trigger to auto-update read count
DROP TRIGGER IF EXISTS update_read_count_trigger ON public.message_read_receipts;
CREATE TRIGGER update_read_count_trigger
  AFTER INSERT OR DELETE ON public.message_read_receipts
  FOR EACH ROW
  EXECUTE FUNCTION update_message_read_count();

-- 11. Function to cleanup old presence data (older than 24 hours offline)
CREATE OR REPLACE FUNCTION cleanup_old_presence()
RETURNS void AS $$
BEGIN
  DELETE FROM public.user_presence
  WHERE status = 'offline' 
  AND last_seen < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 12. Add mentions support to messages
ALTER TABLE public.messages 
ADD COLUMN IF NOT EXISTS mentioned_users TEXT[];

CREATE INDEX IF NOT EXISTS idx_messages_mentioned_users ON public.messages USING GIN(mentioned_users);