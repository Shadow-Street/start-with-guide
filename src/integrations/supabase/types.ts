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
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
          username?: string
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_expired_impersonation_sessions: {
        Args: never
        Returns: undefined
      }
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
