<template>
	<div class="detail-wrap">
		<div class="detail-list">
			<TableCommon :columns="columns" :dataList="swsjData" :pageSize="pageSize" :pageNum="pageNum" :tableTotal="tableTotal" @setPage="setPage" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { fkData } from '@/api/riskControl';
import TableCommon from '@/components/TableDetail/TableCommon/index.vue';
import { mainStore } from '@/store';

const pageSize = ref(12);
const pageNum = ref(1);
const tableTotal = ref(0);
const swsjData = ref([]);

const store = mainStore();

const setPage = (data: any) => {
	fetchData(data);
}

const fetchData = (pageNum: any = 1) => {
	fkData(['swsj'], {pageNum, pageSize: 12, type: store.fkDate}).then((res: any) => {
		if (res.code === 200) {
			swsjData.value = res.rows.map((s: any, i: any) => {
				s.no = i + 1;
				return s;
			});
			
			tableTotal.value = res.total;
		} else {
			Message.error(res.msg)
		}
	}).catch((err: any) => {
		console.log(err)
	})
}


onMounted(() => {
	fetchData();
})


const columns: any = [
	{ title: '序号', dataIndex: 'no', width: 80, align: 'center', },
	{
		title: '登记单位', dataIndex: 'djdwDicttext', width: 150,
	},
	{
		title: '登记时间', dataIndex: 'djsjDicttext', ellipsis: true, width: 150,
		tooltip: { position: 'left' },
	},
	{
		title: '登记日期', dataIndex: 'djrqDicttext', ellipsis: true, width: 150,
		tooltip: { position: 'left' },
	},
	{
		title: '登记人', dataIndex: 'djrDicttext', ellipsis: true, width: 80,
		tooltip: { position: 'left' },
	},
	{
		title: '标题', dataIndex: 'bt', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{
		title: '文本内容', dataIndex: 'wbnr', ellipsis: true,
		tooltip: { position: 'left' },
	}
];
</script>

<style lang="scss" scoped>
.detail-wrap {
	display: flex;

	.detail-list {
		width: 100%;
	}
}
</style>


