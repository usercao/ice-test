import { request } from 'ice';
import api from '@/config/api';
import { ILoginVerifyCodeParams, INotLoginCodeParams, IVerifyCodeResponse } from './PropsType';
import qs from 'qs';

export const sendEmailLoginVerifyCode = (params: ILoginVerifyCodeParams) => {
  return request.post<IVerifyCodeResponse>(`${api.sendEmailForLogin}?${qs.stringify(params)}`).then((res) => res);
};

export const sendMobileLoginVerifyCode = (params: ILoginVerifyCodeParams) => {
  return request.post<IVerifyCodeResponse>(`${api.sendMobileForLogin}?${qs.stringify(params)}`).then((res) => res);
};

export const sendNotLoginCode = (params: INotLoginCodeParams) => {
  return request.post<IVerifyCodeResponse>(`${api.sendEmailNotLogin}?${qs.stringify(params)}`).then((res) => res);
};
export const sendNotLoginMobile = (params: INotLoginCodeParams) => {
  return request.post<IVerifyCodeResponse>(`${api.sendMobileNotLogin}?${qs.stringify(params)}`).then((res) => res);
};
