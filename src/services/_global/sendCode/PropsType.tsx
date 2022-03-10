interface ICaptcha {
  captcha_response: string;
  captcha_id: string;
  challenge: string;
}

// params
export interface ILoginVerifyCodeParams {
  email: string;
  type: 2;
  request_id: string;
}
export interface ISignUpCodeParams extends ICaptcha {
  email: string;
  type: 1; // 注册: 1
}

// response
export interface ILoginVerifyCodeResponse {
  index: string;
  orderId: 2;
}
