import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert, ActivityIndicator } from 'react-native';
import Button from '../components/button';
import { selecionaNomePartidas } from '../db/equipes';
import { selecionaPontos, selecionaPontosPorEquipe } from '../db/pontos';
import { styles } from './styles/partidasSalvas';
import Cores from '../assets/cores.json'

const PartidasSalvas = ({ route, navigation }) => {
  const [partidas, setPartidas] = useState([])
  const [loading, setLoading] = useState(false)

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

  useEffect(async () => {
    await partidasSalvas()
  }, [])

  const partidasSalvas = async () => {
    try {
      setLoading(true)
      let partidas = await selecionaNomePartidas()
      console.log(partidas);
      setPartidas(partidas)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return loading ?
    <View>
      <ActivityIndicator
        style={styles.ActivityIndicator}
        size={75}
        color={Cores.verde}
      />
      <Text style={[styles.text, styles.textActivityIndicator]}> Carregando partidas...</Text>
    </View>
    :
    <ScrollView contentContainerStyle={styles.scroll}>
      {partidas.length > 0 ?
        partidas.map((partidas, indice) => {
          return (
            <Button
              text={partidas.nome}
              style={styles.botao}
              onPress={() => carregarPartida(partidas.rowid)}
            />
          )
        })
        :
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.viewSemPartida}>
            <Text style={styles.text}>Nenhuma partida criada...</Text>
          </View>
          <View style={styles.viewBotaoSemPartida}>
            <Button
              text='Criar partida'
              onPress={() => navigation.replace('Nova Partida')}
            />
          </View>
        </ScrollView>
      }
    </ScrollView>
}

export default PartidasSalvas