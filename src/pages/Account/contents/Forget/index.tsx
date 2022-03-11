import * as React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { containerType, verifyType } from '@/models/account';
import Container from '@/pages/Account/container';
import { Input, Button, Select } from '@/components';
import { t } from '@lingui/macro';
import { useHistory } from 'ice';
import { useMount } from 'ahooks';
import { getCountries } from '@/services/account';
import { CountriesReturnType } from '@/services/account/PropsType';

const Wrapper = styled.div`
  align-items: flex-start;
  padding: 0 0 60px 84px;
  height: inherit;
  > .inner {
    width: 330px;
    h4 {
      font-weight: 600;
      font-size: 26px;
      line-height: 34px;
      color: #000000;
    }
    .tips {
      margin: 10px 0 45px 0;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      color: #ee6929;
    }
    .tabs {
      margin-bottom: 26px;
      p {
        padding: 6px 14px;
        border-radius: 4px;
        user-select: none;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.3s ease-in-out;
      }
      p + p {
        margin-left: 10px;
      }
      .active {
        background: rgba(0, 0, 0, 0.05);
        color: #000000;
      }
      .default {
        color: rgba(0, 0, 0, 0.6);
      }
    }
    .label {
      margin-bottom: 5px;
      font-weight: 500;
      font-size: 12px;
      line-height: 17px;
      color: #384442;
    }
    .input + .label {
      margin-top: 16px;
    }
    .lg {
      height: 46px;
      input {
        font-size: 14px;
      }
    }
    .iconfont {
      color: #384442;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: #06ceab;
      }
    }
    .error {
      padding: 8px 0;
      font-size: 12px;
      line-height: 16px;
      color: #ff7878;
    }
    .select {
      width: 100px;
      font-size: 14px;
    }
    .overlay {
      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        margin-left: 6px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .input-inner {
      flex: 1;
      margin-left: 12px;
    }
  }
`;

const AreaCode = styled.ul`
  li {
    height: 32px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      background: rgba(0, 0, 0, 0.02);
    }
    p {
      img {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        margin-left: 6px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .code {
      font-size: 12px;
      color: #384442;
    }
  }
`;

const Forget = () => {
  const setType = useSetRecoilState(containerType);
  const setVerify = useSetRecoilState(verifyType);
  const history = useHistory();

  const [state, setState] = React.useState<'account' | 'mobile' | 'password'>('account');
  const [eye, setEye] = React.useState<boolean[]>([false, false]);

  const [countriesValue, setCountriesValue] = React.useState<CountriesReturnType[number]>();
  const [countriesList, setCountriesList] = React.useState<CountriesReturnType>([]);

  useMount(async () => {
    try {
      const data = await getCountries();
      setCountriesList(data);
      const defaultValue = data.find((ele) => ele.nationalCode === '52');
      setCountriesValue(defaultValue);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container>
      <Wrapper className="col-center">
        <div className="inner">
          <h4>{t`hello`}</h4>
          <p className="tips">{t`hello`}</p>
          <div className="tabs row-start">
            <p className={`${state === 'account' ? 'active' : 'default'}`} onClick={() => setState('account')}>
              {t`hello`}
            </p>
            <p className={`${state === 'mobile' ? 'active' : 'default'}`} onClick={() => setState('mobile')}>
              {t`hello`}
            </p>
          </div>
          {state === 'account' && (
            <div className="account">
              <p className="label">Email / Phone Number</p>
              <Input className="input" size="lg" placeholder="21212" clear />
              <p className="error">{''}</p>
              <Button
                size="lg"
                onClick={() => {
                  setType('forget');
                  setVerify('google');
                  setState('password');
                }}
              >
                Continue
              </Button>
            </div>
          )}
          {state === 'mobile' && (
            <div className="mobile">
              <p className="label">Email / Phone Number</p>
              <div className="input row-between">
                <Select
                  className="select"
                  followWidth={330}
                  size="lg"
                  placeholder="2121313"
                  overlay={
                    <p className="overlay row-start">
                      <img src={countriesValue?.logo || require('@/assets/images/account/flag.svg')} alt="flag" />
                      <span>+{countriesValue?.nationalCode}</span>
                    </p>
                  }
                >
                  <AreaCode>
                    {countriesList.map((ele) => (
                      <li className="row-between" key={ele.id} onClick={() => setCountriesValue(ele)}>
                        <p className="row-start">
                          <img src={ele.logo || require('@/assets/images/account/flag.svg')} alt="flag" />
                          <span>{ele.countryName}</span>
                        </p>
                        <span className="code">+{ele.nationalCode}</span>
                      </li>
                    ))}
                  </AreaCode>
                </Select>
                <Input className="input-inner" size="lg" placeholder="21212" clear />
              </div>
              <p className="error">{''}</p>
              <Button
                size="lg"
                onClick={() => {
                  setType('forget');
                  setVerify('google');
                  setState('password');
                }}
              >
                Continue
              </Button>
            </div>
          )}
          {state === 'password' && (
            <div className="password">
              <p className="label">Email / Phone Number</p>
              <Input
                className="input"
                type={eye[0] ? 'text' : 'password'}
                size="lg"
                placeholder="21212"
                suffix={
                  <i
                    className={`iconfont icon-${eye[0] ? 'show' : 'hide'}`}
                    onClick={() => setEye((v) => [!v[0], v[1]])}
                  />
                }
                clear
              />
              <p className="label">Email / Phone Number</p>
              <Input
                className="input"
                type={eye[1] ? 'text' : 'password'}
                size="lg"
                placeholder="21212"
                suffix={
                  <i
                    className={`iconfont icon-${eye[1] ? 'show' : 'hide'}`}
                    onClick={() => setEye((v) => [v[0], !v[1]])}
                  />
                }
                clear
              />
              <p className="error">{''}</p>
              <Button size="lg" onClick={() => history.replace('/login')}>
                Continue
              </Button>
            </div>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

export default Forget;
