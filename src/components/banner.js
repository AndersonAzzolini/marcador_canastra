import React from 'react';
import { Text } from 'react-native';
import { Banner } from 'react-native-paper';

const BannerComponent = (props) => {

  return (
    <Banner
      visible={props.visible}
      actions={[
        {
          label: props.labelTextoCancelar,
          onPress: props.onPressCancelar
        },
        {
          label: 'ok',
          onPress: props.onPressConfirmar,
        },
      ]}
      icon={() => (
        <Text>
         {props.text}
        </Text>
      )}>

    </Banner>
  );
};

export default BannerComponent;
