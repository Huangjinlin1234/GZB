import { request } from 'xy-utils';
import backend from '@/config/constant/app.data.service';
// 获取资源树
export function getTreeData(params) {
  return request({
    url: backend.console + '/api/s/queryRescAll',
    method: 'POST',
    params
  });
}
// 保存资源信息
export function addResource(params) {
  return request({
    url: backend.console + '/api/s/resource',
    method: 'POST'
  });
}
// 获取资源信息
export function getResource(params) {
  return request({
    url: backend.console + '/api/s/resource/' + params,
    method: 'GET'
  });
}
// 保存资源操作信息
export function addResOperation(params) {
  return request({
    url: backend.console + '/api/s/resc/act',
    method: 'POST',
    params
  });
}
// 获取资源操作信息
export function getRescActs(params) {
  return backend.console + '/api/s/resc/rescActs';
}
