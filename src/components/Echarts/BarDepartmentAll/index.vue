<template>
	<div ref="barDepartmentDoubleAll" class="chart-wrap" :style='{ height: height, width: width }' />
	<!-- <Btn @btnClick="setType" /> -->
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
	},
	type: {
		type: Number,
		default: 1
	}
})

const barDepartmentDoubleAll = ref();
const emit = defineEmits(['change']);
// const setType = (type: number) => {
// 	emit('change', type);
// }

let chart: any = null;

const dataList: any = ref([]); // 全部数据
const nameList: any = ref([]); // 当前展示的名称列表

// watch(() => props.type, (newValue: any) => {
// 	if (!chart) {
// 		return
// 	}
// 	chart.dispose();
// 	chart = null;
// 	initChart();
// })

onMounted(() => {
	watch(() => props.dataList, (newValue: any) => {
		dataList.value = newValue;
		nameList.value = newValue.map((s: any) => s.name);
		initChart();
	})
})

onBeforeUnmount(() => {
	if (chart) {
		chart.dispose()
		chart = null
	}
});

const initChart = () => {

	const chartEle: HTMLElement = barDepartmentDoubleAll.value as HTMLElement;
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
			show: false,
			data: ['本月舆情'],
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
			top: '18%',
			left: "3%",
			right: "3%",
			bottom: "5%",
			containLabel: true,
		},
		xAxis: [
			{
				type: "category",
				data: nameList.value,
				axisLine: { // 坐标轴轴线相关设置。数学上的x轴
					show: false,
				},
				axisLabel: { // 坐标轴刻度标签的相关设置
					color: '#7ec7ff',
					fontSize: 10,
					interval: 0,
					formatter(data: any) {
						return data.slice(0, 2);
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
				name: '辖区分布',
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: 10,
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
				data: dataList.value,
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