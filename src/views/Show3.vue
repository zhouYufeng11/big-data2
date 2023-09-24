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
        <!-- 姜堰分局值班信息 -->
        <Pannel title="姜堰分局值班信息" :height="439" :pannelType="LARGE" :pageType="SHOW3_1">
          <TableQw1 :height="230" :dataList="dutyList" />
        </Pannel>
        <!-- 下辖派出所值班信息 -->
        <Pannel title="下辖派出所值班信息" :height="439" :pannelType="LARGE" :pageType="SHOW3_2">
          <TableQw2 :height="389" :dataList="underDutyList" @setPCS="setShowPage2" />
        </Pannel>
      </div>
      <div class="main-right animate__animated animate__fadeInRight">
        <!-- 设备详情 -->
        <Pannel title="设备详情" subTitle="勤务列表" :height="289" :pannelType="TINY" :pageType="SHOW3_3">
          <PieDevice :dataList="deviceList" />
        </Pannel>
        <!-- 辖区分布 -->
        <Pannel title="辖区分布" subTitle="勤务列表" :height="370" :pannelType="EX_MIDDLE" :pageType="SHOW3_4">
          <TableQw4 :height="320" :dataList="deviceAreaList" />
        </Pannel>
        <Pannel title="重要勤务" :height="209" :pannelType="EX_SMALL" :pageType="SHOW3_5">
          <TableFileSlider :height="159" :columns="fileColumns" :dataList="fileList" @showFile="showFile" />
          <!-- <Weater /> -->
        </Pannel>
      </div>
    </div>
    <FramPage :showPage="showPage" :pageTitle="pageTitle">
      <Show3-1 v-if="pageType === SHOW3_1" />
      <Show3-2 v-if="pageType === SHOW3_2" />
      <Show3-3 v-if="pageType === SHOW3_3" />
      <Show3-4 v-if="pageType === SHOW3_4" />
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
import { ref, onMounted } from 'vue';
import Map from '@/components/Map/index.vue';
import TopTitle from '@/components/TopTitle/index.vue';
import TopNav from '@/components/TopNav/index.vue';
import Pannel from '@/components/Pannel/index.vue';
import FramPage from '@/components/FramPage/index.vue';
import FramFilePage from '@/components/FramFilePage/index.vue';
import FileWord from '@/components/File/word.vue';
import FilePdf from '@/components/File/pdf.vue';
import FileExcel from '@/components/File/excel.vue';
import { mainStore, watchStore } from "@/store/index";
import { PageTypeEnum, PannelTypeEnum, FileTypeEnum } from '@/config/TypeEnum';
import { Message } from '@arco-design/web-vue';
import { fjzb, pcszb, deviceStatisticsByType, deviceStatisticsByDep, zyqwInfoList } from '@/api/index';
import { dic_interface } from '@/api/dic';


import TableQw1 from '@/components/QwIndex/TableQw1/index.vue';
import TableQw2 from '@/components/QwIndex/TableQw2/index.vue';
import TableQw4 from '@/components/QwIndex/TableQw4/index.vue';

const { SHOW3_1, SHOW3_2, SHOW3_3, SHOW3_4, SHOW3_5 } = PageTypeEnum;
const { LARGE, TINY, EX_SMALL, EX_MIDDLE } = PannelTypeEnum;
const { WORD, PDF, EXCEL } = FileTypeEnum;
const showPage = ref(false);
const pageTitle = ref('');
const pageType = ref('');

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

// 状态
const store = mainStore();

// 监听 actions 方法
watchStore("setPage", (store: any) => { showPage.value = store.$state.showPage });
watchStore("setPageTitle", (store: any) => { pageTitle.value = store.$state.pageTitle });
watchStore("setPageType", (store: any) => { pageType.value = store.$state.pageType });
watchStore("setFilePage", (store: any) => { showFilePage.value = store.$state.showFilePage });
watchStore("setFilePageTitle", (store: any) => { pageFileTitle.value = store.$state.pageFileTitle });

//  根据派出所名称切换列表
const setShowPage2 = (payload: any) => {
  store.setPage(true);
  store.setPageType('SHOW3_2');
  store.setpageMsg(payload);
}

