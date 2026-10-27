import { StyleSheet, Text, View } from 'react-native';

const LIMITE = 200;

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((acumulador, item) => acumulador + item.valor, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>
      <Text style={[styles.soma, somaDespesas > LIMITE && styles.somaAlta]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#e4d9fd',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  periodo: { fontSize: 14, color: '#5721d4' },
  soma: { fontSize: 16, fontWeight: 'bold', color: '#3e04c3' },
  somaAlta: { color: 'red' },
});
