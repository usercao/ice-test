import { useMemo } from 'react';
import { currentPair } from '@/stores';
import { useRecoilValue } from 'recoil';
import { getRealPriceConfigOfPair, getSymbolConfigOfPair } from '@/config/symbol-config';

const useSymbolConfig = () => {
  const currentPairState = useRecoilValue(currentPair);

  return useMemo(() => {
    return {
      token0: getSymbolConfigOfPair(currentPairState),
      token1: getSymbolConfigOfPair(currentPairState, 1),
      price: getRealPriceConfigOfPair(currentPairState),
    };
  }, [currentPairState]);
};

export default useSymbolConfig;
