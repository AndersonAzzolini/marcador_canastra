import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 15
  },
  viewBotoes: {
    paddingVertical: Dimensions.get('window').height * 0.02,
    flex: 0.8,
    justifyContent: 'space-evenly',
    alignContent: 'center',

  },
  viewLogo: {
    flex: 1.2,
    justifyContent: 'center',
    alignItems: 'center',
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