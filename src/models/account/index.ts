import { atom, RecoilState } from 'recoil';
import { IUserInfo } from '@/services/account/PropsType';

export const containerType: RecoilState<'default' | 'forget' | 'login' | 'signup'> = atom({
  key: 'containerType',
  default: 'default',
});

export const verifyType: RecoilState<'google' | 'email' | 'mobile'> = atom({
  key: 'resetPassword',
  default: 'google',
});

export const loginInfo: RecoilState<{ request_id: string; username: string; password: string }> = atom({
  key: 'loginInfo',
  default: { request_id: '', username: '', password: '' },
});

export const signUpInfo: RecoilState<{ email: string; password1: string; checked: boolean }> = atom({
  key: 'signUpInfo',
  default: { email: '', password1: '', checked: false },
});

export const forgetInfo: RecoilState<{
  email?: string;
  national_code?: string;
  mobile?: string;
  type: 'email' | 'mobile' | 'password';
}> = atom({
  key: 'forgetInfo',
  default: {
    type: 'email',
  },
});

export const userInfo: RecoilState<IUserInfo> = atom({
  key: 'userInfo',
  default: {
    accounts: [],
    antiPhishingCode: '',
    bindGA: false,
    bindPassword: false,
    bindTradePwd: false,
    customLabelList: [],
    defaultAccountId: '',
    displayLevel: '',
    email: '',
    inviteUserId: '',
    isAgent: 0,
    isComplianceVerify: false,
    kycLevel: 0,
    kycVerifyStatus: 0,
    lastLoginDate: '',
    lastLoginIp: '',
    mobile: '',
    nationalCode: '',
    platfrom: '',
    registerDate: '',
    registerType: 0,
    secondLevelInviteUserId: '',
    source: '',
    userId: '',
    userType: 0,
    verifyStatus: 0,
  },
});
