import * as React from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
import { Scrollbar } from '@/components';

const BasicLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.Fragment>
      <main style={{ height: 100 }}>
        <Scrollbar>
          <div style={{ height: 2000 }}>{children}</div>
        </Scrollbar>
      </main>
    </React.Fragment>
  );
};

export default BasicLayout;
