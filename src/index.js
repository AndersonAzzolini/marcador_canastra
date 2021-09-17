import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './pages/inicio';
import PartidasSalvas from './pages/partidasSalvas';
import NovaPartida from './pages/novaPartida';
import PartidaEmAndamento from './pages/partidaEmAndamento';
import { View } from 'react-native'
const Stack = createNativeStackNavigator();
export default function App() {

  return (
    <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
      <NavigationContainer>{
        <Stack.Navigator initialRouteName="Início"  >
          <Stack.Screen name="Início" component={Inicio} />
          <Stack.Screen name="Partidas Salvas" component={PartidasSalvas} />
          <Stack.Screen name="Nova Partida" component={NovaPartida} />
          <Stack.Screen name="Partida em Andamento" component={PartidaEmAndamento} />
        </Stack.Navigator>
      }</NavigationContainer>
    </View>

  );
}
