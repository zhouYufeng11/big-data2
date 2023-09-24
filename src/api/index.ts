import request from '@/utils/request';

/**
 * @description 接警信息统计（来话类别） 
 * @params type  1:当日、2:当周、3:当月
 */
export function jjxxStatisticsByType(query?: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: 'jwpt/dashboard/jjxxStatisticsByType',
    method: 'GET',
    params: query
  })
}

/**
* @description 实时警情（实时）
*/
export function jjxxStatistics(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/dashboard/jjxxStatistics`,
    method: 'GET',
    params: query
  })
}

/**
* @description 盯警情况（实时）
*/
export function jjxxStatisticsByDjdj(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/dashboard/jjxxStatisticsByDjdj`,
    method: 'GET',
    params: query
  })
}

/**
* @description 接警信息列表（实时）
* @params lhlbdm   来话类别代码（可为空）
* @params jjdw  接警单位（可为空）
*/
export function jjxxRealTimeList(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/dashboard/jjxxRealTimeList`,
    method: 'GET',
    params: query
  })
}

/**
 * @description 接警信息统计（部门）
 */
export function jjxxStatisticsByDep(query?: any = {}) {
  return request({
    url: 'jwpt/dashboard/jjxxStatisticsByDep',
    method: 'GET',
    params: query
  })
}


/**
 * @description 盯警列表
 */
export function jjxxDjList(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/dashboard/jjxxDjList`,
    method: 'GET',
    params: query
  })
}

/**
 * @description 盯警详细
 */
export function jjxxDjDetail(query?: any = {}) {
  return request({
    url: `jwpt/djxx/${query.id}`,
    method: 'GET',
    params: query
  })
}

/**
 * @description 警情趋势
 * @params type 1:：当日；2：当周；3当月
 */
export function jjxxTendency(query?: any = {}) {
  return request({
    url: 'jwpt/dashboard/jjxxTendency',
    method: 'GET',
    params: query
  })
}

/**
* @description 接警信息查询
* @params bjdhsjBegin     起始时间
* @params bjdhsjEnd       结束时间
* @params cjbs          报警标识
* @params bjnr          报警内容
* @params dateType      日期类型
* @params lhlbdm       来话类别代码
* @params jjdw         接警单位
*/
export function jjxxList(query: any = { pageNum: 1, pageSize: 10 }) {
  return request({
    url: `jwpt/dashboard/jjxxList?pageNum=${query.pageNum}&pageSize=${query.pageSize}`,
    method: 'POST',
    data: query
  })
}

/**
* @description 盯警信息查询
* @params bjdhsjBegin     起始时间
* @params bjdhsjEnd       结束时间
* @params cjbs          报警标识
* @params bjnr          报警内容
* @params djdj       盯警等级
*/
export function djxxList(query: any = { pageNum: 1, pageSize: 10 }) {
  return request({
    url: `jwpt/dashboard/djxxList?pageNum=${query.pageNum}&pageSize=${query.pageSize}`,
    method: 'POST',
    data: query
  })
}

// ------------------ 地图 ---------------------

/**
 * @description 坐标图 - 警情
 * @params minGisX GisX 最小值 (必传)
 * @params maxGisX GisX 最大值(必传)
 * @params minGisY GisY 最小值(必传)
 * @params maxGisY GisY 最大值(必传)
 */
export function InjjxxGisListdexGis(query?: any = {}) {
  return request({
    url: 'jwpt/dashboard/jjxxGisList',
    method: 'GET',
    params: query
  })
}

/**
 * @description 坐标图 - 案件
 */
export function ajxxGisList(query?: any = {}) {
  return request({
    url: 'jwpt/dashboard/ajxxGisList',
    method: 'GET',
    params: query
  })
}

/**
* @description 坐标图 - 勤务 - 设备
* @params minGisX GisX 最小值 (必传)
* @params maxGisX GisX 最大值(必传)
* @params minGisY GisY 最小值(必传)
* @params maxGisY GisY 最大值(必传)
*/
export function deviceGisList(query: any = {}) {
  return request({
    url: `jwpt/dashboard/deviceGisList`,
    method: 'GET',
    params: query
  })
}

/**
* @description 热力图 - 风控
*/
export function hotMap(query: any = {}) {
  return request({
    url: `jwpt/index/rlt`,
    method: 'GET',
    params: query
  })
}

