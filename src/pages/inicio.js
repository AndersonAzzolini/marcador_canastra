import React, { useEffect, useState } from 'react'
import Button from '../components/button'
import { View, Image, Dimensions } from 'react-native'
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

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  })
  useEffect(async () => {
    await db.criaDataBase()
  })
  return (
    <View style={styles.container}>
      <Loader
        visible={loading}
        text='Carregando partidas salvas.. Aguarde'
      />
      <View style={styles.viewLogo}>
        <Image
          style={{
            maxHeight: Dimensions.get('window').height * 0.6,
            maxWidth: Dimensions.get('window').width
          }}
          source={require('../assets/img/teste.png')}
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
          onPress={() => navigation.navigate("Partidas Salvas")}
        />
      </View>
    </View>
  )
}

export default Inicio