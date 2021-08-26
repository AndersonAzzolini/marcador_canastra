import { StyleSheet } from 'react-native'
import Cores from '../../assets/cores.json'

const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15

  },
  botao: {
    borderRadius: 10,
  },
  viewSemPartida: {
    alignContent: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  viewBotaoSemPartida: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 25,
  },
  text: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 25
  },
  textButton: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight:'bold'
  },
  text2: {
    textAlign: 'center',
    fontSize: 23,
    marginTop: 25
  },
  textActivityIndicator: {
    fontSize: 18
  },
  ActivityIndicator: {
    color: Cores.verde,
    marginTop: 25
  },
  btn: {
    flex: 1
  },
})
export { styles }