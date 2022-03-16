import { request } from 'ice';
import api from '@/config/api';
import { IDownload, IIndexConfig } from './PropsType';

export const downloadLink = () => {
  return request.get<IDownload>(api.downloadLink).then((res) => res.data);
};

export const indexConfig = () => {
  return request.get<IIndexConfig>(api.indexConfig).then((res) => res);
};
