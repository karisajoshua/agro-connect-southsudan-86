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
      business_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      businesses: {
        Row: {
          business_name: string
          business_type: string
          category_id: string | null
          contact_name: string
          created_at: string | null
          description: string | null
          documents_url: string[] | null
          email: string | null
          id: string
          location: Json
          phone: string
          products_services: string | null
          updated_at: string | null
          user_id: string | null
          verification_status: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          business_name: string
          business_type: string
          category_id?: string | null
          contact_name: string
          created_at?: string | null
          description?: string | null
          documents_url?: string[] | null
          email?: string | null
          id?: string
          location: Json
          phone: string
          products_services?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          business_name?: string
          business_type?: string
          category_id?: string | null
          contact_name?: string
          created_at?: string | null
          description?: string | null
          documents_url?: string[] | null
          email?: string | null
          id?: string
          location?: Json
          phone?: string
          products_services?: string | null
          updated_at?: string | null
          user_id?: string | null
          verification_status?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "business_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          created_at: string
          ecommerce_product_id: string
          id: string
          quantity: number
          user_id: string
        }
        Insert: {
          created_at?: string
          ecommerce_product_id: string
          id?: string
          quantity?: number
          user_id: string
        }
        Update: {
          created_at?: string
          ecommerce_product_id?: string
          id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_ecommerce_product_id_fkey"
            columns: ["ecommerce_product_id"]
            isOneToOne: false
            referencedRelation: "ecommerce_products"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_conversations: {
        Row: {
          created_at: string | null
          id: string
          last_message: string | null
          last_message_at: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message?: string | null
          last_message_at?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          attachments: string[] | null
          content: string
          conversation_id: string
          created_at: string | null
          id: string
          is_bot: boolean | null
          user_id: string | null
        }
        Insert: {
          attachments?: string[] | null
          content: string
          conversation_id: string
          created_at?: string | null
          id?: string
          is_bot?: boolean | null
          user_id?: string | null
        }
        Update: {
          attachments?: string[] | null
          content?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          is_bot?: boolean | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      consultants: {
        Row: {
          availability: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          experience_years: number | null
          full_name: string
          hourly_rate: number | null
          id: string
          location: string | null
          phone: string
          profile_image: string | null
          qualifications: string[] | null
          rating: number | null
          reviews_count: number | null
          specialization: string[] | null
          updated_at: string | null
          user_id: string | null
          verified: boolean | null
        }
        Insert: {
          availability?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          full_name: string
          hourly_rate?: number | null
          id?: string
          location?: string | null
          phone: string
          profile_image?: string | null
          qualifications?: string[] | null
          rating?: number | null
          reviews_count?: number | null
          specialization?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Update: {
          availability?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          experience_years?: number | null
          full_name?: string
          hourly_rate?: number | null
          id?: string
          location?: string | null
          phone?: string
          profile_image?: string | null
          qualifications?: string[] | null
          rating?: number | null
          reviews_count?: number | null
          specialization?: string[] | null
          updated_at?: string | null
          user_id?: string | null
          verified?: boolean | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          phone: string | null
          responded_at: string | null
          responded_by: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          phone?: string | null
          responded_at?: string | null
          responded_by?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      cooperative_members: {
        Row: {
          cooperative_id: string
          id: string
          join_date: string | null
          status: string | null
          user_id: string
        }
        Insert: {
          cooperative_id: string
          id?: string
          join_date?: string | null
          status?: string | null
          user_id: string
        }
        Update: {
          cooperative_id?: string
          id?: string
          join_date?: string | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cooperative_members_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
        ]
      }
      cooperative_requests: {
        Row: {
          cooperative_id: string
          created_at: string | null
          crops: string | null
          documents_url: string[] | null
          farmer_type: string
          full_name: string
          id: string
          location: Json
          phone: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cooperative_id: string
          created_at?: string | null
          crops?: string | null
          documents_url?: string[] | null
          farmer_type: string
          full_name: string
          id?: string
          location: Json
          phone: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cooperative_id?: string
          created_at?: string | null
          crops?: string | null
          documents_url?: string[] | null
          farmer_type?: string
          full_name?: string
          id?: string
          location?: Json
          phone?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cooperative_requests_cooperative_id_fkey"
            columns: ["cooperative_id"]
            isOneToOne: false
            referencedRelation: "cooperatives"
            referencedColumns: ["id"]
          },
        ]
      }
      cooperatives: {
        Row: {
          benefits: string[] | null
          business_id: string | null
          created_at: string | null
          established_date: string | null
          id: string
          membership_fee: number | null
          registration_number: string | null
          total_members: number | null
          updated_at: string | null
        }
        Insert: {
          benefits?: string[] | null
          business_id?: string | null
          created_at?: string | null
          established_date?: string | null
          id?: string
          membership_fee?: number | null
          registration_number?: string | null
          total_members?: number | null
          updated_at?: string | null
        }
        Update: {
          benefits?: string[] | null
          business_id?: string | null
          created_at?: string | null
          established_date?: string | null
          id?: string
          membership_fee?: number | null
          registration_number?: string | null
          total_members?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cooperatives_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      disease_reports: {
        Row: {
          affected_area: string | null
          created_at: string | null
          crop_type: string
          disease_description: string
          disease_type_id: string | null
          email: string | null
          id: string
          location: Json
          notes: string | null
          phone: string
          photo_urls: string[] | null
          reporter_name: string
          severity: string | null
          status: string | null
          symptoms: string | null
          updated_at: string | null
          user_id: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          affected_area?: string | null
          created_at?: string | null
          crop_type: string
          disease_description: string
          disease_type_id?: string | null
          email?: string | null
          id?: string
          location: Json
          notes?: string | null
          phone: string
          photo_urls?: string[] | null
          reporter_name: string
          severity?: string | null
          status?: string | null
          symptoms?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          affected_area?: string | null
          created_at?: string | null
          crop_type?: string
          disease_description?: string
          disease_type_id?: string | null
          email?: string | null
          id?: string
          location?: Json
          notes?: string | null
          phone?: string
          photo_urls?: string[] | null
          reporter_name?: string
          severity?: string | null
          status?: string | null
          symptoms?: string | null
          updated_at?: string | null
          user_id?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "disease_reports_disease_type_id_fkey"
            columns: ["disease_type_id"]
            isOneToOne: false
            referencedRelation: "disease_types"
            referencedColumns: ["id"]
          },
        ]
      }
      disease_types: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          prevention: string | null
          symptoms: string[] | null
          treatment: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          prevention?: string | null
          symptoms?: string[] | null
          treatment?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          prevention?: string | null
          symptoms?: string[] | null
          treatment?: string | null
        }
        Relationships: []
      }
      ecommerce_products: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_available: boolean | null
          min_order_quantity: number | null
          name: string
          price: number
          product_id: string | null
          seller_id: string | null
          stock_quantity: number | null
          subcategory: string | null
          unit: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          min_order_quantity?: number | null
          name: string
          price: number
          product_id?: string | null
          seller_id?: string | null
          stock_quantity?: number | null
          subcategory?: string | null
          unit?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_available?: boolean | null
          min_order_quantity?: number | null
          name?: string
          price?: number
          product_id?: string | null
          seller_id?: string | null
          stock_quantity?: number | null
          subcategory?: string | null
          unit?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ecommerce_products_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecommerce_products_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      farming_tips: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          created_by: string | null
          crop_type: string | null
          id: string
          published: boolean | null
          relevant_months: number[] | null
          season: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          crop_type?: string | null
          id?: string
          published?: boolean | null
          relevant_months?: number[] | null
          season?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          crop_type?: string | null
          id?: string
          published?: boolean | null
          relevant_months?: number[] | null
          season?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      market_prices: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string
          id: string
          market_location: string
          price: number
          product_id: string
          source: string | null
          trend: string | null
          unit: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          id?: string
          market_location: string
          price: number
          product_id: string
          source?: string | null
          trend?: string | null
          unit: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          id?: string
          market_location?: string
          price?: number
          product_id?: string
          source?: string | null
          trend?: string | null
          unit?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "market_prices_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      news_articles: {
        Row: {
          author_id: string | null
          category: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          is_active: boolean | null
          source: string | null
          subscribed_at: string | null
          unsubscribed_at: string | null
        }
        Insert: {
          email: string
          id?: string
          is_active?: boolean | null
          source?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Update: {
          email?: string
          id?: string
          is_active?: boolean | null
          source?: string | null
          subscribed_at?: string | null
          unsubscribed_at?: string | null
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_at: string
          ecommerce_product_id: string
          id: string
          order_id: string
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Insert: {
          created_at?: string
          ecommerce_product_id: string
          id?: string
          order_id: string
          product_name: string
          quantity: number
          total_price: number
          unit_price: number
        }
        Update: {
          created_at?: string
          ecommerce_product_id?: string
          id?: string
          order_id?: string
          product_name?: string
          quantity?: number
          total_price?: number
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_items_ecommerce_product_id_fkey"
            columns: ["ecommerce_product_id"]
            isOneToOne: false
            referencedRelation: "ecommerce_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          delivery_address: Json
          id: string
          notes: string | null
          order_number: string
          payment_method: string | null
          payment_status: string | null
          status: string
          total_amount: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          delivery_address: Json
          id?: string
          notes?: string | null
          order_number: string
          payment_method?: string | null
          payment_status?: string | null
          status?: string
          total_amount: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          delivery_address?: Json
          id?: string
          notes?: string | null
          order_number?: string
          payment_method?: string | null
          payment_status?: string | null
          status?: string
          total_amount?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      outbreak_locations: {
        Row: {
          affected_farms: number | null
          created_at: string | null
          disease_report_id: string
          id: string
          latitude: number | null
          longitude: number | null
          radius_km: number | null
        }
        Insert: {
          affected_farms?: number | null
          created_at?: string | null
          disease_report_id: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          radius_km?: number | null
        }
        Update: {
          affected_farms?: number | null
          created_at?: string | null
          disease_report_id?: string
          id?: string
          latitude?: number | null
          longitude?: number | null
          radius_km?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "outbreak_locations_disease_report_id_fkey"
            columns: ["disease_report_id"]
            isOneToOne: false
            referencedRelation: "disease_reports"
            referencedColumns: ["id"]
          },
        ]
      }
      podcasts: {
        Row: {
          audio_url: string
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration: number | null
          episode_number: number | null
          guests: string[] | null
          host: string | null
          id: string
          listens: number | null
          published_date: string | null
          title: string
        }
        Insert: {
          audio_url: string
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          episode_number?: number | null
          guests?: string[] | null
          host?: string | null
          id?: string
          listens?: number | null
          published_date?: string | null
          title: string
        }
        Update: {
          audio_url?: string
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          episode_number?: number | null
          guests?: string[] | null
          host?: string | null
          id?: string
          listens?: number | null
          published_date?: string | null
          title?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          unit: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          unit: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          unit?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          location: Json | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          location?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          location?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      publications: {
        Row: {
          author: string | null
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          downloads: number | null
          file_type: string | null
          file_url: string
          id: string
          published_date: string | null
          title: string
        }
        Insert: {
          author?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          downloads?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          published_date?: string | null
          title: string
        }
        Update: {
          author?: string | null
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          downloads?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          published_date?: string | null
          title?: string
        }
        Relationships: []
      }
      tenders: {
        Row: {
          budget_range: string | null
          category: string | null
          contact_info: string | null
          created_at: string | null
          created_by: string | null
          deadline: string
          description: string
          document_url: string | null
          id: string
          organization: string
          requirements: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          budget_range?: string | null
          category?: string | null
          contact_info?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline: string
          description: string
          document_url?: string | null
          id?: string
          organization: string
          requirements?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          budget_range?: string | null
          category?: string | null
          contact_info?: string | null
          created_at?: string | null
          created_by?: string | null
          deadline?: string
          description?: string
          document_url?: string | null
          id?: string
          organization?: string
          requirements?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      training_programs: {
        Row: {
          capacity: number | null
          contact_info: string | null
          created_at: string | null
          created_by: string | null
          description: string
          end_date: string | null
          enrolled: number | null
          id: string
          location: string | null
          start_date: string | null
          status: string | null
          title: string
          trainer: string | null
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          contact_info?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          end_date?: string | null
          enrolled?: number | null
          id?: string
          location?: string | null
          start_date?: string | null
          status?: string | null
          title: string
          trainer?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          contact_info?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          end_date?: string | null
          enrolled?: number | null
          id?: string
          location?: string | null
          start_date?: string | null
          status?: string | null
          title?: string
          trainer?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tutorials: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          created_by: string | null
          difficulty: string | null
          estimated_time: number | null
          featured_image: string | null
          id: string
          published: boolean | null
          steps: Json | null
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          created_by?: string | null
          difficulty?: string | null
          estimated_time?: number | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          steps?: Json | null
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          created_by?: string | null
          difficulty?: string | null
          estimated_time?: number | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          steps?: Json | null
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          duration: number | null
          id: string
          published: boolean | null
          thumbnail_url: string | null
          title: string
          video_url: string
          views: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          published?: boolean | null
          thumbnail_url?: string | null
          title: string
          video_url: string
          views?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          duration?: number | null
          id?: string
          published?: boolean | null
          thumbnail_url?: string | null
          title?: string
          video_url?: string
          views?: number | null
        }
        Relationships: []
      }
      weather_forecasts: {
        Row: {
          conditions: string | null
          created_at: string | null
          date: string
          forecast_data: Json | null
          humidity: number | null
          id: string
          location: string
          precipitation_chance: number | null
          temperature_high: number | null
          temperature_low: number | null
          wind_speed: number | null
        }
        Insert: {
          conditions?: string | null
          created_at?: string | null
          date: string
          forecast_data?: Json | null
          humidity?: number | null
          id?: string
          location: string
          precipitation_chance?: number | null
          temperature_high?: number | null
          temperature_low?: number | null
          wind_speed?: number | null
        }
        Update: {
          conditions?: string | null
          created_at?: string | null
          date?: string
          forecast_data?: Json | null
          humidity?: number | null
          id?: string
          location?: string
          precipitation_chance?: number | null
          temperature_high?: number | null
          temperature_low?: number | null
          wind_speed?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
