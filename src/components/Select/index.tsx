import * as React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { fadeConfig } from '@/config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { tuple } from '../_type/type';
import { cloneElement } from '../_util/reactNode';
import Scrollbar from '../Scrollbar';
import { useClickAway } from 'ahooks';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* global */
  font-weight: 500;
  transition: all 0.3s ease-in-out;
  .holder {
    color: rgba(56, 68, 66, 0.4);
    transition: all 0.3s ease-in-out;
  }
  .arrow {
    width: 8px;
    height: 8px;
    svg {
      fill: rgba(0, 0, 0, 0.25);
      transition: all 0.3s ease-in-out;
    }
  }
  &.focus {
    border: 1px solid #06ceab !important;
    svg {
      fill: #06ceab !important;
    }
  }
  /* base */
  &.danger {
    color: #ff7878;
    border: 1px solid #ff7878;
    cursor: pointer;
  }
  &.primary {
    color: #384442;
    border: 1px solid #e8e8e8;
    cursor: pointer;
  }
  &.disabled {
    color: #849a96;
    background: #f1f1f1;
    user-select: none;
    cursor: not-allowed;
  }
  &.sm {
    padding: 8px;
    min-width: 80px;
    height: 30px;
    font-size: 12px;
    border-radius: 4px;
  }
  &.md {
    padding: 10px;
    height: 38px;
    font-size: 12px;
    border-radius: 5px;
  }
  &.lg {
    padding: 12px;
    height: 42px;
    font-size: 16px;
    border-radius: 6px;
  }
`;

const Trigger = styled(motion.div)`
  /* global */
  position: absolute;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  box-shadow: 0px 4px 10px rgba(208, 208, 208, 0.5);
  overflow: hidden;
  z-index: 1;
  .ms-container {
    max-height: 20vh;
  }
  li {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: #fafafa;
    }
  }
  /* base */
  &.sm {
    border-radius: 4px;
    li {
      padding: 8px;
      height: 30px;
      font-size: 12px;
    }
  }
  &.md {
    border-radius: 5px;
    li {
      padding: 10px;
      height: 38px;
      font-size: 12px;
    }
  }
  &.lg {
    border-radius: 6px;
    li {
      padding: 12px;
      height: 42px;
      font-size: 16px;
    }
  }
`;

const SelectTypes = tuple('danger', 'primary');

type SelectType = typeof SelectTypes[number];

type SizeType = 'sm' | 'md' | 'lg';

export interface SelectProps {
  className?: string;
  triggerClassName?: string;
  type?: SelectType;
  size?: SizeType;
  disabled?: boolean;
  followID?: string;
  followWidth?: number;
  placeholder?: string;
  overlay?: React.ReactNode;
}

interface TriggerProps extends SelectProps {
  followRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  onClose: (...args: any[]) => any;
}

const Portal: React.FC<TriggerProps> = (props: TriggerProps) => {
  const {
    triggerClassName,
    followID,
    followRef,
    followWidth,
    type = 'primary',
    size = 'md',
    children,
    onClose,
  } = props;

  const DOM = (followID ? document.getElementById(followID) : document.body) as HTMLElement;

  const classes = classNames(triggerClassName, 'row-between', {
    [`${type}`]: type,
    [`${size}`]: size,
  });

  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
    width: number;
  }>({ top: 0, left: 0, width: 160 });

  React.useEffect(() => {
    if (!followRef.current) return;
    const { offsetTop, offsetHeight, offsetLeft, offsetWidth } = followRef.current;
    const site = { top: offsetTop + offsetHeight + 4, left: offsetLeft, width: followWidth || offsetWidth };
    setPosition(site);
  }, [followWidth, followRef]);

  const memoizedOption = React.useMemo(
    () => (
      <Trigger className={classes} style={position} onClick={(e) => e.stopPropagation()} {...fadeConfig}>
        <Scrollbar
          trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0 })}
          thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 3 })}
          trackGap={[4, 4, 4, 4]}
        >
          {children && cloneElement(children, { onClick: onClose })}
        </Scrollbar>
      </Trigger>
    ),
    [classes, position, children, onClose],
  );
  useClickAway(() => onClose?.(), followRef);

  return createPortal(memoizedOption, DOM);
};

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const { className, type = 'primary', size = 'md', disabled = false, placeholder, overlay } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const followRef = React.createRef<HTMLDivElement>();

  // React.useEffect(() => {
  //   if (!followRef || !followRef.current) {
  //     return;
  //   }
  // }, [followRef]);

  const [visible, setVisible] = React.useState<boolean>(false);

  const classes = classNames(className, 'row-between', {
    [`${type}`]: type,
    [`${size}`]: size,
    focus: visible,
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
        {overlay ? cloneElement(overlay) : <span className="holder">{placeholder}</span>}
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
