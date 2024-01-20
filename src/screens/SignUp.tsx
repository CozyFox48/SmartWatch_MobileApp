import React, {useCallback, useState} from 'react';

import {useData, useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, DevicesList, Text} from '../components';

const Home = () => {
  const {t} = useTranslation();
  const [tab, setTab] = useState<number>(0);
  const {following, trending} = useData();
  const [products, setProducts] = useState(following);
  const {assets, colors, fonts, gradients, sizes} = useTheme();

  return (
    <Block white>
      <Block flex={1}>
        <Block flex={0} padding={sizes.sm} justify="center" align="flex-start">
          <Button
            row
            gray
            paddingVertical={sizes.s}
            paddingHorizontal={sizes.sm}>
            <Image source={assets.arrow_left} />
          </Button>
        </Block>
        <Block flex={0}>
          <Text bold h3 align="center">
            {t('screens.register')}
          </Text>
        </Block>
        {/* search input */}
        <Block flex={0} padding={sizes.padding} marginBottom={sizes.m}>
          <Input label={t('common.name')} placeholder={t('common.search')} />
        </Block>
        <DevicesList />
      </Block>
      <Block flex={0} margin={sizes.sm}>
        <Button
          row
          primary
          paddingVertical={sizes.sm}
          paddingHorizontal={sizes.m}>
          <Text white bold h5 marginRight={sizes.xs}>
            {t('menu.started')}
          </Text>
          <Image source={assets.arrow_right} />
        </Button>
      </Block>

      {/* toggle products list */}
    </Block>
  );
};

export default Home;
