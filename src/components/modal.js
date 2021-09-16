import { Text, View, StyleSheet, Modal, Dimensions } from 'react-native'
import React from 'react'
import Cores from "../assets/cores.json";
import Button from './button'

const ModalComponent = ({ visible, nomeEquipeVencedora, nomeEquipePerdedora, onPressAdicionaUltimoPonto, onPressVitoria }) => {
  return (
    <Modal visible={visible}
      transparent
    >
      <View style={styles.container}>
        <View style={styles.viewTitulo}>
          <Text style={styles.text}>Temos um vencedor ?</Text>
          <Text style={styles.textVencedor}>{nomeEquipeVencedora}</Text>
        </View>
        <View style={styles.viewTitulo}>
          <Button
            style={[styles.button, styles.buttonAdicionaPontoEquipe]}
            text={`Adicionar pontos de ${nomeEquipePerdedora}`}
            onPress={onPressAdicionaUltimoPonto} />
          <Button
            style={styles.button}
            text='Atribuir vitória e recomeçar partida'
            onPress={onPressVitoria} />
        </View>

      </View>
    </Modal >
  )
}

const styles = StyleSheet.create({
  container: {
    padding:30,
    flex: 1,
    justifyContent: "center",
    backgroundColor: Cores.fundoLoader,
  },
  text: {
    color: Cores.branco,
    fontSize: 30,
    marginTop: 20,
    textAlign:'center'
  },
  textVencedor: {
    fontSize: Dimensions.get("window").width * 0.075,
    color: Cores.verdeEscuro,
    textAlign: 'center',
    marginTop: 25
  },
  viewTitulo: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    minWidth: Dimensions.get('screen').width * 0.9
  },
  buttonAdicionaPontoEquipe: {
    backgroundColor: '#538EF5'
  },
})

export default ModalComponent


