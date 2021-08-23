import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,

  },
  viewPontos: {
    paddingTop: 30,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around'
  },
  viewPontosTotal: {
    width: Dimensions.get('window').width * 0.35,
    paddingTop: 15,
    justifyContent: 'flex-start'
  },
  viewIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textTotal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  botao: {
    width: Dimensions.get('window').width * 0.15,
    height: 50
  },
  botaoExcluir: {
    backgroundColor: 'red',
    width: Dimensions.get('window').width * 0.15,
    height: 50,
  },
  divider: {
    backgroundColor: 'black',
  },
  image: {
    height: 50,
    width: 50
  },
})
export { styles }