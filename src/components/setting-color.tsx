
import Block from './Block';
import Button from './Button';
import Text from './Text';
import React from 'react';
import { useTheme, useTranslation, useData, useDatabase } from '../hooks';
import FIcon from 'react-native-vector-icons/FontAwesome';
const ColorComponent = () => {
    const { t } = useTranslation();
    const { colors, sizes, assets, fonts } = useTheme();
    const { userData, handleUserData } = useData();
    const colorsData = [
        { id: 'red', name: t('setting.red'), color: colors.danger },
        { id: 'blue', name: t('setting.blue'), color: colors.info },
        { id: 'yellow', name: t('setting.yellow'), color: colors.warning },
    ];
    const color_light=(each)=>{
        if (each.id === userData.color){
            if(each.id==="red"){
                return colors.danger_light;
            }else if(each.id==="blue"){
                return colors.info_light
            }else{
                return colors.warning_light
            }
        }else{
            return ''
        }
    }
    const color_strong=(each)=>{
        if (each.id === userData.color){
            if(each.id==="red"){
                return colors.danger;
            }else if(each.id==="blue"){
                return colors.info;
            }else{
                return colors.warning;
            }
        }else{
            return ''
        }
    }
    return (
        <Block padding={sizes.s}>
            {colorsData.map((each, key) => (
                <Button
                    key={key}
                    padding={sizes.s}
                    onPress={async () => {
                        await useDatabase.update_user_data({ ...userData, color: each.id });
                        const tempUserData = await useDatabase.get_user_data();
                        handleUserData(tempUserData);
                    }}
                    color={color_light(each)}
                    row>
                    <Text flex={1} color={each.color}>
                        {each.name}
                    </Text>
                    {each.id === userData.color ? (
                        <FIcon name={'check'} color={color_strong(each)} size={20} flex={0} />
                    ) : (
                        <></>
                    )}
                </Button>
            ))}
        </Block>
    );
};

export default ColorComponent