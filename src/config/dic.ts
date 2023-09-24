import { dic_dj_level, dic_interface, dic_jjxx_status, dic_pcsList } from '@/api/dic';

import { ref } from 'vue';
import { Message } from '@arco-design/web-vue';


/**
* @description 字典项集合
*/

//  获取派出所字典项列表
export const pcsDicList: any = ref([]);
export const usePcsDicList = async () => {
  return await dic_pcsList({type: 3}).then((res: any) => {
    if (res.code === 200) {
			pcsDicList.value = [
				{ groupKeyName: '全部', groupKey: '' },
				...res.rows.map((s: any) => {
					s.groupKeyName = s.name;
					s.groupKey = s.organCode;
					s.active = false;
					return s;
				})
			];
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  获取等级字典项列表
export const levelDicList: any = ref([]);

export const useLevelDicList = async () => {
  return await dic_dj_level({}).then((res: any) => {
    if (res.code === 200) {
			levelDicList.value = [
				{ dictLabel: '全部', dictValue: '' },
				...res.data.map((s: any) => {
					s.active = false;
					return s;
				})
			];
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  获取状态字典项列表
export const statuslDicList: any = ref([]);

export const useStatusDicList = async () => {
  return await dic_jjxx_status({}).then((res: any) => {
		if (res.code === 200) {
			statuslDicList.value = [
				{ dictLabel: '全部', dictValue: '' },
				...res.data.map((s: any) => {
					s.active = false;
					return s;
				})
			];
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

//	签收状态字典项
export const qsztDicList: any = ref([]);
export const useQsztDicList = async () => {
  return await dic_interface({dictType: 'jwpt_qszt'}).then((res: any) => {
		if (res.code === 200) {
			qsztDicList.value = [
				{ dictLabel: '全部', dictValue: '' },
				...res.data.map((s: any) => {
					s.active = false;
					return s;
				})
			];
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

//	接警大分类字典项
export const jjdflDicList: any = ref([]);
export const usejjdflDicList = async () => {
	return await dic_interface({dictType: 'ga_jj_ajdfl'}).then((res: any) => {
		if (res.code === 200) {
			jjdflDicList.value = [
				{ dictLabel: '全部', dictValue: '' },
				...res.data.map((s: any) => {
					s.active = false;
					return s;
				})
			];
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

//	抓拍设备字典项
export const zpsbDicList: any = ref([]);
export const useZpsbDicList = async () => {
  return await dic_interface({ dictType: 'jwpt_glsb' }).then((res: any) => {
    if (res.code === 200) {
			zpsbDicList.value = [
				{ dictLabel: '全部', dictValue: '' },
				...res.data.map((s: any) => {
					s.active = false;
					return s;
				})
			];
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
} 

//  感知 - 抓拍库数据 - 字典项
export const zpkDicList: any = ref([]);

export const useZpkDicList = async () => {
  return await dic_interface({ dictType: 'jwpt_zpk' }).then((res: any) => {
    if (res.code === 200) {
			zpkDicList.value = [
				{ dictLabel: '全部', dictValue: '' },
				...res.data.map((s: any) => {
					s.active = false;
					return s;
				})
			];
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

export const initDic = () => {
  //  感知 - 抓拍库数据 - 字典项
  useZpkDicList();
  //  获取派出所字典项列表 
  usePcsDicList();
}