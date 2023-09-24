<template>
    <div class="detail-wrap">
        <LargeBtn @btnClick="toggleDate" :showType="dateType" />
        <TableFix :pageSize="pageSize" :tableList="tableList" :tableTotal="tableTotal" :pcsNameList="pcsDicList"
            :columns="columns" :pageType="SHOW2_2_1" @changeSort="changeSort" @pageChange="pageChange">
            <template #form>
                <a-form :model="form" auto-label-width>
                    <a-space size="medium" align="baseline">
                        <a-form-item field="startTime" label="日期">
                            <a-range-picker v-model="pickerValue" format="YYYY-MM-DD" :disabled-date="disabledDate"
                                @change="onTimePickerChange" />
                        </a-form-item>
                        <a-space size="medium" align="baseline">
                            <a-button type="primary" @click="searchData">
                                <template #icon>
                                    <icon-search />
                                </template>
                                搜索
                            </a-button>
                            <a-button type="secondary" @click="resetData">
                                <template #icon>
                                    <icon-refresh />
                                </template>
                                重置
                            </a-button>
                            <a-button type="primary" @click="exportData">
                                <template #icon>
                                    <icon-download />
                                </template>
                                导出
                            </a-button>
                        </a-space>
                    </a-space>
                </a-form>
            </template>
        </TableFix>
        <FramPage2 :showPage="showDetailPage" :pageTitle="pageDetailTitle">
            <Show2-2-1 v-if="pageDetailType === SHOW2_2_1" :caseId="caseId" />
        </FramPage2>
    </div>
</template>

<script setup lang="ts">
import { Message } from '@arco-design/web-vue';
import { ref, computed } from 'vue';
import TableFixView from '@/components/TableDetail/TableFixView/index.vue';
import FramPage2 from '@/components/FramPage2/index.vue';
import LargeBtn from '@/components/Btn/large.vue';
import { ajxxList, mrypExport } from '@/api/index';
import { onMounted, reactive } from 'vue';
import { mainStore, watchStore } from '@/store';
import { PageTypeEnum } from '@/config/TypeEnum';
import { pcsDicList, usePcsDicList } from './hooks';
import { indexMryp, mrypPx } from '@/api/index';
import { formatDate } from '@/utils';
import dayjs from 'dayjs';

const { SHOW2_2_1 } = PageTypeEnum;

const showDetailPage = ref(false);
const pageDetailTitle = ref('');
const pageDetailType = ref('');
const caseId = ref('');

const store: any = mainStore();

const dateType: any = ref(1);

// formatDate();

// 监听 actions 方法
watchStore("setDetailPage", (store: any) => { showDetailPage.value = store.$state.showDetailPage });
watchStore("setDetailPageTitle", (store: any) => { pageDetailTitle.value = store.$state.pageDetailTitle });
watchStore("setDetailPageType", (store: any) => { pageDetailType.value = store.$state.pageDetailType });
watchStore("setCaseId", (store: any) => { caseId.value = store.$state.caseId });

//	案件详情配置 - 分页
const pageNum: any = ref(1),
    pageSize: any = ref(12),
    tableTotal: any = ref(0),
    tableList: any = ref([]);

// 警情列表 - 表格
const pickerValue: any = ref([]);
const form: any = reactive({
    beginTime: '',
    endTime: '',
    content: '',
    unit: '',
});

// 禁止选择当前时间之后的日期
const disabledDate = (current: any) => {
    return current && current >= dayjs().startOf('day');
};

//  初始化时间
const initSelectDate = () => {
    let num: any = 0;
    let beginTime: any = '',
        endTime: any = '';

    switch (dateType.value) {
        case 1:
            num = 1;
            break;
        case 2:
            num = 7;
            break;
        case 3:
            num = 30;
            break;
        default:
            break;
    }

    beginTime = formatDate(num, '-');
    endTime = formatDate(1, '-');

    pickerValue.value = [beginTime, endTime];
    form.beginTime = beginTime;
    form.endTime = endTime;
}

const option: any = computed(() => {
    return {
        pageNum: pageNum.value,
        pageSize: pageSize.value,
        beginTime: form.beginTime,
        endTime: form.endTime,
    }
})

//	点击搜索按钮
const searchData = () => {
    pageNum.value = 1;
    fetchData(option.value);
}

//  切换日期
const toggleDate = (type: any) => {
    dateType.value = type;
    initSelectDate();   //  更新显示
    fetchData(option.value);
}

//  导出数据
const exportData = (e: any) => {
    mrypExport({ beginTime: form.beginTime, endTime: form.endTime }).then((res: any) => {
        if (res.status === 200) {
            const data = res.data;
            const fileName = res.headers['content-disposition'].split('filename=')[1];
            const blob = new Blob([data]);
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a')
            link.style.display = 'none'
            link.href = url
            link.download = decodeURIComponent(fileName); //文件名
            document.body.appendChild(link);
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(url)
        }
    }).catch(err => {
        console.log(err)
    })
}

