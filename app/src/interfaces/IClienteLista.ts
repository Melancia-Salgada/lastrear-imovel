export interface IClienteLista {
  nome: string,
  tipoImovel: string,
  corretor: string,
  estadoImovel: string,
  status: 'andamento' | 'aberto' | 'encerrado';
}