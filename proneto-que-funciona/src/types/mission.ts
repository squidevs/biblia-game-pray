export interface CheckboxItem {
  id: number;
  texto: string;
  feito: boolean;
}

export interface QuizQuestion {
  id: number;
  pergunta: string;
  opcoes: string[];
  correta: string;
}

export interface Restricoes {
  somenteCasado: boolean;
  somenteBatizado: boolean;
  requerSalvo: boolean;
}

export interface Elementos {
  icone: string;
  corTema: string;
  background: string;
}

export interface Interacoes {
  botoes: {
    iniciar: boolean;
    desistir: boolean;
    concluir: boolean;
  };
  progresso: {
    porcentagem: number;
    checkboxes: CheckboxItem[];
  };
  quiz: {
    ativo: boolean;
    perguntas: string[];
    respostas: string[];
    corretas: string[];
  };
}

export interface Armadura {
  capacete: number;
  espada: number;
  escudo: number;
  couraca: number;
  sandalias: number;
  oracao: number;
}

export interface Consumivel {
  tipo: string;
  quantidade: number;
  duracao: string;
}

export interface Recompensas {
  xpSabedoria: number;
  moedasFe: number;
  armadura: Armadura;
  consumiveis: Consumivel[];
}

export interface Penalidades {
  descricao: string;
  efeitos: {
    pecado: number;
    perdaXp: number;
  };
}

export interface QuizDados {
  ativo: boolean;
  questoes: QuizQuestion[];
  acertos: number;
  erros: number;
}

export interface MetricaEspiritual {
  sabedoria: number;
  fe: number;
  pecado: number;
  espirito: number;
  salvacao: number;
}

export interface Mission {
  id: number;
  categoria: 'acao' | 'quiz' | 'casal' | 'checklist';
  tags: string[];
  titulo: string;
  descricao: string;
  tipoMissao: 'diaria' | 'semanal' | 'mensal';
  nivelDificuldade: 'comum' | 'rara' | 'lendaria' | 'divina';
  tempoRestante: string;
  status: 'ativa' | 'concluida' | 'expirada' | 'desistida';
  restricoes: Restricoes;
  elementos: Elementos;
  interacoes: Interacoes;
  recompensas: Recompensas;
  penalidades: Penalidades;
  quizDados: QuizDados;
  metricaEspiritual: MetricaEspiritual;
  dataInicio?: number;
  dataExpiracao?: number;
}
