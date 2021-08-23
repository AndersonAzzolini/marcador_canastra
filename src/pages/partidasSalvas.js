import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import Button from '../components/button';
import { selecionaNomePartidas } from '../db/equipes';
import { styles } from './styles/partidasSalvas';

const PartidasSalvas = ({ route, navigation }) => {

  const partidas = route.params

  const buscaPartida = async (idPartida) => {
    console.log(idPartida)
    // let partida = await selecionaNomePartidas(idPartida)
  }

  console.log(partidas);
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      {partidas.map((partidas, indice) => {
        return (
          <View style={styles.viewBotoes}>
            <Button
              text={partidas.nome}
              style={styles.botao}
              onPress={() => buscaPartida(partidas.rowid)}
            />
          </View>
        )
      })}
    </ScrollView>
  )
}

export default PartidasSalvas