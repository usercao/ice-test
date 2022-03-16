import { atom, RecoilState } from 'recoil';
import { localStorageEffect } from '../_util/localStorageEffect';
import { SupportedLocale, DEFAULT_LOCALE, LOCALE_STORAGE } from '@/config/locales';
import { IUserInfo, IIndexConfig } from '@/services/_global/PropsType';

export const locale: RecoilState<SupportedLocale> = atom({
  key: 'locale',
  default: DEFAULT_LOCALE,
  effects_UNSTABLE: [localStorageEffect<string>(LOCALE_STORAGE)],
});

export const userInfo: RecoilState<IUserInfo | undefined> = atom({
  key: 'userInfo',
  default: undefined,
});

export const indexConfig: RecoilState<IIndexConfig | undefined> = atom({
  key: 'indexConfig',
  default: undefined,
});

export const isDark = atom({
  key: 'theme',
  default: false,
});

export const timestamp = atom({
  key: 'timestamp',
  default: () => Date.now(),
});
