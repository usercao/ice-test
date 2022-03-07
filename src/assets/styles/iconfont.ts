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

  .icon-phone:before {
    content: '\\e64d';
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

  .icon-hide:before {
    content: '\\e741';
  }

  .icon-show:before {
    content: '\\e742';
  }

  .icon-kyc_level:before {
    content: '\\e64b';
  }

  .icon-icon_prev:before {
    content: '\\e739';
  }

  .icon-icon_next_super:before {
    content: '\\e73a';
  }

  .icon-icon_prev_super:before {
    content: '\\e73b';
  }

  .icon-icon_next:before {
    content: '\\e73c';
  }

  .icon-date_new:before {
    content: '\\e60b';
  }

  .icon-new_back:before {
    content: '\\e647';
  }

  .icon-user_4:before {
    content: '\\e737';
  }

  .icon-user_2:before {
    content: '\\e72d';
  }

  .icon-user_1:before {
    content: '\\e72e';
  }

  .icon-user_3:before {
    content: '\\e72f';
  }

  .icon-fire:before {
    content: '\\e601';
  }

  .icon-arrow-right:before {
    content: '\\e603';
  }

  .icon-arrow-left:before {
    content: '\\e604';
  }

  .icon-arrow-down-filling:before {
    content: '\\e600';
  }

  .icon-select:before {
    content: '\\e606';
  }

  .icon-close1:before {
    content: '\\e607';
  }

  .icon-search:before {
    content: '\\e608';
  }

  .icon-prompt-filling:before {
    content: '\\e609';
  }

  .icon-arrow-up-filling:before {
    content: '\\e60a';
  }

  .icon-Transfer:before {
    content: '\\e605';
  }

  .icon-copy:before {
    content: '\\e74a';
  }

  .icon-warning1:before {
    content: '\\e682';
  }

  .icon-down:before {
    content: '\\e662';
  }

  .icon-annverclose:before {
    content: '\\e83a';
  }

  .icon-bank_delete:before {
    content: '\\e62d';
  }

  .icon-bank_edit:before {
    content: '\\e62e';
  }

  .icon-question:before {
    content: '\\e62c';
  }

  .icon-date:before {
    content: '\\e602';
  }

  .icon-add:before {
    content: '\\e62b';
  }

  .icon-close:before {
    content: '\\e62a';
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

  .icon-instagram:before {
    content: '\\e628';
  }

  .icon-facebook:before {
    content: '\\e629';
  }

  .icon-back:before {
    content: '\\e620';
  }

  .icon-check:before {
    content: '\\e7fc';
  }

  .icon-down_arrow:before {
    content: '\\e61d';
  }

  .icon-close_eye:before {
    content: '\\e61e';
  }

  .icon-open_eye:before {
    content: '\\e61f';
  }

  .icon-loading:before {
    content: '\\e61c';
  }

  .icon-header_8:before {
    content: '\\e61b';
  }

  .icon-header_2:before {
    content: '\\e615';
  }

  .icon-header_5:before {
    content: '\\e616';
  }

  .icon-header_4:before {
    content: '\\e618';
  }

  .icon-header_6:before {
    content: '\\e619';
  }

  .icon-header_3:before {
    content: '\\e61a';
  }

  .icon-header_1:before {
    content: '\\e614';
  }
`;
