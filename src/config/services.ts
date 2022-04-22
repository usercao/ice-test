import { config } from 'ice';

const { ICE_OLD_API_URI, ICE_FEW_API_URI, ICE_NEW_API_URI } = config;

export default {
  // _global
  downloadLink: `${ICE_NEW_API_URI}/sys/download/link`,
  indexConfig: `${ICE_FEW_API_URI}/basic/index_config`,
  userInfo: `${ICE_OLD_API_URI}/user/get_base_info`,
  headerConfig: 'https://d1ezf9tghjkrb1.cloudfront.net/static',
  marketCurrency: `${ICE_NEW_API_URI}/market/currency`,
  subscribeEmail: `${ICE_NEW_API_URI}/common/subscribe/email`,
  authorizeCancel: `${ICE_OLD_API_URI}/user/authorize_cancel`, // 登出

  // 极验
  geetest: `${ICE_NEW_API_URI}/basic/geev3/register`,

  // send code
  sendEmailForLogin: `${ICE_OLD_API_URI}/user/send_email_verify_code/authorize_advance`,
  sendMobileForLogin: `${ICE_OLD_API_URI}/user/send_sms_verify_code/authorize_advance`,
  sendEmailNotLogin: `${ICE_OLD_API_URI}/common/send_email_verify_code`,
  sendMobileNotLogin: `${ICE_OLD_API_URI}/common/send_sms_verify_code`,
  sendForgetCheck: `${ICE_OLD_API_URI}/user/send_verify_code/find_pwd`,
  // forget
  countries: `${ICE_FEW_API_URI}/basic/countries`,
  checkEmail: `${ICE_OLD_API_URI}/user/email_find_pwd_check1`,
  checkMobile: `${ICE_OLD_API_URI}/user/mobile_find_pwd_check1`,
  check2Fa: `${ICE_OLD_API_URI}/user/find_pwd_check2`,
  resetPwd: `${ICE_OLD_API_URI}/user/find_pwd`,

  // login
  usernameLogin: `${ICE_OLD_API_URI}/user/authorize`,
  loginVerify: `${ICE_OLD_API_URI}/user/authorize_advance`,
  loginQrCode: `${ICE_OLD_API_URI}/user/get_login_qrcode`,
  qrCodeResult: `${ICE_OLD_API_URI}/user/get_scan_login_qrcode_result`,

  // signup
  signup: `${ICE_OLD_API_URI}/user/email_sign_up`,
};
