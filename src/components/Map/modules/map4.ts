import { ref } from 'vue'
import { hotMap } from '@/api/index'
import { formatDateStr, formatterLngLat, formDataCoordinate } from '@/utils/index'
import { Message } from '@arco-design/web-vue';
import { fkData } from '@/api/riskControl';

// const fetchData = async ({ minGisX, minGisY, maxGisX, maxGisY }) => {
//   return await hotMap({
//     minGisX, minGisY, maxGisX, maxGisY
//     // minGisX: 120.168710,
//     // minGisY: 32.007170,
//     // maxGisX: 120.368710,
//     // maxGisY: 32.117170
//   }).then((res: any) => {
//     if (res.code === 200) {
//       return res.data;
//     } else {
//       Message.error(res.msg)
//     }
//   }).catch(err => {
//     console.log(err)
//   })
// }

const fetchData = async () => {
  return await fkData([ 'list' ], {pageNum: 1, pageSize: 1000}).then((res: any) => {
    if (res.code === 200) {
      return res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}



let map: any = null;
let minemap: any = null;
let resultList: any = null;

const addSources = (resList: any) => {
  //添加数据源,该热力图效果，数据源类型支持geojson或vector两种形式
  let onePoint = [ '120.144528', '32.503347' ];
  map.setCenter(onePoint);
  map.setZoom(10);
  let comList = resList.map((s: any) => {
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          Number(s.jd),
          Number(s.wd)
        ]
      },
      "properties": {
        "mag": Number(s.id),
        "title": s.gkzrdw,
        "marker-symbol": "monument"
      }
    }
  });

  map.addSource("heatmapSource", {
    type: "geojson",
    data: {
      "type": "FeatureCollection",
      "features": comList,
    }
  });
  // 添加热力图
  addLayers();
}
// 热力图
const addLayers = () => {
  map.addLayer({
    "id": "heatmapLayer",
    "type": "heatmap",
    "source": "heatmapSource",
    // "source-layer": "heatmapLayer",
    "layout": {
      "visibility": "visible"
    },
    "paint": {
      // 一个热力图数据点的模糊范围，单位是像素，默认值30；要求：值大于等于1，可根据zoom level进行插值设置
      "heatmap-radius": 30,
      //一个热力图单个数据点的热力程度，默认值为1；要求：值大于等于0，支持使用property中某个的热力值
      "heatmap-weight": {
        "property": "mag",
        "stops": [[0, 0], [10, 1]]
      },
      // 用于统一控制热力值的强度，默认值1；要求：值大于等于0，可根据zoom level进行插值设置
      "heatmap-intensity": 1,
      // 表示热力图颜色阶梯，阶梯的值域范围为0-1，默认值为["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0, "rgba(0, 0, 255, 0)", 0.1, "royalblue", 0.3, "cyan", 0.5, "lime", 0.7, "yellow", 1, "red"
      ],
      // 表示热力图的不透明度，默认值1；值域范围0-1，可根据zoom level进行插值设置
      "heatmap-opacity": 1,
    }
  });
}

const showMapGisInfo = () => {
  handleResult();
};

const handleResult = async () => {
  const resultList = await fetchData();
  if (resultList && resultList.length > 0) {
    // 整理数据
    addSources(resultList);
  }
}

export default async (minemapObj: any, mapObj: any) => {
  minemap = minemapObj;
  map = mapObj;
  showMapGisInfo();
}
