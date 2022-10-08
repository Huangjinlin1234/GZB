import { request } from 'xy-utils';
import backend from '@/config/constant/app.data.service';

export function getTreeData (params) {
  return request({
    url: backend.console + '/api/s/queryRescAll',
    method: 'POST',
    params
  });
}
