import { request } from 'ice';
import api from '@/config/api';
import { ILoginParams, ILoginVerifyParams, ISignUpParams, CountriesReturnType } from './PropsType';

// 忘记密码
export const getCountries = () => {
  return request.get<CountriesReturnType>(api.countries, { params: { for_area_code: true } }).then((res) => res);
};

// 登录
export const loginByUserName = (params: ILoginParams) => {
  return request.post(api.usernameLogin, params).then((res) => res.data);
};

export const loginVerify = (params: ILoginVerifyParams) => {
  return request.post(api.loginVerify, params).then((res) => res.data);
};

export const getloginQrCode = () => {
  return request.get(api.loginQrCode).then((res) => res.data);
};

export const getloginqrCodeResult = (ticket: string) => {
  return request.get(api.qrCodeResult, { params: ticket }).then((res) => res.data);
};

// 注册
export const signUp = (params: ISignUpParams) => {
  return request.post(api.signUp, params).then((res) => res.data);
};
