<template>
	<div ref="barDepartmentDouble" class="chart-wrap" :style='{ height: height, width: width }' />
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

const barDepartmentDouble = ref();
const emit = defineEmits(['change']);
// const setType = (type: number) => {
// 	emit('change', type);
// }

let chart: any = null;

const dataList: any = ref([]); // 全部数据
const curNameList: any = ref([]); // 当前展示的名称列表
const curDataList: any = ref([]); // 当前展示的数据列表
const curDataList2: any = ref([]); // 当前展示的数据列表

const dateList: any = ref(['今日', '昨日']);

const getLegendList = (data: any) => {
	switch(data) {
		case 1:	
			dateList.value = ['今日', '昨日'];
			break;
		case 2:	
			dateList.value = ['本周', '上周'];
			break;
		case 3:	
			dateList.value = ['本月', '上月'];
			break;
		default: 
			dateList.value = ['今日', '昨日'];
			break;
	}
}

watch(() => props.type, (newValue: any) => {
	if (!chart) {
		return
	}

	chart.dispose();
	chart = null;

	dateList.value = [];
	
	getLegendList(newValue);

	initChart();
})

watch(() => props.dataList, (newValue: any) => {
	if (!chart) {
		return;
	}

	chart.dispose();
	chart = null;

	curNameList.value = [];
	curDataList.value = [];
	curDataList2.value = [];

	dataList.value = newValue.map((s: any, i: number) => {
		curNameList.value.push(s.groupKeyName);
		const randValue = Math.floor(Math.random() * 11);
		curDataList.value.push({ name: s.groupKeyName, value: s.currentValue });
		curDataList2.value.push({ name: s.groupKeyName, value: s.lastValue });
		return { name: s.groupKeyName, value: s.groupValue };
	});

	initChart();
})

onMounted(() => {
	getLegendList(props.type);
	initChart();
})

onBeforeUnmount(() => {
	if (chart) {
		chart.dispose()
		chart = null
	}
});

const initChart = () => {

	const chartEle: HTMLElement = barDepartmentDouble.value as HTMLElement;
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
				align: 'left',
			}
		},
		legend: {
			show: true,
			data: dateList.value,
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
			top: '34%',
			left: "3%",
			right: "3%",
			bottom: "5%",
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
					fontSize: 10,
					interval: 0,
					formatter: (value) => {
						return value
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
				name: dateList.value[0],
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: 6,
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
			{
				name: dateList.value[1],
				type: "bar",
				xAxisIndex: 0,
				yAxisIndex: 0,
				barWidth: 6,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: "rgba(16,190,160,1)",
						},
						{
							offset: 1,
							color: "rgba(100,228,206,1)",
						},
					]),
				},
				data: curDataList2.value,
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