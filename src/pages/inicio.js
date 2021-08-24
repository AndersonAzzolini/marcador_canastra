import React, { useState } from 'react'
import Button from '../components/button'
import { View, Image } from 'react-native'
import DatabaseSQLite from '../db/db'
import { styles } from './styles/inicio'
import { selecionaNomePartidas } from '../db/equipes'
import Loader from '../components/loader'
const Inicio = ({ navigation }) => {

  const [loading, setLoading] = useState(false)
  const db = new DatabaseSQLite()

  const partidasSalvas = async () => {
    try {
      setLoading(true)
      let partidas = await selecionaNomePartidas()
      console.log(partidas);
      navigation.navigate("Partidas Salvas", partidas);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Loader
        visible={loading}
        text='Carregando partidas salvas.. Aguarde'
      />
      <View style={styles.viewLogo}>
        <Image
          source={require('../assets/img/logo.webp')}
        />
      </View>
      <View style={styles.viewBotoes}>
        <Button
          text='Nova partida'
          styleText={styles.text}
          onPress={() => navigation.navigate("Nova Partida")}

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