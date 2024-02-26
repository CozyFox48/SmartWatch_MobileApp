import i18n from 'i18n-js';
export * from './components';
import { ITheme } from './theme';
export * from './components';
export * from './theme';
export interface INewDevice {
  name: string;
  uuid: number;
  strength: number;
}

export interface IDevice {
  name: string;
  uuid: number;
  strength: number;
  connection: boolean,
  deviceID: string
}

export interface IAlert {
  date: Date;
  deviceID: string;
  hasRead: boolean;
  isHighValue: boolean;
  type: string;
  value: number;
}

export interface ITranslate {
  locale: string;
  setLocale: (locale?: string) => void;
  t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
  translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
}

export interface IUseData {
  isDark: boolean;
  handleIsDark: (isDark?: boolean) => void;
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  newDevices: INewDevice[];
  handleNewDevices: (data: INewDevice[]) => void;
  deviceValues: IDevice[];
  devices: IDevice[];
  handleDevices: (data: IDevice[]) => void;
  detailDevice: string,
  setDetailDevice: (data: string) => void;
  values: any,
  setValues: (data: any) => void;
  alerts: IAlert[],
  setAlerts: (data: IAlert[]) => void;
  userData: any,
  handleUserData: (data: any) => void;
  settingTab: string;
  handleSettingTab: (data: string) => void;
}
