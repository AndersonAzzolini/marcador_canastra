import { Text, TouchableOpacity, Image, StyleSheet, View, Dimensions } from 'react-native'
import React, { useState } from 'react'
import Cores from "../assets/cores.json";



const Button = (props) => {
  return (<TouchableOpacity
    disabled={props.disabled}
    activeOpacity={.5}
    style={[buttonStyles.btn, props.style, props.disabled && buttonStyles.btnDisabled]}
    onPress={props.onPress}>
    {
      props.textData ?
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={buttonStyles.viewNomePartida}>
            <Text style={props.styleText}>{props.text}</Text>
          </View>

          <View style={buttonStyles.viewDadosPartida}>
            <Text style={buttonStyles.textDadosPartidas}>Equipes: {props.textNomeEquipes}</Text>
            <Text style={buttonStyles.textDadosPartidas}> Criado: {props.textData}</Text>
          </View>
        </View>
        :
        <Text style={[buttonStyles.text, props.styleText]}>{props.text} </Text>
    }


  </TouchableOpacity>)
}

const buttonStyles = StyleSheet.create({
  btnDisabled: {
    opacity: 0.5
  },
  viewDadosPartida: {
    flex: 1.15,
    minHeight: 75,
    justifyContent: 'space-evenly'
  },
  viewNomePartida: {
    flex: 0.85,
    justifyContent: 'center'
  },
  btn: {
    borderRadius: 10,
    maxWidth: Dimensions.get('screen').width,
    minHeight: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    backgroundColor: Cores.verde,
    shadowColor: Cores.preto,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },

  text: {
    color: Cores.preto,
    fontSize: 15,
  },
  textDadosPartidas: {
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: "300",
    textAlign: 'right',
    paddingRight: 10
  },
})


export default Button


