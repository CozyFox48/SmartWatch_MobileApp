import i18n from 'i18n-js';
export * from './components';
export * from './theme';

export interface INewDevice {
  name: string;
  uuid: number;
  strength: number;
}

export interface IDevice {
  name: string;
  connection:boolean;
  uuid: number;
  strength: number;
}

export interface ITranslate {
  locale: string;
  setLocale: (locale?: string) => void;
  t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
  translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
}

export interface IUseData {
  newDevices: INewDevice[];
  handleNewDevices: (data: INewDevice[]) => void;
  devices: IDevice[];
  handleDevices: (data: IDevice[]) => void;
  detailDevice:string, 
  setDetailDevice:(data: string) => void;
}
