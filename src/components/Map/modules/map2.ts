import { ajxxGisList } from '@/api/index'
import { dic_dj_level } from '@/api/dic';
import { throttle } from '@/utils/index';
import { formatterLngLat } from '@/utils/index';
import { Message } from '@arco-design/web-vue';
import { mainStore, watchStore } from "@/store/index";

let markers = [];
let map: any = null;
let minemap: any = null;
let levelList: any = [];
let type: any = 1;

let timer: any = setTimeout(() => {
  // 状态
  let store = mainStore();
  // 监听 actions 方法 - 设置地图中心点
  watchStore("setMapCenter2", (store: any) => {
    let mapCenter = store.$state.mapCenter;
    if (mapCenter && mapCenter.length === 2) {
      map.setCenter(store.$state.mapCenter);
    }
  });
  clearTimeout(timer);
}, 1000);

let getLevelClassname = (level: any) => {
  return level === 1 ? 'map-icon-red' : level === 2 ? 'map-icon-yellow' : level === 3 ? 'map-icon-blue' : 'map-icon-default';
}

let getLevelText = (level: any) => {
  const findOne = levelList.find((s: any) => {
    return (level + '') === s.dictValue;
  });
  return findOne?.dictLabel || '暂无等级';
}

const fetchDicData = async () => {
  return await dic_dj_level({}).then((res: any) => {
    if (res.code === 200) {
      levelList = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}
// 直接请求
fetchDicData();

const fetchData = async ({ minGisX, minGisY, maxGisX, maxGisY, type }) => {

  return await ajxxGisList({
    minGisX, minGisY, maxGisX, maxGisY, type
  }).then((res: any) => {
    if (res.code === 200) {
      return res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

const addMarker = (id, obj) => {
  // 图标颜色
  const level = obj.djdj;
  const levelClassName = getLevelClassname(level);
  const levelText = getLevelText(level);
  // 自定义marker
  let divNode = document.createElement("div");
  divNode.id = id;
  divNode.className = 'customerIcon';
  var iconNode = document.createElement("div");
  iconNode.className = 'pointIcon ' + levelClassName;
  var botNode = document.createElement("div");
  botNode.className = 'botIcon';
  iconNode.appendChild(botNode);
  divNode.appendChild(iconNode);

  let _marker = new minemap.Marker({
    element: divNode,
    draggable: false,
    offset: [0, 0],
  })
    .setLngLat([obj.gisX, obj.gisY]) // [lng, lat]
    .addTo(map);
  markers.push(_marker);

  let _popup = new minemap.Popup({
    closeOnClick: true,
    closeButton: true,
    // anchor: 'top', // [top, bottom, left, right, top-left, top-right, bottom-left, bottom-right]
    offset: [10, 55],
  }).setHTML(`<div class="popInfo">
                <p class="popInfoItem">报警时间：${obj.djsj}</p>
                <p class="popInfoItem">${obj.ajlbMc}</p>
                <p class="popInfoItem">
                  <span>报警人员：${obj.djrxm}</span>
                  <span>受理警员：${obj.slrxm}</span>
                </p>
                <p class="popInfoItem">简要案件：${obj.jyaq}</p>
                <p class="popInfoItem">盯警单位：${obj.djdwmc}</p>
                <p class="popInfoItem">案件等级：${levelText}</p>
              </div>`)
  _marker.setPopup(_popup);
}

const showMapGisInfo = throttle(() => {
  //  坐标映射
  // var center = map[0].getCenter();
  const { lng: minGisX, lat: maxGisY } = map.unproject([0, 0]);
  const { lng: maxGisX, lat: minGisY } = map.unproject([1920, 1080]);
  const gisInfo = {
    minGisX: formatterLngLat(minGisX),
    minGisY: formatterLngLat(minGisY),
    maxGisX: formatterLngLat(maxGisX),
    maxGisY: formatterLngLat(maxGisY),
    type
  };

  handleResult(gisInfo);
}, 1000);

const handleResult = async (gisInfo: any) => {
  const resultList = await fetchData(gisInfo);
  if (resultList && resultList.length > 0) {
    // map.setCenter([resultList[0].gisX, resultList[0].gisY]);
    resultList.forEach((s: any) => {
      //  在地图上添加标记点
      addMarker(s.id, s)
    })
  }
}

const bindMapGisFn = (e: any) => {
  clearMarker();
  showMapGisInfo(e.target)
}

const clearMarker = () => {
  if (map && markers.length !== 0) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].remove();
    }
    markers = [];
  }
}


export default async (minemapObj: any, mapObj: any, mapType?: any) => {
  minemapObj && (minemap = minemapObj);
  mapObj && (map = mapObj);
  type = mapType || 1;
  clearMarker();
 // 绑定事件
  map.on('moveend', bindMapGisFn);
  map.on('zoomend', bindMapGisFn);
  // gisInfo
  showMapGisInfo(map);
}