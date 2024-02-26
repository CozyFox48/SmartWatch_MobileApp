import React, { useEffect } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useTheme, useTranslation, useDatabase } from '../hooks/';
import { Block, Button, Image, Text, Footer } from '../components/';
import IIcon from 'react-native-vector-icons/AntDesign';
const screenWidth = Dimensions.get('window').width;

const Pro = () => {
  const { t } = useTranslation();
  const { assets, sizes, colors } = useTheme();
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      const devices = await useDatabase.get_devices();
      if (devices.length > 0) {
        navigation.navigate('Screens', {
          screen: 'Home',
        })
      }
    };

    fetchData();
  }, []);

  return (
    <Image
      background
      width={screenWidth}
      source={assets.background_opening}
      resizeMode={'contain'}
      style={{ flex: 1, justifyContent: 'center' }}>
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
              screen: 'SignIn',
            })
          }>
          <Text white bold h5 marginRight={sizes.xs}>
            {t('menu.started')}
          </Text>
          <IIcon name={'arrowright'} color={colors.white} size={25} />
        </Button>
      </Block>

      <Footer />
    </Image>
  );
};

export default Pro;
