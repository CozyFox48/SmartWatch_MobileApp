import React, { useState, useEffect } from 'react';
import { useTheme, useTranslation, useData, useDatabase } from '../hooks';
import { Block, LinkBox, Text, Tab_View, Button } from '../components';
// import FIcon from 'react-native-vector-icons/FontAwesome5';
// import AIcon from 'react-native-vector-icons/FontAwesome';
// import Oxygen from './../assets/icons/oxygen.js';
// import { Dimensions } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';
import { Calendar, LocaleConfig } from 'react-native-calendars';

const SceneEach = ({ item }) => {
  const { colors, fonts, sizes } = useTheme();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [selected, setSelected] = useState('');
  const [dotted, setDotted] = useState({});
  const [value, setValue] = useState({});

  const oxygen_dot = { key: 'oxygen_dot', color: colors.info };
  const temperature_dot = { key: 'temperature_dot', color: colors.danger };
  const heart_dot = { key: 'heart_dot', color: colors.warning };
  const display_time = (time) => {
    let result = "";
    if (time && time > 0) {
      const hour = ~~(time / 360);
      if (hour >= 1) result = ~~(hour) + " Hours ";
      const minute = ~~(time / 6) - hour * 60;
      if (minute >= 1) result = result + minute + " Min";
      if (time < 6) result = result + time + '0 sec'
    }
    return result;
  }
  const get_data = async (year, month) => {
    setLoading(true);
    const result = await useDatabase.get_month_date(year, month, item.deviceID);
    const finalResult = {};
    for (let key in result) {
      finalResult[key] = { dots: [] };
      if (result[key]['heart']?.highAlertCount + result[key]['heart']?.lowAlertCount > 0) finalResult[key]['dots'].push(heart_dot);
      if (result[key]['temperature']?.highAlertCount + result[key]['temperature']?.lowAlertCount > 0) finalResult[key]['dots'].push(temperature_dot);
      if (result[key]['oxygen']?.highAlertCount + result[key]['oxygen']?.lowAlertCount > 0) finalResult[key]['dots'].push(oxygen_dot);
      setDotted(finalResult);
      setValue(result);
    }
    setLoading(false);
  }
  useEffect(() => {
    const currentTime = new Date();
    get_data(currentTime.getFullYear(), currentTime.getMonth() + 1)
  }, [item.deviceID]);

  return (
    <Block white>
      <Block marginTop={sizes.s} scroll>
        <Block flex={0}>
          <Calendar
            markingType={'multi-dot'}
            displayLoadingIndicator={loading}
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            onMonthChange={month => {
              console.log('month changed', month);
            }}
            markedDates={{
              ...dotted,
              [selected]: { selected: true, disableTouchEvent: true, marked: true, selectedColor: 'orange', ...dotted[selected] },
            }}
          />
        </Block>
        {selected === '' ? <></> :
          ['temperature', 'oxygen', 'heart'].map(eachType =>
            <Block card color={colors[eachType + '_light']} margin={sizes.sm} key={eachType}>
              <Text color={colors[eachType]} h5>{t('alert.' + eachType)}</Text>
              <Block paddingLeft={sizes.md} row paddingRight={sizes.sm} paddingVertical={sizes.xs}>
                <Block flex={1}><Text p>{t('history.average')}</Text></Block>
                <Block flex={0}><Text p color={colors[eachType]}>{value[selected]?.[eachType]?.average} {t('alert.unit_' + eachType)}</Text></Block>
              </Block>
              <Block paddingLeft={sizes.md} row paddingRight={sizes.sm} paddingVertical={sizes.xs}>
                <Block flex={1}><Text p>{t('history.max')}</Text></Block>
                <Block flex={0}><Text p color={colors[eachType]}>{value[selected]?.[eachType]?.max} {t('alert.unit_' + eachType)}</Text></Block>
              </Block>
              <Block paddingLeft={sizes.md} row paddingRight={sizes.sm} paddingVertical={sizes.xs}>
                <Block flex={1}><Text p>{t('history.min')}</Text></Block>
                <Block flex={0}><Text p color={colors[eachType]}>{value[selected]?.[eachType]?.min} {t('alert.unit_' + eachType)}</Text></Block>
              </Block>
              <Block paddingLeft={sizes.md} row paddingRight={sizes.sm} paddingVertical={sizes.xs}>
                <Block flex={1}><Text p>{t('history.count')}</Text></Block>
                <Block flex={0}><Text p color={colors[eachType]}>{display_time(value[selected]?.[eachType]?.count)}</Text></Block>
              </Block>
              <Block paddingLeft={sizes.md} row paddingRight={sizes.sm} paddingVertical={sizes.xs}>
                <Block flex={1}><Text p>{t('history.high_alert')}</Text></Block>
                <Block flex={0}><Text p color={colors[eachType]}>{display_time(value[selected]?.[eachType]?.highAlertCount)}</Text></Block>
              </Block>
              <Block paddingLeft={sizes.md} row paddingRight={sizes.sm} paddingVertical={sizes.xs}>
                <Block flex={1}><Text p>{t('history.low_alert')}</Text></Block>
                <Block flex={0}><Text p color={colors[eachType]}>{display_time(value[selected]?.[eachType]?.lowAlertCount)}</Text></Block>
              </Block>
            </Block>
          )}
      </Block>
    </Block>
  );
};

const Home = () => {
  const { sizes } = useTheme();
  const [routes, setRoutes] = useState([]);
  const [scenes, setScenes] = useState({});
  const { devices } = useData();

  useEffect(() => {
    let tempRoutes = devices.map((each) => {
      return { id: each.deviceID, title: each.name }
    });
    setRoutes(tempRoutes);
    const tempScenes = {};
    devices.map((each) => {
      tempScenes[each.deviceID] = <SceneEach item={each} />;
    });
    setScenes(tempScenes);
  }, [devices])
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

// const screenWidth = Dimensions.get('window').width;
// const [activeIndex, setActiveIndex] = useState(null);
// const categoryData = [
//   {
//     id: 'temperature',
//     title: t('alert.temperature'),
//     color: colors.danger,
//     color_light: colors.danger_light,
//     icon: <FIcon name={'temperature-high'} color={colors.danger} size={25} />,
//   },
//   {
//     id: 'oxygen',
//     title: t('alert.oxygen'),
//     color: colors.info,
//     color_light: colors.info_light,
//     icon: <Oxygen width={25} height={25} color={colors.info} />,
//   },
//   {
//     id: 'heart_rate',
//     title: t('alert.heart_rate'),
//     color: colors.warning,
//     color_light: colors.warning_light,
//     icon: <AIcon name={'heartbeat'} color={colors.warning} size={25} />,
//   },
// ];
// const data = {
//   labels: [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//   ],
//   datasets: [
//     {
//       data: [36.5, 36.6, 36.6, 36.6, 36.5, 36.6, 36.5, 36.5, 36.6, 36.6, 36.6, 36.6],
//       color: () => colors.primary,
//       strokeWidth: 2,
//     },
//   ],
// };

// const chartConfig = {
//   backgroundGradientFrom: colors.white,
//   backgroundGradientTo: colors.white,
//   decimalPlaces: 2,
//   color: () => colors.primary,
//   labelColor: () => colors.text,
//   propsForDots: {
//     r: '6',
//     strokeWidth: '2',
//     stroke: colors.darkGray,
//   },
// };
{/* <Block flex={0} row align="center" padding={sizes.s} marginBottom={sizes.s}>
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
        </Block> */}
{/* <LineChart
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
        /> */}
{/* <Block row flex={0} scrollHorizontal>
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
          </Block> */}