
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as labels from './labels';
import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregado, setCarregado] = useState(false);

  
  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          setCompromissos(JSON.parse(dadosSalvos));
        }
      } catch (error) {
        Alert.alert('Erro', 'Falha ao carregar os compromissos salvos.');
      } finally {
        setCarregado(true);
      }
    }
    carregarDados();
  }, []);


  useEffect(() => {
    async function salvarDados() {
      if (!carregado) return; 
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (error) {
        Alert.alert('Erro', 'Falha ao salvar os compromissos.');
      }
    }
    salvarDados();
  }, [compromissos, carregado]);

  
  const handleAdicionar = () => {
    if (texto.trim() === '') {
      Alert.alert(labels.erroTitulo, labels.erroMensagem);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: texto.trim(),
      criadoEm: new Date().toISOString(),
    };

    setCompromissos((listaAnterior) => [...listaAnterior, novoCompromisso]);
    setTexto('');
  };


  const handleRemover = (id) => {
    setCompromissos((listaAnterior) => 
      listaAnterior.filter((item) => item.id !== id)
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {}
        <View style={styles.header}>
          <Image 
            source={require('./assets/iesbimage.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <View>
            <Text style={styles.title}>{labels.tituloApp}</Text>
            <Text style={styles.subtitle}>{compromissos.length} pendente(s)</Text>
          </View>
        </View>

        {}
        <CompromissoInput 
          value={texto}
          onChangeText={setTexto}
          onAdd={handleAdicionar}
          labels={labels}
        />

        {}
        <CompromissoList 
          itens={compromissos}
          onDelete={handleRemover}
          tituloLista={labels.tituloLista}
          listaVazia={labels.listaVazia}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  logo: {
    width: 48,
    height: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003366',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
});