import { Text, View, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import Cores from "../assets/cores.json";
import { Snackbar } from 'react-native-paper';

const SnackbarComponent = ({ visible, style, onDismissSnackBar, action, onPress, text }) => {

  return (
    <View style={styles.container}>
      <Snackbar

        style={[styles.snackBar, style]}
        duration={2500}
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={action ? {
          label: 'Undo',
          onPress: () => {
            onPress
          },
        } : null}>
        <Text style={styles.text}>{text}</Text>
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
    fontSize: Dimensions.get('window').width * 0.04
  },
  snackBar: {
    backgroundColor: Cores.cinzaEscuro
  }
})

export default SnackbarComponent


