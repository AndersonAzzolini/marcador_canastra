import { Text, View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Cores from "../assets/cores.json";
import { Snackbar } from 'react-native-paper';

const SnackbarComponent = ({ ...props }) => {

  return (
    <View style={styles.container}>
      <Snackbar
        style={styles.snackBar}
        duration={25000}
        visible={props.visible}
        onDismiss={props.onDismissSnackBar}
        action={props.action ? {
          label: 'Undo',
          onPress: () => {
            props.onPress
          },
        } : null}>
        <Text style={styles.text}>{props.text}</Text>
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    backgroundColor: 'red'
  },
  text: {
    color: Cores.preto,
    fontSize:Dimensions.get('window').width * 0.04
  },
  snackBar: {
    backgroundColor: Cores.cinzaEscuro
  }
})

export default SnackbarComponent


