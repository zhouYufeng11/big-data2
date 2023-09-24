import request from '@/utils/request';

/**
 * @description 舆情接口
 * @params yqly 舆情列表
 * @params yqqs 舆情趋势
 * @params list 舆情详情
 */
export function yqData(opt: any = [], params: any = {}) {
  let url = 'yq/index/';

  for(let value of opt) {
    url += `${value}/`;
  }
  url = url.replace(/\/$/g, '');

  return request({
    url,
    method: 'GET',
    params
  })
}

export function yqxqxl(query: any = {}) {
  return request({
    url: 'yq/jwpt_yqly',
    method: 'GET',
  })
}

export function yqxq(query: any = {}) {
  return request({
    url: 'yq/index/list',
    method: 'GET',
    params: query
  })
}

export async function info(query: any = {}) {
  return await request({
    url: `yq/info`,
    method: 'put',
    data: query
    // params: 
  })
}
