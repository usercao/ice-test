import * as React from 'react';
import { MacScrollbar, MacScrollbarProps } from 'mac-scrollbar';
import styled from 'styled-components';

const Wrapper = styled(MacScrollbar)<ScrollbarProps>`
  width: inherit;
  height: inherit;
`;

export interface ScrollbarProps extends MacScrollbarProps {}

const Scrollbar: React.FC<ScrollbarProps> = (props: ScrollbarProps) => {
  const { as, children, ...rest } = props;

  return (
    <Wrapper forwardedAs={as as keyof JSX.IntrinsicElements} {...rest}>
      {children}
    </Wrapper>
  );
};

export default Scrollbar;
