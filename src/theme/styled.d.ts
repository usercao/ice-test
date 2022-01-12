export type Color = string;

export type BaseColors = {
  primaryColor: string;
  linkColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  fontSizeBase: string;
  headingColor: string;
  textColor: string;
  textColorSecondary: string;
  disabledColor: string;
  borderRadiusBase: string;
  borderColorBase: string;
  boxShadowBase: string;
};

export interface BackgroundColors {
  bg0: Color;
  bg1: Color;
  bg2: Color;
  bg3: Color;
}

export interface Colors {
  colors: BaseColors;
  bg: BackgroundColors;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Colors {
    isDark: boolean;
  }
}

export type Breakpoints = string[];

export type MediaQueries = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  nav: string;
};

export type Spacing = number[];

export type Radii = {
  small: string;
  default: string;
  card: string;
  circle: string;
};

export type Shadows = {
  level1: string;
  active: string;
  success: string;
  warning: string;
  focus: string;
  inset: string;
};

export type Gradients = {
  bubblegum: string;
  inverseBubblegum: string;
  cardHeader: string;
  blue: string;
  violet: string;
  violetAlt: string;
  gold: string;
};

export type ZIndices = {
  dropdown: number;
  modal: number;
};
