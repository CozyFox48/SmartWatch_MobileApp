import React from 'react';
import {
  StackHeaderTitleProps,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/core';
import { StackHeaderOptions } from '@react-navigation/stack/lib/typescript/src/types';

import Text from '../components/Text';
import useTheme from '../hooks/useTheme';
import Button from '../components/Button';
import IIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Entypo';
import useDatabase from './useDatabase';

export default () => {
  const navigation = useNavigation();
  const { colors, sizes } = useTheme();

  const menu = {
    headerStyle: { elevation: 0 },
    headerTitleAlign: 'left',
    // headerTitleContainerStyle: { marginLeft: -sizes.sm },
    headerLeftContainerStyle: { paddingLeft: sizes.s },
    headerRightContainerStyle: { paddingRight: sizes.s },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({ children }: StackHeaderTitleProps) => (
      <Text h4>{children}</Text>
    ),
    headerLeft: () => null,
    // headerLeft: () => (
    //   <Button onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
    //     <Image source={icons.menu} radius={0} color={colors.icon} />
    //   </Button>
    // ),
    headerRight: () => (
      <Button onPress={() => {
        useDatabase.db_signOut();
        navigation.navigate('Screens', {
          screen: 'SignIn',
        })
      }}>
        <FIcon name={'log-out'} color={colors.primary} size={30} />
      </Button>
    ),
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
          margin={sizes.s}
          onPress={() => navigation.goBack()}>
          <IIcon name={'arrowleft'} color={colors.black} size={25} />
        </Button>
      ),
    }
  };

  return options;
};
