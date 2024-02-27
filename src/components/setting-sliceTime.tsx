import React from 'react';

import { useTheme, useTranslation, useData, useDatabase } from '../hooks';
import { Block, Text, Button} from '../components';
import FIcon from 'react-native-vector-icons/FontAwesome';

const AlarmComponent = () => {
    const { colors, sizes} = useTheme();
    const { t } = useTranslation();
    const {  userData, handleUserData } = useData();
  

    return (
      <Block padding={sizes.s}>
        {[1, 2, 5, 10].map((each, key) => (
          <Button
            key={key}
            padding={sizes.s}
            color={each === userData.sliceTime ? colors.secondary : ''}
            onPress={async () => {
                await useDatabase.update_user_data({ ...userData, sliceTime: each });
                const tempUserData = await useDatabase.get_user_data();
                handleUserData(tempUserData);
            }}
            row>
            <Text flex={1} color={each === userData.sliceTime ? colors.primary : ''}>
              {each} {t('setting.hours')}
            </Text>
            {each === userData.sliceTime ? (
              <FIcon name={'check'} color={colors.primary} size={20} flex={0} />
            ) : (
              <></>
            )}
          </Button>
        ))}
      </Block>
    );
  };

  export default AlarmComponent;