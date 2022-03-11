import { request } from 'ice';
import api from '@/config/api';
import { ILoginVerifyCodeParams, ISignUpCodeParams, ILoginVerifyCodeResponse } from './PropsType';
import qs from 'qs';

export const sendEmailLoginVerifyCode = (params: ILoginVerifyCodeParams) => {
  return request.post<ILoginVerifyCodeResponse>(`${api.sendEmailForLogin}?${qs.stringify(params)}`).then((res) => res);
};
export const sendMobileLoginVerifyCode = (params: ILoginVerifyCodeParams) => {
  return request.post<ILoginVerifyCodeResponse>(`${api.sendMobileForLogin}?${qs.stringify(params)}`).then((res) => res);
};

export const sendSignUpCode = (params: ISignUpCodeParams) => {
  return request.post(api.sendEmailNotLogin, params).then((res) => res.data);
};
