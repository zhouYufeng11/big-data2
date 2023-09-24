// 页面详情页标识
export enum PageTypeEnum {
  //  首页
  SHOW0_1 = 'SHOW0_1',
  // 警情
  SHOW1_1 = 'SHOW1_1', // 警情分类
  SHOW1_2 = 'SHOW1_2', // 实时监控
  SHOW1_3 = 'SHOW1_3', // 辖区分布
  SHOW1_4 = 'SHOW1_4', // 盯警列表
  // 案件
  SHOW2_1 = 'SHOW2_1', // 案件分类
  SHOW2_2 = 'SHOW2_2', // 实时案件
  SHOW2_3 = 'SHOW2_3', // 辖区分布
  SHOW2_4 = 'SHOW2_4', // 指令通报
  SHOW2_5 = 'SHOW2_5', // 盯案列表
  SHOW2_2_1 = 'SHOW2_2_1', // 实时案件详情
  // 勤务
  SHOW3_1 = 'SHOW3_1', // 姜堰分局值班信息
  SHOW3_2 = 'SHOW3_2', // 下辖派出所值班信息
  SHOW3_3 = 'SHOW3_3', // 在线设备
  SHOW3_4 = 'SHOW3_4', // 辖区分局派出所
  SHOW3_5 = 'SHOW3_5', // 预警详情
  // 风控
  SHOW4_1 = 'SHOW4_1', // 重点人员
  SHOW4_2 = 'SHOW4_2', // 人员分布
  SHOW4_3 = 'SHOW4_3', // 人员预警
  SHOW4_4 = 'SHOW4_4', // 动态预警
  SHOW4_5 = 'SHOW4_5', // 涉稳事件
  // 舆情
  SHOW5_1 = 'SHOW5_1', // 舆情来源
  SHOW5_2 = 'SHOW5_2', // 舆情趋势
  SHOW5_3 = 'SHOW5_3', // 预警提醒
  // 感知
  SHOW6_1 = 'SHOW6_1', // 感知设备
  SHOW6_2 = 'SHOW6_2', // 抓拍数量
  SHOW6_3 = 'SHOW6_3', // 抓拍排行
  SHOW6_4 = 'SHOW6_4', // 比对库统计
  SHOW6_5 = 'SHOW6_5', // 布控任务
  SHOW6_6 = 'SHOW6_6', // 数据治理
}

// pannel组件类型
export enum PannelTypeEnum {
  SMALL = 1, // 小型
  MIDDLE = 2, // 中型
  LARGE = 3, // 大型
  TINY = 4, //  超小
  EX_SMALL = 5, //  第二版小
  EX_MIDDLE = 6, //  第二版中
}

// 文件类型
export enum FileTypeEnum {
  WORD = 'word',
  PDF = 'pdf',
  EXCEL = 'excel',
}

