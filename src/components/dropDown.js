import RNPickerSelect from 'react-native-picker-select';
import React from 'react'
import Cores from '../assets/cores.json'


const Dropdown = ({onValueChange, items}) => {
  return (

    <RNPickerSelect
      onValueChange={onValueChange}
      items={items}
      useNativeAndroidPickerStyle={false}

      placeholder={{
        label: 'Selecione o processo',

      }}

      style={{
        inputAndroid: {
          textAlign: "center",
          fontSize: 16,
          borderRadius: 8,
          color: Cores.branco,
          fontWeight: 'bold',
        },
        placeholder: {
          textAlign: "center",
          color: 'white',
          fontWeight: 'bold',
        }
      }}

    />
  );

};

export default Dropdown