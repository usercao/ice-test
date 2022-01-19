import * as React from 'react';
// import Header from './components/Header';
// import Footer from './components/Footer';
import { Scrollbar } from '@/components';
import styled from 'styled-components';
import { getAllLocales, useLocale, useHistory } from 'ice';
import { dynamicActivate } from '@/locales';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  header {
    padding: 0 100px;
    p {
      text-align: right;
      cursor: pointer;
      user-select: none;
    }
  }
`;

const BasicLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  const all = getAllLocales();
  const [locale, setLocale] = useLocale();
  const history = useHistory();

  return (
    <Wrapper>
      {/* <Header /> */}
      <header className="row-between">
        <div>{locale}</div>
        <div>
          {all.map((ele) => (
            <p
              key={ele}
              onClick={() => {
                dynamicActivate(ele);
                setLocale(ele);
                history.push('/replace');
              }}
            >
              {ele}
            </p>
          ))}
        </div>
      </header>
      <Scrollbar>
        <div style={{ height: 2000 }}>{children}</div>
      </Scrollbar>
    </Wrapper>
  );
};

export default BasicLayout;
