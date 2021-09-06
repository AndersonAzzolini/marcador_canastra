import React from 'react';
import { Text } from 'react-native';
import { Banner } from 'react-native-paper';

const BannerComponent = ({onPressConfirmar, onPressCancelar, labelTextoCancelar, text, visible}) => {

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: labelTextoCancelar,
          onPress: onPressCancelar
        },
        {
          label: 'ok',
          onPress: onPressConfirmar,
        },
      ]}
      icon={() => (
        <Text>
         {text}
        </Text>
      )}>

    </Banner>
  );
};

export default BannerComponent;
