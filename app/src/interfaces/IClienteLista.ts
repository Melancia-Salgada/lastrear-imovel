export interface IClienteLista {
  nome: string,
  tipoImovel: string,
  corretor: string,
  estado: 'andamento' | 'aberto' | 'encerrado';
}