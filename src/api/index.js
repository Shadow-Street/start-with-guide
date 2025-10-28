// This file acts as your database abstraction layer.
// Right now it uses Base44 SDK/Supabase, but later you can switch to MySQL or another backend
// without changing any UI or page components.

import { supabase } from '@/integrations/supabase/client';
import * as Entities from './entities';

// Toggle this value later when you migrate to MySQL or another backend
const useSupabase = true;

export const api = {
  // ============= AD CAMPAIGNS =============
  getCampaigns: async () => {
    if (useSupabase) {
      return await Entities.AdCampaign.list();
    } else {
      const res = await fetch('/api/campaigns');
      return res.json();
    }
  },

  addCampaign: async (payload) => {
    if (useSupabase) {
      return await Entities.AdCampaign.create(payload);
    } else {
      const res = await fetch('/api/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  updateCampaign: async (id, payload) => {
    if (useSupabase) {
      return await Entities.AdCampaign.update(id, payload);
    } else {
      const res = await fetch(`/api/campaigns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  deleteCampaign: async (id) => {
    if (useSupabase) {
      return await Entities.AdCampaign.delete(id);
    } else {
      await fetch(`/api/campaigns/${id}`, { method: 'DELETE' });
    }
  },

  // ============= ADVISORS =============
  getAdvisors: async (filters = {}) => {
    if (useSupabase) {
      if (filters.status) {
        return await Entities.Advisor.filter({ status: filters.status }, '-success_rate');
      }
      return await Entities.Advisor.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/advisors?${query}`);
      return res.json();
    }
  },

  getAdvisorById: async (id) => {
    if (useSupabase) {
      return await Entities.Advisor.get(id);
    } else {
      const res = await fetch(`/api/advisors/${id}`);
      return res.json();
    }
  },

  addAdvisor: async (payload) => {
    if (useSupabase) {
      return await Entities.Advisor.create(payload);
    } else {
      const res = await fetch('/api/advisors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  updateAdvisor: async (id, payload) => {
    if (useSupabase) {
      return await Entities.Advisor.update(id, payload);
    } else {
      const res = await fetch(`/api/advisors/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  // ============= ADVISOR POSTS =============
  getAdvisorPosts: async (filters = {}) => {
    if (useSupabase) {
      if (filters.status) {
        return await Entities.AdvisorPost.filter({ status: filters.status }, '-created_date');
      }
      return await Entities.AdvisorPost.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/advisor-posts?${query}`);
      return res.json();
    }
  },

  addAdvisorPost: async (payload) => {
    if (useSupabase) {
      return await Entities.AdvisorPost.create(payload);
    } else {
      const res = await fetch('/api/advisor-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  // ============= FUND ALLOCATIONS =============
  getFundAllocations: async (filters = {}) => {
    if (useSupabase) {
      if (filters.status) {
        return await Entities.FundAllocation.filter(filters, '-created_date');
      }
      return await Entities.FundAllocation.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/fund-allocations?${query}`);
      return res.json();
    }
  },

  addFundAllocation: async (payload) => {
    if (useSupabase) {
      return await Entities.FundAllocation.create(payload);
    } else {
      const res = await fetch('/api/fund-allocations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  updateFundAllocation: async (id, payload) => {
    if (useSupabase) {
      return await Entities.FundAllocation.update(id, payload);
    } else {
      const res = await fetch(`/api/fund-allocations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  // ============= INVESTMENT REQUESTS =============
  getInvestmentRequests: async (filters = {}) => {
    if (useSupabase) {
      if (Object.keys(filters).length > 0) {
        return await Entities.InvestmentRequest.filter(filters, '-created_date');
      }
      return await Entities.InvestmentRequest.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/investment-requests?${query}`);
      return res.json();
    }
  },

  updateInvestmentRequest: async (id, payload) => {
    if (useSupabase) {
      return await Entities.InvestmentRequest.update(id, payload);
    } else {
      const res = await fetch(`/api/investment-requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  // ============= INVESTORS =============
  getInvestors: async () => {
    if (useSupabase) {
      return await Entities.Investor.list();
    } else {
      const res = await fetch('/api/investors');
      return res.json();
    }
  },

  getInvestorById: async (id) => {
    if (useSupabase) {
      return await Entities.Investor.get(id);
    } else {
      const res = await fetch(`/api/investors/${id}`);
      return res.json();
    }
  },

  // ============= FUND PLANS =============
  getFundPlans: async () => {
    if (useSupabase) {
      return await Entities.FundPlan.list();
    } else {
      const res = await fetch('/api/fund-plans');
      return res.json();
    }
  },

  // ============= FUND WALLETS =============
  getFundWallets: async (filters = {}) => {
    if (useSupabase) {
      if (filters.investor_id) {
        return await Entities.FundWallet.filter(filters);
      }
      return await Entities.FundWallet.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/fund-wallets?${query}`);
      return res.json();
    }
  },

  updateFundWallet: async (id, payload) => {
    if (useSupabase) {
      return await Entities.FundWallet.update(id, payload);
    } else {
      const res = await fetch(`/api/fund-wallets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  // ============= CHAT ROOMS =============
  getChatRooms: async () => {
    if (useSupabase) {
      return await Entities.ChatRoom.list();
    } else {
      const res = await fetch('/api/chat-rooms');
      return res.json();
    }
  },

  // ============= MESSAGES =============
  getMessages: async (filters = {}) => {
    if (useSupabase) {
      if (Object.keys(filters).length > 0) {
        return await Entities.Message.filter(filters, '-created_date');
      }
      return await Entities.Message.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/messages?${query}`);
      return res.json();
    }
  },

  addMessage: async (payload) => {
    if (useSupabase) {
      return await Entities.Message.create(payload);
    } else {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  // ============= EVENTS =============
  getEvents: async (filters = {}) => {
    if (useSupabase) {
      if (Object.keys(filters).length > 0) {
        return await Entities.Event.filter(filters, '-created_date');
      }
      return await Entities.Event.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/events?${query}`);
      return res.json();
    }
  },

  addEvent: async (payload) => {
    if (useSupabase) {
      return await Entities.Event.create(payload);
    } else {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  updateEvent: async (id, payload) => {
    if (useSupabase) {
      return await Entities.Event.update(id, payload);
    } else {
      const res = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  deleteEvent: async (id) => {
    if (useSupabase) {
      return await Entities.Event.delete(id);
    } else {
      await fetch(`/api/events/${id}`, { method: 'DELETE' });
    }
  },

  // ============= STOCKS =============
  getStocks: async (filters = {}) => {
    if (useSupabase) {
      if (filters.is_trending) {
        return await Entities.Stock.filter({ is_trending: true }, '-market_cap');
      }
      return await Entities.Stock.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/stocks?${query}`);
      return res.json();
    }
  },

  getStockBySymbol: async (symbol) => {
    if (useSupabase) {
      const stocks = await Entities.Stock.filter({ symbol });
      return stocks && stocks.length > 0 ? stocks[0] : null;
    } else {
      const res = await fetch(`/api/stocks/${symbol}`);
      return res.json();
    }
  },

  // ============= WATCHLIST =============
  getWatchlist: async (userId) => {
    if (useSupabase) {
      return await Entities.Watchlist.filter({ user_id: userId }, '-created_date');
    } else {
      const res = await fetch(`/api/watchlist?user_id=${userId}`);
      return res.json();
    }
  },

  addToWatchlist: async (payload) => {
    if (useSupabase) {
      return await Entities.Watchlist.create(payload);
    } else {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  removeFromWatchlist: async (id) => {
    if (useSupabase) {
      return await Entities.Watchlist.delete(id);
    } else {
      await fetch(`/api/watchlist/${id}`, { method: 'DELETE' });
    }
  },

  // ============= USER INVESTMENTS =============
  getUserInvestments: async (userId) => {
    if (useSupabase) {
      return await Entities.UserInvestment.filter({ user_id: userId }, '-created_date');
    } else {
      const res = await fetch(`/api/user-investments?user_id=${userId}`);
      return res.json();
    }
  },

  addUserInvestment: async (payload) => {
    if (useSupabase) {
      return await Entities.UserInvestment.create(payload);
    } else {
      const res = await fetch('/api/user-investments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  // ============= SUBSCRIPTIONS =============
  getSubscriptions: async (filters = {}) => {
    if (useSupabase) {
      try {
        let query = supabase
          .from('subscriptions')
          .select('*')
          .order('created_date', { ascending: false });

        // Apply filters
        if (filters.user_id) {
          query = query.eq('user_id', filters.user_id);
        }
        if (filters.status) {
          query = query.eq('status', filters.status);
        }

        const { data, error } = await query;
        
        if (error) {
          console.error('Error fetching subscriptions:', error);
          return [];
        }
        
        return data || [];
      } catch (err) {
        console.error('Error in getSubscriptions:', err);
        return [];
      }
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/subscriptions?${query}`);
      return res.json();
    }
  },

  getSubscriptionPlans: async () => {
    if (useSupabase) {
      return await Entities.SubscriptionPlan.filter({ is_active: true });
    } else {
      const res = await fetch('/api/subscription-plans');
      return res.json();
    }
  },

  // ============= POLLS =============
  getPolls: async (filters = {}) => {
    if (useSupabase) {
      if (Object.keys(filters).length > 0) {
        return await Entities.Poll.filter(filters, '-created_date');
      }
      return await Entities.Poll.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/polls?${query}`);
      return res.json();
    }
  },

  addPoll: async (payload) => {
    if (useSupabase) {
      return await Entities.Poll.create(payload);
    } else {
      const res = await fetch('/api/polls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  // ============= PLEDGES =============
  getPledges: async (filters = {}) => {
    if (useSupabase) {
      if (Object.keys(filters).length > 0) {
        return await Entities.Pledge.filter(filters, '-created_date');
      }
      return await Entities.Pledge.list();
    } else {
      const query = new URLSearchParams(filters);
      const res = await fetch(`/api/pledges?${query}`);
      return res.json();
    }
  },

  addPledge: async (payload) => {
    if (useSupabase) {
      return await Entities.Pledge.create(payload);
    } else {
      const res = await fetch('/api/pledges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },

  updatePledge: async (id, payload) => {
    if (useSupabase) {
      return await Entities.Pledge.update(id, payload);
    } else {
      const res = await fetch(`/api/pledges/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return res.json();
    }
  },
};

// Legacy exports for backward compatibility (components not yet refactored)
export { base44 } from './base44Client';
export * from './entities';
export * from './integrations';