/**
* @description 热力图 - 舆情
*/
export function hotMap2(query: any = {}) {
  return request({
    url: `yq/index/rlt`,
    method: 'GET',
    params: query
  })
}

// ------------------ 案件 --------------------
/**
* @description 案件分类
* @params type
*/
export function ajxxStatisticsByType(query: any = {}) {
  return request({
    url: `jwpt/dashboard/ajxxStatisticsByType`,
    method: 'GET',
    params: query
  })
}

/**
* @description 案件信息统计
* @params lhlbdm 来话类别
* @params jjdw 接警单位
*/
export function ajxxStatisticsByAjlb(query: any = {}) {
  return request({
    url: `jwpt/dashboard/ajxxStatisticsByAjlb`,
    method: 'GET',
    params: query
  })
}

/**
* @description 实时案件
* @params lhlbdm 来话类别
* @params jjdw 接警单位
*/
export function ajxxRealTimeList(query: any = {}) {
  return request({
    url: `jwpt/dashboard/ajxxRealTimeList`,
    method: 'GET',
    params: query
  })
}

/**
* @description 案件部门 - 辖区分布派出所
* type 1:：当日；2：当周；3当月
*/
export function ajxxStatisticsByDep(query: any = {}) {
  return request({
    url: `jwpt/dashboard/ajxxStatisticsByDep`,
    method: 'GET',
    params: query
  })
}

/**
* @description 案件统计（实时）
* type 1:：当日；2：当周；3当月
*/
export function ajxxStatistics(query: any = {}) {
  return request({
    url: `jwpt/dashboard/ajxxStatistics`,
    method: 'GET',
    params: query
  })
}

/**
* @description 案件信息
* @params basjBegin 起始时间
* @params basjEnd 结束时间
* @params jyaq 简要案情
* @params dateType 1：日；2：周；3：月；
* @params ajlb 案件类别代码
* @params sldw 受理单位
* @params djdj 重要案件等级
*/
export function ajxxList(query: any = { pageNum: 1, pageSize: 10 }) {
  return request({
    url: `jwpt/dashboard/ajxxList?pageNum=${query.pageNum}&pageSize=${query.pageSize}`,
    method: 'POST',
    data: query
  })
}

/**
* @description 重要案件
* @params basjBegin 起始时间
* @params basjEnd 结束时间
* @params jyaq 简要案情
* @params djdj 重要案件等级
*/
export function zyAjxxList(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/dashboard/zyAjxxList?pageNum=${query.pageNum}&pageSize=${query.pageSize}`,
    method: 'POST',
    data: query
  })
}

/**
* @description 案件趋势
* @params type 1:：当日；2：当周；3当月
*/
export function ajxxTendency(query: any = {}) {
  return request({
    url: `jwpt/dashboard/ajxxTendency`,
    method: 'GET',
    params: query
  })
}

/**
* @description 姜堰分局值班信息
*/
export function fjzb(query: any = {}) {
  return request({
    url: `qw/index/fjzb`,
    method: 'GET',
    params: query
  })
}

/**
* @description 下辖派出所值班信息
* @params pcsbmDicttext 派出所
*/
export function pcszb(query: any = {}) {
  return request({
    url: `qw/index/pcszb`,
    method: 'GET',
    params: query
  })
}

/*
* @description 【重要案件】列表（实时)
*/
export function ajxxDjList(query: any = {}) {
  return request({
    url: `jwpt/dashboard/ajxxDjList`,
    method: 'GET',
    params: query
  })
}

/**
* @description【设备】终端类型统计
*/
export function deviceStatisticsByType(query: any = {}) {
  return request({
    url: `jwpt/dashboard/deviceStatisticsByType`,
    method: 'GET',
    params: query
  })
}

/**
* @description【个案库】查询
*/
export function gakList(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/dashboard/gakList?pageNum=${query.pageNum}&pageSize=${query.pageSize}`,
    method: 'POST',
    data: query
  })
}

/**
* @description 指令签收 - 统计图
*/
export function tjt(query: any = {}) {
  return request({
    url: `zlqs/info/tjt`,
    method: 'get',
    params: query
  })
}

/**
* @description 指令签收 - 指令列表
*/
export function zlList(query: any = {}) {
  return request({
    url: `zlqs/info/zlList`,
    method: 'get',
    params: query
  })
}


