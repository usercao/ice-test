import * as React from 'react';
import { SENSE_URI, SENSE_ID } from '@/config/const';
import { getGeetestInfo } from '@/services/account';
import { GeetestReturn } from '@/services/account/PropsType';
import { useRecoilValue } from 'recoil';
import { loginInfo, signUpInfo, forgetInfo } from '@/models/account';
import useRandomId from '@/hooks/useRandomId';
import { useExternal, useMount } from 'ahooks';
import { pwdVerify } from '@/utils/tools';
import { useLocation } from 'ice';
import styled from 'styled-components';

const Wrapper = styled.div<{ level: -1 | 1 }>`
  position: relative;
  .geetest_holder.geetest_wind {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    opacity: 0;
    z-index: ${(props) => props.level};
  }
`;

interface SenseProps {
  children?: React.ReactNode;
  onSuccess: (payload: { challenge: string; captcha_response: string; captcha_id: string }) => any;
}

const Sense: React.FC<SenseProps> = (props: SenseProps) => {
  const { children, onSuccess } = props;
  const loginForm = useRecoilValue(loginInfo);
  const signUpForm = useRecoilValue(signUpInfo);
  const forgetForm = useRecoilValue(forgetInfo);
  const status = useExternal(SENSE_URI);
  const uuid = useRandomId();
  const { pathname } = useLocation();

  const [config, setConfig] = React.useState<GeetestReturn>();
  const [level, setLevel] = React.useState<1 | -1>(-1);

  const loadSense = React.useCallback(() => {
    const option = {
      gt: config?.gt,
      challenge: config?.challenge,
      offline: !config?.success,
      new_captcha: config?.new_captcha,
      product: 'float',
      width: '100%',
      // 老项目抛弃之后修改
      lang: window.localStorage.lang ?? 'en',
      // 老项目抛弃之后修改
    };
    const captchaBox = document.getElementById(uuid);
    if (!captchaBox) return;
    window.initGeetest(option, (sense) => {
      // 兼容ES5语法
      sense.appendTo(captchaBox);
      sense.onSuccess(() => {
        const result = sense.getValidate();
        setLevel(-1);
        onSuccess({
          challenge: result.geetest_challenge,
          captcha_response: result.geetest_validate,
          captcha_id: SENSE_ID,
        });
        sense.reset();
      });
      sense.onError(() => {
        sense.reset();
      });
    });
  }, [config, uuid, onSuccess]);

  useMount(async () => {
    const data = await getGeetestInfo(SENSE_ID);
    setConfig(data);
  });

  React.useEffect(() => {
    if (pathname === '/login') {
      const { username, password } = loginForm;
      if (!username || !password) return;
      if (password.length < 8 || password.length > 20 || !pwdVerify(password)) {
        setLevel(-1);
      } else {
        setLevel(1);
      }
    }
    if (pathname === '/signup') {
      const { email, password1, checked } = signUpForm;
      if (!email || !password1) return;
      if (email.length < 8 || password1.length > 20 || !pwdVerify(password1) || !checked) {
        setLevel(-1);
      } else {
        setLevel(1);
      }
    }
    if (pathname === '/forget') {
      const { email, mobile, type } = forgetForm;
      if ((type === 'email' && !email) || (type === 'mobile' && !mobile)) {
        setLevel(-1);
      } else {
        setLevel(1);
      }
    }
  }, [pathname, loginForm, signUpForm, forgetForm]);

  React.useEffect(() => {
    if (status !== 'ready' || !config) return;
    loadSense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, status]);

  return (
    <Wrapper id={uuid} level={level}>
      {children}
    </Wrapper>
  );
};

export default Sense;
