import { config } from 'ice';

export default {
  // send code
  SendEmailNotLogin: `${config.api}/common/send_email_verify_code`,

  // login
  usernameLogin: `${config.api}/user/authorize`,
  loginVerify: `${config.api}/user/authorize_advance`,
  loginQrCode: `${config.api}/user/get_loginQrCode`,
  qrCodeResult: `${config.api}/user/get_scan_login_qrcode_result`,

  // sign up
  signUp: `${config.api}/user/email_signUp`,
};
