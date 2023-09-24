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
        <!-- 案件分类 -->
        <Pannel title="案件分类" :height="309" :pannelType="SMALL" :pageType="SHOW2_1">
          <!-- <PieCategorySmall :dataList="table1" hasType @change="setType" /> -->
          <PieCategorySmall1 :dataList="table1" />
        </Pannel>
        <!-- 实时案件 -->
        <Pannel title="实时案件" :height="579" :pannelType="MIDDLE" :pageType="SHOW2_2">
          <!-- <TableSlider :isShowLevel="false" :height="509" :columns="realTimeColumns" :dataList="realTimeList" /> -->
            <CaseSlider v-show="isTable2Data" :dataList="table2" @setPCS="setShowPage2" />
            <no-data v-show="!isTable2Data" />
        </Pannel>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 辖区分布 -->
        <Pannel title="辖区分布" :height="289" :pannelType="TINY" :pageType="SHOW2_3">
          <!-- <BarDepartmentDouble :dataList="table3" @change="setDepartment" /> -->
          <BarDepartmentDouble :type="curType" :dataList="table3" />
        </Pannel>
        <!-- 指令通报 -->
        <Pannel title="指令通报" :height="289" :pannelType="TINY" :pageType="SHOW2_4">
          <Circular :dataList="table4" />
        </Pannel>
        <!-- 盯案列表 -->
        <Pannel title="盯案列表" :height="289" :pannelType="TINY" :pageType="SHOW2_5">
          <TableSlider :height="239" :columns="importantColumns" :dataList="importantList" />
        </Pannel>
      </div>
    </div>
    <FramPage :showPage="showPage" :pageTitle="pageTitle">
      <Show2-1 v-if="pageType === SHOW2_1" />
      <Show2-2 v-if="pageType === SHOW2_2" />
      <Show2-3 v-if="pageType === SHOW2_3" />
      <Show2-4 v-if="pageType === SHOW2_4" />
      <Show2-5 v-if="pageType === SHOW2_5" />
    </FramPage>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import Map from '@/components/Map/index.vue';
import TopTitle from '@/components/TopTitle/index.vue';
import TopNav from '@/components/TopNav/index.vue';
import Pannel from '@/components/Pannel/index.vue';
import PieCategorySmall1 from '@/components/Echarts/PieCategorySmall1/index.vue';
import FramPage from '@/components/FramPage/index.vue';
import BtnCommon from '@/components/BtnCommon/index.vue';
import TableSlider from '@/components/Table/TableSlider/index.vue';
import CaseSlider from '@/components/Slider/CaseSlider/index.vue';
import BarDepartmentDouble from '@/components/Echarts/BarDepartmentDouble/index.vue';
import Circular from '@/components/Circular/index.vue';
import { Message } from '@arco-design/web-vue';
import { mainStore, watchStore } from "@/store/index";
import { PageTypeEnum, PannelTypeEnum } from '@/config/TypeEnum';
import { ajxxStatisticsByDep, ajxxStatistics, gakList, tjt, ajxxStatisticsByAjlb } from '@/api/index';
import { dic_dj_level } from '@/api/dic';
import { computed } from 'vue';

const { SHOW2_1, SHOW2_2, SHOW2_3, SHOW2_4, SHOW2_5 } = PageTypeEnum;
const { SMALL, MIDDLE, TINY } = PannelTypeEnum;

// 状态
const store = mainStore();

const showPage = ref(false);
const pageTitle = ref('');
const pageType = ref('');

// 监听 actions 方法
watchStore("setPage", (store: any) => { showPage.value = store.$state.showPage });
watchStore("setPageTitle", (store: any) => { pageTitle.value = store.$state.pageTitle });
watchStore("setPageType", (store: any) => { pageType.value = store.$state.pageType });

const curType: any = computed(() => {
  return store.ajDate;
})
const btnClick = (type: number = 2) => {  //  用来切换 日周月
  store.setajDate(type);
  //  案件分类
  fetchData();
  //  实时案件
  fetchData2();
  //  辖区分布
  fetchData3();
}


//  根据派出所名称切换列表
const setShowPage2 = (payload: any) => {
  store.setPage(true);
  store.setPageType('SHOW2_2');
  store.setpageMsg(payload);
}


// 案件分类
const table1: any = ref([]);
// const setType = (type: number) => fetchData(type);
const fetchData = () => {
  ajxxStatisticsByAjlb({ type: curType.value }).then((res: any) => {
    if (res.code === 200) {
      table1.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  实时案件
const table2: any = ref([]);
const isTable2Data: any = ref(true);


const fetchData2 = async () => {
  table2.value = [];
  ajxxStatistics({ type: curType.value }).then((res: any) => {
    if (res.code === 200) {
      //  判断是否有数据, 说明此时没有数据
      if (res.data.length === 0) {
        isTable2Data.value = false;
        return;
      } else {
        isTable2Data.value = true;
      }
      // res.data.push(res.data[0]);
      res.data.forEach((s: any, i: number) => {
        if (i % 3 === 0) {
          table2.value.push([]);
        }
        // 派出所坐标
        s.address && s.address.jwd && (s.gisCenter = s.address.jwd.split(',').map(Number));
        table2.value[Math.trunc(i / 3)].push(s);
      });
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 辖区分布
const table3: any = ref([]);
const fetchData3 = () => {
  ajxxStatisticsByDep({ type: curType.value }).then((res: any) => {
    table3.value = [];
    if (res.code === 200) {
      table3.value = res.rows.map((s: any) => {
        s.groupKeyName = s.groupKeyName.slice(0, -3);
        return s;
      });
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  指令通信
const table4: any = ref([]);
const fetchData4 = () => {
  tjt({ type: curType.value }).then((res: any) => {
    if (res.code === 200) {
      table4.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}


// 盯案列表
const importantList: any = ref([]);
const levelList: any = ref([]);
const importantColumns: any = ref([
  { title: '类别', dataIndex: 'ajlbDicttext', align: 'left' },
  { title: '名称', dataIndex: 'ajmc', align: 'right' },
  // { title: '等级', dataIndex: 'ajztDicttext', align: 'right', width: 80, hasClassname: true },
  // { title: '盯案人', dataIndex: 'ajztDicttext', align: 'right', width: 80 },
  { title: '单位', dataIndex: 'sldwDicttext', align: 'right' },
  { title: '状态', dataIndex: 'ajztDicttext', align: 'right', width: 80 },
]);

let getLevelClassname = (level: any) => {
  return level === 1 ? 'redText' : level === 2 ? 'yellowText' : level === 3 ? 'blueText' : '#fff';
}

const fetchDicData = async () => {
  return await dic_dj_level({}).then((res: any) => {
    if (res.code === 200) {
      levelList.value = res.data;
      // 盯案列表
      fetchData5();
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

const fetchData5 = async () => {
  return await gakList().then((res: any) => {
    if (res.code === 200) {
      importantList.value = res.rows.map((s: any) => {
        s.classname = getLevelClassname(s.ajzt);
        return s;
      });
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(async () => {
  // 案件分类
  fetchData();
  // 实时案件
  fetchData2();
  // 辖区分布
  fetchData3();
  // 指令签收 - 统计图
  fetchData4();
  // 盯案列表
  fetchDicData();
})

</script> 
<style lang="scss"></style>