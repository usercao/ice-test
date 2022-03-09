import { config } from 'ice';

const { VITE_API, VITE_API_V1 } = config;

export default {
  // send code
  SendEmailNotLogin: `${VITE_API}/common/send_email_verify_code`,

  // login
  usernameLogin: `${VITE_API}/user/authorize`,
  loginVerify: `${VITE_API}/user/authorize_advance`,
  loginQrCode: `${VITE_API}/user/get_loginQrCode`,
  qrCodeResult: `${VITE_API}/user/get_scan_login_qrcode_result`,

  // sign up
  signUp: `${VITE_API}/user/email_signUp`,
};
