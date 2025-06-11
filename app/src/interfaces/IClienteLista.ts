export interface IClienteLista {
  id: string;
  nome: string;
  tipoImovel: string;
  corretor: string;
  estadoImovel: string;
  status: 'andamento' | 'aberto' | 'encerrado' | 'concluido';
}
