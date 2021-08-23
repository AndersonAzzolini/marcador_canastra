import React, { useState } from 'react'
import { View, ScrollView, Text, Alert } from 'react-native'
import { styles } from './styles/novaPartida'
import Input from '../components/input'
import Button from '../components/button'
const NovaPartida = () => {

  const [nomeEquipe1, setNomeEquipe1] = useState('')
  const [nomeEquipe2, setNomeEquipe2] = useState('')
  const [pontos, setPontos] = useState()

  const verificaValores = (nomeEquipe1, nomeEquipe2, pontos) => {

    if (!nomeEquipe1 || !nomeEquipe2 || !pontos) {
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

  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.viewInputs}>
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
          onPress={() => verificaValores(nomeEquipe1, nomeEquipe2, pontos)}
          text='Criar partida' />
      </View>
    </ScrollView >
  )

}

export default NovaPartida