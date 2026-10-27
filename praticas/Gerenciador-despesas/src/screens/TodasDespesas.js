import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDespesas } from '../context/DespesasContext';
import DespesaSaida from '../components/despesa/DespesaSaida';
import FiltroCategoria from '../components/despesa/FiltroCategoria';

function filtrarPorCategoria(despesas, categoria) {
  if (!categoria) return despesas;
  return despesas.filter((despesa) => despesa.categoria === categoria);
}

export default function TodasDespesas() {
  const { despesas } = useDespesas();
  const [categoriaFiltro, setCategoriaFiltro] = useState('');

  const despesasFiltradas = filtrarPorCategoria(despesas, categoriaFiltro);
  const periodo = categoriaFiltro ? `Total – ${categoriaFiltro}` : 'Total';

  return (
    <View style={styles.container}>
      <FiltroCategoria selecionada={categoriaFiltro} onSelecionar={setCategoriaFiltro} />
      <DespesaSaida despesas={despesasFiltradas} periodo={periodo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f1fd' },
});
