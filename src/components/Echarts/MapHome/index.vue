<template>
  <div ref='chartMap' class='chart-wrap animate__animated animate__zoomIn' :style='{ height: height, width: width }' />
</template>

<script setup lang='ts'>
import { EChartsOption, init, registerMap } from 'echarts';
import { onMounted, reactive, onBeforeUnmount, ref, watch } from 'vue';
import mapData from './321204.json';
import mapDataOutLine from './321204_outline.json';
import { img1 } from './icon';



const chartData: any = JSON.parse(JSON.stringify(mapData));
const chartDataOutLine: any = JSON.parse(JSON.stringify(mapDataOutLine));

const props: any = defineProps({
  width: {
    type: String,
    default: '800px'
  },
  height: {
    type: String,
    default: '800px'
  },
  dataList: {
    type: [Array, Object],
    default: []
  },
  chooseIndex: {
    type: Array,
    defaut: []
  }
});

const chartMap = ref();
let chart: any = null;
let activeIndex = 0;
const selectName = '姜堰区';
const chinaMapOutline = '姜堰区轮廓';
const activeIcon = `image://${img1}`;
let dataAll: any = [];

watch(() => props.dataList, (newValue: any) => {
  dataAll = [];
  const list: any = [];
  chartData.features.forEach((t: any, i: number) => {
    let showData: any = {};
    if (t.properties.name) {
      const { organCode, oldOrgCode } = t.properties;
      for(var key in newValue) {
          if(key == organCode) {
            showData = newValue[key];
            break;
          } else if(key == oldOrgCode) {
            showData = newValue[key];
            break;
          }
        }
    
      dataAll.push({name: t.properties.name, value: showData});
    }
  });

  initChart();
})

const mapChoose: any = {
  jjxxResult: { name: '警情', color: '#FF0000'},
  ajxxResult: { name: '案件', color: '#FF7D00'},
  // deviceResult: { name: '勤务', color: '#FFFF00'},
  yqResult: { name: '舆情', color: '#00FFFF'}
}; 

const convertData = chartData.features.map((s: any) => {
  let areaName = s.properties.name;
  let helfLen = Math.trunc(s.geometry.coordinates[0].length / 2);
  let curList = [s.geometry.coordinates[0][0], s.geometry.coordinates[0][helfLen]];
  let resultList = [(curList[0][0] + curList[1][0]) / 2, (curList[0][1] + curList[1][1]) / 2];
  return { name: areaName, value: resultList, num: 150 };
});

watch(() => props.chooseIndex, (newValue: any) => {
  initChart();
})

onMounted(() => {
  initChart();
});

onBeforeUnmount(() => {
  if (!chart) {
    return
  }
  chart.dispose()
  chart = null
})

// const timing = () => {
//   // 取消高亮指定的数据图形
//   chart.dispatchAction({
//     type: 'downplay',
//     seriesIndex: 0,
//     dataIndex: activeIndex,
//   });
//   // 高亮指定的数据图形
//   chart.dispatchAction({
//     type: 'highlight',
//     seriesIndex: 0,
//     dataIndex: activeIndex + 1,
//   });
//   activeIndex++;
//   //判断长度是否和城市的长度一样，如果一样重新播放
//   if (activeIndex >= convertData.length) {
//     activeIndex = 0;
//   }
// }

