import { useState, useImperativeHandle } from 'react';
import { SENSE_ID } from '@/config/const';
import { getGeetestInfo } from '@/services/account';
import { useMount, useUpdateEffect, useExternal } from 'ahooks';

interface ISenseProps {
  onSuccess: (payload: { challenge: string; captcha_response: string; captcha_id: string }) => any;
  onError?: (e) => any;
  wrapRef: any;
}

const Sense: React.FC<ISenseProps> = (props: ISenseProps) => {
  const { onSuccess, onError, wrapRef } = props;
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
  });

  useImperativeHandle(wrapRef, () => {
    return {
      sense,
    };
  });

  useUpdateEffect(() => {
    if (status === 'ready' && senseConfig.gt) {
      window.initGeetest(
        {
          lang: window.localStorage.lang ? window.localStorage.lang : 'en',
          gt: senseConfig.gt,
          challenge: senseConfig.challenge,
          offline: !senseConfig.success,
          new_captcha: senseConfig.new_captcha,
          product: 'float',
          width: '300px',
        },
        (ret) => {
          setSense(ret);
          ret.appendTo('#inner');
          ret.onSuccess(() => {
            const geeResult = ret.getValidate();
            return;
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
  }, [status, senseConfig]);

  return <span />;
};

export default Sense;
