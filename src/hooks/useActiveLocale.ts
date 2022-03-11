import * as React from 'react';
import { SupportedLocale, DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/config/locales';
import { useRecoilValue } from 'recoil';
import { locale } from '@/models/_global';

function parseLocale(maybeSupportedLocale: string): SupportedLocale | undefined {
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase();
  return SUPPORTED_LOCALES.find(
    (ele: string) => ele.toLowerCase() === lowerMaybeSupportedLocale || ele.split('-')[0] === lowerMaybeSupportedLocale,
  );
}

export function navigatorLocale(): SupportedLocale | undefined {
  if (!navigator.language) return undefined;
  const [language, region] = navigator.language.split('-');
  if (region) {
    return parseLocale(`${language}-${region.toUpperCase()}`) ?? parseLocale(language);
  }
  return parseLocale(language);
}

export function useActiveLocale(): SupportedLocale {
  const userLocale = useRecoilValue(locale);
  return React.useMemo(() => {
    return userLocale ?? navigatorLocale() ?? DEFAULT_LOCALE;
  }, [userLocale]);
}
