import React from 'react';

import Text from './Text';
import Block from './Block';
import {useTheme, useTranslation} from '../hooks';

const Article = () => {
  const {t} = useTranslation();
  const {sizes} = useTheme();

  // render card for Popular
  return (
    <Block padding={0} flex={0} marginBottom={sizes.sm}>
      <Block row flex={0} justify="space-evenly">
        <Text h5>{t('app.powered_by')}</Text>
      </Block>
      <Block row flex={0} justify="space-evenly" marginTop={sizes.xs}>
        <Text h6>{t('app.company_name')}</Text>
      </Block>
    </Block>
  );
};

export default Article;
