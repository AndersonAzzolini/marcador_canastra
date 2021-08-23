import React, { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { styles } from './styles/partidaEmAndamento'
import Button from '../components/button'

const PartidaEmAndamento = ({ route, navigation }) => {

  const [pontosEquipe1, setPontosEquipe1] = useState([route.params.informacoesPartida[0].pontos])
  const [pontosEquipe2, setPontosEquipe2] = useState([route.params.informacoesPartida[1].pontos])
  const pontosMaximo = route.params.informacoesPartida[0].pontosMaximo
  const nomePartida = route.params.informacoesPartida[0].nomePartida
  const equipe1 = route.params.informacoesPartida[0]
  const equipe2 = route.params.informacoesPartida[1]

  useEffect(() => {
    navigation.setOptions({ title: nomePartida })
  })

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.viewPontos}>
        <View >
          <Text style={styles.text}>{equipe1.nomeEquipe}</Text>
          <Text style={styles.text}>{pontosEquipe1}</Text>
          <View style={styles.viewPontosTotal}>
            <Divider
              style={styles.divider} />
            <Text style={styles.textTotal}></Text>
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
        <View >
          <Text style={styles.text}>{equipe2.nomeEquipe}</Text>
          <Text style={styles.text}>{pontosEquipe2}</Text>
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
    </ScrollView>
  )
}

export default PartidaEmAndamento