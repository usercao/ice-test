import * as React from 'react';
import styled from 'styled-components';
import { LOCALE_LABEL } from '@/config/locales';
import { useRecoilState } from 'recoil';
import { locale } from '@/models';
// import { useHistory } from 'ice';
import { useMount } from 'ahooks';
import { Scrollbar } from '@/components';
import { GlobalScrollbar } from 'mac-scrollbar';

const Wrapper = styled.div`
  width: 100%;
  /* height: 100vh;
  overflow: hidden; */
  header {
    padding: 0 100px;
    p {
      text-align: right;
      cursor: pointer;
      user-select: none;
    }
  }
`;

type localeListType = Array<{ label: string; value: any }>;

const BasicLayout: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [localeModel, setLocaleModel] = useRecoilState(locale);
  const [localeModelList, setLocaleModelList] = React.useState<localeListType>([]);
  // const history = useHistory();

  const getLocaleList = React.useCallback(() => {
    const array: localeListType = [];
    Object.keys(LOCALE_LABEL).forEach((v) => {
      const element = { label: v, value: LOCALE_LABEL[v] };
      array.push(element);
    });
    setLocaleModelList(array);
  }, []);

  useMount(() => getLocaleList());

  return (
    <Wrapper>
      <GlobalScrollbar
        skin="dark"
        trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0 })}
        thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 3 })}
      />
      {/* <Header /> */}
      <header className="row-between">
        <div>{LOCALE_LABEL[localeModel]}</div>
        <div>
          {localeModelList.map((ele) => (
            <p
              key={ele.label}
              onClick={() => {
                setLocaleModel(ele.label);
                // history.push('/replace');
              }}
            >
              {ele.value}
            </p>
          ))}
        </div>
      </header>
      <div style={{ height: 2000 }}>{children}</div>
      {/* <Scrollbar>
      </Scrollbar> */}
    </Wrapper>
  );
};

export default BasicLayout;
