import React, { useState } from 'react';
import { useTheme, useTranslation, useData, useDatabase, useNotify } from '../hooks';
import { Block, Button, Input, Text } from '../components';

const Home = () => {
  const { t } = useTranslation();
  const { colors, sizes } = useTheme();
  const { devices, detailDevice, handleDevices } = useData();
  const [display, setDisplay] = useState(devices[detailDevice]);
  const { notify_success } = useNotify();

  return (
    <Block white>
      <Block flex={1}>
        <Block flex={0} padding={sizes.padding}>
          <Input
            label={t('device.device_name')}
            placeholder={t('common.search')}
            value={display.name}
            onChangeText={async (text) => {
              await setDisplay({ ...display, name: text });
              const devicesList = await useDatabase.get_devices();
              handleDevices(devicesList);
              notify_success(t("setting.save_success"));
            }}
          />
        </Block>
        {display.name === devices[detailDevice].name ? <></> :
          <Block flex={0} paddingHorizontal={sizes.padding}>
            <Button
              row
              primary
              paddingVertical={sizes.sm}
              paddingHorizontal={sizes.m}
              onPress={() => {
                useDatabase.update_device_name(display);

              }}>
              <Text white bold h5 marginRight={sizes.xs}>
                {t('setting.save')}
              </Text>
            </Button>
          </Block>}

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
    </Block>
  );
};

export default Home;
