<template>
	<div class="detail-table">
		<div class="detail-filter">
			<p class="detail-filter-btn" :class="[v.active && 'active']" @click="typeChange(v.groupKey, i)"
				v-for="(v, i) in filterTypeList" :key="v.groupKey">{{ v.groupKeyName }}</p>
		</div>
		<div class="detail-table-container">
			<a-table :columns="columns" :data="dataList" :bordered="false" hoverable @page-change="pageChange" :pagination="{
				current: current,
				total: total,
				size: 'large',
				showTotal: true,
				showJumper: true,
				showPageSize: false,
				pageItemStyle: {},
				activePageItemStyle: {},
			}" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { dic_pcsList } from '@/api/dic';
import { Message } from '@arco-design/web-vue';

const props = defineProps({
	dataList: {
		type: Array<any[]>,
		default: []
	},
	total: {
		type: Number,
		default: 0,
	},
	width: {
		type: Number,
		default: 750
	},
	height: {
		type: Number,
		default: 640
	}
})
const emit = defineEmits(['setPage', 'setType'])
const filterTypeList: any = ref([]);

const current = ref(1);
const pageChange = (data: number) => {
	current.value = data;
	emit('setPage', data);
}
const typeChange = (data: string, index: number) => {
	filterTypeList.value.forEach((s: any, i: number) => {
		if (i === index) {
			s.active = true;
		} else {
			s.active = false;
		}
	});
	emit('setType', data);
}

	//  获取派出所字典项
const fetchDicData = () => {
  dic_pcsList({}).then((res: any) => {
		console.log(res);
    if (res.code === 200) {
			filterTypeList.value = [
				{ groupKeyName: '全部', groupKey: '' },
				...res.rows.map((s: any) => {
					s.groupKeyName = s.name;
					s.groupKey = s.organCode;
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
});

const columns: any = [
	{ title: '序号', dataIndex: 'no', width: 80, align: 'center', },
	{
		title: '案件时间', dataIndex: 'zyRksj', width: 140,
	},
	{
		title: '案件类别', dataIndex: 'ajlbMc', ellipsis: true, width: 150,
		tooltip: { position: 'left' },
	},
	{
		title: '案件内容', dataIndex: 'jyaq', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '状态', dataIndex: 'ajztMc', width: 100, align: 'center', },
];

</script>

<style lang="scss" scoped>
.detail-table {
	height: 100%;
	width: 100%;
	padding: 20px 20px 0 20px;

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
		height: calc(100% - 70px);

		.arco-table {
			height: 90%;
			padding-bottom: 10px;

			:deep(.arco-table-cell) {
				padding: 7px 16px;
			}
		}
	}
}
</style>
