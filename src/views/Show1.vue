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
        <!-- 警情分类 -->
        <Pannel title="警情分类" :height="309" :pannelType="SMALL" :pageType="SHOW1_1">
          <PieCategory :dataList="table1" />
        </Pannel>
        <!-- 实时警情 -->
        <Pannel title="实时警情" :height="579" :pannelType="MIDDLE" :pageType="SHOW1_2">
          <!-- <TableSlider :isShowLevel="false" :height="509" :columns="head1" :dataList="table1" /> -->
            <realTimeSlider v-show="isTable2Data" :dataList="table2" @setKind="setShowPage2" @setPCS="setShowPage2" />
            <no-data v-show="!isTable2Data" />
        </Pannel>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 辖区分布 -->
        <Pannel title="辖区分布" :height="309" :pannelType="SMALL" :pageType="SHOW1_3">
          <!-- <BarDepartment :dataList="departmentList" @change="setDepartment" /> -->
          <BarDepartmentDouble :type="curType" :dataList="table3" />
        </Pannel>
        <!-- 盯警情况 -->
        <Pannel title="盯警情况" :height="579" :pannelType="MIDDLE" :pageType="SHOW1_4">
          <!-- <TableSlider :height="509" :columns="head2" :dataList="table2" /> -->
            <FixSlider v-show="isTable4Data" :dataList="table4" @setLevel="setShowPage4" @setPCS="setShowPage4" />
            <no-data v-show="!isTable4Data" />
        </Pannel>
      </div>
    </div>
    <FramPage :showPage="showPage" :pageTitle="pageTitle">
      <Show1-1 v-if="pageType === SHOW1_1" />
      <Show1-2 v-if="pageType === SHOW1_2" />
      <Show1-3 v-if="pageType === SHOW1_3" />
      <Show1-4 v-if="pageType === SHOW1_4" />
    </FramPage>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, onBeforeUnmount } from 'vue';
import Map from '@/components/Map/index.vue';
import TopTitle from '@/components/TopTitle/index.vue';
import TopNav from '@/components/TopNav/index.vue';
import Pannel from '@/components/Pannel/index.vue';
import PieCategory from '@/components/Echarts/PieCategory/index.vue';
import BarDepartmentDouble from '@/components/Echarts/BarDepartmentDouble/index.vue';
import realTimeSlider from '@/components/Slider/RealTimeSlider/index.vue';
import FramPage from '@/components/FramPage/index.vue';
import FixSlider from '@/components/Slider/FixSlider/index.vue';
import BtnCommon from '@/components/BtnCommon/index.vue';
import NoData from '@/components/Common/NoData.vue';
import { jjxxStatisticsByType, jjxxStatisticsByDep, jjxxStatistics, jjxxStatisticsByDjdj } from '@/api/index';
import { Message } from '@arco-design/web-vue';
import { mainStore, watchStore } from "@/store/index";
import { PageTypeEnum, PannelTypeEnum } from '@/config/TypeEnum';
import { dic_interface } from '@/api/dic';
import { computed } from 'vue';


const { SHOW1_1, SHOW1_2, SHOW1_3, SHOW1_4 } = PageTypeEnum;
const { SMALL, MIDDLE } = PannelTypeEnum;

// 状态
const store = mainStore();

const showPage = ref(false);
const pageTitle = ref('');
const pageType = ref('');


//  切换日周月
const curType = computed(() => {
  return store.jqDate;
})



// 监听 actions 方法
watchStore("setPage", (store: any) => { showPage.value = store.$state.showPage });
watchStore("setPageTitle", (store: any) => { pageTitle.value = store.$state.pageTitle });
watchStore("setPageType", (store: any) => { pageType.value = store.$state.pageType });

const btnClick = (data: any) => {
  store.setjqDate(data);
  // 警情分类 - 饼图
  fetchData1();
  // 实时警情
  fetchData2();
  //  辖区分布
  fetchData3();
  // 盯警列表
  fetchData4();
}

//  获取接警大分类 - 字典项
const jjdflNameList = ref([]);
const jjdflListData = () => {
  return new Promise((resolve, reject) => {
    dic_interface({ dictType: 'ga_jj_ajdfl' }).then((res: any) => {
      if (res.code === 200) {
        jjdflNameList.value = res.rows;
        resolve(res.rows);
      } else {
        reject(res.msg)
        Message.error(res.msg)
      }
    }).catch(err => {
      reject(err)
      console.log(err)
    })
  })
}


//  跳转二级页面
const setShowPage2 = (payload: any) => {
  store.setPage(true);
  store.setPageType('SHOW1_2');
  store.setpageMsg(payload);
}

const setShowPage4 = (payload: any) => {
  store.setPage(true);
  store.setPageType('SHOW1_4');
  store.setpageMsg(payload);
}

// 警情分类
const table1 = ref([]);
const fetchData1 = () => {
  table1.value = [];
  jjxxStatisticsByType({ type: curType.value }).then((res: any) => {
    if (res.code === 200) {
      table1.value = res.rows[0] ? res.rows : [];
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  实时警情
const table2: any = ref([]);
const isTable2Data = ref(true);

const fetchData2 = () => {
  table2.value = [];
  jjxxStatistics({ type: curType.value }).then((res: any) => {
    if (res.code === 200) {
      //  判断是否有数据, 说明此时没有数据
      if (res.data.length === 0) {
        isTable2Data.value = false;
        return;
      } else {
        isTable2Data.value = true;
      }

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
const table3 = ref([]);
// const setDepartment = (type: number) => fetchData3(type);
const fetchData3 = async () => {
  jjxxStatisticsByDep({ type: curType.value }).then((res: any) => {
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

// 盯警列表
const table4: any = ref([]);
//  判断是否有数据的
const isTable4Data = ref(true);
const fetchData4 = () => {
  table4.value = [];
  jjxxStatisticsByDjdj({ type: curType.value }).then((res: any) => {
    if (res.code === 200) {
      //  判断是否有数据, 说明此时没有数据
      if (Object.values(res.data).length === 0) {
        isTable4Data.value = false;
        return;
      } else {
        isTable4Data.value = true;
      }

      Object.values(res.data).forEach((s: any, i: number) => {
        if (i % 3 === 0) {
          table4.value.push([]);
        }
        table4.value[Math.trunc(i / 3)].push(s);
      });
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(async () => {
  //  获取接警大分类 字典项
  await jjdflListData();
  // 警情分类
  fetchData1();
  // 实时警情
  fetchData2();
  // 辖区分布
  fetchData3();
  // 盯警列表
  fetchData4();
})

</script> 
<style lang="scss"></style>