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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      berita_items: {
        Row: {
          body: string | null
          created_at: string
          excerpt: string | null
          id: string
          kategori: Database["public"]["Enums"]["berita_kategori"]
          publish_date: string
          title: string
          updated_at: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          kategori: Database["public"]["Enums"]["berita_kategori"]
          publish_date?: string
          title: string
          updated_at?: string
        }
        Update: {
          body?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          kategori?: Database["public"]["Enums"]["berita_kategori"]
          publish_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ibadah_minggu_meta: {
        Row: {
          agendre: string | null
          created_at: string
          fona_huhuo: string | null
          huhuo: string | null
          id: string
          is_active: boolean
          nama_minggu: string | null
          nats_hafalan_id: string | null
          nats_hafalan_nias: string | null
          nitano_badodo: string | null
          salahi_goroisa: string | null
          tanggal: string
          updated_at: string
          warna_kain: string | null
        }
        Insert: {
          agendre?: string | null
          created_at?: string
          fona_huhuo?: string | null
          huhuo?: string | null
          id?: string
          is_active?: boolean
          nama_minggu?: string | null
          nats_hafalan_id?: string | null
          nats_hafalan_nias?: string | null
          nitano_badodo?: string | null
          salahi_goroisa?: string | null
          tanggal: string
          updated_at?: string
          warna_kain?: string | null
        }
        Update: {
          agendre?: string | null
          created_at?: string
          fona_huhuo?: string | null
          huhuo?: string | null
          id?: string
          is_active?: boolean
          nama_minggu?: string | null
          nats_hafalan_id?: string | null
          nats_hafalan_nias?: string | null
          nitano_badodo?: string | null
          salahi_goroisa?: string | null
          tanggal?: string
          updated_at?: string
          warna_kain?: string | null
        }
        Relationships: []
      }
      ibadah_minggu_pelayan: {
        Row: {
          created_at: string
          id: string
          jenis: string
          meta_id: string
          nama: string
          tugas: string | null
          urutan: number
        }
        Insert: {
          created_at?: string
          id?: string
          jenis: string
          meta_id: string
          nama: string
          tugas?: string | null
          urutan?: number
        }
        Update: {
          created_at?: string
          id?: string
          jenis?: string
          meta_id?: string
          nama?: string
          tugas?: string | null
          urutan?: number
        }
        Relationships: [
          {
            foreignKeyName: "ibadah_minggu_pelayan_meta_id_fkey"
            columns: ["meta_id"]
            isOneToOne: false
            referencedRelation: "ibadah_minggu_meta"
            referencedColumns: ["id"]
          },
        ]
      }
      ibadah_minggu_sesi: {
        Row: {
          bahasa: string | null
          created_at: string
          id: string
          liturgis: string | null
          meta_id: string
          nama: string
          pemusik: string | null
          pengkhotbah: string | null
          proyeksionis: string | null
          urutan: number
          waktu: string | null
        }
        Insert: {
          bahasa?: string | null
          created_at?: string
          id?: string
          liturgis?: string | null
          meta_id: string
          nama: string
          pemusik?: string | null
          pengkhotbah?: string | null
          proyeksionis?: string | null
          urutan?: number
          waktu?: string | null
        }
        Update: {
          bahasa?: string | null
          created_at?: string
          id?: string
          liturgis?: string | null
          meta_id?: string
          nama?: string
          pemusik?: string | null
          pengkhotbah?: string | null
          proyeksionis?: string | null
          urutan?: number
          waktu?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ibadah_minggu_sesi_meta_id_fkey"
            columns: ["meta_id"]
            isOneToOne: false
            referencedRelation: "ibadah_minggu_meta"
            referencedColumns: ["id"]
          },
        ]
      }
      kebaktian_rt: {
        Row: {
          created_at: string
          hari: string | null
          id: string
          keluarga: string
          keterangan: string | null
          lingkungan: string
          pelayan: string | null
          tempat: string | null
          updated_at: string
          urutan: number
          waktu: string | null
        }
        Insert: {
          created_at?: string
          hari?: string | null
          id?: string
          keluarga: string
          keterangan?: string | null
          lingkungan: string
          pelayan?: string | null
          tempat?: string | null
          updated_at?: string
          urutan?: number
          waktu?: string | null
        }
        Update: {
          created_at?: string
          hari?: string | null
          id?: string
          keluarga?: string
          keterangan?: string | null
          lingkungan?: string
          pelayan?: string | null
          tempat?: string | null
          updated_at?: string
          urutan?: number
          waktu?: string | null
        }
        Relationships: []
      }
      keputusan_majelis: {
        Row: {
          created_at: string
          excerpt: string | null
          id: string
          pdf_url: string | null
          publish_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          excerpt?: string | null
          id?: string
          pdf_url?: string | null
          publish_date?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          excerpt?: string | null
          id?: string
          pdf_url?: string | null
          publish_date?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pendeta: {
        Row: {
          created_at: string
          foto_url: string | null
          id: string
          jabatan: string | null
          jk: string | null
          nama: string
          pelantikan: string | null
          periode: string | null
          status: string | null
          ttl: string | null
          updated_at: string
          urutan: number
        }
        Insert: {
          created_at?: string
          foto_url?: string | null
          id?: string
          jabatan?: string | null
          jk?: string | null
          nama: string
          pelantikan?: string | null
          periode?: string | null
          status?: string | null
          ttl?: string | null
          updated_at?: string
          urutan?: number
        }
        Update: {
          created_at?: string
          foto_url?: string | null
          id?: string
          jabatan?: string | null
          jk?: string | null
          nama?: string
          pelantikan?: string | null
          periode?: string | null
          status?: string | null
          ttl?: string | null
          updated_at?: string
          urutan?: number
        }
        Relationships: []
      }
      personalia: {
        Row: {
          alias: string | null
          created_at: string
          hp: string | null
          id: string
          jabatan: string | null
          jenis: Database["public"]["Enums"]["personalia_jenis"]
          jk: string | null
          jlh_jiwa: number | null
          jlh_kk: number | null
          lingkungan: string | null
          nama: string
          periode: string | null
          status: string | null
          updated_at: string
          urutan: number
        }
        Insert: {
          alias?: string | null
          created_at?: string
          hp?: string | null
          id?: string
          jabatan?: string | null
          jenis: Database["public"]["Enums"]["personalia_jenis"]
          jk?: string | null
          jlh_jiwa?: number | null
          jlh_kk?: number | null
          lingkungan?: string | null
          nama: string
          periode?: string | null
          status?: string | null
          updated_at?: string
          urutan?: number
        }
        Update: {
          alias?: string | null
          created_at?: string
          hp?: string | null
          id?: string
          jabatan?: string | null
          jenis?: Database["public"]["Enums"]["personalia_jenis"]
          jk?: string | null
          jlh_jiwa?: number | null
          jlh_kk?: number | null
          lingkungan?: string | null
          nama?: string
          periode?: string | null
          status?: string | null
          updated_at?: string
          urutan?: number
        }
        Relationships: []
      }
      sekolah_minggu_kelas: {
        Row: {
          created_at: string
          id: string
          kelas: string
          meta_id: string
          pelayan: string | null
          ruang: string | null
          urutan: number
          waktu: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          kelas: string
          meta_id: string
          pelayan?: string | null
          ruang?: string | null
          urutan?: number
          waktu?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          kelas?: string
          meta_id?: string
          pelayan?: string | null
          ruang?: string | null
          urutan?: number
          waktu?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sekolah_minggu_kelas_meta_id_fkey"
            columns: ["meta_id"]
            isOneToOne: false
            referencedRelation: "sekolah_minggu_meta"
            referencedColumns: ["id"]
          },
        ]
      }
      sekolah_minggu_meta: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          tanggal: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          tanggal: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          tanggal?: string
          updated_at?: string
        }
        Relationships: []
      }
      sekolah_sidi_grup: {
        Row: {
          created_at: string
          grup: string
          id: string
          meta_id: string
          pelayan: string | null
          urutan: number
          waktu: string | null
        }
        Insert: {
          created_at?: string
          grup: string
          id?: string
          meta_id: string
          pelayan?: string | null
          urutan?: number
          waktu?: string | null
        }
        Update: {
          created_at?: string
          grup?: string
          id?: string
          meta_id?: string
          pelayan?: string | null
          urutan?: number
          waktu?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sekolah_sidi_grup_meta_id_fkey"
            columns: ["meta_id"]
            isOneToOne: false
            referencedRelation: "sekolah_sidi_meta"
            referencedColumns: ["id"]
          },
        ]
      }
      sekolah_sidi_meta: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          ruang: string | null
          tanggal: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          ruang?: string | null
          tanggal: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          ruang?: string | null
          tanggal?: string
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
      warta_jemaat: {
        Row: {
          created_at: string
          excerpt: string | null
          id: string
          pdf_url: string | null
          publish_date: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          excerpt?: string | null
          id?: string
          pdf_url?: string | null
          publish_date?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          excerpt?: string | null
          id?: string
          pdf_url?: string | null
          publish_date?: string
          title?: string
          updated_at?: string
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
      app_role: "admin" | "editor"
      berita_kategori: "anak_lahir" | "menikah" | "dukacita" | "lain_lain"
      personalia_jenis: "bpmj" | "bppj" | "snk"
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
      app_role: ["admin", "editor"],
      berita_kategori: ["anak_lahir", "menikah", "dukacita", "lain_lain"],
      personalia_jenis: ["bpmj", "bppj", "snk"],
    },
  },
} as const
