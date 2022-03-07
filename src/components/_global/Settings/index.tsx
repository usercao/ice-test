import * as React from 'react';
import { LOCALE_LABEL } from '@/config/locales';
import { useRecoilState } from 'recoil';
import { locale } from '@/models';
import { useMount } from 'ahooks';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 22px 32px;
  > .download {
    font-size: 18px;
    color: #c8c8c8;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #06ceab;
    }
  }
  > .language {
    position: relative;
    width: 76px;
    text-align: right;
    h6 {
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: #c8c8c8;
      user-select: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: #06ceab;
      }
    }
    &:hover {
      ul {
        display: block;
      }
    }
    ul {
      display: none;
      position: absolute;
      top: 28px;
      right: 0;
      background: #ffffff;
      box-shadow: 0px 4px 10px rgba(208, 208, 208, 0.5);
      border-radius: 6px;
      li {
        user-select: none;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;

type localeListType = Array<{ label: string; value: any }>;

const Settings: React.FC = () => {
  const [localeModel, setLocaleModel] = useRecoilState(locale);
  const [localeModelList, setLocaleModelList] = React.useState<localeListType>([]);

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
    <Wrapper className="settings row-end">
      <div className="download">
        <i className="iconfont icon-phone" />
      </div>
      <div className="language">
        <h6>{LOCALE_LABEL[localeModel]}</h6>
        <ul>
          {localeModelList.map((ele) => (
            <li key={ele.label} onClick={() => setLocaleModel(ele.label)}>
              {ele.value}
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default Settings;
