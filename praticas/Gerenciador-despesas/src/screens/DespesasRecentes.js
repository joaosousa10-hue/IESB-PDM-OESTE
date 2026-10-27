import { StyleSheet, View } from 'react-native';
import { useDespesas } from '../context/DespesasContext';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { getDataMenosDias } from '../util/data';

export default function DespesasRecentes() {
  const { despesas } = useDespesas();

  const limite = getDataMenosDias(new Date(), 7);
  const recentes = despesas.filter((despesa) => despesa.data >= limite);

  return (
    <View style={styles.container}>
      <DespesaSaida despesas={recentes} periodo="Últimos 7 dias" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f1fd' },
});
