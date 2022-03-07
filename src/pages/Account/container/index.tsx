import * as React from 'react';
import styled from 'styled-components';
import Settings from '@/components/_global/Settings';
// import { t } from '@lingui/macro';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  > .moon {
    width: 50%;
    height: inherit;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      user-select: none;
    }
  }
  > .base {
    width: 50%;
    height: inherit;
    > .settings {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

const Container: React.FC = (props) => {
  const { children } = props;

  return (
    <Wrapper className="row-center">
      <div className="moon">
        <img src={require('@/assets/images/account/moon.webp')} alt="moon" />
      </div>
      <div className="base">
        <Settings />
        {children}
      </div>
    </Wrapper>
  );
};

export default Container;
