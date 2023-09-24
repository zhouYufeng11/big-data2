<template>
	<div class="detail-table">
		<div class="detail-filter">
			<slot name="form"></slot>
		</div>
		<div class="detail-table-container">
			<a-table :columns="columns" :data="tableList" :bordered="false" hoverable @page-change="pageChange"
				page-position="bottom" :pagination="{
					current: currentPage,
					pageSize: pageSize,
					total: tableTotal,
					size: 'large',
					showTotal: true,
					showJumper: true,
					showPageSize: false,
					pageItemStyle: {},
					activePageItemStyle: {},
				}">
				<template #bjnr="{ record }">
					<span :class="showLeave(record.djdj)">{{ record.bjnr }}</span>
				</template>
				<template #djdj="{ record }">
					<span :class="showLeave(record.levelValue.value)">{{ record.levelValue.text }}</span>
				</template>
				<template #status="{ record }">
					<span :class="showStatus(record.cjbs)">{{ record.cjbsMc }}</span>
				</template>
			</a-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { mainStore } from '@/store';
import { onMounted } from 'vue';
import { ref, reactive, computed } from 'vue';

const store = mainStore();

const props = defineProps({
	tableList: {
		type: Array,
		default: []
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

const emit = defineEmits(['pageChange']);

const currentPage = ref(1);
const pageChange = (data: number) => {
	currentPage.value = data;
	
	emit('pageChange', data);
}

let showLeave = computed(() => {
	return (djdj: any) => {
		switch(djdj) {
			case 1:
				return 'level-color-1';
			case 2:
				return 'level-color-2';
			case 3:
				return 'level-color-3';
			default: 
			 	return '';
		}
	}
})

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

//	初始化配置项
const initSelect = () => {
	const { code } = store.pageMsg;
	if(code) {
		form.jjdw = code;
	}
}

onMounted(() => {
	//	初始化配置项
	initSelect()
}) 

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
		height: 84%;

		.level-color-1 {
			color: #f09971;
		}

		.level-color-2 {
			color: #a0ae6c;
		}

		.level-color-3 {
			color: #87dded;
		}

		.arco-table {
			height: 100%;
			padding-bottom: 10px;

			:deep(.arco-table-cell) {}
		}
	}
}
</style>

