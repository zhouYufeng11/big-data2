<template>
	<div :id="'chartPie' + curKey" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '120px'
	},
	height: {
		type: String,
		default: '130px'
	},
	curText: {
		type: String,
		default: ''
	},
	curValue: {
		type: Number,
		default: 0
	},
	curKey: {
		type: Number,
		default: 0
	},
})

const state: any = reactive({
	chart: null,
});

onMounted(() => {
	initChart();
});

onBeforeUnmount(() => {
	if (!state.chart) {
		return
	}
	state.chart.dispose()
	state.chart = null
});

const initChart = () => {

	const chartEle: HTMLElement = document.getElementById("chartPie" + props.curKey) as HTMLElement;
	const chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		title: [{
			text: props.curValue.toString(),
			left: '45%',
			top: '37%',
			textAlign: 'center',
			textStyle: {
				fontSize: 14,
				color: 'rgba(67,229,253,1)',
				fontFamily: 'YouSheBiaoTiHei',
			},
		}, {
			text: props.curText,
			left: '45%',
			bottom: '0',
			textAlign: 'center',
			textStyle: {
				fontSize: 15,
				color: '#FFFFFF',
				// fontFamily: 'YouSheBiaoTiHei',
			},
		}],
		polar: {
			radius: ['50%', '65%'],
			center: ['50%', '45%'],
		},
		angleAxis: {
			max: 100,
			show: false,
		},
		radiusAxis: {
			type: 'category',
			show: true,
			axisLabel: {
				show: false,
			},
			axisLine: {
				show: false,
			},
			axisTick: {
				show: false,
			},
		},
		series: [{
			name: '地区',
			type: 'bar',
			roundCap: true,
			barWidth: 60,
			showBackground: true,
			backgroundStyle: {
				color: 'rgba(66, 66, 66, .3)',
			},
			data: [80],
			coordinateSystem: 'polar',
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
					offset: 0,
					color: '#325fac',
				},
				{
					offset: 1,
					color: '#018b8c',
				},
				]),
			},
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