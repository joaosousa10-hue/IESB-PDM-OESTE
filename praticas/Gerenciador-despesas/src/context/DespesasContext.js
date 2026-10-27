import { createContext, useContext, useState } from 'react';
import { DESPESAS_INICIAIS } from '../data/despesas';

const DespesasContext = createContext(null);

export function DespesasProvider({ children }) {
  const [despesas, setDespesas] = useState(DESPESAS_INICIAIS);

  function adicionarDespesa(dados) {
    setDespesas((atual) => [{ ...dados, id: String(Date.now()) }, ...atual]);
  }

  function atualizarDespesa(id, dados) {
    setDespesas((atual) => atual.map((d) => (d.id === id ? { ...d, ...dados } : d)));
  }

  function excluirDespesa(id) {
    setDespesas((atual) => atual.filter((d) => d.id !== id));
  }

  return (
    <DespesasContext.Provider value={{ despesas, adicionarDespesa, atualizarDespesa, excluirDespesa }}>
      {children}
    </DespesasContext.Provider>
  );
}

export const useDespesas = () => useContext(DespesasContext);
