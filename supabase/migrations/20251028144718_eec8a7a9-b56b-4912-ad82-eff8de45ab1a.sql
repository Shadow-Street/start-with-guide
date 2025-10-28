-- Create vendors table
CREATE TABLE IF NOT EXISTS public.vendors (
  id text PRIMARY KEY,
  user_id text NOT NULL,
  company_name text NOT NULL,
  website text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  total_spent numeric DEFAULT 0,
  created_date timestamptz DEFAULT now(),
  updated_date timestamptz DEFAULT now(),
  created_by_id text,
  created_by text,
  is_sample boolean DEFAULT false
);

-- Create watchlist table
CREATE TABLE IF NOT EXISTS public.watchlist (
  id text PRIMARY KEY,
  user_id text NOT NULL,
  stock_id text,
  stock_symbol text NOT NULL,
  stock_name text NOT NULL,
  added_price numeric,
  notes text,
  created_date timestamptz DEFAULT now(),
  updated_date timestamptz DEFAULT now(),
  created_by_id text,
  created_by text,
  is_sample boolean DEFAULT false
);

-- Enable RLS on both tables
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vendors
CREATE POLICY "Anyone can view approved vendors" ON public.vendors 
  FOR SELECT 
  USING (status = 'approved' OR user_id = auth.uid()::text OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Vendors can manage their profile" ON public.vendors 
  FOR ALL 
  USING (user_id = auth.uid()::text OR has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- RLS Policies for watchlist
CREATE POLICY "Users can view their watchlist" ON public.watchlist 
  FOR SELECT 
  USING (user_id = auth.uid()::text OR has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can manage their watchlist" ON public.watchlist 
  FOR ALL 
  USING (user_id = auth.uid()::text OR has_role(auth.uid(), 'admin'));

-- Enable Realtime for both tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.vendors;
ALTER PUBLICATION supabase_realtime ADD TABLE public.watchlist;

-- Add indexes for performance
CREATE INDEX idx_vendors_user ON public.vendors(user_id);
CREATE INDEX idx_vendors_status ON public.vendors(status);

CREATE INDEX idx_watchlist_user ON public.watchlist(user_id);
CREATE INDEX idx_watchlist_symbol ON public.watchlist(stock_symbol);