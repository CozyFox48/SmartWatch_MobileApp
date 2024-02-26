import React, { useState } from 'react';
import { useTheme, useTranslation, useNotify, useDatabase } from '../hooks';
import { Block, Button, Input, Text } from '../components';
import { useNavigation } from '@react-navigation/core';
import { reg_email, reg_password } from '../constants/regex';

const Home = () => {
  const { t } = useTranslation();
  const { sizes } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [isStrong, setIsStrong] = useState(false);
  const navigation = useNavigation();
  const { notify_fail, notify_success } = useNotify();

  return (
    <Block white  paddingHorizontal={sizes.padding}>
      <Block flex={0}>
        <Text bold h3 align="center">
          {t('screens.signup')}
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
            if (!reg_password.test(text)) {
              setIsStrong(false);
            } else {
              setIsStrong(true);
            }
            setPassword(text)
          }
          }
        />
        {!isStrong ? <Text center primary p>
          {t('signup.password_des')}
        </Text> : <></>}
        <Input
          label={t('common.confirm_password')}
          placeholder={t('common.input_here')}
          secureTextEntry={true}
          value={rePassword}
          marginTop={sizes.s}
          onChangeText={(text) => setRePassword(text)}
        />
      </Block>
      <Block row justify='center' flex={0} align='center'>
        <Text p marginRight={sizes.s}>
          {t('signup.have_account')}
        </Text>
        <Button onPress={() => navigation.navigate('Screens', {
          screen: 'SignIn',
        })}>
          <Text primary h5>
            {t('screens.signin')}
          </Text>
        </Button>
      </Block>
      <Block flex={1} margin={sizes.sm} justify='flex-end'>
        <Button
          row
          primary
          paddingHorizontal={sizes.m}
          onPress={async () => {
            if (!reg_password.test(password)) {
              notify_fail(t("signup.strong_password"));
            } else if (!reg_email.test(email)) {
              notify_fail(t("signup.email_pattern"));
            } else if (password !== rePassword) {
              notify_fail(t("signup.password_mismatch"));
            } else {
              const result = await useDatabase.db_signup(email, password);
              if (result) {
                notify_success(t("signup.signup_success"));
                navigation.navigate('Screens', {
                  screen: 'SignIn',
                })
              } else {
                notify_fail(t("signup.signup_fail"));
              }
            }
          }}>
          <Text white bold h5>
            {t('screens.signup')}
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Home;
