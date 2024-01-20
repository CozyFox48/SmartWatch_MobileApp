import React from 'react';

import { useTheme, useTranslation} from '../hooks';
import {Block, Button, Image, Input, Text} from '../components';

const Home = () => {
  const {t} = useTranslation();
  const {assets, colors, sizes} = useTheme();

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

        <Block flex={0} padding={sizes.padding}>
          <Input
            label={t('device.device') + ' ' + t('common.name')}
            placeholder={t('common.search')}
          />
        </Block>
        <Block
          flex={0}
          paddingTop={sizes.sm}
          paddingBottom={sizes.s}
          paddingHorizontal={sizes.padding}>
          <Text bold>{t('device.device') + ' ' + t('common.info')}</Text>
        </Block>

        <Block
          flex={0}
          gray
          radius={sizes.s}
          marginHorizontal={sizes.m}
          style={{borderColor: colors.darkGray, borderWidth: 2}}
          paddingHorizontal={sizes.padding}
          paddingVertical={sizes.sm}>
          <Block flex={0} row marginVertical={sizes.xs}>
            <Text p flex={1}>
              {t('device.id')}
            </Text>
            <Text p bold flex={0}>
              #9878
            </Text>
          </Block>
          <Block flex={0} row marginVertical={sizes.xs}>
            <Text p flex={1}>
              {t('device.signalStrength')}
            </Text>
            <Text p bold flex={0}>
              78
            </Text>
          </Block>
          <Block flex={0} row marginVertical={sizes.xs}>
            <Text p flex={1}>
              {t('device.connectionStatu')}
            </Text>
            <Text p bold primary flex={0}>
              Connected
            </Text>
          </Block>
        </Block>
        <Block flex={0} padding={sizes.padding} marginBottom={sizes.m}>
          <Button
            row
            primary
            paddingVertical={sizes.sm}
            paddingHorizontal={sizes.m}>
            <Text white bold h5 marginRight={sizes.xs}>
              {t('common.remove')}
            </Text>
          </Button>
        </Block>
      </Block>

      {/* toggle products list */}
    </Block>
  );
};

export default Home;
