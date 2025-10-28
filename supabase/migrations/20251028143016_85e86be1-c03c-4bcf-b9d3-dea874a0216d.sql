-- =============================================
-- Create tables for Contact, Courses, Events, and Configuration data
-- =============================================

-- 1. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  mobile_number TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  user_id TEXT,
  admin_notes TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  influencer_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  course_type TEXT CHECK (course_type IN ('recorded_course', 'live_session', 'webinar')),
  price NUMERIC NOT NULL,
  duration_hours NUMERIC,
  max_participants INTEGER,
  current_enrollments INTEGER DEFAULT 0,
  scheduled_date TIMESTAMPTZ,
  meeting_link TEXT,
  curriculum JSONB,
  prerequisites TEXT,
  category TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending', 'approved', 'rejected', 'archived')),
  total_revenue NUMERIC DEFAULT 0,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 3. Course Enrollments Table
CREATE TABLE IF NOT EXISTS public.course_enrollments (
  id TEXT PRIMARY KEY,
  course_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  payment_id TEXT,
  amount_paid NUMERIC NOT NULL,
  platform_commission NUMERIC,
  influencer_payout NUMERIC,
  enrollment_status TEXT DEFAULT 'active' CHECK (enrollment_status IN ('active', 'completed', 'cancelled', 'refunded')),
  completion_date TIMESTAMPTZ,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false,
  UNIQUE(course_id, user_id)
);

