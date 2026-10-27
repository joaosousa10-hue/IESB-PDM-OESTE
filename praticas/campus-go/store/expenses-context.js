// STUB TEMPORÁRIO: substitua pelo seu store/expenses-context.js da atividade
// anterior (Gerenciador de Despesas). Precisa exportar
// ExpensesContextProvider e useExpenses (que devolve { expenses, ... }).
import { createContext, useContext, useState } from 'react';

const ExpensesContext = createContext({ expenses: [] });

export function ExpensesContextProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const addExpense = (e) => setExpenses((prev) => [...prev, e]);
  return (
    <ExpensesContext.Provider value={{ expenses, addExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpensesContext);
}
