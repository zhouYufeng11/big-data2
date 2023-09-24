<template>
	<div ref="lineDepartment" class="chart-wrap" :style='{ height: height, width: width }' />
	<BtnRiskControl :btnNameList="btnNameList" v-if="hasType" @btnClick="setType" />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref, toValue, watch } from 'vue';
import BtnRiskControl from '@/components/BtnRiskControl/index.vue';


const props = defineProps({
	width: {
		type: String,
		default: '457px'
	},
	height: {
		type: String,
		default: '239px'
	},
	dataList: { 
		type: Object,
		default: {}
	},
	hasType: {
		type: Boolean,
		default: false
	},
	btnNameList: {
		type: Array,
		default: []
	}
})

const lineDepartment = ref();
const emit = defineEmits(['change']);
const setType = (type: number) => {
	emit('change', type);
}

let chart: any = null;

const dataList: any = ref({}); // 全部数据
const showNum = ref(7);// 默认展示个数
const curlegend: any = ref([]);	//	当前的 legend
const curTotalData: any = ref([]);
const curNameList: any = ref([]); // 当前展示的名称列表
const curDataList: any = ref([]); // 当前展示的数据列表
const curDataObj: any = ref({});	//	多组数据列表


//	当前需要显示的数据
let curShowNameList: any = [];
let curShowDataList: any = [];
//	记录当前数据显示的位置
let curIndex = 0;


// 循环添加
let showSetInterval: any = setInterval(() => {
	
	if (!curNameList.value || curNameList.value.length === 0) {
		clearInterval(showSetInterval);
		showSetInterval = null;
		return
	}

	if( curIndex < curNameList.value.length ) {
		curShowNameList.push(curNameList.value[curIndex]);
		curShowNameList.shift();

		curShowDataList.forEach((item: any) => {
			item.data.push(item.oldDatas[curIndex]);
			item.data.shift();
		})

		curIndex++;

	} else {
		curIndex = 0;

		curShowNameList.push(curNameList.value[curIndex]);
		curShowNameList.shift();

		curShowDataList.forEach((item: any) => {
			item.data.push(item.oldDatas[curIndex]);
			item.data.shift();
		})
	}


	// 循环执行
	initChart(curlegend.value, curShowDataList, curShowNameList);
}, 2000);



watch(() => props.dataList, (newValue: any) => {
	if (chart) {
		chart.dispose()
		chart = null
	}

	curlegend.value = [];	//	当前的 legend
	curTotalData.value = [];
	curNameList.value = []; // 当前展示的名称列表
	curDataList.value= []; // 当前展示的数据列表
	curDataObj.value = {};	//	多组数据列表
	//	当前需要显示的数据
	curShowNameList = [];
	curShowDataList  = [];
//	记录当前数据显示的位置
	curIndex = 0;

	curNameList.value = Object.keys(newValue);
	curTotalData.value = Object.values(newValue);


	for(let val of curTotalData.value[0]) {
		curlegend.value.push(val.name);
	} 

	if (chart && curlegend.value.length === 0) {
		chart.dispose()
		chart = null
		return;
	}

	//	拼接 curData
	for(let item of curTotalData.value) {
		for(let val of item) {
			const { name, value } = val;
			if(!curDataObj.value[name]) {
				curDataObj.value[name] = [value];
			} else {
				curDataObj.value[name].push(value);
			}
 		}
	}

	//	转成数据列表
	curTotalData.value = Object.keys(curDataObj.value);


	for(let name in curDataObj.value) {
		curDataList.value.push({
			name,
			type: "bar",
			barGap: 0,
			xAxisIndex: 0,
			yAxisIndex: 0,
			barWidth: 12,
			data: curDataObj.value[name]
		})
	}

	curShowDataList = JSON.parse(JSON.stringify(curDataList.value));

	curShowDataList.forEach((item: any) => {
		item.oldDatas = JSON.parse(JSON.stringify(item.data));
		item.data = item.oldDatas.slice(0, 4);
	})

	curShowNameList = curNameList.value.slice(0, 4);
	curIndex = 4;	//	位置同步

	initChart(curlegend.value, curShowDataList, curShowNameList);
})


onBeforeUnmount(() => {
	if (showSetInterval) {
		clearInterval(showSetInterval);
		showSetInterval = null;
	}

	if (chart) {
		chart.dispose()
		chart = null
	}
});

const initChart = (curlegend: any, curDataList: any,  curNameList: any) => {
	const chartEle: HTMLElement = lineDepartment.value as HTMLElement;
	if (!chart) chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'linear',
		animationDuration: 500,
		tooltip: {
			trigger: "axis",
			axisPointer: {
				// 坐标轴指示器，坐标轴触发有效
				type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
			},
			textStyle: {
				align: 'left'
			}
		},
		legend: {
			show: true,
			data: curlegend,
			top: 40,
			left: 30,
			itemWidth: 14,
			itemHeight: 14,
			itemGap: 10,
			textStyle: {
				color: '#ffffff',
				lineHeight: 15,
				fontFamily: 'YouSheBiaoTiHei',
			},
		},
		grid: {
			top: 100,
			left: 10,
			right: "3%",
			bottom: "5%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: curNameList,
				axisLine: { // 坐标轴轴线相关设置。数学上的x轴
					show: false,
				},
				axisLabel: { // 坐标轴刻度标签的相关设置
					color: '#7ec7ff',
					fontSize: 12,
					interval: 0,
				},
				splitLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
			},
		],
		yAxis: [
			{
				type: "value",
				gridIndex: 0,
				// splitNumber: 3,
				nameTextStyle: {//y轴上方单位的颜色
					color: '#7ec7ff',
					align: 'left',
					padding: [0, 0, 0, -20],
				},
				axisLabel: {
					color: '#7ec7ff',
					fontSize: 12,
					formatter: "{value}",
					margin: 10,
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#192a44',
						type: 'dashed'
					},
				},
				axisLine: {
					show: false,
				},
			},
		],
		series: curDataList
	};
	option && chart.setOption(option);
}


</script>

<style lang="scss" scoped>
.chart-wrap {
	width: auto;
	height: auto;
}
</style>