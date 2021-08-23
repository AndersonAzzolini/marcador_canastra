import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { styles } from './styles/partidaEmAndamento'

const PartidaEmAndamento = ({ route, navigation }) => {

  const [pontosEquipe1, setPontosEquipe1] = useState(route.params.informacoesPartida[0].pontos)
  const [pontosEquipe2, setPontosEquipe2] = useState(route.params.informacoesPartida[1].pontos)
  const pontosMaximo = route.params.informacoesPartida[0].pontosMaximo
  const nomePartida = route.params.informacoesPartida[0].nomePartida
  const equipe1 = route.params.informacoesPartida[0]
  const equipe2 = route.params.informacoesPartida[1]
console.log(route.params);
  useEffect(() => {
    navigation.setOptions({ title: nomePartida })
  })

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={{
        paddingTop: 30,
        flexDirection: 'row', flex: 1,
        justifyContent: 'space-around'
      }}>
        <View style={{}}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{equipe1.nomeEquipe}</Text>
          <Text>0</Text>
        </View>
        <View>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{equipe2.nomeEquipe}</Text>
        </View>

      </View>
    </ScrollView>
  )
}

export default PartidaEmAndamento