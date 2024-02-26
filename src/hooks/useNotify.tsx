import React from 'react';
import Text from '../components/Text';
import Block from '../components/Block'
import { showMessage } from 'react-native-flash-message';
import useTheme from '../hooks/useTheme';
import {
  TranslationContext,
  TranslationProvider,
  useTranslation,
} from '../hooks/useTranslation';
import FIcon from 'react-native-vector-icons/FontAwesome5';
import AIcon from 'react-native-vector-icons/FontAwesome';
import Oxygen from './../assets/icons/oxygen.js';

export default () => {
  const { colors, sizes } = useTheme();
  const { t } = useTranslation();

  const notify_fail = (message: string) => showMessage({
    message: '',
    duration: 2000,
    backgroundColor: 'transparent',
    position: 'top',
    titleStyle: { fontSize: 0, height: 0 },
    renderCustomContent: () => (
      <Block card row align='center' radius={sizes.xl}>
        <FIcon
          name={'info-circle'}
          color={colors.danger}
          size={30}
        />
        <Text h5 marginLeft={sizes.s} danger>{message}</Text>
      </Block>
    ),
  });

  const notify_success = (message: string) => showMessage({
    message: '',
    duration: 2000,
    backgroundColor: 'transparent',
    position: 'top',
    titleStyle: { fontSize: 0, height: 0 },
    renderCustomContent: () => (
      <Block card row align='center' radius={sizes.xl} paddingHorizontal={sizes.sm}>
        <FIcon
          name={'check'}
          color={colors.success}
          size={30}
        />
        <Text h5 marginLeft={sizes.s} success>{message}</Text>
      </Block>
    ),
  });

  // const notify_alert = (message: any) => showMessage({
  //   message: '',
  //   duration: 2000,
  //   backgroundColor: 'transparent',
  //   position: 'top',
  //   titleStyle: { fontSize: 0, height: 0 },
  //   renderCustomContent: () => (
  //     <Block card row align='center' radius={sizes.xl} paddingHorizontal={sizes.sm}>
  //       <Alert_each data={message} />
  //     </Block>
  //   ),
  // });

  return { notify_fail, notify_success };
}