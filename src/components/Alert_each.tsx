import React, { useEffect, useState } from 'react';
import { temperature_converter } from '../utility/temperature_convert';
import Block from './Block';
import Text from './Text';
import { useTheme, useTranslation, useData } from '../hooks';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/FontAwesome';
import Oxygen from './../assets/icons/oxygen.js';
import { formatDate } from './../utility/date_formatter';

const Article = ({ data }) => {
  const { t } = useTranslation();
  const { colors, fonts, sizes } = useTheme();
  const { devices, userData } = useData();
  const [mapping, setMapping] = useState({})

  useEffect(() => {
    let result = {};
    devices.forEach((each, key) => {
      result[each.deviceID] = each.name
    });
    setMapping(result);
  }, [devices])

  const color_light = data.hasRead
    ? colors.gray
    : data.type === 'oxygen'
      ? colors.info_light
      : data.type === 'temperature'
        ? colors.danger_light
        : colors.warning_light;

  const color_middle = data.hasRead
    ? colors.white
    : data.type === 'oxygen'
      ? colors.info_middle
      : data.type === 'temperature'
        ? colors.danger_middle
        : colors.warning_middle;

  const color = data.hasRead
    ? ''
    : data.type === 'oxygen'
      ? colors.info
      : data.type === 'temperature'
        ? colors.danger
        : colors.warning;

  const icon =
    data.type === 'temperature' ? (
      <FIcon
        name={'temperature-high'}
        color={data.hasRead ? colors.text : colors.danger}
        size={30}
      />
    ) : data.type === 'heart' ? (
      <AIcon
        name={'heartbeat'}
        color={data.hasRead ? colors.text : colors.warning}
        size={30}
      />
    ) : (
      <Oxygen
        width={30}
        height={30}
        color={data.hasRead ? colors.text : colors.info}
      />
    );

  return (
    <Block
      flex={0}
      card
      radius={sizes.xxl}
      color={color_light}

      row
      marginBottom={sizes.sm}>
      <Block
        color={color_middle}
        justify="center"
        align="center"
        radius={sizes.xxl}
        width={sizes.xl}
        flex={0}>
        {icon}
      </Block>

      <Block flex={0} marginHorizontal={sizes.s}>
        <Text h5 color={color} semibold>
          {t('alert.' + (data.isHighValue ? 'high' : 'low'))} {t('alert.' + data.type)}
        </Text>
        <Block row>
          <Text color={color} marginHorizontal={sizes.xs}>
            {mapping[data.deviceID]}
          </Text>
          <Text marginHorizontal={sizes.xs}>
            {formatDate(data.date)}
          </Text>
        </Block>
      </Block>
      <Block justify="flex-end" align="center" flex={1} row>
        <Text h4 font={fonts.semibold} color={color}>
          {(data.type==='temperature')&&(userData.temperature!=="celcius")?temperature_converter(data.value):data.value}
        </Text>
        <Text h5 font={fonts.normal} color={color}>
          {t('alert.unit_' + data.type+((data.type==='temperature')&&(userData.temperature!=="celcius")?'_f':""))}
        </Text>
      </Block>
    </Block>
  );
};

export default Article;
