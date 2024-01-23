import React from 'react';

import Block from './Block';
import Button from './Button';
import Text from './Text';
import {useNavigation} from '@react-navigation/core';
import {useTheme, useTranslation} from '../hooks';
import FIcon from 'react-native-vector-icons/Feather';

const Article = () => {
  const {t} = useTranslation();
  const {colors, gradients, icons, sizes} = useTheme();
  const navigation = useNavigation();
  const linkData = [
    {
      name: t('screens.home'),
      link: 'Home',
      icon: 'home',
    },
    {
      name: t('screens.alert'),
      link: 'AlertHistory',
      icon: 'bell',
    },
    {
      name: t('screens.history'),
      link: 'History',
      icon: 'menu',
    },
    {
      name: t('screens.setting'),
      link: 'Setting',
      icon: 'settings',
    },
  ];

  const LinkButton = ({data}) => {
    return (
      <Button
        onPress={() =>
          navigation.navigate('Screens', {
            screen: data.link,
          })
        }>
        <FIcon name={data.icon} color={colors.text} size={30} />
        <Text bold>{data.name}</Text>
      </Button>
    );
  };

  // render card for Popular
  return (
    <Block
      flex={0}
      card
      row
      justify="space-evenly"
      radius={sizes.xxl}
      marginHorizontal={sizes.sm}>
      {linkData.map((each) => (
        <LinkButton data={each} key={each.link} />
      ))}
    </Block>
  );
};

export default Article;
