import { Text, View, StyleSheet, Modal, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import Cores from "../assets/cores.json";

const Loader = (props) => {
  return (
    <Modal visible={props.visible}
      transparent
    >
      <View style={styles.container}>
        <ActivityIndicator
          animating={true}
          size={150}
          color={Cores.verde}
        />
        <Text style={styles.text}>{props.text ? props.text : ""}</Text>
      </View>
    </Modal >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Cores.fundoLoader,
  },
  text: {
    color: Cores.branco,
    fontSize: Dimensions.get("window").width * 0.04,
    marginTop: 20
  },
})

export default Loader


