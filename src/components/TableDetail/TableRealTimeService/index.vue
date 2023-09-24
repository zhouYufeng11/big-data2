<template>
	<div class="detail-table">
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
import { Message } from '@arco-design/web-vue';

//	字典接口 
import { dic_interface2 } from '@/api/dic';

import { yqData } from '@/api/publicSentiment';

const props = defineProps({
	pageSize: {
		type: [Number],
		default: 12
	}
});

console.log(props);

// 舆情列表 - 表格
const tableList: any = ref([]);
const statusList: any = ref([]);
const tableTotal: any = ref(0);
const pageNum: any = ref(1);
const form: any = reactive({
	startTime: '',
	endTime: '',
	status: '',
	content: '',
});

function getYQLBList(opt: any) {
	yqData(['yqxq'], opt).then((res: any) => {
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

const pageChange = (data: number) => {
	pageNum.value = data;
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


const fetchData = async () => {
	yqData(['yqxq'], {
		pageNum: pageNum.value || 1,
		pageSize: props.pageSize,
		fbsjStart: form.startTime,
		fbsjEnd: form.endTime,
		fbnr: form.content,
		yqly: form.status,
	}).then((res: any) => {
		console.log(res);
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
	return await dic_interface2('type/jwpt_yqly').then((res: any) => {
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
	fetchData();
	fetchDicData();
});

const columns: any = [
	{ title: '序号', dataIndex: 'no', width: 80, align: 'center', },
	{
		title: '舆情来源', dataIndex: 'yqlyName',
		// sortable: {
		// 	sortDirections: ['ascend', 'descend'],
		// },
		width: 150,
	},
	{
		title: '舆情内容', dataIndex: 'fbnr', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{
		title: '涉及区域', dataIndex: 'sjqyName', width: 150, ellipsis: true,
		tooltip: { position: 'left' },
	},
	{
		title: '发布时间', dataIndex: 'fbsj', width: 150, ellipsis: true,
		tooltip: { position: 'left' },
	},
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

			:deep(.arco-table-cell) {
				padding: 7px 16px;
			}
		}
	}
}
</style>
