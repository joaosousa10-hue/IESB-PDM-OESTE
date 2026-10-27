import { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Link, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function Tasks() {
  const router = useRouter();
  const [place, setPlace] = useState(null);

  async function handleCheckIn() {
    try {
      const result = await getCurrentPlace();
      if (!result) {
        Alert.alert('Sem permissão', 'Permita a localização para fazer o check-in.');
        return;
      }
      setPlace(result);
    } catch {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    }
  }

  async function handleReminder() {
    const ok = await scheduleReminder('Hora de estudar!', 10);
    Alert.alert(
      ok ? 'Lembrete agendado' : 'Sem permissão',
      ok ? 'Você será avisado em 10 segundos.' : 'Permita as notificações para receber lembretes.'
    );
  }

  async function handleComplete() {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {}
    Alert.alert('Tarefa concluída');
  }

  return (
    <View style={styles.container}>
      <Link href="/new-task" asChild>
        <Button title="Nova tarefa" />
      </Link>
      <Button title="Abrir tarefa 42" onPress={() => router.push('/task/42')} />
      <Button title="Estudei aqui" onPress={handleCheckIn} />
      {place && <Text style={styles.place}>{place.label}</Text>}
      <Button title="Lembrar em 10 s" onPress={handleReminder} />
      <Button title="Concluir" onPress={handleComplete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 14, padding: 24 },
  place: { textAlign: 'center', fontSize: 16 },
});
