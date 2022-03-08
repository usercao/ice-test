import { request } from 'ice';
import api from '@/config/api';

interface ILoginParams {
  type: 0; // 0邮箱
  username: string;
  password: string;
  captcha_response: string;
  captcha_id: string;
  challenge: string;
}
interface ILoginVerifyParams {
  type: 0; // 0 邮箱
  username: string;
  password: string;
  request_id: string; // 第一步返回
  auth_type: 2 | 3; // ga: 3, email: 2,
  verify_code: string;
  order_id?: string; // 验证码发送成功后的id
}

interface ISignUpParams {
  type: 0; // 0邮箱
  email: string;
  password1: string;
  password2: string;
  verify_code: string;
  order_id: string;
  invite_code?: string;
}

export default {
  // 登录
  async loginByUserName(params: ILoginParams) {
    const data = await request({
      method: 'POST',
      url: api.usernameLogin,
      params,
    });
    return data;
  },

  async loginVerify(params: ILoginVerifyParams) {
    const data = await request({
      method: 'POST',
      url: api.loginVerify,
      params,
    });
    return data;
  },

  async getloginQrCode() {
    await request(api.loginQrCode);
  },

  async getloginqrCodeResult(ticket: string) {
    return await request({
      url: api.qrCodeResult,
      params: { ticket },
    });
  },

  // 注册
  async signUp(params: ISignUpParams) {
    return await request({
      method: 'POST',
      url: api.signUp,
      params,
    });
  },
};
