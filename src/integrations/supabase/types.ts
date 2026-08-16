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
      academic_institutions: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          display_order: number | null
          enrollment: number | null
          graduation_rate: number | null
          highlights: Json | null
          id: string
          institution_type: string
          is_active: boolean | null
          is_featured: boolean | null
          logo_url: string | null
          name: string
          phone: string | null
          ranking_score: number | null
          short_name: string | null
          student_teacher_ratio: number | null
          town_slug: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          enrollment?: number | null
          graduation_rate?: number | null
          highlights?: Json | null
          id?: string
          institution_type: string
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          name: string
          phone?: string | null
          ranking_score?: number | null
          short_name?: string | null
          student_teacher_ratio?: number | null
          town_slug: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          enrollment?: number | null
          graduation_rate?: number | null
          highlights?: Json | null
          id?: string
          institution_type?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          ranking_score?: number | null
          short_name?: string | null
          student_teacher_ratio?: number | null
          town_slug?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      analyzer_leads: {
        Row: {
          asking_price: number | null
          branding_brokerage: string | null
          branding_company: string | null
          branding_company_nmls: string | null
          branding_email: string | null
          branding_license: string | null
          branding_name: string | null
          branding_nmls: string | null
          branding_phone: string | null
          branding_title: string | null
          branding_website: string | null
          cap_rate: number | null
          cash_to_close: number | null
          created_at: string | null
          email: string
          full_name: string
          has_custom_branding: boolean | null
          id: string
          loan_type: string | null
          monthly_cash_flow: number | null
          noi: number | null
          phone: string | null
          property_address: string | null
          property_city: string | null
          property_state: string | null
          report_sent: boolean | null
          source_url: string | null
          user_type: string
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          asking_price?: number | null
          branding_brokerage?: string | null
          branding_company?: string | null
          branding_company_nmls?: string | null
          branding_email?: string | null
          branding_license?: string | null
          branding_name?: string | null
          branding_nmls?: string | null
          branding_phone?: string | null
          branding_title?: string | null
          branding_website?: string | null
          cap_rate?: number | null
          cash_to_close?: number | null
          created_at?: string | null
          email: string
          full_name: string
          has_custom_branding?: boolean | null
          id?: string
          loan_type?: string | null
          monthly_cash_flow?: number | null
          noi?: number | null
          phone?: string | null
          property_address?: string | null
          property_city?: string | null
          property_state?: string | null
          report_sent?: boolean | null
          source_url?: string | null
          user_type: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          asking_price?: number | null
          branding_brokerage?: string | null
          branding_company?: string | null
          branding_company_nmls?: string | null
          branding_email?: string | null
          branding_license?: string | null
          branding_name?: string | null
          branding_nmls?: string | null
          branding_phone?: string | null
          branding_title?: string | null
          branding_website?: string | null
          cap_rate?: number | null
          cash_to_close?: number | null
          created_at?: string | null
          email?: string
          full_name?: string
          has_custom_branding?: boolean | null
          id?: string
          loan_type?: string | null
          monthly_cash_flow?: number | null
          noi?: number | null
          phone?: string | null
          property_address?: string | null
          property_city?: string | null
          property_state?: string | null
          report_sent?: boolean | null
          source_url?: string | null
          user_type?: string
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      answer_pilot_metrics: {
        Row: {
          business_id: string | null
          business_slug: string | null
          cohort_role: string
          created_at: string
          id: string
          metric: string
          notes: string | null
          phase: string
          updated_at: string
          value: number
          window_end: string
          window_start: string
        }
        Insert: {
          business_id?: string | null
          business_slug?: string | null
          cohort_role: string
          created_at?: string
          id?: string
          metric: string
          notes?: string | null
          phase: string
          updated_at?: string
          value?: number
          window_end: string
          window_start: string
        }
        Update: {
          business_id?: string | null
          business_slug?: string | null
          cohort_role?: string
          created_at?: string
          id?: string
          metric?: string
          notes?: string | null
          phase?: string
          updated_at?: string
          value?: number
          window_end?: string
          window_start?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_pilot_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_pilot_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_pilot_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "answer_pilot_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_pilot_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_pilot_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_pilot_metrics_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      answerability_pilot_cohort: {
        Row: {
          average_position: number | null
          business_id: string | null
          business_slug: string | null
          canonical_url: string | null
          category: string | null
          clicks_90d: number | null
          cohort_role: string
          created_at: string
          ctr: number | null
          eligibility_state: string | null
          frozen: boolean
          frozen_at: string | null
          id: string
          impressions_90d: number | null
          protection_tier: string | null
          readiness_state: string | null
          record_status: string | null
          selection_bucket: string
          selection_reason: string | null
          snapshot_window: string | null
          town_slug: string | null
          url: string
        }
        Insert: {
          average_position?: number | null
          business_id?: string | null
          business_slug?: string | null
          canonical_url?: string | null
          category?: string | null
          clicks_90d?: number | null
          cohort_role?: string
          created_at?: string
          ctr?: number | null
          eligibility_state?: string | null
          frozen?: boolean
          frozen_at?: string | null
          id?: string
          impressions_90d?: number | null
          protection_tier?: string | null
          readiness_state?: string | null
          record_status?: string | null
          selection_bucket: string
          selection_reason?: string | null
          snapshot_window?: string | null
          town_slug?: string | null
          url: string
        }
        Update: {
          average_position?: number | null
          business_id?: string | null
          business_slug?: string | null
          canonical_url?: string | null
          category?: string | null
          clicks_90d?: number | null
          cohort_role?: string
          created_at?: string
          ctr?: number | null
          eligibility_state?: string | null
          frozen?: boolean
          frozen_at?: string | null
          id?: string
          impressions_90d?: number | null
          protection_tier?: string | null
          readiness_state?: string | null
          record_status?: string | null
          selection_bucket?: string
          selection_reason?: string | null
          snapshot_window?: string | null
          town_slug?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "answerability_pilot_cohort_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answerability_pilot_cohort_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answerability_pilot_cohort_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "answerability_pilot_cohort_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answerability_pilot_cohort_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answerability_pilot_cohort_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answerability_pilot_cohort_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      ask_nest_rate_limits: {
        Row: {
          expires_at: string
          fingerprint: string
          hits: number
          window_start: string
        }
        Insert: {
          expires_at?: string
          fingerprint: string
          hits?: number
          window_start?: string
        }
        Update: {
          expires_at?: string
          fingerprint?: string
          hits?: number
          window_start?: string
        }
        Relationships: []
      }
      ask_nest_requests: {
        Row: {
          assigned_to: string | null
          business_id: string | null
          business_slug: string | null
          closed_at: string | null
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          created_at: string
          due_at: string
          first_touch_evidence: string | null
          first_touch_source: string | null
          id: string
          message: string | null
          outcome: string | null
          outcome_note: string | null
          pii_purged_at: string | null
          read_at: string | null
          request_type: string
          resolved_at: string | null
          reviewed_at: string | null
          self_reported_discovery: string | null
          service_intent: string | null
          session_id: string | null
          status: string
          technical_source_family: string | null
          town_slug: string | null
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          business_id?: string | null
          business_slug?: string | null
          closed_at?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          due_at?: string
          first_touch_evidence?: string | null
          first_touch_source?: string | null
          id?: string
          message?: string | null
          outcome?: string | null
          outcome_note?: string | null
          pii_purged_at?: string | null
          read_at?: string | null
          request_type: string
          resolved_at?: string | null
          reviewed_at?: string | null
          self_reported_discovery?: string | null
          service_intent?: string | null
          session_id?: string | null
          status?: string
          technical_source_family?: string | null
          town_slug?: string | null
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          business_id?: string | null
          business_slug?: string | null
          closed_at?: string | null
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          created_at?: string
          due_at?: string
          first_touch_evidence?: string | null
          first_touch_source?: string | null
          id?: string
          message?: string | null
          outcome?: string | null
          outcome_note?: string | null
          pii_purged_at?: string | null
          read_at?: string | null
          request_type?: string
          resolved_at?: string | null
          reviewed_at?: string | null
          self_reported_discovery?: string | null
          service_intent?: string | null
          session_id?: string | null
          status?: string
          technical_source_family?: string | null
          town_slug?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ask_nest_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ask_nest_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ask_nest_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "ask_nest_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ask_nest_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ask_nest_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ask_nest_requests_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      business_applications: {
        Row: {
          address: string | null
          badges: Json
          business_name: string
          category: string | null
          contact_name: string | null
          created_at: string
          editorial_notes: string | null
          email: string
          facebook: string | null
          features: Json
          first_timer: string | null
          hours: string | null
          id: string
          instagram: string | null
          known_for: string | null
          logo_url: string | null
          media: Json
          own_words: string | null
          phone: string | null
          photos: string[]
          published_business_id: string | null
          reel_url: string | null
          region_slug: string
          reservation_url: string | null
          seasonal: string | null
          selected_plan_key: string | null
          social: Json
          status: string
          story_origin: string | null
          submitted_by: string | null
          team: Json
          town: string | null
          updated_at: string
          video_url: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          badges?: Json
          business_name: string
          category?: string | null
          contact_name?: string | null
          created_at?: string
          editorial_notes?: string | null
          email: string
          facebook?: string | null
          features?: Json
          first_timer?: string | null
          hours?: string | null
          id?: string
          instagram?: string | null
          known_for?: string | null
          logo_url?: string | null
          media?: Json
          own_words?: string | null
          phone?: string | null
          photos?: string[]
          published_business_id?: string | null
          reel_url?: string | null
          region_slug?: string
          reservation_url?: string | null
          seasonal?: string | null
          selected_plan_key?: string | null
          social?: Json
          status?: string
          story_origin?: string | null
          submitted_by?: string | null
          team?: Json
          town?: string | null
          updated_at?: string
          video_url?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          badges?: Json
          business_name?: string
          category?: string | null
          contact_name?: string | null
          created_at?: string
          editorial_notes?: string | null
          email?: string
          facebook?: string | null
          features?: Json
          first_timer?: string | null
          hours?: string | null
          id?: string
          instagram?: string | null
          known_for?: string | null
          logo_url?: string | null
          media?: Json
          own_words?: string | null
          phone?: string | null
          photos?: string[]
          published_business_id?: string | null
          reel_url?: string | null
          region_slug?: string
          reservation_url?: string | null
          seasonal?: string | null
          selected_plan_key?: string | null
          social?: Json
          status?: string
          story_origin?: string | null
          submitted_by?: string | null
          team?: Json
          town?: string | null
          updated_at?: string
          video_url?: string | null
          website?: string | null
        }
        Relationships: []
      }
      business_correction_audit: {
        Row: {
          action: string
          actor_id: string | null
          correction_id: string
          created_at: string
          detail: Json
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          correction_id: string
          created_at?: string
          detail?: Json
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          correction_id?: string
          created_at?: string
          detail?: Json
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_correction_audit_correction_id_fkey"
            columns: ["correction_id"]
            isOneToOne: false
            referencedRelation: "business_corrections"
            referencedColumns: ["id"]
          },
        ]
      }
      business_corrections: {
        Row: {
          batch_key: string | null
          business_id: string
          created_at: string
          decided_at: string | null
          effective_at: string | null
          evidence_note: string | null
          evidence_type: string
          evidence_url: string | null
          field_name: string
          id: string
          reviewer_decision: string | null
          reviewer_id: string | null
          status: string
          submitted_by: string | null
          submitter_role: string
          updated_at: string
          value_after: string | null
          value_before: string | null
        }
        Insert: {
          batch_key?: string | null
          business_id: string
          created_at?: string
          decided_at?: string | null
          effective_at?: string | null
          evidence_note?: string | null
          evidence_type?: string
          evidence_url?: string | null
          field_name: string
          id?: string
          reviewer_decision?: string | null
          reviewer_id?: string | null
          status?: string
          submitted_by?: string | null
          submitter_role?: string
          updated_at?: string
          value_after?: string | null
          value_before?: string | null
        }
        Update: {
          batch_key?: string | null
          business_id?: string
          created_at?: string
          decided_at?: string | null
          effective_at?: string | null
          evidence_note?: string | null
          evidence_type?: string
          evidence_url?: string | null
          field_name?: string
          id?: string
          reviewer_decision?: string | null
          reviewer_id?: string | null
          status?: string
          submitted_by?: string | null
          submitter_role?: string
          updated_at?: string
          value_after?: string | null
          value_before?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_corrections_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_corrections_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_corrections_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "business_corrections_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_corrections_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_corrections_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_corrections_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      business_merge_candidates: {
        Row: {
          confidence: number
          created_at: string
          duplicate_business_id: string | null
          evidence: Json
          group_key: string
          id: string
          match_reason: string
          primary_business_id: string | null
          reviewed_at: string | null
          reviewer_id: string | null
          status: string
        }
        Insert: {
          confidence?: number
          created_at?: string
          duplicate_business_id?: string | null
          evidence?: Json
          group_key: string
          id?: string
          match_reason: string
          primary_business_id?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
        }
        Update: {
          confidence?: number
          created_at?: string
          duplicate_business_id?: string | null
          evidence?: Json
          group_key?: string
          id?: string
          match_reason?: string
          primary_business_id?: string | null
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_merge_candidates_duplicate_business_id_fkey"
            columns: ["duplicate_business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_duplicate_business_id_fkey"
            columns: ["duplicate_business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_duplicate_business_id_fkey"
            columns: ["duplicate_business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "business_merge_candidates_duplicate_business_id_fkey"
            columns: ["duplicate_business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_duplicate_business_id_fkey"
            columns: ["duplicate_business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_duplicate_business_id_fkey"
            columns: ["duplicate_business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_duplicate_business_id_fkey"
            columns: ["duplicate_business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_primary_business_id_fkey"
            columns: ["primary_business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_primary_business_id_fkey"
            columns: ["primary_business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_primary_business_id_fkey"
            columns: ["primary_business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "business_merge_candidates_primary_business_id_fkey"
            columns: ["primary_business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_primary_business_id_fkey"
            columns: ["primary_business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_primary_business_id_fkey"
            columns: ["primary_business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_merge_candidates_primary_business_id_fkey"
            columns: ["primary_business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      business_partners: {
        Row: {
          created_at: string
          id: string
          local_voice_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          local_voice_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          local_voice_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_partners_local_voice_id_fkey"
            columns: ["local_voice_id"]
            isOneToOne: false
            referencedRelation: "local_voices"
            referencedColumns: ["id"]
          },
        ]
      }
      business_quarantine_flags: {
        Row: {
          business_id: string
          confidence: number
          created_at: string
          detail: string | null
          detected_by: string
          evidence: Json
          id: string
          reason: string
          reviewed_at: string | null
          reviewer_id: string | null
          status: string
        }
        Insert: {
          business_id: string
          confidence?: number
          created_at?: string
          detail?: string | null
          detected_by?: string
          evidence?: Json
          id?: string
          reason: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
        }
        Update: {
          business_id?: string
          confidence?: number
          created_at?: string
          detail?: string | null
          detected_by?: string
          evidence?: Json
          id?: string
          reason?: string
          reviewed_at?: string | null
          reviewer_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_quarantine_flags_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_quarantine_flags_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_quarantine_flags_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "business_quarantine_flags_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_quarantine_flags_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_quarantine_flags_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_quarantine_flags_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      business_sources: {
        Row: {
          asserted_at: string
          asserted_by: string | null
          business_id: string
          captured_at: string | null
          confidence: number | null
          created_at: string
          evidence_state: string
          external_id: string | null
          field_scope: string[]
          id: string
          import_batch_id: string | null
          raw_snapshot_hash: string | null
          raw_snapshot_ref: string | null
          source_name: string | null
          source_type: string
          source_url: string | null
          state: string
        }
        Insert: {
          asserted_at?: string
          asserted_by?: string | null
          business_id: string
          captured_at?: string | null
          confidence?: number | null
          created_at?: string
          evidence_state?: string
          external_id?: string | null
          field_scope?: string[]
          id?: string
          import_batch_id?: string | null
          raw_snapshot_hash?: string | null
          raw_snapshot_ref?: string | null
          source_name?: string | null
          source_type: string
          source_url?: string | null
          state?: string
        }
        Update: {
          asserted_at?: string
          asserted_by?: string | null
          business_id?: string
          captured_at?: string | null
          confidence?: number | null
          created_at?: string
          evidence_state?: string
          external_id?: string | null
          field_scope?: string[]
          id?: string
          import_batch_id?: string | null
          raw_snapshot_hash?: string | null
          raw_snapshot_ref?: string | null
          source_name?: string | null
          source_type?: string
          source_url?: string | null
          state?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      business_specials: {
        Row: {
          business_id: string | null
          business_name: string | null
          category: string | null
          created_at: string
          cta_label: string | null
          cta_url: string | null
          description: string | null
          display_order: number | null
          end_date: string | null
          headline: string
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          start_date: string
          town_name: string | null
          town_slug: string
          updated_at: string
        }
        Insert: {
          business_id?: string | null
          business_name?: string | null
          category?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          headline: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          start_date?: string
          town_name?: string | null
          town_slug: string
          updated_at?: string
        }
        Update: {
          business_id?: string | null
          business_name?: string | null
          category?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          headline?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          start_date?: string
          town_name?: string | null
          town_slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_specials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_specials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_specials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "business_specials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_specials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_specials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_specials_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          address: string | null
          business_status: string
          category: string
          category_group: string | null
          city: string | null
          claimed_at: string | null
          claimed_by_user_id: string | null
          contact_notes: string | null
          contact_status: string
          county: string | null
          created_at: string
          data_status: string
          description: string | null
          editorial_note: string | null
          eligibility_reason: string | null
          eligibility_state: string
          email: string | null
          external_id: string | null
          facebook: string | null
          featured_order: number | null
          google_maps_url: string | null
          google_place_id: string | null
          hero_image_url: string | null
          hours: Json | null
          id: string
          import_batch_id: string | null
          instagram: string | null
          is_active: boolean | null
          is_claimed: boolean | null
          is_editor_pick: boolean | null
          is_featured: boolean | null
          is_hidden_gem: boolean | null
          is_trending: boolean | null
          is_verified: boolean | null
          last_synced_at: string | null
          last_verified_at: string | null
          latitude: number | null
          linkedin: string | null
          logo_url: string | null
          long_description: string | null
          longitude: number | null
          menu_url: string | null
          merge_candidate_status: string
          name: string
          needs_review: boolean
          phone: string | null
          photos: string[] | null
          plan_tier: string
          quarantine_reason: string | null
          quarantine_status: string
          rating: number | null
          record_status: string
          region: string
          review_count: number | null
          seo_cohort: string
          services: Json | null
          slug: string
          source: string | null
          source_url: string | null
          state: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subcategory: string | null
          subscription_current_period_end: string | null
          subscription_status: string | null
          tagline: string | null
          tags: string[] | null
          tiktok: string | null
          town_name: string | null
          town_slug: string
          updated_at: string
          verification_expires_at: string | null
          verification_status: string
          verified_at: string | null
          video_url: string | null
          website: string | null
          website_status: string | null
          x_url: string | null
          zipcode: string | null
        }
        Insert: {
          address?: string | null
          business_status?: string
          category: string
          category_group?: string | null
          city?: string | null
          claimed_at?: string | null
          claimed_by_user_id?: string | null
          contact_notes?: string | null
          contact_status?: string
          county?: string | null
          created_at?: string
          data_status?: string
          description?: string | null
          editorial_note?: string | null
          eligibility_reason?: string | null
          eligibility_state?: string
          email?: string | null
          external_id?: string | null
          facebook?: string | null
          featured_order?: number | null
          google_maps_url?: string | null
          google_place_id?: string | null
          hero_image_url?: string | null
          hours?: Json | null
          id?: string
          import_batch_id?: string | null
          instagram?: string | null
          is_active?: boolean | null
          is_claimed?: boolean | null
          is_editor_pick?: boolean | null
          is_featured?: boolean | null
          is_hidden_gem?: boolean | null
          is_trending?: boolean | null
          is_verified?: boolean | null
          last_synced_at?: string | null
          last_verified_at?: string | null
          latitude?: number | null
          linkedin?: string | null
          logo_url?: string | null
          long_description?: string | null
          longitude?: number | null
          menu_url?: string | null
          merge_candidate_status?: string
          name: string
          needs_review?: boolean
          phone?: string | null
          photos?: string[] | null
          plan_tier?: string
          quarantine_reason?: string | null
          quarantine_status?: string
          rating?: number | null
          record_status?: string
          region?: string
          review_count?: number | null
          seo_cohort?: string
          services?: Json | null
          slug: string
          source?: string | null
          source_url?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subcategory?: string | null
          subscription_current_period_end?: string | null
          subscription_status?: string | null
          tagline?: string | null
          tags?: string[] | null
          tiktok?: string | null
          town_name?: string | null
          town_slug: string
          updated_at?: string
          verification_expires_at?: string | null
          verification_status?: string
          verified_at?: string | null
          video_url?: string | null
          website?: string | null
          website_status?: string | null
          x_url?: string | null
          zipcode?: string | null
        }
        Update: {
          address?: string | null
          business_status?: string
          category?: string
          category_group?: string | null
          city?: string | null
          claimed_at?: string | null
          claimed_by_user_id?: string | null
          contact_notes?: string | null
          contact_status?: string
          county?: string | null
          created_at?: string
          data_status?: string
          description?: string | null
          editorial_note?: string | null
          eligibility_reason?: string | null
          eligibility_state?: string
          email?: string | null
          external_id?: string | null
          facebook?: string | null
          featured_order?: number | null
          google_maps_url?: string | null
          google_place_id?: string | null
          hero_image_url?: string | null
          hours?: Json | null
          id?: string
          import_batch_id?: string | null
          instagram?: string | null
          is_active?: boolean | null
          is_claimed?: boolean | null
          is_editor_pick?: boolean | null
          is_featured?: boolean | null
          is_hidden_gem?: boolean | null
          is_trending?: boolean | null
          is_verified?: boolean | null
          last_synced_at?: string | null
          last_verified_at?: string | null
          latitude?: number | null
          linkedin?: string | null
          logo_url?: string | null
          long_description?: string | null
          longitude?: number | null
          menu_url?: string | null
          merge_candidate_status?: string
          name?: string
          needs_review?: boolean
          phone?: string | null
          photos?: string[] | null
          plan_tier?: string
          quarantine_reason?: string | null
          quarantine_status?: string
          rating?: number | null
          record_status?: string
          region?: string
          review_count?: number | null
          seo_cohort?: string
          services?: Json | null
          slug?: string
          source?: string | null
          source_url?: string | null
          state?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subcategory?: string | null
          subscription_current_period_end?: string | null
          subscription_status?: string | null
          tagline?: string | null
          tags?: string[] | null
          tiktok?: string | null
          town_name?: string | null
          town_slug?: string
          updated_at?: string
          verification_expires_at?: string | null
          verification_status?: string
          verified_at?: string | null
          video_url?: string | null
          website?: string | null
          website_status?: string | null
          x_url?: string | null
          zipcode?: string | null
        }
        Relationships: []
      }
      category_mapping: {
        Row: {
          approved: boolean
          canonical_category: string
          canonical_group: string
          canonical_service_slug: string | null
          confidence: number
          created_at: string
          id: string
          mapped_by: string
          raw_category: string
        }
        Insert: {
          approved?: boolean
          canonical_category: string
          canonical_group: string
          canonical_service_slug?: string | null
          confidence?: number
          created_at?: string
          id?: string
          mapped_by?: string
          raw_category: string
        }
        Update: {
          approved?: boolean
          canonical_category?: string
          canonical_group?: string
          canonical_service_slug?: string | null
          confidence?: number
          created_at?: string
          id?: string
          mapped_by?: string
          raw_category?: string
        }
        Relationships: []
      }
      closing_team_members: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          business_id: string | null
          created_at: string
          display_order: number
          effective_date: string | null
          evidence_reference: string | null
          id: string
          membership_state: string
          partner_id: string | null
          relationship_disclosure: string | null
          review_due_date: string | null
          role_category: string
          service_area: string | null
          updated_at: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          business_id?: string | null
          created_at?: string
          display_order?: number
          effective_date?: string | null
          evidence_reference?: string | null
          id?: string
          membership_state?: string
          partner_id?: string | null
          relationship_disclosure?: string | null
          review_due_date?: string | null
          role_category: string
          service_area?: string | null
          updated_at?: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          business_id?: string | null
          created_at?: string
          display_order?: number
          effective_date?: string | null
          evidence_reference?: string | null
          id?: string
          membership_state?: string
          partner_id?: string | null
          relationship_disclosure?: string | null
          review_due_date?: string | null
          role_category?: string
          service_area?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "closing_team_members_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_desk_requests: {
        Row: {
          agreed_to_updates: boolean
          created_at: string
          email: string
          first_name: string
          id: string
          lead_type: string | null
          notes: string | null
          property_address: string
          strategy: string
        }
        Insert: {
          agreed_to_updates?: boolean
          created_at?: string
          email: string
          first_name: string
          id?: string
          lead_type?: string | null
          notes?: string | null
          property_address: string
          strategy: string
        }
        Update: {
          agreed_to_updates?: boolean
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          lead_type?: string | null
          notes?: string | null
          property_address?: string
          strategy?: string
        }
        Relationships: []
      }
      demand_signals: {
        Row: {
          clicks: number
          created_at: string
          evidence_note: string | null
          example_queries: string[]
          id: string
          impressions: number
          is_active: boolean
          need_label: string
          need_slug: string
          source: string
          updated_at: string
          window_end: string | null
          window_start: string | null
        }
        Insert: {
          clicks?: number
          created_at?: string
          evidence_note?: string | null
          example_queries?: string[]
          id?: string
          impressions?: number
          is_active?: boolean
          need_label: string
          need_slug: string
          source: string
          updated_at?: string
          window_end?: string | null
          window_start?: string | null
        }
        Update: {
          clicks?: number
          created_at?: string
          evidence_note?: string | null
          example_queries?: string[]
          id?: string
          impressions?: number
          is_active?: boolean
          need_label?: string
          need_slug?: string
          source?: string
          updated_at?: string
          window_end?: string | null
          window_start?: string | null
        }
        Relationships: []
      }
      engagement_event_types: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          event_type: string
          is_active: boolean
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          event_type: string
          is_active?: boolean
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          event_type?: string
          is_active?: boolean
        }
        Relationships: []
      }
      engagement_events: {
        Row: {
          browser_family: string | null
          business_id: string | null
          business_slug: string | null
          created_at: string
          device_class: string | null
          event_id: string
          event_schema_version: number
          event_type: string
          id: string
          internal_test: boolean
          metadata: Json
          referrer: string | null
          referrer_host: string | null
          region_slug: string
          result_count: number | null
          route_path: string | null
          service_slug: string | null
          session_id: string | null
          town_slug: string | null
          traffic_class: string
          traffic_source: string | null
          user_agent: string | null
        }
        Insert: {
          browser_family?: string | null
          business_id?: string | null
          business_slug?: string | null
          created_at?: string
          device_class?: string | null
          event_id?: string
          event_schema_version?: number
          event_type: string
          id?: string
          internal_test?: boolean
          metadata?: Json
          referrer?: string | null
          referrer_host?: string | null
          region_slug?: string
          result_count?: number | null
          route_path?: string | null
          service_slug?: string | null
          session_id?: string | null
          town_slug?: string | null
          traffic_class?: string
          traffic_source?: string | null
          user_agent?: string | null
        }
        Update: {
          browser_family?: string | null
          business_id?: string | null
          business_slug?: string | null
          created_at?: string
          device_class?: string | null
          event_id?: string
          event_schema_version?: number
          event_type?: string
          id?: string
          internal_test?: boolean
          metadata?: Json
          referrer?: string | null
          referrer_host?: string | null
          region_slug?: string
          result_count?: number | null
          route_path?: string | null
          service_slug?: string | null
          session_id?: string | null
          town_slug?: string | null
          traffic_class?: string
          traffic_source?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_event_type_fkey"
            columns: ["event_type"]
            isOneToOne: false
            referencedRelation: "engagement_event_types"
            referencedColumns: ["event_type"]
          },
        ]
      }
      engagement_rate_limits: {
        Row: {
          bucket: string
          expires_at: string
          fingerprint: string
          hits: number
          window_start: string
        }
        Insert: {
          bucket: string
          expires_at?: string
          fingerprint: string
          hits?: number
          window_start: string
        }
        Update: {
          bucket?: string
          expires_at?: string
          fingerprint?: string
          hits?: number
          window_start?: string
        }
        Relationships: []
      }
      high_yield_assets: {
        Row: {
          address: string
          cap_rate: number | null
          cash_on_cash_return: number | null
          created_at: string
          featured_order: number | null
          gross_rent: string | null
          id: string
          is_active: boolean | null
          mls_id: string | null
          price: string
          property_type: string
          thumbnail_url: string | null
          town_slug: string
          units: number | null
          updated_at: string
        }
        Insert: {
          address: string
          cap_rate?: number | null
          cash_on_cash_return?: number | null
          created_at?: string
          featured_order?: number | null
          gross_rent?: string | null
          id?: string
          is_active?: boolean | null
          mls_id?: string | null
          price: string
          property_type: string
          thumbnail_url?: string | null
          town_slug: string
          units?: number | null
          updated_at?: string
        }
        Update: {
          address?: string
          cap_rate?: number | null
          cash_on_cash_return?: number | null
          created_at?: string
          featured_order?: number | null
          gross_rent?: string | null
          id?: string
          is_active?: boolean | null
          mls_id?: string | null
          price?: string
          property_type?: string
          thumbnail_url?: string | null
          town_slug?: string
          units?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      intel_report_leads: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          page_url: string | null
          phone: string | null
          referrer: string | null
          report_slug: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          page_url?: string | null
          phone?: string | null
          referrer?: string | null
          report_slug: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          page_url?: string | null
          phone?: string | null
          referrer?: string | null
          report_slug?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      investment_leads: {
        Row: {
          created_at: string
          email: string
          estimated_rent: number | null
          full_name: string
          id: string
          lead_type: string
          notes: string | null
          phone: string
          property_address: string | null
          purchase_price: number | null
          source_page: string | null
        }
        Insert: {
          created_at?: string
          email: string
          estimated_rent?: number | null
          full_name: string
          id?: string
          lead_type: string
          notes?: string | null
          phone: string
          property_address?: string | null
          purchase_price?: number | null
          source_page?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          estimated_rent?: number | null
          full_name?: string
          id?: string
          lead_type?: string
          notes?: string | null
          phone?: string
          property_address?: string | null
          purchase_price?: number | null
          source_page?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          assigned_agent_id: string | null
          bedrooms: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          lead_type: string | null
          location: string | null
          message: string
          origin_town: string | null
          phone: string | null
          price_range: string | null
          type: string
        }
        Insert: {
          assigned_agent_id?: string | null
          bedrooms?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          lead_type?: string | null
          location?: string | null
          message: string
          origin_town?: string | null
          phone?: string | null
          price_range?: string | null
          type: string
        }
        Update: {
          assigned_agent_id?: string | null
          bedrooms?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          lead_type?: string | null
          location?: string | null
          message?: string
          origin_town?: string | null
          phone?: string | null
          price_range?: string | null
          type?: string
        }
        Relationships: []
      }
      link_clicks: {
        Row: {
          business_id: string | null
          campaign_id: string | null
          country: string | null
          created_at: string
          device: string | null
          id: string
          ip_hash: string | null
          is_bot: boolean
          link_id: string | null
          recipient_email_hash: string | null
          referrer: string | null
          region_id: string | null
          slug: string
          user_agent: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          utm_term: string | null
        }
        Insert: {
          business_id?: string | null
          campaign_id?: string | null
          country?: string | null
          created_at?: string
          device?: string | null
          id?: string
          ip_hash?: string | null
          is_bot?: boolean
          link_id?: string | null
          recipient_email_hash?: string | null
          referrer?: string | null
          region_id?: string | null
          slug: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Update: {
          business_id?: string | null
          campaign_id?: string | null
          country?: string | null
          created_at?: string
          device?: string | null
          id?: string
          ip_hash?: string | null
          is_bot?: boolean
          link_id?: string | null
          recipient_email_hash?: string | null
          referrer?: string | null
          region_id?: string | null
          slug?: string
          user_agent?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          utm_term?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "link_clicks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "link_clicks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "outreach_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_link_id_fkey"
            columns: ["link_id"]
            isOneToOne: false
            referencedRelation: "tracked_links"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "link_clicks_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_agents: {
        Row: {
          active_count: number
          brokerage_name: string | null
          brokerage_slug: string | null
          claim_status: string
          created_at: string
          email: string | null
          id: string
          is_featured: boolean
          name: string
          phone: string | null
          photo_url: string | null
          slug: string
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          towns: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          active_count?: number
          brokerage_name?: string | null
          brokerage_slug?: string | null
          claim_status?: string
          created_at?: string
          email?: string | null
          id?: string
          is_featured?: boolean
          name: string
          phone?: string | null
          photo_url?: string | null
          slug: string
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          towns?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          active_count?: number
          brokerage_name?: string | null
          brokerage_slug?: string | null
          claim_status?: string
          created_at?: string
          email?: string | null
          id?: string
          is_featured?: boolean
          name?: string
          phone?: string | null
          photo_url?: string | null
          slug?: string
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          towns?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      listing_brokerages: {
        Row: {
          active_count: number
          agent_count: number
          claim_status: string
          created_at: string
          id: string
          is_featured: boolean
          name: string
          office_email: string | null
          office_phone: string | null
          office_website: string | null
          slug: string
          towns: string[] | null
          updated_at: string
        }
        Insert: {
          active_count?: number
          agent_count?: number
          claim_status?: string
          created_at?: string
          id?: string
          is_featured?: boolean
          name: string
          office_email?: string | null
          office_phone?: string | null
          office_website?: string | null
          slug: string
          towns?: string[] | null
          updated_at?: string
        }
        Update: {
          active_count?: number
          agent_count?: number
          claim_status?: string
          created_at?: string
          id?: string
          is_featured?: boolean
          name?: string
          office_email?: string | null
          office_phone?: string | null
          office_website?: string | null
          slug?: string
          towns?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      listing_claims: {
        Row: {
          agent_slug: string | null
          claimant_company: string | null
          claimant_email: string
          claimant_name: string
          claimant_phone: string
          claimant_role: string | null
          created_at: string
          id: string
          message: string | null
          mls_number: string | null
          preferred_listing_url: string | null
          property_address: string | null
          property_listing_id: string | null
          requested_public_url: string | null
          status: string
          town_slug: string | null
          updated_at: string
        }
        Insert: {
          agent_slug?: string | null
          claimant_company?: string | null
          claimant_email: string
          claimant_name: string
          claimant_phone: string
          claimant_role?: string | null
          created_at?: string
          id?: string
          message?: string | null
          mls_number?: string | null
          preferred_listing_url?: string | null
          property_address?: string | null
          property_listing_id?: string | null
          requested_public_url?: string | null
          status?: string
          town_slug?: string | null
          updated_at?: string
        }
        Update: {
          agent_slug?: string | null
          claimant_company?: string | null
          claimant_email?: string
          claimant_name?: string
          claimant_phone?: string
          claimant_role?: string | null
          created_at?: string
          id?: string
          message?: string | null
          mls_number?: string | null
          preferred_listing_url?: string | null
          property_address?: string | null
          property_listing_id?: string | null
          requested_public_url?: string | null
          status?: string
          town_slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      listings: {
        Row: {
          address_slug: string | null
          agency: string | null
          annual_taxes: number | null
          bathrooms: number | null
          bedrooms: number | null
          cap_rate: number | null
          cash_flow_monthly: number | null
          city: string
          claim_status: string | null
          county: string | null
          created_at: string
          days_on_market: number | null
          deal_score: number | null
          dscr: number | null
          full_address: string | null
          gross_rent_monthly: number | null
          id: string
          is_featured: boolean | null
          is_indexable: boolean | null
          is_investment: boolean | null
          list_date: string | null
          list_price: number | null
          listing_agent: string | null
          listing_agent_email_internal: string | null
          listing_agent_name_internal: string | null
          listing_agent_phone_internal: string | null
          listing_brokerage_internal: string | null
          masked_address: string | null
          mls_number: string | null
          needs_agent_public_url: boolean | null
          noi_annual: number | null
          photo_url: string | null
          property_type: string | null
          property_type_code: string | null
          public_listing_url: string | null
          public_listing_url_approved: boolean | null
          remarks: string | null
          sqft: number | null
          status: string | null
          street_name: string | null
          street_number: string | null
          town_slug: string | null
          units: number | null
          updated_at: string
          year_built: number | null
          zipcode: string | null
        }
        Insert: {
          address_slug?: string | null
          agency?: string | null
          annual_taxes?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          cap_rate?: number | null
          cash_flow_monthly?: number | null
          city: string
          claim_status?: string | null
          county?: string | null
          created_at?: string
          days_on_market?: number | null
          deal_score?: number | null
          dscr?: number | null
          full_address?: string | null
          gross_rent_monthly?: number | null
          id?: string
          is_featured?: boolean | null
          is_indexable?: boolean | null
          is_investment?: boolean | null
          list_date?: string | null
          list_price?: number | null
          listing_agent?: string | null
          listing_agent_email_internal?: string | null
          listing_agent_name_internal?: string | null
          listing_agent_phone_internal?: string | null
          listing_brokerage_internal?: string | null
          masked_address?: string | null
          mls_number?: string | null
          needs_agent_public_url?: boolean | null
          noi_annual?: number | null
          photo_url?: string | null
          property_type?: string | null
          property_type_code?: string | null
          public_listing_url?: string | null
          public_listing_url_approved?: boolean | null
          remarks?: string | null
          sqft?: number | null
          status?: string | null
          street_name?: string | null
          street_number?: string | null
          town_slug?: string | null
          units?: number | null
          updated_at?: string
          year_built?: number | null
          zipcode?: string | null
        }
        Update: {
          address_slug?: string | null
          agency?: string | null
          annual_taxes?: number | null
          bathrooms?: number | null
          bedrooms?: number | null
          cap_rate?: number | null
          cash_flow_monthly?: number | null
          city?: string
          claim_status?: string | null
          county?: string | null
          created_at?: string
          days_on_market?: number | null
          deal_score?: number | null
          dscr?: number | null
          full_address?: string | null
          gross_rent_monthly?: number | null
          id?: string
          is_featured?: boolean | null
          is_indexable?: boolean | null
          is_investment?: boolean | null
          list_date?: string | null
          list_price?: number | null
          listing_agent?: string | null
          listing_agent_email_internal?: string | null
          listing_agent_name_internal?: string | null
          listing_agent_phone_internal?: string | null
          listing_brokerage_internal?: string | null
          masked_address?: string | null
          mls_number?: string | null
          needs_agent_public_url?: boolean | null
          noi_annual?: number | null
          photo_url?: string | null
          property_type?: string | null
          property_type_code?: string | null
          public_listing_url?: string | null
          public_listing_url_approved?: boolean | null
          remarks?: string | null
          sqft?: number | null
          status?: string | null
          street_name?: string | null
          street_number?: string | null
          town_slug?: string | null
          units?: number | null
          updated_at?: string
          year_built?: number | null
          zipcode?: string | null
        }
        Relationships: []
      }
      local_voices: {
        Row: {
          alpha_insight: string | null
          business_logo_url: string | null
          business_name: string
          created_at: string
          display_order: number | null
          growth_vision: string | null
          id: string
          is_verified: boolean | null
          origin_story: string | null
          owner_name: string
          owner_photo_url: string | null
          primary_offering: string | null
          town_slug: string
          website_url: string | null
        }
        Insert: {
          alpha_insight?: string | null
          business_logo_url?: string | null
          business_name: string
          created_at?: string
          display_order?: number | null
          growth_vision?: string | null
          id?: string
          is_verified?: boolean | null
          origin_story?: string | null
          owner_name: string
          owner_photo_url?: string | null
          primary_offering?: string | null
          town_slug: string
          website_url?: string | null
        }
        Update: {
          alpha_insight?: string | null
          business_logo_url?: string | null
          business_name?: string
          created_at?: string
          display_order?: number | null
          growth_vision?: string | null
          id?: string
          is_verified?: boolean | null
          origin_story?: string | null
          owner_name?: string
          owner_photo_url?: string | null
          primary_offering?: string | null
          town_slug?: string
          website_url?: string | null
        }
        Relationships: []
      }
      market_report_leads: {
        Row: {
          address_to_analyze: string | null
          buyer_type: string
          created_at: string
          email: string
          full_name: string
          id: string
          phone: string | null
          town_name: string
          town_slug: string
        }
        Insert: {
          address_to_analyze?: string | null
          buyer_type: string
          created_at?: string
          email: string
          full_name: string
          id?: string
          phone?: string | null
          town_name: string
          town_slug: string
        }
        Update: {
          address_to_analyze?: string | null
          buyer_type?: string
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          town_name?: string
          town_slug?: string
        }
        Relationships: []
      }
      media_stories: {
        Row: {
          approved: boolean
          category: string
          created_at: string
          created_by: string | null
          featured: boolean
          has_video: boolean
          headline: string
          id: string
          priority_score: number
          published_at: string
          source_article_url: string | null
          source_name: string
          source_short_name: string | null
          summary: string | null
          town: string | null
          updated_at: string
          video_embed_url: string | null
        }
        Insert: {
          approved?: boolean
          category: string
          created_at?: string
          created_by?: string | null
          featured?: boolean
          has_video?: boolean
          headline: string
          id?: string
          priority_score?: number
          published_at?: string
          source_article_url?: string | null
          source_name: string
          source_short_name?: string | null
          summary?: string | null
          town?: string | null
          updated_at?: string
          video_embed_url?: string | null
        }
        Update: {
          approved?: boolean
          category?: string
          created_at?: string
          created_by?: string | null
          featured?: boolean
          has_video?: boolean
          headline?: string
          id?: string
          priority_score?: number
          published_at?: string
          source_article_url?: string | null
          source_name?: string
          source_short_name?: string | null
          summary?: string | null
          town?: string | null
          updated_at?: string
          video_embed_url?: string | null
        }
        Relationships: []
      }
      outreach_campaigns: {
        Row: {
          created_at: string
          id: string
          name: string
          notes: string | null
          region_id: string | null
          segment: string | null
          sent_at: string | null
          template: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          notes?: string | null
          region_id?: string | null
          segment?: string | null
          sent_at?: string | null
          template?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          notes?: string | null
          region_id?: string | null
          segment?: string | null
          sent_at?: string | null
          template?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "outreach_campaigns_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      outreach_recipients: {
        Row: {
          business_id: string | null
          business_name: string | null
          campaign_id: string | null
          click_count: number
          created_at: string
          email: string | null
          email_hash: string | null
          first_click_at: string | null
          id: string
          interest_score: number
          last_seen_at: string | null
          notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          business_id?: string | null
          business_name?: string | null
          campaign_id?: string | null
          click_count?: number
          created_at?: string
          email?: string | null
          email_hash?: string | null
          first_click_at?: string | null
          id?: string
          interest_score?: number
          last_seen_at?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          business_id?: string | null
          business_name?: string | null
          campaign_id?: string | null
          click_count?: number
          created_at?: string
          email?: string | null
          email_hash?: string | null
          first_click_at?: string | null
          id?: string
          interest_score?: number
          last_seen_at?: string | null
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "outreach_recipients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_recipients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_recipients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "outreach_recipients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_recipients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_recipients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_recipients_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "outreach_recipients_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "outreach_campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          interested_package: string | null
          name: string
          notes: string | null
          phone: string
          profession_category: string | null
          social_links: Json | null
          source_page: string | null
          status: string
          towns_of_interest: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          interested_package?: string | null
          name: string
          notes?: string | null
          phone: string
          profession_category?: string | null
          social_links?: Json | null
          source_page?: string | null
          status?: string
          towns_of_interest?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          interested_package?: string | null
          name?: string
          notes?: string | null
          phone?: string
          profession_category?: string | null
          social_links?: Json | null
          source_page?: string | null
          status?: string
          towns_of_interest?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      partner_placements: {
        Row: {
          badge_text: string | null
          category: string | null
          created_at: string
          featured_position: number | null
          founding_rate_locked: boolean | null
          id: string
          monthly_price: number | null
          notes: string | null
          partner_id: string
          placement_type: string
          renewal_date: string | null
          start_date: string | null
          status: string
          tier: string | null
          town_id: string | null
          town_slug: string | null
          updated_at: string
        }
        Insert: {
          badge_text?: string | null
          category?: string | null
          created_at?: string
          featured_position?: number | null
          founding_rate_locked?: boolean | null
          id?: string
          monthly_price?: number | null
          notes?: string | null
          partner_id: string
          placement_type?: string
          renewal_date?: string | null
          start_date?: string | null
          status?: string
          tier?: string | null
          town_id?: string | null
          town_slug?: string | null
          updated_at?: string
        }
        Update: {
          badge_text?: string | null
          category?: string | null
          created_at?: string
          featured_position?: number | null
          founding_rate_locked?: boolean | null
          id?: string
          monthly_price?: number | null
          notes?: string | null
          partner_id?: string
          placement_type?: string
          renewal_date?: string | null
          start_date?: string | null
          status?: string
          tier?: string | null
          town_id?: string | null
          town_slug?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "partner_placements_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "partners"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "partner_placements_town_id_fkey"
            columns: ["town_id"]
            isOneToOne: false
            referencedRelation: "towns"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_referrals: {
        Row: {
          client_name: string
          client_phone: string
          created_at: string
          id: string
          notes: string | null
          partner_id: string
          project_type: Database["public"]["Enums"]["referral_project_type"]
          status: string | null
        }
        Insert: {
          client_name: string
          client_phone: string
          created_at?: string
          id?: string
          notes?: string | null
          partner_id: string
          project_type: Database["public"]["Enums"]["referral_project_type"]
          status?: string | null
        }
        Update: {
          client_name?: string
          client_phone?: string
          created_at?: string
          id?: string
          notes?: string | null
          partner_id?: string
          project_type?: Database["public"]["Enums"]["referral_project_type"]
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "partner_referrals_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "business_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partner_subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean | null
          partner_id: string
          price_cents: number
          purchased_at: string | null
          subscription_type: Database["public"]["Enums"]["partner_subscription_type"]
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          partner_id: string
          price_cents: number
          purchased_at?: string | null
          subscription_type: Database["public"]["Enums"]["partner_subscription_type"]
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          partner_id?: string
          price_cents?: number
          purchased_at?: string | null
          subscription_type?: Database["public"]["Enums"]["partner_subscription_type"]
        }
        Relationships: [
          {
            foreignKeyName: "partner_subscriptions_partner_id_fkey"
            columns: ["partner_id"]
            isOneToOne: false
            referencedRelation: "business_partners"
            referencedColumns: ["id"]
          },
        ]
      }
      partners: {
        Row: {
          bio: string | null
          brokerage_or_company: string | null
          category: string
          company: string | null
          created_at: string
          email: string | null
          id: string
          license_or_title: string | null
          logo_url: string | null
          name: string
          phone: string | null
          preferred_contact_email: string | null
          preferred_contact_phone: string | null
          preferred_cta_label: string | null
          preferred_cta_url: string | null
          profile_photo_url: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          social_tiktok: string | null
          social_youtube: string | null
          status: string
          towns_served: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          bio?: string | null
          brokerage_or_company?: string | null
          category?: string
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          license_or_title?: string | null
          logo_url?: string | null
          name: string
          phone?: string | null
          preferred_contact_email?: string | null
          preferred_contact_phone?: string | null
          preferred_cta_label?: string | null
          preferred_cta_url?: string | null
          profile_photo_url?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_tiktok?: string | null
          social_youtube?: string | null
          status?: string
          towns_served?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          bio?: string | null
          brokerage_or_company?: string | null
          category?: string
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          license_or_title?: string | null
          logo_url?: string | null
          name?: string
          phone?: string | null
          preferred_contact_email?: string | null
          preferred_contact_phone?: string | null
          preferred_cta_label?: string | null
          preferred_cta_url?: string | null
          profile_photo_url?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_tiktok?: string | null
          social_youtube?: string | null
          status?: string
          towns_served?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          baths: number | null
          beds: number | null
          boldtrail_url: string | null
          city: string
          created_at: string
          days_on_market: number | null
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          lot_size: number | null
          mls_id: string | null
          photos: string[] | null
          price: number
          property_type: string | null
          sqft: number | null
          state: string | null
          status: string | null
          updated_at: string
          year_built: number | null
          zip: string | null
        }
        Insert: {
          address: string
          baths?: number | null
          beds?: number | null
          boldtrail_url?: string | null
          city: string
          created_at?: string
          days_on_market?: number | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          lot_size?: number | null
          mls_id?: string | null
          photos?: string[] | null
          price: number
          property_type?: string | null
          sqft?: number | null
          state?: string | null
          status?: string | null
          updated_at?: string
          year_built?: number | null
          zip?: string | null
        }
        Update: {
          address?: string
          baths?: number | null
          beds?: number | null
          boldtrail_url?: string | null
          city?: string
          created_at?: string
          days_on_market?: number | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          lot_size?: number | null
          mls_id?: string | null
          photos?: string[] | null
          price?: number
          property_type?: string | null
          sqft?: number | null
          state?: string | null
          status?: string | null
          updated_at?: string
          year_built?: number | null
          zip?: string | null
        }
        Relationships: []
      }
      property_listings: {
        Row: {
          acres: number | null
          address: string
          address_slug: string
          agent_email: string | null
          agent_name: string | null
          agent_phone: string | null
          agent_slug: string | null
          agent_website: string | null
          baths: number | null
          beds: number | null
          brokerage_name: string | null
          brokerage_slug: string | null
          city: string | null
          claim_status: string
          county: string | null
          created_at: string
          days_on_market: number | null
          id: string
          is_featured: boolean
          is_indexable: boolean
          listing_contract_date: string | null
          mls_number: string
          needs_agent_public_url: boolean
          price: number | null
          property_category: string | null
          property_subtype: string | null
          public_listing_url: string | null
          raw: Json | null
          school_district: string | null
          source_type: string
          sqft: number | null
          status: string
          town_slug: string | null
          updated_at: string
          year_built: number | null
        }
        Insert: {
          acres?: number | null
          address: string
          address_slug: string
          agent_email?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          agent_slug?: string | null
          agent_website?: string | null
          baths?: number | null
          beds?: number | null
          brokerage_name?: string | null
          brokerage_slug?: string | null
          city?: string | null
          claim_status?: string
          county?: string | null
          created_at?: string
          days_on_market?: number | null
          id?: string
          is_featured?: boolean
          is_indexable?: boolean
          listing_contract_date?: string | null
          mls_number: string
          needs_agent_public_url?: boolean
          price?: number | null
          property_category?: string | null
          property_subtype?: string | null
          public_listing_url?: string | null
          raw?: Json | null
          school_district?: string | null
          source_type?: string
          sqft?: number | null
          status?: string
          town_slug?: string | null
          updated_at?: string
          year_built?: number | null
        }
        Update: {
          acres?: number | null
          address?: string
          address_slug?: string
          agent_email?: string | null
          agent_name?: string | null
          agent_phone?: string | null
          agent_slug?: string | null
          agent_website?: string | null
          baths?: number | null
          beds?: number | null
          brokerage_name?: string | null
          brokerage_slug?: string | null
          city?: string | null
          claim_status?: string
          county?: string | null
          created_at?: string
          days_on_market?: number | null
          id?: string
          is_featured?: boolean
          is_indexable?: boolean
          listing_contract_date?: string | null
          mls_number?: string
          needs_agent_public_url?: boolean
          price?: number | null
          property_category?: string | null
          property_subtype?: string | null
          public_listing_url?: string | null
          raw?: Json | null
          school_district?: string | null
          source_type?: string
          sqft?: number | null
          status?: string
          town_slug?: string | null
          updated_at?: string
          year_built?: number | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          created_at: string
          default_cta_href: string | null
          default_cta_label: string | null
          default_hero_subtitle: string | null
          default_hero_title: string | null
          domain: string | null
          font_family: string
          hero_image_url: string | null
          id: string
          launch_status: string
          logo_url: string | null
          name: string
          partner_pricing: Json
          primary_color: string
          realscout_id: string | null
          secondary_color: string
          slug: string
          sort_order: number
          tagline: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          default_cta_href?: string | null
          default_cta_label?: string | null
          default_hero_subtitle?: string | null
          default_hero_title?: string | null
          domain?: string | null
          font_family?: string
          hero_image_url?: string | null
          id?: string
          launch_status?: string
          logo_url?: string | null
          name: string
          partner_pricing?: Json
          primary_color?: string
          realscout_id?: string | null
          secondary_color?: string
          slug: string
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          default_cta_href?: string | null
          default_cta_label?: string | null
          default_hero_subtitle?: string | null
          default_hero_title?: string | null
          domain?: string | null
          font_family?: string
          hero_image_url?: string | null
          id?: string
          launch_status?: string
          logo_url?: string | null
          name?: string
          partner_pricing?: Json
          primary_color?: string
          realscout_id?: string | null
          secondary_color?: string
          slug?: string
          sort_order?: number
          tagline?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      rental_applications: {
        Row: {
          annual_income: string
          created_at: string
          current_address: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          move_in_date: string
          phone: string | null
          rental_id: string | null
        }
        Insert: {
          annual_income: string
          created_at?: string
          current_address?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          move_in_date: string
          phone?: string | null
          rental_id?: string | null
        }
        Update: {
          annual_income?: string
          created_at?: string
          current_address?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          move_in_date?: string
          phone?: string | null
          rental_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rental_applications_rental_id_fkey"
            columns: ["rental_id"]
            isOneToOne: false
            referencedRelation: "rentals"
            referencedColumns: ["id"]
          },
        ]
      }
      rentals: {
        Row: {
          address: string
          available_date: string | null
          bathrooms: number
          bedrooms: number
          created_at: string
          days_on_market: number | null
          description: string | null
          featured_order: number | null
          id: string
          is_active: boolean | null
          latitude: number | null
          listing_agent: string | null
          longitude: number | null
          mls_number: string | null
          pet_friendly: boolean | null
          photos: string[] | null
          property_sub_type: string | null
          property_video_url: string | null
          remarks: string | null
          rent_price: number
          sqft: number | null
          town_slug: string
          updated_at: string
          utilities_included: boolean | null
        }
        Insert: {
          address: string
          available_date?: string | null
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          days_on_market?: number | null
          description?: string | null
          featured_order?: number | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          listing_agent?: string | null
          longitude?: number | null
          mls_number?: string | null
          pet_friendly?: boolean | null
          photos?: string[] | null
          property_sub_type?: string | null
          property_video_url?: string | null
          remarks?: string | null
          rent_price: number
          sqft?: number | null
          town_slug: string
          updated_at?: string
          utilities_included?: boolean | null
        }
        Update: {
          address?: string
          available_date?: string | null
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          days_on_market?: number | null
          description?: string | null
          featured_order?: number | null
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          listing_agent?: string | null
          longitude?: number | null
          mls_number?: string | null
          pet_friendly?: boolean | null
          photos?: string[] | null
          property_sub_type?: string | null
          property_video_url?: string | null
          remarks?: string | null
          rent_price?: number
          sqft?: number | null
          town_slug?: string
          updated_at?: string
          utilities_included?: boolean | null
        }
        Relationships: []
      }
      seo_protected_urls: {
        Row: {
          allow_merge: boolean
          allow_noindex: boolean
          allow_slug_change: boolean
          average_position: number | null
          business_id: string | null
          business_slug: string | null
          clicks_28d: number
          clicks_90d: number
          ctr: number | null
          id: string
          impressions_28d: number
          impressions_90d: number
          notes: string | null
          protected_at: string
          protection_reason: string
          protection_tier: string
          review_status: string
          reviewed_at: string | null
          reviewed_by: string | null
          route_family: string
          source_window: string
          updated_at: string
          url: string
        }
        Insert: {
          allow_merge?: boolean
          allow_noindex?: boolean
          allow_slug_change?: boolean
          average_position?: number | null
          business_id?: string | null
          business_slug?: string | null
          clicks_28d?: number
          clicks_90d?: number
          ctr?: number | null
          id?: string
          impressions_28d?: number
          impressions_90d?: number
          notes?: string | null
          protected_at?: string
          protection_reason: string
          protection_tier?: string
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          route_family?: string
          source_window: string
          updated_at?: string
          url: string
        }
        Update: {
          allow_merge?: boolean
          allow_noindex?: boolean
          allow_slug_change?: boolean
          average_position?: number | null
          business_id?: string | null
          business_slug?: string | null
          clicks_28d?: number
          clicks_90d?: number
          ctr?: number | null
          id?: string
          impressions_28d?: number
          impressions_90d?: number
          notes?: string | null
          protected_at?: string
          protection_reason?: string
          protection_tier?: string
          review_status?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          route_family?: string
          source_window?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_protected_urls_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_protected_urls_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_protected_urls_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "seo_protected_urls_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_protected_urls_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_protected_urls_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_protected_urls_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          active: boolean
          annual_price_cents: number
          created_at: string
          description: string | null
          features: Json
          id: string
          monthly_price_cents: number
          plan_key: string
          plan_name: string
          region_slug: string
          sort_order: number
          stripe_annual_price_id: string | null
          stripe_monthly_price_id: string | null
          stripe_product_id: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean
          annual_price_cents?: number
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          monthly_price_cents?: number
          plan_key: string
          plan_name: string
          region_slug?: string
          sort_order?: number
          stripe_annual_price_id?: string | null
          stripe_monthly_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean
          annual_price_cents?: number
          created_at?: string
          description?: string | null
          features?: Json
          id?: string
          monthly_price_cents?: number
          plan_key?: string
          plan_name?: string
          region_slug?: string
          sort_order?: number
          stripe_annual_price_id?: string | null
          stripe_monthly_price_id?: string | null
          stripe_product_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      town_civic_directory: {
        Row: {
          address: string | null
          calendar_url: string | null
          category: Database["public"]["Enums"]["civic_category"]
          contact_name: string | null
          contact_photo_url: string | null
          contact_title: string | null
          created_at: string
          description: string | null
          display_order: number | null
          email: string | null
          id: string
          is_active: boolean | null
          last_verified_at: string | null
          office_hours: string | null
          office_name: string | null
          pdf_url: string | null
          phone: string | null
          subtitle: string | null
          title: string
          town_slug: string
          updated_at: string
          website_url: string | null
        }
        Insert: {
          address?: string | null
          calendar_url?: string | null
          category: Database["public"]["Enums"]["civic_category"]
          contact_name?: string | null
          contact_photo_url?: string | null
          contact_title?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          last_verified_at?: string | null
          office_hours?: string | null
          office_name?: string | null
          pdf_url?: string | null
          phone?: string | null
          subtitle?: string | null
          title: string
          town_slug: string
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          address?: string | null
          calendar_url?: string | null
          category?: Database["public"]["Enums"]["civic_category"]
          contact_name?: string | null
          contact_photo_url?: string | null
          contact_title?: string | null
          created_at?: string
          description?: string | null
          display_order?: number | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          last_verified_at?: string | null
          office_hours?: string | null
          office_name?: string | null
          pdf_url?: string | null
          phone?: string | null
          subtitle?: string | null
          title?: string
          town_slug?: string
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      town_events: {
        Row: {
          address: string | null
          business_id: string | null
          category: string | null
          created_at: string
          cta_label: string | null
          cta_url: string | null
          description: string | null
          display_order: number | null
          ends_at: string | null
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          starts_at: string
          title: string
          town_name: string | null
          town_slug: string
          updated_at: string
          venue_name: string | null
        }
        Insert: {
          address?: string | null
          business_id?: string | null
          category?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          display_order?: number | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          starts_at: string
          title: string
          town_name?: string | null
          town_slug: string
          updated_at?: string
          venue_name?: string | null
        }
        Update: {
          address?: string | null
          business_id?: string | null
          category?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          description?: string | null
          display_order?: number | null
          ends_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          starts_at?: string
          title?: string
          town_name?: string | null
          town_slug?: string
          updated_at?: string
          venue_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "town_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "town_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "town_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "town_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "town_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "town_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "town_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      town_landmarks: {
        Row: {
          category: string
          created_at: string
          detail: string | null
          display_order: number | null
          headline: string | null
          icon: string
          id: string
          is_active: boolean | null
          label: string
          nest_score: number
          town_slug: string
          updated_at: string
          x: number
          y: number
        }
        Insert: {
          category?: string
          created_at?: string
          detail?: string | null
          display_order?: number | null
          headline?: string | null
          icon?: string
          id?: string
          is_active?: boolean | null
          label: string
          nest_score?: number
          town_slug: string
          updated_at?: string
          x: number
          y: number
        }
        Update: {
          category?: string
          created_at?: string
          detail?: string | null
          display_order?: number | null
          headline?: string | null
          icon?: string
          id?: string
          is_active?: boolean | null
          label?: string
          nest_score?: number
          town_slug?: string
          updated_at?: string
          x?: number
          y?: number
        }
        Relationships: []
      }
      town_ledger: {
        Row: {
          category: string
          content: string | null
          created_at: string
          icon: string | null
          id: string
          is_featured: boolean | null
          published_at: string
          source_url: string | null
          title: string
          town_slug: string
        }
        Insert: {
          category: string
          content?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_featured?: boolean | null
          published_at?: string
          source_url?: string | null
          title: string
          town_slug: string
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string
          icon?: string | null
          id?: string
          is_featured?: boolean | null
          published_at?: string
          source_url?: string | null
          title?: string
          town_slug?: string
        }
        Relationships: []
      }
      town_market_data: {
        Row: {
          active_listings: number | null
          agent_search_url: string | null
          anchor_agent_email: string | null
          anchor_agent_id: string | null
          anchor_agent_name: string | null
          anchor_agent_phone: string | null
          anchor_agent_photo: string | null
          avg_baths: number | null
          avg_beds: number | null
          avg_days_on_market: number | null
          avg_price: number | null
          avg_sqft: number | null
          condo_count: number | null
          created_at: string
          default_zoom: number | null
          hero_landmark: string | null
          id: string
          is_active: boolean | null
          land_count: number | null
          listings_300k_500k: number | null
          listings_500k_750k: number | null
          listings_data: Json | null
          listings_over_750k: number | null
          listings_under_300k: number | null
          map_center_lat: number | null
          map_center_lng: number | null
          market_activity_last_checked: string | null
          market_activity_pdf_url: string | null
          max_price: number | null
          median_price: number | null
          min_price: number | null
          multi_family_count: number | null
          nest_score: number | null
          region_category: string | null
          scraped_at: string
          single_family_count: number | null
          source_url: string | null
          target_yield: number | null
          town_name: string
          town_slug: string
          updated_at: string
        }
        Insert: {
          active_listings?: number | null
          agent_search_url?: string | null
          anchor_agent_email?: string | null
          anchor_agent_id?: string | null
          anchor_agent_name?: string | null
          anchor_agent_phone?: string | null
          anchor_agent_photo?: string | null
          avg_baths?: number | null
          avg_beds?: number | null
          avg_days_on_market?: number | null
          avg_price?: number | null
          avg_sqft?: number | null
          condo_count?: number | null
          created_at?: string
          default_zoom?: number | null
          hero_landmark?: string | null
          id?: string
          is_active?: boolean | null
          land_count?: number | null
          listings_300k_500k?: number | null
          listings_500k_750k?: number | null
          listings_data?: Json | null
          listings_over_750k?: number | null
          listings_under_300k?: number | null
          map_center_lat?: number | null
          map_center_lng?: number | null
          market_activity_last_checked?: string | null
          market_activity_pdf_url?: string | null
          max_price?: number | null
          median_price?: number | null
          min_price?: number | null
          multi_family_count?: number | null
          nest_score?: number | null
          region_category?: string | null
          scraped_at?: string
          single_family_count?: number | null
          source_url?: string | null
          target_yield?: number | null
          town_name: string
          town_slug: string
          updated_at?: string
        }
        Update: {
          active_listings?: number | null
          agent_search_url?: string | null
          anchor_agent_email?: string | null
          anchor_agent_id?: string | null
          anchor_agent_name?: string | null
          anchor_agent_phone?: string | null
          anchor_agent_photo?: string | null
          avg_baths?: number | null
          avg_beds?: number | null
          avg_days_on_market?: number | null
          avg_price?: number | null
          avg_sqft?: number | null
          condo_count?: number | null
          created_at?: string
          default_zoom?: number | null
          hero_landmark?: string | null
          id?: string
          is_active?: boolean | null
          land_count?: number | null
          listings_300k_500k?: number | null
          listings_500k_750k?: number | null
          listings_data?: Json | null
          listings_over_750k?: number | null
          listings_under_300k?: number | null
          map_center_lat?: number | null
          map_center_lng?: number | null
          market_activity_last_checked?: string | null
          market_activity_pdf_url?: string | null
          max_price?: number | null
          median_price?: number | null
          min_price?: number | null
          multi_family_count?: number | null
          nest_score?: number | null
          region_category?: string | null
          scraped_at?: string
          single_family_count?: number | null
          source_url?: string | null
          target_yield?: number | null
          town_name?: string
          town_slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      towns: {
        Row: {
          activity_score: number | null
          county: string | null
          created_at: string
          founding_price: number | null
          future_price: number | null
          id: string
          is_active: boolean
          land_count: number | null
          multifamily_count: number | null
          notes: string | null
          population_estimate: number | null
          property_count: number | null
          region: string | null
          rental_count: number | null
          residential_count: number | null
          town_name: string
          town_slug: string
          town_tier: string
          updated_at: string
        }
        Insert: {
          activity_score?: number | null
          county?: string | null
          created_at?: string
          founding_price?: number | null
          future_price?: number | null
          id?: string
          is_active?: boolean
          land_count?: number | null
          multifamily_count?: number | null
          notes?: string | null
          population_estimate?: number | null
          property_count?: number | null
          region?: string | null
          rental_count?: number | null
          residential_count?: number | null
          town_name: string
          town_slug: string
          town_tier?: string
          updated_at?: string
        }
        Update: {
          activity_score?: number | null
          county?: string | null
          created_at?: string
          founding_price?: number | null
          future_price?: number | null
          id?: string
          is_active?: boolean
          land_count?: number | null
          multifamily_count?: number | null
          notes?: string | null
          population_estimate?: number | null
          property_count?: number | null
          region?: string | null
          rental_count?: number | null
          residential_count?: number | null
          town_name?: string
          town_slug?: string
          town_tier?: string
          updated_at?: string
        }
        Relationships: []
      }
      tracked_links: {
        Row: {
          business_id: string | null
          campaign_id: string | null
          click_count: number
          created_at: string
          destination_url: string
          id: string
          is_active: boolean
          label: string | null
          region_id: string | null
          slug: string
          updated_at: string
        }
        Insert: {
          business_id?: string | null
          campaign_id?: string | null
          click_count?: number
          created_at?: string
          destination_url: string
          id?: string
          is_active?: boolean
          label?: string | null
          region_id?: string | null
          slug: string
          updated_at?: string
        }
        Update: {
          business_id?: string | null
          campaign_id?: string | null
          click_count?: number
          created_at?: string
          destination_url?: string
          id?: string
          is_active?: boolean
          label?: string | null
          region_id?: string | null
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tracked_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracked_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracked_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "tracked_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracked_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracked_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracked_links_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracked_links_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "outreach_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tracked_links_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
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
          role: Database["public"]["Enums"]["app_role"]
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
      business_billing: {
        Row: {
          claimed_by_user_id: string | null
          id: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_current_period_end: string | null
          subscription_status: string | null
        }
        Insert: {
          claimed_by_user_id?: string | null
          id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_current_period_end?: string | null
          subscription_status?: string | null
        }
        Update: {
          claimed_by_user_id?: string | null
          id?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_current_period_end?: string | null
          subscription_status?: string | null
        }
        Relationships: []
      }
      engagement_daily_rollup: {
        Row: {
          actions: number | null
          business_id: string | null
          business_slug: string | null
          day: string | null
          device_class: string | null
          event_type: string | null
          region_slug: string | null
          town_slug: string | null
          zero_result_actions: number | null
        }
        Relationships: [
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "engagement_events_event_type_fkey"
            columns: ["event_type"]
            isOneToOne: false
            referencedRelation: "engagement_event_types"
            referencedColumns: ["event_type"]
          },
        ]
      }
      engagement_traffic_class_rollup: {
        Row: {
          actions: number | null
          day: string | null
          internal_test: boolean | null
          traffic_class: string | null
        }
        Relationships: []
      }
      v_ask_nest_queue: {
        Row: {
          assigned_to: string | null
          business_slug: string | null
          closed_at: string | null
          created_at: string | null
          due_at: string | null
          id: string | null
          outcome: string | null
          overdue: boolean | null
          read_at: string | null
          request_type: string | null
          resolved_at: string | null
          reviewed_at: string | null
          self_reported_discovery: string | null
          status: string | null
          technical_source_family: string | null
          town_slug: string | null
          unread: boolean | null
        }
        Insert: {
          assigned_to?: string | null
          business_slug?: string | null
          closed_at?: string | null
          created_at?: string | null
          due_at?: string | null
          id?: string | null
          outcome?: string | null
          overdue?: never
          read_at?: string | null
          request_type?: string | null
          resolved_at?: string | null
          reviewed_at?: string | null
          self_reported_discovery?: string | null
          status?: string | null
          technical_source_family?: string | null
          town_slug?: string | null
          unread?: never
        }
        Update: {
          assigned_to?: string | null
          business_slug?: string | null
          closed_at?: string | null
          created_at?: string | null
          due_at?: string | null
          id?: string | null
          outcome?: string | null
          overdue?: never
          read_at?: string | null
          request_type?: string | null
          resolved_at?: string | null
          reviewed_at?: string | null
          self_reported_discovery?: string | null
          status?: string | null
          technical_source_family?: string | null
          town_slug?: string | null
          unread?: never
        }
        Relationships: []
      }
      v_business_answerability_readiness: {
        Row: {
          authoritative_source_count: number | null
          business_id: string | null
          eligibility_state: string | null
          has_category_field: boolean | null
          has_hours_field: boolean | null
          has_location_evidence: boolean | null
          has_phone: boolean | null
          has_services_field: boolean | null
          has_social: boolean | null
          has_website: boolean | null
          is_seo_protected: boolean | null
          last_verified_at: string | null
          name: string | null
          owner_asserted: boolean | null
          phone_evidenced: boolean | null
          protection_tier: string | null
          readiness_state: string | null
          record_status: string | null
          seo_cohort: string | null
          services_evidenced: boolean | null
          slug: string | null
          source_count: number | null
          town_name: string | null
          town_slug: string | null
          verification_status: string | null
          website_evidenced: boolean | null
        }
        Relationships: []
      }
      v_business_cohorts: {
        Row: {
          category: string | null
          clicks_90d: number | null
          cohort: string | null
          completeness_score: number | null
          eligibility_state: string | null
          id: string | null
          impressions_90d: number | null
          name: string | null
          protection_tier: string | null
          quarantine_reason: string | null
          slug: string | null
          town_slug: string | null
        }
        Relationships: []
      }
      v_business_field_evidence: {
        Row: {
          address_evidenced: boolean | null
          authoritative_source_count: number | null
          business_id: string | null
          category_evidenced: boolean | null
          editorial_evidence: boolean | null
          has_authoritative_source: boolean | null
          last_asserted_at: string | null
          owner_asserted: boolean | null
          phone_evidenced: boolean | null
          services_evidenced: boolean | null
          source_count: number | null
          website_evidenced: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_billing"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_answerability_readiness"
            referencedColumns: ["business_id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_business_cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_category_conflicts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_poi_candidates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "business_sources_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "v_preview_town_mismatch"
            referencedColumns: ["id"]
          },
        ]
      }
      v_cohort_counts: {
        Row: {
          claimed_enriched: number | null
          editorial_featured: number | null
          merge_flagged_records: number | null
          quarantine_candidate: number | null
          quarantined_records: number | null
          registry_candidate: number | null
          registry_only: number | null
          seo_opportunity: number | null
          seo_protected: number | null
          total_records: number | null
          verified_basic: number | null
          verified_records: number | null
        }
        Relationships: []
      }
      v_data_health_summary: {
        Row: {
          claimed_enriched: number | null
          editorial_featured: number | null
          missing_address: number | null
          missing_description: number | null
          missing_hours: number | null
          missing_image: number | null
          missing_phone: number | null
          missing_website: number | null
          registry_only: number | null
          schenectady_concentration: number | null
          status_active: number | null
          status_merged: number | null
          status_quarantined: number | null
          status_reported_closed: number | null
          status_suppressed: number | null
          total_records: number | null
          two_source_coverage: number | null
          verified_basic: number | null
          with_provenance: number | null
        }
        Relationships: []
      }
      v_demand_summary: {
        Row: {
          businesses_touched: number | null
          event_type: string | null
          events_28d: number | null
          traffic_source: string | null
        }
        Relationships: [
          {
            foreignKeyName: "engagement_events_event_type_fkey"
            columns: ["event_type"]
            isOneToOne: false
            referencedRelation: "engagement_event_types"
            referencedColumns: ["event_type"]
          },
        ]
      }
      v_preview_category_conflicts: {
        Row: {
          category: string | null
          conflict_signal: string | null
          id: string | null
          name: string | null
          planned_action: string | null
          seo_protected: boolean | null
          slug: string | null
          subcategory: string | null
          town_slug: string | null
        }
        Relationships: []
      }
      v_preview_duplicates: {
        Row: {
          address: string | null
          group_key: string | null
          group_size: number | null
          id: string | null
          match_reason: string | null
          name: string | null
          planned_action: string | null
          seo_protected: boolean | null
          slug: string | null
          town_slug: string | null
        }
        Relationships: []
      }
      v_preview_poi_candidates: {
        Row: {
          address: string | null
          category: string | null
          clicks_90d: number | null
          id: string | null
          name: string | null
          planned_action: string | null
          poi_signal: string | null
          protection_tier: string | null
          seo_protected: boolean | null
          slug: string | null
          town_slug: string | null
        }
        Relationships: []
      }
      v_preview_taxonomy_mapping: {
        Row: {
          existing_mapped_category: string | null
          existing_mapped_group: string | null
          mapping_approved: boolean | null
          planned_action: string | null
          proposed_industry_group: string | null
          record_count: number | null
          review_state: string | null
          source_category: string | null
        }
        Relationships: []
      }
      v_preview_town_mismatch: {
        Row: {
          address: string | null
          city: string | null
          city_slug: string | null
          clicks_90d: number | null
          id: string | null
          mismatch_type: string | null
          name: string | null
          planned_action: string | null
          seo_protected: boolean | null
          slug: string | null
          town_name: string | null
          town_slug: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      ask_nest_next_business_day: { Args: { _from?: string }; Returns: string }
      claim_first_admin: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      purge_ask_nest_pii: { Args: { retention_days?: number }; Returns: number }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
      civic_category:
        | "tax_assessor"
        | "code_enforcement"
        | "town_hall"
        | "elected_official"
        | "school_board"
        | "planning_board"
        | "zoning_board"
      partner_subscription_type:
        | "live_social_stack"
        | "priority_contact"
        | "town_hero_video"
      referral_project_type: "commercial" | "residential"
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
      app_role: ["admin", "editor", "user"],
      civic_category: [
        "tax_assessor",
        "code_enforcement",
        "town_hall",
        "elected_official",
        "school_board",
        "planning_board",
        "zoning_board",
      ],
      partner_subscription_type: [
        "live_social_stack",
        "priority_contact",
        "town_hero_video",
      ],
      referral_project_type: ["commercial", "residential"],
    },
  },
} as const
