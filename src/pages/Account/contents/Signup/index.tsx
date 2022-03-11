import * as React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { containerType } from '@/models/account';
import Container from '@/pages/Account/container';
import { Input, Button, Checkbox } from '@/components';
import { t } from '@lingui/macro';
import { useHistory } from 'ice';

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
      color: rgba(0, 0, 0, 0.4);
      span {
        color: #06ceab;
      }
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
    .input + .label,
    .input + .checkbox {
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
    .jump {
      margin-top: 17px;
      span {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: rgba(0, 0, 0, 0.6);
      }
      span:nth-child(2) {
        color: #06ceab;
        user-select: none;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: rgba(6, 206, 171, 0.6);
        }
      }
    }
    .send {
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      color: #06ceab;
      user-select: none;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: rgba(6, 206, 171, 0.6);
      }
    }
  }
`;

const Signup = () => {
  const setType = useSetRecoilState(containerType);
  const history = useHistory();

  const [state, setState] = React.useState<'account' | 'email'>('account');
  const [eye, setEye] = React.useState<boolean>(false);
  const [checked, setChecked] = React.useState<boolean>(false);

  return (
    <Container>
      <Wrapper className="col-center">
        <div className="inner">
          <h4>{t`hello`}</h4>
          <p className="tips">{state === 'account' ? t`hello` : <span>3231331313</span>}</p>
          {state === 'account' && (
            <div className="account">
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
              <p className="label">Email / Phone Number</p>
              <Input className="input" size="lg" placeholder="21212" clear />
              <Checkbox className="checkbox" checked={checked} onChange={(e) => setChecked(e)}>
                <p>
                  <span>I have read and agreed </span>
                  <a onClick={() => console.log(111)}>Terms of Use </a>
                  <span>and </span>
                  <a onClick={() => console.log(111)}>Privacy Agreement</a>
                </p>
              </Checkbox>
              <p className="error">{''}</p>
              <Button
                size="lg"
                onClick={() => {
                  setState('email');
                }}
              >
                Continue
              </Button>
              <p className="jump">
                <span>Not a member ? </span>
                <span onClick={() => history.push('/signup')}>Sign Up</span>
              </p>
            </div>
          )}
          {state === 'email' && (
            <div className="email">
              <p className="label">Email / Phone Number</p>
              <Input
                className="input"
                size="lg"
                placeholder="21212"
                maxLength={6}
                suffix={<p className="send">Send</p>}
                clear
              />
              <p className="error">{''}</p>
              <Button
                size="lg"
                onClick={() => {
                  setType('signup');
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

export default Signup;
