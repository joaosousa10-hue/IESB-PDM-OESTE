import { Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DespesasProvider } from './src/context/DespesasContext';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3e04c3' },
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#3e04c3',
        headerRight: () => (
          <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} style={{ marginRight: 16 }}>
            <Text style={{ color: '#fff', fontSize: 28 }}>+</Text>
          </Pressable>
        ),
      }}>
      <Tab.Screen name="Recentes" component={DespesasRecentes} options={{ title: 'Despesas Recentes' }} />
      <Tab.Screen name="Todas" component={TodasDespesas} options={{ title: 'Todas as Despesas' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <DespesasProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerStyle: { backgroundColor: '#3e04c3' }, headerTintColor: '#fff' }}>
          <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
          <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa}
            options={{ presentation: 'modal' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </DespesasProvider>
  );
}
