import { request } from 'ice';
import api from '@/config/api';
import { IDownload } from './PropsType';

export const downloadLink = () => {
  return request.get<IDownload>(api.downloadLink).then((res) => res.data);
};
