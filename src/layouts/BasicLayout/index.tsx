import * as React from 'react';
import Header from './components/Header';
// import Footer from './components/Footer';
import { Scrollbar } from '@/components';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const BasicLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  return (
    <Wrapper>
      <Header />
      <Scrollbar>
        <div style={{ height: 2000 }}>{children}</div>
      </Scrollbar>
    </Wrapper>
  );
};

export default BasicLayout;
