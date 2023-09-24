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
		default: '1340px'
	},
	height: {
		type: String,
		default: '165px'
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


// 循环添加
let showSetInterval: any = setInterval(() => {
	
	if (!curNameList.value || curNameList.value.length === 0) {
		clearInterval(showSetInterval);
		showSetInterval = null;
		return
	}
	
	// 当前需要添加的一项
	initChart(curlegend.value, curDataList.value, curNameList.value);
}, 2000);



watch(() => props.dataList, (newValue: any) => {

	if (chart) {
		chart.dispose()
		chart = null
	}

	curNameList.value = [];
	curDataList.value = [];
	curlegend.value = [];
	curTotalData.value = [];
	curDataObj.value = {};

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
			barWidth: 14,
			data: curDataObj.value[name]
		})
	}

	initChart(curlegend.value, curDataList.value, curNameList.value);

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

const initChart = (curlegend: any, curDataList: any, curNameList: any) => {
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
				align:'left',
				fontSize: 12,
			},
			position: function (point, params, dom, rect, size) {
				// 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
				// 提示框位置
				var x = 0; // x坐标位置
				var y = 0; // y坐标位置
			
				// 当前鼠标位置
				var pointX = point[0];
				var pointY = point[1];
			
				// 外层div大小
				// var viewWidth = size.viewSize[0];
				// var viewHeight = size.viewSize[1];
			
				// 提示框大小
				var boxWidth = size.contentSize[0];
				var boxHeight = size.contentSize[1];
			
				// boxWidth > pointX 说明鼠标左边放不下提示框
				if (boxWidth > pointX) {
					x = 5;
				} else { // 左边放的下
					x = pointX - boxWidth;
				}
			
				// boxHeight > pointY 说明鼠标上边放不下提示框
				if (boxHeight > pointY) {
					y = 5;
				} else { // 上边放得下
					y = pointY - boxHeight;
				}
			
				return [x, y];
			}
		},
		legend: {
			show: true,
			data: curlegend,
			top: 6,
			left: 'center',
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
			top: 50,
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
					fontSize: 14,
					interval: 0,
					formatter: (value) => {
						return value;
						// return value.slice(0, -3) + '\n' + value.slice(-3)
					}
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