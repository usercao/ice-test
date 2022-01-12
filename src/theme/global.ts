import { createGlobalStyle } from 'styled-components';

const styled = { createGlobalStyle };

// fix 无法自动格式化 https://github.com/styled-components/vscode-styled-components/issues/175
export const ThemedGlobalStyle = styled.createGlobalStyle`
  /* fix 滚动条跳动 https://www.zhangxinxu.com/wordpress/2015/01/css-page-scrollbar-toggle-center-no-jumping/ */
  html {
    overflow-y: scroll;
  }
  :root {
    overflow-y: auto;
    overflow-x: hidden;
  }
  :root body {
    position: absolute;
  }
  body {
    width: 100%;
    overflow: hidden;
  }
  /* fix 浏览器默认样式 */
  img {
    display: block;
    outline: none;
  }
  a,
  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
    backface-visibility: hidden;
  }
  /* 全局样式 */
  * {
    box-sizing: border-box;
  }
  html {
    background: rgba(32, 32, 32, 1);
  }
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }
  body,
  input,
  button {
    font-family: 'IBM Plex Sans', sans-serif !important;
    font-weight: 400;
  }
  #root {
    overflow-x: auto;
    overflow-y: hidden;
    /* 隐藏横向滚动条 */
    &::-webkit-scrollbar {
      height: 0;
      background-color: transparent;
    }
  }
  /* 全局滚动条 */
  .scrollbar {
    &::-webkit-scrollbar {
      width: 2px;
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 2px;
    }
    &:hover::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.5442);
    }
  }
  /* 全局消息 */
  .message-root {
    position: fixed;
    top: 0;
    right: 0;
    // left: 0;
    z-index: 2000;
    pointer-events: none;
    padding-top: 48px;
  }
  /* flex */
  .row-start {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .row-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .row-between {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .row-end {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .col-start {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .col-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .col-between {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .col-end {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
  .text-right {
    text-align: right;
  }
  .flex1 {
    flex: 1;
  }
  .mt8 {
    margin-top: 8px;
  }
  .mt16 {
    margin-top: 16px;
  }
  .ph8 {
    padding-left: 8px;
    padding-right: 8px;
  }
  .hide {
    display: none;
  }
  .long {
    color: #24ae64 !important;
  }
  .short {
    color: #d95140 !important;
  }
  .strong {
    color: #ffc412 !important;
  }
  .pointer {
    cursor: pointer;
  }
`;
