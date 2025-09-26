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
      blogs: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string
          excerpt: string
          geo_placename: string | null
          geo_position: string | null
          geo_region: string | null
          icbm: string | null
          id: number
          image_url: string | null
          meta_description: string | null
          meta_keywords: string | null
          read_time: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string
          excerpt: string
          geo_placename?: string | null
          geo_position?: string | null
          geo_region?: string | null
          icbm?: string | null
          id?: number
          image_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          read_time?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string
          geo_placename?: string | null
          geo_position?: string | null
          geo_region?: string | null
          icbm?: string | null
          id?: number
          image_url?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          read_time?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      onboarding_applications: {
        Row: {
          accent_color: string | null
          access_control_level: string | null
          apis_required: string | null
          application_id: string | null
          assigned_account_manager: string | null
          backup_preferences: string | null
          branding_guidelines: string | null
          calling_channels: string | null
          calling_features: string[] | null
          calling_service: boolean | null
          calling_users: string | null
          company_address: string | null
          company_name: string
          compliance_requirements: string | null
          contact_person_email: string | null
          contact_person_mobile: string | null
          contact_person_name: string | null
          created_at: string
          custom_theme: string | null
          data_migration: boolean | null
          date_of_signing: string | null
          effective_date: string | null
          email: string
          email_domain: string | null
          email_requirements: string | null
          email_service: boolean | null
          estimated_setup_time: string | null
          existing_systems: string | null
          feature_requests: string | null
          go_live_date: string | null
          gst_number: string | null
          id: string
          inbound_email: string | null
          industry_type: string | null
          inventory_features: string[] | null
          inventory_module: boolean | null
          inventory_other: string | null
          logo_path: string | null
          logo_specs: string | null
          master_data: string[] | null
          master_data_details: string | null
          master_data_other: string | null
          meta_business_id: string | null
          migration_system: string | null
          outbound_email: string | null
          pan_number: string | null
          phone: string | null
          place_of_signing: string | null
          primary_color: string | null
          priority_level: string | null
          registered_address: string | null
          secondary_color: string | null
          signatory_designation: string | null
          signatory_name: string | null
          signature_date: string | null
          sms_other: string | null
          sms_service: boolean | null
          sms_use_cases: string[] | null
          sms_volume: string | null
          special_requirements: string | null
          status: string | null
          support_level: string | null
          total_users: string | null
          training_requirements: string | null
          updated_at: string
          user_details: Json | null
          whatsapp_number: string | null
          whatsapp_other: string | null
          whatsapp_service: boolean | null
          whatsapp_use: string[] | null
        }
        Insert: {
          accent_color?: string | null
          access_control_level?: string | null
          apis_required?: string | null
          application_id?: string | null
          assigned_account_manager?: string | null
          backup_preferences?: string | null
          branding_guidelines?: string | null
          calling_channels?: string | null
          calling_features?: string[] | null
          calling_service?: boolean | null
          calling_users?: string | null
          company_address?: string | null
          company_name: string
          compliance_requirements?: string | null
          contact_person_email?: string | null
          contact_person_mobile?: string | null
          contact_person_name?: string | null
          created_at?: string
          custom_theme?: string | null
          data_migration?: boolean | null
          date_of_signing?: string | null
          effective_date?: string | null
          email: string
          email_domain?: string | null
          email_requirements?: string | null
          email_service?: boolean | null
          estimated_setup_time?: string | null
          existing_systems?: string | null
          feature_requests?: string | null
          go_live_date?: string | null
          gst_number?: string | null
          id?: string
          inbound_email?: string | null
          industry_type?: string | null
          inventory_features?: string[] | null
          inventory_module?: boolean | null
          inventory_other?: string | null
          logo_path?: string | null
          logo_specs?: string | null
          master_data?: string[] | null
          master_data_details?: string | null
          master_data_other?: string | null
          meta_business_id?: string | null
          migration_system?: string | null
          outbound_email?: string | null
          pan_number?: string | null
          phone?: string | null
          place_of_signing?: string | null
          primary_color?: string | null
          priority_level?: string | null
          registered_address?: string | null
          secondary_color?: string | null
          signatory_designation?: string | null
          signatory_name?: string | null
          signature_date?: string | null
          sms_other?: string | null
          sms_service?: boolean | null
          sms_use_cases?: string[] | null
          sms_volume?: string | null
          special_requirements?: string | null
          status?: string | null
          support_level?: string | null
          total_users?: string | null
          training_requirements?: string | null
          updated_at?: string
          user_details?: Json | null
          whatsapp_number?: string | null
          whatsapp_other?: string | null
          whatsapp_service?: boolean | null
          whatsapp_use?: string[] | null
        }
        Update: {
          accent_color?: string | null
          access_control_level?: string | null
          apis_required?: string | null
          application_id?: string | null
          assigned_account_manager?: string | null
          backup_preferences?: string | null
          branding_guidelines?: string | null
          calling_channels?: string | null
          calling_features?: string[] | null
          calling_service?: boolean | null
          calling_users?: string | null
          company_address?: string | null
          company_name?: string
          compliance_requirements?: string | null
          contact_person_email?: string | null
          contact_person_mobile?: string | null
          contact_person_name?: string | null
          created_at?: string
          custom_theme?: string | null
          data_migration?: boolean | null
          date_of_signing?: string | null
          effective_date?: string | null
          email?: string
          email_domain?: string | null
          email_requirements?: string | null
          email_service?: boolean | null
          estimated_setup_time?: string | null
          existing_systems?: string | null
          feature_requests?: string | null
          go_live_date?: string | null
          gst_number?: string | null
          id?: string
          inbound_email?: string | null
          industry_type?: string | null
          inventory_features?: string[] | null
          inventory_module?: boolean | null
          inventory_other?: string | null
          logo_path?: string | null
          logo_specs?: string | null
          master_data?: string[] | null
          master_data_details?: string | null
          master_data_other?: string | null
          meta_business_id?: string | null
          migration_system?: string | null
          outbound_email?: string | null
          pan_number?: string | null
          phone?: string | null
          place_of_signing?: string | null
          primary_color?: string | null
          priority_level?: string | null
          registered_address?: string | null
          secondary_color?: string | null
          signatory_designation?: string | null
          signatory_name?: string | null
          signature_date?: string | null
          sms_other?: string | null
          sms_service?: boolean | null
          sms_use_cases?: string[] | null
          sms_volume?: string | null
          special_requirements?: string | null
          status?: string | null
          support_level?: string | null
          total_users?: string | null
          training_requirements?: string | null
          updated_at?: string
          user_details?: Json | null
          whatsapp_number?: string | null
          whatsapp_other?: string | null
          whatsapp_service?: boolean | null
          whatsapp_use?: string[] | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
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
      [_ in never]: never
    }
    Functions: {
      generate_application_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
