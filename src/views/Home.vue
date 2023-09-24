<template>
  <div class="home">
    <!-- 大标题 -->
    <TopTitle /> 
    <RadioBar @changeMap="changeMap"/>
    <BtnCommon top="150px" :showType="dateType" @btnClick="btnClick" />
    <div class="main">
      <MapHome :dataList="showMapDataList" :chooseIndex="chooseIndex"/>
      <NavBar />
      <div class="main-left animate__animated animate__fadeInLeft">
        <!-- 值班信息 -->
        <HomePannel1 title="值班信息" :pageType="SHOW3_1">
          <div class="show-date">( {{ nowDay.slice(-4, -2) }} / {{ nowDay.slice(-2) }} )</div>
          <Index1 :height="100" :dataList="dutyList" />
        </HomePannel1>
        <!-- 警情分类 -->
        <HomePannel  title="警情分类" path="show1">
          <HomeCategory :height="200" :dataList="categoryList" />
        </HomePannel>
        <!-- 案件分类 -->
        <HomePannel title="案件分类" path="show2">
          <PieCategorySmall4 :width="560" :height="200" :dataList="pieCategoryList" />
        </HomePannel>
        <!-- 每日研判 -->
        <HomePannel :showDetail="true" title="每日研判" :pageType="SHOW0_1">
          <!-- <HomePannel title="每日研判"> -->
          <!-- <Index4 :height="180" :columns="columns5" :dataList="table5" /> -->
          <TableFileSlider v-show="isTable4Data" :height="159" :columns="columns4" :dataList="table4" @showFile="showFile" />
          <no-data v-show="!isTable4Data" :height="159" />
        </HomePannel>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 重点人员 -->
        <HomePannel :height="300" :type="2" title="重点人员" path="show4">
          <Btn 
              :showType="showType5"
              @btnClick="setSjzlType"
              :dataList="[ '人员预警', '涉稳事件' ]"
          />
            <TableRiskControl v-show="isTable5Data" :height="270" :columns="columns5" :dataList="table5" />
            <no-data v-show="!isTable5Data" :height="260" />
        </HomePannel>
        <!-- 舆情导控 -->
        <HomePannel :type="2" title="舆情导控" path="show5">
          <TableRiskControl v-show="isTable6Data"  :height="270" :columns="columns6" :dataList="table6" />
            <no-data v-show="!isTable6Data" :height="260" />
        </HomePannel>
        <!-- 感知数据 -->
        <HomePannel :type="2" title="感知数据" path="show6">
          <ComRecord2 :dataObj="table7" />
        </HomePannel>
      </div>
    </div>
    <FramPage :showPage="showPage" :pageTitle="pageTitle">
      <Show0-1 v-if="pageType === SHOW0_1" />
      <Show3-1 v-if="pageType === SHOW3_1" />
      <Show3-5 v-if="pageType === SHOW3_5" @showFile="showFile" />
    </FramPage>
    <FramFilePage :showPage="showFilePage" :pageTitle="pageFileTitle">
      <File-Word v-if="fileType === WORD" :fileUrl="fileUrl" />
      <File-Pdf v-if="fileType === PDF" :fileUrl="fileUrl" />
      <File-Excel v-if="fileType === EXCEL" :fileUrl="fileUrl" />
    </FramFilePage>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Message, Radio } from '@arco-design/web-vue';
import { fjzb, ajxxStatisticsByAjlb, sjzl, gakList, jjxxStatisticsByType, mapStatisticsByDep, zyqwInfoList, mryp } from '@/api/index';
import NavBar from '@/components/Bar/NavBar/index.vue';
import RadioBar from '@/components/Bar/RadioBar/index.vue';
import Btn from '@/components/Btn/common.vue';
import HomePannel from '@/components/HomePannel/index.vue';
import ComRecord2 from '@/components/ComRecord2/index.vue';
import Index1 from '@/components/IndexPage/Index1.vue';
import FileWord from '@/components/File/word.vue';
import FilePdf from '@/components/File/pdf.vue';
import FileExcel from '@/components/File/excel.vue';
import FramPage from '@/components/FramPage/index.vue';
import FramFilePage from '@/components/FramFilePage/index.vue';
// import { gzsb, zpkLisst, gzList, bdkList, bkrw, sjzl } from '@/api/index';
import { fkData } from '@/api/riskControl';
import { yqData } from '@/api/publicSentiment';
import { mainStore, watchStore } from "@/store/index";
import { formatDateLong } from '@/utils/index';
import { PageTypeEnum, PannelTypeEnum, FileTypeEnum } from '@/config/TypeEnum';

const { SHOW3_1, SHOW0_1, SHOW3_5 } = PageTypeEnum;
const { LARGE, TINY, EX_SMALL, EX_MIDDLE } = PannelTypeEnum;
const { WORD, PDF, EXCEL } = FileTypeEnum;

