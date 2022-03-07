import * as React from 'react';
import { LOCALE_LABEL } from '@/config/locales';
import { useRecoilState } from 'recoil';
import { locale } from '@/models';
import { useMount } from 'ahooks';
import styled from 'styled-components';

const Wrapper = styled.div``;

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
  }, [LOCALE_LABEL]);

  useMount(() => getLocaleList());

  return (
    <Wrapper className="row-end">
      <div className="download">
        <i className="iconfont icon-phone" />
      </div>
      <div className="language">
        <div>{LOCALE_LABEL[localeModel]}</div>
        <div>
          {localeModelList.map((ele) => (
            <p key={ele.label} onClick={() => setLocaleModel(ele.label)}>
              {ele.value}
            </p>
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
