import React, { useEffect, useRef } from 'react'
import Button from '../components/button'
import {
  View,
  Image,
  ScrollView,
} from 'react-native'
import DatabaseSQLite from '../db/db'
import { styles } from './styles/inicio'
import ImageTeeste from '../assets/img/teste.png'
import AdMob, { BannerAd, BannerAdSize } from '@react-native-admob/admob';


const Inicio = ({ navigation }) => {
  const bannerRef = useRef(null);
  const db = new DatabaseSQLite()
  useEffect(async () => {
    navigation.setOptions({ headerShown: false })
    await db.criaDataBase()
  })

  useEffect(() => {
    const init = async () => {
      await AdMob.initialize();
    };
    init();
  }, []);
  return (
    <>
      <ScrollView contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <View style={styles.viewLogo}>
            <Image
              style={styles.image}
              resizeMode='center'
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
      </ScrollView>
      <BannerAd
        size={BannerAdSize.BANNER}
        unitId={'ca-app-pub-3940256099942544/6300978111'}
        onAdFailedToLoad={(error) => console.error(error)}
        ref={bannerRef}
        size={'ADAPTIVE_BANNER'}
      />
    </>

  )
}

export default Inicio