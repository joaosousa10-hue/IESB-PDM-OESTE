import { FlatList, StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  const navigation = useNavigation();

  function abrirEdicao(id) {
    navigation.navigate('GerenciarDespesa', { despesaId: id });
  }

  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem {...item} onPress={abrirEdicao} />}
      ListEmptyComponent={<Text style={styles.vazio}>Nenhuma despesa encontrada.</Text>}
    />
  );
}

const styles = StyleSheet.create({
  vazio: { textAlign: 'center', marginTop: 32, color: '#666' },
});
