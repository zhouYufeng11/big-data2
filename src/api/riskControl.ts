import request from '@/utils/request';



/**
 * @description 获取人员分布信息 - 柱状图
 * @params key -> 涉警、涉稳 等
 */
export function ryfbData(key: string = '') {
  return request({
    url: 'jwpt/index/ryfb/' + key,
    method: 'GET'
  })
}

/**
 * @description 获取风控界面 get 请求的数据
 * @params xqzb 辖区分布
 * @params zdry 重点人员
 * @params ryfb 人员分布
 * @params list 重点人员列表
 * @params jwpt_zrdw 获取派出所名字
 * @params ryqs 人员趋势
 * @params pre 前缀
 * @params params 传参
 */
export function fkData(arr: any = [], params: any = {pageNum: 1, pageSize: 100}) {
  let url = 'jwpt/index/';

  arr.forEach((str: any) => url += `${ str }/`);

  url = url.replace(/\/$/g, '');

  return request({
    url,
    method: 'GET',
    params
  })
}


export function zdryfy(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/index/list`,
    method: 'get',
    params: query
  })
}

export async function info(query: any = {}) {
  return await request({
    url: `jwpt/info`,
    method: 'put',
    data: query
  })
}
