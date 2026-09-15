
import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>{tituloLista}</Text>
      
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => onDelete(item.id)}
            android_ripple={{ color: '#ffcdd2' }}
          >
            <Text style={styles.cardText}>{item.texto}</Text>
            <Text style={styles.removeText}>Excluir</Text>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{listaVazia}</Text>
        }
        contentContainerStyle={itens.length === 0 && styles.emptyContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cardPressed: {
    backgroundColor: '#F5F5F5',
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  removeText: {
    color: '#D32F2F',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    fontSize: 14,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});