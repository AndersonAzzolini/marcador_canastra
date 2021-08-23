import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Button from '../components/button';
import { selecionaPontos } from '../db/pontos';
import { styles } from './styles/partidasSalvas';

const PartidasSalvas = ({ route, navigation }) => {

  const partidas = route.params

  if (partidas.length > 0) {
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        {partidas.map((partidas, indice) => {
          return (
            <Button
              text={partidas.nome}
              style={styles.botao}
              onPress={() => selecionaPontos(partidas.rowid)}
            />
          )
        })}
      </ScrollView>
    )
  } else {
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.viewSemPartida}>
          <Text style={styles.text}>Nenhuma partida criada...</Text>
        </View>
      </ScrollView>

    )
  }
}

export default PartidasSalvas