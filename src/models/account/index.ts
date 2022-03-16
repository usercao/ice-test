import { atom, RecoilState } from 'recoil';

export const containerType: RecoilState<'default' | 'forget' | 'login' | 'signup'> = atom({
  key: 'containerType',
  default: 'default',
});

export const verifyType: RecoilState<'google' | 'email' | 'mobile' | 'id_card'> = atom({
  key: 'resetPassword',
  default: 'google',
});

export const loginInfo: RecoilState<{ request_id: string; username: string; password: string }> = atom({
  key: 'loginInfo',
  default: { request_id: '', username: '', password: '' },
});

export const signupInfo: RecoilState<{ email: string; password1: string; checked: boolean }> = atom({
  key: 'signupInfo',
  default: { email: '', password1: '', checked: false },
});

export const forgetInfo: RecoilState<{
  email?: string;
  national_code?: string;
  mobile?: string;
  type: 'email' | 'mobile' | 'password';
  sense: { challenge: string; captcha_response: string; captcha_id: string };
  request_id: string;
}> = atom({
  key: 'forgetInfo',
  default: {
    type: 'email',
    email: '',
    mobile: '',
    sense: { challenge: '', captcha_response: '', captcha_id: '' },
    request_id: '',
  },
});
