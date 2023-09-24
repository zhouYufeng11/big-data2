<template>
	<div class="detail-wrap">
		<div class="detail-list">
			<TableCommon :columns="columns" :dataList="ryyjData" :pageSize="pageSize" :pageNum="pageNum" :tableTotal="tableTotal" @setPage="setPage" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { fkData } from '@/api/riskControl';
import TableCommon from '@/components/TableDetail/TableCommon/index.vue';
import { mainStore } from '@/store';
import { computed } from 'vue';

const store: any = mainStore();


const pageSize = ref(12);
const pageNum = ref(1);
const tableTotal = ref(0);
const ryyjData = ref([]);

const setPage = (data: any) => {
	fetchData(data);
}

const fetchData = (pageNum: any = 1) => {
	fkData(['ryyj'], {pageNum, pageSize: 12, type: store.fkDate}).then((res: any) => {
		if (res.code === 200) {
			tableTotal.value = res.total;
			ryyjData.value = res.rows.map((s: any, i: any) => {
				s.no = i + 1;
				return s;
			});
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
	{ title: '序号', dataIndex: 'no', width: 40, align: 'center', },
	{
		title: '预警时间', dataIndex: 'hdfssjDicttext', width: 70,
	},
	{
		title: '姓名', dataIndex: 'xm', width: 40,
	},
	{
		title: '活动发生场所', dataIndex: 'hdfscs', width: 150, ellipsis: true,
		tooltip: { position: 'left' },
	},
	{
		title: '活动相关信息', dataIndex: 'hdxgxx', ellipsis: true, width: 150,
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


