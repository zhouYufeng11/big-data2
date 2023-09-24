<template>
	<div class="total" :class="[hasType && 'small']" v-if="total > 0">
		<p class="num">{{ total }}</p>
	</div>
	<div ref="PieCategory" class="chart-wrap" :style="{ height: height + 'px', width: width + 'px' }" />
	<!-- <Btn v-if="hasType" @btnClick="setType" /> -->
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { ref, onMounted, reactive, onBeforeUnmount, watch } from 'vue';
import Btn from '@/components/Btn/index.vue';

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

const PieCategory = ref();
const total = ref(0);
const emit = defineEmits(['change']);
const setType = (type: number) => {
	emit('change', type)
}

let chart: any = null;
let nameList: any = [, '违法犯罪', '社会稳定', '公共安全', '群众求助', '举报投诉', '其他警情'];

watch(() => props.dataList, (newValue: any) => {
	if (chart) {
		chart.dispose();
		chart = null;
	}
	

	let dataList: any = [];
	total.value = 0;

	// newValue.forEach((s: any, i: any) => {
	// 	total.value += s.groupValue;
	// 	dataList.push({ name: nameList, value: s.groupValue });
	// });

	if(newValue.length) {
		for(var i = 1; i < nameList.length; i++) {
			dataList.push({name: nameList[i], value: newValue[0]['value' + i]});
			total.value += newValue[0]['value' + i];
		}

		initChart(nameList, dataList);
	} 
})


onBeforeUnmount(() => {
	if (!chart) {
		return
	}
	chart.dispose();
	chart = null;
});

// 根据不同类型 改变大小
const PropCenter = props.hasType ? ['62%', '62%'] : ['65%', '50%'];
const PropRadius = props.hasType ? ['45%', '65%'] : ['45%', '70%'];
const PropColor = props.hasType ? '#8dbee9' : '#fff';
const PropLabelColor = props.hasType ? '#61a5df' : '#fff';

const initChart = (nameList?: any, dataList?: any) => {
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
			top: 20,
			orient: 'vertical',
			icon: 'roundRect',
			itemWidth: 15,
			itemHeight: 15,
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
			center: ['60%', '50%'],
			radius: PropRadius,
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
	left: 286px;
	height: 100px;
	line-height: 100px;
	width: 100px;
	border-radius: 50%;
	text-align: center;
	font-size: 30px;
	// background: rgba(255, 255, 255, .1);

	&.small {
		height: 96px;
		line-height: 96px;
		width: 96px;
		top: 72px;
		left: 100px;
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