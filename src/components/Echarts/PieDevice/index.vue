<template>
	<div class="total" :class="[hasType && 'small']" v-if="total > 0">
		<p class="num">{{ total }}</p>
	</div>
	<div ref="PieDevice" class="chart-wrap" :style="{ height: height + 'px', width: width + 'px' }" />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { ref, onMounted, reactive, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
	width: {
		type: Number,
		default: 457
	},
	height: {
		type: Number,
		default: 239
	},
	dataList: {
		type: Array,
		default: []
	},
	hasType: {
		type: Boolean,
		default: false
	}
})

const PieDevice = ref();
let chart: any = null;
const total = ref(0);

watch(() => props.dataList, (newValue: any) => {
	let nameList: any = [];
	let dataList: any = [];
	total.value = 0;
	newValue.forEach((s: any) => {
		total.value += s.groupValue;
		nameList.push(s.groupKeyName);
		dataList.push({ name: s.groupKeyName, value: s.groupValue });
	});
	initChart(nameList, dataList);
})

onBeforeUnmount(() => {
	if (!chart) {
		return
	}
	chart.dispose();
	chart = null;
});

const initChart = (nameList: any, dataList: any) => {
	const chartEle: HTMLElement = PieDevice.value as HTMLElement;
	!chart && (chart = init(chartEle));
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		// color: color,
		grid: {
			top: 0,
			left: 0,
			right: 0,
			bottom: 5,
			containLabel: true,
		},
		tooltip: {
			show: true
		},
		legend: {
			left: 20,
			top: 20,
			orient: 'vertical',
			icon: 'roundRect',
			itemWidth: 15,
			itemHeight: 15,
			data: nameList,
			textStyle: {
				color: '#fff',
				fontSize: 20,
				lineHeight: 20,
				fontFamily: 'YouSheBiaoTiHei'
			},
			itemStyle: {
				borderWidth: 0,
				borderColor: '#4490e2'
			},
		},
		series: [{
			name: '设备分类',
			type: 'pie',
			startAngle: 0,
			z: 3,
			center: ['58%', '50%'],
			radius: ['45%', '70%'],
			label: {
				show: true,
				color: '#fff',
				fontSize: 16,
				fontFamily: 'YouSheBiaoTiHei',
				formatter: (data) => {
					return data.value;
				}
			},
			labelLine: {
				show: true,
				length: 5,
				length2: 10,
				smooth: false,
				showAbove: true,
				minTurnAngle: 90,
			},
			itemStyle: {
				borderWidth: 8,
				borderRadius: 0,
			},
			data: dataList
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

.total {
	position: absolute;
	top: 70px;
	left: 215px;
	height: 100px;
	line-height: 100px;
	width: 100px;
	border-radius: 50%;
	text-align: center;
	font-size: 30px;
	// background: rgba(255, 255, 255, .1);

	.num {
		position: relative;
		height: 100%;
		width: 100%;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			border: 3px dashed $color-theme;
			border-radius: 50%;
			animation: rotate360 8s linear infinite;
		}
	}
}
</style>