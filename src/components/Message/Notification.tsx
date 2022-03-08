import React from 'react';
import { NotificationProps, NotificationIcon } from './PropsType';
import styled, { keyframes } from 'styled-components/macro';
import {
  ColorIconToastNor as IconToastInfo,
  ColorIconToastLoading as IconToastLoading,
  ColorIconToastSuccess as IconToastSuccess,
  ColorIconToastFail as IconToastFail,
  ColorIconToastWarning as IconToastWarning,
} from 'apex-icon/color';

const Wrapper = styled.div`
  /* margin: 0 auto; */
  margin: 18px 18px 0 0;
  .inner {
    align-items: flex-start;
    padding: 12px;
    width: 372px;
    background: rgba(252, 252, 252, 0.85);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.14);
    backdrop-filter: blur(240px);
    border-radius: 7px;
    /* .icon {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      i {
        font-size: 14px;
        font-weight: bold;
      }
      &.info {
        color: rgba(47, 84, 235, 1);
        background: #d6e4ff;
      }
      &.warning {
        color: rgba(238, 149, 0, 1);
        background: #fef7ea;
      }
      &.success {
        color: rgba(37, 191, 96, 1);
        background: #e7f8f0;
      }
      &.error {
        color: rgba(245, 79, 78, 1);
        background: rgba(255, 242, 242, 1);
      }
    } */
    img {
      margin-right: 14px;
      width: 20px;
      height: 20px;
    }
    .text {
      flex: 1;
      h2 {
        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        color: rgba(0, 0, 0, 0.8956);
      }
      p {
        font-size: 14px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.8956);
        word-break: break-all;
      }
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotateImg = styled.div`
  animation: ${rotate} 5s linear infinite;
`;

function getIcon(icon: NotificationIcon | React.ReactElement | undefined) {
  switch (icon) {
    case 'info':
      return <IconToastInfo size={21.5} />;
    case 'warning':
      return <IconToastWarning size={21.5} />;
    case 'success':
      return <IconToastSuccess size={21.5} />;
    case 'error':
      return <IconToastFail size={21.5} />;
    case 'loading':
      return (
        <RotateImg>
          <IconToastLoading size={21.5} />
        </RotateImg>
      );
    default:
      return null;
  }
}

function getText(icon: NotificationIcon | React.ReactElement) {
  switch (icon) {
    case 'info':
      return 'Information';
    case 'warning':
      return 'Warning';
    case 'success':
      return 'Success';
    case 'error':
      return 'Failure';
    case 'loading':
      return 'Transaction submitted';
  }
}

export class Notification extends React.Component<NotificationProps, {}> {
  static defaultProps: NotificationProps = {
    content: '',
  };

  render() {
    const { icon, content, onMouseEnter, onMouseLeave, onClick } = this.props;

    const iconToText = icon ? getText(icon) : null;

    return (
      <Wrapper className={`row-end`.trimEnd()} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <div className="inner row-start">
          {/* <div className={`icon col-center ${icon}`}>
            <i className={`iconfont ${iconToRender}`} />
          </div> */}
          {getIcon(icon)}
          <div className="text" style={{ marginLeft: '13px' }}>
            <h2>{iconToText}</h2>
            <p onClick={onClick}>{content}</p>
          </div>
          {/* <div onClick={onClose}>close</div> */}
        </div>
      </Wrapper>
    );
  }
}

export default Notification;
