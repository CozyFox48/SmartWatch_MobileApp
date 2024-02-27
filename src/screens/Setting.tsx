import React, { useEffect, useState } from 'react';
import { useTheme, useTranslation, useData, useDatabase } from '../hooks';
import { Block, Text, Input, Button, Image, LinkBox, No_Device, DevicesList } from '../components';
import SetName from '../components/setting-setName';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F6Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import LanguageComponent from "./../components/setting-language";
import ColorComponent from '../components/setting-color';
import TemperatureComponent from '../components/setting-temperatureformate';
import AlarmComponent from '../components/setting-sliceTime';

const Collapse_Each = ({ collapse, setCollapse, data }) => {
  const { sizes, colors, fonts } = useTheme();
  return (
    <Block gray margin={sizes.s} radius={sizes.m}>
      <Button
        onPress={() => {
          if (collapse === data.id) {
            setCollapse('');
          } else {
            setCollapse(data.id);
          }
        }}
        padding={sizes.sm}
        row>
        <Block row align="center">
          {data.icon}
          <Text h5 font={fonts.medium} marginLeft={sizes.sm}>
            {data.title}
          </Text>
        </Block>
        <Block row justify="flex-end" align="center">
          <Text color={colors.primary} p font={fonts.normal}>
            {data.header}
          </Text>
          <MIcon
            name={`keyboard-arrow-${collapse === data.id ? 'up' : 'down'}`}
            color={colors.primary}
            size={20}
          />
        </Block>
      </Button>
      {/* <Collapsible collapsed={collapse !== data.id}>{data.content}</Collapsible> */}
      {collapse === data.id?data.content:<></>}
    </Block>
  );
};

const Home = () => {
  const { colors, sizes, assets, fonts } = useTheme();
  const { t } = useTranslation();
  const { settingTab, userData, devices } = useData();
  const [collapse, setCollapse] = useState(settingTab);

  const data = [
    {
      id: 'name',
      icon: <FIcon name={'user'} color={colors.primary} size={20} />,
      title: t('setting.account') + ' ' + t('setting.name'),
      header: userData.name,
      content: <SetName />,
    },
    {
      id: 'devices',
      icon: <IIcon name={'watch'} color={colors.primary} size={20} />,
      title: t('setting.devices'),
      header: devices.length+' Devices',
      content: <DevicesList />
    },
    {
      id: 'language',
      icon: <MIcon name={'language'} color={colors.primary} size={20} />,
      title: t('setting.language'),
      header: userData.language,
      content: <LanguageComponent />,
    },
    {
      id: 'color',
      icon: <MIcon name={'color-lens'} color={colors.primary} size={20} />,
      title: t('setting.color'),
      header:  userData.color,
      content: <ColorComponent />,
    },
    {
      id: 'temperature',
      icon: <F6Icon name={'temperature-high'} color={colors.primary} size={20} />,
      title: t('setting.temperature_type'),
      header: userData.temperature,
      content: <TemperatureComponent />,
    },
    {
      id: 'alarm',
      icon: <F6Icon name={'clock'} color={colors.primary} size={20} />,
      title: t('setting.alarm_setting'),
      header: userData.sliceTime,
      content: <AlarmComponent />,
    }
  ];

  return (
    <Block white>
      <Block white scroll>
        {data.map((each, key) => {
          return (
            <Collapse_Each
              key={key}
              collapse={collapse}
              setCollapse={setCollapse}
              data={each}
            />
          );
        })}
      </Block>
      <Block flex={0} marginBottom={sizes.sm}>
        <LinkBox />
      </Block>
    </Block>
  );
};

export default Home;
