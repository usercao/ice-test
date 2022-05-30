import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import BigNumber from 'bignumber.js';
import { uniq, uniqBy } from 'lodash-es';
import Cookies from 'js-cookie';

dayjs.extend(UTC);

// UTC时间格式化
export const filterTime = (value: string | number, format: 'DD/MM/YYYY' | 'DD/MM/YYYY HH:mm:ss' = 'DD/MM/YYYY') => {
  const stamp = typeof value === 'number' ? value : Number(value);
  return dayjs.utc(stamp).local().format(format);
};

// 首字母大写
export const filterTitleCase = (value: string) => {
  return value.toLowerCase().replace(/^\S/, (s) => s.toUpperCase());
};

// 数字精度 -> X尾随零
export const fliterPrecision = (params: string | number, decimal = 4) => {
  const result = new BigNumber(params).decimalPlaces(decimal, BigNumber.ROUND_DOWN).toString();
  return result;
};

// 数字千位分割
export const fliterThousands = (params: string | number) => {
  return new BigNumber(params).toFormat();
};

// 隐藏文本信息
export const fliterHideText = (params: string, before = 4, after = 4, fuzz = '****') => {
  if (!params || params.length <= before + after) return params;
  return `${params.slice(0, before)}${fuzz}${params.slice(-after)}`;
};

// 邮箱校验
export const verifyEmail = (value: string) => {
  const regexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.([a-zA-Z]{2,4})$/;
  return !regexp.test(value);
};

// 密码校验
export const verifyPassword = (value: string) => {
  if (value.length < 8) return true;
  if (value.length > 20) return true;
  const regexp = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  // const regexp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
  return !regexp.test(value);
};

// IP校验
export const verifyIP = (value: string) => {
  const regexp = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // const regexp = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}/;
  return !regexp.test(value);
};

// 数组元素重复校验
export const verifyRepeat = (value: any[], key?: string) => {
  const temp = value.filter((x) => (key ? x[key] : x));
  const shake = key ? uniqBy(temp, key) : uniq(temp);
  return !(shake.length === temp.length);
};

// UUID(RFC4122) -> https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid#answer-2117523
export const uuidv4 = () => {
  const UINT36 = '10000000-1000-4000-8000-100000000000';
  // eslint-disable-next-line no-bitwise
  const random = (x: string) => ((Number(x) ^ crypto.getRandomValues(new Uint8Array(1))[0]) & 15) >> (Number(x) / 4);
  return UINT36.replace(/[018]/g, (x) => random(x)!.toString(16));
};

// 兼容老项目语言环境
export const getCookieLan = () => {
  const locale = Cookies.get('locale') || 'en-US';
  if (!locale.indexOf('-')) return locale;
  const [a, b] = locale.split('-');
  return `${a}-${b.toUpperCase()}`;
};

// blob下载
export const download = (fileName: string, content: any) => {
  if (!('download' in document.createElement('a'))) {
    return 'Please Replace Browser';
  }
  const blob = new Blob([content], { type: '' });
  const link = document.createElement('a');
  link.download = fileName;
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
  return '';
};

// 价格/数据单位计算
// export const toNumUnit = (num, precision = 2) => {
//   const unitMap = {
//     1000: 'K',
//     1000000: 'M',
//     1000000000: 'B',
//   };

//   let exponent = 1;
//   Object.keys(unitMap)
//     .reverse()
//     .some((unit) => {
//       if (toNumber(num) >= toNumber(unit)) {
//         exponent = toNumber(unit);
//         return true;
//       }
//       return false;
//     });

//   const output = intercept(num / exponent, precision);
//   const unitStr = `${unitMap[exponent] || ''}`;
//   return unitStr ? `${output}${unitStr}` : `${output}`;
// };
