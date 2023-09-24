<template>
	<div class="detail-table">
		<div class="detail-filter">
			<p class="detail-filter-btn" :class="[v.active && 'active']" @click="typeChange(v.dictValue, i)"
				v-for="(v, i) in filterTypeList" :key="v.dictValue">{{ v.dictLabel }}</p>
		</div>
		<div class="detail-table-container">
			<a-table :columns="columns" :data="dataList" :bordered="false" hoverable @page-change="pageChange" :pagination="{
				current: current,
				total: total,
				size: 'large',
				showTotal: true,
				showJumper: true,
				pageSize: pageSize,
				showPageSize: false,
				pageItemStyle: {},
				activePageItemStyle: {},
			}" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { dic_interface2 } from '@/api/dic';
import { Message } from '@arco-design/web-vue';

const props = defineProps({
	dataList: {
		type: Array,
		default: []
	},
	total: {
		type: [Number, String, Array],
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
	pageSize: {
		type: Number,
		default: 12
	}
})
const emit = defineEmits(['setPage', 'changeType'])
const filterTypeList: any = ref([]);

const current = ref(1);
const pageChange = (data: number) => {
	current.value = data;
	emit('setPage', data);
}
const typeChange = (data: string, index: number) => {
	current.value = 1;	//	切换列表的时候，让其页码回到首页
	
	filterTypeList.value.forEach((s: any, i: number) => {
		if (i === index) {
			s.active = true;
		} else {
			s.active = false;
		}
	});
	emit('changeType', data);
}

//	获取派出所名字
const fetchData = async () => {
	return await dic_interface2('type/jwpt_zrdw').then((res: any) => {
		if (res.code === 200) {
			filterTypeList.value = [
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
});

const columns: any = [
	{ title: '序号', dataIndex: 'xh', width: 10, align: 'center', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '人员', dataIndex: 'xm', width: 16, align: 'center', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '类型', dataIndex: 'rysxName', width: 10, align: 'center', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '细节', dataIndex: 'xlName', width: 20, align: 'center', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '反映诉求', dataIndex: 'fysq', width: 20, align: 'center', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '所属辖区', dataIndex: 'gkzrdwName', width: 20, align: 'center', ellipsis: true,
		tooltip: { position: 'left' },
	},
	{ title: '管控民警', dataIndex: 'gkmj', width: 20, align: 'center', ellipsis: true,
		tooltip: { position: 'left' },
	}
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
		height: calc(100% - 75px);

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
