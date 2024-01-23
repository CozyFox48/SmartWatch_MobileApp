import React from 'react';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text, Footer} from '../components/';

const screenWidth = Dimensions.get('window').width;

const Pro = () => {
  const {t} = useTranslation();
  const {assets, sizes} = useTheme();
  const navigation = useNavigation();

  return (
    <Image
      background
      width={screenWidth}
      source={assets.background_opening}
      resizeMode={'contain'}
      style={{flex: 1, justifyContent: 'center'}}>
      <Block
        flex={1}
        padding={sizes.sm}
        marginBottom={sizes.sm}
        justify="center"
        align="center">
        <Block flex={1} marginTop={sizes.xxl}>
          <Text bold h3 align="center">
            {t('opening.welcome_to')} {t('app.product_name')}
          </Text>
          <Text h5 align="center">
            {t('opening.ads')}
          </Text>
        </Block>

        <Button
          row
          primary
          paddingVertical={sizes.sm}
          paddingHorizontal={sizes.m}
          onPress={() =>
            navigation.navigate('Screens', {
              screen: 'SignUp',
            })
          }>
          <Text white bold h5 marginRight={sizes.xs}>
            {t('menu.started')}
          </Text>
          <Image source={assets.arrow_right} />
        </Button>
      </Block>

      <Footer />
    </Image>
  );
};

export default Pro;
