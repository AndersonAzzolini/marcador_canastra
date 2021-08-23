import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from './pages/inicio';
import PartidasSalvas from './pages/partidasSalvas';
import NovaPartida from './pages/novaPartida';
import PartidaEmAndamento from './pages/partidaEmAndamento';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator initialRouteName="Inicio" headerMode='none'>
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Partidas Salvas" component={PartidasSalvas} />
        <Stack.Screen name="Nova Partida" component={NovaPartida} />
        <Stack.Screen name="Partida em Andamento" component={PartidaEmAndamento}/>
      </Stack.Navigator>
    }</NavigationContainer>
  );
}
