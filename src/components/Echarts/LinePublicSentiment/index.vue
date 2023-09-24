<template>
	<div ref="LineCategory" class="chart-wrap" :style="{ height: height + 'px', width: width + 'px' }" />
</template>

<script setup lang='ts'>
import { log } from 'console';
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { ref, reactive, onBeforeUnmount, onMounted, watch } from 'vue';

const props = defineProps({
	width: {
		type: Number,
		default: 457
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

watch(() => props.yAxisData, (newValue: any) => {
	initChart(props.xAxisData, newValue);
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
		tooltip: {
      trigger: 'axis',
			textStyle: {
				align: 'left'
			}
    },
		grid: {
			top: 50,
			left: 20,
			right: 30,
			bottom: 50,
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
				interval: 'auto'
			},
			data: xAxisData
		}],
		yAxis: [{
			type: "value",
			name: "数量",
			nameTextStyle: {
				color: "#fff",
				fontFamily: "YouSheBiaoTiHei",
				fontSize: 16,
				padding: [0, 0, 0, -60]
			},
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
		series: [
    {
      data: yAxisData,
      type: 'line'
    }
  ]
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