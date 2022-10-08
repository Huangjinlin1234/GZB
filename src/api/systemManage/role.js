import { request } from 'xy-utils';
import backend from '@/config/constant/app.data.service';

export function getTreeData (params) {
  return request({
    url: backend.console + '/api/s/queryRoleAll',
    method: 'POST',
    params
  });
}
export function getTableData (params) {
  return backend.console + '/api/s/role/data/rules';
}

