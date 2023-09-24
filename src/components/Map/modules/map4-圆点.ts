import { ref } from 'vue'
import { hotMap } from '@/api/index'
import { formatterLngLat } from '@/utils/index';
import { Message } from '@arco-design/web-vue';

const fetchData = async ({ minGisX, minGisY, maxGisX, maxGisY }) => {
  return await hotMap({
    minGisX, minGisY, maxGisX, maxGisY
    // minGisX: 120.168710,
    // minGisY: 32.007170,
    // maxGisX: 120.368710,
    // maxGisY: 32.117170
  }).then((res: any) => {
    if (res.code === 200) {
      return res.data;
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
let popup = null;

const initPopup = () => {
  popup = new minemap.Popup({
    closeOnClick: false,
    closeButton: true,
    // anchor: 'top', // [top, bottom, left, right, top-left, top-right, bottom-left, bottom-right]
    offset: [10, 55],
  });
}

// 定义一个CustomLayerInterface来在地图上绘制脉冲点
const getPulsingDot = (size = 200) => {
  var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // 在图层添加到地图时获取获取canvas context
    onAdd: function () {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },

    // 每帧渲染时调用
    render: function () {
      var duration = 1000;
      var t = (performance.now() % duration) / duration;

      var radius = (size / 2) * 0.3;
      var outerRadius = (size / 2) * 0.7 * t + radius;
      var context = this.context;

      // 画外围圆
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(
        this.width / 2,
        this.height / 2,
        outerRadius,
        0,
        Math.PI * 2
      );
      context.fillStyle = 'rgba(30, 128, 255,' + (1 - t) + ')';
      context.fill();

      // 画内圈圆
      context.beginPath();
      context.arc(
        this.width / 2,
        this.height / 2,
        radius,
        0,
        Math.PI * 2
      );
      context.fillStyle = 'rgba(8, 233, 235, 1)';
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // 从canvas中更新图片数据
      this.data = context.getImageData(
        0,
        0,
        this.width,
        this.height
      ).data;

      // 不断地重新绘制地图，导致平滑的动画点
      map.triggerRepaint();

      // 返回`true`让映射知道图像已经更新
      return true;
    }
  };
  return pulsingDot;
}

const onMouseClick = (e: any) => {
  var features = map.queryRenderedFeatures(e.point, { layers: ['points'] });
  if (!features.length) {
    popup.remove();
    return;
  }
  var feature = features[0];
  var coord = null;
  if (feature.layer.id == "points") {
    coord = feature.geometry.coordinates;
  }

  if (coord) {
    popup.setLngLat(coord)
      .setHTML(`<div class="popInfo">
                  <p class="popInfoItem">派出所：${feature.properties.title}</p>
                  <p class="popInfoItem">重点人员数：${feature.properties.value}</p>
                </div>`)
      .addTo(map);
  }
}
const addSources = (resList) => {
  // 中心点 - 梁徐
  let onePoint = [120.120178, 32.476672];
  map.setCenter(onePoint);
  map.setZoom(11);
  let comList = resList.map(s => {
    return {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [
          s.lng,
          s.lat
        ]
      },
      "properties": {
        "value": s.value,
        "title": s.name,
        "marker-symbol": "monument"
      }
    }
  });

  map.addImage('pulsing-dot', getPulsingDot(), {
    pixelRatio: 2
  });

  map.addSource('points', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': comList
    }
  });

  // 添加动态图标
  addLayers(map);
}
// 动态图标
const addLayers = () => {
  map.addLayer({
    'id': 'points',
    'type': 'symbol',
    'source': 'points',
    'layout': {
      'icon-image': 'pulsing-dot'
    }
  });
}

const showMapGisInfo = () => {
  // var center = map[0].getCenter();
  const { lng: minGisX, lat: maxGisY } = map.unproject([0, 0]);
  const { lng: maxGisX, lat: minGisY } = map.unproject([1920, 1080]);
  const gisInfo = {
    minGisX: formatterLngLat(minGisX),
    minGisY: formatterLngLat(minGisY),
    maxGisX: formatterLngLat(maxGisX),
    maxGisY: formatterLngLat(maxGisY),
  };
  handleResult(gisInfo);
};

const handleResult = async (gisInfo) => {
  const resultList = await fetchData(gisInfo);
  if (resultList && resultList.length > 0) {
    // 整理数据
    addSources(resultList);
    // 初始化popup
    initPopup();
  }
}

export default async (minemapObj: any, mapObj: any) => {
  minemap = minemapObj;
  map = mapObj;
  map.on('click', onMouseClick);
  showMapGisInfo();
}
