// ===========================================
// ============= Params ======================
// ===========================================

// ===========================================
// ============= Response ====================
// ===========================================
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

export interface IDownload {
  data: {
    androidLink: 'https://static.mexo.vip/app/android/mexo_io_2.0.8_8792.apk';
    appStore: 'https://apps.apple.com/us/app/mexo/id1555609032';
    googlePlay: 'https://play.google.com/store/apps/details?id=io.mexo.app';
    iosLink: 'https://testflight.apple.com/join/5fCNpa7u';
    pageLink: 'https://download.mexo.io/download';
    testFlight: 'https://apps.apple.com/cn/app/testflight/id899247664';
  };
}
