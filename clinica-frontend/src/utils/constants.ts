export const APPOINTMENT_STATUS = {
  AGENDADO: "Agendado",
  CONFIRMADO: "Confirmado",
  EM_ATENDIMENTO: "Em Atendimento",
  CONCLUIDO: "Concluído",
  CANCELADO: "Cancelado",
  FALTOU: "Faltou",
} as const;

export const APPOINTMENT_TYPES = {
  CONSULTA: "Consulta",
  RETORNO: "Retorno",
  EXAME: "Exame",
  PROCEDIMENTO: "Procedimento",
  EMERGENCIA: "Emergência",
} as const;

export const ALERT_TYPES = {
  CONSULTA: "Consulta",
  EXAME: "Exame",
  MEDICACAO: "Medicação",
  RETORNO: "Retorno",
  OUTRO: "Outro",
} as const;

export const ALERT_PRIORITIES = {
  BAIXA: "Baixa",
  MEDIA: "Média",
  ALTA: "Alta",
  URGENTE: "Urgente",
} as const;

export const ALERT_STATUS = {
  PENDENTE: "Pendente",
  VISUALIZADO: "Visualizado",
  RESOLVIDO: "Resolvido",
} as const;

export const SEXO = {
  M: "Masculino",
  F: "Feminino",
  O: "Outro",
} as const;
