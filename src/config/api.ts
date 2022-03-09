import { config } from 'ice';

const { VITE_BASE_URL, VITE_BASE_URL_V1 } = config;

export default {
  // send code
  SendEmailNotLogin: `${VITE_BASE_URL}/common/send_email_verify_code`,

  // login
  usernameLogin: `${VITE_BASE_URL}/user/authorize`,
  loginVerify: `${VITE_BASE_URL}/user/authorize_advance`,
  loginQrCode: `${VITE_BASE_URL}/user/get_loginQrCode`,
  qrCodeResult: `${VITE_BASE_URL}/user/get_scan_login_qrcode_result`,

  // sign up
  signUp: `${VITE_BASE_URL}/user/email_signUp`,
};
