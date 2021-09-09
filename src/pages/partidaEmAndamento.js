import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-paper'
import { styles } from './styles/partidaEmAndamento'
import { deletaPonto, deletaTodosPontos, inserePontos } from '../db/pontos'
import Input from '../components/input'
import Button from '../components/button'
import SnackbarComponent from '../components/snackbar'
import { insereVencedorHistorico, selecionaHistorico } from '../db/partida'
import ModalComponent from '../components/modal'

const PartidaEmAndamento = ({ route, navigation }) => {
  const [pontosEquipe1, setPontosEquipe1] = useState(route.params.pontosEquipe1)
  const [pontosEquipe2, setPontosEquipe2] = useState(route.params.pontosEquipe2)
  const [historicoVencedor, setHistoricoVencedor] = useState([])
  const [totalPontosEquipe1, setTotalPontosEquipe1] = useState(0)
  const [totalPontosEquipe2, setTotalPontosEquipe2] = useState(0)
  const [inputPontosEquipe1, setInputPontosEquipe1] = useState('')
  const [inputPontosEquipe2, setInputPontosEquipe2] = useState('')
  const [vencedor, setVencedor] = useState('')
  const [perdedor, setPerdedor] = useState('')
  const [btnEquipe1, setBtnEquipe1] = useState(false)
  const [btnEquipe2, setBtnEquipe2] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
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

  const ultimaPontucao = async () => {
    try {
      if (totalPontosEquipe1 > totalPontosEquipe2) {
        setBtnEquipe1(true)
        setModalVisible(false)
      } else {
        console.log('tamo ai');
        setModalVisible(false)
        setBtnEquipe2(true)
      }
    } catch (error) {

    } finally {

    }
  }

  const comparaPontuação = () => {
    if ((totalPontosEquipe1 >= pontosMaximo) && (totalPontosEquipe1 > totalPontosEquipe2)) {
      console.log('vencedor equipe 1');
      setModalVisible(true)
      setVencedor(equipe1.nomeEquipe)
      setPerdedor(equipe2.nomeEquipe)
    } else if ((totalPontosEquipe2 >= pontosMaximo) && (totalPontosEquipe2 > totalPontosEquipe1)) {
      console.log('vencedor equipe 2');
      setModalVisible(true)
      setVencedor(equipe2.nomeEquipe)
      setPerdedor(equipe1.nomeEquipe)
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
        setInputPontosEquipe1('')
        setPontosEquipe1([...pontosEquipe1, { pontos: inputPontosEquipe1 }])
        await inserePontos(equipe1.idEquipe, inputPontosEquipe1, idPartida)
      } else if (inputPontosEquipe2 && value == 2) {
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
    } else {
      array.map((index) => {
        total = total += parseInt(index.pontos)
      })
      setTotalPontosEquipe2(total);
    }
  }

  const removeUltimoPontoEquipe = async (equipe) => {
    try {
      if (equipe == 1 && pontosEquipe1.length > 1) {
        await deletaPonto(equipe1.idEquipe)
        pontosEquipe1.pop()
        setPontosEquipe1([...pontosEquipe1])
      } else if (pontosEquipe2.length > 1 && equipe == 2) {
        await deletaPonto(equipe2.idEquipe)
        pontosEquipe2.pop()
        setPontosEquipe2([...pontosEquipe2])
      } else {
        mostrarErroRemocaoPonto()
      }
    }
    catch (error) {
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

      await Promise.all([
        inserePontos(equipe1.idEquipe, 0, idPartida),
        inserePontos(equipe2.idEquipe, 0, idPartida)])
    } else {
      await insereVencedorHistorico(idPartida, equipe2.idEquipe)
      setPontosEquipe1([{ pontos: 0 }])
      setPontosEquipe2([{ pontos: 0 }])
      setHistoricoVencedor([historicoVencedor])
      await deletaTodosPontos(idPartida)
      Promise.all([
        inserePontos(equipe1.idEquipe, 0, idPartida),
        inserePontos(equipe2.idEquipe, 0, idPartida)
      ])
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
      <ModalComponent
        onPressAdicionaUltimoPonto={ultimaPontucao}
        visible={modalVisible}
        nomeEquipeVencedora={vencedor}
        nomeEquipePerdedora={perdedor}
      />
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
                <Button
                  disabled={btnEquipe1}
                  text='Adicionar ponto'
                  onPress={() => adicionaPontoEquipe(1)}
                  style={styles.botao}
                />
                <Button
                  disabled={btnEquipe1}
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
                disabled={btnEquipe2}
                text='Adicionar ponto'
                onPress={() => adicionaPontoEquipe(2)}
                style={styles.botao}
              />
              <Button
                disabled={btnEquipe2}
                text='Remover ponto'
                onPress={() => confirmacaoRemoverPonto(2)}
                style={styles.botaoExcluir}
              />
            </View>
          </View>
        </View>
        <View style={styles.viewInformacoesPartida}>
          <View >
            {
              vencedor
                ?
                <Text style={styles.textPerdedor}>Adicione os pontos de <Text style={styles.textVencedor}>{perdedor}</Text></Text>
                :
                null
            }
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