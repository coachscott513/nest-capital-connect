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
      deal_desk_requests: {
        Row: {
          agreed_to_updates: boolean
          created_at: string
          email: string
          first_name: string
          id: string
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
          notes?: string | null
          property_address?: string
          strategy?: string
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
          description: string | null
          featured_order: number | null
          id: string
          is_active: boolean | null
          pet_friendly: boolean | null
          photos: string[] | null
          property_video_url: string | null
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
          description?: string | null
          featured_order?: number | null
          id?: string
          is_active?: boolean | null
          pet_friendly?: boolean | null
          photos?: string[] | null
          property_video_url?: string | null
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
          description?: string | null
          featured_order?: number | null
          id?: string
          is_active?: boolean | null
          pet_friendly?: boolean | null
          photos?: string[] | null
          property_video_url?: string | null
          rent_price?: number
          sqft?: number | null
          town_slug?: string
          updated_at?: string
          utilities_included?: boolean | null
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
          hero_landmark: string | null
          id: string
          is_active: boolean | null
          land_count: number | null
          listings_300k_500k: number | null
          listings_500k_750k: number | null
          listings_data: Json | null
          listings_over_750k: number | null
          listings_under_300k: number | null
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
          hero_landmark?: string | null
          id?: string
          is_active?: boolean | null
          land_count?: number | null
          listings_300k_500k?: number | null
          listings_500k_750k?: number | null
          listings_data?: Json | null
          listings_over_750k?: number | null
          listings_under_300k?: number | null
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
          hero_landmark?: string | null
          id?: string
          is_active?: boolean | null
          land_count?: number | null
          listings_300k_500k?: number | null
          listings_500k_750k?: number | null
          listings_data?: Json | null
          listings_over_750k?: number | null
          listings_under_300k?: number | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
