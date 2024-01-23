import React from 'react';

import {useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, DevicesList, Text} from '../components';
import {useNavigation} from '@react-navigation/core';
const Home = () => {
  const {t} = useTranslation();
  const {assets, sizes} = useTheme();
  const navigation = useNavigation();
  return (
    <Block white>
      <Block flex={1}>
        <Block flex={0}>
          <Text bold h3 align="center">
            {t('screens.signup')}
          </Text>
        </Block>
        {/* search input */}
        <Block flex={0} padding={sizes.padding} marginBottom={sizes.m}>
          <Input label={t('common.name')} placeholder={t('common.search')} />
        </Block>
        <DevicesList />
      </Block>
      <Block flex={0} margin={sizes.sm}>
        <Button
          row
          primary
          paddingVertical={sizes.sm}
          paddingHorizontal={sizes.m}
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'Home',
            })
          }>
          <Text white bold h5 marginRight={sizes.xs}>
            {t('menu.started')}
          </Text>
          <Image source={assets.arrow_right} />
        </Button>
      </Block>
    </Block>
  );
};

export default Home;
