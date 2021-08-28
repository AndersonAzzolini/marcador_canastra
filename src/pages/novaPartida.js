import React, { useEffect, useState } from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { styles } from './styles/novaPartida'
import Input from '../components/input'
import Button from '../components/button'
import { insereEquipes } from '../db/equipes'
import { insereNomePartida } from '../db/partida'
import Loader from '../components/loader'
import { inserePontos, selecionaPontos } from '../db/pontos'
import BannerComponent from '../components/banner'
import AsyncStorage from '@react-native-async-storage/async-storage';

const NovaPartida = ({ navigation }) => {

  const [nomeEquipe1, setNomeEquipe1] = useState('')
  const [nomeEquipe2, setNomeEquipe2] = useState('')
  const [nomePartida, setNomePartida] = useState('')
  const [loading, setLoading] = useState(false)
  const [banner, setBanner] = useState(false)
  const [pontos, setPontos] = useState('')
  useEffect(() => {
    verificaBanner()
  })
  const criaPartida = async () => {
    try {
      setLoading(true)
      if (!nomeEquipe1 || !nomeEquipe2 || !pontos || !nomePartida) {
        Alert.alert(
          'Erro',
          'Preencha todos os campos, por favor'
        )
        return false
      }
      if (isNaN(pontos)) {
        Alert.alert(
          'Erro',
          'Campo de pontos deve ser somente números'
        )
        return false
      }

      let idPartida = await insereNomePartida(nomePartida, pontos)
      let idEquipe1 = await insereEquipes(nomeEquipe1, idPartida)
      let idEquipe2 = await insereEquipes(nomeEquipe2, idPartida)
      await inserePontos(idEquipe1)
      await inserePontos(idEquipe2)
      let informacoesPartida = await selecionaPontos(idPartida)
      let pontosEquipe1 = [{ pontos: 0 }]
      let pontosEquipe2 = [{ pontos: 0 }]
      informacoesPartida.length > 0 ?
        navigation.replace("Partida em Andamento", { informacoesPartida, pontosEquipe1, pontosEquipe2 })
        :
        Alert.alert(
          'Erro',
          'Problema ao criar partida..'
        )

      console.log('inseriu tudo', idPartida, idEquipe1, idEquipe2)
    } catch (e) {
      console.log(e)

    } finally {
      setLoading(false)
    }
  }

  const naoMostraBanner = async (value) => {
    try {
      await AsyncStorage.setItem(
        'bannerVisible', '1')
      setBanner(false)
    } catch (e) {
      console.log(e);
    }
  }

  const verificaBanner = async () => {
    console.log('caoi aqu')
    const value = await AsyncStorage.getItem('bannerVisible')
    JSON.parse(value) == '1' ? setBanner(false) : null
  }

  return (
    <>
      <BannerComponent
        text='A partida é salva automaticamente, não se preocupe com isso :)'
        labelTextoCancelar='Não mostrar novamente'
        onPressCancelar={() => naoMostraBanner()}
        onPressConfirmar={() => setBanner(false)}
        visible={banner} />
      <ScrollView contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps='handled'
      >
        <Loader
          visible={loading}
          text='Criando partida... aguarde'
        />
        <View style={styles.viewInputs}>
          <Text>Nome da partida:</Text>
          <Input
            label='Primeira equipe'
            value={nomePartida}
            onChangeText={(text) => setNomePartida(text)}
            placeholder='Digite o nome da partida' />
          <Text>Primeira equipe:</Text>
          <Input
            label='Primeira equipe'
            value={nomeEquipe1}
            onChangeText={(text) => setNomeEquipe1(text)}
            placeholder='Digite o nome da primeira equipe' />
        </View>
        <View style={styles.viewInputs}>
          <Text>Segunda equipe:</Text>
          <Input
            value={nomeEquipe2}
            onChangeText={(text) => setNomeEquipe2(text)}
            placeholder='Digite o nome da segunda equipe' />
        </View>
        <View style={styles.viewInputs}>
          <Text>Pontos máximos:</Text>
          <Input
            value={pontos}
            onChangeText={(text) => setPontos(text)}
            keyboardType='phone-pad'
            placeholder='Digite a pontuação máxima da partida' />
        </View>
        <View style={styles.viewBotoes}>
          <Button
            onPress={() => criaPartida()}
            text='Criar partida' />
        </View>
      </ScrollView >
    </>
  )

}

export default NovaPartida