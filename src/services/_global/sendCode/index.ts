import { request } from 'ice';
import api from '@/config/api';

interface ICaptcha {
  captcha_response: string;
  captcha_id: string;
  challenge: string;
}

interface ISignUpCodeParams extends ICaptcha {
  email: string;
  type: 1; // 注册: 1
}

export default {
  async sendSignUpCode(params: ISignUpCodeParams) {
    const data = await request({
      method: 'POST',
      url: api.SendEmailNotLogin,
      params,
    });
    return data;
  },
};
