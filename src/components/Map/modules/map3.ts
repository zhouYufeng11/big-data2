import { ref } from 'vue'
import { deviceGisList } from '@/api/index'
import { throttle } from '@/utils/index';
import { formatterLngLat } from '@/utils/index';
import { Message } from '@arco-design/web-vue';

let markers: any = [];
let map: any = null;
let minemap: any = null;
let filterList: any = [];

const fetchData = async ({ minGisX, minGisY, maxGisX, maxGisY }) => {
  return await deviceGisList({
    minGisX, minGisY, maxGisX, maxGisY
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
  // 自定义marker
  let divNode = document.createElement("div");
  divNode.id = id;
  if (obj.zdlx === '警车') {
    divNode.className = 'caseIcon map-icon-1';
  } else if (obj.zdlx === '车台') {
    divNode.className = 'caseIcon map-icon-2';
  } else if (obj.zdlx === '手台') {
    divNode.className = 'caseIcon map-icon-3';
    // } else if (obj.zdlx === '执法记录仪') {
    //   divNode.className = 'caseIcon map-icon-4';
  } else {
    divNode.className = 'caseIcon map-icon-5';
  }

  let _marker = new minemap.Marker({
    element: divNode,
    draggable: false,
    offset: [0, 0],
  })
    .setLngLat([obj.gisX, obj.gisY]) // [lng, lat]
    .addTo(map);
  markers.push(_marker);

  let popDom = `<div class="popInfo">`;
  let popDom1 = `<p class="popInfoItem">单位名称：${obj.dwmc}</p>`;
  let popDom2 = `<p class="popInfoItem">设备编号：${obj.zdhm}</p>`;
  let popDom3 = `<p class="popInfoItem">设备类型：${obj.zdlx}</p>`;
  let popDom4 = `<p class="popInfoItem">设备信息：${obj.zdmc}</p>`;
  let popDomEnd = `</div>`;

  popDom +=
    (obj.dwmc ? popDom1 : '') +
    (obj.zdhm ? popDom2 : '') +
    (obj.zdlx ? popDom3 : '') +
    (obj.zdmc ? popDom4 : '') +
    popDomEnd;

  let _popup = new minemap.Popup({
    closeOnClick: true,
    closeButton: true,
    // anchor: 'top', // [top, bottom, left, right, top-left, top-right, bottom-left, bottom-right]
    offset: [13, 32],
  }).setHTML(popDom)
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
  };
  handleResult(gisInfo);
}, 200);

const handleResult = async (gisInfo) => {
  const resultList = await fetchData(gisInfo);
  if (resultList && resultList.length > 0) {
    // map.setCenter([resultList[0].gisX, resultList[0].gisY]);
    resultList.forEach((s: any) => {
      filterList.includes(s.zdlx) && addMarker(s.id, s);
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

export default async (minemapObj: any, mapObj: any, typeList?: any) => {
  minemapObj && (minemap = minemapObj);
  mapObj && (map = mapObj);
  clearMarker();
  filterList = typeList;
  // 绑定事件
  map.on('moveend', bindMapGisFn);
  map.on('zoomend', bindMapGisFn);
  // gisInfo
  showMapGisInfo(map);
}