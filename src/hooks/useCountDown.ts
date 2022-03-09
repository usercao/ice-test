import { useCountDown as ahooksCountDown } from 'ahooks';
import { useCallback, useState } from 'react';

const TIME = 5000;

type SendCodeType = 'mobile' | 'emailAuth' | 'emailNotLogin' | 'emailAlreadyLogin' | 'emailSetPwd';

function useCountDown(defaultType: SendCodeType): [number, boolean, (sendType?: SendCodeType) => void] {
  const [targetDate, setTargetDate] = useState<number>();

  const [countdown] = ahooksCountDown({
    targetDate,
  });

  const run = useCallback(
    (sendType) => {
      const type = sendType || defaultType;
      console.log(type);
      setTargetDate(Date.now() + TIME);
    },
    [defaultType],
  );

  return [Math.round(countdown / 1000), countdown === 0, run];
}

export default useCountDown;
