<template>
	<div class="detail-wrap">
			<!-- <div class="detail-left">
					<DetailPannel title="人员分类">
							<PieRiskControlLarge :width="560" :height="265" :dataList="pieCategoryList" hasType />
					</DetailPannel>
					<DetailPannel title="人员趋势">
							<LineRiskControlLarge :width="560" :height="265" :nameList="lineCategoryName" :xAxisData="lineCategoryXAxisData"
									:yAxisData="lineCategoryYAxisData" />
					</DetailPannel>
			</div>
			<div class="detail-right">
					<DetailPannel title="人员列表" :width="755" :height="640">
							<TableAreaRiskControl2 :pageSize="zdryPageSize" :btnNameList="nameList" :dataList="tableAreaList" :total="tableAreaTotal"  @changeType="changeType" @setPage="setPage" />
					</DetailPannel>
			</div> -->
			<DetailPannel title="人员列表" :width="1340" :height="640">
					<TableAreaRiskControl2 :pageSize="zdryPageSize" :btnNameList="nameList" :dataList="tableAreaList" :total="tableAreaTotal"  @changeType="changeType" @setPage="setPage" />
			</DetailPannel>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted, toRaw } from 'vue';
import DetailPannel from '@/components/DetailPannel/index.vue';

import { Message } from '@arco-design/web-vue';

//  接口
import { fkData } from '@/api/riskControl';

//  组件
import TableAreaRiskControl2 from '@/components/TableDetail/TableAreaRiskControl2/index.vue';
import { dic_interface2 } from '@/api/dic';


//  接收涉。。。 等字典类型
const btnData: any = ref([])
const tableAreaList: any = ref([]);
const tableAreaTotal: any = ref([]);


// 人员分类 - 饼图
const pieCategoryList: any = ref([]);
//  人员分类 - 饼图
const pieFetchData = async () => {
	fkData(['zdry']).then((res: any) => {
			if (res.code === 200) {
					pieCategoryList.value = res.data;

					const data = JSON.parse(JSON.stringify(res.data));
					//  删除 key
					delete data['zry'];

					Object.values(data).forEach((item: any) => {
							nameList.value.push(item.name);
					})
			} else {
					Message.error(res.msg)
			}
	}).catch(err => {
			console.log(err)
	})
}

//  人员趋势 - 折线
const nameList = ref([]);
// 人员趋势 - 折线图
const lineCategoryName: any = ref([]);
const lineCategoryXAxisData: any = ref([]);
const lineCategoryYAxisData: any = ref([]);
const lineFetchData = async (type: number = 1) => {

	fkData(['ryqs']).then((res: any) => {
			if (res.code === 200) {
					let valueList: any = Object.values(res.data);
					let yAxisData: any = [];
					let xAxisData: any = Object.keys(res.data);

					//  通过nameList 的个数对数据进行处理
							valueList.forEach((item: any, index: number) => {
									if(item.length === 0) {
											Array.from(nameList.value).forEach((name: any) => {
													item.push({name, value: 0});
											})
									}

									item.forEach((d: any, k: any) => {
											if(!yAxisData[k]) {
													yAxisData[k] = [];
											} 
											yAxisData[k].push(d.value);
									})
							})

					lineCategoryName.value = nameList.value;
					lineCategoryXAxisData.value = xAxisData;
					lineCategoryYAxisData.value = yAxisData;
			} else {
					Message.error(res.msg)
			}
	}).catch(err => {
			console.log(err)
	})
}


/*
	rysx 人员属性 - 涉军、涉稳 等
	gkzrdw 派出所名称
*/

// 人员列表 分页配置
const zdryPageSize: any = ref(12);
const zdryPageNum: any = ref(1);
const zdryType: any = ref('');

//  切换数据
const changeType = async (type: any) => {
	zdryType.value = type;
	zdryPageNum.value = 1;  // 重置回第一页

	getZDRYData({
			rysx: zdryType.value,
	gkzrdw: ''
	});
}

//  人员列表 - 分页
const setPage = async(key: any) => {
	tableAreaList.value = [];
	zdryPageNum.value = key;

	getZDRYData({
			rysx: zdryType.value,
	gkzrdw: ''
	});
}

//  获取点击的按钮
const fetchData = async () => {
dic_interface2('getWw').then(async (res: any) => {
	if (res.code === 200) {
		res.data.forEach((item: any) => {
			const { dictType, dictName } = item;
			btnData.value.push({type: dictType, name: dictName});
		})

					//  获取重点人员数据
					getZDRYData({
							rysx: '',
			gkzrdw: ''
					});

	} else {
		Message.error(res.msg)
	}
}).catch((err: any) => {
	console.log(err)
})
}


//  获取重点人员列表数据
function getZDRYData(opt: any = {}) {
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



const fetchAllData = (type?: number) => {
	pieFetchData();
	lineFetchData(type);
	fetchData();
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