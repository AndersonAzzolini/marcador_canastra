import React, { useState } from 'react';
import { Text } from 'react-native';
import { Banner } from 'react-native-paper';

const BannerComponent = () => {
  const [visible, setVisible] = useState(true);

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Fix it',
          onPress: () => setVisible(false),
        },
        {
          label: 'Learn more',
          onPress: () => setVisible(false),
        },
      ]}
      icon={() => (
        <Text>
          A partida é salva automaticamente, não se preocupe com isso :)

        </Text>
      )}>

    </Banner>
  );
};

export default BannerComponent;
