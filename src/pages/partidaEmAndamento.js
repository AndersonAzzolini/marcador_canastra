import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { styles } from './styles/partidaEmAndamento'
import { deletaPonto, inserePontos } from '../db/pontos'
import Input from '../components/input'
import Button from '../components/button'

const PartidaEmAndamento = ({ route, navigation }) => {
  const [pontosEquipe1, setPontosEquipe1] = useState(route.params.pontosEquipe1)
  const [pontosEquipe2, setPontosEquipe2] = useState(route.params.pontosEquipe2)
  const [totalPontosEquipe1, setTotalPontosEquipe1] = useState(0)
  const [totalPontosEquipe2, setTotalPontosEquipe2] = useState(0)
  const [inputPontosEquipe1, setInputPontosEquipe1] = useState('')
  const [inputPontosEquipe2, setInputPontosEquipe2] = useState('')
  const pontosMaximo = route.params.informacoesPartida[0].pontosMaximo
  const nomePartida = route.params.informacoesPartida[0].nomePartida
  const equipe1 = route.params.informacoesPartida[0]
  const equipe2 = route.params.informacoesPartida[1]

  useEffect(() => {
    navigation.setOptions({ title: nomePartida })
  })

  useEffect(() => {
    soma(pontosEquipe1, 1)
  }, [pontosEquipe1])

  useEffect(() => {
    soma(pontosEquipe2)
  }, [pontosEquipe2])

  const showAlert = () => {
    Alert.alert(
      'Erro',
      'É necessário informar o valor do campo '
    )
  }

  const confirmacaoRemoverPonto = (value) => {
    Alert.alert(
      'Confirmação',
      'Deseja mesmo exluir o último ponto?',
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Apagar", onPress: () => removeUltimoPontoEquipe(value) }
      ]
    )
  }

  const adicionaPontoEquipe = async (value) => {
    try {
      if (value == 1 && inputPontosEquipe1) {
        setPontosEquipe1([...pontosEquipe1, { pontos: inputPontosEquipe1 }])
        await inserePontos(equipe1.idEquipe, inputPontosEquipe1)
        setInputPontosEquipe1('')
      } else if (inputPontosEquipe2) {
        setPontosEquipe2([...pontosEquipe2, { pontos: inputPontosEquipe2 }])
        await inserePontos(equipe2.idEquipe, inputPontosEquipe2)
        setInputPontosEquipe2('')
      } else {
        showAlert()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const soma = (array, value) => {
    let total = 0
    if (value == 1) {
      array.map((index) => {
        total = total += parseInt(index.pontos)
      })
      setTotalPontosEquipe1(total);
    } else {
      array.map((index) => {
        total = total += parseInt(index.pontos)
      })
      setTotalPontosEquipe2(total);
    }
  }

  const removeUltimoPontoEquipe = async (value) => {
    try {
      if (value == 1) {
        await deletaPonto(equipe1.idEquipe)
        pontosEquipe1.pop()
        setPontosEquipe1([...pontosEquipe1])
      } else {
        await deletaPonto(equipe2.idEquipe)
        pontosEquipe2.pop()
        setPontosEquipe2([...pontosEquipe2])
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.viewPontos}>
        <View >
          <Text style={[styles.text, styles.textEquipes]}>
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
            <Text style={styles.textTotal}>{totalPontosEquipe1}</Text>
            <View style={styles.input}>
              <Input
                keyboardType='phone-pad'
                value={inputPontosEquipe1}
                onChangeText={text => setInputPontosEquipe1(text)}
                placeholder='Pontos a adicionar' />
            </View>
            <View style={styles.viewIcons}>
              <Button
                text='Adicionar ponto'
                onPress={() => adicionaPontoEquipe(1)}
                style={styles.botao}
              />
              <Button
                onPress={() => confirmacaoRemoverPonto(1)}
                text='Remover ponto'
                style={styles.botaoExcluir}
              />
            </View>
          </View>
        </View>
        <View >
          <Text style={[styles.text, styles.textEquipes]}>
            {equipe2.nomeEquipe}
          </Text>
          {pontosEquipe2.map((index => {
            return (
              <Text style={styles.text}>
                {index.pontos}
              </Text>
            )
          }))}
          <View style={styles.viewPontosTotal}>
            <Divider
              style={styles.divider} />
            <Text style={styles.textTotal}>{totalPontosEquipe2}</Text>
          </View>
          <View style={styles.input}>
            <Input
              keyboardType='phone-pad'
              value={inputPontosEquipe2}
              onChangeText={text => setInputPontosEquipe2(text)}
              placeholder='Pontos a adicionar' />
          </View>
          <View style={styles.viewIcons}>
            <Button
              text='Adicionar ponto'
              onPress={() => adicionaPontoEquipe()}
              style={styles.botao}
            />
            <Button
              text='Remover ponto'
              onPress={() => confirmacaoRemoverPonto()}
              style={styles.botaoExcluir}
            />
          </View>
        </View>
      </View>
 
    </ScrollView>
  )
}

export default PartidaEmAndamento