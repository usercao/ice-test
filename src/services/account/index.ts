import { request } from 'ice';
import api from '@/config/api';
import {
  ILoginParams,
  ILoginVerifyParams,
  ISignUpParams,
  CountriesReturnType,
  GeetestReturn,
  ILoginUserNameReturn,
  IUserInfo,
  IQRCode,
  IQRCodeConnect,
  IQRCodeError,
} from './PropsType';
import qs from 'qs';

// 获取极验配置数据
export const getGeetestInfo = (captcha_id: string) => {
  return request.post<GeetestReturn>(`${api.geetest}?captcha_id=${captcha_id}`).then((res) => res);
};

// 忘记密码
export const getCountries = () => {
  return request.get<CountriesReturnType>(api.countries, { params: { for_area_code: true } }).then((res) => res);
};

// 登录
export const loginByUserName = (params: ILoginParams) => {
  return request.post<ILoginUserNameReturn>(`${api.usernameLogin}?${qs.stringify(params)}`).then((res) => res);
};

export const loginVerify = (params: ILoginVerifyParams) => {
  return request.post(`${api.loginVerify}?${qs.stringify(params)}`).then((res) => res);
};

export const getLoginQrCode = () => {
  return request.get<IQRCode>(api.loginQrCode).then((res) => res);
};

export const getLoginQrCodeResult = (ticket: string) => {
  return request.get<IQRCodeConnect | IQRCodeError>(`${api.qrCodeResult}?ticket=${ticket}`).then((res) => res);
};

// 注册
/* eslint-disable */
export const signUp = (params: ISignUpParams) => {
  return request.post<IUserInfo>(`${api.signUp}?${qs.stringify(params)}`).then((res) => res);
};
/* eslint-enable */
