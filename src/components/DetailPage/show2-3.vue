<template>
	<div class="detail-wrap">
		<LargeBtn @btnClick="fetchAllData" :showType="dateType" />
		<div class="detail-top">
			<BarDepartmentDouble1 :type="dateType" style="width: 100%;" height="220px" :dataList="departmentList" />
		</div>
		<div class="detail-bot">
			<div class="detail-left">
				<DetailPannel title="辖区占比" :width="560" :height="420">
					<TableAreaPer :dataList="tableAreaPerList" />
				</DetailPannel>
			</div>
			<div class="detail-right">
				<DetailPannel title="案件列表" :width="750" :height="420">
					<TableAreaCase :dataList="tableAreaList" :total="tableAreaTotal" @setType="setType" @setPage="setPage" />
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
import { ajxxStatisticsByDep, ajxxList } from '@/api/index';
import { Message } from '@arco-design/web-vue';
import TableAreaCase from '@/components/TableDetail/TableAreaCase/index.vue';
import TableAreaPer from '@/components/TableDetail/TableAreaPer/index.vue';
import BarDepartmentDouble1 from '@/components/EchartsDetail/BarDepartmentDouble1/index.vue';
import { mainStore } from '@/store';

const store: any = mainStore();
// 日周月
const dateType: any = ref(3);
dateType.value = store.ajDate;

// 辖区分布 - 条形图
const departmentList = ref([]);
// 辖区占比
const tableAreaPerList: any = ref([]);
const fetchData = async () => {
	return await ajxxStatisticsByDep({ type: dateType.value }).then((res: any) => {
		if (res.code === 200) {
			departmentList.value = res.rows;
			tableAreaPerList.value = res.rows.map((s: any, i: number) => {
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


// 设置类型 - 接警单位
const areaType: any = ref('');
const setType = (type: string = '') => {
	areaType.value = type;
	fetchData2();
};

// 案件列表 - 表格
const tableAreaList: any = ref([]);
const pageNum: any = ref(1);
const tableAreaTotal: any = ref(0);
const setPage = (page: number = 1) => {
	pageNum.value = page;
	fetchData2();
}

const fetchData2 = async () => {
	ajxxList({ pageNum: pageNum.value, pageSize: 10, dateType: dateType.value, sldw: areaType.value }).then((res: any) => {
		if (res.code === 200) {
			tableAreaTotal.value = res.total;
			tableAreaList.value = res.rows.map((s: any, i: number) => {
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

const fetchAllData = (type: number = 3) => {
	dateType.value = type;
	fetchData();
	fetchData2();
}

onMounted(() => {
	fetchData();
	fetchData2();
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