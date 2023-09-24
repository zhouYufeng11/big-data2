<template>
	<div ref="barDeviceArea" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref, toValue, watch } from 'vue';

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
		type: Array,
		default: []
	}
})

const barDeviceArea = ref();
let chart: any = null;

// const dataList: any = ref([]); // 全部数据
// const showNum = ref(7);// 默认展示个数
// const curNameList: any = ref([]); // 当前展示的名称列表
// const curDataList: any = ref([]); // 当前展示的数据列表

// // 循环添加
// let showSetInterval: any = setInterval(() => {
// 	if (!dataList.value || dataList.value.length === 0) {
// 		clearInterval(showSetInterval);
// 		showSetInterval = null;
// 		return
// 	}
// 	const curNum = showNum.value + 1 > dataList.value.length ? 0 : showNum.value++;
// 	// 重置
// 	if (curNum === 0) showNum.value = 1;
// 	// 当前需要添加的一项
// 	const curOne = dataList.value[curNum];
// 	curNameList.value.shift() // 当前展示的名称列表
// 	curNameList.value.push(curOne.name)
// 	curDataList.value.shift() // 数据
// 	curDataList.value.push(curOne.value)
// 	initChart();
// }, 2000);


watch(() => props.dataList, (newValue: any) => {

	// curNameList.value = [];
	// curDataList.value = [];
	// dataList.value = newValue.map((s: any, i: number) => {
	// 	if (i < showNum.value) {
	// 		curNameList.value.push(s.groupKeyName);
	// 		curDataList.value.push({ name: s.groupKeyName, value: s.groupValue });
	// 	}
	// 	return { name: s.groupKeyName, value: s.groupValue };
	// });
	initChart();
	// showSetInterval();
})

onBeforeUnmount(() => {
	// if (showSetInterval) {
	// 	clearInterval(showSetInterval);
	// 	showSetInterval = null;
	// }
	if (chart) {
		chart.dispose()
		chart = null
	}
});
let timeData = ['8', '9', '10', '11', '12', '13', '14']
const initChart = () => {
	const chartEle: HTMLElement = barDeviceArea.value as HTMLElement;
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
		},
		legend: {
			show: true,
			data: ['混料', '注塑', "组装"],
			align: "left",
			left: 'center',
			top: 10,
			itemWidth: 20,
			itemHeight: 20,
			itemGap: 25,
			textStyle: {
				color: '#7ec7ff',
				lineHeight: 15,
			},
		},
		grid: {
			top: 60,
			left: 20,
			right: 20,
			bottom: 20,
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: timeData,
				axisLine: { // 坐标轴轴线相关设置。数学上的x轴
					show: false,
				},
				axisLabel: { // 坐标轴刻度标签的相关设置
					color: '#7ec7ff',
					fontSize: 12,
					interval: 0,
					formatter: (value) => {
						return value.slice(0, -3) + '\n' + value.slice(-3)
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
				name: "个",
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
		series: [
			{
				name: '混料',
				type: 'bar',
				barWidth: 16,
				itemStyle: {
					borderRadius: [8, 8, 0, 0],
				},
				data: [97, 80, 85, 65, 89, 90, 88]
			},
			{
				name: '注塑',
				type: 'bar',
				barWidth: 16,
				itemStyle: {
					borderRadius: [8, 8, 0, 0],
				},
				data: [97, 92, 96, 91, 97, 95, 93]
			},
			{
				name: '组装',
				type: 'bar',
				barWidth: 16,
				itemStyle: {
					borderRadius: [8, 8, 0, 0],
				},
				data: [96, 95, 100, 98, 99, 87, 99],
			}
		],
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