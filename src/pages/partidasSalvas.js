import React, {useState} from 'react';
import { ScrollView, View, Text, Alert } from 'react-native';
import Button from '../components/button';
import { selecionaPontos, selecionaPontosPorEquipe } from '../db/pontos';
import { styles } from './styles/partidasSalvas';

const PartidasSalvas = ({ route, navigation }) => {
  const partidas = route.params
  const carregarPartida = async (idPartida) => {
    let informacoesPartida = await selecionaPontos(idPartida)
    let pontosEquipe1 = await selecionaPontosPorEquipe(informacoesPartida[0].idEquipe)
    let pontosEquipe2 = await selecionaPontosPorEquipe(informacoesPartida[1].idEquipe)

    informacoesPartida.length > 0 ? navigation.navigate("Partida em Andamento", { informacoesPartida, pontosEquipe1, pontosEquipe2 }) :
      Alert.alert(
        'Erro',
        'Erro ao carregar partida'
      )
  }



  if (partidas.length > 0) {
    return (
      <ScrollView contentContainerStyle={styles.scroll}>
        {partidas.map((partidas, indice) => {
          return (
            <Button
              text={partidas.nome}
              style={styles.botao}
              onPress={() => carregarPartida(partidas.rowid)}
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