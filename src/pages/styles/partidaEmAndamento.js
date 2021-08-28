import { Dimensions, StyleSheet } from 'react-native'
import Cores from '../../assets/cores.json'
const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
  },
  viewPontos: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  viewPontosTotal: {
    maxWidth: Dimensions.get('window').width * 0.4,
    paddingTop: 15,
    justifyContent: 'flex-start'
  },
  viewIcons: {
    marginTop: 15,
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textEquipes: {
    maxWidth: Dimensions.get('window').width * 0.4,
    marginBottom: 15
  },
  textTotal: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#36D948'
  },
  textVencedor: {
    color: Cores.verdeEscuro,
    fontSize: 25,
    fontWeight: 'bold'
  },
  botao: {
    borderRadius: 10,
    minHeight: 50,
  },
  botaoExcluir: {
    backgroundColor: '#FA5A46',
    minHeight: 50,
  },
  divider: {
    backgroundColor: 'black',
  },
  image: {
    height: 50,
    width: 50,
  },
  input: {
    marginTop: 25,
  },
})
export { styles }