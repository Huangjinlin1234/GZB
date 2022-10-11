import { request } from 'xy-utils';
import backend from '@/config/constant/app.data.service';

// 查询机构列表
export function getOrgList(params) {
  return backend.console + '/api/s/orgs/login/leage';
}
