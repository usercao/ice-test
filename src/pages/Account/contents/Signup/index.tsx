import * as React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useUnmountedRef, useSessionStorageState } from 'ahooks';
import { containerType, userInfo, signUpInfo } from '@/models/account';
import Container from '@/pages/Account/container';
import { Input, Button, Checkbox, message } from '@/components';
import Sense from '@/components/_global/Sense';
import { pwdVerify } from '@/utils/tools';
import { t } from '@lingui/macro';
import { useHistory } from 'ice';
import useSendCode from '@/hooks/useSendCode';
import { signUp } from '@/services/account';

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
    .icon-show,
    .icon-hide {
      margin-left: 8px;
      cursor: pointer;
      font-size: 12px;
      &:hover {
        color: #06ceab;
      }
    }
    .icon-arrow-up-filling {
      margin-left: 6px;
      cursor: pointer;
      font-size: 12px;
      color: #aeb1b6;
      transition: all 0.3s ease-in-out;
      transform: rotate(0deg) scale(0.8);
      display: inline-block;
      &.down {
        transform: rotate(180deg) scale(0.8);
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
interface senseInfoType {
  challenge: string;
  captcha_response: string;
  captcha_id: string;
}

const SignUp = () => {
  const unmountedRef = useUnmountedRef();
  const [, setSsUserInfo] = useSessionStorageState('userinfo', {});
  const setType = useSetRecoilState(containerType);
  const setUser = useSetRecoilState(userInfo);
  const history = useHistory();

  const [state, setState] = React.useState<'account' | 'email'>('account');
  const [eye, setEye] = React.useState<boolean>(false);
  const [referralVisible, setReferralVisible] = React.useState<boolean>(true);
  const [senseInfo, setSenseInfo] = React.useState<senseInfoType>();

  const [error, setError] = React.useState<string>('');
  const [signUpForm, setSignUpForm] = useRecoilState(signUpInfo);
  const [orderId, setOrderId] = React.useState<string>('');
  const [inviteCode, setInviteCode] = React.useState<string>('');
  const [verifyCode, setVerifyCode] = React.useState<string>('');

  const changeFormValue = (value, name) => {
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const verifyInput = React.useMemo(() => {
    const { email, password1, checked } = signUpForm;
    if (!email || !password1) return true;
    if (password1.length < 8 || password1.length > 20 || !pwdVerify(password1)) {
      setError('密码8-20位字符, 必须包含大小写字母和数字');
      return true;
    }
    if (!checked) {
      setError('请勾选协议');
      return true;
    }
    setError('');
    return false;
  }, [signUpForm]);

  const [countDown, isOver, startCountDown] = useSendCode('emailNotLogin');
  const handleSendCode = React.useCallback(() => {
    const payload = {
      type: 1,
      email: signUpForm.email,
      ...senseInfo,
    };

    if (unmountedRef.current || !isOver) return;
    startCountDown({
      payload,
      onSuccess: (e) => {
        message.success('Send Success');
        setOrderId(e.orderId);
      },
      onError: (e) => {
        message.error(e.response.data.msg);
      },
    });
  }, [signUpForm.email, senseInfo, unmountedRef, isOver, startCountDown]);

  const [errorInfo, setErrorInfo] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSignUp = React.useCallback(async () => {
    try {
      setLoading(true);
      const payload = {
        ...signUpForm,
        password2: signUpForm.password1,
        type: 0,
        order_id: orderId,
        verify_code: verifyCode,
        invite_code: inviteCode,
      };
      const data = await signUp(payload);
      if (data.user) {
        // 老项目抛弃之后修改
        setSsUserInfo(data.user);
        // 老项目抛弃之后修改
        setUser(data.user);
        setType('signup');
      }
    } catch (e) {
      setErrorInfo(e.response.data.msg);
      setLoading(false);
    }
  }, [signUpForm, orderId, verifyCode, inviteCode, setSsUserInfo, setUser, setType]);

  return (
    <Container>
      <Wrapper className="col-center">
        <div className="inner">
          <h4>{t`hello`}</h4>
          <p className="tips">{state === 'account' ? t`hello` : <span>3231331313</span>}</p>
          {state === 'account' && (
            <form className="account">
              <p className="label">Email / Phone Number</p>
              <Input
                className="input"
                name="email"
                value={signUpForm.email}
                onChange={changeFormValue}
                size="lg"
                placeholder="Enter Email Address"
                clear
              />
              <p className="label">Login Password</p>
              <Input
                className="input"
                name="password1"
                value={signUpForm.password1}
                onChange={changeFormValue}
                type={eye ? 'text' : 'password'}
                size="lg"
                placeholder="Enter Password"
                suffix={<i className={`iconfont icon-${eye ? 'show' : 'hide'}`} onClick={() => setEye((v) => !v)} />}
                clear
              />
              <p className="label">
                Referral ID (Optional)
                <i
                  className={`iconfont icon-arrow-up-filling ${referralVisible ? '' : 'down'}`}
                  onClick={() => {
                    setReferralVisible(!referralVisible);
                  }}
                />
              </p>
              <Input
                className="input"
                value={inviteCode}
                onChange={setInviteCode}
                size="lg"
                placeholder="Enter Referral ID "
                clear
              />
              <Checkbox
                className="checkbox"
                checked={signUpForm.checked}
                onChange={(e) => {
                  changeFormValue(e, 'checked');
                }}
              >
                <p>
                  <span>I have read and agreed </span>
                  <a onClick={() => console.log(111)}>Terms of Use </a>
                  <span>and </span>
                  <a onClick={() => console.log(111)}>Privacy Agreement</a>
                </p>
              </Checkbox>
              <p className="error">{error}</p>
              <Sense
                onSuccess={(e) => {
                  setSenseInfo(e);
                  setState('email');
                }}
              >
                <Button size="lg" disabled={verifyInput}>
                  Continue
                </Button>
              </Sense>
              <p className="jump">
                <span>Already have an account? Log In ? </span>
                <span onClick={() => history.push('/login')}>Log In</span>
              </p>
            </form>
          )}
          {state === 'email' && (
            <div className="email">
              <p className="label">Email Verification Code</p>
              <Input
                className="input"
                size="lg"
                placeholder="Enter Email Verification Code"
                maxLength={6}
                value={verifyCode}
                onChange={setVerifyCode}
                suffix={
                  <p className="send" onClick={handleSendCode}>
                    {isOver ? 'SEND' : `${countDown}s`}
                  </p>
                }
                clear
              />
              <p className="error">{errorInfo}</p>
              <Button
                size="lg"
                loading={loading}
                onClick={() => {
                  handleSignUp();
                }}
              >
                Confirm
              </Button>
            </div>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

export default SignUp;
