import { DefaultTheme } from 'styled-components';
// import base from './base'
import { darkColors, backgroundColor } from './colors';

const darkTheme: DefaultTheme = {
  // ...base,
  isDark: true,
  colors: darkColors,
  bg: backgroundColor,
};

export default darkTheme;
