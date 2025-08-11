export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      device_sessions: {
        Row: {
          data_downloaded: number | null
          data_uploaded: number | null
          disconnection_reason: string | null
          end_time: string | null
          id: string
          ip_address: unknown | null
          is_active: boolean | null
          mac_address: string
          start_time: string | null
          voucher_id: string
        }
        Insert: {
          data_downloaded?: number | null
          data_uploaded?: number | null
          disconnection_reason?: string | null
          end_time?: string | null
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          mac_address: string
          start_time?: string | null
          voucher_id: string
        }
        Update: {
          data_downloaded?: number | null
          data_uploaded?: number | null
          disconnection_reason?: string | null
          end_time?: string | null
          id?: string
          ip_address?: unknown | null
          is_active?: boolean | null
          mac_address?: string
          start_time?: string | null
          voucher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "device_sessions_voucher_id_fkey"
            columns: ["voucher_id"]
            isOneToOne: false
            referencedRelation: "vouchers"
            referencedColumns: ["id"]
          },
        ]
      }
      loyalty_rewards: {
        Row: {
          created_at: string | null
          days_granted: number
          id: string
          is_redeemed: boolean | null
          points_required: number
          redeemed_at: string | null
          reward_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          days_granted: number
          id?: string
          is_redeemed?: boolean | null
          points_required: number
          redeemed_at?: string | null
          reward_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          days_granted?: number
          id?: string
          is_redeemed?: boolean | null
          points_required?: number
          redeemed_at?: string | null
          reward_type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          message: string
          phone_number: string | null
          sent_at: string | null
          status: string | null
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          message: string
          phone_number?: string | null
          sent_at?: string | null
          status?: string | null
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string
          phone_number?: string | null
          sent_at?: string | null
          status?: string | null
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          payment_method: string
          payment_status: string | null
          subscription_id: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          payment_method: string
          payment_status?: string | null
          subscription_id?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          payment_method?: string
          payment_status?: string | null
          subscription_id?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      plans: {
        Row: {
          created_at: string | null
          discount_percent: number | null
          duration_days: number
          final_price_ugx: number
          id: string
          is_active: boolean | null
          name: string
          price_ugx: number
        }
        Insert: {
          created_at?: string | null
          discount_percent?: number | null
          duration_days: number
          final_price_ugx: number
          id?: string
          is_active?: boolean | null
          name: string
          price_ugx: number
        }
        Update: {
          created_at?: string | null
          discount_percent?: number | null
          duration_days?: number
          final_price_ugx?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price_ugx?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          device_changes_used: number | null
          first_name: string | null
          id: string
          last_name: string | null
          loyalty_points: number | null
          mac_address: string
          phone_number: string
          total_spent: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          device_changes_used?: number | null
          first_name?: string | null
          id: string
          last_name?: string | null
          loyalty_points?: number | null
          mac_address: string
          phone_number: string
          total_spent?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          device_changes_used?: number | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          loyalty_points?: number | null
          mac_address?: string
          phone_number?: string
          total_spent?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          amount_paid: number
          created_at: string | null
          end_date: string
          id: string
          is_active: boolean | null
          payment_method: string
          plan_id: string | null
          start_date: string | null
          user_id: string | null
        }
        Insert: {
          amount_paid: number
          created_at?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          payment_method: string
          plan_id?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Update: {
          amount_paid?: number
          created_at?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          payment_method?: string
          plan_id?: string | null
          start_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_logs: {
        Row: {
          bandwidth_used: number | null
          data_downloaded: number | null
          data_uploaded: number | null
          id: string
          session_id: string
          timestamp: string | null
        }
        Insert: {
          bandwidth_used?: number | null
          data_downloaded?: number | null
          data_uploaded?: number | null
          id?: string
          session_id: string
          timestamp?: string | null
        }
        Update: {
          bandwidth_used?: number | null
          data_downloaded?: number | null
          data_uploaded?: number | null
          id?: string
          session_id?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "usage_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "device_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: []
      }
      vouchers: {
        Row: {
          activated_at: string | null
          bandwidth_limit: number | null
          code: string
          created_at: string | null
          created_by: string | null
          data_used: number | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          is_used: boolean | null
          mac_address: string | null
          plan_id: string
          time_limit: number
          user_id: string | null
        }
        Insert: {
          activated_at?: string | null
          bandwidth_limit?: number | null
          code: string
          created_at?: string | null
          created_by?: string | null
          data_used?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_used?: boolean | null
          mac_address?: string | null
          plan_id: string
          time_limit: number
          user_id?: string | null
        }
        Update: {
          activated_at?: string | null
          bandwidth_limit?: number | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          data_used?: number | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_used?: boolean | null
          mac_address?: string | null
          plan_id?: string
          time_limit?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vouchers_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_voucher_code: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { user_uuid: string }
        Returns: string
      }
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
