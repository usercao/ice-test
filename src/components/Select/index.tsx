import * as React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { fadeConfig } from '@/config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement } from '../_util/reactNode';
import Scrollbar from '../Scrollbar';
import { useClickAway } from 'ahooks';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* global */
  font-weight: 500;
  color: ${(props) => props.theme.textBaseColor};
  border: 1px solid ${(props) => props.theme.colorFirstAssist};
  transition: all 0.3s ease-in-out;
  > .placeholder {
    color: ${(props) => props.theme.textFirstColor};
    transition: all 0.3s ease-in-out;
  }
  > .arrow {
    width: 8px;
    height: 8px;
    svg {
      fill: ${(props) => props.theme.textFirstColor};
      transition: all 0.3s ease-in-out;
    }
  }
  &:not(.danger, .disabled).hidden {
    border: 1px solid #06ceab;
    svg {
      fill: #06ceab;
    }
  }
  &:not(.danger, .disabled):hover {
    border: 1px solid #06ceab;
    cursor: pointer;
  }
  /* base */
  &.danger {
    color: #ff7878;
    border: 1px solid #ff7878;
    svg {
      fill: #ff7878;
    }
  }
  &.disabled {
    color: ${(props) => props.theme.textThirdColor};
    background: ${(props) => props.theme.colorSecondAssist};
    user-select: none;
    cursor: not-allowed;
    transition: all 0.3s ease-in-out;
  }
  &.sm {
    padding: 0 8px;
    min-width: 80px;
    height: 30px;
    font-size: 12px;
    border-radius: 4px;
  }
  &.md {
    padding: 0 10px;
    height: 38px;
    font-size: 12px;
    border-radius: 5px;
  }
  &.lg {
    padding: 0 12px;
    height: 42px;
    font-size: 16px;
    border-radius: 6px;
  }
`;

const Trigger = styled(motion.div)`
  /* global */
  position: absolute;
  background: ${(props) => props.theme.menuBackgroundColor};
  box-shadow: ${(props) => props.theme.boxShadowBase};
  border: 1px solid ${(props) => props.theme.colorFirstAssist};
  overflow: hidden;
  z-index: 1;
  transition: background-color box-shadow border 0.3s ease-in-out;
  .ms-container {
    max-height: 20vh;
  }
  li {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: ${(props) => props.theme.colorHoverOrBackground};
    }
  }
  /* base */
  &.sm {
    border-radius: 4px;
    li {
      padding: 0 8px;
      height: 30px;
      line-height: 30px;
      font-size: 12px;
    }
  }
  &.md {
    border-radius: 5px;
    li {
      padding: 0 10px;
      height: 38px;
      line-height: 38px;
      font-size: 12px;
    }
  }
  &.lg {
    border-radius: 6px;
    li {
      padding: 0 12px;
      height: 42px;
      line-height: 42px;
      font-size: 16px;
    }
  }
`;

type SizeType = 'sm' | 'md' | 'lg';

export interface SelectProps {
  className?: string;
  size?: SizeType;
  danger?: boolean;
  disabled?: boolean;
  placeholder?: string;
  followID?: string;
  followWidth?: number;
  followHeight?: number;
  overlay?: React.ReactNode;
  matchRender?: React.ReactNode;
}

interface TriggerProps extends SelectProps {
  followRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  onClose: (...args: any[]) => any;
}

interface PositionOptions {
  top: number;
  left: number;
  width: number;
  height?: number;
}

const Portal: React.FC<TriggerProps> = (props: TriggerProps) => {
  const { followRef, followID, followWidth, followHeight, size = 'md', matchRender, children, onClose } = props;
  const DOM = (followID ? document.getElementById(followID) : document.body) as HTMLElement;

  const [position, setPosition] = React.useState<PositionOptions>({ top: 0, left: 0, width: 160 });

  React.useEffect(() => {
    if (!followRef.current) return;
    const { offsetTop, offsetHeight, offsetLeft, offsetWidth } = followRef.current;
    const site: PositionOptions = {
      top: offsetTop + offsetHeight + 4,
      left: offsetLeft,
      width: followWidth || offsetWidth,
    };
    if (followHeight) site.height = followHeight;

    setPosition(site);
  }, [followWidth, followHeight, followRef]);

  const memoizedOption = React.useMemo(
    () => (
      <Trigger
        className={classNames({ [`${size}`]: size })}
        style={position}
        onClick={(e) => e.stopPropagation()}
        {...fadeConfig}
      >
        <Scrollbar
          trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0 })}
          thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 3 })}
          trackGap={[4, 4, 4, 4]}
        >
          {matchRender}
          {children && cloneElement(children, { onClick: onClose })}
        </Scrollbar>
      </Trigger>
    ),
    [size, position, matchRender, children, onClose],
  );
  useClickAway(() => onClose?.(), followRef);

  return createPortal(memoizedOption, DOM);
};

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const { className, size = 'md', danger = false, disabled = false, placeholder, overlay } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const followRef = React.createRef<HTMLDivElement>();

  // React.useEffect(() => {
  //   if (!followRef || !followRef.current) {
  //     return;
  //   }
  // }, [followRef]);

  const [visible, setVisible] = React.useState<boolean>(false);

  const classes = classNames(className, 'row-between', {
    [`${size}`]: size,
    hidden: visible,
    danger,
    disabled,
  });

  const handleOpen: React.MouseEventHandler<HTMLDivElement> = () => {
    if (disabled) return;
    setVisible(true);
  };

  const handleClose: React.MouseEventHandler<HTMLDivElement> = () => {
    if (disabled) return;
    setVisible(false);
  };

  return (
    <React.Fragment>
      <Wrapper className={classes} ref={followRef} onClick={handleOpen}>
        {overlay ? cloneElement(overlay) : <span className="placeholder">{placeholder}</span>}
        <div className="arrow row-center">
          <svg width="8" height="5" viewBox="0 0 8 5" style={{ transform: `rotateZ(${visible ? -180 : 0}deg)` }}>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line
              d="M0.707105 1.70711C0.0771402 1.07714 0.523309 0 1.41421 0H6.58579C7.47669 0 7.92286 1.07714 7.29289 1.70711L4.70711 4.29289C4.31658 4.68342 3.68342 4.68342 3.29289 4.29289L0.707105 1.70711Z"
            />
          </svg>
        </div>
      </Wrapper>
      <AnimatePresence>{visible && <Portal {...props} followRef={followRef} onClose={handleClose} />}</AnimatePresence>
    </React.Fragment>
  );
};

export default Select;
