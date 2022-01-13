import * as React from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';

const BasicLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  return <main>{children}</main>;
};

export default BasicLayout;
