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