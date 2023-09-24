<template>
	<div ref="wordCloud" class="chart-wrap" :style="{ height: height + 'px', width: width + 'px' }" />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import 'echarts-wordcloud'
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref, watch } from 'vue';

const props = defineProps({
	width: {
		type: Number,
		default: 560
	},
	height: {
		type: Number,
		default: 265
	},
	dataList: {
		type: Array,
		default: []
	}
})

const wordCloud = ref();
let chart: any = null;
// textStyle: {
// 	shadowBlur: 4,
// 	shadowColor: '#ECEFFF',
// 	shadowOffsetY: 14,
// 	color: '#73DDFF',
// },

let list: any = ref([]);
let maxOne: any = ref(0);
watch(() => props.dataList, (newValue: any) => {
	if (chart) {
		chart.dispose();
		chart = null;
	}
	maxOne.value = 0;
	let maxIndex = 0;
	list.value = newValue.map((s: any, i: number) => {
		if (s.groupValue > maxOne.value) {
			maxOne.value = s.groupValue;
			maxIndex = i;
		}
		return { name: s.groupKeyName, value: s.groupValue };
	});
	// 最大值 - 颜色最显眼
	list.value[maxIndex].textStyle = {
		shadowBlur: 4,
		shadowColor: '#ECEFFF',
		shadowOffsetY: 14,
		color: '#e4393c',
		fontSize: list.value.length < 10 ? 80 : 50,
	}
	initChart();
});


onBeforeUnmount(() => {
	if (chart) {
		chart.dispose()
		chart = null
	}
});

const colors = [
	'#F8D800',
	'#7367F0',
	'#EA5455',
	'#7367F0',
	'#32CCBC',
	'#28C76F',
	'#FA742B',
	'#FFC600',
	'#00E4FF',
	'#49C628',
];

const initChart = () => {
	const chartEle: HTMLElement = wordCloud.value as HTMLElement;
	if (!chart) chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'linear',
		animationDuration: 500,
		tooltip: {
			show: true
		},
		series: [
			{
				type: 'wordCloud',
				// 可用的形状有(circle)圆形(默认)、(cardioid)心形，(diamond)菱形，(triangle-forward)三角形向前，(triangle)三角形，(pentagon)五边形和(star)星形。*/
				shape: 'pentagon',
				left: 'center',
				top: 'center',
				width: '100%',
				height: '100%',
				right: null,
				bottom: null,
				sizeRange: [list.value.length < 10 ? 30 : 20, 80],
				rotationRange: [0, 0],
				rotationStep: 0,
				gridSize: list.value.length < 10 ? 15 : 10,
				drawOutOfBound: false,
				shrinkToFit: true, // 超出自动缩小
				layoutAnimation: true,
				textStyle: {
					fontFamily: 'YouSheBiaoTiHei',
					color: function (data: any) {
						return colors[Math.floor(Math.random() * 10)];
						// return `rgb(${Math.round(Math.random() * 256)},
						// 						${Math.round(Math.random() * 256)},
						// 						${Math.round(Math.random() * 256)}
						// 				)`;
					},
				},
				emphasis: {
					focus: 'none',
				},
				data: list.value,
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