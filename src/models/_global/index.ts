import { atom } from 'recoil';
import { localStorageEffect } from '../_util/localStorageEffect';
import { LOCALE_THEME } from '@/config/common';
import { SupportedLocale, DEFAULT_LOCALE, LOCALE_STORAGE } from '@/config/locales';

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
