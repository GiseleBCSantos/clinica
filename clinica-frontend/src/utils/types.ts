export interface Alert {
  id: number;
  paciente: number;
  paciente_nome?: string;
  tipo: "CONSULTA" | "EXAME" | "MEDICACAO" | "RETORNO" | "OUTRO";
  mensagem: string;
  data_alerta: string;
  status: "PENDENTE" | "VISUALIZADO" | "RESOLVIDO";
  prioridade: "BAIXA" | "MEDIA" | "ALTA" | "URGENTE";
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: number;
  paciente: number;
  paciente_nome?: string;
  data_hora: string;
  tipo_consulta:
    | "CONSULTA"
    | "RETORNO"
    | "EXAME"
    | "PROCEDIMENTO"
    | "EMERGENCIA";
  status:
    | "AGENDADO"
    | "CONFIRMADO"
    | "EM_ATENDIMENTO"
    | "CONCLUIDO"
    | "CANCELADO"
    | "FALTOU";
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

export interface Evolution {
  id: number;
  paciente: number;
  data_atendimento: string;
  queixa_principal: string;
  historia_doenca_atual: string;
  exame_fisico?: string;
  hipotese_diagnostica?: string;
  conduta?: string;
  prescricoes?: string;
  observacoes?: string;
  created_at: string;
  updated_at: string;
}

export interface Patient {
  id: number;
  nome: string;
  data_nascimento: string;
  cpf: string;
  telefone: string;
  email: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  sexo: "M" | "F" | "O";
  tipo_sanguineo?: string;
  alergias?: string;
  medicacoes_atuais?: string;
  condicoes_preexistentes?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}
