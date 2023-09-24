<template>
	<div class="detail-table">
		<div class="detail-table-container">
			<a-table :columns="columns" :data="dataList" :bordered="false" hoverable @page-change="pageChange" :pagination="{
				current: current,
				total: tableTotal,
				size: 'large',
				pageSize: pageSize,
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
	},
	tableTotal: {
		type: Number,
		default: 0
	},
	pageSize: {
		type: Number,
		default: 12
	},
	columns: {
		type: Array,
		default: []
	}
})
const emit = defineEmits(['setPage', 'setType'])

const current = ref(1);
const pageChange = (data: number) => {
	current.value = data;
	emit('setPage', data);
}
const typeChange = (data: string, index: number) => {
	emit('setType', data);
}

const fetchData = async () => {
	return await dic_pcsList({}).then((res: any) => {
		if (res.code === 200) {
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

onMounted(() => {
	fetchData();
});

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
		height: calc(100% - 0px);

		.arco-table {
			height: 100%;
			padding-bottom: 10px;
		}
	}
}
</style>
