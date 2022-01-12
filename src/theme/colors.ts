import { BackgroundColors, BaseColors } from './styled.d';

export const baseColors: BaseColors = {
  primaryColor: '#2697FF', // 全局主色
  linkColor: '', // 链接色
  successColor: '#13CC3E', // 成功色
  warningColor: '', // 警告色
  errorColor: '#C42B1C', // 错误色
  fontSizeBase: '14px', // 主字号
  headingColor: '#929DAE', // 标题色
  textColor: '#FFFFFF', // 主文本色
  textColorSecondary: 'rgba(255, 255, 255, 0.3628)', // 次文本色
  disabledColor: 'rgba(255, 255, 255, 0.0605)', // 失效色
  borderRadiusBase: '12px', // 组件/浮层圆角
  borderColorBase: '#2697FF', // 边框色
  boxShadowBase: '0px 32px 64px rgba(0, 0, 0, 0.37), 0px 2px 21px rgba(0, 0, 0, 0.37)', // 浮层阴影
};

export const backgroundColor: BackgroundColors = {
  bg0: 'rgba(32, 32, 32, 1)',
  bg1: 'rgba(255, 255, 255, 0.0605)',
  bg2: 'rgba(58, 58, 58, 0.3)',
  // bg2: '#242529',
  bg3: 'rgba(0, 0, 0, 0.26)',
};

export const lightColors: BaseColors = {
  ...baseColors,
};

export const darkColors: BaseColors = {
  ...baseColors,
};
