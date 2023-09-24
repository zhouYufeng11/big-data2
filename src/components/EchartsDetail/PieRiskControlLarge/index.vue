<template>
	<div class="total" :class="[hasType && 'small']" v-if="total > 0">
		<p class="num">{{ total }}</p>
	</div>
	<div ref="PieCategory" class="chart-wrap" :style="{ height: height + 'px', width: width + 'px' }" />
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
		type: [Array, Object],
		default: []
	},
	hasType: {
		type: Boolean,
		default: false
	}
})

const PieCategory = ref();
const total = ref(0);
const emit = defineEmits(['change']);
const setType = (type: number) => {
	emit('change', type)
}

let chart: any = null;

watch(() => props.dataList, (newValue: any) => {
	let nameList: any = [];
	let dataList: any = [];
	total.value = newValue.zry;

	delete newValue.zry;

	for(let s in newValue) {
		const item = newValue[s];

		nameList.push(item.name);
		dataList.push({ name: item.name, value: item.value });
	}

	initChart(nameList, dataList);
})

onBeforeUnmount(() => {
	if (!chart) {
		return
	}
	chart.dispose();
	chart = null;
});

const color = [
	new echarts.graphic.LinearGradient(0, 1, 0, 0, [
		{
			offset: 0,
			color: '#64FFF9',
		},
		{
			offset: 1,
			color: '#64ffd9',
		},
	]),
	new echarts.graphic.LinearGradient(0, 1, 0, 0, [
		{
			offset: 0,
			color: '#114be2',
		},
		{
			offset: 1,
			color: '#3e88e2',
		},
	]),
	new echarts.graphic.LinearGradient(0, 1, 0, 0, [
		{
			offset: 0,
			color: '#d75f42',
		},
		{
			offset: 1,
			color: '#d34791',
		},
	]),
];

// 根据不同类型 改变大小
const PropCenter = props.hasType ? ['62%', '62%'] : ['65%', '50%'];
const PropRadius = props.hasType ? ['45%', '65%'] : ['45%', '70%'];
const PropColor = props.hasType ? '#8dbee9' : '#fff';
const PropLabelColor = props.hasType ? '#61a5df' : '#fff';

const initChart = (nameList: any, dataList: any) => {
	const chartEle: HTMLElement = PieCategory.value as HTMLElement;
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
			top: 10,
			orient: 'vertical',
			icon: 'roundRect',
			itemWidth: 15,
			itemHeight: 15,
			data: nameList,
			textStyle: {
				color: PropColor,
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
			name: '警情分类',
			type: 'pie',
			startAngle: 0,
			z: 3,
			center: ['62%', '50%'],
			radius: ['45%', '65%'],
			label: {
				show: true,
				color: PropLabelColor,
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
	top: 82px;
	left: 314px;
	height: 100px;
	line-height: 100px;
	width: 100px;
	border-radius: 50%;
	text-align: center;
	font-size: 30px;
	// background: rgba(255, 255, 255, .1);

	&.small {
		height: 110px;
		line-height: 110px;
		width: 110px;
		top: 78px;
		left: 292px;
	}

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

.btn-box {
	position: absolute;
	top: 20px;
	right: 20px;

	.btn {
		width: 40px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 14px;
		border: 1px solid #0c81ff;
		background: transparent;
		color: #0c81ff;

		&.active,
		&:hover {
			background: rgba(0, 100, 255, .4);
			color: #fff;
		}
	}
}
</style>