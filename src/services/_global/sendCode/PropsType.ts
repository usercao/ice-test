interface ICaptcha {
  captcha_response: string;
  captcha_id: string;
  challenge: string;
}

// params
export interface ILoginVerifyCodeParams {
  type: 2; // 登录: 2
  request_id: string;
  email?: string;
  national_code?: string;
  mobile?: string;
}
export interface INotLoginCodeParams extends ICaptcha {
  email: string;
  type: number; // 注册: 1
}

// response
export interface IVerifyCodeResponse {
  index: string;
  orderId: 2;
}
