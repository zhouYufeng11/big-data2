<template>
	<div class="detail-wrap">
		<LargerBtn :btnNameList="btnLarge" @btnClick="setType" />
		<div class="detail-top">
			<BarRiskControlLarge :dataList="barData" />
		</div>
		<div class="detail-bot">
			<div class="detail-left">
				<DetailPannel title="辖区占比" :width="560" :height="470">
					<TableAreaPerRiskControl :dataList="tableAreaPerList" />
				</DetailPannel>
			</div>
			<div class="detail-right">
				<DetailPannel title="重点人员列表" :width="750" :height="470">
					<TableAreaRiskControl 
            :pageSize="zdryPageSize"
            :dataList="tableAreaList" 
            :total="tableAreaTotal"
            @changeType="changeType" 
            @setPage="setPage" 
          />
				</DetailPannel>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';
import LargerBtn from '@/components/BtnRiskControl/larger.vue';
import DetailPannel from '@/components/DetailPannel/index.vue';
import BarRiskControlLarge from '@/components/EchartsDetail/BarRiskControlLarge/index.vue';
import TableAreaRiskControl from '@/components/TableDetail/TableAreaRiskControl/index.vue';
import TableAreaPerRiskControl from '@/components/TableDetail/TableAreaPerRiskControl/index.vue';
import { Message } from '@arco-design/web-vue';

//  dic_interface 获取字典信息 - btn事件
import { dic_interface2} from '@/api/dic';
import { fkData } from '@/api/riskControl';

//  按钮数据
const btnLarge: any = ref([])
const barData: any = ref([]);
const tableAreaList: any = ref([]);
const tableAreaTotal: any = ref([]);
const curType: any = ref('');
// 辖区占比数据
const tableAreaPerList: any = ref([]);

//  重点人员分页操作数据
const zdryPageSize = ref(6);
const zdryPageNum = ref(1);
const zdryType = ref(''); //  切换派出所

//  发送所有请求
const fetchAllData = async () => {
  dic_interface2('getWw').then((res: any) => {
    if (res.code === 200) {
      res.data.forEach((item: any) => {
        const { dictType, dictName } = item;
        if(dictName !== '涉警') {
          //  记录 btnLager 点击的按钮信息，便于后期数据切换
          btnLarge.value.push({type: dictType, name: dictName});
        }
      })
      
      //  首次加载
      curType.value = btnLarge.value[0].type;

      //  获取人员分布数据，柱状图
      getRYFBData(curType.value);
      // 获取辖区占比数据
      getXQZBData(curType.value);
      //  获取重点人员列表
      getZDRYData({
        rysx: curType.value,
        gkzrdw: ''
      });
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

//  切换 涉警 等
const setType = async(key: number) => {
  curType.value = btnLarge.value[key].type;
  //  获取 柱状图数据
  getRYFBData(curType.value);
  //  获取辖区占比数据
  getXQZBData(curType.value);
  //  获取重点人员数据
  getZDRYData({
    rysx: curType.value,
    gkzrdw: zdryType.value
  });
}

//  重点人员列表 - 分页
const setPage = async(key: any) => {
  zdryPageNum.value = key;

  //  获取重点人眼信息
  getZDRYData({
    rysx: curType.value,
    gkzrdw: zdryType.value
  });
}

//  重点人员列表 - 点击上面的派出所按钮，切换页面 
const changeType = async (key: any) => {
  zdryType.value = key;
  zdryPageNum.value = 1;  //  切换派出所，让数据都回到第一页

	getZDRYData({
    rysx: curType.value,
    gkzrdw: zdryType.value
  });
}

//  获取人员分布数据 - 柱状图
function getRYFBData(type: string) {
  fkData([ 'ryfb' ,type ]).then((res: any) => {
    if (res.code === 200) {
      barData.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

//  获取重点人员列表数据
function getZDRYData(opt: any) {
  opt.pageNum = zdryPageNum.value;
  opt.pageSize = zdryPageSize.value;

  fkData([ 'list' ], opt).then((res: any) => {
    if (res.code === 200) {
      tableAreaTotal.value = res.total;
      tableAreaList.value = res.rows.map((item: any, index: any) => {
        item.xh = index + 1;
        return item;
      });
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

//  获取辖区占比数据
function getXQZBData (type: any) {
	fkData(['xqzb'], { rysx: type }).then((res: any) => {
		if (res.code === 200) {
			tableAreaPerList.value = res.data.map((s: any, i: number) => {
				s.no = i + 1;
				return s;
			});
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}


onMounted(() => {
	fetchAllData();
})
</script>

<style lang="scss" scoped>
.detail-wrap {

	.detail-bot {
		display: flex;

		.detail-left {
			margin-right: 30px;
}
	}
}
</style>