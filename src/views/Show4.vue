<template>
  <div class="home">
    <!-- 大标题 -->
    <TopTitle />
    <!-- 返回首页 -->
    <BackIndex />
    <div class="main">
      <Map />
      <TopNav />
      <BtnCommon :showType="curType" @btnClick="btnClick" />
      <div class="main-left animate__animated animate__fadeInLeft">
        <!-- 重点人员 -->
        <Pannel title="重点人员" :height="289" :pannelType="TINY" :pageType="SHOW4_1">
          <PieRiskControl :dataList="table1" hasType />
        </Pannel>
        <!-- 人员预警 -->
        <Pannel title="人员预警" :height="580" :pannelType="MIDDLE" :pageType="SHOW4_3">
            <TableRiskControl v-show="isTable3Data" :height="510" :columns="ryyjColumns" :dataList="table3" />
            <no-data v-show="!isTable3Data"/>
        </Pannel>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 动态预警 -->
        <!-- <Pannel title="动态预警" :height="439" :pannelType="LARGE" :pageType="SHOW4_4">
          <TableRiskControl :height="380" :head="head1" :list="table2" />
        </Pannel> -->
        <!-- 人员分布 -->
        <Pannel title="人员分布" :height="289" :pannelType="TINY" :pageType="SHOW4_2">
          <BarRiskControl :btnNameList="btnPerson" :dataList="table2" hasType @change="setType" />
        </Pannel>
        <!-- 涉稳事件 -->
        <Pannel title="涉稳事件" :height="580" :pannelType="MIDDLE" :pageType="SHOW4_5">
            <TableSlider v-show="isTable4Data" :height="510" :columns="swsjColumns" :dataList="table4" />
            <no-data v-show="!isTable4Data" />
        </Pannel>
      </div>
    </div>
    <FramPage :showPage="showPage" :pageTitle="pageTitle">
      <Show4-1 v-if="pageType === SHOW4_1" />
      <Show4-2 v-if="pageType === SHOW4_2" />
      <Show4-3 v-if="pageType === SHOW4_3" />
      <Show4-4 v-if="pageType === SHOW4_4" />
      <Show4-5 v-if="pageType === SHOW4_5" />
    </FramPage>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Map from '@/components/Map/index.vue';
import TopTitle from '@/components/TopTitle/index.vue';
import TopNav from '@/components/TopNav/index.vue';
import Pannel from '@/components/Pannel/index.vue';
import FramPage from '@/components/FramPage/index.vue';
import BtnCommon from '@/components/BtnCommon/index.vue';
import { Message } from '@arco-design/web-vue';
import { mainStore, watchStore } from "@/store/index";
import { PageTypeEnum, PannelTypeEnum } from '@/config/TypeEnum';

//  组件
import PieRiskControl from '@/components/Echarts/PieRiskControl/index.vue';
import BarRiskControl from '@/components/Echarts/BarRiskControl/index.vue';
import TableRiskControl from '@/components/Table/TableRiskControl/index.vue';

//  接口
import { dic_interface2 } from '@/api/dic';
import { fkData } from '@/api/riskControl';
import { copyFileSync } from 'fs';


const { SHOW4_1, SHOW4_2, SHOW4_3, SHOW4_4, SHOW4_5 } = PageTypeEnum;
const { MIDDLE, LARGE, TINY } = PannelTypeEnum;

const showPage = ref(false);
const pageTitle = ref('');
const pageType = ref('');

// 状态
const store = mainStore();

//  切换日周月
const curType = computed(() => {
  return store.fkDate;
})

const btnClick = (data: any) => {
  store.setfkDate(data);
  // 人员预警
  fetchData3();
  //  涉稳事件
  fetchData4();
}

// 监听 actions 方法
watchStore("setPage", (store: any) => { showPage.value = store.$state.showPage });
watchStore("setPageTitle", (store: any) => { pageTitle.value = store.$state.pageTitle });
watchStore("setPageType", (store: any) => { pageType.value = store.$state.pageType });

const btnPerson: any = ref([])


const setType = async (key: number) => {
  const { type } = btnPerson.value[key];
  fetchData2(type);
}


// 重点人员
const table1: any = ref({});
function fetchData1() {
  fkData(['zdry']).then((res: any) => {
    if (res.code === 200) {
      table1.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

//  获取人员分布
const table2: any = ref({});
function fetchData2(type: any = 'jwpt_sw') {
  table2.value = {};
  fkData(['ryfb', type]).then((res: any) => {
    if (res.code === 200) {
      // console.log(res.data)
      table2.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

// 人员预警
const table3: any = ref([]);
const isTable3Data = ref(false);
function fetchData3() {
  // table3.value = [];
  fkData(['ryyj'], { pageNum: 1, pageSize: 20, type: curType.value }).then((res: any) => {
    // table3.value = [];
    if (res.code === 200) {
      //  判断是否有数据, 说明此时没有数据
      if (res.rows.length === 0) {
        isTable3Data.value = false;
      } else {
        isTable3Data.value = true;
      }

      table3.value = res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

//  涉稳事件
const table4: any = ref([]);
const isTable4Data: any = ref(false);
const fetchData4 = async () => {
  // table4.value = [];
  fkData(['swsj'], { pageNum: 1, pageSize: 20, type: curType.value }).then((res: any) => {
    if (res.code === 200) {

      // 判断是否有数据, 说明此时没有数据
      if (res.rows.length === 0) {
        isTable4Data.value = false;
        return;
      } else {
        isTable4Data.value = true;
      }

      table4.value = res.rows;


    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

//  涉稳字典项
const fetchDicData = () => {
    //  获取 切换按钮的信息
    dic_interface2('getWw').then(async (res: any) => {
    if (res.code === 200) {
      res.data.forEach((item: any) => {
        const { dictType, dictName } = item;
        if(dictName !== '涉警') {
          btnPerson.value.push({ type: dictType, name: dictName });
        }
      })
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}




// 动态预警
const head1: any = ref([
  { text: '详情', width: 350, },
  { text: '状态', width: 80, },
]);

//  人员预警 th 配置
const ryyjColumns: any = ref([
  { title: '地点', dataIndex: 'hdfscs', align: 'left', },
  { title: '姓名', dataIndex: 'xm', align: 'right', width: 80, hasClassname: true, },
]);

// 涉稳事件 th 配置
const swsjColumns: any = ref([
  { title: '标题', dataIndex: 'bt', align: 'left', },
  { title: '登记人', dataIndex: 'djrDicttext', align: 'right', width: 80, hasClassname: true, },
]);






onMounted(() => {
  //  获取字典项
  fetchDicData();
  // 重点人员
  fetchData1();
  //  获取人员分布
  fetchData2();
  //  人员预警
  fetchData3();
  //  涉稳事件
  fetchData4();
})

</script> 
<style lang="scss"></style>