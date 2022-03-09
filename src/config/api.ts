import { config } from 'ice';

const { ICE_OLD_API_URI, ICE_FEW_API_URI, ICE_NEW_API_URI } = config;

export default {
  // send code
  SendEmailNotLogin: `${ICE_FEW_API_URI}/common/send_email_verify_code`,

  // forget
  countries: `${ICE_OLD_API_URI}/basic/countries`,

  // login
  usernameLogin: `${ICE_OLD_API_URI}/user/authorize`,
  loginVerify: `${ICE_OLD_API_URI}/user/authorize_advance`,
  loginQrCode: `${ICE_OLD_API_URI}/user/get_loginQrCode`,
  qrCodeResult: `${ICE_OLD_API_URI}/user/get_scan_login_qrcode_result`,

  // signup
  signUp: `${ICE_OLD_API_URI}/user/email_signUp`,
};
