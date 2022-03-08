import * as React from 'react';
import styled from 'styled-components';
import Settings from '@/components/_global/Settings';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  > .moon {
    width: 50%;
    height: inherit;
    background: #6bd4bc;
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

export type ContainerType = 'account' | 'verify' | 'success';

interface ContainerProps {
  verification: ContainerType;
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = (props: ContainerProps) => {
  const { verification = 'account', children } = props;

  return (
    <Wrapper className="row-center">
      <div className="moon">
        <img src={require('@/assets/images/account/moon.webp')} alt="moon" />
      </div>
      <div className="base">
        <Settings />
        {verification === 'account' && children}
        {verification === 'verify' && <div>212</div>}
        {verification === 'success' && <div>212</div>}
      </div>
    </Wrapper>
  );
};

export default Container;
