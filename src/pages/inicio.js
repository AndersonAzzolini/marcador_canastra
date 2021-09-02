import React, { useEffect, useState } from 'react'
import Button from '../components/button'
import { View, Dimensions, Image } from 'react-native'
import DatabaseSQLite from '../db/db'
import { styles } from './styles/inicio'
import Loader from '../components/loader'
import ImageTeeste from '../assets/img/teste.png'
const Inicio = ({ navigation }) => {

  const [loading, setLoading] = useState(false)
  const db = new DatabaseSQLite()

  useEffect(() => {
    navigation.setOptions({ headerShown: false })
  })

  useEffect(async () => {
    await db.criaDataBase()

  }, [])

  return (
    <View style={styles.container}>
      <Loader
        visible={loading}
        text='Carregando partidas salvas.. Aguarde'
      />
      <View style={styles.viewLogo}>
        <Image
          source={ImageTeeste}
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