-- 4. Educators Table
CREATE TABLE IF NOT EXISTS public.educators (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  specialization JSONB,
  qualifications TEXT,
  experience_years INTEGER,
  total_courses INTEGER DEFAULT 0,
  total_students INTEGER DEFAULT 0,
  average_rating NUMERIC,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  commission_override_rate NUMERIC,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 5. Entity Configurations Table
CREATE TABLE IF NOT EXISTS public.entity_configurations (
  id TEXT PRIMARY KEY,
  entity_name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  color TEXT,
  enabled BOOLEAN DEFAULT true,
  user_visible BOOLEAN DEFAULT true,
  admin_visible BOOLEAN DEFAULT true,
  management_enabled BOOLEAN DEFAULT true,
  action_button_label TEXT,
  status_field TEXT,
  sort_order INTEGER,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 6. Events Table
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  location TEXT,
  organizer_id TEXT NOT NULL,
  organizer_name TEXT,
  capacity INTEGER,
  status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
  admin_notes TEXT,
  is_premium BOOLEAN DEFAULT false,
  ticket_price NUMERIC,
  is_featured BOOLEAN DEFAULT false,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 7. Event Attendees Table
CREATE TABLE IF NOT EXISTS public.event_attendees (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  rsvp_status TEXT CHECK (rsvp_status IN ('yes', 'no', 'maybe')),
  confirmed BOOLEAN DEFAULT false,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false,
  UNIQUE(event_id, user_id)
);

-- 8. Event Commission Tracking Table
CREATE TABLE IF NOT EXISTS public.event_commission_tracking (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  organizer_id TEXT NOT NULL,
  organizer_role TEXT,
  gross_revenue NUMERIC NOT NULL DEFAULT 0,
  platform_commission_rate NUMERIC NOT NULL,
  platform_commission NUMERIC NOT NULL DEFAULT 0,
  organizer_payout NUMERIC NOT NULL DEFAULT 0,
  commission_override_rate NUMERIC,
  payout_status TEXT DEFAULT 'pending' CHECK (payout_status IN ('pending', 'approved', 'paid', 'cancelled')),
  payout_date TIMESTAMPTZ,
  total_tickets_sold INTEGER DEFAULT 0,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 9. Event Organizers Table
CREATE TABLE IF NOT EXISTS public.event_organizers (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  organization_name TEXT,
  total_events INTEGER DEFAULT 0,
  total_attendees INTEGER DEFAULT 0,
  average_rating NUMERIC,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  commission_override_rate NUMERIC,
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- 10. Event Tickets Table
CREATE TABLE IF NOT EXISTS public.event_tickets (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  ticket_price NUMERIC NOT NULL,
  payment_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'refunded', 'used')),
  payment_method TEXT,
  purchased_date TIMESTAMPTZ DEFAULT now(),
  created_date TIMESTAMPTZ DEFAULT now(),
  updated_date TIMESTAMPTZ DEFAULT now(),
  created_by_id TEXT,
  created_by TEXT,
  is_sample BOOLEAN DEFAULT false
);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educators ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entity_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_commission_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_tickets ENABLE ROW LEVEL SECURITY;

-- =============================================
-- RLS Policies - Contact Inquiries
-- =============================================
CREATE POLICY "Users can view their inquiries"
  ON public.contact_inquiries FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "Anyone can create inquiries"
  ON public.contact_inquiries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update inquiries"
  ON public.contact_inquiries FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Courses
-- =============================================
CREATE POLICY "Anyone can view approved courses"
  ON public.courses FOR SELECT
  USING (status = 'approved' OR influencer_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Influencers can manage their courses"
  ON public.courses FOR ALL
  USING (influencer_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Course Enrollments
-- =============================================
CREATE POLICY "Users can view their enrollments"
  ON public.course_enrollments FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can create enrollments"
  ON public.course_enrollments FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Users can update their enrollments"
  ON public.course_enrollments FOR UPDATE
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS Policies - Educators
-- =============================================
CREATE POLICY "Anyone can view approved educators"
  ON public.educators FOR SELECT
  USING (status = 'approved' OR user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Educators can manage their profile"
  ON public.educators FOR ALL
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Entity Configurations
-- =============================================
CREATE POLICY "Users can view enabled configurations"
  ON public.entity_configurations FOR SELECT
  USING (enabled = true OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage configurations"
  ON public.entity_configurations FOR ALL
  USING (has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Events
-- =============================================
CREATE POLICY "Anyone can view events"
  ON public.events FOR SELECT
  USING (status != 'cancelled' OR organizer_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Organizers can manage their events"
  ON public.events FOR ALL
  USING (organizer_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Event Attendees
-- =============================================
CREATE POLICY "Users can view event attendees"
  ON public.event_attendees FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their attendance"
  ON public.event_attendees FOR ALL
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

-- =============================================
-- RLS Policies - Event Commission Tracking
-- =============================================
CREATE POLICY "Organizers can view their commissions"
  ON public.event_commission_tracking FOR SELECT
  USING (organizer_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

CREATE POLICY "System can create commission records"
  ON public.event_commission_tracking FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can update commissions"
  ON public.event_commission_tracking FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Event Organizers
-- =============================================
CREATE POLICY "Anyone can view approved organizers"
  ON public.event_organizers FOR SELECT
  USING (status = 'approved' OR user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Organizers can manage their profile"
  ON public.event_organizers FOR ALL
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- RLS Policies - Event Tickets
-- =============================================
CREATE POLICY "Users can view their tickets"
  ON public.event_tickets FOR SELECT
  USING (user_id = (auth.uid())::TEXT OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can purchase tickets"
  ON public.event_tickets FOR INSERT
  WITH CHECK (user_id = (auth.uid())::TEXT);

CREATE POLICY "Admins can update tickets"
  ON public.event_tickets FOR UPDATE
  USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- =============================================
-- Enable Realtime
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_inquiries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.courses;
ALTER PUBLICATION supabase_realtime ADD TABLE public.course_enrollments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.educators;
ALTER PUBLICATION supabase_realtime ADD TABLE public.entity_configurations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_attendees;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_commission_tracking;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_organizers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_tickets;

-- =============================================
-- Create Indexes for Performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON public.contact_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_user_id ON public.contact_inquiries(user_id);
CREATE INDEX IF NOT EXISTS idx_courses_influencer_id ON public.courses(influencer_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_category ON public.courses(category);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_course_id ON public.course_enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_course_enrollments_user_id ON public.course_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_educators_user_id ON public.educators(user_id);
CREATE INDEX IF NOT EXISTS idx_educators_status ON public.educators(status);
CREATE INDEX IF NOT EXISTS idx_entity_configurations_entity_name ON public.entity_configurations(entity_name);
CREATE INDEX IF NOT EXISTS idx_events_organizer_id ON public.events(organizer_id);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events(event_date DESC);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_event_attendees_event_id ON public.event_attendees(event_id);
CREATE INDEX IF NOT EXISTS idx_event_attendees_user_id ON public.event_attendees(user_id);
CREATE INDEX IF NOT EXISTS idx_event_commission_tracking_event_id ON public.event_commission_tracking(event_id);
CREATE INDEX IF NOT EXISTS idx_event_commission_tracking_organizer_id ON public.event_commission_tracking(organizer_id);
CREATE INDEX IF NOT EXISTS idx_event_organizers_user_id ON public.event_organizers(user_id);
CREATE INDEX IF NOT EXISTS idx_event_tickets_event_id ON public.event_tickets(event_id);
CREATE INDEX IF NOT EXISTS idx_event_tickets_user_id ON public.event_tickets(user_id);