export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      owners: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string | null;
          nationality: string | null;
          preferred_language: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone?: string | null;
          nationality?: string | null;
          preferred_language?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string | null;
          nationality?: string | null;
          preferred_language?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      properties: {
        Row: {
          id: string;
          owner_id: string | null;
          name: string;
          location: string;
          development: string | null;
          unit_number: string | null;
          property_type: string | null;
          bedrooms: number | null;
          status: string;
          monthly_rent: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_id?: string | null;
          name: string;
          location: string;
          development?: string | null;
          unit_number?: string | null;
          property_type?: string | null;
          bedrooms?: number | null;
          status?: string;
          monthly_rent?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_id?: string | null;
          name?: string;
          location?: string;
          development?: string | null;
          unit_number?: string | null;
          property_type?: string | null;
          bedrooms?: number | null;
          status?: string;
          monthly_rent?: number | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey";
            columns: ["owner_id"];
            isOneToOne: false;
            referencedRelation: "owners";
            referencedColumns: ["id"];
          },
        ];
      };
      tenants: {
        Row: {
          id: string;
          property_id: string | null;
          full_name: string;
          email: string | null;
          phone: string;
          lease_start: string | null;
          lease_end: string | null;
          monthly_rent: number | null;
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          property_id?: string | null;
          full_name: string;
          email?: string | null;
          phone: string;
          lease_start?: string | null;
          lease_end?: string | null;
          monthly_rent?: number | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          property_id?: string | null;
          full_name?: string;
          email?: string | null;
          phone?: string;
          lease_start?: string | null;
          lease_end?: string | null;
          monthly_rent?: number | null;
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tenants_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
        ];
      };
      leads: {
        Row: {
          id: string;
          full_name: string;
          email: string;
          phone: string;
          property_location: string | null;
          message: string | null;
          source: string;
          locale: string;
          status: string;
          whatsapp_confirmed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          email: string;
          phone: string;
          property_location?: string | null;
          message?: string | null;
          source?: string;
          locale?: string;
          status?: string;
          whatsapp_confirmed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          email?: string;
          phone?: string;
          property_location?: string | null;
          message?: string | null;
          source?: string;
          locale?: string;
          status?: string;
          whatsapp_confirmed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      owner_property_submissions: {
        Row: {
          id: string;
          owner_name: string;
          whatsapp: string;
          wechat: string | null;
          project: string;
          unit_type: string;
          intent: string;
          notes: string | null;
          locale: string;
          status: string;
          assigned_agent_id: string | null;
          owner_outreach_status: string;
          agent_contact_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          owner_name: string;
          whatsapp: string;
          wechat?: string | null;
          project: string;
          unit_type: string;
          intent: string;
          notes?: string | null;
          locale?: string;
          status?: string;
          assigned_agent_id?: string | null;
          owner_outreach_status?: string;
          agent_contact_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          owner_name?: string;
          whatsapp?: string;
          wechat?: string | null;
          project?: string;
          unit_type?: string;
          intent?: string;
          notes?: string | null;
          locale?: string;
          status?: string;
          assigned_agent_id?: string | null;
          owner_outreach_status?: string;
          agent_contact_status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      tenant_requests: {
        Row: {
          id: string;
          full_name: string;
          contact: string;
          budget: string | null;
          intent: string;
          preferred_project: string | null;
          move_in_date: string | null;
          locale: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          contact: string;
          budget?: string | null;
          intent: string;
          preferred_project?: string | null;
          move_in_date?: string | null;
          locale?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          contact?: string;
          budget?: string | null;
          intent?: string;
          preferred_project?: string | null;
          move_in_date?: string | null;
          locale?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      property_listings: {
        Row: {
          id: string;
          title: string;
          project: string;
          listing_type: string;
          property_type: string | null;
          bedrooms: number | null;
          bathrooms: number | null;
          size_sqft: number | null;
          price: number | null;
          price_label: string | null;
          currency: string;
          image_url: string | null;
          description: string | null;
          is_featured: boolean;
          status: string;
          locale: string;
          agent_id: string | null;
          source_import_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          project: string;
          listing_type: string;
          property_type?: string | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          size_sqft?: number | null;
          price?: number | null;
          price_label?: string | null;
          currency?: string;
          image_url?: string | null;
          description?: string | null;
          is_featured?: boolean;
          status?: string;
          locale?: string;
          agent_id?: string | null;
          source_import_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          project?: string;
          listing_type?: string;
          property_type?: string | null;
          bedrooms?: number | null;
          bathrooms?: number | null;
          size_sqft?: number | null;
          price?: number | null;
          price_label?: string | null;
          currency?: string;
          image_url?: string | null;
          description?: string | null;
          is_featured?: boolean;
          status?: string;
          locale?: string;
          agent_id?: string | null;
          source_import_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      viewing_appointments: {
        Row: {
          id: string;
          full_name: string;
          contact: string;
          email: string | null;
          project: string;
          preferred_date: string | null;
          preferred_time: string | null;
          notes: string | null;
          listing_id: string | null;
          assigned_team: string;
          whatsapp_confirmed: boolean;
          locale: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          contact: string;
          email?: string | null;
          project: string;
          preferred_date?: string | null;
          preferred_time?: string | null;
          notes?: string | null;
          listing_id?: string | null;
          assigned_team?: string;
          whatsapp_confirmed?: boolean;
          locale?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          contact?: string;
          email?: string | null;
          project?: string;
          preferred_date?: string | null;
          preferred_time?: string | null;
          notes?: string | null;
          assigned_team?: string;
          whatsapp_confirmed?: boolean;
          locale?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      golf_travel_inquiries: {
        Row: {
          id: string;
          full_name: string;
          contact: string;
          package_type: string;
          travel_dates: string | null;
          group_size: number | null;
          notes: string | null;
          locale: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          contact: string;
          package_type: string;
          travel_dates?: string | null;
          group_size?: number | null;
          notes?: string | null;
          locale?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          contact?: string;
          package_type?: string;
          travel_dates?: string | null;
          group_size?: number | null;
          notes?: string | null;
          locale?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      corporate_visit_inquiries: {
        Row: {
          id: string;
          full_name: string;
          contact: string;
          company: string | null;
          visit_type: string;
          visit_dates: string | null;
          group_size: number | null;
          notes: string | null;
          locale: string;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          contact: string;
          company?: string | null;
          visit_type: string;
          visit_dates?: string | null;
          group_size?: number | null;
          notes?: string | null;
          locale?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          contact?: string;
          company?: string | null;
          visit_type?: string;
          visit_dates?: string | null;
          group_size?: number | null;
          notes?: string | null;
          locale?: string;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      agents: {
        Row: {
          id: string;
          full_name: string;
          whatsapp: string | null;
          email: string | null;
          agency: string | null;
          commission_rate_pct: number | null;
          commission_notes: string | null;
          project_tags: string[];
          status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          whatsapp?: string | null;
          email?: string | null;
          agency?: string | null;
          commission_rate_pct?: number | null;
          commission_notes?: string | null;
          project_tags?: string[];
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          whatsapp?: string | null;
          email?: string | null;
          agency?: string | null;
          commission_rate_pct?: number | null;
          commission_notes?: string | null;
          project_tags?: string[];
          status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      property_import_queue: {
        Row: {
          id: string;
          source_url: string;
          source_platform: string;
          project: string;
          agent_id: string | null;
          status: string;
          title: string | null;
          notes: string | null;
          listing_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          source_url: string;
          source_platform: string;
          project: string;
          agent_id?: string | null;
          status?: string;
          title?: string | null;
          notes?: string | null;
          listing_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          source_url?: string;
          source_platform?: string;
          project?: string;
          agent_id?: string | null;
          status?: string;
          title?: string | null;
          notes?: string | null;
          listing_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      outreach_follow_up_logs: {
        Row: {
          id: string;
          owner_submission_id: string;
          agent_id: string | null;
          note: string;
          follow_up_date: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          owner_submission_id: string;
          agent_id?: string | null;
          note: string;
          follow_up_date?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          owner_submission_id?: string;
          agent_id?: string | null;
          note?: string;
          follow_up_date?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      co_broke_deals: {
        Row: {
          id: string;
          project: string;
          listing_id: string | null;
          owner_submission_id: string | null;
          source_agent_id: string | null;
          viewing_agent_id: string | null;
          commission_amount: number | null;
          commission_pct: number | null;
          deal_status: string;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          project: string;
          listing_id?: string | null;
          owner_submission_id?: string | null;
          source_agent_id?: string | null;
          viewing_agent_id?: string | null;
          commission_amount?: number | null;
          commission_pct?: number | null;
          deal_status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          project?: string;
          listing_id?: string | null;
          owner_submission_id?: string | null;
          source_agent_id?: string | null;
          viewing_agent_id?: string | null;
          commission_amount?: number | null;
          commission_pct?: number | null;
          deal_status?: string;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Owner = Database["public"]["Tables"]["owners"]["Row"];
export type Property = Database["public"]["Tables"]["properties"]["Row"];
export type Tenant = Database["public"]["Tables"]["tenants"]["Row"];
export type Lead = Database["public"]["Tables"]["leads"]["Row"];
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type OwnerPropertySubmission = Database["public"]["Tables"]["owner_property_submissions"]["Row"];
export type OwnerPropertySubmissionInsert = Database["public"]["Tables"]["owner_property_submissions"]["Insert"];
export type TenantRequest = Database["public"]["Tables"]["tenant_requests"]["Row"];
export type TenantRequestInsert = Database["public"]["Tables"]["tenant_requests"]["Insert"];
export type PropertyListing = Database["public"]["Tables"]["property_listings"]["Row"];
export type PropertyListingInsert = Database["public"]["Tables"]["property_listings"]["Insert"];
export type ViewingAppointment = Database["public"]["Tables"]["viewing_appointments"]["Row"];
export type ViewingAppointmentInsert = Database["public"]["Tables"]["viewing_appointments"]["Insert"];
export type GolfTravelInquiry = Database["public"]["Tables"]["golf_travel_inquiries"]["Row"];
export type GolfTravelInquiryInsert = Database["public"]["Tables"]["golf_travel_inquiries"]["Insert"];
export type CorporateVisitInquiry = Database["public"]["Tables"]["corporate_visit_inquiries"]["Row"];
export type CorporateVisitInquiryInsert = Database["public"]["Tables"]["corporate_visit_inquiries"]["Insert"];
export type Agent = Database["public"]["Tables"]["agents"]["Row"];
export type AgentInsert = Database["public"]["Tables"]["agents"]["Insert"];
export type PropertyImportQueue = Database["public"]["Tables"]["property_import_queue"]["Row"];
export type PropertyImportQueueInsert = Database["public"]["Tables"]["property_import_queue"]["Insert"];
export type OutreachFollowUpLog = Database["public"]["Tables"]["outreach_follow_up_logs"]["Row"];
export type OutreachFollowUpLogInsert = Database["public"]["Tables"]["outreach_follow_up_logs"]["Insert"];
export type CoBrokeDeal = Database["public"]["Tables"]["co_broke_deals"]["Row"];
export type CoBrokeDealInsert = Database["public"]["Tables"]["co_broke_deals"]["Insert"];
