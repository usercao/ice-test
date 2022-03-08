import { atom, RecoilState } from 'recoil';

export const containerType: RecoilState<'default' | 'forget' | 'login' | 'signup'> = atom({
  key: 'containerType',
  default: 'default',
});

export const verifyType: RecoilState<'google' | 'email' | 'mobile'> = atom({
  key: 'resetPassword',
  default: 'google',
});
