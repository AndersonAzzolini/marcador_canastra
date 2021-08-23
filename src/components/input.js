import { TextInput, View, StyleSheet } from 'react-native'
import React from 'react'
import Cores from "../assets/cores.json";

const Input = ({ placeholderTextColor, style, refInput, ...props }) => {

    return (
        <View>
            <TextInput
                style={[inputStyles.input, style]}
                placeholderTextColor={placeholderTextColor ? placeholderTextColor : Cores.preto}
                keyboardType={props.keyboardType}
                {...props}
            />
        </View>
    )
}

const inputStyles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        marginBottom: 8,
        color: Cores.preto,

    },
})

export default Input


