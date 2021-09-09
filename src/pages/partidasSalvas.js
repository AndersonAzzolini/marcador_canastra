import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Alert, ActivityIndicator } from 'react-native';
import Button from '../components/button';
import Loader from '../components/loader';
import { selecionaNomePartidas } from '../db/equipes';
import { selecionaPontos, selecionaPontosPorEquipe } from '../db/pontos';
import { styles } from './styles/partidasSalvas';
import Cores from '../assets/cores.json'
import {
  parseISO,
  format,
} from 'date-fns';

const PartidasSalvas = ({ route, navigation }) => {
  const [partidas, setPartidas] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingLoaderPartidas, setLoadingLoaderPartidas] = useState(false)

  useEffect(async () => {
    await partidasSalvas()
  }, [])

  const carregarPartida = async (idPartida) => {
    setLoadingLoaderPartidas(true)
    try {
      console.time()
      let informacoesPartida = await selecionaPontos(idPartida)
      const [pontosEquipe1, pontosEquipe2] = await Promise.all([
        selecionaPontosPorEquipe(informacoesPartida[0].idEquipe),
        selecionaPontosPorEquipe(informacoesPartida[1].idEquipe)
      ])
      console.timeEnd()
      informacoesPartida.length > 0 ? navigation.navigate("Partida em Andamento", { informacoesPartida, pontosEquipe1, pontosEquipe2, idPartida }) :
        Alert.alert(
          'Erro',
          'Erro ao carregar partida'
        )
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingLoaderPartidas(false)
    }
  }


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
    <>
      <Loader
        visible={loadingLoaderPartidas}
        text='Carregando partida... aguarde'
      />
      <ScrollView contentContainerStyle={styles.scroll}>
        {partidas.length > 0 ?
          partidas.map((partidas, indice) => {
            return (
              <View>
                <Button
                  textData={format(
                    parseISO(partidas.criadoEm),
                    'dd/MM/yyyy'
                  )}
                  textVencedor=''
                  textNomeEquipes={partidas.nomeEquipes.replace(',', ' vs ')}
                  styleText={styles.textButton}
                  text={partidas.nome}
                  style={styles.botao}
                  onPress={() => carregarPartida(partidas.rowid)}
                />
              </View>
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
                onPress={() => navigation.navigate('Nova Partida')}
              />
            </View>
          </ScrollView>
        }
      </ScrollView>
    </>
}

export default PartidasSalvas