import React from 'react'
import { Chip } from 'react-native-paper';
import { Dimensions, StyleSheet, Text } from 'react-native'
const ChipComponent = ({ icone, text, onPress, selected }) => (
  <Chip style={styles.body}
    selected={selected}
    icon={icone}
    onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </Chip>
);

const styles = StyleSheet.create({

  body:
  {
    marginRight: 10
  },
  text: 
  {
    fontSize: 15
  },
})

export default ChipComponent;
