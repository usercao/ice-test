import * as React from 'react';
import useSendCode, { SendCodePayload, SendCodeType } from '@/hooks/useSendCode';
import { recoilGlobalSense } from '@/models/account';
import { useRecoilState } from 'recoil';
import { t } from '@lingui/macro';
import { useSafeState, useUpdateEffect, usePrevious } from 'ahooks';
import Sense from '../Sense';
import { Button, message } from '@/components';
import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: hidden;
  .lg {
    padding-left: 10px;
    span {
      font-size: 14px;
    }
  }
`;

interface ISenseReturn {
  challenge: string;
  captcha_response: string;
  captcha_id: string;
}

interface ISendCodeProps {
  placement?: 'left' | 'right';
  payload: SendCodePayload;
  sendType?: SendCodeType;
  senseSuccess?: (data: ISenseReturn) => void;
  sendSuccess?: (data: { index: string; orderId: string }) => void;
  stop?: boolean;
}

const SendCode: React.FC<ISendCodeProps> = (props: ISendCodeProps) => {
  const { placement = 'left', payload, sendType, senseSuccess, sendSuccess, stop = false } = props;
  const previousStop = usePrevious(stop);
  const [countDown, isOver, startCountDown, stopCountdown] = useSendCode('emailNotLogin');
  const [loading, setLoading] = useSafeState<boolean>(false);
  const [senseInfo, setSenseInfo] = useSafeState<ISenseReturn>({
    challenge: '',
    captcha_response: '',
    captcha_id: '',
  });
  const [resend, setResend] = useSafeState<boolean>(false);
  const [globalSense, setGlobalSense] = useRecoilState(recoilGlobalSense);

  const handleSenseSuccess = React.useCallback(() => {
    if (!isOver) return;
    const sense = globalSense || senseInfo;
    setLoading(true);
    senseSuccess?.(sense);
    startCountDown({
      payload: {
        ...payload,
        ...sense,
      },
      sendType,
      onSuccess: (e) => {
        message.success(t`sendSuccess`);
        sendSuccess?.(e);
        setLoading(false);
      },
      onError: (e) => {
        stopCountdown();
        message.error(e.response.data.msg);
        setLoading(false);
      },
    });
  }, [
    isOver,
    globalSense,
    senseInfo,
    setLoading,
    senseSuccess,
    startCountDown,
    payload,
    sendType,
    sendSuccess,
    stopCountdown,
  ]);

  useUpdateEffect(() => {
    if (!senseInfo.captcha_id) return;
    handleSenseSuccess();
  }, [senseInfo]);

  useUpdateEffect(() => {
    if (!previousStop && stop) {
      stopCountdown();
    }
  }, [stop]);

  useUpdateEffect(() => {
    setResend(false);
  }, [sendType]);

  const preGlobalSense = usePrevious(globalSense);
  useUpdateEffect(() => {
    if (globalSense?.captcha_id && !preGlobalSense?.captcha_id) {
      handleSenseSuccess();
    }
  }, [globalSense]);

  const calcText = React.useCallback(() => {
    if (loading) return '';
    if (!isOver) return `${countDown}S`;
    return globalSense || resend ? t`resend` : t`send`;
  }, [countDown, globalSense, isOver, loading, resend]);

  return (
    <Wrapper>
      <Sense
        placement={placement}
        onSuccess={(e) => {
          setGlobalSense(undefined);
          setResend(true);
          setSenseInfo(e);
        }}
        isOver={isOver}
        stop={stop}
      >
        <Button
          type="text"
          size="lg"
          loading={loading}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {calcText()}
        </Button>
      </Sense>
    </Wrapper>
  );
};

export default SendCode;
