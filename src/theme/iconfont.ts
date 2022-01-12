import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

// fix 无法自动格式化 https://github.com/styled-components/vscode-styled-components/issues/175
export const IconGlobalStyle = styled.createGlobalStyle`
  @font-face {
    font-family: 'iconfont';
    src: url(${require('@/assets/icons/iconfont.ttf')}) format('truetype');
  }

  .iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-arrow_right:before {
    content: '\\e643';
  }

  .icon-close:before {
    content: '\\e642';
  }

  .icon-help:before {
    content: '\\e640';
  }

  .icon-bell:before {
    content: '\\e641';
  }

  .icon-plus:before {
    content: '\\e63a';
  }

  .icon-minus:before {
    content: '\\e63b';
  }

  .icon-arrow_select:before {
    content: '\\e63c';
  }

  .icon-search:before {
    content: '\\e638';
  }

  .icon-arrow_down:before {
    content: '\\e639';
  }

  .icon-loading:before {
    content: '\\e61c';
  }
`;
