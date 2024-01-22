import React, {useState} from 'react';

import {useTheme, useTranslation} from '../hooks';
import {Block, Text, Input, Button, Image} from '../components';
import Collapsible from 'react-native-collapsible';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F6Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialIcons';

const Collapse_Each = ({collapse, setCollapse, data}) => {
  const {sizes, colors, fonts} = useTheme();
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
      <Collapsible collapsed={collapse !== data.id}>{data.content}</Collapsible>
    </Block>
  );
};

const Home = () => {
  const {colors, sizes, assets, fonts} = useTheme();
  const {t} = useTranslation();
  const [collapse, setCollapse] = useState('alarm');

  const SetName = () => {
    return (
      <Block flex={0}>
        <Block padding={sizes.s} flex={0}>
          <Input label={t('common.name')} placeholder={t('common.search')} />
        </Block>
        <Block padding={sizes.s} row center marginBottom={sizes.s}>
          <Button primary paddingHorizontal={sizes.m} flex={0}>
            <Text white bold h5>
              {t('setting.save') + ' ' + t('setting.change')}
            </Text>
          </Button>
        </Block>
      </Block>
    );
  };

  const LanguageComponent = () => {
    const countries = [
      {
        id: 'english',
        name: t('setting.english'),
        svgFile: assets.flag_uk,
      },
      {
        id: 'french',
        name: t('setting.french'),
        svgFile: assets.flag_france,
      },
      {
        id: 'spanish',
        name: t('setting.spanish'),
        svgFile: assets.flag_spain,
      },
    ];
    return (
      <Block row>
        {countries.map((each, key) => {
          return (
            <Block padding={sizes.s}>
              <Button shadow>
                <Image
                  source={each.svgFile}
                  height={sizes.xxl}
                  width={sizes.xxl}
                />
                <Text
                  font={each.id === 'english' ? fonts.bold : ''}
                  size={each.id === 'english' ? sizes.h5 : sizes.text}
                  paddingTop={sizes.s}
                  color={each.id === 'english' ? colors.primary : ''}>
                  {each.name}
                </Text>
              </Button>
            </Block>
          );
        })}
      </Block>
    );
  };

  const ColorComponent = () => {
    const colorsData = [
      {id: 'red', name: t('setting.red'), color: colors.danger},
      {id: 'blue', name: t('setting.blue'), color: colors.info},
      {id: 'yellow', name: t('setting.yellow'), color: colors.warning},
    ];
    return (
      <Block padding={sizes.s}>
        {colorsData.map((each, key) => (
          <Block
            key={key}
            padding={sizes.s}
            color={each.id === 'red' ? colors.danger_light : ''}
            row>
            <Text flex={1} color={each.color}>{each.name}</Text>
            {each.id === 'red' ? (
              <FIcon name={'check'} color={colors.primary} size={20} flex={0} />
            ) : (
              <></>
            )}
          </Block>
        ))}
      </Block>
    );
  };

  const TemperatureComponent = () => {
    const colorsData = [
      {id: 'celcius', name: t('setting.celcius'), color: colors.danger},
      {id: 'fahrenheit', name: t('setting.fahrenheit'), color: colors.info},
    ];
    return (
      <Block padding={sizes.s}>
        {colorsData.map((each, key) => (
          <Block
            key={key}
            padding={sizes.s}
            color={each.id === 'celcius' ? colors.danger_light : ''}
            row>
            <Text flex={1} color={each.id === 'celcius' ? colors.primary : ''}>
              {each.name}
            </Text>
            {each.id === 'celcius' ? (
              <FIcon name={'check'} color={colors.primary} size={20} flex={0} />
            ) : (
              <></>
            )}
          </Block>
        ))}
      </Block>
    );
  };

  const AlarmComponent = () => {
    return (
      <Block padding={sizes.s}>
        {[1, 2, 5, 10].map((each, key) => (
          <Block
            key={key}
            padding={sizes.s}
            color={each === 1 ? colors.danger_light : ''}
            row>
            <Text flex={1} color={each === 1 ? colors.primary : ''}>
              {each} {t('setting.hours')}
            </Text>
            {each === 1 ? (
              <FIcon name={'check'} color={colors.primary} size={20} flex={0} />
            ) : (
              <></>
            )}
          </Block>
        ))}
      </Block>
    );
  };

  const data = [
    {
      id: 'name',
      icon: <FIcon name={'user'} color={colors.primary} size={20} />,
      title: t('setting.account') + ' ' + t('setting.name'),
      header: 'mama tou',
      content: <SetName />,
    },
    {
      id: 'language',
      icon: <MIcon name={'language'} color={colors.primary} size={20} />,
      title: t('setting.language'),
      header: 'English',
      content: <LanguageComponent />,
    },
    {
      id: 'color',
      icon: <MIcon name={'color-lens'} color={colors.primary} size={20} />,
      title: t('setting.color'),
      header: 'Red',
      content: <ColorComponent />,
    },
    {
      id: 'temperature',
      icon: (
        <F6Icon name={'temperature-high'} color={colors.primary} size={20} />
      ),
      title: t('setting.temperature_type'),
      header: 'Celcius',
      content: <TemperatureComponent />,
    },
    {
      id: 'alarm',
      icon: <F6Icon name={'clock'} color={colors.primary} size={20} />,
      title: t('setting.alarm_setting'),
      header: '3 Hours',
      content: <AlarmComponent />,
    },
  ];

  return (
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
  );
};

export default Home;
