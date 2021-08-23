import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({

  scroll: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  botao: {
    flex: 1,
    borderRadius: 10,
  },
  viewBotoes: {
    flex: 1,
    paddingHorizontal: 20,
    height: Dimensions.get('window').height * 0.15
  },

})
export { styles }