//	点击重置按钮
const resetData = () => {
    pickerValue.value = [];
    form.beginTime = '';
    form.endTime = '';
    form.content = '';
    form.unit = '';
    pageNum.value = 1;

    initSelectDate();   //  更新显示
    fetchData(option.value);
}

//	点击分页按钮
const pageChange = (data: any) => {
    pageNum.value = data;
    fetchData(option.value);
}

//	修改日期
const onTimePickerChange = (data: any = ['', '']) => {
    form.beginTime = data[0];
    form.endTime = data[1];
}

//  切换排序
const changeSort = (data: any) => {
    const { direction, field } = data.sorter;
    const dire = direction == "ascend" ? 1 : 0;

    switch (field) {
        case "ajshow":
            fetchSortData({ type: 1, sort: dire });
            break;
        case "ajshow":
            fetchSortData({ type: 2, sort: dire });
            break;
        case "ajshow":
            fetchSortData({ type: 3, sort: dire });
            break;
        case "ajshow":
            fetchSortData({ type: 4, sort: dire });
            break;
        default:
            break;
    }
}

//  获取排序数据
function fetchSortData(opt: any) {
    Object.assign(opt, { pageNum: pageNum.value, pageSize: pageSize.value, beginTime: form.beginTime, endTime: form.endTime });
    mrypPx(opt).then((res: any) => {
        if (res.code === 200) {
            tableTotal.value = res.total;
            tableList.value = res.rows.map((s: any) => {
                formatArrow(s);
                return s;
            });
        } else {
            Message.error(res.msg)
        }
    }).catch(err => {
        console.log(err)
    })
}

//  数据请求
const fetchData = async (opt: any) => {
    indexMryp(opt).then((res: any) => {
        if (res.code === 200) {
            tableTotal.value = res.total;
            tableList.value = res.rows.map((s: any) => {
                //  判断是增还是降
                formatArrow(s);
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
    //  初始化配置项
    initSelectDate();
    //	盯警列表数据
    fetchData(option.value);
})

//  处理箭头显示
function formatArrow(s: any) {
    //  处理警情箭头显示
    if (s.jqhb.length > 1 && s.jqhb.slice(0, 1) === '-') {    //  降
        s.jqDirection = 0;
    } else if (s.jqhb.length > 1 && s.jqhb.slice(0, 1) !== '-') {   // 增
        s.jqDirection = 1;
    } else {
        s.jqDirection = '';
    }
    //  处理事件箭头显示
    if (s.ajhb.length > 1 && s.ajhb.slice(0, 1) === '-') {    //  降
        s.ajDirection = 0;
    } else if (s.ajhb.length > 1 && s.ajhb.slice(0, 1) !== '-') {   // 增
        s.ajDirection = 1;
    } else {
        s.ajDirection = '';
    }
    //  处理电炸箭头显示
    if (s.dzhb.length > 1 && s.dzhb.slice(0, 1) === '-') {    //  降
        s.dzDirection = 0;
    } else if (s.dzhb.length > 1 && s.dzhb.slice(0, 1) !== '-') {   // 增
        s.dzDirection = 1;
    } else {
        s.dzDirection = '';
    }
    //  处理舆情箭头显示
    if (s.yqhb.length > 1 && s.yqhb.slice(0, 1) === '-') {    //  降
        s.yqDirection = 0;
    } else if (s.yqhb.length > 1 && s.yqhb.slice(0, 1) !== '-') {   // 增
        s.yqDirection = 1;
    } else {
        s.yqDirection = '';
    }
}

const columns: any = [
    {
        title: '派出所', dataIndex: 'name', width: 140, align: 'left',
    },
    {
        title: '警情',
        dataIndex: 'jqsl',
        ellipsis: true,
        align: 'left',
        slotName: 'jqsl',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        tooltip: { position: 'left' }
    },
    {
        title: '案件',
        dataIndex: 'ajsl',
        ellipsis: true,
        slotName: 'ajsl',
        sortable: {
            sortDirections: ['ascend', 'descend']
        },
        tooltip: { position: 'left' },
    },
    {
        title: '电诈',
        dataIndex: 'dzsl',
        align: 'left',
        slotName: 'dzsl',
        sortable: {
            sortDirections: ['ascend', 'descend']
        }
    },
    {
        title: '舆情',
        dataIndex: 'yqsl',
        align: 'left',
        slotName: 'yqsl',
        sortable: {
            sortDirections: ['ascend', 'descend']
        }
    },
    // { title: '操作', slotName: 'view', width: 100, align: 'center', },
];

</script>

<style lang="scss" scoped>
.detail-wrap {
    height: 100%;
    width: 100%;

    .out-file {
        position: absolute;
        left: 1000px;
    }
}
</style>