import * as React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { containerType, verifyType, loginInfo, forgetInfo } from '@/models/account';
import { userInfo as recoilUserInfo } from '@/models/_global';
import Settings from '@/components/_global/Settings';
import { Input, Button, message } from '@/components';
import { t } from '@lingui/macro';
import { useHistory } from 'ice';
import useSendCode from '@/hooks/useSendCode';
import { loginVerify, checkEmail, checkMobile } from '@/services/account';
import md5 from 'md5';
import { useSafeState } from 'ahooks';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  > .moon {
    width: 50%;
    height: inherit;
    background: #6bd4bc;
    .logo {
      position: absolute;
      top: 17px;
      left: 32px;
      width: 111px;
      height: 26px;
      user-select: none;
      cursor: pointer;
    }
    .backyard {
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
    > .verify {
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
        .label {
          margin-bottom: 5px;
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
      height: inherit;
      > .inner {
        h4 {
          text-align: center;
          font-weight: 600;
          font-size: 26px;
          line-height: 34px;
          color: #000000;
        }
        .tips {
          margin: 10px 0 56px 0;
          text-align: center;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          color: rgba(0, 0, 0, 0.4);
        }
        .success {
          width: 392px;
          height: 292px;
        }
        button {
          display: block;
          margin: 80px auto 0 auto;
          width: 330px;
        }
      }
    }
  }
`;

const VERIFY_TEXT = {
  google: 'Google Authenticator',
  email: 'Email Verification Code',
  mobile: 'Phone Verification Code',
};

const Container: React.FC = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useRecoilState(containerType);
  const setUser = useSetRecoilState(recoilUserInfo);
  const [verify, setVerify] = useRecoilState(verifyType);
  const loginForm = useRecoilValue(loginInfo);
  const forgetForm = useRecoilValue(forgetInfo);
  const history = useHistory();

  // 验证码
  const [countDown, isOver, startCountDown] = useSendCode('emailAuth');
  const [orderId, setOrderId] = React.useState<string>('');
  const [verifyCode, setVerifyCode] = React.useState<string>('');

  const handleSendLoginCode = React.useCallback(() => {
    const { username, request_id } = loginForm;
    const isEmail = verify === 'email';
    const payload = {
      type: 2,
      request_id,
    };
    startCountDown({
      sendType: isEmail ? 'emailAuth' : 'mobileAuth',
      payload: {
        ...payload,
        [isEmail ? 'email' : 'mobile']: username,
        [isEmail ? '' : 'national_code']: '',
      },
      onSuccess: (e) => {
        message.success('Send Success');
        setOrderId(e.orderId);
      },
      onError: (e) => {
        message.error(e.response.data.msg);
      },
    });
  }, [verify, loginForm, startCountDown]);

  const [need2FA, setNeed2FA] = useSafeState<boolean>(false);

  const handleSendForgetCode = React.useCallback(() => {
    const { email, mobile, national_code, sense } = forgetForm;
    const isEmail = verify === 'email';
    if (need2FA) {
      return;
    }
    const payload = {
      type: 3,
      [isEmail ? 'email' : 'mobile']: isEmail ? email : mobile,
      [isEmail ? '' : 'national_code']: national_code,
      ...sense,
    };
    startCountDown({
      sendType: isEmail ? 'emailNotLogin' : 'mobileNotLogin',
      payload,
      onSuccess: (e) => {
        message.success('Send Success');
        setOrderId(e.orderId);
      },
      onError: (e) => {
        message.error(e.response.data.msg);
      },
    });
  }, [forgetForm, need2FA, startCountDown, verify]);

  // 忘记密码
  const [requestId, setRequestId] = useSafeState<string>('');
  const handleForget = React.useCallback(async () => {
    const { email, mobile, national_code } = forgetForm;
    const payload = {
      order_id: orderId,
      verify_code: verifyCode,
    };
    const VERIFY_TYPES = {
      GA: 'google',
      EMAIl: 'email',
      MOBILE: 'mobile',
      ID_CARD: 'id_card',
    };
    if (need2FA) {
      return;
    }
    if (verify === 'email') {
      const data = await checkEmail({ ...payload, email: email || '' });
      setRequestId(data.requestId);
      if (data.need2FA) {
        setNeed2FA(true);
        setVerify(VERIFY_TYPES[data.authType]);
        return;
      }
      setType('default');
      return;
    }
    if (verify === 'mobile') {
      const data = await checkMobile({ ...payload, mobile: mobile || '', national_code: national_code || '' });
      setRequestId(data.requestId);
      if (data.need2FA) {
        setNeed2FA(true);
        setVerify(VERIFY_TYPES[data.authType]);
        return;
      }
      setType('default');
      return;
    }
    // is google?
    // if (verify === '') {
    //   return;
    // }
    setType('default');
  }, [forgetForm, orderId, verifyCode, need2FA, verify, setType, setRequestId, setNeed2FA, setVerify]);

  // 登录
  const [loginLoading, setLoginLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState<string>('');

  const handleLogin = React.useCallback(async () => {
    setLoginLoading(true);
    const { username, request_id } = loginForm;
    const payload = {
      type: 0,
      username,
      password: md5(loginForm.password),
      request_id,
      verify_code: verifyCode,
      order_id: orderId,
      auth_type: 3,
    };
    if (verify === 'email') {
      payload.auth_type = 2;
    }
    if (verify === 'mobile') {
      payload.auth_type = 1;
    }
    if (verify === 'google') {
      payload.auth_type = 3;
    }
    try {
      const data = await loginVerify(payload);
      setLoginLoading(false);
      if (data) {
        // 老项目抛弃之后修改
        window.sessionStorage.userinfo = JSON.stringify(data);
        // 老项目抛弃之后修改
        setUser(data);
      }
    } catch (e) {
      setLoginError(e.response.data.msg);
      setLoginLoading(false);
    }
  }, [loginForm, verify, orderId, verifyCode, setUser]);

  // 注册
  const handleSignup = React.useCallback(async () => {
    history.replace('/home');
  }, [history]);

  return (
    <Wrapper className="row-center">
      <div className="moon">
        <img
          className="logo"
          src={require('@/assets/images/account/logo.svg')}
          alt="moon"
          onClick={() => window.open('https://mexo.io', '_self')}
        />
        <img className="backyard" src={require('@/assets/images/account/moon.webp')} alt="moon" />
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
                <span>{VERIFY_TEXT[verify]}</span>
                <span>{verify === 'email' && forgetForm.email}</span>
                <span>{verify === 'mobile' && forgetForm.mobile}</span>
              </p>
              <Input
                className="input"
                size="lg"
                placeholder="21212"
                value={verifyCode}
                onChange={setVerifyCode}
                suffix={
                  verify !== 'google' &&
                  verify !== 'id_card' && (
                    <p className="send" onClick={handleSendForgetCode}>
                      {isOver ? 'SEND' : `${countDown}s`}
                    </p>
                  )
                }
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
                <span>{VERIFY_TEXT[verify]}</span>
                {verify !== 'google' && <span>{loginForm.username}</span>}
              </p>
              <Input
                value={verifyCode}
                onChange={setVerifyCode}
                className="input"
                size="lg"
                maxLength={6}
                suffix={
                  verify !== 'google' && (
                    <p className="send" onClick={handleSendLoginCode}>
                      {isOver ? 'SEND' : `${countDown}s`}
                    </p>
                  )
                }
                clear
              />
              <p className="error">{loginError}</p>
              <Button size="lg" onClick={handleLogin} loading={loginLoading}>
                Continue
              </Button>
            </div>
          </div>
        )}
        {type === 'signup' && (
          <div className="success col-center">
            <div className="inner">
              <h4>{t`Account created successfully`}</h4>
              <p className="tips">{t`hello`}</p>
              <img className="success" src={require('@/assets/images/account/successfully.webp')} alt="success" />
              <Button size="lg" onClick={handleSignup}>
                Continue
              </Button>
            </div>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Container;
