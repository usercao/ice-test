import * as React from 'react';
import { createPortal } from 'react-dom';
import { fadeConfig } from '../../config/motion';
import { AnimatePresence, motion } from 'framer-motion';
import { cloneElement } from '../_util/reactNode';
import styled, { createGlobalStyle } from 'styled-components';
import { useHover } from 'ahooks';

const TooltipGlobalStyle = createGlobalStyle`
  .tooltip {
    position: relative;
    cursor: help;
  }
  .dashed::after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 1px dashed rgba(255, 255, 255, 0.365);
  }
`;

const PortalWrapper = styled(motion.div)<{ width: number }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1200;
  .inner {
    position: absolute;
    width: ${(props) => props.width}px;
    .core {
      position: relative;
      padding: 10px;
      background: rgba(252, 252, 252, 0.85);
      backdrop-filter: blur(60px);
      border-radius: 8px;
      z-index: 1;
      font-size: 12px;
      line-height: 16px;
      color: rgba(0, 0, 0, 0.8956);
    }
  }
  .bottom::before {
    content: '';
    display: block;
    margin: 3px auto -6px auto;
    width: 10px;
    height: 10px;
    background: linear-gradient(
      45deg,
      rgba(252, 252, 252, 0.85),
      rgba(252, 252, 252, 0.85) 50%,
      transparent 50%,
      transparent 100%
    );
    transform: rotateZ(135deg);
    backdrop-filter: blur(60px);
  }
  .top::after {
    content: '';
    display: block;
    margin: 0 auto;
    margin: -6px auto 3px auto;
    width: 10px;
    height: 10px;
    background: linear-gradient(
      45deg,
      rgba(252, 252, 252, 0.85),
      rgba(252, 252, 252, 0.85) 50%,
      transparent 50%,
      transparent 100%
    );
    transform: rotateZ(-45deg);
    backdrop-filter: blur(60px);
    z-index: -1;
  }
`;

export interface TooltipProps {
  placement?: 'top' | 'bottom';
  widthSize?: number;
  dashed?: boolean;
  children?: React.ReactElement;
  overlay?: React.ReactNode;
}

interface InternalTooltipProps {
  domRef: React.RefObject<HTMLDivElement>;
}

const Portal: React.FC<TooltipProps & InternalTooltipProps> = (props) => {
  const { domRef, placement = 'top', widthSize = 320, overlay } = props;
  const innerRef = React.createRef<HTMLDivElement>();

  const [position, setPosition] = React.useState<{ width: number; top: number; left: number }>({
    width: 0,
    top: 0,
    left: 0,
  });

  const [topSize, setTopSize] = React.useState<number>(0);

  React.useEffect(() => {
    if (!innerRef.current) return;

    const { height } = innerRef.current.getBoundingClientRect();
    setTopSize(height);
  }, [innerRef, position]);

  React.useEffect(() => {
    if (!domRef.current) return;

    const { top, bottom, left, width } = domRef.current.getBoundingClientRect();
    const leftSize = Number((width / 2 + left - widthSize / 2).toFixed(4));
    const site = { width: widthSize, top: placement === 'top' ? top - topSize : bottom, left: leftSize };
    // console.log(site)

    setPosition(site);
  }, [domRef, topSize, placement, widthSize]);

  return createPortal(
    <PortalWrapper {...fadeConfig} width={100} onClick={(e) => e.stopPropagation()}>
      <div className={`inner ${placement}`.trimEnd()} style={position} ref={innerRef}>
        <div className="core">{cloneElement(overlay)}</div>
      </div>
    </PortalWrapper>,
    document.body,
  );
};

const Tooltip: React.FC<TooltipProps> = (props: TooltipProps) => {
  const { dashed = true, children } = props;

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/28884
  const domRef = React.createRef<HTMLDivElement>();
  const isHovering = useHover(domRef);

  return (
    <React.Fragment>
      <TooltipGlobalStyle />
      {cloneElement(children, { ref: domRef, className: `tooltip ${dashed ? 'dashed' : ''}`.trimEnd() })}
      <AnimatePresence>{isHovering && <Portal {...props} domRef={domRef} />}</AnimatePresence>
      {/* <Portal {...props} domRef={domRef} /> */}
    </React.Fragment>
  );
};

export default Tooltip;
