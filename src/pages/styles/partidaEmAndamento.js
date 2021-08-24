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
    marginTop: 15,
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textEquipes:{
    marginBottom:15
  },
  textTotal: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#36D948'
  },
  botao: {
    borderRadius: 10,
    height: 50,
  },
  botaoExcluir: {
    backgroundColor: '#FA5A46',
    height: 50,
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