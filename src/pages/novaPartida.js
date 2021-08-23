import React, { useState } from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { styles } from './styles/novaPartida'
import Input from '../components/input'
import Button from '../components/button'
import { insereEquipes, selecionaNomeEquipes } from '../db/equipes'
import { insereNomePartida } from '../db/partida'
import Loader from '../components/loader'
import { inserePontosInicias, selecionaPontos } from '../db/pontos'
const NovaPartida = ({ navigation }) => {

  const [nomeEquipe1, setNomeEquipe1] = useState('')
  const [nomeEquipe2, setNomeEquipe2] = useState('')
  const [nomePartida, setNomePartida] = useState('')
  const [loading, setLoading] = useState(false)
  const [pontos, setPontos] = useState()

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
      console.log(idPartida);
      let idEquipe1 = await insereEquipes(nomeEquipe1, idPartida)
      console.log(idEquipe1);

      let idEquipe2 = await insereEquipes(nomeEquipe2, idPartida)
      console.log(idEquipe2);

      await inserePontosInicias(idEquipe1)
      await inserePontosInicias(idEquipe2)
      let informacoesPartida = await selecionaPontos(idPartida)
      console.log(informacoesPartida);
      informacoesPartida.length > 0 ?
        navigation.navigate("Partida em Andamento", { informacoesPartida })
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

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
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
        <Button
          onPress={() => selecionaNomeEquipes()}
          text='equipes' />
        <Button
          onPress={() => selecionaPontos(2)}
          text='pontos' />

      </View>
    </ScrollView >
  )

}

export default NovaPartida