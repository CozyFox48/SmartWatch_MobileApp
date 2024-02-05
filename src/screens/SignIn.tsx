import React, { useState } from 'react';
import { useTheme, useTranslation, useNotify, useDatabase } from '../hooks';
import { Block, Button, Input, Text } from '../components';
import { useNavigation } from '@react-navigation/core';

const Home = () => {
  const { t } = useTranslation();
  const { sizes } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { notify_fail, notify_success } = useNotify();

  return (
    <Block white paddingHorizontal={sizes.padding}>
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
          textContentType='password'
          value={password}
          marginTop={sizes.s}
          onChangeText={(text) => {
            setPassword(text)
          }
          }
        />
      </Block>
      <Block row justify='center' flex={0} align='center'>
        <Text p marginRight={sizes.s}>
          {t('signin.need_account')}
        </Text>
        <Button onPress={() => navigation.navigate('Screens', {
          screen: 'SignUp',
        })}><Text primary h5>{t('screens.signup')}</Text></Button>
      </Block>
      <Block flex={1} margin={sizes.sm} justify='flex-end'>
        <Button
          row
          primary
          paddingHorizontal={sizes.m}
          onPress={async () => {
            const result = await useDatabase.db_signin(email, password);
            if (result) {
              notify_success(t("signin.signin_success"));
              navigation.navigate('Screens', {
                screen: 'Home',
              })
            } else {
              notify_fail(t("signin.signin_fail"));
            }
          }}>
          <Text white bold h5>
            {t('screens.signin')}
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Home;