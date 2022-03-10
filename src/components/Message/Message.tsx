import * as React from 'react';
import { NotificationProps } from './PropsType';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  #stack-dom {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 0;
    z-index: 999999;
  }
`;

const Wrapper = styled.div`
  margin: 24px auto 0 auto;
  padding: 20px;
  width: max-content;
  max-width: 40vw;
  background: #ffffff;
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 9px 28px rgba(0, 0, 0, 0.05), 0px 12px 48px rgba(0, 0, 0, 0.03);
  border-radius: 6px;
  i {
    margin-right: 8px;
    font-size: 14px;
  }
  span {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #384442;
  }
  .icon-success {
    color: #06ceab;
  }
  .icon-warning {
    color: #ffb795;
  }
  .icon-info {
    color: #68aeff;
  }
  .icon-error {
    color: #ff7878;
  }
`;

const Message: React.FC<NotificationProps> = React.forwardRef((props: NotificationProps, ref) => {
  const { icon, content, onMouseEnter, onMouseLeave, onClose } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const messageRef = (ref as any) || React.createRef<HTMLDivElement>();

  // React.useEffect(() => {
  //   if (!messageRef || !messageRef.current) {
  //     return;
  //   }
  // }, [messageRef]);

  return (
    <React.Fragment>
      <GlobalStyle />
      <Wrapper ref={messageRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <i className={`iconfont icon-${icon}`} />
        <span>{content}</span>
      </Wrapper>
    </React.Fragment>
  );
});

export default Message;
