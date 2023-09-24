<template>
	<div class="detail-wrap">
		<LargeBtn @btnClick="fetchAllData" :showType="dateType" />
		<div class="detail-left">
			<DetailPannel title="警情分类">
				<PieCategory1 :width="560" :height="265" :dataList="pieCategoryList" />
			</DetailPannel>
			<DetailPannel title="警情趋势">
				<LineCategory :width="560" :height="265" :nameList="lineCategoryName" :xAxisData="lineCategoryXAxisData"
					:yAxisData="lineCategoryYAxisData" />
			</DetailPannel>
		</div>
		<div class="detail-right">
			<DetailPannel title="警情列表" :width="755" :height="640">
				<TableCategory :dataList="tableCategoryList" :total="tableCategoryTotal" @setType="setType" @setPage="setPage" />
			</DetailPannel>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import LargeBtn from '@/components/Btn/large.vue';
import DetailPannel from '@/components/DetailPannel/index.vue';
import PieCategory1 from '@/components/EchartsDetail/PieCategory1/index.vue';
import LineCategory from '@/components/Echarts/LineCategory/index.vue';
import TableCategory from '@/components/TableDetail/TableCategory/index.vue';
import { jjxxStatisticsByType, jjxxTendency, jjxxList } from '@/api/index';
import { Message } from '@arco-design/web-vue';
import { computed } from 'vue';
import { mainStore } from '@/store';

const store: any = mainStore();
// 日周月
const dateType: any = ref(1);
dateType.value = store.jqDate;


// 警情分类 - 饼图
const pieCategoryList: any = ref([]);
const pieFetchData = async () => {
	pieCategoryList.value = [];
  jjxxStatisticsByType({ type: dateType.value }).then((res: any) => {
    if (res.code === 200) {
      pieCategoryList.value = res.rows[0] ? res.rows : [];
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
	
}

// 警情趋势 - 折线图
const lineCategoryName: any = ref([]);
const lineCategoryXAxisData: any = ref([]);
const lineCategoryYAxisData: any = ref([]);
const lineFetchData = async () => {
	jjxxTendency({ type: dateType.value }).then((res: any) => {
		if (res.code === 200) {
			let nameList: any = [];
			let xAxisData: any = [];
			let yAxisData: any = [];
			res.rows.forEach((s: any, i: number) => {
				nameList.push(s.groupKeyName);

				yAxisData.push(s.groupList.map((v: any) => {
					if (i === 0) {
						xAxisData.push(v.dateKey);
					}
					return v.groupValue
				}));
			});

			lineCategoryName.value = nameList;
			lineCategoryXAxisData.value = xAxisData;
			lineCategoryYAxisData.value = yAxisData;
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

// 警情列表 - 表格
const tableCategoryList: any = ref([]);
const tableCategoryTotal: any = ref(0);
const pageNum: any = ref(1);
const typeMark: any = ref('');
const setType = (type: string = '') => {
	typeMark.value = type;
	tableFetchData();
}
const setPage = (page: number = 1) => {
	pageNum.value = page;
	tableFetchData();
}
const tableFetchData = async (type: number = 1) => {
	return await jjxxList({ pageSize: 10, pageNum: pageNum.value, dateType: dateType.value, jjdfl: typeMark.value }).then((res: any) => {
		if (res.code === 200) {
			tableCategoryList.value = res.rows.map((s: any, i: number) => {
				s.no = i + 1;
				// s.bjnr = s.bjnr.slice(20);
				return s;
			});
			tableCategoryTotal.value = res.total;
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}
const fetchAllData = (type: number = 2) => {
	dateType.value = type;
	pieFetchData();
	lineFetchData();
	tableFetchData();
}

onMounted(() => {
	pieFetchData();
	lineFetchData();
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