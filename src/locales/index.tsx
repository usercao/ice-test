import * as React from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { SupportedLocale } from '@/config/locales';
import { useActiveLocale } from '@/hooks/useActiveLocale';
import { en, es, pt, PluralCategory } from 'make-plural/plurals';
import { useSetRecoilState } from 'recoil';
import { recoilLocale } from '@/models/_global';

type LocalePlural = {
  [key in SupportedLocale]: (n: number | string, ord?: boolean) => PluralCategory;
};

const plurals: LocalePlural = { 'en-US': en, 'es-ES': es, 'pt-PT': pt };

async function dynamicActivate(locale: SupportedLocale) {
  const { messages } = await import(`./${locale}/index.ts`);
  i18n.loadLocaleData(locale, { plurals: () => plurals[locale] });
  i18n.load(locale, messages);
  i18n.activate(locale);
}

const I18n: React.FC = ({ children }: { children: React.ReactNode }) => {
  const locale = useActiveLocale();
  const [loadLocale, setLoadLocale] = React.useState(false);
  const setLocaleModel = useSetRecoilState(recoilLocale);

  const handleDynamicActivate = React.useCallback(async () => {
    try {
      await dynamicActivate(locale);
      setLocaleModel(locale);
      setLoadLocale(true);
    } catch (error) {
      console.error('Failed to activate locale', locale, error);
    }
  }, [locale, setLocaleModel]);

  React.useEffect(() => {
    if (!locale) return;
    handleDynamicActivate();
  }, [locale, handleDynamicActivate]);

  if (!loadLocale) return null;
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default I18n;
