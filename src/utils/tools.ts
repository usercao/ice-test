import { getRealSymbol, getSymbolConfig, SymbolProps, getRealPriceConfig } from '../config/symbol-config';

const objectProto = Object.prototype;
const objectToString = objectProto.toString;
// const numberTag = '[object Number]';
const symbolTag = '[object Symbol]';
// const funcTag = '[object Function]';
// const genTag = '[object GeneratorFunction]';
// const nullTag = '[object Null]';
// const undefinedTag = '[object Undefined]';

/** Used as references for various `Number` constants. */
const NAN = 0 / 0;
const INFINITY = 1 / 0;
const MAX_INTEGER = 1.7976931348623157e308;

/** Used to match leading and trailing whitespace. */
const reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */
const reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */
const reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt;

export const pwdVerify = (pwd) => /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(pwd);
export const isString = (val) => typeof val === 'string';
export const isUndefined = (value) => value === undefined;
export const isObjectLike = (value) => !!value && typeof value === 'object';
export const isPlainObject = (val) => !!val && typeof val === 'object' && val.constructor === Object;
export const isObject = (value) => {
  const type = typeof value;
  return !!value && (type === 'object' || type === 'function');
};

export const isSymbol = (value) => {
  return typeof value === 'symbol' || (isObjectLike(value) && objectToString.call(value) === symbolTag);
};

export const toNumber = (value) => {
  if (typeof value === 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    const other = typeof value.valueOf === 'function' ? value.valueOf() : value;
    value = isObject(other) ? `${other}` : other;
  }
  if (typeof value !== 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  const isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value)
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : reIsBadHex.test(value)
    ? NAN
    : +value;
};

export const toFinite = (value) => {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    const sign = value < 0 ? -1 : 1;
    return sign * MAX_INTEGER;
  }
  // eslint-disable-next-line no-self-compare
  return value === value ? value : 0;
};

export const toInteger = (value) => {
  const result = toFinite(value);
  const remainder = result % 1;

  // eslint-disable-next-line no-self-compare
  return result === result ? (remainder ? result - remainder : result) : 0;
};

export const isInteger = (value) => typeof value === 'number' && value === toInteger(value);

/*
  trunc
*/
export const intercept = (number, decimal = 8) => {
  let num = Number(number);
  if (isNaN(num) || !isFinite(num)) {
    num = 0;
  }
  let numStr = '';
  if (isInteger(num)) {
    if (decimal > 0) {
      numStr = `${num}.`;
      for (let i = 0; i < decimal; i += 1) {
        numStr = `${numStr}0`;
      }
    } else {
      numStr = `${num}`;
    }
  } else {
    numStr = String(num);
    if (numStr.indexOf('e-') >= 0 || numStr.indexOf('E-') >= 0) {
      numStr = num.toFixed(decimal + 1);
    }
    const numStrSp = numStr.split('.');
    const arrInit = numStrSp[0];
    if (decimal === 0) {
      // fix num=11.1,decimal=0 return 11.
      return `${arrInit}`;
    }
    const arrDecimal = numStrSp[1];
    if (arrDecimal.length < decimal) {
      numStr = `${arrInit}.${arrDecimal}`;
      for (let i = 0; i < decimal - arrDecimal.length; i += 1) {
        numStr = `${numStr}0`;
      }
    } else {
      numStr = `${arrInit}.${arrDecimal.substr(0, decimal)}`;
    }
  }
  return Number(numStr).toString();
};

/**
 * @param value
 * @param accuracy
 * @returns {string}
 */
export const toThousands = (value, accuracy = 0, symbol = true) => {
  const amount = intercept(value, accuracy);
  let regexp = '(\\d)(?=(\\d{3})+\\.)';
  if (amount.indexOf('.') === -1) {
    regexp = '(\\d)(?=(\\d{3})+$)';
  }
  const match = symbol ? '$1,' : '$1';
  // return amount.replace(new RegExp(regexp, 'g'), '$1,')
  return amount.replace(new RegExp(regexp, 'g'), match);
};

