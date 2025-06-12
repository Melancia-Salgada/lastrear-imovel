
export interface ICorretor {
  id: string;
  username: string;
  password: string;
  email: string;
  nomeCompleto: string;
  telefone: string;
  cpf: string;
  dataNascimento: string; 
  especialidade: string;
  status: "ATIVO" | "INATIVO";
  role: "ADMIN" | "CORRETOR" | string;
  registros: IRegistroCor[];
}

export interface IRegistroCor {
  id: string;
  estadoRegistro: "ABERTO" | "FECHADO" | string;
  procura: string; 
  tipo: string; 
  segundoParticipante: boolean;
  participante1: IParticipanteCor;
  participante2?: IParticipanteCor;
}

export interface IParticipanteCor {
  status: "ANDAMENTO" | "FINALIZADO" | string;
  nome: string;
  cpf: string;
  email: string;
  telefone1: string;
  telefone2: string;
  dataNascimento: string; 
  estadoCivil: "SOLTEIRO" | "CASADO" | "DIVORCIADO" | "VIÚVO" | string;
  restricaoNoNome: boolean;
  valorRestricao: number;
  tipoDeRenda: "FORMAL" | "INFORMAL" | string;
  umMesDeCarteiraAssinada: boolean;
  rendaBrutaFormal: number;
  rendaBrutaInformal: number;
  tresAnosFgts: boolean;
  vaiUtilizarFgts: boolean;
  declaraIRPF: boolean;
  compromissoHolerite: string;
  possuiImovelRegistradoNoNome: boolean;
}
