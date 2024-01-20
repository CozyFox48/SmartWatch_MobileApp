import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

import {useTheme, useTranslation} from '../hooks';
import {Block, Image, Text, Footer} from '../components';

const Splash = () => {
  const {t} = useTranslation();
  const {assets, sizes} = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

  return (
    <Block white safe>
      <Block
        flex={1}
        padding={sizes.sm}
        marginBottom={sizes.sm}
        justify="center">
        <Block row flex={0} justify="space-evenly" marginVertical={sizes.s}>
          <Image source={assets.logo} style={{height: 56, width: 56}} />
        </Block>
        <Block row flex={0} justify="space-evenly" marginVertical={sizes.s}>
          <Text h3>{t('app.product_name')}</Text>
        </Block>
      </Block>
      <Footer />
    </Block>
  );
};

export default Splash;
