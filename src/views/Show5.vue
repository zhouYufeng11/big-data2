<template>
  <div class="home">
    <!-- 大标题 -->
    <TopTitle />
    <!-- 返回首页 -->
    <BackIndex />
    <div class="main">
      <Map :curType="curType" />
      <TopNav />
      <BtnCommon :showType="curType" @btnClick="btnClick" />
      <div class="main-left animate__animated animate__fadeInLeft">
        <!-- 舆情来源 -->
        <Pannel title="舆情来源" subTitle="舆情列表" :height="289" :pannelType="TINY" :pageType="SHOW5_1">
          <RadarPublicSentiment :dataList="table1" />
        </Pannel>
        <!-- 舆情趋势 -->
        <Pannel title="舆情趋势" subTitle="舆情列表" :height=289 :pannelType="TINY" :pageType="SHOW5_1">
          <!-- <LinePublicSentiment :xAxisData="xAxisData" :yAxisData="yAxisData" /> -->
          <BarDepartmentDouble :type="curType" :dataList="table2" />
        </Pannel>
        <!-- 处置情况 -->
        <Pannel title="处置情况" subTitle="舆情列表" :height="289" :pannelType="TINY" :pageType="SHOW5_1">
          <Circular2 :dataObj="table4" />
        </Pannel>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 辖区分布 -->
        <Pannel title="辖区分布" subTitle="舆情列表" :height="289" :pannelType="TINY" :pageType="SHOW5_1">
          <BarDepartmentAll :dataList="table3" />
        </Pannel>
        <!-- 舆情列表 -->
        <Pannel title="舆情列表" subTitle="舆情列表" :height="580" :pannelType="MIDDLE" :pageType="SHOW5_1">
            <TableSlider v-show="isTable5Data" :height="510" :columns="columns5" :dataList="table5" />
            <no-data v-show="!isTable5Data" />
        </Pannel>
      </div>
    </div>
    <FramPage :showPage="showPage" :pageTitle="pageTitle">
      <Show5-1 v-if="pageType === SHOW5_1" />
    </FramPage>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount, computed } from 'vue';
import Map from '@/components/Map/index.vue';
import TopTitle from '@/components/TopTitle/index.vue';
import TopNav from '@/components/TopNav/index.vue';
import Pannel from '@/components/Pannel/index.vue';
import FramPage from '@/components/FramPage/index.vue';
import RadarPublicSentiment from '@/components/Echarts/RadarPublicSentiment/index.vue';
import BarDepartmentDouble from '@/components/Echarts/BarDepartmentDouble/index.vue';
import LinePublicSentiment from '@/components/Echarts/LinePublicSentiment/index.vue';
import BtnCommon from '@/components/BtnCommon/index.vue';
import { Message } from '@arco-design/web-vue';
import { mainStore, watchStore } from "@/store/index";
import { PageTypeEnum, PannelTypeEnum } from '@/config/TypeEnum';
import { yqData } from '@/api/publicSentiment';
import { czqk, xqfb } from '@/api/index';

const { SHOW5_1, SHOW5_2, SHOW5_3 } = PageTypeEnum;
const { SMALL, MIDDLE, LARGE, TINY } = PannelTypeEnum;

const showPage = ref(false);
const pageTitle = ref('');
const pageType = ref('');

// 状态
const store = mainStore();

//  切换日周月
const curType = computed(() => {
  return store.yqDate;
})

const btnClick = (data: any) => {
  store.setyqDate(data);
  //  舆情来源
  fetchData1();
  //  舆情趋势
  fetchData2();
  // 辖区分布 - 本月
  fetchData3();
  // 处置情况
  fetchData4();
  // 舆情列表
  fetchData5();
}

// 监听 actions 方法
watchStore("setPage", (store: any) => { showPage.value = store.$state.showPage });
watchStore("setPageTitle", (store: any) => { pageTitle.value = store.$state.pageTitle });
watchStore("setPageType", (store: any) => { pageType.value = store.$state.pageType });

// const xAxisData: any = ref([]);
// const yAxisData: any = ref([]);

//  舆情来源
const table1: any = ref([]);

function fetchData1() {
  table1.value = [];
  yqData(['yqly'], { type: curType.value }).then(async (res: any) => {
    if (res.code === 200) {
      table1.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

//  舆情趋势
const table2: any = ref([]);
async function fetchData2() {
  table2.value = [];
  yqData(['yqqs'], { type:  curType.value }).then(async (res: any) => {
    if (res.code === 200) {
      table2.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

// 辖区分布 - 本月
const table3: any = ref([]);
const fetchData3 = () => {
  table3.value = [];
  xqfb({ type: curType.value }).then((res: any) => {
    if (res.code === 200) {
      table3.value = res.data.map((s: any) => {
        return { name: s.yqlyName, value: s.number };
      });
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 处置情况
const table4: any = ref([]);
const fetchData4 = () => {
  czqk({ type: curType.value }).then((res: any) => {
    if (res.code === 200) {
      table4.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}


// 舆情列表
const table5: any = ref([]);
const isTable5Data: any = ref(false);
const columns5: any = ref([
  { title: '内容', dataIndex: 'nr', align: 'left', ellipsis: true, },
  { title: '来源', dataIndex: 'yqlyName', align: 'right', width: 70, },
]);


const fetchData5 = async () => {
  // table5.value = [];
  return await yqData(['list'], {
    pageNum: 1,
    pageSize: 100,
    type: curType.value
  }).then((res: any) => {
    if (res.code === 200) {
      //  判断是否有数据, 说明此时没有数据
      if (res.rows.length === 0) {
        isTable5Data.value = false;
        return;
      } else {
        isTable5Data.value = true;
      }

      table5.value = res.rows.map((s: any) => {
        s.nr = s.bt || s.fbnr;
        return s;
      });
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(() => {
  //  舆情来源
  fetchData1();
  //  舆情趋势
  fetchData2();
  // 辖区分布
  fetchData3();
  // 处置情况
  fetchData4();
  // 舆情列表
  fetchData5();
})

</script> 
<style lang="scss"></style>