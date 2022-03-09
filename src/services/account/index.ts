import { request } from 'ice';
import api from '@/config/api';
import { ILoginParams, ILoginVerifyParams, ISignUpParams, ValidationReturnType } from './PropsType';

// 登录
export const loginByUserName = (params: ILoginParams) => {
  return request.post(api.usernameLogin, params).then((res) => res.data);
};

export const loginVerify = (params: ILoginVerifyParams) => {
  return request.post(api.loginVerify, params).then((res) => res.data);
};

export const getLoginQrCode = () => {
  return request.get(api.loginQrCode).then((res) => res.data);
};

export const getLoginQrCodeResult = (ticket: string) => {
  return request.get(api.qrCodeResult, { params: ticket }).then((res) => res.data);
};

// 注册
export const signUp = (params: ISignUpParams) => {
  return request.post(api.signUp, params).then((res) => res.data);
};
