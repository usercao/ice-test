// ===========================================
// ============= Params ======================
// ===========================================
export interface ILoginParams {
  type: number; // 0邮箱
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

export interface IUserInfo {
  accounts: any[];
  antiPhishingCode: string;
  bindGA: boolean;
  bindPassword: boolean;
  bindTradePwd: boolean;
  customLabelList: any[];
  defaultAccountId: string;
  displayLevel: string;
  email: string;
  inviteUserId: string;
  isAgent: number;
  isComplianceVerify: boolean;
  kycLevel: number;
  kycVerifyStatus: number;
  lastLoginDate: string;
  lastLoginIp: string;
  mobile: string;
  nationalCode: string;
  platfrom: string;
  registerDate: string;
  registerType: number;
  secondLevelInviteUserId: string;
  source: string;
  userId: string;
  userType: number;
  verifyStatus: number;
}

export interface ILoginUserNameReturn {
  authType: 'EMAIL' | 'GA' | 'MOBILE';
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

export interface IQRCode {
  qrcodeTimeLeft: 125;
  success: true;
  ticket: 'lQc0-c490e418b57c4621c5870a4ce196867b9821171fec945270285199eb18fdfba4';
}

export interface IQRCodeConnect {
  qrcodeStatus: 0 | 1;
  qrcodeTimeLeft: 121;
  userInfo?: IUserInfo;
}

export interface IQRCodeError {
  code: 30092;
  msg: 'QR Code no exit or invalid, please refresh and try again';
}
