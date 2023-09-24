<template>
	<div class="detail-table">
		<div class="detail-filter">
			<a-form :model="form" auto-label-width>
				<a-space size="medium" align="baseline">
					<a-form-item field="startTime" label="日期">
						<a-range-picker @change="onTimePickerChange" />
					</a-form-item>
					<a-form-item field="status" label="处置状态">
						<a-select v-model="form.status" placeholder="请选择状态" :style="{ width: '150px' }">
							<a-option v-for="item of statusList" :value="item.dictValue" :label="item.dictLabel" />
						</a-select>
					</a-form-item>
					<a-form-item field="content" label="警情内容">
						<a-input v-model="form.content" allow-clear placeholder="请输入内容" />
					</a-form-item>
					<a-space size="medium" align="baseline">
						<a-button type="primary" @click="fetchData">
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
				<template #status="{ record }">
					<span :class="showStatus(record.cjbs)">{{ record.cjbsMc }}</span>
				</template>
			</a-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { jjxxList } from '@/api/index';
import { dic_jjxx_status } from '@/api/dic';
import { Message } from '@arco-design/web-vue';

// 警情列表 - 表格
const tableList: any = ref([]);
const statusList: any = ref([]);
const tableTotal: any = ref(0);
const pageNum: any = ref(1);
const pageSize: any = ref(12);
const form: any = reactive({
	startTime: '',
	endTime: '',
	status: '',
	content: '',
});

const onTimePickerChange = (data: any = ['', '']) => {
	form.startTime = data[0];
	form.endTime = data[1];
}

const pageChange = (data: number) => {
	pageNum.value = data;
	fetchData();
}

//	重置
const resetData = () => {
	pageNum.value = 1;
	pageSize.value = 12;
	form.startTime = '';
	form.endTime = '';
	form.status = '';
	form.content = '';

	fetchData();
} 

let showStatus = computed(() => {
	return (status: any) => {
		if (status === '2' || status === '3') {
			return 'greenText';
		} else if (status === '1') {
			return 'redText';
		} else {
			return '';
		}
	}
});

const typeChange = (data: string, index: number) => {
	statusList.value.forEach((s: any, i: number) => {
		if (i === index) {
			s.active = true;
		} else {
			s.active = false;
		}
	});
}

const fetchData = async () => {
	return await jjxxList({
		pageNum: pageNum.value,
		pageSize: pageSize.value,
		bjdhsjBegin: form.startTime,
		bjdhsjEnd: form.endTime,
		bjnr: form.content,
		cjbs: form.status,
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
	return await dic_jjxx_status({}).then((res: any) => {
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
		title: '时间', dataIndex: 'ejjssj',
		// sortable: {
		// 	sortDirections: ['ascend', 'descend'],
		// },
		width: 150,
	},
	{
		title: '报警内容', dataIndex: 'bjnr', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '处置状态', slotName: 'status', width: 100, align: 'center', },
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
