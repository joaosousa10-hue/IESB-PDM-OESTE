import { View, Text, FlatList, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { useNotices } from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';

export default function Home() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && notices.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error && notices.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Tentar novamente" onPress={reload} />
      </View>
    );
  }

  return (
    <FlatList
      data={notices}
      keyExtractor={(item) => String(item.id)}
      refreshing={isLoading}
      onRefresh={reload}
      contentContainerStyle={styles.list}
      ListEmptyComponent={<Text style={styles.empty}>Nenhum aviso por enquanto.</Text>}
      renderItem={({ item }) => (
        <FadeIn>
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        </FadeIn>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  error: { color: '#b00020', textAlign: 'center' },
  list: { padding: 16, gap: 12 },
  card: { backgroundColor: '#f2f2f2', borderRadius: 10, padding: 14, gap: 6 },
  title: { fontWeight: '700', fontSize: 16 },
  empty: { textAlign: 'center', marginTop: 40, color: '#666' },
});
