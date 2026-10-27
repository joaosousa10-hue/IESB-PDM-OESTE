import { useLayoutEffect, useState } from 'react';
import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { CATEGORIAS } from '../data/despesas';
import { useDespesas } from '../context/DespesasContext';
import { getDataFormatada } from '../util/data';

export default function GerenciarDespesa({ route, navigation }) {
  const despesaId = route.params?.despesaId;
  const { despesas, adicionarDespesa, atualizarDespesa, excluirDespesa } = useDespesas();
  const despesaEditada = despesas.find((d) => d.id === despesaId);
  const editando = !!despesaEditada;

  const [descricao, setDescricao] = useState(despesaEditada?.descricao ?? '');
  const [valor, setValor] = useState(despesaEditada ? despesaEditada.valor.toFixed(2) : '');
  const [data, setData] = useState(despesaEditada?.data ?? new Date());
  const [categoria, setCategoria] = useState(despesaEditada?.categoria ?? '');
  const [mostrarPicker, setMostrarPicker] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: editando ? 'Editar Despesa' : 'Adicionar Despesa' });
  }, [navigation, editando]);

  function tratarValor(texto) {
    const limpo = texto.replace(',', '.');
    if (/^\d*\.?\d{0,2}$/.test(limpo)) setValor(limpo);
  }

  function aoMudarData(evento, dataSelecionada) {
    if (Platform.OS === 'android') setMostrarPicker(false);
    if (dataSelecionada) setData(dataSelecionada);
  }

  // Fallback para web (o datetimepicker nativo não funciona no navegador)
  function aoMudarDataWeb(texto) {
    const [ano, mes, dia] = texto.split('-').map(Number);
    if (ano && mes && dia) setData(new Date(ano, mes - 1, dia));
  }

  function validar() {
    const valorNumerico = parseFloat(valor);
    if (!descricao.trim() || !valor || isNaN(valorNumerico) || valorNumerico <= 0 || !categoria) {
      const msg = 'Preencha descrição, valor (maior que zero) e categoria.';
      Platform.OS === 'web' ? window.alert(msg) : Alert.alert('Dados inválidos', msg);
      return false;
    }
    return true;
  }

  function salvar() {
    if (!validar()) return;
    const dados = { descricao: descricao.trim(), valor: parseFloat(valor), data, categoria };
    editando ? atualizarDespesa(despesaId, dados) : adicionarDespesa(dados);
    navigation.goBack();
  }

  function excluir() {
    excluirDespesa(despesaId);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao}
        placeholder="Ex: Almoço" />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput style={styles.input} value={valor} onChangeText={tratarValor}
        keyboardType="decimal-pad" placeholder="0.00" />

      <Text style={styles.label}>Data</Text>
      {Platform.OS === 'web' ? (
        <TextInput style={styles.input} value={data.toISOString().slice(0, 10)}
          onChangeText={aoMudarDataWeb} placeholder="AAAA-MM-DD" />
      ) : (
        <>
          <Pressable style={styles.input} onPress={() => setMostrarPicker(true)}>
            <Text>{getDataFormatada(data)}</Text>
          </Pressable>
          {mostrarPicker && (
            <DateTimePicker value={data} mode="date" onChange={aoMudarData}
              maximumDate={new Date()} />
          )}
        </>
      )}

      <Text style={styles.label}>Categoria</Text>
      <View style={styles.categorias}>
        {CATEGORIAS.map((cat) => (
          <Pressable key={cat} onPress={() => setCategoria(cat)}
            style={[styles.chip, categoria === cat && styles.chipAtivo]}>
            <Text style={[styles.chipTexto, categoria === cat && styles.chipTextoAtivo]}>{cat}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.botoes}>
        <Pressable style={[styles.botao, styles.cancelar]} onPress={() => navigation.goBack()}>
          <Text style={styles.cancelarTexto}>Cancelar</Text>
        </Pressable>
        <Pressable style={[styles.botao, styles.salvar]} onPress={salvar}>
          <Text style={styles.salvarTexto}>{editando ? 'Atualizar' : 'Adicionar'}</Text>
        </Pressable>
      </View>

      {editando && (
        <Pressable style={styles.excluir} onPress={excluir}>
          <Text style={styles.excluirTexto}>Excluir despesa</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f1fd' },
  label: { fontSize: 14, fontWeight: 'bold', color: '#3e04c3', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 6, padding: 12, borderWidth: 1, borderColor: '#ccc' },
  categorias: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16, backgroundColor: '#e5e5e5' },
  chipAtivo: { backgroundColor: '#3e04c3' },
  chipTexto: { color: '#333' },
  chipTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  botoes: { flexDirection: 'row', gap: 12, marginTop: 28 },
  botao: { flex: 1, padding: 14, borderRadius: 6, alignItems: 'center' },
  cancelar: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#3e04c3' },
  cancelarTexto: { color: '#3e04c3', fontWeight: 'bold' },
  salvar: { backgroundColor: '#3e04c3' },
  salvarTexto: { color: '#fff', fontWeight: 'bold' },
  excluir: { marginTop: 20, alignItems: 'center' },
  excluirTexto: { color: 'red', fontWeight: 'bold' },
});
