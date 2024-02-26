import React, { useState } from 'react';
import { useTheme, useTranslation, useNotify, useDatabase, useData } from '../hooks';
import { Block, Button, Input, Text, Image } from '../components';
import { useNavigation } from '@react-navigation/core';

const Home = () => {
  const { t } = useTranslation();
  const { sizes } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { notify_fail, notify_success } = useNotify();
  const { handleDevices, setAlerts, handleUserData } = useData();

  return (
    <Block white paddingHorizontal={sizes.padding}>
      {loading ?
        <Block justify='center' align='center'>
          <Image
            source={require('./../assets/images/loading.gif')}
          />
        </Block>
        :
        <>
          <Block flex={0}>
            <Text bold h3 align="center">
              {t('screens.signin')}
            </Text>
          </Block>
          <Block flex={0}>
            <Input
              label={t('common.email')}
              placeholder={t('common.input_here')}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              label={t('common.password')}
              placeholder={t('common.input_here')}
              secureTextEntry={true}
              value={password}
              marginTop={sizes.s}
              onChangeText={(text) => {
                setPassword(text)
              }}
            />
          </Block>
          <Block row justify='center' flex={0} align='center'>
            <Text p marginRight={sizes.s}>
              {t('signin.need_account')}
            </Text>
            <Button onPress={() => navigation.navigate('Screens', {
              screen: 'SignUp',
            })}>
              <Text primary h5>{t('screens.signup')}</Text>
            </Button>
          </Block>
          <Block flex={1} margin={sizes.sm} justify='flex-end'>
            <Button
              row
              primary
              paddingHorizontal={sizes.m}
              onPress={async () => {
                setLoading(true);
                const result = await useDatabase.db_signin(email, password);
                if (result) {
                  notify_success(t("signin.signin_success"));
                  const devicesList = await useDatabase.get_devices();
                  handleDevices(devicesList);
                  navigation.navigate('Screens', {
                    screen: 'Home',
                  });
                  const alerts = await useDatabase.get_alerts();
                  console.log("alerts", alerts);
                  setAlerts(alerts);
                  const tempUserData = await useDatabase.get_user_data();
                  handleUserData(tempUserData);
                } else {
                  notify_fail(t("signin.signin_fail"));
                }
                setLoading(false);
              }}>
              <Text white bold h5>
                {t('screens.signin')}
              </Text>
            </Button>
          </Block>
        </>
      }
    </Block >
  );
};

export default Home;