import React, { useEffect, useState, useRef } from 'react';
import { Platform, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import Menu from './Menu';
import { useData, ThemeProvider, TranslationProvider, useDatabase } from '../hooks';
import { getRandomNumber } from '../utility/get_random';
import { getCurrentFormattedDateTime } from '../utility/date_formatter';
import FlashMessage from 'react-native-flash-message';

SplashScreen.preventAutoHideAsync();

export default () => {
  const { isDark, theme, setTheme, devices, setValues, setAlerts, alerts } = useData();
  const currentMinute = useRef(getCurrentFormattedDateTime());
  const checkAbnormal = (value: number, type: string, deviceID: string) => {
    try {
      let result: any = {}
      if ((type == "oxygen" && value < 94) || (type == "temperature" && value < 36) || (type == "heart" && value < 60)) {
        result = {
          isHighValue: false
        }
      } else if ((type == "temperature" && value > 38) || (type == "heart" && value > 210)) {
        result = {
          isHighValue: true
        }
      }
      if (result.isHighValue !== undefined) {
        result = {
          ...result,
          value: value,
          type: type,
          date: Date.now(),
          deviceID: deviceID,
          hasRead: false
        }
        // useDatabase.db_add_alert(result);
        let temp_alerts = alerts || [];
        temp_alerts.push(result);
        setAlerts(temp_alerts);
        // notify_alert(temp_alerts);
        return { high: result.isHighValue ? 1 : 0, low: result.isHighValue ? 0 : 1 };
      }
      return { high: 0, low: 0 };
    } catch (e) {
      console.log(e);
      return { high: 0, low: 0 };
    }
  }

  const updateValues = async () => {
    try {
      if (devices.length > 0) {
        setValues(values => {
          let result = {}
          devices.forEach((each) => {
            const oxygen = getRandomNumber(93, 100);
            const temperatur = 35.9 + getRandomNumber(1, 22) / 10;
            const temperature = Number(temperatur.toFixed(1));
            const heart = getRandomNumber(59, 211);
            const oxygenHigh = checkAbnormal(oxygen, 'oxygen', each.deviceID);
            const temperatureHigh = checkAbnormal(temperature, 'temperature', each.deviceID);
            const heartHigh = checkAbnormal(heart, 'heart', each.deviceID);
            result[each.deviceID] = {
              oxygen: { current: oxygen, highAlert: oxygenHigh.high, lowAlert: oxygenHigh.low },
              temperature: { current: temperature, highAlert: temperatureHigh.high, lowAlert: temperatureHigh.low },
              heart: { current: heart, highAlert: heartHigh.high, lowAlert: heartHigh.low }
            }
          });
          const finalResult = {};
          const converter = (type, deviceID) => {
            let max = values[deviceID]?.[type]?.max || 0;
            let min = values[deviceID]?.[type]?.min || 10000;
            let count = (values[deviceID]?.[type]?.count || 0) + 1
            let average = ((values[deviceID]?.[type]?.average || 0) * (count - 1) + result[deviceID][type].current) / count;

            if (result[deviceID][type].current > max) {
              max = result[deviceID][type].current;
            }
            if (result[deviceID][type].current < min) {
              min = result[deviceID][type].current;
            }

            if (!finalResult[deviceID]) {
              finalResult[deviceID] = {};
            }
            if (!finalResult[deviceID][type]) {
              finalResult[deviceID][type] = {};
            }
            finalResult[deviceID][type] = {
              max: max,
              min: min,
              current: result[deviceID][type].current,
              average: parseFloat(average.toFixed(2)),
              count: count,
              highAlertCount: (values[deviceID]?.[type]?.highAlertCount || 0) + result[deviceID][type].highAlert,
              lowAlertCount: (values[deviceID]?.[type]?.lowAlertCount || 0) + result[deviceID][type].lowAlert
            }
          }

          devices.forEach((each) => {
            converter('oxygen', each.deviceID);
            converter('heart', each.deviceID);
            converter('temperature', each.deviceID);
          });

          const dateNow1 = getCurrentFormattedDateTime();
          // console.log(dateNow1,currentMinute.current,dateNow1 !== currentMinute.current);
          if (dateNow1 !== currentMinute.current) {
            useDatabase.set_data(finalResult, dateNow1);
            devices.forEach((each) => {
              ['oxygen', 'heart', 'temperature'].forEach((eachType) => {
                finalResult[each.deviceID][eachType] = {
                  ...finalResult[each.deviceID][eachType],
                  max: 0,
                  min: 0,
                  average: 0,
                  highAlertCount: 0,
                  lowAlertCount: 0,
                  count: 0
                }
              })
            });

            currentMinute.current = dateNow1
          }
          // console.log('finalResult', finalResult);
          return finalResult;
        })
      }
    } catch (e) {
      console.log(e)
    }

  }

  useEffect(() => {
    updateValues();
    const intervalId = setInterval(updateValues, 10000);
    return () => clearInterval(intervalId);
  }, [devices]);

  const [fontsLoaded] = useFonts({
    'OpenSans-Light': theme.assets.OpenSansLight,
    'OpenSans-Regular': theme.assets.OpenSansRegular,
    'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
    'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
    'OpenSans-Bold': theme.assets.OpenSansBold,
  });

  if (fontsLoaded) {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };
    hideSplash();
  }

  if (!fontsLoaded) {
    return null;
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  return (
    <TranslationProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <NavigationContainer theme={navigationTheme}>
          <FlashMessage position="top" />
          <Menu />
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};
