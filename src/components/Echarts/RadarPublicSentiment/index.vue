<template>
	<div ref="radarPublicSentiment" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { text } from 'stream/consumers';
import { watch } from 'vue';
import { onMounted, reactive, onBeforeUnmount, ref } from 'vue';

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
	}
})

let chart: any = null;

const radarPublicSentiment = ref();

//	nameList 
const nameList = ref([]);

//	valueList 
const valueList = ref([]);	

watch(() => props.dataList, (newValue: any) => {
	if(chart) {
		chart.dispose();
		chart = null;

		nameList.value = [];
		valueList.value = [];
	}
	

	newValue.forEach((item: any) => {
		const { name, value } = item;
		nameList.value.push({name});
		valueList.value.push(value);
	})

	const maxValue = Math.max(...valueList.value);

	nameList.value.map(item => {
		item.max = maxValue;
		return item;
	})
	
	initChart(nameList.value, valueList.value);
});




onBeforeUnmount(() => {
	if (!chart) {
		return
	}
	chart.dispose()
	chart = null
});

const initChart = (nameList: any, valueList: any) => {
	const chartEle: HTMLElement = radarPublicSentiment.value as HTMLElement;
	!chart && (chart = init(chartEle));
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'elasticOut',
		animationDuration: 5000,
		tooltip: {},
		legend: {
			show: true,
			icon: "circle",
			bottom: 30,
			itemWidth: 14,
			itemHeight: 14,
			itemGap: 21,
			orient: "horizontal",
			data: ['a', 'b'],
			textStyle: {
				fontSize: '70%',
				color: '#8C8C8C',
				align: 'left'
			},
		},
		radar: {
			radius: "64%", //大小
			axisNameGap: 20, // 图中工艺等字距离图的距离
			center: ["50%", "52%"], // 图的位置
			axisName: {
				color: "#fdfdfe",
				fontSize: 15,
				fontFamily: 'YouSheBiaoTiHei',
				formatter: function(name) {
				return name;
				}
			},
			indicator: nameList,
			axisLine: {
				lineStyle: {
					color: "#39799a"
				},
				show:true,
				symbolSize : [20,15],
				symbol:['none', 'arrow'],
				symbolOffset:[0,15]
				
			},
			splitArea: {
				areaStyle: {
					color: ['#30596d', '#0e2a37'].reverse(),
				}
			},
			splitLine: {
				show: false,
				lineStyle: {
					width: 1,
					color: "#59b9d0" // 设置网格的颜色
				}
			}
		},

		series: [
			{
				name: "报警类型分析",
				type: "radar",
				symbol: "angle",
				itemStyle: {
					areaStyle: { type: "default" }
				},
				data: [
					{
						symbol: "circle",
						symbolSize: 5,
						value: valueList,
						areaStyle: { color: "rgba(0,222,255,0.57)" },
						itemStyle: {
							borderWidth:1,
							color: "RGBA(0, 34, 66, 1)",
							borderColor: "rgba(146, 225, 255, 1)"
						},
						lineStyle: {
							color: "rgba(146, 225, 255, 1)",
							width: 1
						}
					}
				]
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