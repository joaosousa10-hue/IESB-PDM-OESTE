import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { CATEGORIAS } from '../../data/despesas';

export default function FiltroCategoria({ selecionada, onSelecionar }) {
  const opcoes = ['Todas', ...CATEGORIAS];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}
      contentContainerStyle={styles.conteudo}>
      {opcoes.map((cat) => {
        const ativa = (cat === 'Todas' && !selecionada) || cat === selecionada;
        return (
          <Pressable key={cat} onPress={() => onSelecionar(cat === 'Todas' ? '' : cat)}
            style={[styles.chip, ativa && styles.chipAtivo]}>
            <Text style={[styles.chipTexto, ativa && styles.chipTextoAtivo]}>{cat}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flexGrow: 0, marginBottom: 8 },
  conteudo: { gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 16, backgroundColor: '#e5e5e5' },
  chipAtivo: { backgroundColor: '#3e04c3' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
});
