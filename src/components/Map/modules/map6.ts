import { ref } from 'vue'
import { gzList } from '@/api/index'
import { formatDate, splitPoint } from '@/utils/index'
import { Message } from '@arco-design/web-vue';

const fetchData = async (opt: any) => {
  return await gzList(opt).then((res: any) => {
    if (res.code === 200) {
      return res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

let map: any = null;
let minemap: any = null;
let resultList: any = null;

const addSources = (resList: any) => {
  let comList = resList.map((s: any) => {
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          s.jd,
          s.wd
        ]
      },
      "properties": {
        "mag": s.captureTotalAverage / 5000,
        "title": s.sensorName,
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
  resultList = null;
  const opt = { zpsj: formatDate(1), pageNum: 1, pageSize: 10000 };

  handleResult(opt);
};

const handleResult = async (opt: any) => {
  // const resultList = await fetchData(opt);
  const resultList = await fetchData(opt);

  if (resultList && resultList.length > 0) {
    //添加数据源,该热力图效果，数据源类型支持geojson或vector两种形式
    let onePoint = [ '120.144528', '32.503347' ];
    map.setCenter(onePoint);
    map.setZoom(14);

    // let start = 0;
    // let end = 0;
    // let step = 1000;
    // const len = resultList.length;

    addSources(resultList);

    // const func = () => {
    //   console.log(start > len);
    //   if(start > len) return;
    //   let t = null;
    //   start = end;
    //   end += step;
    //   const data = splitPoint(start, end, resultList);
    //   console.log(data);
    //   // 整理数据
    //   addSources(data);
      
    //   t = setTimeout(() => {
    //       //  对数据进行切片处理
    //     requestAnimationFrame(func);
    //   }, 5000);
    
    // }

    //  对数据进行切片处理
    // requestAnimationFrame(func);
    
  }
}

export default async (minemapObj: any, mapObj: any) => {
  minemap = minemapObj;
  map = mapObj;
  showMapGisInfo();
}
