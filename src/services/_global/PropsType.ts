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

// ============= 基础配置 =====================
interface IndexConfigShares {
  shareKey: 'facebook';
  iconUrl: '';
  shareUrl: 'https://www.facebook.com/mexo.io/';
}

interface IndexConfigBanners {
  imgUrl: 'https://static.mexo.vip/banner/fTWy_ZziT7CvpkzLn1YXds4r6bLGtu50m9zJ1VBFK-Q.png';
  h5ImageUrl: '';
  isDirect: true;
  directUrl: '';
  sort: 9;
}

interface IndexConfigAnnouncements {
  title: 'CAMBIO DE DIRECCIÓN DE DEPÓSITO DE LA ACTUALIZACIÓN DE WALLET';
  detail: '';
  isDirect: true;
  directUrl: 'https://mexo.zendesk.com/hc/es-mx/articles/4411595527188';
  publishTime: '1640966400000';
  sort: 5;
}

interface IndexConfigFootConfigListItems {
  nofollow: true;
  blank: true;
  children: [];
  link: 'mailto:support@mexo.zendesk.com';
  text: 'Correo electrónico de Mexo';
}

interface IndexConfigFootConfigList {
  caption: 'Sobre Nosotros';
  items: IndexConfigFootConfigListItems[];
}

interface IndexConfigHeadConfigListChildren {
  nofollow: false;
  blank: false;
  link: 'https://www.mexo.io/crypto-spot-trading/BTC/USDT';
  text: 'USDⓈ';
}

interface IndexConfigHeadConfigList {
  nofollow: true;
  blank: false;
  children: IndexConfigHeadConfigListChildren[];
  link: 'https://www.mexo.io/markets?isSpot\u003dtrue';
  text: 'Mercados';
}

interface IndexConfigIndexModules {
  moduleName: 'oneKeyBuy';
}

export interface IIndexConfig {
  orgId: '9001';
  logo: 'https://static.mexo.vip/bhop/image/bq5dtr6m7-zYTEUkJJhDxV9YGgMdLunMepMNGOCMSXE.png';
  favicon: 'https://static.mexo.vip/bhop/image/Xjvw-wngkxeZZHsGoTLbe57qI-dwyXQHtAheXzkU2Pk.png';
  copyright: '';
  zendesk: 'https://static.zdassets.com/ekr/snippet.js?key\u003d5578e5f2-96c4-4718-b3c6-89ea2a6b880b';
  shares: IndexConfigShares[];
  title: 'Mexo.io';
  keywords: '';
  description: 'El intercambio más confiable y fácil de usar para comprar, vender e intercambiar criptomonedas en México y LATAM';
  banners: IndexConfigBanners[];
  smallBanners: [];
  announcements: IndexConfigAnnouncements[];
  announcementMoreUrl: '';
  userAgreement: 'https://mexo.zendesk.com/hc/es-mx/articles/360037117372-Acuerdo-de-Usuario-Mexo';
  userOptionAgreement: '';
  userFuturesAgreement: '';
  privacyAgreement: 'https://mexo.zendesk.com/hc/en-mx/articles/360037484071-Mexo-Privacy-Policy';
  videoVerifyAgreement: '';
  customerService: '';
  optionCustomerService: '';
  futuresCustomerService: '';
  futuresOpenWithAnswer: false;
  optionOpenWithAnswer: false;
  footConfigList: IndexConfigFootConfigList[];
  headConfigList: IndexConfigHeadConfigList;
  shareConfig: {
    logoUrl: 'https://static.mexo.vip/bhop/image/1WxfjIEKgzFRARBJghzneBXgVZXO-Vde_L8YBEZigGs.png';
    watermarkImageUrl: 'https://static.mexo.vip/bhop/image/aiCBCgDPJNvC1-JRdjem0JB-SOyA2-pNsNdzr33iUYQ.png';
    title: 'Mexo';
    description: 'Intercambio de Activo Digital';
    openUrl: 'https://download.mexo.io/download?language\u003des-es';
    openUrlImgBase64: '';
    contractProfitShareTitles: [];
    contractLossShareTitles: [];
    contractZeroShareTitles: [];
  };
  indexModules: IndexConfigIndexModules[];
  logoUrl: '';
}
// ============= 基础配置 =====================
