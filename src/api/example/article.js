import { request } from 'xy-utils'

/**
 * 查询文章列表
 * @param {Object} query 查询参数对象
 */
export function fetchList(query) { // 定义导出函数
  return request({ // 调用查询方法
    url: '/article/list', // 接口路径
    method: 'get', // 获取数据方式
    params: query // 查询参数
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function searchUser(name) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}
