import { getCookieLan } from '@/utils/tools';

export const SUPPORTED_LOCALES = ['en-US', 'es-ES', 'pt-PT'];

export type SupportedLocale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: SupportedLocale = getCookieLan();

export const LOCALE_STORAGE = 'ice_locale';

export const LOCALE_LABEL: { [locale in SupportedLocale]: string } = {
  'en-US': 'English',
  'es-ES': 'Español',
  'pt-PT': 'Português',
};
