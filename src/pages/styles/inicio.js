import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingHorizontal: 15
  },

  viewBotoes: {
    flex: 1,
    justifyContent:'space-evenly',
    alignContent:'center',
  },
  viewLogo: {
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center'
  },

  text:{
    fontSize: 22
  },


})
export { styles }