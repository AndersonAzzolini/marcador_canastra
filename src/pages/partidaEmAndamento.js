import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { styles } from './styles/partidaEmAndamento'
import { inserePontosEquipe, selecionaPontosPorEquipe } from '../db/pontos'

const PartidaEmAndamento = ({ route, navigation }) => {
  console.log(route.params.informacoesPartida)
  const [pontosEquipe1, setPontosEquipe1] = useState(route.params.pontosEquipe1)
  const [pontosEquipe2, setPontosEquipe2] = useState(route.params.pontosEquipe2)
  const pontosMaximo = route.params.informacoesPartida[0].pontosMaximo
  const nomePartida = route.params.informacoesPartida[0].nomePartida
  const equipe1 = route.params.informacoesPartida[0]
  const equipe2 = route.params.informacoesPartida[1]
  
  useEffect(async () => {
    navigation.setOptions({ title: nomePartida })
  })

  const adicionaPontoEquipe1 = () => {
    setPontosEquipe1([...pontosEquipe1, { pontos: 20 }])
  }

  const removeUltimoPontoEquipe1 = () => {
    pontosEquipe1.pop()
    setPontosEquipe1([...pontosEquipe1])
  }


  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.viewPontos}>
        <View >
          <Text style={styles.text}>
            {equipe1.nomeEquipe}
          </Text>
          {pontosEquipe1.map((index => {
            return <Text style={styles.text}>
              {index.pontos}
            </Text>

          }))}
          <View style={styles.viewPontosTotal}>
            <Divider
              style={styles.divider} />
            <Text style={styles.textTotal}></Text>
            <View style={styles.viewIcons}>
              <Pressable onPress={() => adicionaPontoEquipe1()}>
                <Image style={styles.image}
                  source={require('../assets/img/plus.png')}
                />
              </Pressable>
              <Pressable onPress={() => removeUltimoPontoEquipe1()}>
                <Image style={styles.image}
                  source={require('../assets/img/costas.png')}
                />
              </Pressable>
            </View>
          </View>
        </View>
        <View >
          <Text style={styles.text}>
            {equipe2.nomeEquipe}
          </Text>
          {pontosEquipe2.map((index => {
            return <Text style={styles.text}>
              {index.pontos}
            </Text>
          }))}
          <View style={styles.viewPontosTotal}>
            <Divider
              style={styles.divider} />
            <Text style={styles.textTotal}></Text>
          </View>
          <View style={styles.viewIcons}>
            <Pressable>
              <Image style={styles.image}
                source={require('../assets/img/plus.png')}
              />
            </Pressable>
            <Pressable>
              <Image style={styles.image}
                source={require('../assets/img/costas.png')}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable onPress={() => inserePontosEquipe(11)}>
        <Image style={styles.image}
          source={require('../assets/img/costas.png')}
        />
      </Pressable>
    </ScrollView>
  )
}

export default PartidaEmAndamento