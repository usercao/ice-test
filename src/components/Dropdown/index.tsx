import * as React from 'react';
import { createPortal } from 'react-dom';
import { fadeConfig } from '@/config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement } from '../_util/reactNode';
import useRandomId from '@/hooks/useRandomId';
import { useHover, useDebounceEffect } from 'ahooks';
import styled from 'styled-components';

const Trigger = styled(motion.div)`
  position: absolute;
  background: #ffffff;
  border: 1px solid #e8e8e8;
  box-shadow: 0px 4px 10px rgba(208, 208, 208, 0.5);
  overflow: hidden;
  z-index: 1;
`;

export interface DropdownProps {
  followID?: string;
  followWidth?: number;
  overlay?: React.ReactNode;
  onChange?: (...args: any[]) => any;
}

interface TriggerProps extends DropdownProps {
  followRef: React.RefObject<HTMLDivElement>;
  children?: React.ReactNode;
  onClose: (...args: any[]) => any;
}

const Portal: React.FC<TriggerProps> = (props: TriggerProps) => {
  const { followRef, followWidth, children, onClose } = props;

  const [position, setPosition] = React.useState<{
    top: number;
    left: number;
    width: number;
  }>({ top: 0, left: 0, width: 160 });

  React.useEffect(() => {
    if (!followRef.current) return;
    const { offsetTop, offsetHeight, offsetLeft, offsetWidth } = followRef.current;
    const site = { top: offsetTop + offsetHeight, left: offsetLeft, width: followWidth || offsetWidth };
    setPosition(site);
  }, [followWidth, followRef]);

  const memoizedOption = React.useMemo(
    () => (
      <Trigger id="hover-dom" style={position} onClick={(e) => e.stopPropagation()} {...fadeConfig}>
        {children && cloneElement(children, { onClick: onClose })}
      </Trigger>
    ),
    [position, children, onClose],
  );

  return createPortal(memoizedOption, document.body as HTMLElement);
};

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const { overlay } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const followRef = React.createRef<HTMLDivElement>();
  const uuid = useRandomId();

  const [visible, setVisible] = React.useState<boolean>(false);

  const handleClose: React.MouseEventHandler<HTMLElement> = () => {
    setVisible(false);
  };

  const dropTrigger = useHover(followRef, { onEnter: () => setVisible(true) });

  const dropMenu = useHover(() => document.getElementById('hover-dom'), {
    onLeave: () => setVisible(false),
  });

  useDebounceEffect(() => {
    if (dropTrigger === false && dropMenu === false) {
      setVisible(false);
    }
  }, [dropTrigger, dropMenu]);

  return (
    <React.Fragment>
      <div ref={followRef}>{overlay && cloneElement(overlay)}</div>
      <AnimatePresence>{visible && <Portal {...props} followRef={followRef} onClose={handleClose} />}</AnimatePresence>
    </React.Fragment>
  );
};

export default Dropdown;
