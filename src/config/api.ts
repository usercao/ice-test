import { config } from 'ice';

const { ICE_OLD_API_URI, ICE_FEW_API_URI, ICE_NEW_API_URI } = config;

export default {
  // 极验
  geetest: `${ICE_OLD_API_URI}/v1/basic/geev3/register`,

  // send code
  sendEmailForLogin: `${ICE_OLD_API_URI}/user/send_email_verify_code/authorize_advance`,
  sendMobileForLogin: `${ICE_OLD_API_URI}/user/send_sms_verify_code/authorize_advance`,
  sendEmailNotLogin: `${ICE_OLD_API_URI}/common/send_email_verify_code`,
  sendMobileNotLogin: `${ICE_OLD_API_URI}/common/send_sms_verify_code`,
  // forget
  countries: `${ICE_FEW_API_URI}/basic/countries`,

  // login
  usernameLogin: `${ICE_OLD_API_URI}/user/authorize`,
  loginVerify: `${ICE_OLD_API_URI}/user/authorize_advance`,
  loginQrCode: `${ICE_OLD_API_URI}/user/get_login_qrcode`,
  qrCodeResult: `${ICE_OLD_API_URI}/user/get_scan_login_qrcode_result`,

  // signup
  signUp: `${ICE_OLD_API_URI}/user/email_sign_up`,
};
