export interface ICorretorLista {
  id: string;
  nome: string;
  email: string;
  status: 'ativo' | 'inativo';
}