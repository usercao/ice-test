import { config } from 'ice';

const { ICE_OLD_API_URI, ICE_FEW_API_URI, ICE_NEW_API_URI } = config;

export default {
  // send code
  endEmailNotLogin: `${ICE_OLD_API_URI}/common/send_email_verify_code`,

  // 极验
  geetest: `${ICE_OLD_API_URI}/v1/basic/geev3/register`,

  // forget
  countries: `${ICE_FEW_API_URI}/basic/countries`,

  // login
  usernameLogin: `${ICE_OLD_API_URI}/user/authorize`,
  loginVerify: `${ICE_OLD_API_URI}/user/authorize_advance`,
  loginQrCode: `${ICE_OLD_API_URI}/user/get_loginQrCode`,
  qrCodeResult: `${ICE_OLD_API_URI}/user/get_scan_login_qrcode_result`,

  // signup
  signUp: `${ICE_OLD_API_URI}/user/email_signUp`,
};
