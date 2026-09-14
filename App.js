import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [textoMeta, setTextoMeta] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregado, setCarregado] = useState(false);

  
  useEffect(() => {
    async function carregarMetas() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);
        if (dadosSalvos !== null) {
          setMetas(JSON.parse(dadosSalvos));
        }
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível carregar as metas.');
      } finally {
        setCarregado(true);
      }
    }
    carregarMetas();
  }, []);

  
  useEffect(() => {
    async function salvarMetas() {
      if (!carregado) return; 
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (e) {
        Alert.alert('Erro', 'Não foi possível salvar a meta.');
      }
    }
    salvarMetas();
  }, [metas, carregado]);

  
  const handleAdicionarMeta = () => {
    if (textoMeta.trim() === '') {
      Alert.alert('Aviso', 'Por favor, digite uma meta válida!');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: textoMeta,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
    setTextoMeta('');
  };

  
  const handleRemoverMeta = (id) => {
    setMetas((metasAtuais) => metasAtuais.filter((meta) => meta.id !== id));
  };

  
  const handleToggleConcluida = (id) => {
    setMetas((metasAtuais) =>
      metasAtuais.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  };

  
  const totalConcluidas = metas.filter((m) => m.concluida).length;
  const totalPendentes = metas.length - totalConcluidas;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require('./assets/meta.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>Metas do Semestre</Text>
          <Text style={styles.counter}>
            {totalPendentes} pendentes / {totalConcluidas} concluídas
          </Text>
        </View>

        <MetaInput
          value={textoMeta}
          onChangeText={setTextoMeta}
          onAdd={handleAdicionarMeta}
        />

        <MetaList
          metas={metas}
          onDelete={handleRemoverMeta}
          onToggleComplete={handleToggleConcluida}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#971616',
  },
  counter: {
    fontSize: 14,
    color: '#ee1212',
    marginTop: 4,
  },
});