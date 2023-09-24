<template>
	<div ref="LineCategory" class="chart-wrap" :style="{ height: height + 'px', width: width + 'px' }" />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { ref, reactive, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
	width: {
		type: Number,
		default: 560
	},
	height: {
		type: Number,
		default: 265
	},
	nameList: {
		type: Array,
		default: []
	},
	xAxisData: {
		type: Array,
		default: []
	},
	yAxisData: {
		type: Array,
		default: []
	},
})

const LineCategory = ref();
let chart: any = null;

const assembleData = (i: number, yAxisData: any) => {
	return {
		name: props.nameList[i],
		type: "line",
		// smooth: false,
		itemStyle: {
			lineStyle: {
				width: 2,
			},
		},
		data: yAxisData
	}
}
watch(() => props.yAxisData, (newValue: any) => {

	let yAxisData: any = newValue.map((s: any, i: number) => {
		return assembleData(i, s)
	});

	initChart(props.xAxisData, yAxisData);
})

onBeforeUnmount(() => {
	if (!chart) {
		return
	}
	chart.dispose();
	chart = null;
});


const initChart = (xAxisData: any, yAxisData: any) => {
	const chartEle: HTMLElement = LineCategory.value as HTMLElement;
	!chart && (chart = init(chartEle));
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 500,
		legend: {
			left: 20,
			top: 10,
			data: props.nameList,
			textStyle: {
				align: 'right',
				color: '#fff',
				fontSize: 20,
				lineHeight: 20,
				fontFamily: 'YouSheBiaoTiHei'
			},
		},
		tooltip: {
			trigger: 'axis',
			textStyle: {
				align: 'left'
			}
		},
		grid: {
			top: 80,
			left: 20,
			right: 30,
			bottom: 10,
			containLabel: true
		},
		xAxis: [{
			type: 'category',
			boundaryGap: false, // 坐标轴两边留白
			axisTick: {
				show: false
			},
			axisLine: {
				show: true,
				lineStyle: {
					type: "dashed",
					color: "#2079a0"
				}
			},
			axisLabel: {
				inside: false,
				color: '#fff', // x轴颜色
				lineHeight: 22,
				fontFamily: 'YouSheBiaoTiHei',
				fontSize: 14,
				interval: 0
			},
			data: xAxisData
		}],
		yAxis: [{
			type: "value",
			axisLabel: {
				show: true,
				margin: 15,
				color: '#fff',
				fontFamily: 'YouSheBiaoTiHei',
				fontSize: 16,
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: '#E5E9ED',
					opacity: 0.1
				},
			},
		}],
		series: yAxisData,
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