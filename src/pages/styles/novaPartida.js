import { StyleSheet } from 'react-native'
import Cores from '../../assets/cores.json'
const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  botao: {
    flex: 1,
    borderRadius: 10,
  },
  input: {
    paddingVertical: 25
  },
  viewInputs: {
    alignContent: 'center',
    paddingVertical: 5
  },
  viewBotoes: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 30
  },
  textBold: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  textErros: {
    paddingLeft: 5,
    color: Cores.vermelho
  },

})
export { styles }