export const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

const hoje = new Date();
const diasAtras = (n) => new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() - n);

export const DESPESAS_INICIAIS = [
  { id: 'd1', descricao: 'Almoço no restaurante', valor: 45.9, data: diasAtras(1), categoria: 'Alimentação' },
  { id: 'd2', descricao: 'Uber para a faculdade', valor: 18.5, data: diasAtras(2), categoria: 'Transporte' },
  { id: 'd3', descricao: 'Cinema', valor: 32.0, data: diasAtras(4), categoria: 'Lazer' },
  { id: 'd4', descricao: 'Conta de luz', valor: 130.75, data: diasAtras(6), categoria: 'Contas' },
  { id: 'd5', descricao: 'Supermercado', valor: 210.4, data: diasAtras(12), categoria: 'Alimentação' },
  { id: 'd6', descricao: 'Gasolina', valor: 90.0, data: diasAtras(20), categoria: 'Transporte' },
];
