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
