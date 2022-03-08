import * as React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { containerType, verifyType } from '@/models/account';
import Settings from '@/components/_global/Settings';
import { Input, Button } from '@/components';
import { t } from '@lingui/macro';
import { useHistory } from 'ice';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  > .moon {
    width: 50%;
    height: inherit;
    background: #6bd4bc;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      user-select: none;
    }
  }
  > .base {
    width: 50%;
    height: inherit;
    > .settings {
      position: absolute;
      top: 0;
      right: 0;
    }
    > .verify {
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
          color: rgba(0, 0, 0, 0.4);
        }
        .label {
          span {
            font-size: 12px;
            line-height: 17px;
            color: #384442;
          }
          span:first-child {
            font-weight: 500;
          }
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
        .error {
          padding: 8px 0;
          font-size: 12px;
          line-height: 16px;
          color: #ff7878;
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
    }
    > .success {
    }
  }
`;

const Container: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useRecoilState(containerType);
  const verify = useRecoilValue(verifyType);
  const history = useHistory();

  const handleForget = React.useCallback(async () => {
    if (verify === 'email') {
      return;
    }
    if (verify === 'mobile') {
      return;
    }
    // is google?
    // if (verify === '') {
    //   return;
    // }
    setType('default');
  }, [verify, setType]);

  const handleLogin = React.useCallback(async () => {
    if (verify === 'email') {
      return;
    }
    if (verify === 'mobile') {
      return;
    }
    // if (verify === 'google') {
    //   return;
    // }
    console.log('login');
  }, [verify]);

  const handleSignup = React.useCallback(async () => {
    history.push('/home');
  }, [history]);

  return (
    <Wrapper className="row-center">
      <div className="moon">
        <img src={require('@/assets/images/account/moon.webp')} alt="moon" />
      </div>
      <div className="base">
        <Settings />
        {type === 'default' && children}
        {type === 'forget' && (
          <div className="verify col-center">
            <div className="inner">
              <h4>{t`hello`}</h4>
              <p className="tips">{t`hello`}</p>
              <p className="label row-between">
                <span>Email / Phone Number</span>
                <span>Email / Phone Number</span>
              </p>
              <Input
                className="input"
                size="lg"
                placeholder="21212"
                maxLength={6}
                suffix={verify !== 'google' && <p className="send">Send</p>}
                clear
              />
              <p className="error">{''}</p>
              <Button size="lg" onClick={handleForget}>
                Continue
              </Button>
            </div>
          </div>
        )}
        {type === 'login' && (
          <div className="verify col-center">
            <div className="inner">
              <h4>{t`hello`}</h4>
              <p className="tips">{t`hello`}</p>
              <p className="label row-between">
                <span>Email / Phone Number</span>
              </p>
              <Input
                className="input"
                size="lg"
                placeholder="21212"
                maxLength={6}
                suffix={verify !== 'google' && <p className="send">Send</p>}
                clear
              />
              <p className="error">{''}</p>
              <Button size="lg" onClick={handleLogin}>
                Continue
              </Button>
            </div>
          </div>
        )}
        {type === 'signup' && (
          <div className="success">
            <Button size="lg" onClick={handleSignup}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Container;
