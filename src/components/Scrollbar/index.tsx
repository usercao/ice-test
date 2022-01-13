import * as React from 'react';
import { MacScrollbar, MacScrollbarProps as ScrollbarProps } from 'mac-scrollbar';
import styled from 'styled-components';

import 'mac-scrollbar/dist/style.css';

const Wrapper = styled(MacScrollbar)<ScrollbarProps>`
  height: inherit;
`;

const Scrollbar: React.FC = (props: ScrollbarProps) => {
  const { children, theme = 'white', as = 'div', ...other } = props;
  return (
    // theme={theme} as={as}
    <Wrapper suppressScrollX={true} {...other}>
      {children}
    </Wrapper>
  );
};

export default Scrollbar;
