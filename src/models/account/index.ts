import { atom } from 'recoil';

export const recoilContainerType = atom<'default' | 'forget' | 'login' | 'signup'>({
  key: 'containerType',
  default: 'default',
});

export const recoilVerifyType = atom<'google' | 'email' | 'mobile' | 'id_card'>({
  key: 'resetPassword',
  default: 'google',
});

export const recoilLoginInfo = atom<{ request_id: string; username: string; password: string }>({
  key: 'loginInfo',
  default: { request_id: '', username: '', password: '' },
});

export const recoilSignupType = atom<'account' | 'verify'>({
  key: 'signupType',
  default: 'account',
});

export const recoilSignupInfo = atom<{ email: string; password1: string; checked: boolean }>({
  key: 'signupInfo',
  default: { email: '', password1: '', checked: false },
});

// 登录或者注册第一步验证后的数据
export const recoilGlobalSense = atom<{ challenge: string; captcha_response: string; captcha_id: string } | undefined>({
  key: 'globalSense',
  default: undefined,
});

interface forgetParamsType {
  email?: string;
  national_code?: string;
  mobile?: string;
  type: 'email' | 'mobile' | 'password';
  sense: { challenge: string; captcha_response: string; captcha_id: string };
  request_id: string;
}

export const recoilForgetInfo = atom<forgetParamsType>({
  key: 'forgetInfo',
  default: {
    type: 'email',
    email: '',
    mobile: '',
    sense: { challenge: '', captcha_response: '', captcha_id: '' },
    request_id: '',
  },
});
