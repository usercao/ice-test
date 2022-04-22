import * as React from 'react';
import { createPortal } from 'react-dom';
import { fadeConfig } from '@/config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement } from '../_util/reactNode';
import useRandomId from '@/hooks/useRandomId';
import { useBoolean, useHover, useDebounceEffect } from 'ahooks';
import styled from 'styled-components';

const Trigger = styled(motion.div)`
  position: absolute;
  z-index: 1;
`;

export interface DropdownProps {
  followID?: string;
  placement?: 'left' | 'right';
  overlay?: React.ReactNode;
}

interface TriggerProps extends DropdownProps {
  followRef: React.RefObject<HTMLDivElement>;
  menuID?: string;
  children?: React.ReactNode;
  onClose: (...args: any[]) => any;
}

const Portal: React.FC<TriggerProps> = (props: TriggerProps) => {
  const { followRef, followID, placement = 'left', menuID, children, onClose } = props;
  const DOM = (followID ? document.getElementById(followID) : document.body) as HTMLElement;

  const [position, setPosition] = React.useState<{
    right?: number;
    top: number;
    left?: number;
  }>({ top: 0 });

  React.useEffect(() => {
    if (!followRef.current) return;
    const { offsetTop, offsetHeight, offsetLeft, offsetWidth } = followRef.current;
    const { innerWidth } = window;

    const about = { [`${placement}`]: placement === 'left' ? offsetLeft : innerWidth - (offsetLeft + offsetWidth) };
    const site = { top: offsetTop + offsetHeight };

    setPosition({ ...about, ...site });
  }, [placement, followRef]);

  const memoizedOption = React.useMemo(
    () => (
      <Trigger id={menuID} style={position} onClick={(e) => e.stopPropagation()} {...fadeConfig}>
        {children && cloneElement(children, { onClick: onClose })}
      </Trigger>
    ),
    [menuID, position, children, onClose],
  );

  return createPortal(memoizedOption, DOM);
};

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { overlay } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const followRef = React.createRef<HTMLDivElement>();
  const uuid = useRandomId();

  const [state, { setTrue, setFalse }] = useBoolean(false);

  const dropTrigger = useHover(followRef, { onEnter: setTrue });
  const dropMenu = useHover(() => document.getElementById(uuid), {
    onLeave: setFalse,
  });

  useDebounceEffect(
    () => {
      if (dropTrigger === false && dropMenu === false) setFalse();
    },
    [dropTrigger, dropMenu],
    { wait: 300 },
  );

  return (
    <React.Fragment>
      {overlay && cloneElement(overlay, { ref: followRef })}
      <AnimatePresence>
        {state && <Portal {...props} followRef={followRef} menuID={uuid} onClose={setFalse} />}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Dropdown;
