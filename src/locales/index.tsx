import * as React from 'react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';

// import { messages as enMessages } from '@/locales/en-US/messages';
// import { messages as csMessages } from '@/locales/zh-CN/messages';

// i18n.load({
//   'en-US': enMessages,
//   'zh-CN': csMessages,
// });
// i18n.activate('en-US');
// export const locales = {
//   en: 'English',
//   es: '',
//   pt: '',
//   zh: '',
// };
// export const defaultLocale = 'en';

export async function dynamicActivate(locale: string) {
  const { messages } = await import(`./${locale}/index.ts`);
  i18n.load({ [locale]: messages });
  i18n.activate(locale);
}

const I18n: React.FC = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    dynamicActivate('zh-CN');
    // handleI18n('zh-CN');
  }, []);
  // handleI18n('zh-CN');

  // forceRenderOnLocaleChange={false}
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};

export default I18n;
