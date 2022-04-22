import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { recoilTheme } from '@/models/_global';
import { ThemeProvider as Provider } from 'styled-components';
import { darkTheme, lightTheme } from './colors';
import { cloneElement } from '@/components/_util/reactNode';
import { GlobalStyle } from '@/assets/styles/global';
import { IconfontStyle } from '@/assets/styles/iconfont';

const LOCALE_THEMES = { dark: darkTheme, light: lightTheme };

const ThemeProvider: React.FC = ({ children }: { children: React.ReactNode }) => {
  const localeTheme = useRecoilValue(recoilTheme);

  return (
    <Provider theme={LOCALE_THEMES[localeTheme]}>
      <GlobalStyle />
      <IconfontStyle />
      {cloneElement(children)}
    </Provider>
  );
};

export default ThemeProvider;