const initChart = () => {
  const chartEle: HTMLElement = chartMap.value as HTMLElement;
  registerMap(selectName, chartData);
  registerMap(chinaMapOutline, chartDataOutLine);
  !chart && (chart = init(chartEle));
  const option: EChartsOption = {
    legend: {
      show: false,
    },
    tooltip: {
      show: true,
      padding: 4,
      position: 'left',
      textStyle: { // 提示框浮层的文本样式。
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontFamily: 'sans-serif',
        fontSize: 16,
        align: 'left'
      },
      formatter(item: any) {
        const { name, value: curValue } = item.data;

        const formatStr = (type: any, data: any) => {
          switch(type) {
            case 'ajxxResult':
              return `<div><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:0px;background-color:${mapChoose[type].color}"></span>${ mapChoose[type].name }: ${data.currentValue || 0}</div>`;
            case 'jjxxResult':
              return `<div><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:0px;background-color:${mapChoose[type].color}"></span>${mapChoose[type].name}: ${data.currentValue || 0}</div>`;
            case 'deviceResult':
              return `<div><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:0px;background-color:${mapChoose[type].color}"></span>${ mapChoose[type].name }: ${data.totalCount || 0}</div>`;
            case 'yqResult':
              return `<div><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:0px;background-color:${mapChoose[type].color}"></span>${ mapChoose[type].name }: ${data.groupValue || 0}</div>`;
            default:
              return '';
          }
        }

        try {
          let str = '';
          //  判断是否是空对象
          if(JSON.stringify( curValue ) == "{}") {
            for(let k of props.chooseIndex) {
              str += formatStr(k, {});
            }
          } else {  //  说明里面有数据
            for(let k of props.chooseIndex) {
              if(curValue[k]) {
                str += formatStr(k, curValue[k]);
              } else {
                str += formatStr(k, {});
              }
            }
          }
          
          return str;
        } catch(ev) {}
      }
    },
    geo: [{ // 轮廓
      map: chinaMapOutline,
      zlevel: -1,
      aspectScale: 1,
      zoom: .9,
      layoutCenter: ['53%', '51%'],
      layoutSize: '100%',
      show: true,
      silent: false,
      roam: false,
      label: {
        show: false
      },
      tooltip: {
        show: true,
        backgroundColor: "transparent",
        borderColor:'transparent',
        borderWidth:0,
        formatter(value: any) {
          return '';
        }
      },
      itemStyle: {
        borderColor: 'rgba(31,102,136,.8)',
        borderWidth: 2,
        shadowColor: 'rgba(31,102,136,0.6)',
        shadowOffsetY: 5,
        shadowOffsetX: -8,
        shadowBlur: 2,
        areaColor: 'rgba(31,102,136,.1)',
      },
      select: {
        disabled: true,
      },
      emphasis: {
        disabled: true,
      }
    },
    ],
    series: [{
      name: selectName,
      type: 'map',
      map: selectName, // 自定义扩展图表类型
      aspectScale: 1,
      zlevel: 2,
      zoom: 1, //缩放
      roam: false,
      colorBy: 'data',
      showLegendSymbol: false,
      layoutCenter: ['53%', '50%'],
      layoutSize: '90%',
      label: {
        show: false,
        color: "#fff",
        position: 'inside',
        fontSize: 16,
      },
      itemStyle: {
        areaColor: {
          type: 'radial',
          x: 0.5,
          y: 0.5,
          r: 0.8,
          colorStops: [{
            offset: 0,
            color: 'rgba(5,21,35,0.1)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(67,229,253, .5)' // 50% 处的颜色
          }],
          // global: true // 缺省为 false
        },
        borderWidth: 2,
        borderColor: 'rgba(67,229,253,1)',
        // shadowOffsetY: 20,
        // shadowOffsetX: -20,
        // shadowBlur: 5,
        // shadowColor: 'rgba(67,229,253,0.3)',
      },
      emphasis: {
        disabled: false,
        itemStyle: {
          areaColor: 'rgba(67,229,253,.5)',
        },
        label: {
          show: false,
          color: '#fff'
        }
      },
      select: {
        disabled: false,
        itemStyle: {
          areaColor: 'rgba(67,229,253,.6)',
          borderColor: '#7af7fa',
          borderWidth: 4,
        },
        label: {
          show: false,
          color: '#fff'
        }
      },
      data: dataAll,
    },
    // // 图标的位置
    {
      name: selectName,
      type: 'scatter',
      coordinateSystem: 'geo',
      data: convertData,
      symbol: activeIcon,
      zlevel: 3,
      symbolSize: (val) => {
        return 70;
      },
      symbolOffset: [0, -30],
      label: {
        show: true,
        formatter: (params: any) => {
          return ' ' + params.name;
        },
        position: [0, 0, 0, 0],
        color: '#fff',
        fontFamily: 'YouSheBiaoTiHei',
        fontSize: 16,
      },
      emphasis: {
        disabled: true,
      },
      itemStyle: {

      },
    },
    // 扩散圆
    {
      name: selectName,
      tooltip: {
        show: false,
      },
      type: 'effectScatter',
      coordinateSystem: 'geo',
      rippleEffect: {
        color: 'rgba(18,173,219, 1)',
        scale: 10,
        brushType: 'stroke',
      },
      showEffectOn: 'render',
      itemStyle: {
        shadowColor: 'rgba(18,173,219, .9)',
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
      label: {
        show: false,
      },
      symbol: 'circle',
      symbolSize: [10, 5],
      symbolOffset: [0, 0],
      data: convertData,
      zlevel: 1,
    },
    ],
  };

  option && chart.setOption(option);
  
  // 循环点亮
  // setInterval(() => {
  //   timing();
  // }, 1000)
}
</script>

<style lang="scss" scoped>
.chart-wrap {
  position: relative;
  width: auto;
  height: auto;
  margin: 0 auto;
  z-index: 0;
}
</style>