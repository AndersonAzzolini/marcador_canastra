import { Text, TouchableOpacity, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import Cores from "../assets/cores.json";



const Button = ({ disabled, style, styleText, text, textData, textNomeEquipes, onPress }) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={.5}
      style={[buttonStyles.btn, style, disabled && buttonStyles.btnDisabled]}
      onPress={onPress}>

      {
        textData ?
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={buttonStyles.viewNomePartida}>
              <Text style={styleText}>{text}</Text>
            </View>

            <View style={buttonStyles.viewDadosPartida}>
              <Text style={buttonStyles.textDadosPartidas}>Equipes: {textNomeEquipes}</Text>
              <Text style={buttonStyles.textDadosPartidas}> Criado: {textData}</Text>
            </View>
          </View>
          :
          <Text style={[buttonStyles.text, styleText]}>{text} </Text>
      }

    </TouchableOpacity>)
}

const buttonStyles = StyleSheet.create({
  btnDisabled: {
    opacity: 0.5
  },
  viewDadosPartida: {
    flex: 1,
    minHeight: 75,
    justifyContent: 'space-evenly'
  },
  viewNomePartida: {
    flex: 1,
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
    paddingRight: 10,
  },
})


export default Button