// ------------------ 勤务 --------------------
/**
* @description 勤务 - 在线设备【辖区分布】
*/
export function deviceStatisticsByDep(query: any = {}) {
  return request({
    url: `jwpt/dashboard/deviceStatisticsByDep`,
    method: 'GET',
    data: query
  })
}

/**
* @description 勤务 - 在线设备 - 详情列表
*/
export function deviceList(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/dashboard/deviceList?pageNum=${query.pageNum}&pageSize=${query.pageSize}`,
    method: 'POST',
    data: query
  })
}

/**
* @description 勤务 - 字典项 - 派出所列表
*/
export function pcsList(query: any = { pageNum: 1, pageSize: 100 }) {
  return request({
    url: `jwpt/dashboard/pcsList?pageNum=${query.pageNum}&pageSize=${query.pageSize}`,
    method: 'GET',
    params: query
  })
}

/**
* @description 字典项 - 派出所列表 GIS
*/
export function pcsGisList(query: any = {}) {
  return request({
    url: `jwpt/dashboard/pcsGisList`,
    method: 'GET',
    params: query
  })
}

/**
* @description 词云图（案件类别）
*/
export function routineAnalysisByAjlb(query: any = {}) {
  return request({
    url: `jwpt/dashboard/routineAnalysisByAjlb`,
    method: 'GET',
    params: query
  })
}

/**
* @description 重要勤务文件列表
*/
export function zyqwInfoList(query: any = { pageNum: 1, pageSize: 20 }) {
  return request({
    url: `qw/index/zyqw`,
    method: 'GET',
    params: query
  })
}

// ------------------ 感知 --------------------
/**
* @description 抓拍库数据列表
*/
export function zpkLisst(query: any = {}) {
  return request({
    url: `gz/index/zpkLisst`,
    method: 'GET',
    params: query
  })
}

/**
* @description 感知设备
*/
export function gzsb(query: any = {}) {
  return request({
    url: `gz/index/gzsb`,
    method: 'GET',
    params: query
  })
}

/**
* @description 设备抓拍列表， 感知地图
*/
export function gzList(query: any = {}) {
  return request({
    url: `gz/index/list`,
    method: 'GET',
    params: query
  })
}

/**
* @description 比对库报警
*/
export function bdkList(query: any = {}) {
  return request({
    url: `gz/index/bdkList`,
    method: 'GET',
    params: query
  })
}

/**
* @description 布控任务
*/
export function bkrw(query: any = {}) {
  return request({
    url: `/gz/index/bkrw`,
    method: 'GET',
    params: query
  })
}

/**
* @description 数据治理
*/
export function sjzl(query: any = {}) {
  return request({
    url: `/gz/index/sjzl`,
    method: 'GET',
    params: query
  })
}

// ------------------ 首页 -------------------------
/**
* @description 首页地图 - 【上图】接警、案件、勤务（设备）
*/
export function mapStatisticsByDep(query: any = {}) {
  return request({
    url: `jwpt/dashboard/mapStatisticsByDep`,
    method: 'GET',
    params: query
  })
}

/**
* @description 首页地图 - 【上图】接警、案件、勤务（设备）
*/
export function mryp(query: any = {}) {
  return request({
    url: `qw/index/mryp`,
    method: 'GET',
    params: query
  })
}

/**
* @description 每日研判排序
*/
export function indexMryp(query: any = {}) {
  return request({
    url: `jwptIndex/mryp`,
    method: 'GET',
    params: query
  })
}

/**
* @description 每日研判排序
* @params sort  0降、 1升
* @params type 1警情、 2案件、 3电诈、4舆情
*/
export function mrypPx(query: any = {}) {
  return request({
    url: `jwptIndex/px`,
    method: 'GET',
    params: query
  })
}

/**
* @description 每日研判导出
* @params beginTime
* @params endTime
*/
export function mrypExport(query: any = {}) {
  return request({
    url: `jwptIndex/export`,
    method: 'GET',
    params: query,
    responseType: 'blob',
  })
}

// ------------------ 舆情 -------------------------
/**
* @description 舆情-处置情况
*/
export function czqk(query: any = {}) {
  return request({
    url: `yq/index/czqk`,
    method: 'GET',
    params: query
  })
}

/**
* @description 舆情-辖区分布
*/
export function xqfb(query: any = {}) {
  return request({
    url: `yq/index/xqfb`,
    method: 'GET',
    params: query
  })
}

