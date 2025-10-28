/**
 * Supabase Entity Wrappers
 * Provides Base44-like interface using Supabase
 */
import { supabase } from '@/integrations/supabase/client';

// Helper function to create entity CRUD operations
const createEntity = (tableName) => ({
  async list(orderBy = '-created_date') {
    const isDescending = orderBy.startsWith('-');
    const column = isDescending ? orderBy.slice(1) : orderBy;
    
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .order(column, { ascending: !isDescending });
    
    if (error) throw error;
    return data || [];
  },

  async get(id) {
    const { data, error } = await supabase
      .from(tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  async filter(filters, orderBy = '-created_date', limit = null) {
    const isDescending = orderBy?.startsWith('-');
    const column = isDescending ? orderBy.slice(1) : orderBy;
    
    let query = supabase.from(tableName).select('*');
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
    
    // Apply ordering
    if (orderBy) {
      query = query.order(column, { ascending: !isDescending });
    }
    
    // Apply limit
    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async create(payload) {
    const { data, error } = await supabase
      .from(tableName)
      .insert(payload)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from(tableName)
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id) {
    const { error } = await supabase
      .from(tableName)
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  }
});

// Export all entities
export const Stock = createEntity('stocks');
export const ChatRoom = createEntity('chat_rooms');
export const Message = createEntity('messages');
export const Poll = createEntity('polls');
export const PollVote = createEntity('poll_votes');
export const Subscription = createEntity('subscriptions');
export const Pledge = createEntity('pledges');
export const FinInfluencer = createEntity('finfluencers');
export const InfluencerPost = createEntity('influencer_posts');
export const News = createEntity('news');
export const Meeting = createEntity('meetings');
export const StockPrice = createEntity('stock_prices');
export const ChatPoll = createEntity('chat_polls');
export const ChatPollVote = createEntity('chat_poll_votes');
export const Event = createEntity('events');
export const EventAttendee = createEntity('event_attendees');
export const TrustScoreLog = createEntity('trust_score_logs');
export const ModerationLog = createEntity('moderation_logs');
export const Referral = createEntity('referrals');
export const ReferralBadge = createEntity('referral_badges');
export const ContactInquiry = createEntity('contact_inquiries');
export const Notification = createEntity('notifications');
export const NotificationSetting = createEntity('notification_settings');
export const Course = createEntity('courses');
export const CourseEnrollment = createEntity('course_enrollments');
export const RevenueTransaction = createEntity('revenue_transactions');
export const Advisor = createEntity('advisors_base44');
export const AdvisorPlan = createEntity('advisor_plans_base44');
export const AdvisorSubscription = createEntity('advisor_subscriptions_base44');
export const AdvisorPost = createEntity('advisor_posts_base44');
export const CommissionTracking = createEntity('commission_tracking');
export const PlatformSetting = createEntity('platform_settings');
export const AdvisorReview = createEntity('advisor_reviews_base44');
export const Watchlist = createEntity('watchlists');
export const UserInvestment = createEntity('user_investments');
export const AlertSetting = createEntity('alert_settings');
export const StockTransaction = createEntity('stock_transactions');
export const Feedback = createEntity('feedback');
export const Expense = createEntity('expenses');
export const FinancialAuditLog = createEntity('financial_audit_logs');
export const Role = createEntity('roles');
export const AlertConfiguration = createEntity('alert_configurations');
export const AlertLog = createEntity('alert_logs');
export const SubscriptionPlan = createEntity('subscription_plans');
export const PromoCode = createEntity('promo_codes');
export const SubscriptionTransaction = createEntity('subscription_transactions');
export const EntityConfig = createEntity('entity_configurations');
export const Educator = createEntity('educators');
export const Permission = createEntity('permissions');
export const RolePermission = createEntity('role_permissions');
export const AuditLog = createEntity('audit_logs');
export const RoleTemplate = createEntity('role_templates');
export const RoleTemplatePermission = createEntity('role_template_permissions');
export const PayoutRequest = createEntity('payout_requests');
export const AdvisorRecommendation = createEntity('advisor_recommendations_base44');
export const UserInvite = createEntity('user_invites');
export const EventTicket = createEntity('event_tickets');
export const EventCommissionTracking = createEntity('event_commission_tracking');
export const CommissionSettings = createEntity('commission_settings');
export const PledgeSession = createEntity('pledge_sessions');
export const UserDematAccount = createEntity('user_demat_accounts');
export const PledgePayment = createEntity('pledge_payments');
export const PledgeExecutionRecord = createEntity('pledge_execution_records');
export const PledgeAuditLog = createEntity('pledge_audit_logs');
export const PledgeAccessRequest = createEntity('pledge_access_requests');
export const Vendor = createEntity('vendors');
export const AdCampaign = createEntity('ad_campaigns');
export const AdImpression = createEntity('ad_impressions');
export const AdClick = createEntity('ad_clicks');
export const AdTransaction = createEntity('ad_transactions');
export const CampaignBilling = createEntity('campaign_billing');
export const FundPlan = createEntity('fund_plans');
export const InvestorRequest = createEntity('investor_requests');
export const Investor = createEntity('investors');
export const FundWallet = createEntity('fund_wallets');
export const FundAllocation = createEntity('fund_allocations');
export const FundTransaction = createEntity('fund_transactions');
export const FundInvoice = createEntity('fund_invoices');
export const FundPayoutRequest = createEntity('fund_payout_requests');
export const FundAdmin = createEntity('fund_admins');
export const FundNotification = createEntity('fund_notifications');
export const FundWithdrawalRequest = createEntity('fund_withdrawal_requests');
export const InvestmentRequest = createEntity('investment_requests');
export const InvestmentAllocation = createEntity('investment_allocations');
export const ProfitPayoutSchedule = createEntity('profit_payout_schedules');
export const InvestorProfitPayout = createEntity('investor_profit_payouts');
export const FeatureConfig = createEntity('feature_configs');
export const ModuleApprovalRequest = createEntity('module_approval_requests');
export const Review = createEntity('reviews');
export const EventOrganizer = createEntity('event_organizers');
export const RefundRequest = createEntity('refund_requests');
export const PledgeOrder = createEntity('pledge_orders');
export const MessageReaction = createEntity('message_reactions');
export const TypingIndicator = createEntity('typing_indicators');
export const Ticket = createEntity('tickets');
export const SubEntity = createEntity('subscriptions');

// User auth wrapper using Supabase
export const User = {
  async me() {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) throw error;
    if (!user) return null;
    
    // Fetch profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
    
    return {
      id: user.id,
      email: user.email,
      ...profile
    };
  }
};
