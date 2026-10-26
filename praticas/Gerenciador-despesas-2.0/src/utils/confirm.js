import { Alert, Platform } from 'react-native';

// Alert.alert com botões não funciona na web; lá usamos window.confirm.
export function confirmDestructive({ title, message, confirmText = 'Excluir', onConfirm }) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n${message}`)) onConfirm();
    return;
  }

  Alert.alert(title, message, [
    { text: 'Cancelar', style: 'cancel' },
    { text: confirmText, style: 'destructive', onPress: onConfirm },
  ]);
}
