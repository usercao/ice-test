import { IUserInfo } from '@/models/account/PropsType';
// ===========================================
// ============= Params ======================
// ===========================================
export interface ILoginParams {
  type: 0; // 0邮箱
  username: string;
  password: string;
  captcha_response: string;
  captcha_id: string;
  challenge: string;
}
export interface ILoginVerifyParams {
  type: number; // 用户名登录 永远为0
  username: string;
  password: string;
  request_id: string; // 第一步返回
  auth_type: number; // ga: 3, email: 2 mobile: 1,
  verify_code: string;
  order_id?: string; // 验证码发送成功后的id
}
export interface ISignUpParams {
  type: number; // 0邮箱
  email: string;
  password1: string;
  password2: string;
  verify_code: string;
  order_id: string;
  invite_code?: string;
}
// ===========================================
// ============= Response ====================
// ===========================================
export type CountriesReturnType = Array<{
  allowBindMobile: 1;
  allowKyc: 1;
  allowLogin: 1;
  allowRegister: 1;
  countryName: 'Mexico';
  id: '148';
  indexName: 'Mexico';
  logo: 'https://d1ezf9tghjkrb1.cloudfront.net/country/MX.png';
  nationalCode: '52';
  shortName: 'MX';
}>;

export interface GeetestReturn {
  challenge: string;
  gt: string;
  new_captcha: boolean;
  success: number;
}
export interface ILoginUserNameReturn {
  authType: 'EMAIL' | 'GA' | 'MOBILE' | '';
  bindEmail: boolean;
  bindGA: boolean;
  bindMobile: boolean;
  email: string;
  mobile: string;
  nationalCode: string;
  requestId: string;
  need2FA: boolean;
  registerType: number;
  user?: IUserInfo;
}
