import { DefaultTheme } from 'styled-components';

// import base from './base'
import { lightColors, backgroundColor } from './colors';

const lightTheme: DefaultTheme = {
  // ...base,
  isDark: false,
  colors: lightColors,
  bg: backgroundColor,
};

export default lightTheme;
