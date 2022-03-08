import * as React from 'react';
import styled from 'styled-components';
import Container from '@/pages/Account/container';
import { Input, Button } from '@/components';
import QRCode from 'qrcode';
import { t } from '@lingui/macro';

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
      color: rgba(0, 0, 0, 0.4);
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
    > .account {
      .label {
        font-weight: 500;
        font-size: 12px;
        line-height: 17px;
        color: #384442;
      }
      .lg {
        height: 46px;
        input {
          font-size: 14px;
        }
      }
      .input {
        margin: 5px 0 16px 0;
      }
      .iconfont {
        color: #384442;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        &:hover {
          color: #06ceab;
        }
      }
      .forget {
        margin: 17px 0;
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        color: #06ceab;
        user-select: none;
        cursor: pointer;
      }
      .jump {
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
        }
      }
    }
    > .qrcode {
      padding-top: 44px;
      height: 330px;
      background: rgba(0, 0, 0, 0.01);
      border-radius: 4px;
      h6 {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        text-align: center;
        color: #000000;
      }
      .code {
        margin: 12px auto 16px auto;
        width: 162px;
        height: 162px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        overflow: hidden;
      }
      .scan {
        font-size: 12px;
        line-height: 17px;
        text-align: center;
        color: #000000;
        span {
          color: #06ceab;
        }
      }
    }
  }
`;

const Login = () => {
  const [state, setState] = React.useState<'account' | 'qrcode'>('account');
  const [eye, setEye] = React.useState<boolean>(false);

  const [qrcode, setQRCode] = React.useState<string>('');

  const loadQRCode = React.useCallback(async () => {
    const qr = await QRCode.toDataURL('21212', {
      margin: 2,
      width: 160,
    });
    setQRCode(qr);
  }, []);

  React.useEffect(() => {
    loadQRCode();
  }, [loadQRCode]);

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
            <p className={`${state === 'qrcode' ? 'active' : 'default'}`} onClick={() => setState('qrcode')}>
              {t`hello`}
            </p>
          </div>
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
              <Button size="lg">Continue</Button>
              <p className="forget">Forget Password</p>
              <p className="jump">
                <span>Not a member ? </span>
                <span>Sign Up</span>
              </p>
            </div>
          )}
          {state === 'qrcode' && (
            <div className="qrcode">
              <h6>Scan to Log In</h6>
              <div className="code">
                <img src={qrcode} alt="qrcode" />
              </div>
              <p className="scan">
                Open and Login <span> App</span>
                <br />
                Use built-in camera to scan the QR code.
              </p>
            </div>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

export default Login;
