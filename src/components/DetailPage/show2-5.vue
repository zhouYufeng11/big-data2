<!-- <template>
  <div class="detail-wrap">
    <TableFixCaseStatus />
  </div>
</template>

<script setup lang="ts">
import TableFixCaseStatus from '@/components/TableDetail/TableFixCaseStatus/index.vue';

</script>

<style lang="scss" scoped>
.detail-wrap {
  height: 100%;
  width: 100%;
}
</style> -->


  <template>
	<div class="detail-wrap">
		<!-- <TableFixCase 
			:pageSize="pageSize"
			:tableList="tableList"
			:tableTotal="tableTotal"
			:pcsNameList="pcsDicList"
			:columns="columns"
			@searchData="searchData"
			@resetData="resetData" 
			@pageChange="pageChange"
		/> -->
		<TableFixView :pageSize="pageSize" :tableList="tableList" :tableTotal="tableTotal"
			:columns="columns" :pageType="SHOW2_2_1" @pageChange="pageChange">
			<template #form>
				<a-form :model="form" auto-label-width>
					<a-space size="medium" align="baseline">
						<a-form-item field="startTime" label="日期">
							<a-range-picker v-model="pickerValue" format="YYYY-MM-DD" @change="onTimePickerChange" />
						</a-form-item>
						<a-form-item field="ajzt" label="案件状态">
							<a-select v-model="form.ajzt" placeholder="请选择案件状态" :style="{ width: '150px' }">
								<a-option v-for="item of ajztDicList" :value="item.dictValue" :label="item.dictLabel" />
							</a-select>
						</a-form-item>
						<a-form-item field="content" label="案件内容">
							<a-input v-model="form.content" allow-clear placeholder="请输入内容" />
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
						</a-space>
					</a-space>
				</a-form>
			</template>
		</TableFixView>
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
import { ajxxList, gakList } from '@/api/index';
import { onMounted, reactive } from 'vue';
import { mainStore, watchStore } from '@/store';
import { PageTypeEnum } from '@/config/TypeEnum';
import { ajztDicList, useAjztDicList } from './hooks';

const { SHOW2_2_1 } = PageTypeEnum;

const showDetailPage = ref(false);
const pageDetailTitle = ref('');
const pageDetailType = ref('');
const caseId = ref('');

const store: any = mainStore();

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
	startTime: '',
	endTime: '',
	content: '',
	ajzt: '',
});

const option: any = computed(() => {
	return {
		pageNum: pageNum.value,
		pageSize: pageSize.value,
		basjBegin: form.startTime,
		basjEnd: form.endTime,
		jyaq: form.content,
		ajzt: form.ajzt,
	}
})

//	点击搜索按钮
const searchData = () => {
	pageNum.value = 1;
	fetchData(option.value);
}

//	点击重置按钮
const resetData = () => {
	pickerValue.value = [];
	form.startTime = '';
	form.endTime = '';
	form.content = '';
	form.unit = '';
	pageNum.value = 1;

	fetchData(option.value);
}

//	点击分页按钮
const pageChange = (data: any) => {
	pageNum.value = data;
	fetchData(option.value);
}

const fetchData = async (opt: any) => {
	gakList(opt).then((res: any) => {
		if (res.code === 200) {
			tableTotal.value = res.total;
			tableList.value = res.rows.map((s: any, i: number) => {
				s.no = i + 1;
				return s;
			});
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

//	修改日期
const onTimePickerChange = (data: any = ['', '']) => {
	form.startTime = data[0];
	form.endTime = data[1];
}

onMounted(async () => {
	//	获取案件状态
	await useAjztDicList();
	//	盯警列表数据
	fetchData({
		pageNum: pageNum.value,
		pageSize: pageSize.value
	})
})


const columns: any = [
	{ title: '序号', dataIndex: 'no', width: 80, align: 'center', },
	{
		title: '案件时间', dataIndex: 'slsjDicttext', width: 140,
	},
	{
		title: '案件类别', dataIndex: 'ajlbDicttext', ellipsis: true, width: 150,
		tooltip: { position: 'left' },
	},
	{
		title: '案件内容', dataIndex: 'jyaq', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '状态', dataIndex: 'ajztDicttext', width: 120, align: 'center', },
	{ title: '操作', slotName: 'view', width: 100, align: 'center', },
];

</script>

<style lang="scss" scoped>
.detail-wrap {
	height: 100%;
	width: 100%;
}
</style>