import React, { useEffect, useState } from 'react';
import { useTheme, useData, useDatabase } from '../hooks/';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';
import { find_devices } from '../utility/get_random';
import IIcon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/core';

const Card = ({ name, connection, uuid, signal, index, isNew, deviceID }) => {
  const { assets, sizes } = useTheme();
  const { handleNewDevices, newDevices, setDetailDevice, handleDevices } = useData();
  const navigation = useNavigation();
  const submit = async () => {
    let result = [];
    for (const each of newDevices) {
      if (each.uuid !== uuid) result.push(each)
    }
    handleNewDevices(result);    
    await useDatabase.db_add_device({ name: name, uuid: uuid, connection: true, strength: signal });
    const devicesList=await useDatabase.get_devices();
    handleDevices(devicesList);
  }
  const navigate2detailDevice = () => {
    setDetailDevice(index);
    navigation.navigate('Screens', {
      screen: 'DeviceDetail',
    })
  }
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
        <Button
          primary
          justify="center"
          align="center"
          radius={sizes.xxl}
          paddingHorizontal={sizes.m}
          onPress={submit}
          flex={0}>
          <Text bold h6 white marginLeft={sizes.xs}>
            Connect
          </Text>
        </Button>
      ) : (
        <Button

          justify="center"
          align="center"
          radius={sizes.xxl}
          width={sizes.xl}
          onPress={navigate2detailDevice}
          flex={0}>
          <Image source={assets?.direction_right} />
        </Button>
      )}
    </Block>
  );
};

const Components = () => {
  const { colors, sizes } = useTheme();
  const { newDevices, handleNewDevices, devices } = useData();
  const submit = () => {
    const data = find_devices();
    handleNewDevices(data);
  }
  return (
    <Block paddingHorizontal={sizes.padding} paddingBottom={sizes.padding}>
      {devices.map((each, index) => (
        <Card
          name={each.name}
          connection={each.connection}
          uuid={each.uuid}
          signal={each.strength}
          key={each.uuid}
          index={index}
          isNew={false}
          deviceID={each.deviceID}
        />
      ))}
      {newDevices.map((each) => (
        <Card
          name={each.name}
          connection={false}
          uuid={each.uuid}
          signal={each.strength}
          key={each.uuid}
          isNew={true}
        />
      ))}
      <Button
        row
        primary
        radius={sizes.xxl}
        paddingVertical={sizes.sm}
        paddingHorizontal={sizes.m}
        onPress={submit}>
        <IIcon name={'qr-code'} color={colors.white} size={20} />
        <Text bold h5 white marginLeft={sizes.xs}>
          Scan
        </Text>
      </Button>
    </Block>
  );
};

export default Components;
