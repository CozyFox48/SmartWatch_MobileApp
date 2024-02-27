import React, { useState } from 'react';
import { useTheme, useTranslation, useData } from '../hooks';
import Block from './Block';
import Text from './Text';
import Button from './Button';
import IIcon from 'react-native-vector-icons/Ionicons';
import { find_devices } from '../utility/get_random';
import { useNavigation } from '@react-navigation/core';

const Article = () => {
    const { colors, sizes } = useTheme();
    const { t } = useTranslation();
    const { handleNewDevices, handleSettingTab } = useData();
    const navigation = useNavigation();
    const submit = () => {
        const data = find_devices();
        handleNewDevices(data);
        handleSettingTab('devices');
        navigation.navigate('Screens', {
            screen: 'Setting',
        })
    }
    return (
        <Block align="center" justify="center">
            <Block
                color={colors.danger_light}
                flex={0}
                radius={sizes.xxl}
                height={sizes.xxl}
                width={sizes.xxl}
                align="center"
                justify="center">
                <IIcon name={'watch'} color={colors.primary} size={30} />
            </Block>
            <Text marginTop={sizes.sm} p>{t('home.no_device1')}</Text>
            <Text marginBottom={sizes.sm} p>{t('home.no_device2')}</Text>
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

export default Article;
