import * as React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { containerType, verifyType, loginInfo, userInfo as recoilUserInfo } from '@/models/account';
import Container from '@/pages/Account/container';
import { pwdVerify } from '@/utils/tools';
import { Input, Button, message } from '@/components';
import Sense from '@/components/_global/Sense';
import useSearchParam from '@/hooks/useSearchParam';
import QRCode from 'qrcode';
import { t, Trans } from '@lingui/macro';
import { useHistory } from 'ice';
import { loginByUserName, getLoginQrCode, getLoginQrCodeResult } from '@/services/account';
import { IQRCode } from '@/services/account/PropsType';
import { useSessionStorageState, useInterval, useMount } from 'ahooks';
import md5 from 'md5';

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
        width: 164px;
        height: 164px;
        border: 1px solid rgba(0, 0, 0, 0.08);
        border-radius: 4px;
        overflow: hidden;
        .remake,
        .success {
          position: absolute;
          top: 0;
          left: 0;
          width: 164px;
          height: 164px;
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
          p {
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            text-align: center;
            color: #ffffff;
          }
          button {
            margin-top: 10px;
            span {
              line-height: 22px;
            }
            &.sm {
              width: auto;
              min-width: 60px;
              height: 22px;
            }
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
  const setUser = useSetRecoilState(recoilUserInfo);
  const [loginForm, setLoginInfo] = useRecoilState(loginInfo);
  const history = useHistory();
  const redirect = useSearchParam('redirect');

  const [state, setState] = React.useState<'account' | 'qrcode'>('account');
  const [eye, setEye] = React.useState<boolean>(false);

  // account
  const [senseInfo, setSenseInfo] = React.useState<senseInfoType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [, setSessionInfo] = useSessionStorageState('userinfo');

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

  useMount(() => {});

  const jumpWebsite = React.useCallback(
    (info) => {
      // 老项目抛弃之后修改
      setSessionInfo(info);
      // 老项目抛弃之后修改
      setUser(info);
      // 老项目抛弃之后修改
      window.open(redirect || 'https://mexo.io', '_self');
      // 老项目抛弃之后修改
    },
    [redirect, setSessionInfo, setUser],
  );

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
        jumpWebsite(data.user);
      }
      setLoading(false);
    } catch (e) {
      setError(e.response.data.msg);
      setLoading(false);
    }
  }, [loginForm, senseInfo, setLoginInfo, setType, setVerify, jumpWebsite]);

  React.useEffect(() => {
    if (!senseInfo) return;
    submitLogin();
  }, [senseInfo, submitLogin]);

  // qrcode
  const [qrcodeInfo, setQRCodeInfo] = React.useState<IQRCode>();
  const [qrcode, setQRCode] = React.useState<string>();
  const [delay, setDelay] = React.useState<number | undefined>(undefined);
  const [qrcodeState, setQrcodeState] = React.useState<-1 | 0 | 1>(-1);

  const loadQRCode = React.useCallback(async () => {
    setQrcodeState(-1);
    const info = await getLoginQrCode();
    setQRCodeInfo(info);
    const uri = await QRCode.toDataURL(info.ticket, { margin: 2, width: 160 });
    setQRCode(uri);
    setDelay(3000);
  }, []);

  React.useEffect(() => {
    if (state !== 'qrcode') return;
    loadQRCode();
  }, [state, loadQRCode]);

  const loopQrCodeResult = React.useCallback(async () => {
    if (!qrcodeInfo) return;
    const data = await getLoginQrCodeResult(qrcodeInfo?.ticket);
    if ('code' in data) {
      setDelay(undefined);
      message.error(data.msg);
      return;
    }
    if ('qrcodeStatus' in data) {
      const { qrcodeStatus, qrcodeTimeLeft, userInfo } = data;
      if (qrcodeTimeLeft <= 3) {
        setDelay(undefined);
        setQrcodeState(0);
        return;
      }
      if (qrcodeStatus === 1) setQrcodeState(1);
      if (userInfo) {
        setDelay(undefined);
        jumpWebsite(userInfo);
      }
    }
  }, [qrcodeInfo, jumpWebsite]);

  useInterval(() => {
    loopQrCodeResult();
  }, delay);

  return (
    <Container>
      <Wrapper className="col-center">
        <div className="inner">
          <h4>{t`welcomeToMexo`}</h4>
          <p className="tips">{t`signWithAccountOrCode`}</p>
          <div className="tabs row-start">
            <p
              className={`${state === 'account' ? 'active' : 'default'}`}
              onClick={() => {
                setState('account');
                setDelay(undefined);
              }}
            >
              {t`account`}
            </p>
            <p
              className={`${state === 'qrcode' ? 'active' : 'default'}`}
              onClick={() => {
                setState('qrcode');
                setDelay(undefined);
              }}
            >
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
                <Button size="lg" loading={loading} disabled={verifyPassword}>
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
              <h6>
                {qrcodeState === -1 && <span>Scan to Log In</span>}
                {qrcodeState === 0 && <span>QR code expired</span>}
                {qrcodeState === 1 && <span>Confirm on App</span>}
              </h6>
              <div className="code">
                <img src={qrcode || require('@/assets/images/account/qrcode.png')} alt="qrcode" />
                {qrcodeState === 0 && (
                  <div className="remake col-center" onClick={loadQRCode}>
                    <img src={require('@/assets/images/account/remake.svg')} alt="icon" />
                  </div>
                )}
                {qrcodeState === 1 && (
                  <div className="success col-center">
                    <p>Scan successful</p>
                    <p>Please confirm on App</p>
                    <Button size="sm" onClick={loadQRCode}>
                      Retry
                    </Button>
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
