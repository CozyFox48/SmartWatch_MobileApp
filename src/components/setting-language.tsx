import React, { useEffect, useState } from 'react';
import { useTheme, useTranslation, useData, useDatabase, useNotify } from '../hooks';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';
import Input from './Input';

const LanguageComponent = () => {
  const { userData, handleUserData } = useData();
  const { sizes, colors, fonts } = useTheme();
  const { t } = useTranslation();

  const countries = [
    {
      id: 'En',
      name: t('setting.english'),
    },
    {
      id: 'Fr',
      name: t('setting.french'),
    },
    {
      id: 'Es',
      name: t('setting.spanish'),
    },
  ];
  return (
    <Block row>
      {countries.map((each, key) => {
        return (
          <Block padding={sizes.s} key={key}>
            <Button shadow onPress={async() => {
              handleUserData({ ...useData, language: each.id });
              await useDatabase.update_user_data({ ...useData, language: each.id });
            }}>
              <Text
                font={each.id === userData.language ? fonts.bold : ''}
                size={each.id === userData.language ? sizes.h5 : sizes.text}
                paddingTop={sizes.s}
                color={each.id === userData.language ? colors.primary : ''}>
                {each.name}
              </Text>
            </Button>
          </Block>
        );
      })}
    </Block >
  );
};

export default LanguageComponent