interface ICaptcha {
  captcha_response: string;
  captcha_id: string;
  challenge: string;
}

// params
export interface ISignUpCodeParams extends ICaptcha {
  email: string;
  type: 1; // 注册: 1
}

// response
