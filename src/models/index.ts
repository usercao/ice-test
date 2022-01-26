import { atom, RecoilState } from 'recoil';
import { localStorageEffect } from './_util';
import { SupportedLocale, DEFAULT_LOCALE, LOCALE_STORAGE } from '@/config/locales';

export const locale: RecoilState<SupportedLocale> = atom({
  key: 'locale',
  default: DEFAULT_LOCALE,
  effects_UNSTABLE: [localStorageEffect<string>(LOCALE_STORAGE)],
});

export const isDark = atom({
  key: 'theme',
  default: false,
});

export const timestamp = atom({
  key: 'timestamp',
  default: () => Date.now(),
});

export const walletAddress = atom({
  key: 'walletAddress',
  default: '',
});

export const walletConnect = atom({
  key: 'walletConnect',
  default: {
    connectState: false, // 钱包登录状态
    connectMsg: '',
  },
});

export const walletName = atom({
  key: 'walletName',
  default: '',
  effects_UNSTABLE: [localStorageEffect('walletName')],
});

// export const currentPair: RecoilState<Pair> = atom({
//   key: 'currentPair',
//   default: new Pair(),
//   effects_UNSTABLE: [localStorageEffect('currentPair')],
// })

export const swapConfig = atom({
  key: 'swapConfig',
  default: {
    slippage: '0.5',
    timeOut: 60 * 30,
  },
  effects_UNSTABLE: [localStorageEffect('swap_config')],
});

// 连接钱包 弹窗控制
export const walletModelVisible = atom({
  key: 'walletModelVisible',
  default: false,
});

// 下单区预下单数据 用来做下单试算
export const preTrial = atom({
  key: 'preTrial',
  default: null,
});
