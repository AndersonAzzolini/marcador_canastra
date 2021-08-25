import { StyleSheet } from 'react-native'
import Cores from '../../assets/cores.json'

const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,

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
  textActivityIndicator: {
    fontSize: 18
  },
  ActivityIndicator: {
    color: Cores.verde,
    marginTop: 25
  },
})
export { styles }