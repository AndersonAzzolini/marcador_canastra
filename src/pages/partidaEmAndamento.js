import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  Text,
  View,
  Pressable
} from 'react-native'
import { styles } from './styles/partidaEmAndamento'
import { deletaPonto, deletaTodosPontos, inserePontos } from '../db/pontos'
import Input from '../components/input'
import Button from '../components/button'
import SnackbarComponent from '../components/snackbar'
import { insereVencedorHistorico, selecionaHistorico } from '../db/partida'
import ModalComponent from '../components/modal'
import SetaParaCima from '../assets/img/triangulo-para-cima.png'
import SetaParaBaixo from '../assets/img/triangulo-para-baixo.png'
import ComponentePontos from '../components/partidaEmAndamento/componentePontos'
import TelaVencedores from '../components/partidaEmAndamento/telaVencedores'
import ComponenteInputEBotoes from '../components/partidaEmAndamento/botoesEinputs'

const PartidaEmAndamento = ({ route, navigation }) => {
  const [pontosEquipe1, setPontosEquipe1] = useState(route.params.pontosEquipe1)
  const [pontosEquipe2, setPontosEquipe2] = useState(route.params.pontosEquipe2)
  const [historicoVencedor, setHistoricoVencedor] = useState([])
  const [totalPontosEquipe1, setTotalPontosEquipe1] = useState(0)
  const [totalPontosEquipe2, setTotalPontosEquipe2] = useState(0)
  const [inputPontosEquipe1, setInputPontosEquipe1] = useState('')
  const [inputPontosEquipe2, setInputPontosEquipe2] = useState('')
  const [pontosVencedor, setPontosVencedor] = useState(0)
  const [pontosPerdedor, setPontosPerdedor] = useState(0)
  const [vencedor, setVencedor] = useState('')
  const [perdedor, setPerdedor] = useState('')
  const [erros, setErros] = useState('')
  const [btnEquipe1, setBtnEquipe1] = useState(false)
  const [btnEquipe2, setBtnEquipe2] = useState(false)
  const [fimPartida, setFimPartida] = useState(false)
  const [snackbarVisible, setSnackbarVisible] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [historicoVisble, setHistoricoVisible] = useState(false)
  const [ultimaPontucaoEquipeAdversaria, setUltimaPontucaoEquipeAdversaria] = useState(false)
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
    setSnackbarVisible(true)
    setErros('É necessário informar o valor do campo ')
  }

  const ultimaPontucao = async () => {
    try {
      if (!ultimaPontucaoEquipeAdversaria) {
        if (totalPontosEquipe1 > totalPontosEquipe2) {
          setUltimaPontucaoEquipeAdversaria(true)
        } else if (totalPontosEquipe2 > totalPontosEquipe1) {
          setUltimaPontucaoEquipeAdversaria(true)
        }
      } else {
        if (totalPontosEquipe2 == totalPontosEquipe1) {
          console.log('caiu empate');
          setUltimaPontucaoEquipeAdversaria(false)
          setBtnEquipe2(false)
          setBtnEquipe1(false)
        }
        else if (totalPontosEquipe1 > totalPontosEquipe2) {
          setVencedor(equipe1.nomeEquipe)
          setPerdedor(equipe2.nomeEquipe)
          setFimPartida(true)
          setPontosVencedor(totalPontosEquipe1)
          setPontosPerdedor(totalPontosEquipe2)
        } else {
          setFimPartida(true)
          setVencedor(equipe2.nomeEquipe)
          setPerdedor(equipe1.nomeEquipe)
          setPontosVencedor(totalPontosEquipe2)
          setPontosPerdedor(totalPontosEquipe1)
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setModalVisible(false)
    }
  }

  const mudaStateEZeraPontos = async () => {
    setPontosEquipe1([{ pontos: 0 }])
    setPontosEquipe2([{ pontos: 0 }])
    setHistoricoVencedor([...historicoVencedor])
    await deletaTodosPontos(idPartida)
    setBtnEquipe2(false)
    setBtnEquipe1(false)
    setUltimaPontucaoEquipeAdversaria(false)
    setFimPartida(false)
  }

  const comparaPontuação = () => {
    if ((totalPontosEquipe1 >= pontosMaximo) && (totalPontosEquipe1 > totalPontosEquipe2) && (!ultimaPontucaoEquipeAdversaria)) {
      setModalVisible(true)
      setBtnEquipe1(true)
      setVencedor(equipe1.nomeEquipe)
      setPerdedor(equipe2.nomeEquipe)
    } else if ((totalPontosEquipe2 >= pontosMaximo) && (totalPontosEquipe2 > totalPontosEquipe1) && (!ultimaPontucaoEquipeAdversaria)) {
      setModalVisible(true)
      setBtnEquipe2(true)
      setVencedor(equipe2.nomeEquipe)
      setPerdedor(equipe1.nomeEquipe)
    } else {
      ultimaPontucaoEquipeAdversaria && ultimaPontucao()
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
    setErros('Este valor é padrão, impossível remove-lo')
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
    try {
      if (totalPontosEquipe1 > totalPontosEquipe2) {
        await insereVencedorHistorico(idPartida, equipe1.idEquipe)
        await mudaStateEZeraPontos()
        await Promise.all([
          inserePontos(equipe1.idEquipe, 0, idPartida),
          inserePontos(equipe2.idEquipe, 0, idPartida)])
      } else {
        await insereVencedorHistorico(idPartida, equipe2.idEquipe)
        await mudaStateEZeraPontos()
        Promise.all([
          inserePontos(equipe1.idEquipe, 0, idPartida),
          inserePontos(equipe2.idEquipe, 0, idPartida)
        ])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setModalVisible(false)
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

  const criarNovaPartida = async () => {
    confirmacaoRecomecarPartida()
    navigation.replace('Nova Partida')
  }

  return (
    <>
      <ModalComponent
        onPressAdicionaUltimoPonto={ultimaPontucao}
        visible={modalVisible}
        nomeEquipeVencedora={vencedor}
        nomeEquipePerdedora={perdedor}
        onPressVitoria={recomecaPartida}
      />
      {
        !fimPartida ?
          <ScrollView contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps='handled'
          >
            <View >
              {
                ultimaPontucaoEquipeAdversaria && !fimPartida &&
                <Text style={styles.textPerdedor}>Adicione os pontos de {perdedor}</Text>
              }
            </View>
            <ComponentePontos
              arrayPontosEquipe1={pontosEquipe1}
              arrayPontosEquipe2={pontosEquipe2}
              nomeEquipe1={equipe1.nomeEquipe}
              nomeEquipe2={equipe2.nomeEquipe}
              totalPontosEquipe1={totalPontosEquipe1}
              totalPontosEquipe2={totalPontosEquipe2}
            />
            <ComponenteInputEBotoes
              disableBtn1={btnEquipe1}
              disableBtn2={btnEquipe2}
              btnAddPontosEquipe1={() => adicionaPontoEquipe(1)}
              btnAddPontosEquipe2={() => adicionaPontoEquipe(2)}
              inputPontosEquipe1={inputPontosEquipe1}
              inputPontosEquipe2={inputPontosEquipe2}
              btnRemovePontosEquipe1={() => confirmacaoRemoverPonto(1)}
              btnRemovePontosEquipe2={() => confirmacaoRemoverPonto(2)}
              onChangeText1={text => setInputPontosEquipe1(text)}
              onChangeText2={text => setInputPontosEquipe2(text)}
            />
            <View style={styles.viewInformacoesPartida}>
              <View >
                <Text style={styles.textBold}>Pontos para vencer: {pontosMaximo}</Text>
                <Pressable
                  onPress={() => setHistoricoVisible(!historicoVisble)}>
                  <Text style={[styles.textBold, styles.textHistorico]}>Histórico vitórias <Image source={historicoVisble ? SetaParaBaixo : SetaParaCima} /></Text>
                </Pressable>
                {
                  historicoVisble ?
                    historicoVencedor.length > 0 ?
                      historicoVencedor.map((index, posicao) => {
                        return (
                          <View
                            key={posicao}>
                            <Text style={styles.textRodadas}>{posicao + 1}ª rodada: {index.nome}  </Text>
                          </View>
                        )
                      })
                      :
                      <View >
                        <Text style={styles.textRodadas}>Nenhuma partida finalizada </Text>
                      </View>
                    :
                    null
                }
              </View>
            </View>
          </ScrollView>
          :
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps='handled'
          >
            <TelaVencedores
              vencedor={vencedor}
              perdedor={perdedor}
              pontosVencedor={pontosVencedor}
              pontosPerdedor={pontosPerdedor}
              btnRecomecarPartida={() => confirmacaoRecomecarPartida()}
              btnNovaPartida={() => criarNovaPartida()}
            />
          </ScrollView>
      }
      <SnackbarComponent
        onDismissSnackBar={() => setSnackbarVisible(false)}
        visible={snackbarVisible}
        text={erros}
      />
    </>
  )
}


export default PartidaEmAndamento