/*
  价格/数据单位计算
*/
export const toNumUnit = (num, precision = 2) => {
  const unitMap = {
    1000: 'K',
    1000000: 'M',
    1000000000: 'B',
  };

  let exponent = 1;
  Object.keys(unitMap)
    .reverse()
    .some((unit) => {
      if (toNumber(num) >= toNumber(unit)) {
        exponent = toNumber(unit);
        return true;
      }
      return false;
    });

  const output = intercept(num / exponent, precision);
  const unitStr = `${unitMap[exponent] || ''}`;
  return unitStr ? `${output}${unitStr}` : `${output}`;
};

/*
  将地址处理为展示前6位和后四位
*/
export const fuzzAddress = (str: string, before = 6, after = 4, fuzz = '....') => {
  if (!str || str.length <= before + after) return str;
  return `${str.slice(0, before)}${fuzz}${str.slice(-after)}`;
};

export const getSymbolImg = (symbol: string, theme: 'dark' | 'light' = 'dark') => {
  return `https://t1.bycsi.com/assets/image/coins/${theme}/${symbol?.toLowerCase()}.svg`;
};

/*
  获取交易对SYMBOL
*/
// export const getPairSymbolName = (pair: Pair, idx = 0): string => {
//   return idx === 0 ? getRealSymbol(pair?.token0?.symbol) : getRealSymbol(pair?.token1?.symbol);
// };

/*
  获取Pool币种转换后SYMBOL
*/
export const getPoolSymbolName = (name: string | undefined): string => {
  return getRealSymbol(name);
};

/*
  获取Pool币种转换后SYMBOL_CONFIG
*/
export const getPoolSymbolConfig = (name: string | undefined): SymbolProps => {
  return getSymbolConfig(name);
};

/*
  获取Pool交易对转换后PRICE_CONFIG
*/
export const getPoolRealPriceConfig = (name0: string | undefined, name1: string | undefined): number => {
  return getRealPriceConfig(name0, name1);
};

/*
  获取交易对 logo
*/
// export const getPairLogo = (pair: Pair, idx = 0): string => {
//   return idx === 0 ? pair?.token0?.logo : pair?.token1?.logo;
// };

/*
  判断是否是正确的qty/price格式
*/
export const hasValidNumber = (val, precision = 2) => {
  const reg = new RegExp(`(^[1-9]\\d*(\\.\\d{0,${precision}})?$)|(^0(\\.\\d{0,${precision}})?$)`);
  return reg.test(val);
};

/*
  用来矫正 value 和最大值、最大余额
*/
export const getMaxNumber = (value = 0, max = 999_999_999_999, balance = max, precision = 2) => {
  const realMax = Math.min(max, balance);
  if (value > realMax) {
    return Number(intercept(realMax, precision));
  }
  return value;
};

/*
  根据num正负值获取需要展示颜色的className
 */
export const getUpDownClassName = (num, upClassName = 'long', downClassName = 'short') => {
  const value = Number(num);
  if ((value && value < 0) || (typeof num === 'string' && num.charAt(0) === '-')) {
    return downClassName;
  } else {
    return upClassName;
  }
};

/*
  判断多空颜色
*/
export function isLong(type, side) {
  if (type?.toLowerCase() === 'open') {
    if (side === 1 || side?.toLowerCase?.() === 'short') {
      return 'short';
    } else {
      return 'long';
    }
  } else if (side === 1 || side?.toLowerCase?.() === 'short') {
    return 'long';
  } else {
    return 'short';
  }
}

export function subAddress(address, prev = 6, last = 4) {
  const subbedAddress = `${address.substring(0, prev)}...${address.substring(address.length - last, address.length)}`;
  return subbedAddress.toUpperCase();
}
