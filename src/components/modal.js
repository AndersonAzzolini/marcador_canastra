import { Text, View, StyleSheet, Modal, Dimensions } from 'react-native'
import React from 'react'
import Cores from "../assets/cores.json";
import { MotiView } from 'moti';
import Button from './button'
import 'react-native-reanimated'

const ModalComponent = (props) => {
  return (
    <Modal visible={props.visible}
      transparent
    >
      <View style={styles.container}>
        <MotiView style={styles.viewTitulo}>
          <Text style={styles.text}>Parece que temos um vencedor</Text>
          <Text style={styles.textVencedor}>{props.nomeEquipeVencedora}</Text>
        </MotiView>
        <MotiView style={styles.viewTitulo}>
          <Button
            style={[styles.button, styles.buttonAdicionaPontoEquipe]}
            text={`Adicionar pontos de ${props.nomeEquipePerdedora}`}
            onPress={props.onPressAdicionaUltimoPonto} />
          <Button
            style={styles.button}
            text='Atribuir vitória'
            onPress={props.onPress} />
        </MotiView>

      </View>
    </Modal >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.fundoLoader,
  },
  text: {
    color: Cores.branco,
    fontSize: Dimensions.get("window").width * 0.05,
    marginTop: 20,
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


