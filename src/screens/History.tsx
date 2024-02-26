import React, { useState } from 'react';
import { useTheme, useTranslation, useNotify } from '../hooks';
import { Block, LinkBox, Text, Tab_View, Button } from '../components';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/FontAwesome';
import Oxygen from './../assets/icons/oxygen.js';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import {Calendar, LocaleConfig} from 'react-native-calendars';
const screenWidth = Dimensions.get('window').width;
const SceneEach = ({ item }) => {
  const { colors, fonts, sizes } = useTheme();
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [selected, setSelected] = useState('');
  const categoryData = [
    {
      id: 'temperature',
      title: t('alert.temperature'),
      color: colors.danger,
      color_light: colors.danger_light,
      icon: <FIcon name={'temperature-high'} color={colors.danger} size={25} />,
    },
    {
      id: 'oxygen',
      title: t('alert.oxygen'),
      color: colors.info,
      color_light: colors.info_light,
      icon: <Oxygen width={25} height={25} color={colors.info} />,
    },
    {
      id: 'heart_rate',
      title: t('alert.heart_rate'),
      color: colors.warning,
      color_light: colors.warning_light,
      icon: <AIcon name={'heartbeat'} color={colors.warning} size={25} />,
    },
  ];
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
    ],
    datasets: [
      {
        data: [36.5, 36.6, 36.6, 36.6, 36.5, 36.6, 36.5, 36.5, 36.6, 36.6, 36.6, 36.6],
        color: () => colors.primary,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.white,
    backgroundGradientTo: colors.white,
    decimalPlaces: 2,
    color: () => colors.primary,
    labelColor: () => colors.text,
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: colors.darkGray,
    },
  };
  return (
    <Block white>
      <Block marginTop={sizes.s}>
        <Block flex={0}>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' }
            }}
          />
          <Block row flex={0} scrollHorizontal>
            {categoryData.map((each, index) => (
              <Block
                flex={0}
                key={index}
                padding={sizes.sm}
                margin={sizes.s}
                row
                radius={sizes.m}
                color={each.color_light}
                center
                align="center">
                {each.icon}
                <Text color={each.color} h5 paddingLeft={sizes.s}>
                  {each.title}
                </Text>
              </Block>
            ))}
          </Block>
        </Block>
        <Block flex={0} row align="center" padding={sizes.s} marginBottom={sizes.s}>
          <Text p bold flex={1}>
            Temperature History
          </Text>
          <Block
            flex={0}
            color={colors.danger_light}
            marginHorizontal={sizes.xs}
            padding={sizes.xs}
            radius={sizes.s}>
            <Text p primary>
              Week
            </Text>
          </Block>
          <Block
            flex={0}
            color={colors.danger_light}
            marginHorizontal={sizes.xs}
            padding={sizes.xs}
            radius={sizes.s}>
            <Text p primary>
              Week
            </Text>
          </Block>
          <Block
            flex={0}
            color={colors.danger_light}
            marginHorizontal={sizes.xs}
            padding={sizes.xs}
            radius={sizes.s}>
            <Text p primary>
              Week
            </Text>
          </Block>
        </Block>
        <LineChart
          data={data}
          width={screenWidth}
          height={300}
          bezier
          formatYLabel={(number) => `${Number(number).toFixed(1)}`}
          withInnerLines={false}
          withOuterLines={false}
          chartConfig={chartConfig}
          onDataPointClick={(point) => {
            setActiveIndex(point.index);
          }}
          getDotColor={(dataPoint, dataPointIndex) => {
            return dataPointIndex === activeIndex
              ? colors.primary
              : colors.white;
          }}
          renderDotContent={({ x, y, index, indexData }) => {
            return index === activeIndex ? (
              <Block
                style={{ position: 'absolute', top: y - 30, left: x - 30 }}
                white
                card
                padding={sizes.xs}
                key={index}>
                <Text primary p bold>
                  {indexData}
                </Text>
              </Block>
            ) : (
              <></>
            );
          }}
        />
      </Block>
    </Block>
  );
};

const Home = () => {
  const { sizes } = useTheme();

  const data = [
    {
      name: 'Tom',
      temperature: 37.4,
      oxygen: 89,
      heart_rate: 75,
    },
    {
      name: 'Jerry',
      temperature: 36.6,
      oxygen: 92,
      heart_rate: 80,
    },
    {
      name: 'Bruce',
      temperature: 36.3,
      oxygen: 94,
      heart_rate: 75,
    },
  ];
  const routes = data.map((each) => {
    return { id: each.name, title: each.name };
  });
  const scenes = {};
  data.forEach((item) => {
    const nameKey = item.name;
    scenes[nameKey] = <SceneEach item={item} />;
  });
  return (
    <Block white>
      <Tab_View routes={routes} scenes={scenes} />
      <Block flex={0} marginBottom={sizes.sm}>
        <LinkBox />
      </Block>
    </Block>
  );
};

export default Home;
