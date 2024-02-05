import React, { useEffect, useState } from 'react';

import { useTheme, useTranslation, useDatabase } from '../hooks';
import { Block, LinkBox, Text, Tab_View } from '../components';
import FIcon from 'react-native-vector-icons/Feather';
import FoIcon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/FontAwesome';
import Oxygen from './../assets/icons/oxygen.js';
import Beat1 from '../assets/icons/beat1.js';
import Beat2 from '../assets/icons/beat2.js';

const SceneEach = ({ item }) => {
  const { colors, fonts, sizes } = useTheme();
  const { t } = useTranslation();

  return (
    <Block white>
      <Block color={colors.warning_light} radius={sizes.m} margin={sizes.sm}>
        <Block row flex={0} margin={sizes.s}>
          <Block flex={1} row align="center">
            <Block
              color={colors.warning_middle}
              justify="center"
              align="center"
              radius={sizes.xxl}
              width={sizes.xl}
              height={sizes.xl}
              flex={0}>
              <AIcon name={'heartbeat'} color={colors.warning} size={30} />
            </Block>
            <Text color={colors.warning} h5>
              {t('alert.heart_rate')}
            </Text>
          </Block>
          <Block flex={0} row align="flex-end">
            <Text font={fonts.normal} h2 color={colors.warning}>
              56
            </Text>
            <Text
              font={fonts.normal}
              h5
              color={colors.warning}
              marginBottom={sizes.s}
              marginLeft={sizes.s}>
              {t('alert.unit_heart')}
            </Text>
          </Block>
        </Block>
        <Block center>
          <Beat1 width={'100%'} height={50} color={colors.warning} />
          <Beat2 width={'100%'} height={40} color={colors.warning} />
        </Block>
      </Block>
      <Block row marginHorizontal={sizes.sm}>
        <Block
          color={colors.danger_light}
          radius={sizes.m}
          padding={sizes.sm}
          marginRight={sizes.s}>
          <Block
            color={colors.danger_middle}
            justify="center"
            align="center"
            radius={sizes.xxl}
            width={sizes.xl}
            height={sizes.xl}
            flex={0}>
            <FoIcon name={'temperature-high'} color={colors.danger} size={30} />
          </Block>
          <Text color={colors.primary} p>
            {t('alert.temperature')}
          </Text>
          <Text font={fonts.normal} h2 color={colors.primary}>
            56
            {t('alert.unit_temp')}
          </Text>
        </Block>
        <Block
          color={colors.info_light}
          radius={sizes.m}
          padding={sizes.sm}
          marginLeft={sizes.s}>
          <Block
            color={colors.info_middle}
            justify="center"
            align="center"
            radius={sizes.xxl}
            width={sizes.xl}
            height={sizes.xl}
            flex={0}>
            <Oxygen width={30} height={30} color={colors.info} />
          </Block>
          <Text color={colors.info} p>
            {t('alert.oxygen')}
          </Text>
          <Text font={fonts.normal} h2 color={colors.info}>
            56
            {t('alert.unit_oxygen')}
          </Text>
        </Block>
      </Block>
      <Block
        flex={0}
        radius={sizes.xxl}
        gray
        padding={sizes.s}
        row
        marginHorizontal={sizes.sm}
        marginVertical={sizes.sm}>
        <Block
          secondary
          justify="center"
          align="center"
          radius={sizes.xxl}
          padding={sizes.sm}
          flex={0}>
          <FIcon name={'phone-call'} color={colors.text} size={27} />
        </Block>
        <Block flex={1} marginLeft={sizes.sm} center>
          <Text h5 semibold>
            {t('home.emergency')}
          </Text>
        </Block>
        <Block
          primary
          justify="center"
          align="center"
          radius={sizes.xxl}
          paddingHorizontal={sizes.m}
          flex={0}>
          <Text bold h5 white marginLeft={sizes.xs}>
            {t('home.call')}
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

const Home = () => {
  const { sizes } = useTheme();
  const [routes, setRoutes] = useState([]);
  const [scenes, setScenes] = useState({});
  
  useEffect(() => {
    const getData = async () => {
      const devices = await useDatabase.get_devices();
      const tempRoutes = devices.map((each) => {
        return { id: each.uuid, title: each.name };
      })
      setRoutes(tempRoutes);
      const tempScenes = {};
      devices.forEach((item) => {
        const nameKey = item.uuid;
        tempScenes[nameKey] = <SceneEach item={item} />;
      });
      setScenes(tempScenes);
    }
    getData();
  }, [])

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
