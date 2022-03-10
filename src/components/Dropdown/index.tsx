import * as React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { fadeConfig } from '@/config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { tuple } from '../_type/type';
import { cloneElement } from '../_util/reactNode';
import Scrollbar from '../Scrollbar';
import { useHover, useClickAway } from 'ahooks';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* global */
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
`;

const DropdownTypes = tuple('danger', 'primary');

type DropdownType = typeof DropdownTypes[number];

type SizeType = 'sm' | 'md' | 'lg';

export interface DropdownProps {
  className?: string;
  triggerClassName?: string;
  type?: DropdownType;
  size?: SizeType;
  disabled?: boolean;
  followID?: string;
  followWidth?: number;
  placeholder?: string;
  overlay?: React.ReactNode;
}

interface TriggerProps extends DropdownProps {
  followRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  onOpen: (...args: any[]) => any;
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

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { disabled = false, overlay } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const followRef = React.createRef<HTMLDivElement>();

  // React.useEffect(() => {
  //   if (!followRef || !followRef.current) {
  //     return;
  //   }
  // }, [followRef]);

  const isHovering = useHover(followRef);
  console.log(isHovering);

  const [visible, setVisible] = React.useState<boolean>(false);

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
      <Wrapper ref={followRef}>{cloneElement(overlay)}</Wrapper>
      <AnimatePresence>
        {visible && <Portal {...props} followRef={followRef} onOpen={handleOpen} onClose={handleClose} />}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Dropdown;
