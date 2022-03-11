import { useState, useImperativeHandle } from 'react';
import { SENSE_ID } from '@/config/const';
import { getGeetestInfo } from '@/services/account';
import { useMount, useUpdateEffect, useExternal } from 'ahooks';
import { cloneElement } from '@/components/_util/reactNode';
import styled from 'styled-components';

const XXXX = styled.div`
  position: relative;
  height: 46px;
  /* overflow: hidden; */
  &:hover {
    /* 重写button hover效果 */
  }
  .底部 {
    position: relative;
    z-index: 1;
  }
  .geetest_holder,
  .geetest_wind,
  .geetest_radar_click_ready {
    position: absolute !important;
    top: 0;
    left: 0;
    /* opacity: 0; */
    z-index: 2;
  }
`;

interface ISenseProps {
  onSuccess: (payload: { challenge: string; captcha_response: string; captcha_id: string }) => any;
  onError?: (e) => any;
  wrapRef: any;
  children?: React.ReactNode;
}

const Sense: React.FC<ISenseProps> = (props: ISenseProps) => {
  const { onSuccess, onError, wrapRef, children } = props;
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
          ret.appendTo('#xxxxxxxx');
          ret.onSuccess(() => {
            ret.getValidate();
            // const geeResult = ret.getValidate();
            // return;
            // onSuccess({
            //   challenge: geeResult.geetest_challenge,
            //   captcha_response: geeResult.geetest_validate,
            //   captcha_id: SENSE_ID,
            // });
          });
          ret.onError((e) => {
            onError && onError(e);
          });
        },
      );
    }
  }, [status, senseConfig]);

  return <XXXX>{children && cloneElement(children, { className: '底部' })}</XXXX>;
};

export default Sense;
