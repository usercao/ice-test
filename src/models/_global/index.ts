import { atom } from 'recoil';
import { localStorageEffect } from '../_util/localStorageEffect';
import { LOCALE_THEME, LOCALE_CURRENCY } from '@/config/common';
import { SupportedLocale, DEFAULT_LOCALE, LOCALE_STORAGE } from '@/config/locales';
import { IUserInfo, IIndexConfig } from '@/typings/_global';

export const recoilTheme = atom<'dark' | 'light'>({
  key: 'theme',
  default: 'dark',
  effects_UNSTABLE: [localStorageEffect<string>(LOCALE_THEME)],
});

export const recoilLocale = atom<SupportedLocale>({
  key: 'locale',
  default: DEFAULT_LOCALE,
  effects_UNSTABLE: [localStorageEffect<string>(LOCALE_STORAGE)],
});

export const recoilCurrency = atom<string>({
  key: 'currency',
  default: 'USD',
  effects_UNSTABLE: [localStorageEffect<string>(LOCALE_CURRENCY)],
});

export const recoilUserInfo = atom<IUserInfo | undefined>({
  key: 'userInfo',
  default: undefined,
});

export const recoilIndexConfig = atom<IIndexConfig | undefined>({
  key: 'indexConfig',
  default: undefined,
});

// export const timestamp = atom({
//   key: 'timestamp',
//   default: () => Date.now(),
// });
