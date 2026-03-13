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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      checklists: {
        Row: {
          created_at: string
          data: string
          funcionario_id: string | null
          id: string
          itens_completos: number | null
          itens_total: number | null
          observacoes: string | null
          posto_id: string | null
          status: Database["public"]["Enums"]["status_checklist"]
          titulo: string
        }
        Insert: {
          created_at?: string
          data?: string
          funcionario_id?: string | null
          id?: string
          itens_completos?: number | null
          itens_total?: number | null
          observacoes?: string | null
          posto_id?: string | null
          status?: Database["public"]["Enums"]["status_checklist"]
          titulo: string
        }
        Update: {
          created_at?: string
          data?: string
          funcionario_id?: string | null
          id?: string
          itens_completos?: number | null
          itens_total?: number | null
          observacoes?: string | null
          posto_id?: string | null
          status?: Database["public"]["Enums"]["status_checklist"]
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklists_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklists_posto_id_fkey"
            columns: ["posto_id"]
            isOneToOne: false
            referencedRelation: "postos"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes: {
        Row: {
          cnpj: string
          contato_responsavel: string | null
          created_at: string
          email: string | null
          endereco: string | null
          id: string
          inscricao_estadual: string | null
          nome_fantasia: string | null
          razao_social: string
          status: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          cnpj: string
          contato_responsavel?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          razao_social: string
          status?: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          cnpj?: string
          contato_responsavel?: string | null
          created_at?: string
          email?: string | null
          endereco?: string | null
          id?: string
          inscricao_estadual?: string | null
          nome_fantasia?: string | null
          razao_social?: string
          status?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contas_receber: {
        Row: {
          cliente_id: string | null
          created_at: string
          data_pagamento: string | null
          data_vencimento: string
          id: string
          numero_nf: string | null
          observacoes: string | null
          status: Database["public"]["Enums"]["status_conta"]
          updated_at: string
          valor: number
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          data_pagamento?: string | null
          data_vencimento: string
          id?: string
          numero_nf?: string | null
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_conta"]
          updated_at?: string
          valor?: number
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          data_pagamento?: string | null
          data_vencimento?: string
          id?: string
          numero_nf?: string | null
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_conta"]
          updated_at?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "contas_receber_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      contratos: {
        Row: {
          cliente_id: string | null
          created_at: string
          data_fim: string
          data_inicio: string
          descricao: string | null
          id: string
          num_postos: number | null
          numero: string
          status: Database["public"]["Enums"]["status_contrato"]
          updated_at: string
          valor_mensal: number
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          data_fim: string
          data_inicio: string
          descricao?: string | null
          id?: string
          num_postos?: number | null
          numero: string
          status?: Database["public"]["Enums"]["status_contrato"]
          updated_at?: string
          valor_mensal?: number
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          num_postos?: number | null
          numero?: string
          status?: Database["public"]["Enums"]["status_contrato"]
          updated_at?: string
          valor_mensal?: number
        }
        Relationships: [
          {
            foreignKeyName: "contratos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      controle_ponto: {
        Row: {
          created_at: string
          data: string
          entrada: string | null
          funcionario_id: string
          horas_extras: number | null
          horas_trabalhadas: number | null
          id: string
          observacoes: string | null
          saida: string | null
        }
        Insert: {
          created_at?: string
          data?: string
          entrada?: string | null
          funcionario_id: string
          horas_extras?: number | null
          horas_trabalhadas?: number | null
          id?: string
          observacoes?: string | null
          saida?: string | null
        }
        Update: {
          created_at?: string
          data?: string
          entrada?: string | null
          funcionario_id?: string
          horas_extras?: number | null
          horas_trabalhadas?: number | null
          id?: string
          observacoes?: string | null
          saida?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "controle_ponto_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      documentos_funcionario: {
        Row: {
          arquivo_url: string
          categoria: string
          created_at: string
          funcionario_id: string
          id: string
          mes_referencia: string | null
          nome_arquivo: string
          observacoes: string | null
          storage_path: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          arquivo_url: string
          categoria: string
          created_at?: string
          funcionario_id: string
          id?: string
          mes_referencia?: string | null
          nome_arquivo: string
          observacoes?: string | null
          storage_path: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          arquivo_url?: string
          categoria?: string
          created_at?: string
          funcionario_id?: string
          id?: string
          mes_referencia?: string | null
          nome_arquivo?: string
          observacoes?: string | null
          storage_path?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documentos_funcionario_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      escalas: {
        Row: {
          created_at: string
          data_fim: string
          data_inicio: string
          dias_semana: Json | null
          funcionario_id: string
          id: string
          observacoes: string | null
          posto_id: string
          turno: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_fim: string
          data_inicio: string
          dias_semana?: Json | null
          funcionario_id: string
          id?: string
          observacoes?: string | null
          posto_id: string
          turno?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_fim?: string
          data_inicio?: string
          dias_semana?: Json | null
          funcionario_id?: string
          id?: string
          observacoes?: string | null
          posto_id?: string
          turno?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "escalas_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "escalas_posto_id_fkey"
            columns: ["posto_id"]
            isOneToOne: false
            referencedRelation: "postos"
            referencedColumns: ["id"]
          },
        ]
      }
      folha_pagamento: {
        Row: {
          created_at: string
          descontos: number | null
          funcionario_id: string
          horas_extras_valor: number | null
          id: string
          mes_referencia: string
          salario_base: number
          salario_liquido: number
          status: string
        }
        Insert: {
          created_at?: string
          descontos?: number | null
          funcionario_id: string
          horas_extras_valor?: number | null
          id?: string
          mes_referencia: string
          salario_base?: number
          salario_liquido?: number
          status?: string
        }
        Update: {
          created_at?: string
          descontos?: number | null
          funcionario_id?: string
          horas_extras_valor?: number | null
          id?: string
          mes_referencia?: string
          salario_base?: number
          salario_liquido?: number
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "folha_pagamento_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      formularios_preenchidos: {
        Row: {
          created_at: string
          dados: Json
          formulario_id: string | null
          funcionario_id: string | null
          id: string
          preenchido_por: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          dados?: Json
          formulario_id?: string | null
          funcionario_id?: string | null
          id?: string
          preenchido_por?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          dados?: Json
          formulario_id?: string | null
          funcionario_id?: string | null
          id?: string
          preenchido_por?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "formularios_preenchidos_formulario_id_fkey"
            columns: ["formulario_id"]
            isOneToOne: false
            referencedRelation: "formularios_qualidade"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "formularios_preenchidos_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      formularios_qualidade: {
        Row: {
          campos: Json | null
          categoria: string
          codigo: string
          created_at: string
          id: string
          revisao: string | null
          status: string | null
          titulo: string
          updated_at: string
        }
        Insert: {
          campos?: Json | null
          categoria: string
          codigo: string
          created_at?: string
          id?: string
          revisao?: string | null
          status?: string | null
          titulo: string
          updated_at?: string
        }
        Update: {
          campos?: Json | null
          categoria?: string
          codigo?: string
          created_at?: string
          id?: string
          revisao?: string | null
          status?: string | null
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      funcionarios: {
        Row: {
          cargo: string
          cpf: string
          created_at: string
          data_admissao: string | null
          data_nascimento: string | null
          email: string | null
          endereco: string | null
          id: string
          nome: string
          posto_id: string | null
          rg: string | null
          salario: number | null
          status: Database["public"]["Enums"]["status_funcionario"]
          telefone: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          cargo?: string
          cpf: string
          created_at?: string
          data_admissao?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome: string
          posto_id?: string | null
          rg?: string | null
          salario?: number | null
          status?: Database["public"]["Enums"]["status_funcionario"]
          telefone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          cargo?: string
          cpf?: string
          created_at?: string
          data_admissao?: string | null
          data_nascimento?: string | null
          email?: string | null
          endereco?: string | null
          id?: string
          nome?: string
          posto_id?: string | null
          rg?: string | null
          salario?: number | null
          status?: Database["public"]["Enums"]["status_funcionario"]
          telefone?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "funcionarios_posto_id_fkey"
            columns: ["posto_id"]
            isOneToOne: false
            referencedRelation: "postos"
            referencedColumns: ["id"]
          },
        ]
      }
      holerites: {
        Row: {
          arquivo_url: string | null
          assinado: boolean | null
          created_at: string
          data_assinatura: string | null
          folha_id: string | null
          funcionario_id: string
          id: string
          mes_referencia: string
        }
        Insert: {
          arquivo_url?: string | null
          assinado?: boolean | null
          created_at?: string
          data_assinatura?: string | null
          folha_id?: string | null
          funcionario_id: string
          id?: string
          mes_referencia: string
        }
        Update: {
          arquivo_url?: string | null
          assinado?: boolean | null
          created_at?: string
          data_assinatura?: string | null
          folha_id?: string | null
          funcionario_id?: string
          id?: string
          mes_referencia?: string
        }
        Relationships: [
          {
            foreignKeyName: "holerites_folha_id_fkey"
            columns: ["folha_id"]
            isOneToOne: false
            referencedRelation: "folha_pagamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "holerites_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
        ]
      }
      ocorrencias: {
        Row: {
          created_at: string
          data_hora: string
          descricao: string
          fotos: string[] | null
          funcionario_id: string | null
          id: string
          posto_id: string | null
          status: Database["public"]["Enums"]["status_ocorrencia"]
          tipo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_hora?: string
          descricao: string
          fotos?: string[] | null
          funcionario_id?: string | null
          id?: string
          posto_id?: string | null
          status?: Database["public"]["Enums"]["status_ocorrencia"]
          tipo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_hora?: string
          descricao?: string
          fotos?: string[] | null
          funcionario_id?: string | null
          id?: string
          posto_id?: string | null
          status?: Database["public"]["Enums"]["status_ocorrencia"]
          tipo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ocorrencias_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ocorrencias_posto_id_fkey"
            columns: ["posto_id"]
            isOneToOne: false
            referencedRelation: "postos"
            referencedColumns: ["id"]
          },
        ]
      }
      orcamentos: {
        Row: {
          cliente_nome: string
          cnpj: string | null
          contato: string | null
          created_at: string
          descricao: string | null
          id: string
          num_postos: number | null
          num_vigilantes: number | null
          status: Database["public"]["Enums"]["status_orcamento"]
          tipo_servico: string | null
          updated_at: string
          valor_mensal: number | null
        }
        Insert: {
          cliente_nome: string
          cnpj?: string | null
          contato?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          num_postos?: number | null
          num_vigilantes?: number | null
          status?: Database["public"]["Enums"]["status_orcamento"]
          tipo_servico?: string | null
          updated_at?: string
          valor_mensal?: number | null
        }
        Update: {
          cliente_nome?: string
          cnpj?: string | null
          contato?: string | null
          created_at?: string
          descricao?: string | null
          id?: string
          num_postos?: number | null
          num_vigilantes?: number | null
          status?: Database["public"]["Enums"]["status_orcamento"]
          tipo_servico?: string | null
          updated_at?: string
          valor_mensal?: number | null
        }
        Relationships: []
      }
      postos: {
        Row: {
          cliente_id: string | null
          created_at: string
          endereco: string | null
          id: string
          nome: string
          num_vigilantes: number | null
          observacoes: string | null
          status: string
          tipo_servico: string | null
          updated_at: string
        }
        Insert: {
          cliente_id?: string | null
          created_at?: string
          endereco?: string | null
          id?: string
          nome: string
          num_vigilantes?: number | null
          observacoes?: string | null
          status?: string
          tipo_servico?: string | null
          updated_at?: string
        }
        Update: {
          cliente_id?: string | null
          created_at?: string
          endereco?: string | null
          id?: string
          nome?: string
          num_vigilantes?: number | null
          observacoes?: string | null
          status?: string
          tipo_servico?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "postos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      propostas: {
        Row: {
          cliente_nome: string
          cnpj: string | null
          created_at: string
          data_proposta: string
          descricao: string | null
          email: string | null
          id: string
          num_postos: number | null
          status: Database["public"]["Enums"]["status_proposta"]
          tipo_servico: string | null
          updated_at: string
          validade: string | null
          valor_mensal: number | null
        }
        Insert: {
          cliente_nome: string
          cnpj?: string | null
          created_at?: string
          data_proposta?: string
          descricao?: string | null
          email?: string | null
          id?: string
          num_postos?: number | null
          status?: Database["public"]["Enums"]["status_proposta"]
          tipo_servico?: string | null
          updated_at?: string
          validade?: string | null
          valor_mensal?: number | null
        }
        Update: {
          cliente_nome?: string
          cnpj?: string | null
          created_at?: string
          data_proposta?: string
          descricao?: string | null
          email?: string | null
          id?: string
          num_postos?: number | null
          status?: Database["public"]["Enums"]["status_proposta"]
          tipo_servico?: string | null
          updated_at?: string
          validade?: string | null
          valor_mensal?: number | null
        }
        Relationships: []
      }
      rondas: {
        Row: {
          created_at: string
          data: string
          funcionario_id: string | null
          hora_fim: string | null
          hora_inicio: string
          id: string
          observacoes: string | null
          pontos_total: number | null
          pontos_verificados: number | null
          posto_id: string | null
          status: Database["public"]["Enums"]["status_ronda"]
        }
        Insert: {
          created_at?: string
          data?: string
          funcionario_id?: string | null
          hora_fim?: string | null
          hora_inicio: string
          id?: string
          observacoes?: string | null
          pontos_total?: number | null
          pontos_verificados?: number | null
          posto_id?: string | null
          status?: Database["public"]["Enums"]["status_ronda"]
        }
        Update: {
          created_at?: string
          data?: string
          funcionario_id?: string | null
          hora_fim?: string | null
          hora_inicio?: string
          id?: string
          observacoes?: string | null
          pontos_total?: number | null
          pontos_verificados?: number | null
          posto_id?: string | null
          status?: Database["public"]["Enums"]["status_ronda"]
        }
        Relationships: [
          {
            foreignKeyName: "rondas_funcionario_id_fkey"
            columns: ["funcionario_id"]
            isOneToOne: false
            referencedRelation: "funcionarios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rondas_posto_id_fkey"
            columns: ["posto_id"]
            isOneToOne: false
            referencedRelation: "postos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "gestor" | "supervisor" | "funcionario"
      status_checklist: "Completo" | "Parcial" | "Em andamento"
      status_conta: "A vencer" | "Vencido" | "Pago"
      status_contrato: "Vigente" | "Vencendo" | "Encerrado" | "Suspenso"
      status_funcionario: "Ativo" | "Férias" | "Afastado" | "Desligado"
      status_ocorrencia: "Aberta" | "Em análise" | "Resolvida" | "Arquivada"
      status_orcamento: "Pendente" | "Aprovado" | "Recusado"
      status_proposta: "Enviada" | "Aprovada" | "Em negociação" | "Recusada"
      status_ronda: "Completa" | "Incompleta" | "Em andamento"
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
      app_role: ["admin", "gestor", "supervisor", "funcionario"],
      status_checklist: ["Completo", "Parcial", "Em andamento"],
      status_conta: ["A vencer", "Vencido", "Pago"],
      status_contrato: ["Vigente", "Vencendo", "Encerrado", "Suspenso"],
      status_funcionario: ["Ativo", "Férias", "Afastado", "Desligado"],
      status_ocorrencia: ["Aberta", "Em análise", "Resolvida", "Arquivada"],
      status_orcamento: ["Pendente", "Aprovado", "Recusado"],
      status_proposta: ["Enviada", "Aprovada", "Em negociação", "Recusada"],
      status_ronda: ["Completa", "Incompleta", "Em andamento"],
    },
  },
} as const
