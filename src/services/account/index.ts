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
  // 用户名密码登录
  async loginByUserName(params: ILoginParams) {
    const data: {
      bindGA: boolean;
      bindMobile: boolean;
      bindEmail: boolean;
    } = await request({
      method: 'POST',
      url: api.login_qrcode,
      params,
    });
    return data;
  },

  // 验证码登录
  async getLoginQrCode() {
    return await request(api.login_qrcode);
  },

  async getLoginQrCodeResult(ticket: string) {
    return await request({
      url: api.qrcode_result,
      params: { ticket },
    });
  },

  // 注册
  async signUp(params: ISignUpParams) {
    return await request({
      method: 'POST',
      url: api.sign_up,
      params,
    });
  },
};
