import * as React from 'react';
import { LOCALE_LABEL } from '@/config/locales';
import { useRecoilState } from 'recoil';
import { Dropdown } from '@/components';
import { locale } from '@/models/_global';
import { downloadLink } from '@/services/_global';
import { useMount } from 'ahooks';
import QRCode from 'qrcode';
import { t } from '@lingui/macro';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 32px;
  height: 60px;
  > .download {
    .iconfont {
      font-size: 18px;
      color: #c8c8c8;
      user-select: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: #06ceab;
      }
    }
  }
  > .language {
    h6 {
      width: 76px;
      text-align: right;
      font-weight: 500;
      font-size: 14px;
      line-height: 34px;
      color: #c8c8c8;
      user-select: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: #06ceab;
      }
    }
  }
`;

const DropdownDownload = styled.div`
  padding: 14px 26px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(208, 208, 208, 0.5);
  border-radius: 6px;
  img {
    width: 126px;
    height: 126px;
  }
  p:nth-child(2) {
    padding: 6px 0;
    text-align: center;
    font-weight: 400;
    font-size: 12px;
    line-height: 17px;
    color: rgba(0, 0, 0, 0.8);
  }
  p:nth-child(3) {
    text-align: center;
    font-weight: 400;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const DropdownLanguage = styled.ul`
  padding: 6px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(208, 208, 208, 0.5);
  border-radius: 6px;
  li {
    padding: 0 12px;
    font-weight: 500;
    font-size: 14px;
    line-height: 36px;
    border-radius: 4px;
    user-select: none;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #06ceab;
      background: #fafafa;
    }
    &.active {
      color: #06ceab;
      background: #fafafa;
    }
    &.default {
      color: #384442;
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

  const [qrcode, setQRCode] = React.useState<string>();

  const loadQRCode = React.useCallback(async () => {
    const { pageLink } = await downloadLink();
    // 老项目抛弃之后修改
    const jumpLink = `${pageLink}?language=${window.localStorage.lang ?? 'en-us'}`;
    // 老项目抛弃之后修改
    const uri = await QRCode.toDataURL(jumpLink, { margin: 2, width: 160 });
    setQRCode(uri);
  }, []);

  useMount(() => {
    getLocaleList();
    loadQRCode();
  });

  return (
    <Wrapper className="settings row-end">
      <div className="download">
        <Dropdown followWidth={180} placement="right" overlay={<i className="iconfont icon-phone" />}>
          <DropdownDownload>
            <img src={qrcode} alt="qrcode" />
            <p>{t`scanToDownloadApp`}</p>
            <p>IOS&Android</p>
          </DropdownDownload>
        </Dropdown>
      </div>
      <div className="language">
        <Dropdown followWidth={120} placement="right" overlay={<h6>{LOCALE_LABEL[localeModel]}</h6>}>
          <DropdownLanguage>
            {localeModelList.map((ele) => (
              <li
                className={`${ele.label === localeModel ? 'active' : 'default'}`}
                key={ele.label}
                onClick={() => setLocaleModel(ele.label)}
              >
                {ele.value}
              </li>
            ))}
          </DropdownLanguage>
        </Dropdown>
      </div>
    </Wrapper>
  );
};

export default Settings;
