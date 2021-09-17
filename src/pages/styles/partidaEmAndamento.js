import { Dimensions, StyleSheet } from 'react-native'
import Cores from '../../assets/cores.json'
const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  viewInformacoesPartida: {
    flex: 1,
    marginTop: 50,
    minHeight: Dimensions.get('window').height * 0.25,
  },
  textPerdedor: {
    color: '#FA5A46',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16
  },
 
  textHistorico: {
    marginTop: 10,
    textAlign: 'left'
  },
  textRodadas: {
    textAlign: 'left',
    marginTop: 5
  },
})
export { styles }