import { ref } from 'vue';
import { dic_interface } from "@/api/dic";
import { Message } from '@arco-design/web-vue';

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