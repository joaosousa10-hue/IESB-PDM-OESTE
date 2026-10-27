import { Pressable, StyleSheet, Text, View } from 'react-native';
import { getDataFormatada } from '../../util/data';

export default function DespesaItem({ id, descricao, valor, data, categoria, onPress }) {
  return (
    <Pressable onPress={() => onPress(id)} style={({ pressed }) => pressed && styles.pressionado}>
      <View style={styles.item}>
        <View style={styles.esquerda}>
          <Text style={styles.descricao}>{descricao}</Text>
          <Text style={styles.data}>{getDataFormatada(data)}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagTexto}>{categoria}</Text>
          </View>
        </View>
        <View style={styles.valorBox}>
          <Text style={styles.valor}>R$ {valor.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressionado: { opacity: 0.75 },
  item: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#3e04c3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    elevation: 3,
  },
  esquerda: { flex: 1 },
  descricao: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginBottom: 2 },
  data: { color: '#e4d9fd', marginBottom: 6 },
  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#e5e5e5',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  tagTexto: { fontSize: 12, color: '#333', fontWeight: '600' },
  valorBox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderRadius: 4,
    minWidth: 90,
    alignItems: 'center',
    alignSelf: 'center',
  },
  valor: { color: '#3e04c3', fontWeight: 'bold' },
});