const showPage = ref(false);
const pageTitle = ref('');
const pageType = ref('');
const zdryStatus: any = ref('ryyj');


// 文件
const showFilePage = ref(false);
const pageFileTitle = ref('重要勤务');
const fileType = ref('');
const fileUrl = ref('');
const showFile = (type: string, url: string) => {
  fileType.value = type;
  fileUrl.value = url;
  showFilePage.value = true;
}



const store: any = mainStore();
const nowDay: string = formatDateLong();

// 监听 actions 方法
watchStore("setPage", (store: any) => { showPage.value = store.$state.showPage });
watchStore("setPageTitle", (store: any) => { pageTitle.value = store.$state.pageTitle });
watchStore("setPageType", (store: any) => { pageType.value = store.$state.pageType });
watchStore("setFilePage", (store: any) => { showFilePage.value = store.$state.showFilePage });
watchStore("setFilePageTitle", (store: any) => { pageFileTitle.value = store.$state.pageFileTitle });

const dutyList: any = ref([]);
const fetchData = async () => {
  return await fjzb({ zbrq: nowDay }).then((res: any) => {
    if (res.code === 200) {
      const data: any = res.data[0];
      if (!data) return
      const list: any = [];
      // 局主班领导
      data.dbldxm && list.push({ grade: '局主班领导', name: data.dbldxm + (data.dblddh && `(${data.dblddh})`) });
      data.fbldxm && list.push({ grade: '局副班领导', name: data.fbldxm + (data.fblddh && `(${data.fblddh})`) });
      data.zzbzxm && list.push({ grade: '指挥长A', name: data.zzbzxm + (data.zzbzdh && `(${data.zzbzdh})`) });
      data.zhzxm && list.push({ grade: '指挥长B', name: data.zhzxm + (data.zhzdh && `(${data.zhzdh})`) });
      data.zhglxm && list.push({ grade: '综合管理', name: data.zhglxm + (data.zhgldh && `(${data.zhgldh})`) });
      data.qbzxzbxm && list.push({ grade: '情报中心', name: data.qbzxzbxm + (data.qbzxzbdh && `(${data.qbzxzbdh})`) });
      data.ypzcxm && list.push({ grade: '研判支撑', name: data.ypzcxm + (data.ypzcdh && `(${data.ypzcdh})`) });
      data.yqczxm && list.push({ grade: '舆情处置', name: data.yqczxm + (data.yqczdh && `(${data.yqczdh})`) });
      data.jcgkxm && list.push({ grade: '基础管控', name: data.jcgkxm + (data.jcgkdh && `(${data.jcgkdh})`) });
      data.spypxm && list.push({ grade: '视频研判', name: data.spypxm + (data.spypdh && `(${data.spypdh})`) });
      data.zfzdxm && list.push({ grade: '执法指导', name: data.zfzdxm + (data.zfzddh && `(${data.zfzddh})`) });
      data.kjbzxm && list.push({ grade: '科技保障', name: data.kjbzxm + (data.kjbzdh && `(${data.kjbzdh})`) });
      dutyList.value = list;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 日1 周2 月3
const dateType: any = ref(2);
const btnClick: any = (type: any) => {
  dateType.value = type;
    //  警情分类
    fetchData2();
    //  案件分类
    fetchData3();
    //  更新地图
    fetchMapData();
    fetchData5();
    //  舆情导控
    fetchData6();
}

//  地图数据
const mapDataList = ref([]);
const showMapDataList = ref([]);

const changeMap = (value:any) => {
  //  更新地图
  fetchMapData();
}

const chooseIndex = ref([]);

const showMpaData = async (data: any) => {
  const mapObj: any = {};
  showMapDataList.value = [];

  chooseIndex.value = store.getChooseIndex();

  chooseIndex.value.forEach((key: any) => {
    if( data[key] ) {
      data[key].forEach((s: any) => {
        const { groupKeyName, groupKey } = s;
        if(!mapObj[groupKey]) {
          mapObj[groupKey] = {[key]: s};
        } else {
          mapObj[groupKey][key] = s;
        }
      })
    }
  })
  
  showMapDataList.value = mapObj;
}

const fetchMapData = () => {
  mapDataList.value = [];
  mapStatisticsByDep({ type: dateType.value }).then((res: any) => {
    if (res.code === 200) {
      mapDataList.value = res.data;

      showMpaData(mapDataList.value);
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

//  警情分类·
const categoryList: any = ref([]);
const fetchData2 = () => {
  categoryList.value = [];
  jjxxStatisticsByType({ type: dateType.value }).then((res: any) => {
    if (res.code === 200) {
      const data = res.rows[0] ? res.rows[0] : {};
      categoryList.value = [
        {text: '违法犯罪', num: data.value1 || 0},
        {text: '社会稳定', num: data.value2 || 0},
        {text: '公共安全', num: data.value3 || 0},
        {text: '群众求助', num: data.value4 || 0},
        {text: '举报投诉', num: data.value5 || 0},
        {text: '其它警情', num: data.value6 || 0},
      ]
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 案件分类 - 饼图
const pieCategoryList: any = ref([]);
// const setType = (type: number) => fetchData(type);
const fetchData3 = () => {
  ajxxStatisticsByAjlb({ type: dateType.value }).then((res: any) => {
    if (res.code === 200) {
      pieCategoryList.value = res.data;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 每日研判-文件列表
const columns4: any = ref([
  { title: '标题', dataIndex: 'urlName', align: 'left', },
  { title: '日期', dataIndex: 'scsj', width: 150, align: 'right' },
]);
const table4: any = ref([]);
const isTable4Data: any = ref(false);
const filePrefix = import.meta.env.VITE_APP_API.slice(0, -1);
const fetchData4 = async () => {
  return await mryp().then((res: any) => {
    
    if (res.code === 200) {
      //  判断是否有数据, 说明此时没有数据
      if (res.rows.length === 0) {
        isTable4Data.value = false;
        return;
      } else {
        isTable4Data.value = true;
      }

      table4.value = res.rows.map((s: any) => {
        s.url = filePrefix + s.url;
        return s;
      });
      } else {
        Message.error(res.msg)
      }
  }).catch(err => {
    console.log(err)
  })
}


const showType5: any = ref(0);
//  切换重点人员列表数据
const setSjzlType = (type: any) => {
  showType5.value = type;
  
  if(type == 0) {
    columns5.value = [
      { title: '地点', dataIndex: 'hdfscs', align: 'left', },
      { title: '姓名', dataIndex: 'xm', align: 'right', width: 80, hasClassname: true, },
    ];
    zdryStatus.value = 'ryyj';
    fetchData5();
  } else if(type == 1) {
    columns5.value = [
      { title: '标题', dataIndex: 'bt', align: 'left', },
      { title: '登记人', dataIndex: 'djrDicttext', align: 'right', width: 80, hasClassname: true, },
    ];
    zdryStatus.value = 'swsj';
    fetchData5();
  }
}  

const columns5: any = ref([
  { title: '地点', dataIndex: 'hdfscs', align: 'left', },
  { title: '姓名', dataIndex: 'xm', align: 'right', width: 80, hasClassname: true, },
]);

  // 人员预警
  const table5 = ref([]);
  const isTable5Data = ref(false); 
function fetchData5() {
  fkData([ zdryStatus.value ], {pageNum: 1, pageSize: 20, type: dateType.value}).then((res: any) => {
    if (res.code === 200) {
      //  判断是否有数据, 说明此时没有数据
      if (res.rows.length === 0) {
        isTable5Data.value = false;
        return;
      } else {
        isTable5Data.value = true;
      }
      table5.value = res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}

//  舆情导控
const columns6: any = ref([
  { title: '内容', dataIndex: 'nr', align: 'left', },
  { title: '来源', dataIndex: 'yqlyName', align: 'right', width: 80, hasClassname: true, },
]);
const table6: any = ref([]);
const isTable6Data: any = ref(false);
const fetchData6 = async () => {
  // table6.value = [];
	yqData([ 'list' ], { pageNum: 1,pageSize: 20, type: dateType.value }).then((res: any) => {
		if (res.code === 200) {
      //  判断是否有数据, 说明此时没有数据
      if (res.rows.length === 0) {
        isTable6Data.value = false;
      } else {
        isTable6Data.value = true;
      }

      table6.value = res.rows.map((s: any) => {
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

//  数据治理
const table7: any = ref([]);
const fetchData7 = async () => {
  sjzl({}).then((res: any) => {
    if (res.code === 200) {
      try {
        table7.value = JSON.parse(res.data.jsonValue);
      } catch(ev) {}

    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(async () => {
  // 获取地图数据 
  fetchMapData();

  fetchData();
  //  警情分类
  fetchData2();
  //  案件分类
  fetchData3();
  //  每日研判
  fetchData4();
  //  重点人员
  fetchData5();
  //  舆情导控;
  fetchData6()
  //  数据治理
  fetchData7();
})

</script> 
<style lang="scss" scoped>
.home {
  position: relative;
  background: url('../assets/images/home-bg.png') center / cover no-repeat;

  .show-date {
    position: absolute;
    left: 300px;
    top: 26px;
    font-size: 18px;
  }

  .main-left {
    margin-top: -20px;
  }

  .main-right {
    margin-top: -20px;
  }
}
</style>