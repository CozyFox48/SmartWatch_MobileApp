import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  Articles,
  Components,
  Home1,
  Home,
  Profile,
  Register,
  // Pro,
  Splash,
  Opening,
  SignUp,
  DeviceDetail,
  AlertHistory,
  Setting,
} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
  const {t} = useTranslation();
  const screenOptions = useScreenOptions();

  return (
    <Stack.Navigator screenOptions={screenOptions.stack}>
      {/* <Stack.Screen
        name="Setting"
        component={Setting}
        options={{title: t('navigation.home')}}
      /> */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: t('navigation.home')}}
      />
      <Stack.Screen
        name="AlertHistory"
        component={AlertHistory}
        options={{title: t('common.signup')}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{title: t('common.signup')}}
      />
      <Stack.Screen
        name="DeviceDetail"
        component={DeviceDetail}
        options={{title: t('common.signup')}}
      />
      <Stack.Screen
        name="Opening"
        component={Opening}
        options={screenOptions.pro}
      />

      <Stack.Screen
        name="Splash"
        component={Splash}
        options={screenOptions.pro}
      />
      <Stack.Screen
        name="Home1"
        component={Home1}
        options={{title: t('navigation.home')}}
      />

      <Stack.Screen
        name="Components"
        component={Components}
        options={screenOptions.components}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{title: t('navigation.articles')}}
      />

      {/* <Stack.Screen name="Pro" component={Pro} options={screenOptions.pro} /> */}

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
