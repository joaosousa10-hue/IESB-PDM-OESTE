import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const screens = [
  { name: 'index', title: 'Início', icon: 'home-outline' },
  { name: 'tasks', title: 'Tarefas', icon: 'checkbox-outline' },
  { name: 'wallet', title: 'Bolso', icon: 'wallet-outline' },
  { name: 'profile', title: 'Perfil', icon: 'person-outline' },
];

export default function TabsLayout() {
  return (
    <Tabs>
      {screens.map((s) => (
        <Tabs.Screen
          key={s.name}
          name={s.name}
          options={{
            title: s.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={s.icon} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
