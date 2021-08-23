import { Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Cores from "../assets/cores.json";



const Button = (props) => {
  return (<TouchableOpacity
    disabled={props.disabled}
    activeOpacity={.5}
    style={[buttonStyles.btn, props.style, props.disabled && buttonStyles.btnDisabled]}
    onPress={props.onPress}>
    {props.image &&
      <Image style={buttonStyles.btnIcon}
        source={props.image}
      />
    }
    <Text style={[buttonStyles.text, props.styleText]}>{props.text}</Text>
  </TouchableOpacity>)
}

const buttonStyles = StyleSheet.create({
  btnDisabled: {
    opacity: 0.5
  },
  btnIcon: {
    marginRight: 15,
    width: 25,
    height: 25,
  },
  btn: {
    height: 75,
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
})


export default Button


