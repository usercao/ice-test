import { useCountDown as ahooksCountDown } from 'ahooks';
import { useCallback, useState } from 'react';

const TIME = 2000;

type SendCodeType = 'mobile' | 'emailAuth' | 'emailNotLogin' | 'emailAlreadyLogin' | 'emailSetPwd';

type EndType = (() => void) | undefined;

function useCountDown(defaultType: SendCodeType): [number, boolean, (sendType?: SendCodeType, end?: EndType) => void] {
  const [targetDate, setTargetDate] = useState<number>();
  const [onEnd, setOnEnd] = useState<EndType>(undefined);

  const [countdown] = ahooksCountDown({
    targetDate,
    onEnd,
  });

  const run = useCallback(
    (sendType, end) => {
      const type = sendType || defaultType;
      console.log(type);
      setOnEnd(() => end);
      setTargetDate(Date.now() + TIME);
    },
    [defaultType],
  );

  return [Math.round(countdown / 1000), countdown === 0, run];
}

export default useCountDown;
