<template>
	<div class="detail-wrap">
		<!-- <LargerBtn @btnClick="fetchAllData" />
		<div class="detail-left">
			<DetailPannel title="警情分类">
				<PieCategory :width="560" :height="265" :dataList="pieCategoryList" />
			</DetailPannel>
			<DetailPannel title="警情趋势">
				<LineCategory :width="560" :height="265" :dataList="lineCategoryList" />
			</DetailPannel>
		</div>
		<div class="detail-right">
			<DetailPannel title="警情列表" :width="755" :height="640">
				<TableCategory :dataList="tableCategoryList" @setType="setType" />
			</DetailPannel>
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DetailPannel from '@/components/DetailPannel/index.vue';
import PieCategory from '@/components/Echarts/PieCategory/index.vue';
import LineCategory from '@/components/Echarts/LineCategory/index.vue';
import TableCategory from '@/components/TableDetail/TableCategory/index.vue';
import { jjxxStatisticsByType } from '@/api/index';
import { Message } from '@arco-design/web-vue';


import LargerBtn from '@/components/BtnRiskControl/larger.vue';

// 	切换
const setType = (val: any) => {}

// 警情分类 - 饼图
const pieCategoryList: any = ref([]);
const pieFetchData = async (type: number = 1) => {
	return await jjxxStatisticsByType({ type }).then((res: any) => {
		if (res.code === 200) {
			pieCategoryList.value = res.rows;
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

// 警情趋势 - 折线图
const lineCategoryList: any = ref([]);
const lineFetchData = async (type: number = 1) => {
	// TODO: 需要改为正式接口
	return await jjxxStatisticsByType({ type }).then((res: any) => {
		if (res.code === 200) {
			lineCategoryList.value = [
				{ text: '8.1', value1: 10, value2: 12, value3: 17, value4: 20, value5: 26, value6: 22, value7: 30 },
				{ text: '8.2', value1: 20, value2: 16, value3: 11, value4: 24, value5: 16, value6: 21, value7: 32 },
				{ text: '8.3', value1: 30, value2: 18, value3: 16, value4: 29, value5: 21, value6: 22, value7: 26 },
				{ text: '8.4', value1: 20, value2: 8, value3: 10, value4: 22, value5: 22, value6: 28, value7: 22 },
				{ text: '8.5', value1: 15, value2: 17, value3: 25, value4: 21, value5: 20, value6: 30, value7: 20 },
			];
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

// 警情列表 - 表格
const tableCategoryList:any = ref([]);
const tableFetchData = async (type: number = 1) => {
	// TODO: 需要改为正式接口
	return await jjxxStatisticsByType({ type }).then((res: any) => {
		if (res.code === 200) {
			lineCategoryList.value = [
				{ text: '8.1', value1: 10, value2: 12, value3: 17, value4: 20, value5: 26, value6: 22, value7: 30 },
				{ text: '8.2', value1: 20, value2: 16, value3: 11, value4: 24, value5: 16, value6: 21, value7: 32 },
				{ text: '8.3', value1: 30, value2: 18, value3: 16, value4: 29, value5: 21, value6: 22, value7: 26 },
				{ text: '8.4', value1: 20, value2: 8, value3: 10, value4: 22, value5: 22, value6: 28, value7: 22 },
				{ text: '8.5', value1: 15, value2: 17, value3: 25, value4: 21, value5: 20, value6: 30, value7: 20 },
			];
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}


const fetchAllData = (type?: number) => {
	pieFetchData(type);
	lineFetchData(type);
}

onMounted(() => {
	fetchAllData();
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