<template>
	<div class="detail-wrap">
		<LargeBtn @btnClick="fetchAllData" :showType="dateType"/>
		<div class="detail-top">
			<BarDepartmentDouble1 :type="dateType" style="width: 100%;" height="220px" :dataList="table1" />
		</div>
		<div class="detail-bot">
			<div class="detail-left">
				<DetailPannel title="辖区占比" :width="560" :height="420">
					<TableAreaPerRiskControl :dataList="table2" />
				</DetailPannel>
			</div>
			<div class="detail-right">
				<DetailPannel title="警情列表" :width="750" :height="420">
					<TableArea :dataList="table3" :total="table3Total" @setType="setType" @setPage="setPage" />
				</DetailPannel>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LargeBtn from '@/components/Btn/large.vue';
import DetailPannel from '@/components/DetailPannel/index.vue';
import BarArea from '@/components/EchartsDetail/BarArea/index.vue';
import { jjxxStatisticsByDep, jjxxList } from '@/api/index';
import { Message } from '@arco-design/web-vue';

import TableArea from '@/components/TableDetail/TableArea/index.vue';
import BarDepartmentDouble1 from '@/components/EchartsDetail/BarDepartmentDouble1/index.vue';
import TableAreaPerRiskControl from '@/components/TableDetail/TableAreaPerRiskControl/index.vue';
import { fkData } from '@/api/riskControl';
import { mainStore } from '@/store';

const store: any = mainStore();


// 设置类型 - 接警单位
const areaType: any = ref('');
const setType = (type: string = '') => {
	pageNum.value = 1;
	areaType.value = type;
	fetchData3();
};

// 警情列表 - 表格
const pageNum: any = ref(1);
const pageSize: any = ref(8);
const dateType: any = ref(2);
dateType.value = store.jqDate;

const setPage = (page: number = 1) => {
	pageNum.value = page;
	fetchData3();
}


//	辖区分布柱状图
const table1 = ref([]);
const xqzbData = ref([]);
const fetchData1 = () => {
  table1.value = [];
  jjxxStatisticsByDep({ type: dateType.value }).then((res: any) => {
    if (res.code === 200) {
      table1.value = res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//	辖区占比 - 未处理
const table2: any = ref([]);
const fetchData2 = () => {
	//  获取辖区占比数据
	jjxxStatisticsByDep({ type: dateType.value }).then((res: any) => {
		if (res.code === 200) {
			table2.value = res.rows.map((s: any, i: number) => {
				s.no = i + 1;
				s.gkzrdwName = s.groupKeyName;
				s.number = s.currentValue;
				return s;
			});
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

//	警情列表
const table3 = ref([]);
const table3Total = ref(0);
const fetchData3 = () => {
	jjxxList({ pageNum: pageNum.value, pageSize: pageSize.value, dateType: dateType.value, jjdw: areaType.value }).then((res: any) => {
		if (res.code === 200) {
			table3Total.value = res.total;
			table3.value = res.rows.map((s: any, i: number) => {
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

const fetchAllData = (type: number = 2) => {
	dateType.value = type;
	//	柱状图
	fetchData1();
	//	辖区占比
	fetchData2();
	//	警情列表
	fetchData3();
}

onMounted(() => {
	//	柱状图
	fetchData1();
	//	辖区占比
	fetchData2();
	//	警情列表
	fetchData3();
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