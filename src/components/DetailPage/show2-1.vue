<template>
	<div class="detail-wrap">
		<LargeBtn @btnClick="fetchAllData" :showType="dateType" />
		<div class="detail-left">
			<DetailPannel title="案件分类">
				<!-- <PieCategorySmall :fontSize="14" :width="560" :height="265" :dataList="pieCategoryList" /> -->
				<PieCategorySmall2 :width="560" :height="265" :dataList="pieCategoryList" />
			</DetailPannel>
			<DetailPannel title="高发案件">
				<WordCloud :width="560" :height="265" :dataList="wordCloudList" />
			</DetailPannel>
		</div>
		<div class="detail-right">
			<DetailPannel title="案件列表" :width="755" :height="640">
				<TableCategoryCase :dataList="tableCaseList" :pageSize="tableCasePageSize" :total="tableCaseTotal"
					@setType="setType" @setPage="setPage" />
			</DetailPannel>z
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LargeBtn from '@/components/Btn/large.vue';
import DetailPannel from '@/components/DetailPannel/index.vue';
import TableCategoryCase from '@/components/TableDetail/TableCategoryCase/index.vue';
import { ajxxStatisticsByAjlb, routineAnalysisByAjlb, ajxxList } from '@/api/index';
import { Message } from '@arco-design/web-vue';
import PieCategorySmall2 from '@/components/EchartsDetail/PieCategorySmall2/index.vue'
import { mainStore } from '@/store';

const store = mainStore();
// 日周月
const dateType: any = ref(3);
dateType.value = store.ajDate;

// 案件分类 - 饼图
const pieCategoryList: any = ref([]);
const fetchData = async () => {
	return await ajxxStatisticsByAjlb({ type: dateType.value }).then((res: any) => {
		if (res.code === 200) {
			pieCategoryList.value = res.data.map((s: any) => {
				s.name = s.groupKeyName;
				s.value = s.groupValue;
				return s;
			});

		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

// 案件趋势 - 词云图
const wordCloudList: any = ref([]);
const fetchData2 = async () => {
	return await routineAnalysisByAjlb({ type: dateType.value }).then((res: any) => {
		if (res.code === 200) {
			wordCloudList.value = res.data;
		} else {
			Message.error(res.msg);
		}
	}).catch(err => {
		console.log(err)
	})
}

// 案件列表 - 表格
const tableCaseList: any = ref([]);
const tableCaseTotal: any = ref(0);
const pageNum: any = ref(1);
const tableCasePageSize: any = ref(12);
const caseCategory: any = ref('');
const setType = (type: string = '') => {
	caseCategory.value = type;
	tableFetchData();
}
const setPage = (page: number = 1) => {
	pageNum.value = page;
	tableFetchData();
}
const tableFetchData = async () => {
	return await ajxxList({ pageSize: tableCasePageSize.value, pageNum: pageNum.value, dateType: dateType.value, ajlb: caseCategory.value }).then((res: any) => {
		if (res.code === 200) {
			tableCaseList.value = res.rows.map((s: any, i: number) => {
				s.no = i + 1;
				// s.bjnr = s.bjnr.slice(20);
				return s;
			});
			tableCaseTotal.value = res.total;
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
	tableFetchData();
}
onMounted(() => {
	fetchData();
	fetchData2();
	tableFetchData();
})
</script>
<style lang="scss" scoped>
.detail-wrap {
	display: flex;

	.detail-left {
		margin-right: 30px;
	}
}
</style>