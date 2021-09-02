import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { styles } from './styles/partidaEmAndamento'
import { deletaPonto, deletaTodosPontos, inserePontos } from '../db/pontos'
import Input from '../components/input'
import Button from '../components/button'
import SnackbarComponent from '../components/snackbar'
import { insereVencedorHistorico, selecionaHistorico } from '../db/partida'
import { MotiView } from 'moti'
import 'react-native-reanimated'

const PartidaEmAndamento = ({ route, navigation }) => {
  const [pontosEquipe1, setPontosEquipe1] = useState(route.params.pontosEquipe1)
  const [pontosEquipe2, setPontosEquipe2] = useState(route.params.pontosEquipe2)
  const [historicoVencedor, setHistoricoVencedor] = useState([])
  const [totalPontosEquipe1, setTotalPontosEquipe1] = useState(0)
  const [totalPontosEquipe2, setTotalPontosEquipe2] = useState(0)
  const [inputPontosEquipe1, setInputPontosEquipe1] = useState('')
  const [inputPontosEquipe2, setInputPontosEquipe2] = useState('')
  const [vencedor, setVencedor] = useState('')
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const pontosMaximo = route.params.informacoesPartida[0].pontosMaximo
  const nomePartida = route.params.informacoesPartida[0].nomePartida
  const equipe1 = route.params.informacoesPartida[0]
  const equipe2 = route.params.informacoesPartida[1]
  const idPartida = route.params.idPartida

  useEffect(async () => {
    await buscaHistoricoVencedor()
  }, [totalPontosEquipe1, totalPontosEquipe2])

  useEffect(() => {
    navigation.setOptions({
      title: nomePartida
    })
  })

  useEffect(() => {
    soma(pontosEquipe1, 1)
  }, [pontosEquipe1])

  useEffect(() => {
    soma(pontosEquipe2)
  }, [pontosEquipe2])


  useEffect(() => {
    comparaPontuação()
  }, [totalPontosEquipe1, totalPontosEquipe2])



  const showAlert = () => {
    Alert.alert(
      'Erro',
      'É necessário informar o valor do campo '
    )
  }

  const comparaPontuação = () => {
    if ((totalPontosEquipe1 >= pontosMaximo) && (totalPontosEquipe1 > totalPontosEquipe2)) {
      console.log('vencedor equipe 1');
      setVencedor(equipe1.nomeEquipe)
    } else if ((totalPontosEquipe2 >= pontosMaximo) && (totalPontosEquipe2 > totalPontosEquipe1)) {
      console.log('vencedor equipe 2');
      setVencedor(equipe2.nomeEquipe)
    } else {
      setVencedor('')
    }
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
        {
          text: "Apagar",
          onPress: () => removeUltimoPontoEquipe(value)
        }
      ]
    )
  }

  const mostrarErroRemocaoPonto = () => {
    setSnackbarVisible(true)
  }

  const adicionaPontoEquipe = async (value) => {
    try {
      if (value == 1 && inputPontosEquipe1) {
        setPontosEquipe1([...pontosEquipe1, { pontos: inputPontosEquipe1 }])
        await inserePontos(equipe1.idEquipe, inputPontosEquipe1, idPartida)
        setInputPontosEquipe1('')
      } else if (inputPontosEquipe2) {
        setPontosEquipe2([...pontosEquipe2, { pontos: inputPontosEquipe2 }])
        await inserePontos(equipe2.idEquipe, inputPontosEquipe2, idPartida)
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
      return total
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
        if (pontosEquipe1.length > 1) {
          await deletaPonto(equipe1.idEquipe)
          pontosEquipe1.pop()
          setPontosEquipe1([...pontosEquipe1])
        } else {
          mostrarErroRemocaoPonto()
        }
      } else {
        if (pontosEquipe2.length > 1) {
          await deletaPonto(equipe2.idEquipe)
          pontosEquipe2.pop()
          setPontosEquipe2([...pontosEquipe2])
        } else {
          mostrarErroRemocaoPonto()
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const confirmacaoRecomecarPartida = async () => {
    if (totalPontosEquipe1 > totalPontosEquipe2) {
      await insereVencedorHistorico(idPartida, equipe1.idEquipe)
      setPontosEquipe1([{ pontos: 0 }])
      setPontosEquipe2([{ pontos: 0 }])
      setHistoricoVencedor([...historicoVencedor])
      await deletaTodosPontos(idPartida)
      await inserePontos(equipe1.idEquipe, 0, idPartida)
      await inserePontos(equipe2.idEquipe, 0, idPartida)

    } else {
      await insereVencedorHistorico(idPartida, equipe2.idEquipe)
      setPontosEquipe1([{ pontos: 0 }])
      setPontosEquipe2([{ pontos: 0 }])
      setHistoricoVencedor([historicoVencedor])
      await deletaTodosPontos(idPartida)
      await inserePontos(equipe1.idEquipe, 0, idPartida)
      await inserePontos(equipe2.idEquipe, 0, idPartida)
    }

  }

  const recomecaPartida = () => {
    Alert.alert(
      'Confirmação',
      `Deseja recomeçar essa partida e adicionar a vitória para ${vencedor} ?`,
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: async () => await confirmacaoRecomecarPartida()
        }
      ]
    )
  }

  const buscaHistoricoVencedor = async () => {
    let nomeEquipes = await selecionaHistorico(idPartida)
    setHistoricoVencedor(nomeEquipes)
  }

  return (
    <>
      <ScrollView contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps='handled'
      >
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
                <MotiView
                  from={{
                    translateY: -250
                  }}
                  animate={{
                    translateY: 0
                  }}
                  transition={{
                    duration: 1200,
                    type: 'timing'
                  }}
                >
                  <Button
                    text='Adicionar ponto'
                    onPress={() => adicionaPontoEquipe(1)}
                    style={styles.botao}
                  />
                </MotiView>
                <MotiView
                  from={{
                    translateY: -250
                  }}
                  animate={{
                    translateY: 0
                  }}
                  transition={{
                    duration: 1000,
                    type: 'timing'
                  }}
                >
                  <Button
                    onPress={() => confirmacaoRemoverPonto(1)}
                    text='Remover ponto'
                    style={styles.botaoExcluir}
                  />
                </MotiView>
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
              <MotiView
                from={{
                  translateY: -250
                }}
                animate={{
                  translateY: 0
                }}
                transition={{
                  duration: 1600,
                  type: 'timing'
                }}>
                <Button
                  text='Adicionar ponto'
                  onPress={() => adicionaPontoEquipe()}
                  style={styles.botao}
                />
              </MotiView>
              <MotiView
                from={{
                  translateY: -250
                }}
                animate={{
                  translateY: 0
                }}
                transition={{
                  duration: 1400,
                  type: 'timing'
                }}>
                <Button
                  text='Remover ponto'
                  onPress={() => confirmacaoRemoverPonto()}
                  style={styles.botaoExcluir}
                />
              </MotiView>
            </View>

          </View>
        </View>
        <View style={styles.viewInformacoesPartida}>
          <View >
            <Text style={styles.textBold}>Pontos para vencer: {pontosMaximo}</Text>
            <Text style={[styles.textBold, styles.textHistorico]}>Histórico vitórias:</Text>
            {historicoVencedor.map((index, posicao) => {
              return (
                <View >
                  <Text style={styles.textRodadas}>{posicao + 1}ª rodada: {index.nome}  </Text>
                </View>
              )
            })}
          </View>
          {
            vencedor
              ?
              <View>
                <Text style={styles.textVencedor}>Vencedor atual: <Text style={styles.textVencedor}>{vencedor}</Text></Text>
                <View >
                  <View style={styles.viewBotoesRecomecar}>
                    <Button
                      style={styles.botao}
                      onPress={() => recomecaPartida()}
                      text='Recomeçar está partida' />
                    <Button
                      style={styles.botao}
                      onPress={() => navigation.replace('Nova Partida')}
                      text='Criar outra' />
                  </View>
                </View>
              </View>
              :
              null
          }
        </View>
      </ScrollView>

      <SnackbarComponent
        onDismissSnackBar={() => setSnackbarVisible(false)}
        visible={snackbarVisible}
        text='Este valor é padrão, impossível removê-lo'
      />
    </>
  )
}


export default PartidaEmAndamento