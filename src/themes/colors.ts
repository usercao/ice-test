import { DefaultTheme } from 'styled-components';

export const darkTheme: DefaultTheme = {
  backgroundColorBase: '#1a1c1e',
  backgroundColorSecond: '#161718',
  backgroundColorDisabled: 'rgba(255, 255, 255, 0.15)',
  menuBackgroundColor: '#292c2f',
  colorHoverOrBackground: 'rgba(255, 255, 255, 0.05)',
  boxShadowBase: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  textBaseColor: 'rgba(255, 255, 255, 0.8)',
  textFirstColor: 'rgba(255, 255, 255, 0.4)',
  textSecondColor: 'rgba(255, 255, 255, 0.6)',
  textThirdColor: 'rgba(255, 255, 255, 0.2)',
  colorFirstAssist: 'rgba(255, 255, 255, 0.1)',
  colorSecondAssist: 'rgba(255, 255, 255, 0.05)',
  colorThirdAssist: 'rgba(255, 255, 255, 0.01)',
  filterBrightness: 'brightness(80%)',
  reverseFirstColor: 'rgba(0, 0, 0, 0.5)',
};

export const lightTheme: DefaultTheme = {
  backgroundColorBase: '#ffffff',
  backgroundColorSecond: '#fafafa',
  backgroundColorDisabled: 'rgba(0, 0, 0, 0.03)',
  menuBackgroundColor: '#ffffff',
  colorHoverOrBackground: 'rgba(0, 0, 0, 0.02)',
  boxShadowBase: '0px 4px 10px rgba(208, 208, 208, 0.5)',
  textBaseColor: 'rgba(0, 0, 0, 0.8)',
  textFirstColor: 'rgba(0, 0, 0, 0.4)',
  textSecondColor: 'rgba(0, 0, 0, 0.6)',
  textThirdColor: 'rgba(0, 0, 0, 0.2)',
  colorFirstAssist: 'rgba(0, 0, 0, 0.1)',
  colorSecondAssist: 'rgba(0, 0, 0, 0.05)',
  colorThirdAssist: 'rgba(0, 0, 0, 0.01)',
  filterBrightness: 'none',
  reverseFirstColor: 'rgba(255, 255, 255, 0.5)',
};
