<template>
	<div ref="barTask" class="chart-wrap" :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import * as echarts from 'echarts';
import { EChartsOption, init } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref, toValue, watch } from 'vue';

const props = defineProps({
	width: {
		type: String,
		default: '417px'
	},
	height: {
		type: String,
		default: '160px'
	},
	dataList: {
		type: [Array, Object],
		default: []
	}
})

const barTask = ref();
let chart: any = null;

let total = 0;

let datas: any = [];
let malePercent = 50;
let femalePercent = 50;
let percent: any = [];

const nameList: any = ['车辆', '人脸'];

watch(() => props.dataList, (newValue: any) => {
	const { FaceInfo, VehicleInfo } = newValue;
	const FaceInfoTotal = FaceInfo.CloseMonitorCount + FaceInfo.OpenMonitorCount;
	const VehicleInfoTotal = VehicleInfo.CloseMonitorCount + VehicleInfo.OpenMonitorCount;

	percent = [
		VehicleInfoTotal === 0 ? 50 : VehicleInfo.OpenMonitorCount / VehicleInfoTotal,
      FaceInfoTotal === 0 ? 50 : FaceInfo.OpenMonitorCount / FaceInfoTotal * 100,
	];

	datas = [
		VehicleInfo,
		FaceInfo,
	]

	initChart();
})

onBeforeUnmount(() => {
	if (chart) {
		chart.dispose()
		chart = null
	}
});

const initChart = () => {
	const chartEle: HTMLElement = barTask.value as HTMLElement;
	if (!chart) chart = init(chartEle);
	const option: EChartsOption = {
		animation: true,
		animationEasing: 'linear',
		animationDuration: 500,
		grid: {
			top: 20,
			left: 20,
			right: 20,
			bottom: 0,
		},
		xAxis: {
      max: 100,
      splitLine: {
         show: false
      },
      axisLabel: {
         show: false
      },
      axisTick: {
         show: false
      },
      axisLine: {
         show: false
      },
   },
   //y 轴
   yAxis: {
      data: nameList,
      axisLine: {
         show: false
      },
      axisTick: {
         show: false
      },
      splitLine: {
         show: false
      },
      axisLabel: {
         show: false
      }
   },
   //展示层
   series: [
      //目标数据
      {
         type: 'pictorialBar',
         symbolBoundingData: 100,
         symbolRotate: -15,
         symbolSize: [4, 16],
         symbolOffset: [4, 0],
         symbolMargin: 1.5,
         barWidth: 20,
         itemStyle: {
          normal: {
            color: '#17bdfd'
          }
        },
         z: 20,
         label: {
            show: true,
            position: 'left',
            align: 'left',
            distance: 16,
            color: '#5cf6fa',
            fontSize: 12,
            offset: [20, -25],
            formatter(value) {
				  const { dataIndex } = value;
              return nameList[dataIndex];
            }
         },
         data: [
            {
               value: percent[0],
               symbol: 'rect',
               symbolClip: true,
               symbolRepeat: true,
            },
						{
               value: percent[1],
               symbol: 'rect',
               symbolClip: true,
               symbolRepeat: true,
            }
         ]
      },
      //背景数据
      {
         type: 'pictorialBar',
         symbolBoundingData: 100,
         symbolRotate: -15,
         symbolSize: [4, 16],
         symbolOffset: [4, 0],
         symbolMargin: 1.5,
         barWidth: 20,
         z: 15,
         itemStyle: {
            normal: {
               color: '#ffa732'
            }
         },
         label: {
            show: true,
            position: 'right',
            align: 'right',
            distance: 16,
            color: '#feca54',
            fontSize: 12,
            offset: [-20, -25],
            formatter(value) {
					const { dataIndex } = value;
               return `${datas[dataIndex].OpenMonitorCount} / ${datas[dataIndex].CloseMonitorCount}`;
            }
         },
         data: [{
            symbol: 'rect',
            value: 100,
            symbolClip: true,
            symbolRepeat: true,
         },
				 {
            symbol: 'rect',
            value: 100,
            symbolClip: true,
            symbolRepeat: true,
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