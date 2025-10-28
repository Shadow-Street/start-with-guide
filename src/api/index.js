// This file acts as your database abstraction layer.
// Right now it uses Supabase, but later you can switch to MySQL or another backend
// without changing any UI or page components.

import { supabase } from '@/integrations/supabase/client';

// Toggle this value later when you migrate to MySQL or another backend
const useSupabase = true;

export const api = {
  // Fetch all campaigns
  getCampaigns: async () => {
    if (useSupabase) {
      const { data, error } = await supabase
        .from('ad_campaigns')
        .select('*')
        .order('created_date', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const res = await fetch('/api/campaigns');
      return res.json();
    }
  },

  // Fetch advisors
  getAdvisors: async () => {
    if (useSupabase) {
      const { data, error } = await supabase
        .from('advisors_base44')
        .select('*')
        .eq('status', 'approved')
        .order('success_rate', { ascending: false });
      if (error) throw error;
      return data;
    } else {
      const res = await fetch('/api/advisors');
      return res.json();
    }
  },

  // Fetch posts
  getAdvisorPosts: async () => {
    if (useSupabase) {
      const { data, error } = await supabase
        .from('advisor_posts_base44')
        .select(`
          *,
          advisors_base44 (
            display_name,
            profile_image_url
          )
        `)
        .eq('status', 'published');
      if (error) throw error;
      return data;
    } else {
      const res = await fetch('/api/advisor-posts');
      return res.json();
    }
  },

  // Add campaign
  addCampaign: async (payload) => {
    if (useSupabase) {
      const { data, error } = await supabase.from('ad_campaigns').insert([payload]);
      if (error) throw error;
      return data;
    } else {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },
};

// Legacy exports for backward compatibility
export { base44 } from './base44Client';
export * from './entities';
export * from './integrations';
