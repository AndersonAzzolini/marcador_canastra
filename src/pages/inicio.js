import React, { useState } from 'react'
import Button from '../components/button'
import { Text, View, Image } from 'react-native'
import DatabaseSQLite from '../db/db'
import { styles } from './styles/inicio'
import { selecionaNomePartidas } from '../db/equipes'
const Inicio = () => {

  const [nomeEquipes, setNomeEquipes] = useState('')
  const db = new DatabaseSQLite()

  const partidasSalvas = async () => {
    let partidas = await selecionaNomePartidas()
    console.log(partidas);
  }
  return (
    <View style={styles.container}>
      <View style={styles.viewLogo}>
        <Image
          source={require('../assets/img/logo.webp')}
        />
      </View>
      <View style={styles.viewBotoes}>
        <Button
          text='Nova partida'
          styleText={styles.text}
        />
        <Button
          styleText={styles.text}
          text='Partidas Salvas'
          onPress={() => partidasSalvas()}
        />
      </View>
    </View>
  )
}

export default Inicio