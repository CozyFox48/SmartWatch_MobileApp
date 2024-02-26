import React, { useEffect, useState } from 'react';
import { useTheme, useTranslation, useData, useDatabase, useNotify } from '../hooks';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';
import Input from './Input';

const SetName = () => {
    const { sizes, colors, fonts } = useTheme();
    const { t } = useTranslation();
    const { userData, handleUserData } = useData();
    const { notify_fail, notify_success } = useNotify();
    return (
        <Block flex={0}>
            <Block padding={sizes.s} flex={0}>
                <Input
                    label={t('common.name')}
                    placeholder={t('common.search')}

                    value={userData.name}
                    onChangeText={(text) => handleUserData({ ...userData, name: text })}
                />
            </Block>
            <Block padding={sizes.s} row center marginBottom={sizes.s}>
                <Button primary paddingHorizontal={sizes.m} flex={0}
                    onPress={async () => {
                        await useDatabase.update_user_data(userData);
                        notify_success(t('setting.save_success'));
                    }}>
                    <Text white bold h5>
                        {t('setting.save') + ' ' + t('setting.change')}
                    </Text>
                </Button>
            </Block>
        </Block>
    );
};

export default SetName