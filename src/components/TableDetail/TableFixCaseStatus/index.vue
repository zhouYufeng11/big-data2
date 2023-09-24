<template>
	<div class="detail-table">
		<div class="detail-filter">
			<a-form :model="form" auto-label-width>
				<a-space size="medium" align="baseline">
					<a-form-item field="startTime" label="日期">
						<a-range-picker v-model="pickerValue" @change="onTimePickerChange" />
					</a-form-item>
					<a-form-item field="status" label="案件状态">
						<a-select v-model="form.status" placeholder="请选择状态" :style="{ width: '150px' }">
							<a-option v-for="item of statusList" :value="item.dictValue" :label="item.dictLabel" />
						</a-select>
					</a-form-item>
					<a-form-item field="content" label="案件内容">
						<a-input v-model="form.content" allow-clear placeholder="请输入内容" />
					</a-form-item>
					<a-space size="medium" align="baseline">
						<a-button type="primary" @click="fetchData">
							<template #icon>
								<icon-search />
							</template>
							搜索
						</a-button>
						<a-button type="secondary" @click="resetForm">
							<template #icon>
								<icon-refresh />
							</template>
							重置
						</a-button>
					</a-space>
				</a-space>
			</a-form>
		</div>
		<div class="detail-table-container">
			<a-table :columns="columns" :data="tableList" :bordered="false" hoverable @page-change="pageChange"
				page-position="bottom" :pagination="{
					current: pageNum,
					pageSize: pageSize,
					total: tableTotal,
					size: 'large',
					showTotal: true,
					showJumper: true,
					showPageSize: false,
					pageItemStyle: {},
					activePageItemStyle: {},
				}">
				<template #ajztDicttext="{ record }">
					<span :class="showStatus(record.ajzt)">{{ record.ajztDicttext }}</span>
				</template>
				<FramPage2 :showPage="showDetailPage" :pageTitle="pageDetailTitle">
					<Show2-2-1 v-if="pageDetailType === SHOW2_2_1" :caseId="caseId" />
				</FramPage2>
			</a-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { gakList } from '@/api/index';
import { dic_interface } from '@/api/dic';
import { Message } from '@arco-design/web-vue';
import { mainStore, watchStore } from '@/store';
import { PageTypeEnum } from '@/config/TypeEnum';

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

// 警情列表 - 表格
const tableList: any = ref([]);
const statusList: any = ref([]);
const tableTotal: any = ref(0);
const pageNum: any = ref(1);
const pageSize: any = ref(12);
const pickerValue: any = ref([]);
const form: any = reactive({
	startTime: '',
	endTime: '',
	content: '',
	status: '',
});

const resetForm = () => {
	pickerValue.value = '';
	form.startTime = '';
	form.endTime = '';
	form.content = '';
	form.status = '';

	pageNum.value = 1;
	fetchData();
}

const onTimePickerChange = (data: any = ['', '']) => {
	form.startTime = data[0];
	form.endTime = data[1];
}

const pageChange = (data: number) => {
	pageNum.value = data;
	fetchData();
}

let showStatus = computed(() => {
	return (status: any) => {
		return status === 1 ? 'redText' : status === 2 ? 'yellowText' : status === 3 ? 'blueText' : '#fff';
	}
});

const fetchData = async () => {
	return await gakList({
		pageNum: pageNum.value,
		pageSize: pageSize.value,
		bjdhsjBegin: form.startTime,
		bjdhsjEnd: form.endTime,
		jyaq: form.content,
		ajzt: form.status,
	}).then((res: any) => {
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

const fetchDicData = async () => {
	return await dic_interface({
		dictType: 'gak_ajzt'
	}).then((res: any) => {
		if (res.code === 200) {
			statusList.value = [
				{ dictLabel: '全部', dictValue: '' },
				...res.data.map((s: any) => {
					s.active = false;
					return s;
				})
			];
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

onMounted(() => {
	fetchDicData();
	fetchData();
});

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
	{ title: '状态', slotName: 'ajztDicttext', width: 100, align: 'center', },
];


</script>

<style lang="scss" scoped>
.detail-table {
	height: 100%;
	width: 100%;
	padding: 20px;

	.detail-filter {
		display: flex;
		flex-wrap: wrap;

		.detail-filter-btn {
			width: 110px;
			height: 25px;
			line-height: 25px;
			text-align: center;
			color: #fff;
			cursor: pointer;
			font-size: 16px;
			margin-right: 10px;
			margin-bottom: 10px;
			background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.20) 49%, rgba(9, 157, 254, 0.00));
			border: 1px solid;
			border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.35) 52%, rgba(255, 255, 255, 0.00)) 1 1;
			box-shadow: 0px 0px 11px 0px rgba(0, 22, 133, 0.24);

			&:nth-child(6n) {
				margin-right: 0;
			}

			&:nth-child(n + 12) {
				margin-bottom: 0;
			}

			&.active,
			&:hover {
				background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.50) 49%, rgba(9, 157, 254, 0.00));
				border: 1px solid;
				border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), #ffffff 52%, rgba(255, 255, 255, 0.00)) 1 1;
				box-shadow: 0px 2px 4px 0px rgba(0, 43, 176, 0.50), 0px 0px 11px 0px rgba(0, 22, 133, 0.24);
			}
		}
	}

	.detail-table-container {
		height: 100%;

		.arco-table {
			height: 100%;
			padding-bottom: 10px;

			:deep(.arco-table-cell) {}
		}
	}
}
</style>