// 姜堰分局值班信息
// const dutyColumns: any = ref([
//   { title: '岗位', dataIndex: 'grade', width: 100, align: 'left', },
//   { title: '值班人（短号）', dataIndex: 'name', align: 'right', classname: 'indigoText' },
// ]);
function formatDate(payload: any) {
  const timeout = 1000 * 60 * 60 * 24; //	获取一天的毫秒
  payload = Date.now() - (payload * timeout);
  const d = new Date(payload);

  let month: any = d.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let day: any = d.getDate();
  if (day < 10) day = '0' + day;

  //格式化
  return d.getFullYear() + '' + month + '' + day;
}

const dutyList: any = ref([]);
const fetchData = async () => {
  return await fjzb({ zbrq: formatDate(0) }).then((res: any) => {
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

// 下辖派出所值班信息
const posList: any = ref([]);
const fetchDataDic = () => {
  dic_interface({
    dictType: 'jwpt_zrdw'
  }).then(async (res: any) => {
    if (res.code === 200) {
      posList.value = res.data;
      // 下辖派出所值班信息
      fetchData2();
    } else {
      Message.error(res.msg)
    }
  }).catch((err: any) => {
    console.log(err)
  })
}
// 获取派出所名称
const getPosName = (name: string) => {
  const findOne = posList.value.find((s: any) => {
    return s.dictValue === name;
  });
  return findOne.dictLabel || '';
}

// const underDutyColumns: any = ref([
//   { title: '派出所', dataIndex: 'posName', width: 90, align: 'left', },
//   { title: '岗位', dataIndex: 'grade', width: 100, align: 'left' },
//   { title: '值班人（短号）', dataIndex: 'name', align: 'right', classname: 'blueText' },
// ]);
const underDutyList: any = ref([]);
const fetchData2 = async () => {
  return await pcszb({ zbrq: formatDate(0) }).then((res: any) => {
    if (res.code === 200) {
      let resultList: any = [];
      let list: any = res.data.map((s: any) => {
        const posName = getPosName(s.pcsbmDicttext);
        s = {
          posName,
          grade1: '带班',
          name1: s.dbldxm + (s.dblddh && `(${s.dblddh})`),
          grade2: '民警',
          name2: s.zbmj1xm + (s.zbmj1dh && `(${s.zbmj1dh})`)
        };
        return s;
      });
      list.forEach((s: any, i: number) => {
        if (i % 7 === 0) {
          resultList.push([]);
        }
        resultList[Math.trunc(i / 7)].push(s);
      });
      underDutyList.value = resultList;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 在线设备 - 统计
const deviceList: any = ref([]);
const fetchData3 = async () => {
  return await deviceStatisticsByType({}).then((res: any) => {
    if (res.code === 200) {
      deviceList.value = res.rows;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 辖区分布 - 在线设备
const deviceAreaList: any = ref([]);
const fetchData4 = async () => {
  return await deviceStatisticsByDep({}).then((res: any) => {
    if (res.code === 200) {
      let list: any = [];
      res.rows.forEach((s: any, i: number) => {
        if (i % 2 === 0) {
          list.push([]);
        }
        list[Math.trunc(i / 2)].push(s);
      });
      deviceAreaList.value = list;
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

// 重要勤务-文件列表
const fileColumns: any = ref([
  { title: '标题', dataIndex: 'urlName', align: 'left', },
  { title: '日期', dataIndex: 'scsj', width: 150, align: 'right' },
]);
const fileList: any = ref([]);
const filePrefix = import.meta.env.VITE_APP_API.slice(0, -1);
const fetchData5 = async () => {
  return await zyqwInfoList().then((res: any) => {
    if (res.code === 200) {
      fileList.value = res.rows.map((s: any) => {
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

onMounted(async () => {
  // 派出所字典项
  fetchDataDic();
  // 姜堰分局值班信息
  fetchData();
  // 在线设备
  fetchData3();
  // 辖区分布派出所
  fetchData4();
  // 重要勤务
  fetchData5();
})

</script> 
<style lang="scss" scope></style>