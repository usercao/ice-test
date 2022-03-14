import * as React from 'react';
import { SENSE_URI, SENSE_ID } from '@/config/const';
import { getGeetestInfo } from '@/services/account';
import { GeetestReturn } from '@/services/account/PropsType';
import { useRecoilValue } from 'recoil';
import { loginInfo, containerType } from '@/models/account';
import useRandomId from '@/hooks/useRandomId';
import { useExternal, useMount } from 'ahooks';
import { pwdVerify } from '@/utils/tools';
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
  const accountType = useRecoilValue(containerType);
  const status = useExternal(SENSE_URI);
  const uuid = useRandomId();

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
      lang: window.localStorage.lang ?? 'en',
    };
    window.initGeetest(option, (sense) => {
      // 兼容ES5语法
      sense.appendTo(`#${uuid}`);
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
    if (accountType === 'login') {
      const { username, password } = loginForm;
      if (!username || !password) return;
      if (password.length < 8 || password.length > 20 || !pwdVerify(password)) {
        setLevel(1);
      }
    }
    // if (accountType === 'signup') {
    // }
  }, [accountType, loginForm]);

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
