import { useCountDown } from 'ahooks';
import { useCallback, useState } from 'react';
import { sendEmailLoginVerifyCode, sendMobileLoginVerifyCode } from '@/services/_global/sendCode';

const SEND_FUNC = {
  emailAuth: sendEmailLoginVerifyCode,
  mobileAuth: sendMobileLoginVerifyCode,
};

const TIME = 60000;

type SendCodeType = 'mobile' | 'mobileAuth' | 'emailAuth' | 'emailNotLogin' | 'emailAlreadyLogin' | 'emailSetPwd';

interface SendCodePayload {
  type: number; // 2: 登录验证码
  mobile?: string;
  national_code?: string;
  email?: string;
  request_id?: string;
}

type EndType = (() => void) | undefined;

interface IRunParams {
  sendType: SendCodeType;
  payload: SendCodePayload;
  onSuccess?: (e) => void;
  onError?: (e) => void;
  end?: EndType;
}

function useSendCode(defaultType: SendCodeType): [number, boolean, (runParams: IRunParams) => void] {
  const [targetDate, setTargetDate] = useState<number>();
  const [onEnd, setOnEnd] = useState<EndType>(undefined);

  const [countdown] = useCountDown({
    targetDate,
    onEnd,
  });

  const run = useCallback(
    async ({ sendType, payload, end, onSuccess, onError }: IRunParams) => {
      const type = sendType || defaultType;
      try {
        const func = SEND_FUNC[type];
        const data = await func(payload);
        setOnEnd(() => end);
        setTargetDate(Date.now() + TIME);
        onSuccess && onSuccess(data);
      } catch (e) {
        onError && onError(e);
      }
    },
    [defaultType],
  );

  return [Math.round(countdown / 1000), countdown === 0, run];
}

export default useSendCode;
