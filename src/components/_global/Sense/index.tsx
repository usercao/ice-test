import { useState, useImperativeHandle } from 'react';
import { SENSE_ID } from '@/config/const';
import { getGeetestInfo } from '@/services/account';
import { useMount, useUpdateEffect, useExternal } from 'ahooks';
import styled from 'styled-components';

const Wrapper = styled.div<{ isShow: boolean }>`
  position: relative;
  .geetest_holder.geetest_wind {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0;
    z-index: ${(props) => (props.isShow ? 1 : -1)};
  }
`;

interface ISenseProps {
  onSuccess: (payload: { challenge: string; captcha_response: string; captcha_id: string }) => any;
  onError?: (e) => any;
  wrapRef: any;
  children?: React.ReactNode;
  isShow: boolean;
}

const Sense: React.FC<ISenseProps> = (props: ISenseProps) => {
  const { onSuccess, onError, wrapRef, children, isShow } = props;
  const [id, setId] = useState<string>('');

  const [senseConfig, setSenseConfig] = useState({
    challenge: '',
    gt: '',
    new_captcha: true,
    success: 1,
  });

  const [sense, setSense] = useState<any>(null);

  const status = useExternal('https://static.geetest.com/static/tools/gt.js', {
    js: {
      async: true,
    },
  });

  useMount(async () => {
    const data = await getGeetestInfo(SENSE_ID);
    setSenseConfig(data);
    setId(String(Math.floor(Math.random() * 4e20)));
  });

  useImperativeHandle(wrapRef, () => {
    return {
      sense,
    };
  });

  useUpdateEffect(() => {
    if (status === 'ready' && senseConfig.gt && id) {
      window.initGeetest(
        {
          lang: window.localStorage.lang ? window.localStorage.lang : 'en',
          gt: senseConfig.gt,
          challenge: senseConfig.challenge,
          offline: !senseConfig.success,
          new_captcha: senseConfig.new_captcha,
          product: 'float',
          width: '100%',
        },
        (ret) => {
          setSense(ret);
          ret.appendTo(`#${id}`);
          ret.onSuccess(() => {
            const geeResult = ret.getValidate();
            onSuccess({
              challenge: geeResult.geetest_challenge,
              captcha_response: geeResult.geetest_validate,
              captcha_id: SENSE_ID,
            });
          });
          ret.onError((e) => {
            onError && onError(e);
          });
        },
      );
    }
  }, [status, senseConfig, id]);

  return (
    <Wrapper id={id} isShow={isShow}>
      {children}
    </Wrapper>
  );
};

export default Sense;
