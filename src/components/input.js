import { TextInput, View, StyleSheet } from 'react-native'
import React from 'react'
import Cores from "../assets/cores.json";

const Input = ({ style, keyboardType, placeholder, label, onChangeText, value, error, touched }) => {
    const validationColor = !touched ? '#223e4b' : error ? '#FF5A5F' : '#223e4b';

    const inputStyles = StyleSheet.create({
        input: {
            borderBottomWidth: 1,
            borderColor: validationColor ? validationColor : Cores.preto,
        },
    })

    return (
        <View>
            <TextInput
                style={[inputStyles.input, style]}
                placeholderTextColor={validationColor ? validationColor : Cores.preto}
                keyboardType={keyboardType}
                placeholder={placeholder}
                label={label}
                onChangeText={onChangeText}
                value={value}
            />
        </View>
    )

}

export default Input


