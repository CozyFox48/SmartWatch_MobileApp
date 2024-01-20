import React, {useLayoutEffect} from 'react';

import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';

import {useTheme, useTranslation} from '../hooks/';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';
// cards example
const Card = ({name, connection, uuid, signal, isNew}) => {
  const {assets, colors, gradients, sizes} = useTheme();

  return (
    <Block card radius={sizes.xxl} gray shadow row marginBottom={sizes.s}>
      <Block
        secondary
        justify="center"
        align="center"
        radius={sizes.xxl}
        width={sizes.xl}
        flex={0}>
        <Image source={assets?.watch_gray} />
      </Block>
      <Block flex={1} marginHorizontal={sizes.s}>
        <Text p semibold>
          {name}
        </Text>
        <Block row>
          {isNew ? (
            <></>
          ) : connection ? (
            <Text text primary marginHorizontal={sizes.xs}>
              Connected
            </Text>
          ) : (
            <Text text marginHorizontal={sizes.xs}>
              Disconnected
            </Text>
          )}
          {isNew ? (
            <></>
          ) : (
            <Text text marginHorizontal={sizes.xs}>
              •
            </Text>
          )}

          <Text text marginHorizontal={sizes.xs}>
            #{uuid}
          </Text>
          <Text text marginHorizontal={sizes.xs}>
            •
          </Text>
          <Text text marginHorizontal={sizes.xs}>
            {signal}
          </Text>
        </Block>
      </Block>
      {isNew ? (
        <Block
          primary
          justify="center"
          align="center"
          radius={sizes.xxl}
          paddingHorizontal={sizes.m}
          flex={0}>
          <Text bold h6 white marginLeft={sizes.xs}>
            Connect
          </Text>
        </Block>
      ) : (
        <Block
          secondary
          justify="center"
          align="center"
          radius={sizes.xxl}
          width={sizes.xl}
          flex={0}>
          <Image source={assets?.direction_right} />
        </Block>
      )}
    </Block>
  );
};

const Components = () => {
  const {assets, sizes} = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const {t} = useTranslation();
  const devicesDataList = [
    {name: 'Tom', connection: true, uuid: '1423', signal: '34'},
    {name: 'Jerry', connection: false, uuid: '4453', signal: '35'},
    {name: 'Bruce', connection: true, uuid: '9384', signal: '47'},
  ];
  const newDevicesDataList = [
    {name: 'Jack', connection: false, uuid: '1423', signal: '34'},
  ];

  return (
    <Block safe>
      
      <Block scroll showsVerticalScrollIndicator={false}>
        <Block>
          <Block paddingHorizontal={sizes.padding}>
            {devicesDataList.map((each) => (
              <Card
                name={each.name}
                connection={each.connection}
                uuid={each.uuid}
                signal={each.signal}
                key={each.uuid}
                isNew={false}
              />
            ))}
            {newDevicesDataList.map((each) => (
              <Card
                name={each.name}
                connection={each.connection}
                uuid={each.uuid}
                signal={each.signal}
                key={each.uuid}
                isNew={true}
              />
            ))}
            <Button
              row
              primary
              radius={sizes.xxl}
              paddingVertical={sizes.sm}
              paddingHorizontal={sizes.m}>
              <Image radius={0} source={assets.qrcode} />
              <Text bold h5 white marginLeft={sizes.xs}>
                Scan
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Components;
