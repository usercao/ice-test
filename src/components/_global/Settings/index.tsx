import * as React from 'react';
import { LOCALE_LABEL } from '@/config/locales';
import { APP_MODE, config } from 'ice';
import { useRecoilState } from 'recoil';
import { Dropdown } from '@/components';
import { recoilLocale, recoilIndexConfig, recoilTheme, recoilCurrency } from '@/models/_global';
import { downloadLink, indexConfig as servicesIndexConfig, marketCurrency } from '@/services/_global';
import { IMarketCurrency } from '@/typings/_global';
import { useSafeState, useMount, useTimeout } from 'ahooks';
import QRCode from 'qrcode';
import { t } from '@lingui/macro';
import styled from 'styled-components';
import Cookies from 'js-cookie';

const { ICE_LOGIN_SUCCESS_JUMP, ICE_LOCALE_DOMAIN } = config;

const Wrapper = styled.div`
  .line {
    margin: 0 6px;
    width: 1px;
    height: 16px;
    background: ${(props) => props.theme.textBaseColor};
    border: none;
    transition: all 0.3s ease-in-out;
  }
  .iconfont {
    font-size: 18px;
    color: ${(props) => props.theme.textBaseColor};
    transition: all 0.3s ease-in-out;
  }
  .theme {
    margin-left: 24px;
    user-select: none;
    cursor: pointer;
    .iconfont {
      font-size: 26px;
      color: ${(props) => props.theme.textBaseColor};
      transition: all 0.3s ease-in-out;
    }
    &:hover {
      .iconfont {
        color: #06ceab;
      }
    }
  }
`;

const DropdownDownload = styled.div`
  padding-top: 8px;
  .menu-item {
    padding: 18px 26px;
    background: ${(props) => props.theme.menuBackgroundColor};
    box-shadow: ${(props) => props.theme.boxShadowBase};
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    img {
      width: 126px;
      height: 126px;
    }
    p:nth-child(2) {
      padding: 6px 0;
      text-align: center;
      font-size: 12px;
      line-height: 17px;
      color: ${(props) => props.theme.textBaseColor};
      transition: all 0.3s ease-in-out;
    }
    p:nth-child(3) {
      text-align: center;
      font-size: 12px;
      color: ${(props) => props.theme.textFirstColor};
      transition: all 0.3s ease-in-out;
    }
  }
`;

const DropdownHandle = styled.div`
  padding-top: 8px;
  .menu-item {
    padding: 8px;
    background: ${(props) => props.theme.menuBackgroundColor};
    box-shadow: ${(props) => props.theme.boxShadowBase};
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    h4 {
      padding: 12px 8px;
      font-weight: 500;
      font-size: 14px;
      line-height: 18px;
      color: ${(props) => props.theme.textFirstColor};
      transition: all 0.3s ease-in-out;
    }
    li {
      padding: 0 8px;
      border-radius: 4px;
      user-select: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      span {
        width: 90px;
        font-weight: 500;
        font-size: 14px;
        line-height: 36px;
        color: ${(props) => props.theme.textBaseColor};
        transition: all 0.3s ease-in-out;
      }
      .iconfont {
        font-size: 12px;
        color: #06ceab;
      }
      &:hover {
        background: ${(props) => props.theme.colorHoverOrBackground};
        span {
          color: #06ceab;
        }
      }
    }
  }
`;

type localeListType = Array<{ label: string; value: any }>;

