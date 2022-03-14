import * as React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useUnmountedRef, useSessionStorageState } from 'ahooks';
import { containerType, userInfo } from '@/models/account';
import Container from '@/pages/Account/container';
import { Input, Button, Checkbox, message } from '@/components';
import Sense from '@/components/_global/Sense';
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

const SignUp = () => {
  const unmountedRef = useUnmountedRef();
  const [, setSsUserInfo] = useSessionStorageState('userinfo', {});
  const setType = useSetRecoilState(containerType);
  const setUser = useSetRecoilState(userInfo);
  const history = useHistory();
  const senseRef = React.useRef<HTMLElement | any>(null);

  const [state, setState] = React.useState<'account' | 'email'>('account');
  const [eye, setEye] = React.useState<boolean>(false);
  const [referralVisible, setReferralVisible] = React.useState<boolean>(true);
  const [checked, setChecked] = React.useState<boolean>(!false);
  const [orderId, setMailId] = React.useState<string>('');

  const [formData, setFormData] = React.useState<{
    email: string;
    password1: string;
    invite_code?: string;
    verify_code: string;
  }>({
    email: '',
    password1: '',
    invite_code: '',
    verify_code: '',
  });

  const changeFormValue = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const senseReset = React.useCallback(() => {
    senseRef.current.sense && senseRef.current.sense.reset();
  }, [senseRef]);

  const [countDown, isOver, startCountDown] = useSendCode('emailNotLogin');
  const handleSendCode = React.useCallback(
    (sense) => {
      const payload = {
        email: formData.email,
        type: 1,
        ...sense,
      };

      if (unmountedRef.current || !isOver) return;
      startCountDown({
        payload,
        onSuccess: (e) => {
          senseReset();
          message.success('Send Success');
          setMailId(e.orderId);
        },
        onError: (e) => {
          senseReset();
          message.error(e.response.data.msg);
        },
      });
    },
    [formData.email, isOver, senseReset, startCountDown, unmountedRef],
  );

  const [errorInfo, setErrorInfo] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSignUp = React.useCallback(async () => {
    try {
      setLoading(true);
      const payload = {
        ...formData,
        type: 0,
        password2: formData.password1,
        order_id: orderId,
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
  }, [formData, orderId, setType, setUser, setSsUserInfo]);

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
                value={formData.email}
                onChange={changeFormValue}
                size="lg"
                placeholder="Enter Email Address"
                clear
              />
              <p className="label">Login Password</p>
              <Input
                className="input"
                name="password1"
                value={formData.password1}
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
                name="invite_code"
                value={formData.invite_code}
                onChange={changeFormValue}
                size="lg"
                placeholder="Enter Referral ID "
                clear
              />
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
                name="verify_code"
                value={formData.verify_code}
                onChange={changeFormValue}
                suffix={
                  <Sense onSuccess={handleSendCode} wrapRef={senseRef} isShow={isOver}>
                    <p className="send">{isOver ? 'SEND' : `${countDown}s`}</p>
                  </Sense>
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
