<template>
	<div ref="BarArea" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref, toValue, watch } from 'vue';

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
		type: Array,
		default: []
	}
})

const BarArea = ref();

let chart: any = null;

const curNameList: any = ref([]); // 当前展示的名称列表
const curDataList: any = ref([]); // 当前展示的数据列表


watch(() => props.dataList, (newValue: any) => {
	curNameList.value = [];
	curDataList.value = [];
	newValue.forEach((s: any, i: number) => {
		curNameList.value.push(s.groupKeyName);
		curDataList.value.push({ name: s.groupKeyName, value: s.groupValue });
	});
	initChart();
})

onBeforeUnmount(() => {
	if (chart) {
		chart.dispose()
		chart = null
	}
});

const initChart = () => {
	const chartEle: HTMLElement = BarArea.value as HTMLElement;
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
		// legend: {
		// 	show: true,
		// 	data: curNameList.value,
		// 	align: "left",
		// 	left: 'center',
		// 	top: 10,
		// 	itemWidth: 20,
		// 	itemHeight: 5,
		// 	itemGap: 25,
		// 	textStyle: {
		// 		color: '#7ec7ff',
		// 		lineHeight: 15,
		// 	},
		// },
		grid: {
			top: 30,
			left: 20,
			right: 20,
			bottom: 20,
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: curNameList.value,
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
				name: "件",
				gridIndex: 0,
				// splitNumber: 3,
				nameTextStyle: { // y轴上方单位的颜色
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
						color: 'rgba(244,244,244,.2)',
						type: 'solid'
					},
				},
				axisLine: {
					show: false,
				},
				axisTick: {
					show: false,
				},
			},
		],
		series: [
			{
				name: '辖区分布',
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: 30,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "rgba(102,193,255,1)",
						},
						{
							offset: 1,
							color: "rgba(54,142,255,1)",
						},
					]),
				},
				data: curDataList.value,
			},
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