/**
 * @created by jiangbinxin 2020-07-22
 * @updated by
 * @description 树形字典
 */
import { request } from 'xy-utils'
import backend from '@/config/constant/app.data.service'

/**
 * 获取树形字典列表
 * @param data
 * @returns {*}
 */ 
export function getTreeDictList(data) {
    return request({
      url:backend.cmisCfg + "/api/adminsmtreedic/",
      method:"get",
      data:data
    })
}

/**
 * 获取押品分类列表
 * @param data
 * @returns {*}
 */
export function getGuarListInfo(data) {
  return request ({
    url:backend.cmisGuar + "/api/guarclassinfo/",
    method:"get",
    data:data
  })
}
