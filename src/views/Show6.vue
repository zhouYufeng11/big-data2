<template>
  <div class="home">
    <!-- 大标题 -->
    <TopTitle />
    <!-- 返回首页 -->
    <BackIndex />
    <div class="main">
      <Map />
      <TopNav />
      <div class="main-left animate__animated animate__fadeInLeft">
        <!-- 感知设备 -->
        <Pannel2 title="感知设备" subTitle="感知列表" :height="289" :pannelType="TINY" :pageType="SHOW6_3">
          <DeviceNum :dataObj="deviceNumObj" />
        </Pannel2>
        <!-- 抓拍数量 -->
        <Pannel2 title="抓拍数量" subTitle="感知列表" :height="289" :pannelType="TINY" :pageType="SHOW6_3">
          <LineSnap :nameList="lineCategoryName" :xAxisData="lineCategoryXAxisData" :yAxisData="lineCategoryYAxisData" />
        </Pannel2>
        <!-- 抓拍排行 -->
        <Pannel title="抓拍排行" subTitle="感知列表" :height="289" :pannelType="TINY" :pageType="SHOW6_3">
          <TableSlider :height="239" :columns="rankColumns" :dataList="rankList" />
        </Pannel>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 比对库统计 -->
        <Pannel2 title="比对库统计" subTitle="感知列表" :height="289" :pannelType="TINY" :pageType="SHOW6_3">
          <!-- <CompareStat :dataObj="compareStatObj" /> -->
          <PiePerception :dataList="table4" />
        </Pannel2> 
        <!-- 布控任务 -->
        <Pannel2 title="布控任务" subTitle="感知列表" :height="289" :pannelType="TINY" :pageType="SHOW6_3">
          <ComTask :dataObj="table5" />
        </Pannel2>
        <!-- 数据治理 -->
        <Pannel2 title="数据治理" subTitle="感知列表" :height="289" :pannelType="TINY" :pageType="SHOW6_3">
          <ComRecord :dataObj="table6" />
        </Pannel2>
      </div>
    </div>
    <FramPage :showPage="showPage" :pageTitle="pageTitle">
      <Show6-1 v-if="pageType === SHOW6_1" />
      <Show6-2 v-if="pageType === SHOW6_2" />
      <Show6-3 v-if="pageType === SHOW6_3" />
      <Show6-4 v-if="pageType === SHOW6_4" />
      <Show6-5 v-if="pageType === SHOW6_5" />
      <Show6-6 v-if="pageType === SHOW6_6" />
    </FramPage>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import Map from '@/components/Map/index.vue';
import TopTitle from '@/components/TopTitle/index.vue';
import TopNav from '@/components/TopNav/index.vue';
import Pannel from '@/components/Pannel/index.vue';
import FramPage from '@/components/FramPage/index.vue';
import LineSnap from '@/components/Echarts/LineSnap/index.vue';
import DeviceNum from '@/components/DeviceNum/index.vue';
import PiePerception from '@/components/Echarts/PiePerception/index.vue';
import { gzsb, zpkLisst, gzList, bdkList, bkrw, sjzl } from '@/api/index';
import { Message } from '@arco-design/web-vue';
import { mainStore, watchStore } from "@/store/index";
import { PageTypeEnum, PannelTypeEnum } from '@/config/TypeEnum';

import { zpkDicList, useZpkDicList } from './hooks/dic';
import { formatDate } from '@/utils/index';

const { SHOW6_1, SHOW6_2, SHOW6_3, SHOW6_4, SHOW6_5, SHOW6_6 } = PageTypeEnum;
const { TINY } = PannelTypeEnum;

const showPage = ref(false);
const pageTitle = ref('');
const pageType = ref('');

// 状态
const store = mainStore();

// 监听 actions 方法
watchStore("setPage", (store: any) => { showPage.value = store.$state.showPage });
watchStore("setPageTitle", (store: any) => { pageTitle.value = store.$state.pageTitle });
watchStore("setPageType", (store: any) => { pageType.value = store.$state.pageType });

// 感知设备
const deviceNumObj = ref({});
const fetchData = (type: number = 1) => {
  gzsb({ zpsj: formatDate(1) }).then((res: any) => {
    if (res.code === 200) {
      // deviceNumObj.value = res.data;
      deviceNumObj.value = res.data;
      
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 抓拍数量
const lineCategoryName: any = ref([]);
const lineCategoryXAxisData: any = ref([]);
const lineCategoryYAxisData: any = ref([]);

const fetchData2 = async () => {
  zpkDicList.value.forEach((s: any, i: any) => {
    if(i !== 0) {
      lineCategoryName.value.push(s.dictLabel);
    } 
  });


  //  获取当前数据
  zpkLisst({}).then((res: any) => {
    if (res.code === 200) {
      const arr: any = [];
      Object.values(res.data).forEach((s: any, i: any) => {
        s.forEach((item: any) => {
          if(i === 0) {
            lineCategoryXAxisData.value.push(item.zpKey);
          }
          if(!arr[i]) {
            arr[i] = [Number(item.zpValue)];
          }
          arr[i].push(Number(item.zpValue));
        })
      })

      lineCategoryYAxisData.value = arr;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

// 抓拍排行
const rankColumns: any = ref([
  { title: '设备名称', dataIndex: 'sensorName', align: 'left', },
  { title: '设备类型', dataIndex: 'sensorCategoryName', width: 110, align: 'left' },
  { title: '所属组织', dataIndex: 'orgName', width: 100, align: 'right' },
]);
const rankList: any = ref([]);
const fetchData3 = () => {
  gzList({zpsj: formatDate(1), zpType: '1'}).then((res: any) => {
    if (res.code === 200) {
      // dutyList.value = res.rows;
      rankList.value = res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  比对库数据
const table4: any = ref({});
const fetchData4 = async () => {
  bdkList({bjsj: formatDate(1)}).then((res: any) => {
    if (res.code === 200) {
      table4.value = res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  布控任务
const table5: any = ref([]);
const fetchData5 = async () => {
  table5.value = [];
  bkrw({}).then((res: any) => {
    if (res.code === 200) {
      table5.value = JSON.parse(res.data.jsonValue);
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  数据治理
const table6: any = ref([]);
const fetchData6 = async () => {
  sjzl({}).then((res: any) => {
    if (res.code === 200) {
      table6.value = JSON.parse(res.data.jsonValue);

    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

let timer = setTimeout(() => {


  clearTimeout(timer);
}, 300);

onMounted( async () => {
  //  抓拍库字典项
  await useZpkDicList();
  // 感知设备
  fetchData();
  // 抓拍数量
  fetchData2();
  // 抓拍排行
  fetchData3();
  // 比对库统计
  fetchData4();
  // 布控任务
  fetchData5();
  // 数据治理
  fetchData6();
})

</script> 
<style lang="scss"></style>