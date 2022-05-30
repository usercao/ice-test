import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

// fix 无法自动格式化 https://github.com/styled-components/vscode-styled-components/issues/175
export const IconfontStyle = styled.createGlobalStyle`
  @font-face {
    font-family: 'iconfont';
    src: url(${require('@/assets/icons/iconfont.woff2')}) format('woff2');
  }

  .iconfont {
    font-family: 'iconfont' !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-idcard:before {
    content: '\\e664';
  }

  .icon-passport:before {
    content: '\\e665';
  }

  .icon-drive:before {
    content: '\\e663';
  }

  .icon-stable:before {
    content: '\\e61f';
  }

  .icon-grid:before {
    content: '\\e615';
  }

  .icon-spot:before {
    content: '\\e614';
  }

  .icon-earn:before {
    content: '\\e613';
  }

  .icon-p2p:before {
    content: '\\e612';
  }

  .icon-quick:before {
    content: '\\e611';
  }

  .icon-plus:before {
    content: '\\e60c';
  }

  .icon-minus:before {
    content: '\\e60d';
  }

  .icon-download:before {
    content: '\\e661';
  }

  .icon-arrow-left:before {
    content: '\\e65f';
  }

  .icon-arrow-right:before {
    content: '\\e660';
  }

  .icon-key:before {
    content: '\\e65d';
  }

  .icon-level:before {
    content: '\\e65b';
  }

  .icon-copy:before {
    content: '\\e750';
  }

  .icon-back:before {
    content: '\\e659';
  }

  .icon-search:before {
    content: '\\e658';
  }

  .icon-light:before {
    content: '\\e657';
  }

  .icon-dark:before {
    content: '\\e74f';
  }

  .icon-select-confirm:before {
    content: '\\e606';
  }

  .icon-select-cancel:before {
    content: '\\e607';
  }

  .icon-discord:before {
    content: '\\e624';
  }

  .icon-linkedin:before {
    content: '\\e625';
  }

  .icon-twitter:before {
    content: '\\e626';
  }

  .icon-telegram:before {
    content: '\\e627';
  }

  .icon-facebook:before {
    content: '\\e629';
  }

  .icon-instagram:before {
    content: '\\e88f';
  }

  .icon-phone:before {
    content: '\\e747';
  }

  .icon-user:before {
    content: '\\e748';
  }

  .icon-bell:before {
    content: '\\e74a';
  }

  .icon-logout:before {
    content: '\\e74b';
  }

  .icon-user-referral:before {
    content: '\\e737';
  }

  .icon-user-interface:before {
    content: '\\e72f';
  }

  .icon-user-identity:before {
    content: '\\e72d';
  }

  .icon-user-security:before {
    content: '\\e72e';
  }

  .icon-eye-hide:before {
    content: '\\e741';
  }

  .icon-eye-show:before {
    content: '\\e742';
  }

  .icon-info:before {
    content: '\\e743';
  }

  .icon-warning:before {
    content: '\\e744';
  }

  .icon-success:before {
    content: '\\e745';
  }

  .icon-error:before {
    content: '\\e746';
  }
`;
