export interface IParticipante {
  status: string;
  nome: string;
  cpf: string;
  email: string;
  telefone1: string;
  telefone2: string;
  dataNascimento: string;
  estadoCivil: string;
  restricaoNoNome: boolean;
  valorRestricao: number;
  tipoDeRenda: string;
  umMesDeCarteiraAssinada: boolean;
  rendaBrutaFormal: number;
  rendaBrutaInformal: number;
  tresAnosFgts: boolean;
  vaiUtilizarFgts: boolean;
  declaraIRPF: boolean;
  compromissoHolerite: string;
  possuiImovelRegistradoNoNome: boolean;
}

export interface IRegistro {
  id: string;
  estadoRegistro: string;
  procura: string;
  tipo: string;
  segundoParticipante: boolean;
  participante1: IParticipante;
  participante2?: IParticipante;
}
