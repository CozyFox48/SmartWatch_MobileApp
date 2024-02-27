import React, { useEffect, useState } from 'react';

import { useTheme, useTranslation, useData, useDatabase } from '../hooks';
import { Block, Text, Input, Button, Image, LinkBox, No_Device, DevicesList } from '../components';
import FIcon from 'react-native-vector-icons/FontAwesome';

const TemperatureComponent = () => {
    const { colors, sizes, assets, fonts } = useTheme();
    const { t } = useTranslation();
    const { settingTab, userData, handleUserData } = useData();
  
    const colorsData = [
      { id: 'celcius', name: t('setting.celcius'), color: colors.danger },
      { id: 'fahrenheit', name: t('setting.fahrenheit'), color: colors.info },
    ];
    return (
      <Block padding={sizes.s}>
        {colorsData.map((each, key) => (
          <Button
            key={key}
            padding={sizes.s}
            onPress={async () => {
                await useDatabase.update_user_data({ ...userData, temperature: each.id });
                const tempUserData = await useDatabase.get_user_data();
                handleUserData(tempUserData);
            }}
            color={each.id === userData.temperature ? colors.secondary : ''}
            row>
            <Text flex={1} >
              {each.name}
            </Text>
            {each.id ===userData.temperature ? (
              <FIcon name={'check'} color={colors.primary} size={20} flex={0} />
            ) : (
              <></>
            )}
          </Button>
        ))}
      </Block>
    );
  };

  export default TemperatureComponent