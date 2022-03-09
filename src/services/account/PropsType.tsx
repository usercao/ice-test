// ===========================================
// ============= Params ======================
// ===========================================
export interface ILoginParams {
  type: 0; // 0邮箱
  username: string;
  password: string;
  captcha_response: string;
  captcha_id: string;
  challenge: string;
}
export interface ILoginVerifyParams {
  type: 0; // 0 邮箱
  username: string;
  password: string;
  request_id: string; // 第一步返回
  auth_type: 2 | 3; // ga: 3, email: 2,
  verify_code: string;
  order_id?: string; // 验证码发送成功后的id
}
export interface ISignUpParams {
  type: 0; // 0邮箱
  email: string;
  password1: string;
  password2: string;
  verify_code: string;
  order_id: string;
  invite_code?: string;
}
// ===========================================
// ============= Response ====================
// ===========================================
export type ValidationReturnType = string | boolean;
