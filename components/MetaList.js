import React from 'react';
import { FlatList, View, Text, Pressable, StyleSheet } from 'react-native';

export default function MetaList({ metas, onDelete, onToggleComplete }) {
  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Pressable
            style={styles.textContainer}
            onPress={() => onToggleComplete(item.id)}
          >
            <Text style={[styles.itemText, item.concluida && styles.itemTextConcluida]}>
              {item.texto}
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.deleteButton, pressed && styles.buttonPressed]}
            android_ripple={{ color: '#8a0303' }}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.deleteText}>Remover</Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>Nenhuma meta cadastrada ainda.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#a7a5a5',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#111111',
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemTextConcluida: {
    textDecorationLine: 'line-through',
    color: '#464545',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  deleteText: {
    color: '#080808',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});