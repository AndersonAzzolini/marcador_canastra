import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native'
import Inicio from './pages/inicio';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>{
      <Stack.Navigator initialRouteName="Inicio" headerMode='none'>
        <Stack.Screen name="Inicio" component={Inicio} />
      </Stack.Navigator>
    }</NavigationContainer>
  );
}
