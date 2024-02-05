import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Home,
  Opening,
  SignUp,
  DeviceDetail,
  AlertHistory,
  Setting,
  History,
  SignIn,
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      <Stack.Screen
        name="Opening"
        component={Opening}
        options={screenOptions.opening}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={{title: t('navigation.history')}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{title: t('navigation.setting')}}
      />
      <Stack.Screen
        name="AlertHistory"
        component={AlertHistory}
        options={{title: t('navigation.alert')}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={screenOptions.back}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={screenOptions.back}
      />
      <Stack.Screen
        name="DeviceDetail"
        component={DeviceDetail}
        options={screenOptions.back}
      />
    </Stack.Navigator>
  );
};
