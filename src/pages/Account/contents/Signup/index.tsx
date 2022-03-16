import * as React from 'react';
import styled from 'styled-components';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { useSessionStorageState } from 'ahooks';
import { containerType, signupInfo } from '@/models/account';
import { userInfo as recoilUserInfo, indexConfig as recoilIndexConfig } from '@/models/_global';
import Container from '@/pages/Account/container';
import { Input, Button, Checkbox, message } from '@/components';
import Sense from '@/components/_global/Sense';
import { pwdVerify } from '@/utils/tools';
import { t, Trans } from '@lingui/macro';
import { useHistory } from 'ice';
import useSendCode from '@/hooks/useSendCode';
import { signup } from '@/services/account';
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
      span {
        color: #06ceab;
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
    .jump {
      margin-top: 17px;
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

const Signup = () => {
  const setType = useSetRecoilState(containerType);
  const setUser = useSetRecoilState(recoilUserInfo);
  const [signupForm, setSignupInfo] = useRecoilState(signupInfo);
  const indexConfig = useRecoilValue(recoilIndexConfig);
  const history = useHistory();

  const [state, setState] = React.useState<'account' | 'email'>('account');
  const [eye, setEye] = React.useState<boolean>(false);

  // signup
  const [senseInfo, setSenseInfo] = React.useState<senseInfoType>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [, setSessionInfo] = useSessionStorageState('userinfo');

  const [orderId, setOrderId] = React.useState<string>('');
  const [inviteCode, setInviteCode] = React.useState<string>('');
  const [verifyCode, setVerifyCode] = React.useState<string>('');

  const verifyForm = React.useMemo(() => {
    const { email, password1, checked } = signupForm;
    if (!email || !password1) return true;
    if (password1.length < 8 || password1.length > 20 || !pwdVerify(password1)) {
      setError(t`passwordSettingRequirements`);
      return true;
    }
    if (!checked) {
      setError(t`checkAgreement`);
      return true;
    }
    setError('');
    return false;
  }, [signupForm]);

  const [countDown, isOver, startCountDown] = useSendCode('emailNotLogin');

  const handleSendCode = React.useCallback(() => {
    const payload = {
      type: 1,
      email: signupForm.email,
      ...senseInfo,
    };

    if (!isOver) return;
    startCountDown({
      payload,
      onSuccess: (e) => {
        message.success(t`sendSuccess`);
        setOrderId(e.orderId);
      },
      onError: (e) => {
        message.error(e.response.data.msg);
      },
    });
  }, [signupForm, senseInfo, isOver, startCountDown]);

  const submitSignup = React.useCallback(async () => {
    try {
      setLoading(true);
      const payload = {
        ...signupForm,
        password1: md5(signupForm.password1),
        password2: md5(signupForm.password1),
        type: 0,
        order_id: orderId,
        verify_code: verifyCode,
        invite_code: inviteCode,
      };
      const data = await signup(payload);
      // 老项目抛弃之后修改
      setSessionInfo(data);
      // 老项目抛弃之后修改
      setUser(data);
      setType('signup');
    } catch (e) {
      setError(e.response.data.msg);
      setLoading(false);
    }
  }, [signupForm, orderId, verifyCode, inviteCode, setSessionInfo, setUser, setType]);

  return (
    <Container>
      <Wrapper className="col-center">
        <div className="inner">
          <h4>{state === 'account' ? t`creatAccount` : t`emailVerification`}</h4>
          <p className="tips">
            {state === 'account' ? (
              t`signUpByEmail`
            ) : (
              <Trans>
                email<span>{signupForm.email}</span>Reminder
              </Trans>
            )}
          </p>
          {state === 'account' && (
            <form className="account">
              <p className="label">{t`email`}</p>
              <Input
                className="input"
                size="lg"
                placeholder={t`enterEmailAdress`}
                value={signupForm.email}
                onChange={(e) => setSignupInfo((v) => ({ ...v, email: e }))}
                clear
              />
              <p className="label">{t`loginPassword`}</p>
              <Input
                className="input"
                type={eye ? 'text' : 'password'}
                size="lg"
                placeholder={t`enterPassword`}
                suffix={<i className={`iconfont icon-${eye ? 'show' : 'hide'}`} onClick={() => setEye((v) => !v)} />}
                value={signupForm.password1}
                onChange={(e) => setSignupInfo((v) => ({ ...v, password1: e }))}
                clear
              />
              <p className="label">{t`referralCodeOptional`}</p>
              <Input
                className="input"
                size="lg"
                placeholder={t`enterReferralCode`}
                value={inviteCode}
                onChange={setInviteCode}
                clear
              />
              <Checkbox
                className="checkbox"
                checked={signupForm.checked}
                onChange={(e) => setSignupInfo((v) => ({ ...v, checked: e }))}
              >
                <p>
                  <Trans>
                    <span>readAndAgree</span>
                    <a href={indexConfig?.userAgreement} target="_blank" rel="noreferrer">
                      TermOfUse
                    </a>
                    <span>And</span>
                    <a href={indexConfig?.privacyAgreement} target="_blank" rel="noreferrer">
                      PrivacyAgreement
                    </a>
                  </Trans>
                </p>
              </Checkbox>
              <p className="error">{error}</p>
              <Sense
                onSuccess={(e) => {
                  setSenseInfo(e);
                  setState('email');
                }}
              >
                <Button size="lg" disabled={verifyForm}>
                  {t`continue`}
                </Button>
              </Sense>
              <p className="jump">
                <Trans>
                  hadAccount<span onClick={() => history.push('/login')}>Login</span>
                </Trans>
              </p>
            </form>
          )}
          {state === 'email' && (
            <div className="email">
              <p className="label">{t`emailCode`}</p>
              <Input
                className="input"
                size="lg"
                placeholder={t`enterEmailCode`}
                maxLength={6}
                suffix={
                  <p className="send" onClick={handleSendCode}>
                    {isOver ? t`send` : `${countDown}S`}
                  </p>
                }
                value={verifyCode}
                onChange={setVerifyCode}
                clear
              />
              <p className="error">{error}</p>
              <Button size="lg" loading={loading} disabled={!verifyCode} onClick={submitSignup}>
                {t`confirm`}
              </Button>
            </div>
          )}
        </div>
      </Wrapper>
    </Container>
  );
};

export default Signup;
