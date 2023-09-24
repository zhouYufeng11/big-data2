import { InjjxxGisListdexGis } from '@/api/index'
import { throttle } from '@/utils/index';
import { formatterLngLat } from '@/utils/index';
import { Message } from '@arco-design/web-vue';
import { mainStore, watchStore } from "@/store/index";

let markers = [];
let map: any = null;
let minemap: any = null;
let type: any = 1;

let timer: any = setTimeout(() => {
  // 状态
  let store = mainStore();
  // 监听 actions 方法 - 设置地图中心点
  watchStore("setMapCenter1", (store: any) => {
    let mapCenter = store.$state.mapCenter;
    if (mapCenter && mapCenter.length === 2) {
      map.setCenter(store.$state.mapCenter);
    }
  });
  clearTimeout(timer);
}, 1000);

const fetchData = async ({ minGisX, minGisY, maxGisX, maxGisY, type }) => {
  return await InjjxxGisListdexGis({
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

//  map-icon-1
const addMarker = (id, obj) => {
  let curClassName = ''

  const { djdj, cjbsMc } = obj;

  if (djdj === 1) {
    if (cjbsMc === '已处警') {
      curClassName = 'jqIcon map-icon-1-1';
    } else {
      curClassName = 'jqIcon map-icon-1-2';
    }
  } else if (djdj === 2) {
    if (cjbsMc === '已处警') {
      curClassName = 'jqIcon map-icon-2-1';
    } else {
      curClassName = 'jqIcon map-icon-2-2';
    }
  } else if (djdj === 3) {
    if (cjbsMc === '已处警') {
      curClassName = 'jqIcon map-icon-3-1';
    } else {
      curClassName = 'jqIcon map-icon-3-2';
    }
  } else {
    if (cjbsMc === '已处警') {
      curClassName = 'jqIcon map-icon-3-1';
    } else {
      curClassName = 'jqIcon map-icon-3-2';
    }
  }

  // 自定义marker
  let divNode = document.createElement("div");
  divNode.id = id;
  divNode.className = curClassName;

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
    offset: [27, 58],
  }).setHTML(`<div class="popInfo">
                <p class="popInfoItem">报警时间：${obj.djsj}</p>
                <p class="popInfoItem">
                  <span>报警人员：${obj.bjr}</span>
                  <span>接警人员：${obj.jjrxm}</span>
                </p>
                <p class="popInfoItem">警情概述：${obj.bjnr}</p>
                <p class="popInfoItem">处警单位：${obj.ejjsdwmc}</p>
                <p class="popInfoItem">处警状态：${obj.cjbsMc}</p>
              </div>`)
  _marker.setPopup(_popup);
}

const showMapGisInfo = throttle(() => {
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