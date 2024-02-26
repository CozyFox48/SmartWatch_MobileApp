import React, { useCallback, useContext, useState, useEffect } from 'react';
import { INewDevice, IUseData, ITheme, IDevice, IAlert } from '../constants/types';
import Storage from '@react-native-async-storage/async-storage';
import { light } from '../constants';

export const DataContext = React.createContext({});

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [newDevices, setNewDevices] = useState<INewDevice[]>([]);
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [theme, setTheme] = useState<ITheme>(light);
  const [isDark, setIsDark] = useState(false);
  const [settingTab, setSettingTab] = useState<string>('');
  const [detailDevice, setDetailDevice]=useState<number>(0);
  const [values, setValues]=useState({});
  const [alerts, setAlerts]=useState<any[]>([]);
  const [userData, setUserData]=useState({});

  const handleNewDevices = useCallback(
    (payload: INewDevice[]) => {
      if (JSON.stringify(payload) !== JSON.stringify(newDevices)) {
        setNewDevices(payload);
      }
    },
    [newDevices, setNewDevices],
  );

  const handleUserData = useCallback(
    (payload) => {
      if (JSON.stringify(payload) !== JSON.stringify(userData)) {
        setUserData(payload);
      }
    },
    [setUserData, userData],
  );

  const handleDevices = useCallback(
    (payload:IDevice[]) => {
      if (JSON.stringify(payload) !== JSON.stringify(devices)) {
        setDevices(payload);
      }
    },
    [devices, setDevices],
  );

  const getIsDark = useCallback(async () => {
    const isDarkJSON = await Storage.getItem('isDark');
    if (isDarkJSON !== null) {
      setIsDark(JSON.parse(isDarkJSON));
    }
  }, [setIsDark]);

  useEffect(() => {
    getIsDark();
  }, [getIsDark]);

  const handleIsDark = useCallback(
    (payload: boolean) => {
      setIsDark(payload);
      Storage.setItem('isDark', JSON.stringify(payload));
    },
    [setIsDark],
  );

  const handleSettingTab = useCallback(
    (payload: string) => {
      if (payload !== settingTab) {
        setSettingTab(payload);
      }
    },
    [settingTab, setSettingTab],
  );

  const contextValue = {
    handleNewDevices,
    newDevices,
    isDark,
    handleIsDark,
    theme,
    setTheme,
    handleSettingTab,
    settingTab,
    handleDevices,
    devices,
    detailDevice, 
    setDetailDevice,
    values,
    setValues,
    alerts,
    setAlerts,
    userData,
    handleUserData
  };

  useEffect(() => {
    setTheme(isDark ? light : light);
  }, [isDark]);

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext) as IUseData;
