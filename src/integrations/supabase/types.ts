export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ad_campaigns: {
        Row: {
          billing_model: string | null
          clicks: number | null
          cpc_rate: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          creative_url: string | null
          cta_link: string | null
          description: string | null
          end_date: string | null
          id: string
          impressions: number | null
          is_sample: boolean | null
          monthly_fee: number | null
          rejection_reason: string | null
          revenue_generated: number | null
          start_date: string | null
          status: string | null
          title: string
          updated_date: string | null
          vendor_id: string | null
          weekly_fee: number | null
        }
        Insert: {
          billing_model?: string | null
          clicks?: number | null
          cpc_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          creative_url?: string | null
          cta_link?: string | null
          description?: string | null
          end_date?: string | null
          id: string
          impressions?: number | null
          is_sample?: boolean | null
          monthly_fee?: number | null
          rejection_reason?: string | null
          revenue_generated?: number | null
          start_date?: string | null
          status?: string | null
          title: string
          updated_date?: string | null
          vendor_id?: string | null
          weekly_fee?: number | null
        }
        Update: {
          billing_model?: string | null
          clicks?: number | null
          cpc_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          creative_url?: string | null
          cta_link?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          impressions?: number | null
          is_sample?: boolean | null
          monthly_fee?: number | null
          rejection_reason?: string | null
          revenue_generated?: number | null
          start_date?: string | null
          status?: string | null
          title?: string
          updated_date?: string | null
          vendor_id?: string | null
          weekly_fee?: number | null
        }
        Relationships: []
      }
      ad_clicks: {
        Row: {
          campaign_id: string | null
          cost: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          updated_date: string | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          cost?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          updated_date?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          cost?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          updated_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_clicks_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_impressions: {
        Row: {
          campaign_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          updated_date: string | null
          user_id: string | null
        }
        Insert: {
          campaign_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          updated_date?: string | null
          user_id?: string | null
        }
        Update: {
          campaign_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          updated_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_impressions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      ad_transactions: {
        Row: {
          amount: number | null
          campaign_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          payment_method: string | null
          payment_status: string | null
          transaction_date: string | null
          transaction_type: string | null
          updated_date: string | null
          vendor_id: string | null
        }
        Insert: {
          amount?: number | null
          campaign_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          payment_method?: string | null
          payment_status?: string | null
          transaction_date?: string | null
          transaction_type?: string | null
          updated_date?: string | null
          vendor_id?: string | null
        }
        Update: {
          amount?: number | null
          campaign_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          payment_method?: string | null
          payment_status?: string | null
          transaction_date?: string | null
          transaction_type?: string | null
          updated_date?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ad_transactions_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "ad_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_audit_log: {
        Row: {
          action: string
          admin_user_id: string | null
          changes: Json | null
          created_at: string | null
          id: string
          ip_address: string | null
          target_id: string | null
          target_table: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id?: string | null
          changes?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string | null
          changes?: Json | null
          created_at?: string | null
          id?: string
          ip_address?: string | null
          target_id?: string | null
          target_table?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      advisor_plans_base44: {
        Row: {
          advisor_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          duration_days: number | null
          features: Json | null
          id: string
          is_active: boolean | null
          is_sample: boolean | null
          plan_name: string
          price: number
          updated_date: string | null
        }
        Insert: {
          advisor_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          duration_days?: number | null
          features?: Json | null
          id: string
          is_active?: boolean | null
          is_sample?: boolean | null
          plan_name: string
          price: number
          updated_date?: string | null
        }
        Update: {
          advisor_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          duration_days?: number | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          is_sample?: boolean | null
          plan_name?: string
          price?: number
          updated_date?: string | null
        }
        Relationships: []
      }
      advisor_posts_base44: {
        Row: {
          advisor_id: string
          content: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          post_type: string | null
          recommendation_type: string | null
          required_plan_id: string | null
          status: string | null
          stock_symbol: string | null
          stop_loss: number | null
          target_price: number | null
          time_horizon: string | null
          title: string
          updated_date: string | null
        }
        Insert: {
          advisor_id: string
          content: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          post_type?: string | null
          recommendation_type?: string | null
          required_plan_id?: string | null
          status?: string | null
          stock_symbol?: string | null
          stop_loss?: number | null
          target_price?: number | null
          time_horizon?: string | null
          title: string
          updated_date?: string | null
        }
        Update: {
          advisor_id?: string
          content?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          post_type?: string | null
          recommendation_type?: string | null
          required_plan_id?: string | null
          status?: string | null
          stock_symbol?: string | null
          stop_loss?: number | null
          target_price?: number | null
          time_horizon?: string | null
          title?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      advisor_recommendations_base44: {
        Row: {
          advisor_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          entry_price: number | null
          id: string
          is_sample: boolean | null
          post_id: string | null
          rationale: string | null
          recommendation_type: string
          risk_level: string | null
          status: string | null
          stock_symbol: string
          stop_loss: number | null
          target_price: number | null
          time_horizon: string | null
          updated_date: string | null
        }
        Insert: {
          advisor_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entry_price?: number | null
          id: string
          is_sample?: boolean | null
          post_id?: string | null
          rationale?: string | null
          recommendation_type: string
          risk_level?: string | null
          status?: string | null
          stock_symbol: string
          stop_loss?: number | null
          target_price?: number | null
          time_horizon?: string | null
          updated_date?: string | null
        }
        Update: {
          advisor_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entry_price?: number | null
          id?: string
          is_sample?: boolean | null
          post_id?: string | null
          rationale?: string | null
          recommendation_type?: string
          risk_level?: string | null
          status?: string | null
          stock_symbol?: string
          stop_loss?: number | null
          target_price?: number | null
          time_horizon?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      advisor_reviews_base44: {
        Row: {
          advisor_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          is_verified: boolean | null
          rating: number | null
          review_text: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          advisor_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          is_verified?: boolean | null
          rating?: number | null
          review_text?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          advisor_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          is_verified?: boolean | null
          rating?: number | null
          review_text?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      advisor_subscriptions_base44: {
        Row: {
          advisor_id: string | null
          amount_paid: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          end_date: string | null
          id: string
          is_sample: boolean | null
          payment_status: string | null
          plan_id: string | null
          start_date: string | null
          status: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          advisor_id?: string | null
          amount_paid?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          end_date?: string | null
          id: string
          is_sample?: boolean | null
          payment_status?: string | null
          plan_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          advisor_id?: string | null
          amount_paid?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          end_date?: string | null
          id?: string
          is_sample?: boolean | null
          payment_status?: string | null
          plan_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      advisors_base44: {
        Row: {
          bio: string | null
          commission_override_rate: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          display_name: string
          follower_count: number | null
          id: string
          is_sample: boolean | null
          profile_image_url: string | null
          sebi_document_url: string | null
          sebi_registration_number: string | null
          specialization: Json | null
          status: string | null
          success_rate: number | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          commission_override_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name: string
          follower_count?: number | null
          id: string
          is_sample?: boolean | null
          profile_image_url?: string | null
          sebi_document_url?: string | null
          sebi_registration_number?: string | null
          specialization?: Json | null
          status?: string | null
          success_rate?: number | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          commission_override_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name?: string
          follower_count?: number | null
          id?: string
          is_sample?: boolean | null
          profile_image_url?: string | null
          sebi_document_url?: string | null
          sebi_registration_number?: string | null
          specialization?: Json | null
          status?: string | null
          success_rate?: number | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      alert_configurations: {
        Row: {
          alert_type: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          email_enabled: boolean | null
          id: string
          is_enabled: boolean | null
          is_sample: boolean | null
          push_enabled: boolean | null
          severity: string | null
          threshold_value: number | null
          updated_date: string | null
        }
        Insert: {
          alert_type: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          email_enabled?: boolean | null
          id: string
          is_enabled?: boolean | null
          is_sample?: boolean | null
          push_enabled?: boolean | null
          severity?: string | null
          threshold_value?: number | null
          updated_date?: string | null
        }
        Update: {
          alert_type?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          email_enabled?: boolean | null
          id?: string
          is_enabled?: boolean | null
          is_sample?: boolean | null
          push_enabled?: boolean | null
          severity?: string | null
          threshold_value?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      alert_logs: {
        Row: {
          action_taken: string | null
          admin_notes: string | null
          alert_type: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          is_sample: boolean | null
          message: string | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string | null
          status: string | null
          stock_symbol: string | null
          threshold_value: number | null
          title: string
          triggered_value: number | null
          updated_date: string | null
        }
        Insert: {
          action_taken?: string | null
          admin_notes?: string | null
          alert_type: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id: string
          is_sample?: boolean | null
          message?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          status?: string | null
          stock_symbol?: string | null
          threshold_value?: number | null
          title: string
          triggered_value?: number | null
          updated_date?: string | null
        }
        Update: {
          action_taken?: string | null
          admin_notes?: string | null
          alert_type?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_sample?: boolean | null
          message?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string | null
          status?: string | null
          stock_symbol?: string | null
          threshold_value?: number | null
          title?: string
          triggered_value?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      alert_settings: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          daily_portfolio_summary: boolean | null
          email_notifications_enabled: boolean | null
          id: string
          is_active: boolean | null
          is_sample: boolean | null
          last_consensus: string | null
          last_price_alert: number | null
          loss_limit_percent: number | null
          notify_on_advisor_update: boolean | null
          notify_on_consensus_change: boolean | null
          price_change_percent: number | null
          profit_target_percent: number | null
          push_notifications_enabled: boolean | null
          stock_symbol: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          daily_portfolio_summary?: boolean | null
          email_notifications_enabled?: boolean | null
          id: string
          is_active?: boolean | null
          is_sample?: boolean | null
          last_consensus?: string | null
          last_price_alert?: number | null
          loss_limit_percent?: number | null
          notify_on_advisor_update?: boolean | null
          notify_on_consensus_change?: boolean | null
          price_change_percent?: number | null
          profit_target_percent?: number | null
          push_notifications_enabled?: boolean | null
          stock_symbol?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          daily_portfolio_summary?: boolean | null
          email_notifications_enabled?: boolean | null
          id?: string
          is_active?: boolean | null
          is_sample?: boolean | null
          last_consensus?: string | null
          last_price_alert?: number | null
          loss_limit_percent?: number | null
          notify_on_advisor_update?: boolean | null
          notify_on_consensus_change?: boolean | null
          price_change_percent?: number | null
          profit_target_percent?: number | null
          push_notifications_enabled?: boolean | null
          stock_symbol?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      campaign_billing: {
        Row: {
          amount_due: number
          amount_paid: number | null
          billing_model: string | null
          billing_period_end: string
          billing_period_start: string
          campaign_id: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          invoice_url: string | null
          is_sample: boolean | null
          payment_date: string | null
          payment_status: string | null
          total_clicks: number | null
          total_impressions: number | null
          updated_date: string | null
          vendor_id: string
        }
        Insert: {
          amount_due?: number
          amount_paid?: number | null
          billing_model?: string | null
          billing_period_end: string
          billing_period_start: string
          campaign_id: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          invoice_url?: string | null
          is_sample?: boolean | null
          payment_date?: string | null
          payment_status?: string | null
          total_clicks?: number | null
          total_impressions?: number | null
          updated_date?: string | null
          vendor_id: string
        }
        Update: {
          amount_due?: number
          amount_paid?: number | null
          billing_model?: string | null
          billing_period_end?: string
          billing_period_start?: string
          campaign_id?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          invoice_url?: string | null
          is_sample?: boolean | null
          payment_date?: string | null
          payment_status?: string | null
          total_clicks?: number | null
          total_impressions?: number | null
          updated_date?: string | null
          vendor_id?: string
        }
        Relationships: []
      }
      chat_poll_votes: {
        Row: {
          chat_poll_id: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          updated_date: string | null
          user_id: string
          vote: string | null
          vote_date: string
        }
        Insert: {
          chat_poll_id: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          updated_date?: string | null
          user_id: string
          vote?: string | null
          vote_date: string
        }
        Update: {
          chat_poll_id?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          updated_date?: string | null
          user_id?: string
          vote?: string | null
          vote_date?: string
        }
        Relationships: []
      }
      chat_polls: {
        Row: {
          buy_votes: number | null
          chat_room_id: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          hold_votes: number | null
          id: string
          is_active: boolean | null
          is_sample: boolean | null
          poll_date: string
          sell_votes: number | null
          stock_symbol: string | null
          total_votes: number | null
          updated_date: string | null
        }
        Insert: {
          buy_votes?: number | null
          chat_room_id: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          hold_votes?: number | null
          id: string
          is_active?: boolean | null
          is_sample?: boolean | null
          poll_date: string
          sell_votes?: number | null
          stock_symbol?: string | null
          total_votes?: number | null
          updated_date?: string | null
        }
        Update: {
          buy_votes?: number | null
          chat_room_id?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          hold_votes?: number | null
          id?: string
          is_active?: boolean | null
          is_sample?: boolean | null
          poll_date?: string
          sell_votes?: number | null
          stock_symbol?: string | null
          total_votes?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      chat_rooms: {
        Row: {
          admin_only_post: boolean | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          id: string
          is_meeting_active: boolean | null
          is_premium: boolean | null
          is_sample: boolean | null
          meeting_url: string | null
          name: string
          participant_count: number | null
          required_plan: string | null
          room_type: string | null
          stock_symbol: string | null
          success_rate: number | null
          updated_date: string | null
        }
        Insert: {
          admin_only_post?: boolean | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id: string
          is_meeting_active?: boolean | null
          is_premium?: boolean | null
          is_sample?: boolean | null
          meeting_url?: string | null
          name: string
          participant_count?: number | null
          required_plan?: string | null
          room_type?: string | null
          stock_symbol?: string | null
          success_rate?: number | null
          updated_date?: string | null
        }
        Update: {
          admin_only_post?: boolean | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id?: string
          is_meeting_active?: boolean | null
          is_premium?: boolean | null
          is_sample?: boolean | null
          meeting_url?: string | null
          name?: string
          participant_count?: number | null
          required_plan?: string | null
          room_type?: string | null
          stock_symbol?: string | null
          success_rate?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          content: string
          created_at: string
          discussion_id: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          discussion_id: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          discussion_id?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      commission_settings: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          default_rate: number
          description: string | null
          entity_type: string
          id: string
          is_active: boolean | null
          is_sample: boolean | null
          minimum_payout_threshold: number | null
          overrides: Json | null
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          default_rate: number
          description?: string | null
          entity_type: string
          id: string
          is_active?: boolean | null
          is_sample?: boolean | null
          minimum_payout_threshold?: number | null
          overrides?: Json | null
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          default_rate?: number
          description?: string | null
          entity_type?: string
          id?: string
          is_active?: boolean | null
          is_sample?: boolean | null
          minimum_payout_threshold?: number | null
          overrides?: Json | null
          updated_date?: string | null
        }
        Relationships: []
      }
      commission_tracking: {
        Row: {
          base_amount: number
          commission_amount: number
          commission_rate: number
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          entity_id: string
          entity_type: string
          id: string
          is_sample: boolean | null
          notes: string | null
          payout_date: string | null
          status: string | null
          transaction_id: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          base_amount: number
          commission_amount: number
          commission_rate: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entity_id: string
          entity_type: string
          id: string
          is_sample?: boolean | null
          notes?: string | null
          payout_date?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          base_amount?: number
          commission_amount?: number
          commission_rate?: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          is_sample?: boolean | null
          notes?: string | null
          payout_date?: string | null
          status?: string | null
          transaction_id?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      contact_inquiries: {
        Row: {
          admin_notes: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          email: string
          full_name: string
          id: string
          is_sample: boolean | null
          message: string
          mobile_number: string | null
          status: string | null
          subject: string
          updated_date: string | null
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          email: string
          full_name: string
          id: string
          is_sample?: boolean | null
          message: string
          mobile_number?: string | null
          status?: string | null
          subject: string
          updated_date?: string | null
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          email?: string
          full_name?: string
          id?: string
          is_sample?: boolean | null
          message?: string
          mobile_number?: string | null
          status?: string | null
          subject?: string
          updated_date?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          amount_paid: number
          completion_date: string | null
          course_id: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          enrollment_status: string | null
          id: string
          influencer_payout: number | null
          is_sample: boolean | null
          payment_id: string | null
          platform_commission: number | null
          rating: number | null
          review: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          amount_paid: number
          completion_date?: string | null
          course_id: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          enrollment_status?: string | null
          id: string
          influencer_payout?: number | null
          is_sample?: boolean | null
          payment_id?: string | null
          platform_commission?: number | null
          rating?: number | null
          review?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          amount_paid?: number
          completion_date?: string | null
          course_id?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          enrollment_status?: string | null
          id?: string
          influencer_payout?: number | null
          is_sample?: boolean | null
          payment_id?: string | null
          platform_commission?: number | null
          rating?: number | null
          review?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          category: string | null
          course_type: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          current_enrollments: number | null
          curriculum: Json | null
          description: string | null
          difficulty_level: string | null
          duration_hours: number | null
          id: string
          influencer_id: string
          is_sample: boolean | null
          max_participants: number | null
          meeting_link: string | null
          prerequisites: string | null
          price: number
          scheduled_date: string | null
          status: string | null
          title: string
          total_revenue: number | null
          updated_date: string | null
        }
        Insert: {
          category?: string | null
          course_type?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_enrollments?: number | null
          curriculum?: Json | null
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          id: string
          influencer_id: string
          is_sample?: boolean | null
          max_participants?: number | null
          meeting_link?: string | null
          prerequisites?: string | null
          price: number
          scheduled_date?: string | null
          status?: string | null
          title: string
          total_revenue?: number | null
          updated_date?: string | null
        }
        Update: {
          category?: string | null
          course_type?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_enrollments?: number | null
          curriculum?: Json | null
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          id?: string
          influencer_id?: string
          is_sample?: boolean | null
          max_participants?: number | null
          meeting_link?: string | null
          prerequisites?: string | null
          price?: number
          scheduled_date?: string | null
          status?: string | null
          title?: string
          total_revenue?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      discussions: {
        Row: {
          content: string
          created_at: string
          id: string
          stock_symbol: string | null
          title: string
          updated_at: string
          user_id: string
          views: number | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          stock_symbol?: string | null
          title: string
          updated_at?: string
          user_id: string
          views?: number | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          stock_symbol?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "discussions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      educators: {
        Row: {
          average_rating: number | null
          bio: string | null
          commission_override_rate: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          display_name: string
          experience_years: number | null
          id: string
          is_sample: boolean | null
          profile_image_url: string | null
          qualifications: string | null
          specialization: Json | null
          status: string | null
          total_courses: number | null
          total_students: number | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          average_rating?: number | null
          bio?: string | null
          commission_override_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name: string
          experience_years?: number | null
          id: string
          is_sample?: boolean | null
          profile_image_url?: string | null
          qualifications?: string | null
          specialization?: Json | null
          status?: string | null
          total_courses?: number | null
          total_students?: number | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          average_rating?: number | null
          bio?: string | null
          commission_override_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name?: string
          experience_years?: number | null
          id?: string
          is_sample?: boolean | null
          profile_image_url?: string | null
          qualifications?: string | null
          specialization?: Json | null
          status?: string | null
          total_courses?: number | null
          total_students?: number | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      entity_configurations: {
        Row: {
          action_button_label: string | null
          admin_visible: boolean | null
          color: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          display_name: string
          enabled: boolean | null
          entity_name: string
          icon_name: string | null
          id: string
          is_sample: boolean | null
          management_enabled: boolean | null
          sort_order: number | null
          status_field: string | null
          updated_date: string | null
          user_visible: boolean | null
        }
        Insert: {
          action_button_label?: string | null
          admin_visible?: boolean | null
          color?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          display_name: string
          enabled?: boolean | null
          entity_name: string
          icon_name?: string | null
          id: string
          is_sample?: boolean | null
          management_enabled?: boolean | null
          sort_order?: number | null
          status_field?: string | null
          updated_date?: string | null
          user_visible?: boolean | null
        }
        Update: {
          action_button_label?: string | null
          admin_visible?: boolean | null
          color?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          display_name?: string
          enabled?: boolean | null
          entity_name?: string
          icon_name?: string | null
          id?: string
          is_sample?: boolean | null
          management_enabled?: boolean | null
          sort_order?: number | null
          status_field?: string | null
          updated_date?: string | null
          user_visible?: boolean | null
        }
        Relationships: []
      }
      event_attendees: {
        Row: {
          confirmed: boolean | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          event_id: string
          id: string
          is_sample: boolean | null
          rsvp_status: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          confirmed?: boolean | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          event_id: string
          id: string
          is_sample?: boolean | null
          rsvp_status?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          confirmed?: boolean | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          event_id?: string
          id?: string
          is_sample?: boolean | null
          rsvp_status?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      event_commission_tracking: {
        Row: {
          commission_override_rate: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          event_id: string
          gross_revenue: number
          id: string
          is_sample: boolean | null
          organizer_id: string
          organizer_payout: number
          organizer_role: string | null
          payout_date: string | null
          payout_status: string | null
          platform_commission: number
          platform_commission_rate: number
          total_tickets_sold: number | null
          updated_date: string | null
        }
        Insert: {
          commission_override_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          event_id: string
          gross_revenue?: number
          id: string
          is_sample?: boolean | null
          organizer_id: string
          organizer_payout?: number
          organizer_role?: string | null
          payout_date?: string | null
          payout_status?: string | null
          platform_commission?: number
          platform_commission_rate: number
          total_tickets_sold?: number | null
          updated_date?: string | null
        }
        Update: {
          commission_override_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          event_id?: string
          gross_revenue?: number
          id?: string
          is_sample?: boolean | null
          organizer_id?: string
          organizer_payout?: number
          organizer_role?: string | null
          payout_date?: string | null
          payout_status?: string | null
          platform_commission?: number
          platform_commission_rate?: number
          total_tickets_sold?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      event_organizers: {
        Row: {
          average_rating: number | null
          bio: string | null
          commission_override_rate: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          display_name: string
          id: string
          is_sample: boolean | null
          organization_name: string | null
          profile_image_url: string | null
          status: string | null
          total_attendees: number | null
          total_events: number | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          average_rating?: number | null
          bio?: string | null
          commission_override_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name: string
          id: string
          is_sample?: boolean | null
          organization_name?: string | null
          profile_image_url?: string | null
          status?: string | null
          total_attendees?: number | null
          total_events?: number | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          average_rating?: number | null
          bio?: string | null
          commission_override_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name?: string
          id?: string
          is_sample?: boolean | null
          organization_name?: string | null
          profile_image_url?: string | null
          status?: string | null
          total_attendees?: number | null
          total_events?: number | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      event_tickets: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          event_id: string
          id: string
          is_sample: boolean | null
          payment_id: string | null
          payment_method: string | null
          purchased_date: string | null
          status: string | null
          ticket_price: number
          updated_date: string | null
          user_id: string
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          event_id: string
          id: string
          is_sample?: boolean | null
          payment_id?: string | null
          payment_method?: string | null
          purchased_date?: string | null
          status?: string | null
          ticket_price: number
          updated_date?: string | null
          user_id: string
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          event_id?: string
          id?: string
          is_sample?: boolean | null
          payment_id?: string | null
          payment_method?: string | null
          purchased_date?: string | null
          status?: string | null
          ticket_price?: number
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          admin_notes: string | null
          capacity: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          event_date: string
          id: string
          is_featured: boolean | null
          is_premium: boolean | null
          is_sample: boolean | null
          location: string | null
          organizer_id: string
          organizer_name: string | null
          status: string | null
          ticket_price: number | null
          title: string
          updated_date: string | null
        }
        Insert: {
          admin_notes?: string | null
          capacity?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          event_date: string
          id: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          is_sample?: boolean | null
          location?: string | null
          organizer_id: string
          organizer_name?: string | null
          status?: string | null
          ticket_price?: number | null
          title: string
          updated_date?: string | null
        }
        Update: {
          admin_notes?: string | null
          capacity?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          event_date?: string
          id?: string
          is_featured?: boolean | null
          is_premium?: boolean | null
          is_sample?: boolean | null
          location?: string | null
          organizer_id?: string
          organizer_name?: string | null
          status?: string | null
          ticket_price?: number | null
          title?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      expenses: {
        Row: {
          added_by_admin_id: string | null
          added_by_admin_name: string | null
          amount: number
          category: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          expense_date: string
          id: string
          is_sample: boolean | null
          updated_date: string | null
        }
        Insert: {
          added_by_admin_id?: string | null
          added_by_admin_name?: string | null
          amount: number
          category: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          expense_date: string
          id: string
          is_sample?: boolean | null
          updated_date?: string | null
        }
        Update: {
          added_by_admin_id?: string | null
          added_by_admin_name?: string | null
          amount?: number
          category?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          expense_date?: string
          id?: string
          is_sample?: boolean | null
          updated_date?: string | null
        }
        Relationships: []
      }
      feature_configurations: {
        Row: {
          changed_by_admin_id: string | null
          changed_by_admin_name: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          developer_notes: string | null
          documentation_url: string | null
          feature_key: string
          feature_name: string
          icon_name: string | null
          id: string
          is_sample: boolean | null
          last_status_change_date: string | null
          module_type: string | null
          page_url: string | null
          parent_module_key: string | null
          priority: string | null
          reason_for_change: string | null
          release_date: string | null
          release_quarter: string | null
          route_path: string | null
          sort_order: number | null
          status: string | null
          tier: string | null
          updated_date: string | null
          visibility_rule: string | null
          visible_to_users: boolean | null
        }
        Insert: {
          changed_by_admin_id?: string | null
          changed_by_admin_name?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          developer_notes?: string | null
          documentation_url?: string | null
          feature_key: string
          feature_name: string
          icon_name?: string | null
          id: string
          is_sample?: boolean | null
          last_status_change_date?: string | null
          module_type?: string | null
          page_url?: string | null
          parent_module_key?: string | null
          priority?: string | null
          reason_for_change?: string | null
          release_date?: string | null
          release_quarter?: string | null
          route_path?: string | null
          sort_order?: number | null
          status?: string | null
          tier?: string | null
          updated_date?: string | null
          visibility_rule?: string | null
          visible_to_users?: boolean | null
        }
        Update: {
          changed_by_admin_id?: string | null
          changed_by_admin_name?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          developer_notes?: string | null
          documentation_url?: string | null
          feature_key?: string
          feature_name?: string
          icon_name?: string | null
          id?: string
          is_sample?: boolean | null
          last_status_change_date?: string | null
          module_type?: string | null
          page_url?: string | null
          parent_module_key?: string | null
          priority?: string | null
          reason_for_change?: string | null
          release_date?: string | null
          release_quarter?: string | null
          route_path?: string | null
          sort_order?: number | null
          status?: string | null
          tier?: string | null
          updated_date?: string | null
          visibility_rule?: string | null
          visible_to_users?: boolean | null
        }
        Relationships: []
      }
      feedback: {
        Row: {
          admin_notes: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          email: string
          feedback_text: string
          id: string
          is_sample: boolean | null
          name: string
          status: string | null
          updated_date: string | null
          user_id: string | null
          user_role: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          email: string
          feedback_text: string
          id: string
          is_sample?: boolean | null
          name: string
          status?: string | null
          updated_date?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          email?: string
          feedback_text?: string
          id?: string
          is_sample?: boolean | null
          name?: string
          status?: string | null
          updated_date?: string | null
          user_id?: string | null
          user_role?: string | null
        }
        Relationships: []
      }
      financial_audit_logs: {
        Row: {
          action: string
          admin_id: string
          admin_name: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          details: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          is_sample: boolean | null
          updated_date: string | null
        }
        Insert: {
          action: string
          admin_id: string
          admin_name?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          details?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id: string
          is_sample?: boolean | null
          updated_date?: string | null
        }
        Update: {
          action?: string
          admin_id?: string
          admin_name?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          details?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_sample?: boolean | null
          updated_date?: string | null
        }
        Relationships: []
      }
      financial_influencers: {
        Row: {
          bio: string | null
          commission_override_rate: number | null
          commission_rate: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          display_name: string
          email_verified: boolean | null
          follower_count: number | null
          id: string
          is_sample: boolean | null
          phone_verified: boolean | null
          profile_image_url: string | null
          sebi_registered: boolean | null
          social_links: Json | null
          specialization: Json | null
          status: string | null
          subscription_price: number | null
          success_rate: number | null
          total_revenue: number | null
          updated_date: string | null
          user_id: string
          verified: boolean | null
        }
        Insert: {
          bio?: string | null
          commission_override_rate?: number | null
          commission_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name: string
          email_verified?: boolean | null
          follower_count?: number | null
          id: string
          is_sample?: boolean | null
          phone_verified?: boolean | null
          profile_image_url?: string | null
          sebi_registered?: boolean | null
          social_links?: Json | null
          specialization?: Json | null
          status?: string | null
          subscription_price?: number | null
          success_rate?: number | null
          total_revenue?: number | null
          updated_date?: string | null
          user_id: string
          verified?: boolean | null
        }
        Update: {
          bio?: string | null
          commission_override_rate?: number | null
          commission_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name?: string
          email_verified?: boolean | null
          follower_count?: number | null
          id?: string
          is_sample?: boolean | null
          phone_verified?: boolean | null
          profile_image_url?: string | null
          sebi_registered?: boolean | null
          social_links?: Json | null
          specialization?: Json | null
          status?: string | null
          subscription_price?: number | null
          success_rate?: number | null
          total_revenue?: number | null
          updated_date?: string | null
          user_id?: string
          verified?: boolean | null
        }
        Relationships: []
      }
      fund_admins: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          display_name: string
          email: string
          id: string
          is_sample: boolean | null
          permissions: Json | null
          phone: string | null
          role: string | null
          status: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name: string
          email: string
          id: string
          is_sample?: boolean | null
          permissions?: Json | null
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          display_name?: string
          email?: string
          id?: string
          is_sample?: boolean | null
          permissions?: Json | null
          phone?: string | null
          role?: string | null
          status?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      fund_allocations: {
        Row: {
          average_nav: number
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          current_value: number
          fund_plan_id: string
          id: string
          investment_date: string | null
          investor_id: string
          is_sample: boolean | null
          last_transaction_date: string | null
          profit_loss: number | null
          profit_loss_percent: number | null
          status: string | null
          total_invested: number
          units_held: number
          updated_date: string | null
        }
        Insert: {
          average_nav: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_value?: number
          fund_plan_id: string
          id: string
          investment_date?: string | null
          investor_id: string
          is_sample?: boolean | null
          last_transaction_date?: string | null
          profit_loss?: number | null
          profit_loss_percent?: number | null
          status?: string | null
          total_invested?: number
          units_held?: number
          updated_date?: string | null
        }
        Update: {
          average_nav?: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_value?: number
          fund_plan_id?: string
          id?: string
          investment_date?: string | null
          investor_id?: string
          is_sample?: boolean | null
          last_transaction_date?: string | null
          profit_loss?: number | null
          profit_loss_percent?: number | null
          status?: string | null
          total_invested?: number
          units_held?: number
          updated_date?: string | null
        }
        Relationships: []
      }
      fund_invoices: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          fee_amount: number | null
          gross_amount: number
          id: string
          investor_id: string
          invoice_date: string
          invoice_number: string
          invoice_type: string | null
          invoice_url: string | null
          is_sample: boolean | null
          net_amount: number
          status: string | null
          tax_amount: number | null
          transaction_id: string | null
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fee_amount?: number | null
          gross_amount: number
          id: string
          investor_id: string
          invoice_date: string
          invoice_number: string
          invoice_type?: string | null
          invoice_url?: string | null
          is_sample?: boolean | null
          net_amount: number
          status?: string | null
          tax_amount?: number | null
          transaction_id?: string | null
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fee_amount?: number | null
          gross_amount?: number
          id?: string
          investor_id?: string
          invoice_date?: string
          invoice_number?: string
          invoice_type?: string | null
          invoice_url?: string | null
          is_sample?: boolean | null
          net_amount?: number
          status?: string | null
          tax_amount?: number | null
          transaction_id?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      fund_notifications: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          investor_id: string
          is_sample: boolean | null
          message: string
          notification_type: string | null
          related_entity_id: string | null
          related_entity_type: string | null
          status: string | null
          title: string
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          investor_id: string
          is_sample?: boolean | null
          message: string
          notification_type?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string | null
          title: string
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          investor_id?: string
          is_sample?: boolean | null
          message?: string
          notification_type?: string | null
          related_entity_id?: string | null
          related_entity_type?: string | null
          status?: string | null
          title?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      fund_payout_requests: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by_admin_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          fund_manager_id: string
          fund_plan_id: string | null
          id: string
          is_sample: boolean | null
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          payment_reference: string | null
          rejection_reason: string | null
          request_date: string | null
          status: string | null
          updated_date: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by_admin_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_manager_id: string
          fund_plan_id?: string | null
          id: string
          is_sample?: boolean | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          rejection_reason?: string | null
          request_date?: string | null
          status?: string | null
          updated_date?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by_admin_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_manager_id?: string
          fund_plan_id?: string | null
          id?: string
          is_sample?: boolean | null
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          rejection_reason?: string | null
          request_date?: string | null
          status?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      fund_plans: {
        Row: {
          auto_payout_enabled: boolean | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          entry_load_percent: number | null
          exit_load_percent: number | null
          expected_return_percent: number | null
          fund_type: string | null
          id: string
          investment_period: string | null
          is_active: boolean | null
          is_sample: boolean | null
          last_auto_payout_month: string | null
          lock_in_period_days: number | null
          management_fee_percent: number | null
          maximum_investment: number | null
          minimum_investment: number | null
          nav: number | null
          nav_date: string | null
          notice_period_days: number | null
          plan_code: string | null
          plan_name: string
          profit_payout_frequency: string | null
          risk_level: string | null
          total_aum: number | null
          total_investors: number | null
          updated_date: string | null
        }
        Insert: {
          auto_payout_enabled?: boolean | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          entry_load_percent?: number | null
          exit_load_percent?: number | null
          expected_return_percent?: number | null
          fund_type?: string | null
          id: string
          investment_period?: string | null
          is_active?: boolean | null
          is_sample?: boolean | null
          last_auto_payout_month?: string | null
          lock_in_period_days?: number | null
          management_fee_percent?: number | null
          maximum_investment?: number | null
          minimum_investment?: number | null
          nav?: number | null
          nav_date?: string | null
          notice_period_days?: number | null
          plan_code?: string | null
          plan_name: string
          profit_payout_frequency?: string | null
          risk_level?: string | null
          total_aum?: number | null
          total_investors?: number | null
          updated_date?: string | null
        }
        Update: {
          auto_payout_enabled?: boolean | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          entry_load_percent?: number | null
          exit_load_percent?: number | null
          expected_return_percent?: number | null
          fund_type?: string | null
          id?: string
          investment_period?: string | null
          is_active?: boolean | null
          is_sample?: boolean | null
          last_auto_payout_month?: string | null
          lock_in_period_days?: number | null
          management_fee_percent?: number | null
          maximum_investment?: number | null
          minimum_investment?: number | null
          nav?: number | null
          nav_date?: string | null
          notice_period_days?: number | null
          plan_code?: string | null
          plan_name?: string
          profit_payout_frequency?: string | null
          risk_level?: string | null
          total_aum?: number | null
          total_investors?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      fund_transactions: {
        Row: {
          allocation_id: string | null
          amount: number
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          fund_plan_id: string | null
          id: string
          investor_id: string
          is_sample: boolean | null
          nav: number | null
          notes: string | null
          payment_method: string | null
          payment_reference: string | null
          settlement_date: string | null
          status: string | null
          transaction_date: string | null
          transaction_type: string | null
          units: number | null
          updated_date: string | null
        }
        Insert: {
          allocation_id?: string | null
          amount: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_plan_id?: string | null
          id: string
          investor_id: string
          is_sample?: boolean | null
          nav?: number | null
          notes?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          settlement_date?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_type?: string | null
          units?: number | null
          updated_date?: string | null
        }
        Update: {
          allocation_id?: string | null
          amount?: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_plan_id?: string | null
          id?: string
          investor_id?: string
          is_sample?: boolean | null
          nav?: number | null
          notes?: string | null
          payment_method?: string | null
          payment_reference?: string | null
          settlement_date?: string | null
          status?: string | null
          transaction_date?: string | null
          transaction_type?: string | null
          units?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      fund_wallets: {
        Row: {
          available_balance: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          investor_id: string
          is_sample: boolean | null
          last_transaction_date: string | null
          locked_balance: number | null
          total_deposited: number | null
          total_withdrawn: number | null
          updated_date: string | null
        }
        Insert: {
          available_balance?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          investor_id: string
          is_sample?: boolean | null
          last_transaction_date?: string | null
          locked_balance?: number | null
          total_deposited?: number | null
          total_withdrawn?: number | null
          updated_date?: string | null
        }
        Update: {
          available_balance?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          investor_id?: string
          is_sample?: boolean | null
          last_transaction_date?: string | null
          locked_balance?: number | null
          total_deposited?: number | null
          total_withdrawn?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      fund_withdrawal_requests: {
        Row: {
          allocation_id: string | null
          approved_at: string | null
          approved_by_admin_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          fund_plan_id: string | null
          id: string
          investor_id: string
          is_sample: boolean | null
          notes: string | null
          processed_at: string | null
          rejection_reason: string | null
          requested_amount: number
          status: string | null
          transaction_id: string | null
          units_to_redeem: number | null
          updated_date: string | null
        }
        Insert: {
          allocation_id?: string | null
          approved_at?: string | null
          approved_by_admin_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_plan_id?: string | null
          id: string
          investor_id: string
          is_sample?: boolean | null
          notes?: string | null
          processed_at?: string | null
          rejection_reason?: string | null
          requested_amount: number
          status?: string | null
          transaction_id?: string | null
          units_to_redeem?: number | null
          updated_date?: string | null
        }
        Update: {
          allocation_id?: string | null
          approved_at?: string | null
          approved_by_admin_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_plan_id?: string | null
          id?: string
          investor_id?: string
          is_sample?: boolean | null
          notes?: string | null
          processed_at?: string | null
          rejection_reason?: string | null
          requested_amount?: number
          status?: string | null
          transaction_id?: string | null
          units_to_redeem?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      impersonation_sessions: {
        Row: {
          admin_user_id: string
          created_at: string | null
          ended_at: string | null
          expires_at: string
          id: string
          session_token: string
          target_user_id: string
        }
        Insert: {
          admin_user_id: string
          created_at?: string | null
          ended_at?: string | null
          expires_at: string
          id?: string
          session_token: string
          target_user_id: string
        }
        Update: {
          admin_user_id?: string
          created_at?: string | null
          ended_at?: string | null
          expires_at?: string
          id?: string
          session_token?: string
          target_user_id?: string
        }
        Relationships: []
      }
      influencer_posts: {
        Row: {
          content: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          duration: string | null
          id: string
          influencer_id: string
          is_premium: boolean | null
          is_sample: boolean | null
          like_count: number | null
          post_type: string | null
          status: string | null
          stock_mentions: Json | null
          tags: Json | null
          thumbnail_url: string | null
          title: string
          updated_date: string | null
          video_url: string | null
          view_count: number | null
        }
        Insert: {
          content?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          duration?: string | null
          id: string
          influencer_id: string
          is_premium?: boolean | null
          is_sample?: boolean | null
          like_count?: number | null
          post_type?: string | null
          status?: string | null
          stock_mentions?: Json | null
          tags?: Json | null
          thumbnail_url?: string | null
          title: string
          updated_date?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Update: {
          content?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          duration?: string | null
          id?: string
          influencer_id?: string
          is_premium?: boolean | null
          is_sample?: boolean | null
          like_count?: number | null
          post_type?: string | null
          status?: string | null
          stock_mentions?: Json | null
          tags?: Json | null
          thumbnail_url?: string | null
          title?: string
          updated_date?: string | null
          video_url?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      investment_allocations: {
        Row: {
          allocation_amount: number
          allocation_date: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          current_value: number | null
          days_held: number | null
          fund_plan_id: string
          id: string
          investment_request_id: string | null
          investor_id: string
          is_sample: boolean | null
          last_profit_payout_date: string | null
          nav_at_allocation: number
          profit_earned: number | null
          status: string | null
          units_allocated: number
          updated_date: string | null
        }
        Insert: {
          allocation_amount: number
          allocation_date?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_value?: number | null
          days_held?: number | null
          fund_plan_id: string
          id: string
          investment_request_id?: string | null
          investor_id: string
          is_sample?: boolean | null
          last_profit_payout_date?: string | null
          nav_at_allocation: number
          profit_earned?: number | null
          status?: string | null
          units_allocated: number
          updated_date?: string | null
        }
        Update: {
          allocation_amount?: number
          allocation_date?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_value?: number | null
          days_held?: number | null
          fund_plan_id?: string
          id?: string
          investment_request_id?: string | null
          investor_id?: string
          is_sample?: boolean | null
          last_profit_payout_date?: string | null
          nav_at_allocation?: number
          profit_earned?: number | null
          status?: string | null
          units_allocated?: number
          updated_date?: string | null
        }
        Relationships: []
      }
      investment_requests: {
        Row: {
          allocation_id: string | null
          cancellation_reason: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          executed_at: string | null
          executed_by: string | null
          fund_plan_id: string
          id: string
          investor_id: string
          is_sample: boolean | null
          notes: string | null
          payment_method: string | null
          requested_amount: number
          status: string | null
          updated_date: string | null
        }
        Insert: {
          allocation_id?: string | null
          cancellation_reason?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          executed_at?: string | null
          executed_by?: string | null
          fund_plan_id: string
          id: string
          investor_id: string
          is_sample?: boolean | null
          notes?: string | null
          payment_method?: string | null
          requested_amount: number
          status?: string | null
          updated_date?: string | null
        }
        Update: {
          allocation_id?: string | null
          cancellation_reason?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          executed_at?: string | null
          executed_by?: string | null
          fund_plan_id?: string
          id?: string
          investor_id?: string
          is_sample?: boolean | null
          notes?: string | null
          payment_method?: string | null
          requested_amount?: number
          status?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      investor_profit_payouts: {
        Row: {
          allocation_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          fund_plan_id: string
          id: string
          investor_id: string
          is_sample: boolean | null
          notes: string | null
          payout_amount: number
          payout_date: string | null
          payout_period_end: string | null
          payout_period_start: string | null
          profit_rate: number | null
          status: string | null
          transaction_id: string | null
          updated_date: string | null
        }
        Insert: {
          allocation_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_plan_id: string
          id: string
          investor_id: string
          is_sample?: boolean | null
          notes?: string | null
          payout_amount: number
          payout_date?: string | null
          payout_period_end?: string | null
          payout_period_start?: string | null
          profit_rate?: number | null
          status?: string | null
          transaction_id?: string | null
          updated_date?: string | null
        }
        Update: {
          allocation_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_plan_id?: string
          id?: string
          investor_id?: string
          is_sample?: boolean | null
          notes?: string | null
          payout_amount?: number
          payout_date?: string | null
          payout_period_end?: string | null
          payout_period_start?: string | null
          profit_rate?: number | null
          status?: string | null
          transaction_id?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      investor_requests: {
        Row: {
          admin_notes: string | null
          annual_income_range: string | null
          bank_account_number: string | null
          bank_ifsc_code: string | null
          bank_name: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          email: string
          full_name: string
          id: string
          investment_experience: string | null
          is_sample: boolean | null
          mobile_number: string | null
          pan_document_url: string | null
          pan_number: string | null
          rejection_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          annual_income_range?: string | null
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          bank_name?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          email: string
          full_name: string
          id: string
          investment_experience?: string | null
          is_sample?: boolean | null
          mobile_number?: string | null
          pan_document_url?: string | null
          pan_number?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          annual_income_range?: string | null
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          bank_name?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          email?: string
          full_name?: string
          id?: string
          investment_experience?: string | null
          is_sample?: boolean | null
          mobile_number?: string | null
          pan_document_url?: string | null
          pan_number?: string | null
          rejection_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      investors: {
        Row: {
          bank_account_number: string | null
          bank_ifsc_code: string | null
          bank_name: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          current_value: number | null
          email: string
          full_name: string
          id: string
          investor_code: string | null
          is_sample: boolean | null
          kyc_rejection_reason: string | null
          kyc_status: string | null
          mobile_number: string | null
          pan_document_url: string | null
          pan_number: string | null
          profit_distribution_plan: string | null
          risk_profile: string | null
          status: string | null
          total_invested: number | null
          total_profit_loss: number | null
          updated_date: string | null
          upi_id: string | null
          user_id: string
        }
        Insert: {
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          bank_name?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_value?: number | null
          email: string
          full_name: string
          id: string
          investor_code?: string | null
          is_sample?: boolean | null
          kyc_rejection_reason?: string | null
          kyc_status?: string | null
          mobile_number?: string | null
          pan_document_url?: string | null
          pan_number?: string | null
          profit_distribution_plan?: string | null
          risk_profile?: string | null
          status?: string | null
          total_invested?: number | null
          total_profit_loss?: number | null
          updated_date?: string | null
          upi_id?: string | null
          user_id: string
        }
        Update: {
          bank_account_number?: string | null
          bank_ifsc_code?: string | null
          bank_name?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_value?: number | null
          email?: string
          full_name?: string
          id?: string
          investor_code?: string | null
          is_sample?: boolean | null
          kyc_rejection_reason?: string | null
          kyc_status?: string | null
          mobile_number?: string | null
          pan_document_url?: string | null
          pan_number?: string | null
          profit_distribution_plan?: string | null
          risk_profile?: string | null
          status?: string | null
          total_invested?: number | null
          total_profit_loss?: number | null
          updated_date?: string | null
          upi_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      meetings: {
        Row: {
          chat_room_id: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          end_time: string | null
          id: string
          is_sample: boolean | null
          max_participants: number | null
          meeting_url: string
          participant_count: number | null
          start_time: string | null
          status: string | null
          stock_symbol: string | null
          updated_date: string | null
        }
        Insert: {
          chat_room_id: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          end_time?: string | null
          id: string
          is_sample?: boolean | null
          max_participants?: number | null
          meeting_url: string
          participant_count?: number | null
          start_time?: string | null
          status?: string | null
          stock_symbol?: string | null
          updated_date?: string | null
        }
        Update: {
          chat_room_id?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          end_time?: string | null
          id?: string
          is_sample?: boolean | null
          max_participants?: number | null
          meeting_url?: string
          participant_count?: number | null
          start_time?: string | null
          status?: string | null
          stock_symbol?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      message_read_receipts: {
        Row: {
          created_date: string
          id: string
          message_id: string
          read_at: string
          user_id: string
        }
        Insert: {
          created_date?: string
          id?: string
          message_id: string
          read_at?: string
          user_id: string
        }
        Update: {
          created_date?: string
          id?: string
          message_id?: string
          read_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          chat_room_id: string
          content: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          mentioned_stock: string | null
          mentioned_users: string[] | null
          message_type: string | null
          read_count: number | null
          updated_date: string | null
          user_id: string | null
        }
        Insert: {
          chat_room_id: string
          content: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          mentioned_stock?: string | null
          mentioned_users?: string[] | null
          message_type?: string | null
          read_count?: number | null
          updated_date?: string | null
          user_id?: string | null
        }
        Update: {
          chat_room_id?: string
          content?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          mentioned_stock?: string | null
          mentioned_users?: string[] | null
          message_type?: string | null
          read_count?: number | null
          updated_date?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      moderation_logs: {
        Row: {
          action: string
          chat_room_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          details: string | null
          id: string
          is_sample: boolean | null
          moderator_id: string
          moderator_name: string | null
          reason: string | null
          target_id: string | null
          target_type: string | null
          target_user_id: string | null
          updated_date: string | null
        }
        Insert: {
          action: string
          chat_room_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          details?: string | null
          id: string
          is_sample?: boolean | null
          moderator_id: string
          moderator_name?: string | null
          reason?: string | null
          target_id?: string | null
          target_type?: string | null
          target_user_id?: string | null
          updated_date?: string | null
        }
        Update: {
          action?: string
          chat_room_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          details?: string | null
          id?: string
          is_sample?: boolean | null
          moderator_id?: string
          moderator_name?: string | null
          reason?: string | null
          target_id?: string | null
          target_type?: string | null
          target_user_id?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      module_approval_requests: {
        Row: {
          admin_notes: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          id: string
          is_sample: boolean | null
          justification: string | null
          module_key: string
          module_name: string
          requested_by_id: string
          requested_by_name: string | null
          reviewed_at: string | null
          reviewed_by_id: string | null
          reviewed_by_name: string | null
          status: string | null
          updated_date: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id: string
          is_sample?: boolean | null
          justification?: string | null
          module_key: string
          module_name: string
          requested_by_id: string
          requested_by_name?: string | null
          reviewed_at?: string | null
          reviewed_by_id?: string | null
          reviewed_by_name?: string | null
          status?: string | null
          updated_date?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id?: string
          is_sample?: boolean | null
          justification?: string | null
          module_key?: string
          module_name?: string
          requested_by_id?: string
          requested_by_name?: string | null
          reviewed_at?: string | null
          reviewed_by_id?: string | null
          reviewed_by_name?: string | null
          status?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      news: {
        Row: {
          category: string | null
          content: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          is_sample: boolean | null
          published_date: string | null
          sentiment: string | null
          source: string | null
          source_url: string | null
          stock_symbols: Json | null
          summary: string | null
          title: string
          updated_date: string | null
          view_count: number | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          image_url?: string | null
          is_featured?: boolean | null
          is_sample?: boolean | null
          published_date?: string | null
          sentiment?: string | null
          source?: string | null
          source_url?: string | null
          stock_symbols?: Json | null
          summary?: string | null
          title: string
          updated_date?: string | null
          view_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          is_sample?: boolean | null
          published_date?: string | null
          sentiment?: string | null
          source?: string | null
          source_url?: string | null
          stock_symbols?: Json | null
          summary?: string | null
          title?: string
          updated_date?: string | null
          view_count?: number | null
        }
        Relationships: []
      }
      notification_settings: {
        Row: {
          category: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          email_enabled: boolean | null
          id: string
          in_app_enabled: boolean | null
          is_sample: boolean | null
          push_enabled: boolean | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          category: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          email_enabled?: boolean | null
          id: string
          in_app_enabled?: boolean | null
          is_sample?: boolean | null
          push_enabled?: boolean | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          category?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          email_enabled?: boolean | null
          id?: string
          in_app_enabled?: boolean | null
          is_sample?: boolean | null
          push_enabled?: boolean | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          category: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_read: boolean | null
          is_sample: boolean | null
          link_url: string | null
          message: string
          priority: string | null
          title: string
          updated_date: string | null
          user_id: string
        }
        Insert: {
          category?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_read?: boolean | null
          is_sample?: boolean | null
          link_url?: string | null
          message: string
          priority?: string | null
          title: string
          updated_date?: string | null
          user_id: string
        }
        Update: {
          category?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_read?: boolean | null
          is_sample?: boolean | null
          link_url?: string | null
          message?: string
          priority?: string | null
          title?: string
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payout_requests: {
        Row: {
          admin_notes: string | null
          available_balance: number
          bank_details: Json | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          is_sample: boolean | null
          payout_method: string | null
          paypal_email: string | null
          processed_by: string | null
          processed_date: string | null
          requested_amount: number
          status: string | null
          transaction_reference: string | null
          updated_date: string | null
          upi_id: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          available_balance: number
          bank_details?: Json | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id: string
          is_sample?: boolean | null
          payout_method?: string | null
          paypal_email?: string | null
          processed_by?: string | null
          processed_date?: string | null
          requested_amount: number
          status?: string | null
          transaction_reference?: string | null
          updated_date?: string | null
          upi_id?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          available_balance?: number
          bank_details?: Json | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          is_sample?: boolean | null
          payout_method?: string | null
          paypal_email?: string | null
          processed_by?: string | null
          processed_date?: string | null
          requested_amount?: number
          status?: string | null
          transaction_reference?: string | null
          updated_date?: string | null
          upi_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      permissions: {
        Row: {
          category: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          id: string
          is_sample: boolean | null
          permission_key: string
          updated_date: string | null
        }
        Insert: {
          category?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id: string
          is_sample?: boolean | null
          permission_key: string
          updated_date?: string | null
        }
        Update: {
          category?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id?: string
          is_sample?: boolean | null
          permission_key?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      platform_settings: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          id: string
          is_sample: boolean | null
          setting_key: string
          setting_value: string | null
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id: string
          is_sample?: boolean | null
          setting_key: string
          setting_value?: string | null
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id?: string
          is_sample?: boolean | null
          setting_key?: string
          setting_value?: string | null
          updated_date?: string | null
        }
        Relationships: []
      }
      pledge_access_requests: {
        Row: {
          admin_notes: string | null
          annual_income_range: string | null
          approval_conditions: string | null
          broker: string | null
          consent_given: boolean | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          demat_account_id: string
          id: string
          is_sample: boolean | null
          rejection_reason: string | null
          request_reason: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_score: number | null
          status: string | null
          trading_experience: string | null
          updated_date: string | null
          user_email: string | null
          user_id: string
          user_name: string | null
        }
        Insert: {
          admin_notes?: string | null
          annual_income_range?: string | null
          approval_conditions?: string | null
          broker?: string | null
          consent_given?: boolean | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          demat_account_id: string
          id: string
          is_sample?: boolean | null
          rejection_reason?: string | null
          request_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: number | null
          status?: string | null
          trading_experience?: string | null
          updated_date?: string | null
          user_email?: string | null
          user_id: string
          user_name?: string | null
        }
        Update: {
          admin_notes?: string | null
          annual_income_range?: string | null
          approval_conditions?: string | null
          broker?: string | null
          consent_given?: boolean | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          demat_account_id?: string
          id?: string
          is_sample?: boolean | null
          rejection_reason?: string | null
          request_reason?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: number | null
          status?: string | null
          trading_experience?: string | null
          updated_date?: string | null
          user_email?: string | null
          user_id?: string
          user_name?: string | null
        }
        Relationships: []
      }
      pledge_audit_logs: {
        Row: {
          action: string
          actor_id: string
          actor_role: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          error_message: string | null
          id: string
          ip_address: string | null
          is_sample: boolean | null
          payload_json: Json | null
          success: boolean | null
          target_pledge_id: string | null
          target_session_id: string | null
          target_type: string | null
          updated_date: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          actor_id: string
          actor_role?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          error_message?: string | null
          id: string
          ip_address?: string | null
          is_sample?: boolean | null
          payload_json?: Json | null
          success?: boolean | null
          target_pledge_id?: string | null
          target_session_id?: string | null
          target_type?: string | null
          updated_date?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          actor_id?: string
          actor_role?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          error_message?: string | null
          id?: string
          ip_address?: string | null
          is_sample?: boolean | null
          payload_json?: Json | null
          success?: boolean | null
          target_pledge_id?: string | null
          target_session_id?: string | null
          target_type?: string | null
          updated_date?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      pledge_execution_records: {
        Row: {
          broker_commission: number | null
          broker_order_id: string | null
          commission_rate: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          demat_account_id: string
          error_message: string | null
          executed_at: string | null
          executed_price: number | null
          executed_qty: number | null
          execution_batch_id: string | null
          id: string
          is_sample: boolean | null
          net_amount: number | null
          platform_commission: number | null
          pledge_id: string
          pledged_qty: number
          raw_broker_response: Json | null
          session_id: string
          settlement_date: string | null
          side: string | null
          status: string | null
          stock_symbol: string
          total_execution_value: number | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          broker_commission?: number | null
          broker_order_id?: string | null
          commission_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          demat_account_id: string
          error_message?: string | null
          executed_at?: string | null
          executed_price?: number | null
          executed_qty?: number | null
          execution_batch_id?: string | null
          id: string
          is_sample?: boolean | null
          net_amount?: number | null
          platform_commission?: number | null
          pledge_id: string
          pledged_qty: number
          raw_broker_response?: Json | null
          session_id: string
          settlement_date?: string | null
          side?: string | null
          status?: string | null
          stock_symbol: string
          total_execution_value?: number | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          broker_commission?: number | null
          broker_order_id?: string | null
          commission_rate?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          demat_account_id?: string
          error_message?: string | null
          executed_at?: string | null
          executed_price?: number | null
          executed_qty?: number | null
          execution_batch_id?: string | null
          id?: string
          is_sample?: boolean | null
          net_amount?: number | null
          platform_commission?: number | null
          pledge_id?: string
          pledged_qty?: number
          raw_broker_response?: Json | null
          session_id?: string
          settlement_date?: string | null
          side?: string | null
          status?: string | null
          stock_symbol?: string
          total_execution_value?: number | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pledge_orders: {
        Row: {
          broker_order_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          executed_at: string | null
          id: string
          is_sample: boolean | null
          notes: string | null
          order_type: string | null
          placed_at: string | null
          pledge_id: string
          price: number | null
          qty: number
          side: string | null
          status: string | null
          stock_symbol: string
          updated_date: string | null
          user_id: string
        }
        Insert: {
          broker_order_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          executed_at?: string | null
          id: string
          is_sample?: boolean | null
          notes?: string | null
          order_type?: string | null
          placed_at?: string | null
          pledge_id: string
          price?: number | null
          qty: number
          side?: string | null
          status?: string | null
          stock_symbol: string
          updated_date?: string | null
          user_id: string
        }
        Update: {
          broker_order_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          executed_at?: string | null
          id?: string
          is_sample?: boolean | null
          notes?: string | null
          order_type?: string | null
          placed_at?: string | null
          pledge_id?: string
          price?: number | null
          qty?: number
          side?: string | null
          status?: string | null
          stock_symbol?: string
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pledge_payments: {
        Row: {
          amount: number
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          currency: string | null
          gateway_response: Json | null
          id: string
          invoice_number: string | null
          is_sample: boolean | null
          payment_method: string | null
          payment_provider: string | null
          payment_ref: string | null
          pledge_id: string
          receipt_url: string | null
          refund_amount: number | null
          refund_reason: string | null
          status: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          currency?: string | null
          gateway_response?: Json | null
          id: string
          invoice_number?: string | null
          is_sample?: boolean | null
          payment_method?: string | null
          payment_provider?: string | null
          payment_ref?: string | null
          pledge_id: string
          receipt_url?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          status?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          currency?: string | null
          gateway_response?: Json | null
          id?: string
          invoice_number?: string | null
          is_sample?: boolean | null
          payment_method?: string | null
          payment_provider?: string | null
          payment_ref?: string | null
          pledge_id?: string
          receipt_url?: string | null
          refund_amount?: number | null
          refund_reason?: string | null
          status?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pledge_sessions: {
        Row: {
          allow_amo: boolean | null
          buy_pledges_count: number | null
          buy_pledges_value: number | null
          capacity: number | null
          commission_rate_override: number | null
          convenience_fee_amount: number | null
          convenience_fee_type: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          execution_notes: string | null
          execution_reason: string | null
          execution_rule: string | null
          id: string
          is_advisor_recommended: boolean | null
          is_analyst_certified: boolean | null
          is_sample: boolean | null
          last_executed_at: string | null
          max_qty: number | null
          min_qty: number | null
          notification_sent: boolean | null
          sell_pledges_count: number | null
          sell_pledges_value: number | null
          session_end: string
          session_mode: string | null
          session_start: string
          status: string | null
          stock_name: string | null
          stock_symbol: string
          total_pledge_value: number | null
          total_pledges: number | null
          updated_date: string | null
        }
        Insert: {
          allow_amo?: boolean | null
          buy_pledges_count?: number | null
          buy_pledges_value?: number | null
          capacity?: number | null
          commission_rate_override?: number | null
          convenience_fee_amount?: number | null
          convenience_fee_type?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          execution_notes?: string | null
          execution_reason?: string | null
          execution_rule?: string | null
          id: string
          is_advisor_recommended?: boolean | null
          is_analyst_certified?: boolean | null
          is_sample?: boolean | null
          last_executed_at?: string | null
          max_qty?: number | null
          min_qty?: number | null
          notification_sent?: boolean | null
          sell_pledges_count?: number | null
          sell_pledges_value?: number | null
          session_end: string
          session_mode?: string | null
          session_start: string
          status?: string | null
          stock_name?: string | null
          stock_symbol: string
          total_pledge_value?: number | null
          total_pledges?: number | null
          updated_date?: string | null
        }
        Update: {
          allow_amo?: boolean | null
          buy_pledges_count?: number | null
          buy_pledges_value?: number | null
          capacity?: number | null
          commission_rate_override?: number | null
          convenience_fee_amount?: number | null
          convenience_fee_type?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          execution_notes?: string | null
          execution_reason?: string | null
          execution_rule?: string | null
          id?: string
          is_advisor_recommended?: boolean | null
          is_analyst_certified?: boolean | null
          is_sample?: boolean | null
          last_executed_at?: string | null
          max_qty?: number | null
          min_qty?: number | null
          notification_sent?: boolean | null
          sell_pledges_count?: number | null
          sell_pledges_value?: number | null
          session_end?: string
          session_mode?: string | null
          session_start?: string
          status?: string | null
          stock_name?: string | null
          stock_symbol?: string
          total_pledge_value?: number | null
          total_pledges?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      pledges: {
        Row: {
          admin_notes: string | null
          consent_hash: string | null
          convenience_fee_amount: number | null
          convenience_fee_paid: boolean | null
          convenience_fee_payment_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          demat_account_id: string
          digital_consent: boolean | null
          execution_notes: string | null
          expected_execution_at: string | null
          id: string
          is_sample: boolean | null
          price_target: number | null
          qty: number
          risk_acknowledgment: boolean | null
          session_id: string
          side: string | null
          status: string | null
          stock_symbol: string
          trading_limits_validated: boolean | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          consent_hash?: string | null
          convenience_fee_amount?: number | null
          convenience_fee_paid?: boolean | null
          convenience_fee_payment_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          demat_account_id: string
          digital_consent?: boolean | null
          execution_notes?: string | null
          expected_execution_at?: string | null
          id: string
          is_sample?: boolean | null
          price_target?: number | null
          qty: number
          risk_acknowledgment?: boolean | null
          session_id: string
          side?: string | null
          status?: string | null
          stock_symbol: string
          trading_limits_validated?: boolean | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          consent_hash?: string | null
          convenience_fee_amount?: number | null
          convenience_fee_paid?: boolean | null
          convenience_fee_payment_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          demat_account_id?: string
          digital_consent?: boolean | null
          execution_notes?: string | null
          expected_execution_at?: string | null
          id?: string
          is_sample?: boolean | null
          price_target?: number | null
          qty?: number
          risk_acknowledgment?: boolean | null
          session_id?: string
          side?: string | null
          status?: string | null
          stock_symbol?: string
          trading_limits_validated?: boolean | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      poll_votes: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          poll_id: string
          updated_date: string | null
          user_id: string
          vote: string
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          poll_id: string
          updated_date?: string | null
          user_id: string
          vote: string
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          poll_id?: string
          updated_date?: string | null
          user_id?: string
          vote?: string
        }
        Relationships: []
      }
      polls: {
        Row: {
          bearish_votes: number | null
          bullish_votes: number | null
          buy_votes: number | null
          chatroom_id: string | null
          confidence_score: number | null
          created_by: string | null
          created_by_admin: boolean | null
          created_by_id: string | null
          created_by_role: string | null
          created_date: string | null
          creation_source: string | null
          description: string | null
          expires_at: string | null
          hold_votes: number | null
          id: string
          is_active: boolean | null
          is_premium: boolean | null
          is_sample: boolean | null
          neutral_votes: number | null
          no_votes: number | null
          poll_type: string | null
          sell_votes: number | null
          stock_symbol: string | null
          target_price: number | null
          title: string
          total_pledge_amount: number | null
          total_pledges: number | null
          total_votes: number | null
          updated_date: string | null
          yes_votes: number | null
        }
        Insert: {
          bearish_votes?: number | null
          bullish_votes?: number | null
          buy_votes?: number | null
          chatroom_id?: string | null
          confidence_score?: number | null
          created_by?: string | null
          created_by_admin?: boolean | null
          created_by_id?: string | null
          created_by_role?: string | null
          created_date?: string | null
          creation_source?: string | null
          description?: string | null
          expires_at?: string | null
          hold_votes?: number | null
          id: string
          is_active?: boolean | null
          is_premium?: boolean | null
          is_sample?: boolean | null
          neutral_votes?: number | null
          no_votes?: number | null
          poll_type?: string | null
          sell_votes?: number | null
          stock_symbol?: string | null
          target_price?: number | null
          title: string
          total_pledge_amount?: number | null
          total_pledges?: number | null
          total_votes?: number | null
          updated_date?: string | null
          yes_votes?: number | null
        }
        Update: {
          bearish_votes?: number | null
          bullish_votes?: number | null
          buy_votes?: number | null
          chatroom_id?: string | null
          confidence_score?: number | null
          created_by?: string | null
          created_by_admin?: boolean | null
          created_by_id?: string | null
          created_by_role?: string | null
          created_date?: string | null
          creation_source?: string | null
          description?: string | null
          expires_at?: string | null
          hold_votes?: number | null
          id?: string
          is_active?: boolean | null
          is_premium?: boolean | null
          is_sample?: boolean | null
          neutral_votes?: number | null
          no_votes?: number | null
          poll_type?: string | null
          sell_votes?: number | null
          stock_symbol?: string | null
          target_price?: number | null
          title?: string
          total_pledge_amount?: number | null
          total_pledges?: number | null
          total_votes?: number | null
          updated_date?: string | null
          yes_votes?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          full_name: string | null
          id: string
          mobile_number: string | null
          profile_image_url: string | null
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          full_name?: string | null
          id: string
          mobile_number?: string | null
          profile_image_url?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          full_name?: string | null
          id?: string
          mobile_number?: string | null
          profile_image_url?: string | null
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      profit_payout_schedules: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          fund_plan_id: string
          id: string
          is_sample: boolean | null
          notes: string | null
          payout_date: string
          payout_frequency: string | null
          processed_at: string | null
          profit_rate: number
          status: string | null
          total_amount: number
          total_investors: number | null
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_plan_id: string
          id: string
          is_sample?: boolean | null
          notes?: string | null
          payout_date: string
          payout_frequency?: string | null
          processed_at?: string | null
          profit_rate: number
          status?: string | null
          total_amount: number
          total_investors?: number | null
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          fund_plan_id?: string
          id?: string
          is_sample?: boolean | null
          notes?: string | null
          payout_date?: string
          payout_frequency?: string | null
          processed_at?: string | null
          profit_rate?: number
          status?: string | null
          total_amount?: number
          total_investors?: number | null
          updated_date?: string | null
        }
        Relationships: []
      }
      promo_codes: {
        Row: {
          code: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          current_usage: number | null
          discount_type: string | null
          discount_value: number
          expiry_date: string | null
          id: string
          is_active: boolean | null
          is_sample: boolean | null
          updated_date: string | null
          usage_limit: number | null
        }
        Insert: {
          code: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_usage?: number | null
          discount_type?: string | null
          discount_value: number
          expiry_date?: string | null
          id: string
          is_active?: boolean | null
          is_sample?: boolean | null
          updated_date?: string | null
          usage_limit?: number | null
        }
        Update: {
          code?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          current_usage?: number | null
          discount_type?: string | null
          discount_value?: number
          expiry_date?: string | null
          id?: string
          is_active?: boolean | null
          is_sample?: boolean | null
          updated_date?: string | null
          usage_limit?: number | null
        }
        Relationships: []
      }
      referral_badges: {
        Row: {
          badge_name: string
          badge_type: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          criteria: string | null
          description: string | null
          earned_at: string | null
          icon_url: string | null
          id: string
          is_sample: boolean | null
          referrals_required: number | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          badge_name: string
          badge_type?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          criteria?: string | null
          description?: string | null
          earned_at?: string | null
          icon_url?: string | null
          id: string
          is_sample?: boolean | null
          referrals_required?: number | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          badge_name?: string
          badge_type?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          criteria?: string | null
          description?: string | null
          earned_at?: string | null
          icon_url?: string | null
          id?: string
          is_sample?: boolean | null
          referrals_required?: number | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          invitee_email: string | null
          invitee_id: string | null
          inviter_id: string
          is_active_member: boolean | null
          is_sample: boolean | null
          kyc_completed: boolean | null
          referral_code: string
          reward_claimed: boolean | null
          signup_completed: boolean | null
          signup_date: string | null
          updated_date: string | null
          verification_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          invitee_email?: string | null
          invitee_id?: string | null
          inviter_id: string
          is_active_member?: boolean | null
          is_sample?: boolean | null
          kyc_completed?: boolean | null
          referral_code: string
          reward_claimed?: boolean | null
          signup_completed?: boolean | null
          signup_date?: string | null
          updated_date?: string | null
          verification_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          invitee_email?: string | null
          invitee_id?: string | null
          inviter_id?: string
          is_active_member?: boolean | null
          is_sample?: boolean | null
          kyc_completed?: boolean | null
          referral_code?: string
          reward_claimed?: boolean | null
          signup_completed?: boolean | null
          signup_date?: string | null
          updated_date?: string | null
          verification_date?: string | null
        }
        Relationships: []
      }
      refund_requests: {
        Row: {
          admin_notes: string | null
          amount: number
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          entity_id: string
          entity_type: string | null
          id: string
          is_sample: boolean | null
          processed_at: string | null
          reason: string
          refund_method: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          transaction_reference: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entity_id: string
          entity_type?: string | null
          id: string
          is_sample?: boolean | null
          processed_at?: string | null
          reason: string
          refund_method?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          transaction_reference?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount?: number
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          entity_id?: string
          entity_type?: string | null
          id?: string
          is_sample?: boolean | null
          processed_at?: string | null
          reason?: string
          refund_method?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          transaction_reference?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      revenue_transactions: {
        Row: {
          commission_rate: number
          course_id: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          enrollment_id: string | null
          gross_amount: number
          id: string
          influencer_id: string | null
          influencer_payout: number
          is_sample: boolean | null
          payout_date: string | null
          payout_status: string | null
          platform_commission: number
          transaction_type: string | null
          updated_date: string | null
          user_id: string
        }
        Insert: {
          commission_rate: number
          course_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          enrollment_id?: string | null
          gross_amount: number
          id: string
          influencer_id?: string | null
          influencer_payout: number
          is_sample?: boolean | null
          payout_date?: string | null
          payout_status?: string | null
          platform_commission: number
          transaction_type?: string | null
          updated_date?: string | null
          user_id: string
        }
        Update: {
          commission_rate?: number
          course_id?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          enrollment_id?: string | null
          gross_amount?: number
          id?: string
          influencer_id?: string | null
          influencer_payout?: number
          is_sample?: boolean | null
          payout_date?: string | null
          payout_status?: string | null
          platform_commission?: number
          transaction_type?: string | null
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          admin_notes: string | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          is_sample: boolean | null
          profile_url: string | null
          rating: number | null
          rejection_reason: string | null
          review_text: string
          social_platform: string | null
          social_url: string | null
          status: string | null
          updated_date: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_featured?: boolean | null
          is_public?: boolean | null
          is_sample?: boolean | null
          profile_url?: string | null
          rating?: number | null
          rejection_reason?: string | null
          review_text: string
          social_platform?: string | null
          social_url?: string | null
          status?: string | null
          updated_date?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          is_sample?: boolean | null
          profile_url?: string | null
          rating?: number | null
          rejection_reason?: string | null
          review_text?: string
          social_platform?: string | null
          social_url?: string | null
          status?: string | null
          updated_date?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          permission_id: string
          role_id: string
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          permission_id: string
          role_id: string
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          permission_id?: string
          role_id?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      role_template_permissions: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          permission_id: string
          template_id: string
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          permission_id: string
          template_id: string
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          permission_id?: string
          template_id?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      role_templates: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          id: string
          is_active: boolean | null
          is_sample: boolean | null
          template_name: string
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id: string
          is_active?: boolean | null
          is_sample?: boolean | null
          template_name: string
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_sample?: boolean | null
          template_name?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          description: string | null
          id: string
          is_sample: boolean | null
          is_system_role: boolean | null
          name: string
          updated_date: string | null
        }
        Insert: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id: string
          is_sample?: boolean | null
          is_system_role?: boolean | null
          name: string
          updated_date?: string | null
        }
        Update: {
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          description?: string | null
          id?: string
          is_sample?: boolean | null
          is_system_role?: boolean | null
          name?: string
          updated_date?: string | null
        }
        Relationships: []
      }
      stocks: {
        Row: {
          company_name: string | null
          created_at: string
          id: string
          notes: string | null
          symbol: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          symbol: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          symbol?: string
          user_id?: string
        }
        Relationships: []
      }
      user_presence: {
        Row: {
          chat_room_id: string | null
          created_date: string
          id: string
          last_seen: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          chat_room_id?: string | null
          created_date?: string
          id?: string
          last_seen?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          chat_room_id?: string | null
          created_date?: string
          id?: string
          last_seen?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vendors: {
        Row: {
          company_name: string
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          status: string | null
          total_spent: number | null
          updated_date: string | null
          user_id: string
          website: string | null
        }
        Insert: {
          company_name: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          status?: string | null
          total_spent?: number | null
          updated_date?: string | null
          user_id: string
          website?: string | null
        }
        Update: {
          company_name?: string
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          status?: string | null
          total_spent?: number | null
          updated_date?: string | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      watchlist: {
        Row: {
          added_price: number | null
          created_by: string | null
          created_by_id: string | null
          created_date: string | null
          id: string
          is_sample: boolean | null
          notes: string | null
          stock_id: string | null
          stock_name: string
          stock_symbol: string
          updated_date: string | null
          user_id: string
        }
        Insert: {
          added_price?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id: string
          is_sample?: boolean | null
          notes?: string | null
          stock_id?: string | null
          stock_name: string
          stock_symbol: string
          updated_date?: string | null
          user_id: string
        }
        Update: {
          added_price?: number | null
          created_by?: string | null
          created_by_id?: string | null
          created_date?: string | null
          id?: string
          is_sample?: boolean | null
          notes?: string | null
          stock_id?: string | null
          stock_name?: string
          stock_symbol?: string
          updated_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_impersonation_sessions: {
        Args: never
        Returns: undefined
      }
      cleanup_old_presence: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      log_admin_action: {
        Args: {
          _action: string
          _changes?: Json
          _target_id?: string
          _target_table?: string
        }
        Returns: string
      }
      validate_impersonation_session: {
        Args: { _session_token: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "super_admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "super_admin"],
    },
  },
} as const
