import * as React from 'react';
import { createPortal } from 'react-dom';
import { fadeConfig } from '../../config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { RemoveScroll } from 'react-remove-scroll';
import { cloneElement } from '../_util/reactNode';
import { Scrollbar, Button } from '../index';
import styled from 'styled-components';

const PortalWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 999999;
  > .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-height: 80vh;
    background: #ffffff;
    background: ${(props) => props.theme.backgroundColorBase};
    box-shadow: ${(props) => props.theme.boxShadowBase};
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    .header {
      padding: 0 8px;
      height: 54px;
      border-bottom: 1px solid ${(props) => props.theme.colorSecondAssist};
      transition: all 0.3s ease-in-out;
      h4 {
        flex: 1;
        padding-left: 24px;
        text-align: center;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        color: ${(props) => props.theme.textBaseColor};
        transition: all 0.3s ease-in-out;
      }
      .clear {
        padding: 6px;
        font-size: 12px;
        font-weight: bold;
        color: ${(props) => props.theme.textFirstColor};
        border-radius: 50%;
        user-select: none;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: #06ceab;
          background: rgba(6, 206, 171, 0.1);
        }
      }
    }
    .content {
      .ms-container {
        max-height: calc(80vh - 152px);
      }
    }
    .footer {
      padding: 20px 20px 36px 20px;
      button + button {
        margin-left: 32px;
      }
    }
  }
`;

export interface ModalProps {
  className?: string;
  visible?: boolean;
  title?: React.ReactNode;
  closable?: boolean;
  cancel?: React.ReactNode;
  ok?: React.ReactNode;
  children?: React.ReactNode;
  onCancel?: (...args: any[]) => any;
  onOk?: (...args: any[]) => any;
}

const Portal: React.FC<ModalProps> = (props: ModalProps) => {
  const { className, title, closable = true, cancel, ok, children, onCancel, onOk, ...rest } = props;

  const handleCancel = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
      onCancel?.(e);
    },
    [onCancel],
  );

  const handleOk = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onOk?.(e);
    },
    [onOk],
  );

  const renderHeader = React.useMemo(() => {
    if (!title && !closable) return null;
    return (
      <div className="header row-between">
        <h4>{title}</h4>
        {closable && <i className="iconfont icon-select-cancel clear" onClick={handleCancel} />}
      </div>
    );
  }, [title, closable, handleCancel]);

  const renderFooter = React.useMemo(() => {
    if (!cancel && !ok) return null;
    return (
      <div className="footer row-between">
        {cancel && (
          <Button type="solid" size="lg" onClick={handleCancel}>
            {cancel}
          </Button>
        )}
        {ok && (
          <Button size="lg" {...rest} onClick={handleOk}>
            {ok}
          </Button>
        )}
      </div>
    );
  }, [cancel, ok, handleCancel, handleOk, rest]);

  const memoizedOption = React.useMemo(
    () => (
      <RemoveScroll>
        <PortalWrapper className={className} {...fadeConfig}>
          <div className="inner">
            {renderHeader}
            <div className="content">
              <Scrollbar
                trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0 })}
                thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 3 })}
                trackGap={[4, 4, 4, 4]}
              >
                {children && cloneElement(children)}
              </Scrollbar>
            </div>
            {renderFooter}
          </div>
        </PortalWrapper>
      </RemoveScroll>
    ),
    [className, renderHeader, children, renderFooter],
  );

  return createPortal(memoizedOption, document.body);
};

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
  const { visible = false } = props;

  return <AnimatePresence>{visible && <Portal {...props} />}</AnimatePresence>;
};

export default Modal;
