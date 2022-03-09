import { request } from 'ice';
import api from '@/config/api';
import { ISignUpCodeParams } from './PropsType';

export const sendSignUpCode = (params: ISignUpCodeParams) => {
  return request.post(api.endEmailNotLogin, params).then((res) => res.data);
};