const Settings: React.FC<{ visibleCurrency?: boolean }> = ({ visibleCurrency = true }) => {
  const [localeModel, setLocaleModel] = useRecoilState(recoilLocale);
  const [localeModelList, setLocaleModelList] = useSafeState<localeListType>([]);
  const [theme, setTheme] = useRecoilState(recoilTheme);
  const [currency, setCurrency] = useRecoilState(recoilCurrency);

  const getLocaleList = React.useCallback(() => {
    const array: localeListType = [];
    Object.keys(LOCALE_LABEL).forEach((v) => {
      const element = { label: v, value: LOCALE_LABEL[v] };
      array.push(element);
    });
    setLocaleModelList(array);
  }, [setLocaleModelList]);

  const [indexConfig, setIndexConfig] = useRecoilState(recoilIndexConfig);

  const loadIndexConfig = React.useCallback(async () => {
    // if (indexConfig) {
    //   // 老项目抛弃之后修改 | 测试需要有清除方法
    //   // APP_MODE === 'prod' && window.open(ICE_LOGIN_SUCCESS_JUMP, '_self');
    //   // 老项目抛弃之后修改
    //   return;
    // }
    const basic_data = await servicesIndexConfig();
    setIndexConfig(basic_data);
  }, [setIndexConfig]);

  useMount(() => {
    getLocaleList();
    loadIndexConfig();
  });

  const [qrcode, setQRCode] = useSafeState<string>();

  const loadQRCode = React.useCallback(async () => {
    const { pageLink } = await downloadLink();
    // 老项目抛弃之后修改
    const jumpLink = `${pageLink}?language=${window.localStorage.lang ?? 'en-us'}`;
    // 老项目抛弃之后修改
    const uri = await QRCode.toDataURL(jumpLink, { margin: 2, width: 160 });
    setQRCode(uri);
  }, [setQRCode]);

  const [currencyList, setCurrencyList] = React.useState<IMarketCurrency['data']>([]);

  const loadCurrency = React.useCallback(async () => {
    const market = await marketCurrency();
    setCurrencyList(market);
  }, []);

  useTimeout(() => {
    loadQRCode();
    loadCurrency();
  }, 3000);

  return (
    <Wrapper className="settings row-end">
      <Dropdown
        placement="right"
        overlay={
          <div className="menu-icon row-end">
            <i className="iconfont icon-phone" />
          </div>
        }
      >
        <DropdownDownload>
          <div className="menu-item">
            <img src={qrcode} alt="qrcode" />
            <p>{t`scanToDownloadApp`}</p>
            <p>IOS&Android</p>
          </div>
        </DropdownDownload>
      </Dropdown>
      <Dropdown
        placement="right"
        overlay={
          <div className="menu-handle">
            <span>{LOCALE_LABEL[localeModel]}</span>
          </div>
        }
      >
        <DropdownHandle>
          <ul className="menu-item">
            <h4>{t`language`}</h4>
            {localeModelList.map((ele) => (
              <li
                className="row-start"
                key={ele.label}
                onClick={() => {
                  setLocaleModel(ele.label);
                  // 老项目抛弃之后修改
                  Cookies.set('locale', ele.label.toLowerCase(), { domain: ICE_LOCALE_DOMAIN });
                  // 老项目抛弃之后修改
                }}
              >
                <span>{ele.value}</span>
                {ele.label === localeModel && <i className="iconfont icon-select-confirm" />}
              </li>
            ))}
          </ul>
        </DropdownHandle>
      </Dropdown>
      {visibleCurrency && (
        <React.Fragment>
          <hr className="line" />
          <Dropdown
            placement="right"
            overlay={
              <div className="menu-handle">
                <span>{currency}</span>
              </div>
            }
          >
            <DropdownHandle>
              <ul className="menu-item">
                <h4>{t`currency`}</h4>
                {currencyList.map((ele) => (
                  <li className="row-start" key={ele.currency} onClick={() => setCurrency(ele.currency)}>
                    <span>{ele.currency}</span>
                    {ele.currency === currency && <i className="iconfont icon-select-confirm" />}
                  </li>
                ))}
              </ul>
            </DropdownHandle>
          </Dropdown>
        </React.Fragment>
      )}
      <div className="theme" onClick={() => setTheme((v) => (v === 'dark' ? 'light' : 'dark'))}>
        <i className={`iconfont icon-${theme}`} />
      </div>
    </Wrapper>
  );
};

export default Settings;
