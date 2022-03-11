import * as React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { containerType, verifyType, verifyUserName, verifyPassword, verifyRequestId, userInfo } from '@/models/account';
import Container from '@/pages/Account/container';
import { pwdVerify } from '@/utils/tools';
import { Input, Button, message } from '@/components';
import Sense from '@/components/_global/Sense';
import QRCode from 'qrcode';
import { t, Trans } from '@lingui/macro';
import { useHistory } from 'ice';
import { loginByUserName } from '@/services/account';
import { useGetState } from 'ahooks';
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

const Login = () => {
  const setType = useSetRecoilState(containerType);
  const setVerify = useSetRecoilState(verifyType);
  const setUser = useSetRecoilState(userInfo);

  const setVerifyUserName = useSetRecoilState(verifyUserName);
  const setVerifyPassword = useSetRecoilState(verifyPassword);
  const setVerifyRequestId = useSetRecoilState(verifyRequestId);

  const history = useHistory();
  const senseRef = React.useRef<HTMLElement | any>(null);

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

  const senseVerify = React.useCallback(() => {
    senseRef.current.sense && senseRef.current.sense.verify();
  }, [senseRef]);

  const senseReset = React.useCallback(() => {
    senseRef.current.sense && senseRef.current.sense.reset();
  }, [senseRef]);

  // 账号密码登录
  const [userName, setUsername, getUserName] = useGetState<string>('northgyh@163.com');
  const [password, setPassword, getPassword] = useGetState<string>('Guoguo789');
  const [loading1, setLoading1] = React.useState<boolean>(false);
  const [errorInfo, setErrorInfo] = React.useState<string>('');

  const verifyLoginInfo = React.useCallback((): boolean => {
    if (!userName || !password) {
      setErrorInfo('请输入完整信息');
      return false;
    }
    if (password.length < 8 || password.length > 20 || !pwdVerify(password)) {
      setErrorInfo('密码8-20位字符, 必须包含大小写字母和数字');
      return false;
    }
    setErrorInfo('');
    return true;
  }, [userName, password]);

  const handleLoginSuccess = React.useCallback(
    (data) => {
      // 老项目抛弃之后修改
      window.sessionStorage.userinfo = JSON.stringify(data);
      // 老项目抛弃之后修改
      setUser(data);
    },
    [setUser],
  );

  const senseSuccess = React.useCallback(
    async (sense) => {
      try {
        const data = await loginByUserName({
          username: getUserName(),
          password: md5(getPassword()),
          type: 0,
          ...sense,
        });
        setLoading1(false);
        if (data.need2FA) {
          const type = {
            GA: 'google',
            EMAIl: 'email',
            MOBILE: 'mobile',
          };
          setVerify(type[data.authType]);
          setType('login');
          setVerifyUserName(getUserName());
          setVerifyPassword(md5(getPassword()));
          setVerifyRequestId(data.requestId);
        } else {
          handleLoginSuccess(data);
        }
      } catch (e) {
        setErrorInfo(e.response.data.msg);
        setLoading1(false);
      }
    },
    [
      getPassword,
      getUserName,
      handleLoginSuccess,
      setType,
      setVerify,
      setVerifyPassword,
      setVerifyRequestId,
      setVerifyUserName,
    ],
  );

  return (
    <Container>
      <Wrapper className="col-center">
        <div className="inner" id="inner">
          <h4>{t`欢迎来到Mexo`}</h4>
          <p className="tips">{t`使用邮箱，手机号或者二维码登录`}</p>
          <div className="tabs row-start">
            <p className={`${state === 'account' ? 'active' : 'default'}`} onClick={() => setState('account')}>
              {t`账户`}
            </p>
            <p className={`${state === 'qrcode' ? 'active' : 'default'}`} onClick={() => setState('qrcode')}>
              {t`二维码`}
            </p>
          </div>
          {state === 'account' && (
            <div className="account">
              <p className="label">{t`邮箱/手机号`}</p>
              <Input
                value={userName}
                onChange={setUsername}
                onBlur={verifyLoginInfo}
                className="input"
                size="lg"
                placeholder={t`请输入邮箱/手机号`}
                clear
              />
              <p className="label">{t`登录密码`}</p>
              <Input
                value={password}
                onChange={setPassword}
                onBlur={verifyLoginInfo}
                className="input"
                type={eye ? 'text' : 'password'}
                size="lg"
                placeholder={t`请输入登录密码`}
                suffix={<i className={`iconfont icon-${eye ? 'show' : 'hide'}`} onClick={() => setEye((v) => !v)} />}
                clear
              />
              <p className="error">{errorInfo}</p>

              <Button
                loading={loading1}
                size="lg"
                onClick={() => {
                  if (verifyLoginInfo()) {
                    setLoading1(true);
                    senseVerify();
                  }
                }}
              >
                {t`继续`}
              </Button>

              <p className="forget" onClick={() => history.push('/forget')}>
                {t`忘记密码`}
              </p>
              <p className="jump">
                <Trans>你好{<span>21212</span>}</Trans>
                {/* {t`还不是用户？${(<span onClick={() => history.push('/signup')}>Sign Up</span>)}`} */}
                {/* <span>Not a member ? </span>
                <span onClick={() => history.push('/signup')}>Sign Up</span> */}
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
      <Sense
        onSuccess={senseSuccess}
        onError={() => {
          senseReset();
          message.error('Please reload and try again');
        }}
        wrapRef={senseRef}
      />
    </Container>
  );
};

export default Login;
