import * as React from 'react';
import { SENSE_URI, SENSE_ID } from '@/config/common';
import { getGeetestInfo } from '@/services/account';
import { IGeetestReturn } from '@/typings/account';
import { useRecoilValue } from 'recoil';
import { recoilLoginInfo, recoilSignupInfo, recoilForgetInfo } from '@/models/account';
import useRandomId from '@/hooks/useRandomId';
import { useExternal, useSafeState, useMount, usePrevious } from 'ahooks';
import { verifyPassword, verifyEmail } from '@/utils/tools';
import { useLocation } from 'ice';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .geetest_fullpage_click_box {
    transform: translateX(-108%);
  }
  .geetest_fullpage_pointer {
    position: absolute;
    right: 7px;
    transform: scaleX(-1);
  }
`;

const Wrapper = styled.div<{ level: -1 | 1 }>`
  position: relative;
  cursor: pointer;
  .geetest_holder.geetest_wind {
    position: absolute;
    min-width: auto;
    top: 0;
    right: 0;
    height: 100%;
    opacity: 0;
    z-index: ${(props) => props.level};
  }
`;

interface SenseProps {
  placement?: 'left' | 'right';
  isOver?: boolean;
  children?: React.ReactNode;
  onSuccess: (payload: { challenge: string; captcha_response: string; captcha_id: string }) => any;
  stop?: boolean;
}

const Sense: React.FC<SenseProps> = (props: SenseProps) => {
  const { placement, isOver = true, children, onSuccess, stop = false } = props;
  const previousStop = usePrevious(stop);
  const loginForm = useRecoilValue(recoilLoginInfo);
  const signupForm = useRecoilValue(recoilSignupInfo);
  const forgetForm = useRecoilValue(recoilForgetInfo);
  const status = useExternal(SENSE_URI);
  const uuid = useRandomId();
  const { pathname } = useLocation();

  const [config, setConfig] = useSafeState<IGeetestReturn>();
  const [level, setLevel] = useSafeState<1 | -1>(-1);

  const loadSense = React.useCallback(() => {
    const option = {
      gt: config?.gt,
      challenge: config?.challenge,
      offline: !config?.success,
      new_captcha: config?.new_captcha,
      product: 'float',
      width: '100%',
      // 老项目抛弃之后修改
      lang: JSON.parse(window.localStorage.ice_locale),
      // 老项目抛弃之后修改
    };
    const captchaBox = document.getElementById(uuid);
    if (!captchaBox) return;
    window.initGeetest(option, (sense) => {
      // 兼容ES5语法
      sense.appendTo(captchaBox);
      sense.onSuccess(() => {
        const result = sense.getValidate();
        // setLevel(-1);
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
    // isOver 为false 证明正在倒计时。60s以后才可重新点
    if (isOver) return;
    setLevel(() => -1);
    const timer = window.setTimeout(() => {
      setLevel(() => 1);
    }, 59000);
    return () => clearTimeout(timer);
  }, [isOver, setLevel]);

  React.useEffect(() => {
    if (!previousStop && stop) {
      setLevel(() => 1);
    }
  }, [previousStop, stop, setLevel]);

  React.useEffect(() => {
    if (pathname === '/login') {
      const { username, password } = loginForm;
      if (!username || !password || verifyPassword(password)) {
        setLevel(-1);
        return;
      }
      setLevel(1);
    }
    if (pathname === '/signup') {
      const { email, password1, checked } = signupForm;
      if (!email || !password1 || verifyEmail(email) || verifyPassword(password1) || !checked) {
        setLevel(-1);
        return;
      }
      setLevel(1);
    }
    if (pathname === '/forget') {
      const { email, mobile, type } = forgetForm;
      if ((type === 'email' && (!email || verifyEmail(email))) || (type === 'mobile' && !mobile)) {
        setLevel(-1);
        return;
      }
      setLevel(1);
    }
    setLevel(1);
  }, [pathname, loginForm, signupForm, forgetForm, setLevel]);

  React.useEffect(() => {
    if (status !== 'ready' || !config) return;
    loadSense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, status]);

  return (
    <Wrapper id={uuid} level={level}>
      {placement === 'right' && <GlobalStyle />}
      {children}
    </Wrapper>
  );
};

export default Sense;
