<template>
	<div ref="LineSnap" class="chart-wrap" :style="{ height: height + 'px', width: width + 'px' }" />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';

import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue';

	//	当前需要显示的数据
	let curShowXAxisList: any = [];
	let curShowYAxisList: any = [];
	//	记录当前数据显示的位置
	let curIndex = 0;

const props = defineProps({
	width: {
		type: Number,
		default: 458
	},
	height: {
		type: Number,
		default: 239
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

const LineSnap = ref();
let chart: any = null;
const total: any = ref(0);

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

animateBar();

watch(() => props.yAxisData, (newValue: any) => {

	let yAxisData: any = newValue.map((s: any, i: number) => {
			return assembleData(i, s)
		});

		curShowYAxisList = JSON.parse(JSON.stringify(yAxisData));

		curShowYAxisList.forEach((item: any) => {
			item.oldDatas = JSON.parse(JSON.stringify(item.data));
			item.data = item.oldDatas.slice(0, 6);
		})

	curShowXAxisList = props.xAxisData.slice(0, 6);
	curIndex = 6;	//	位置同步

	initChart(curShowXAxisList, curShowYAxisList);
})


onBeforeUnmount(() => {
	if (!chart) {
		return
	}
	chart.dispose();
	chart = null;
});

function animateBar() {

	// 循环添加
	let showSetInterval: any = setInterval(() => {
		if (!chart) {
			return
		}
		chart.dispose();
		chart = null;

		if (!props.xAxisData || props.xAxisData.length === 0) {
			clearInterval(showSetInterval);
			showSetInterval = null;
			return
		}

		if( curIndex < props.xAxisData.length ) {
			curShowXAxisList.push(props.xAxisData[curIndex]);
			curShowXAxisList.shift();

			curShowYAxisList.forEach((item: any) => {
				item.data.push(item.oldDatas[curIndex]);
				item.data.shift();
			})

			curIndex++;

		} else {
			curIndex = 0;

			curShowXAxisList.push(props.xAxisData[curIndex]);
			curShowXAxisList.shift();

			curShowYAxisList.forEach((item: any) => {
				item.data.push(item.oldDatas[curIndex]);
				item.data.shift();
			})
		}

		initChart(curShowXAxisList, curShowYAxisList);
	}, 4000)
}

const initChart = (xAxisData: any, yAxisData: any) => {
	const chartEle: HTMLElement = LineSnap.value as HTMLElement;
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
			},
			formatter: function (params: any) {
				let total = 0;
				let str = '';
				params.forEach((item: any) => {
					total += item.data;
					str += `<div><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:${item.color}"></span>${ item.seriesName }: ${item.data}</div>`
				});
				str = `<div>总数: ${ total }</div>` + str;
				return str;
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
			},
			data: curShowXAxisList
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
		series: curShowYAxisList,
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