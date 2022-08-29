import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { cloneElement } from '../_util/reactNode';
import { recoilTheme } from '@/models/_global';
import { MacScrollbar, MacScrollbarProps } from 'mac-scrollbar';
import styled from 'styled-components';
import 'mac-scrollbar/dist/mac-scrollbar.css';

const Wrapper = styled(MacScrollbar)<ScrollbarProps>`
  width: inherit;
  height: inherit;
`;

export type ScrollbarProps = MacScrollbarProps;

const Scrollbar: React.FC<ScrollbarProps> = (props: ScrollbarProps) => {
  const localeTheme = useRecoilValue(recoilTheme);
  const { as, children, ...rest } = props;

  return (
    <Wrapper
      forwardedAs={as as keyof JSX.IntrinsicElements}
      skin={localeTheme}
      trackStyle={(horizontal: boolean) => ({ [horizontal ? 'height' : 'width']: 0, right: 2, border: 0 })}
      thumbStyle={(horizontal: boolean) => ({ [horizontal ? 'height' : 'width']: 3 })}
      trackGap={[4, 4, 4, 4]}
      {...rest}
    >
      {cloneElement(children)}
    </Wrapper>
  );
};

export default Scrollbar;
