import React from 'react';
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/core';
import {DrawerActions} from '@react-navigation/native';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';

import Image from '../components/Image';
import Text from '../components/Text';
import useTheme from '../hooks/useTheme';
import Button from '../components/Button';

export default () => {
  const navigation = useNavigation();
  const {icons, colors, sizes, assets} = useTheme();

  const menu = {
    headerStyle: {elevation: 0},
    headerTitleAlign: 'left',
    headerTitleContainerStyle: {marginLeft: -sizes.sm},
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {paddingRight: sizes.s},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({children}: StackHeaderTitleProps) => (
      <Text h4>{children}</Text>
    ),
    headerLeft: () => (
      <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Image source={icons.menu} radius={0} color={colors.icon} />
      </Button>
    ),
    headerRight: () => null,
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    opening: {
      headerTransparent: true,
      headerTitle: () => null,
      headerRight: () => null,
      headerLeft: () => null,
    },
    back: {
      ...menu,
      headerTitle: () => null,
      headerRight: () => null,
      headerLeft: () => (
        <Button
          row
          gray
          paddingVertical={sizes.s}
          paddingHorizontal={sizes.sm}
          margin={sizes.s}>
          <Image source={assets.arrow_left} />
        </Button>
      ),
    }
  };

  return options;
};
