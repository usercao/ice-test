/* eslint-disable @typescript-eslint/no-empty-interface */
import {} from 'styled-components';

export interface ThemeType {
  backgroundColorBase: string;
  backgroundColorSecond: string;
  backgroundColorDisabled: string;
  menuBackgroundColor: string;
  colorHoverOrBackground: string;
  boxShadowBase: string;
  textBaseColor: string;
  textFirstColor: string;
  textSecondColor: string;
  textThirdColor: string;
  colorFirstAssist: string;
  colorSecondAssist: string;
  colorThirdAssist: string;
  filterBrightness: string;
  reverseFirstColor: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}
