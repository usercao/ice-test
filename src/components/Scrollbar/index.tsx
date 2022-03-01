import * as React from 'react';
import { MacScrollbar, MacScrollbarProps as ScrollbarProps } from 'mac-scrollbar';
import styled from 'styled-components';
import 'mac-scrollbar/dist/mac-scrollbar.css';

const Wrapper = styled(MacScrollbar)<ScrollbarProps>`
  height: inherit;
`;

const Scrollbar: React.FC<ScrollbarProps> = (props: ScrollbarProps) => {
  const { as, children, ...rest } = props;

  return (
    <Wrapper forwardedAs={as as keyof JSX.IntrinsicElements} {...rest}>
      {children}
    </Wrapper>
  );
};

export default Scrollbar;
