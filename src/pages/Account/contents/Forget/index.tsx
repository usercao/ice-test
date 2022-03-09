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

const Wrapper = styled.div`
  align-items: flex-start;
  padding-left: 84px;
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
      width: 88px;
      font-size: 14px;
    }
    .input-inner {
      flex: 1;
      margin-left: 12px;
    }
  }
`;

const AreaCode = styled.ul`
  /* width: 330px; */
`;

const Forget = () => {
  const setType = useSetRecoilState(containerType);
  const setVerify = useSetRecoilState(verifyType);
  const history = useHistory();

  const [state, setState] = React.useState<'account' | 'mobile' | 'password'>('account');
  const [eye, setEye] = React.useState<boolean>(false);

  const [value, setValue] = React.useState<string>('1');
  const [list, setList] = React.useState<string[]>(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);

  useMount(async () => {
    const data = await getCountries();
    console.log(data);
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
                  overlay={<p className="overlay">{value}</p>}
                >
                  <AreaCode>
                    {list.map((ele) => (
                      <li className="row-between" key={ele} onClick={() => setValue(ele)}>
                        {ele}
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
                }}
              >
                Continue
              </Button>
            </div>
          )}
          {state === 'password' && (
            <div className="password">
              <p className="label">Email / Phone Number</p>
              <Input className="input" size="lg" placeholder="21212" clear />
              <p className="label">Email / Phone Number</p>
              <Input
                className="input"
                type={eye ? 'text' : 'password'}
                size="lg"
                placeholder="21212"
                suffix={<i className={`iconfont icon-${eye ? 'show' : 'hide'}`} onClick={() => setEye((v) => !v)} />}
                clear
              />
              <p className="error">{''}</p>
              <Button
                size="lg"
                onClick={() => {
                  setType('login');
                  setVerify('google');
                }}
              >
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
