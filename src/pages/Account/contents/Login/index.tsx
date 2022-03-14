import * as React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { containerType, verifyType, loginInfo, userInfo } from '@/models/account';
import Container from '@/pages/Account/container';
import { pwdVerify } from '@/utils/tools';
import { Input, Button } from '@/components';
import Sense from '@/components/_global/Sense';
import QRCode from 'qrcode';
import { t, Trans } from '@lingui/macro';
import { useHistory } from 'ice';
import { loginByUserName } from '@/services/account';
import { useSessionStorageState } from 'ahooks';
import md5 from 'md5';

const Wrapper = styled.div`
  align-items: flex-start;
  padding: 0 0 120px 84px;
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
        span {
          line-height: 46px;
        }
      }
      .icon-show,
      .icon-hide {
        margin-left: 8px;
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
      .forget {
        margin: 17px 0;
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
      .jump {
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;
        color: rgba(0, 0, 0, 0.6);
        span {
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
        position: relative;
        margin: 12px auto 16px auto;
        width: 162px;
        height: 162px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        overflow: hidden;
        .remake,
        .success {
          position: absolute;
          top: 0;
          left: 0;
          width: 162px;
          height: 162px;
          z-index: 1;
        }
        .remake {
          background: rgba(255, 255, 255, 0.8);
          img {
            width: 37px;
            height: 37px;
            cursor: pointer;
          }
        }
        .success {
          background: rgba(0, 0, 0, 0.7);
          img {
            width: 60px;
            height: 60px;
          }
          p {
            margin-top: 10px;
            text-align: center;
            font-size: 12px;
            line-height: 16px;
            color: #ffffff;
          }
        }
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

interface senseInfoType {
  challenge: string;
  captcha_response: string;
  captcha_id: string;
}

const Login = () => {
  const setType = useSetRecoilState(containerType);
  const setVerify = useSetRecoilState(verifyType);
  const setUser = useSetRecoilState(userInfo);
  const [loginForm, setLoginInfo] = useRecoilState(loginInfo);
  const history = useHistory();

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

  // 账号密码登录
  const [senseInfo, setSenseInfo] = React.useState<senseInfoType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [sessionInfo, setSessionInfo] = useSessionStorageState('userinfo');

  const verifyPassword = React.useMemo(() => {
    const { username, password } = loginForm;
    if (!username || !password) return true;
    if (password.length < 8 || password.length > 20 || !pwdVerify(password)) {
      setError('密码8-20位字符, 必须包含大小写字母和数字');
      return true;
    }
    setError('');
    return false;
  }, [loginForm]);

  const submitLogin = React.useCallback(async () => {
    if (!senseInfo) return;
    setLoading(true);
    const params = {
      type: 0,
      username: loginForm.username,
      password: md5(loginForm.password) as string,
      ...senseInfo,
    };
    try {
      const data = await loginByUserName(params);
      if (data.need2FA) {
        const type = { GA: 'google', EMAIl: 'email', MOBILE: 'mobile' };
        setVerify(type[data.authType]);
        setType('login');
        const { request_id, ...rest } = loginForm;
        setLoginInfo({ request_id: data.requestId, ...rest });
      } else {
        if (!data.user) return;
        // 老项目抛弃之后修改
        setSessionInfo(data.user);
        // 老项目抛弃之后修改
        setUser(data.user);
      }
      setLoading(false);
    } catch (e) {
      setError(e.response.data.msg);
      setLoading(false);
    }
  }, [loginForm, senseInfo, setLoginInfo, setSessionInfo, setType, setUser, setVerify]);

  return (
    <Container>
      <Wrapper className="col-center">
        <div className="inner">
          <h4>{t`welcomeToMexo`}</h4>
          <p className="tips">{t`signWithAccountOrCode`}</p>
          <div className="tabs row-start">
            <p className={`${state === 'account' ? 'active' : 'default'}`} onClick={() => setState('account')}>
              {t`account`}
            </p>
            <p className={`${state === 'qrcode' ? 'active' : 'default'}`} onClick={() => setState('qrcode')}>
              {t`codeQR`}
            </p>
          </div>
          {state === 'account' && (
            <div className="account">
              <p className="label">{t`emailOrPhone`}</p>
              <Input
                className="input"
                size="lg"
                placeholder={t`enterEmailOrPhone`}
                value={loginForm.username}
                onChange={(e) =>
                  setLoginInfo((v) => {
                    const { username, ...rest } = v;
                    return { username: e, ...rest };
                  })
                }
                clear
              />
              <p className="label">{t`loginPassword`}</p>
              <Input
                className="input"
                type={eye ? 'text' : 'password'}
                size="lg"
                placeholder={t`enterLoginPassword`}
                suffix={<i className={`iconfont icon-${eye ? 'show' : 'hide'}`} onClick={() => setEye((v) => !v)} />}
                value={loginForm.password}
                onChange={(e) =>
                  setLoginInfo((v) => {
                    const { password, ...rest } = v;
                    return { password: e, ...rest };
                  })
                }
                clear
              />
              <p className="error">{error}</p>
              <Sense onSuccess={(v) => setSenseInfo(v)}>
                <Button size="lg" loading={loading} disabled={verifyPassword} onClick={submitLogin}>
                  {t`continue`}
                </Button>
              </Sense>
              <p className="forget" onClick={() => history.push('/forget')}>
                {t`forgotPassword`}
              </p>
              <p className="jump">
                <Trans>
                  notMember<span onClick={() => history.push('/signup')}>Signup</span>
                </Trans>
              </p>
            </div>
          )}
          {state === 'qrcode' && (
            <div className="qrcode">
              <h6>Scan to Log In</h6>
              <div className="code">
                <img src={qrcode} alt="qrcode" />
                {false && (
                  <div className="remake col-center">
                    <img src={require('@/assets/images/account/remake.svg')} alt="icon" />
                  </div>
                )}
                {true && (
                  <div className="success col-center">
                    <img src={require('@/assets/images/account/success.svg')} alt="icon" />
                    <p>Confirm on App</p>
                  </div>
                )}
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
