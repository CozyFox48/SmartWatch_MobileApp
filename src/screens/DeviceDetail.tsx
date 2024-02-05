import React from 'react';

import { useTheme, useTranslation, useData } from '../hooks';
import { Block, Button, Input, Text } from '../components';

const Home = () => {
  const { t } = useTranslation();
  const { colors, sizes } = useTheme();
  const { handleDevices, devices, detailDevice } = useData();

  return (
    <Block white>
      <Block flex={1}>
        <Block flex={0} padding={sizes.padding}>
          <Input
            label={t('device.device_name')}
            placeholder={t('common.search')}
            value={devices[detailDevice].name}
            onChangeText={(text) => {
              // let temp=devices
              // devices[detailDevice].name=text;
            }}
          />
        </Block>
        <Block
          flex={0}
          paddingTop={sizes.sm}
          paddingBottom={sizes.s}
          paddingHorizontal={sizes.padding}>
          <Text bold>{t('device.device_detail')}</Text>
        </Block>
        <Block
          flex={0}
          gray
          radius={sizes.s}
          marginHorizontal={sizes.m}
          style={{ borderColor: colors.darkGray, borderWidth: 2 }}
          paddingHorizontal={sizes.padding}
          paddingVertical={sizes.sm}>
          <Block flex={0} row marginVertical={sizes.xs}>
            <Text p flex={1}>
              {t('device.device_id')}
            </Text>
            <Text p bold flex={0}>
              #{devices[detailDevice].uuid}
            </Text>
          </Block>
          <Block flex={0} row marginVertical={sizes.xs}>
            <Text p flex={1}>
              {t('device.signalStrength')}
            </Text>
            <Text p bold flex={0}>
              {devices[detailDevice].strength}
            </Text>
          </Block>
          <Block flex={0} row marginVertical={sizes.xs}>
            <Text p flex={1}>
              {t('device.connectionStatu')}
            </Text>
            <Text p bold primary={devices[detailDevice].connection} flex={0}>
              {devices[detailDevice].connection ? 'Connected' : 'Disconnected'}
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
