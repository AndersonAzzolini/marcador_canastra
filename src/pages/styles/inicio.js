import { Dimensions, StyleSheet } from 'react-native'
import Cores from '../../assets/cores.json'
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  viewBotoes: {
    paddingVertical: Dimensions.get('window').height * 0.02,
    flex: 0.8,
    justifyContent: 'space-evenly',
    alignContent: 'center',
  },
  viewLogo: {
    maxWidth: Dimensions.get('screen').width,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 400
  },
  image: {
    maxWidth: Dimensions.get('screen').width,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 22
  },

})
export { styles }