import { getPairSymbolName } from '@/utils/tools';

export type SymbolProps = {
  // price: number
  qty: number;
  maxQtyNum: number;
};

export type PriceProps = {
  [token: string]: number;
};

type SymbolListProps = {
  [symbolName: string]: SymbolProps;
};

const DEFAULT_CONFIG = {
  // price: 2,
  qty: 2,
  maxQtyNum: 999_999_999_999,
};

const DEFAULT_PRICE = 2;

const SYMBOL_MAP = {
  mWBTC: 'WBTC',
  mWETH: 'ETH',
  mUSDC: 'USD',
  APEX: 'APEX',
};

/* 
  转换后的symbol配置
 */
const SYMBOL_CONFIG: SymbolListProps = {
  [SYMBOL_MAP.mWBTC]: {
    // price: 2,
    qty: 5,
    // minQtyNum: 0.000_001,
    maxQtyNum: 100_000,
  },
  [SYMBOL_MAP.mWETH]: {
    // price: 2,
    qty: 4,
    // minQtyNum: 0.000_001,
    maxQtyNum: 1_000_000,
  },
  [SYMBOL_MAP.mUSDC]: {
    // price: 2,
    qty: 2,
    maxQtyNum: 999_999_999_999,
  },
  [SYMBOL_MAP.APEX]: {
    // price: 2,
    qty: 4,
    maxQtyNum: 999_999_999_999,
  },
};

const PRICE_CONFIG: PriceProps = {
  [`${SYMBOL_MAP.mWETH}/${SYMBOL_MAP.mWBTC}`]: 4,
  [`${SYMBOL_MAP.mWETH}/${SYMBOL_MAP.mUSDC}`]: 2,
};

export const getRealSymbol = (symbol) => {
  return SYMBOL_MAP[symbol] || symbol;
};

export const getRealPriceConfig = (baseSymbol, lpSymbol) => {
  return PRICE_CONFIG[`${getRealSymbol(baseSymbol)}/${getRealSymbol(lpSymbol)}`] || DEFAULT_PRICE;
};

// export const getRealPriceConfigOfPair = (pair) => {
//   return PRICE_CONFIG[`${getPairSymbolName(pair)}/${getPairSymbolName(pair, 1)}`] || DEFAULT_PRICE;
// };

export const getSymbolConfig = (symbol) => {
  return SYMBOL_CONFIG[getRealSymbol(symbol)] || DEFAULT_CONFIG;
};

// export const getSymbolConfigOfPair = (pair, idx = 0) => {
//   return SYMBOL_CONFIG[getPairSymbolName(pair, idx)] || DEFAULT_CONFIG;
// };

export default SYMBOL_CONFIG;
