import request from '@/utils/request';


/**
* @description 来话类别
*/
export function dic_st_jjlhlb(query?: any = {}) {
  return request({
    url: 'jwpt/dict/data/type/st_jjlhlb',
    method: 'GET',
    params: query
  })
}

/**
* @description 派出所列表
*/
export function dic_pcsList(query?: any = {pageNum: 1, pageSize: 100}) {
  return request({
    url: 'jwpt/dashboard/pcsList',
    method: 'GET',
    params: query
  })
}

/**
* @description 派出所Gis字典项列表
*/
export function pcsGisList(query?: any = {pageNum: 1, pageSize: 100}) {
  return request({
    url: 'jwpt/dashboard/pcsGisList',
    method: 'GET',
    params: query
  })
}

/**
 * @description 出警状态
 */
export function dic_jjxx_status(query?: any = {}) {
  return request({
    url: 'jwpt/dict/data/type/jwpt_aj_jjxx_status',
    method: 'GET',
    data: query
  })
}

/**
 * @description 盯警等级
 */
export function dic_dj_level(query?: any = {}) {
  return request({
    url: 'jwpt/dict/data/type/jwpt_dj_gjc_level',
    method: 'GET',
    data: query
  })
}

/**
 * @description 字典接口
 * @params dictType [
 *    ga_ajlb(案件类别)
 *    jwpt_zrdw (派出所)
 *    gak_ajzt (盯案-案件状态)
 *    ga_zdlx (终端类型)
 *    ga_jj_ajdfl (接警大分类)
 * ]
 */
export function dic_interface({ dictType }) {
  return request({
    url: 'jwpt/dict/data/type/' + dictType,
    method: 'GET'
  })
}

/**
 * @description 字典接口 - 兼容版本
 * @params dictType [
 * ]
 */
export function dic_interface2(dictType) {
  return request({
    url: 'jwpt/dict/data/' + dictType,
    method: 'GET'
  })
}
