import { request } from 'xy-utils';
import backend from '@/config/constant/app.data.service';

// 资源定义

// 获取资源树
export function getTreeData(params) {
  return request({
    url: backend.console + '/api/s/queryRescAll',
    method: 'POST',
    params
  });
}
// 保存、修改、删除资源信息
export function setResource(method, params) {
  return request({
    url: backend.console + '/api/s/resource',
    method,
    params
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

// 资源权限

// 查询用户角色
export function getRoles(params) {
  return request({
    url: backend.console + '/api/s/queryRoleAll',
    method: 'POST',
    params
  });
}
// 查询资源中文描述
export function getResCHNDesc(params) {
  return request({
    url: backend.console + '/api/s/user/resc/data',
    method: 'POST',
    params
  });
}

// 报表权限管理

// 查询产品——机构列表
export function getPrdOrgList() {
  return backend.console + '/api/s/prd/org/query';
}
