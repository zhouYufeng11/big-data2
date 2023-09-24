<template>
	<div class="detail-table">
		<div class="detail-filter">
			<slot name="form"></slot>
		</div>
		<div class="detail-table-container">
			<a-table :columns="columns" :data="tableList" :bordered="false" hoverable @page-change="pageChange"
			@change="handleChangeSort"
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
				<template #djdj="{ record }">
					<span :class="showLeave(record.levelValue.value)">{{ record.levelValue.text }}</span>
				</template>
				<template #status="{ record }">
					<span :class="showStatus(record.cjbs)">{{ record.cjbsMc }}</span>
				</template>
				<template #jqsl="{ record }">
					<span>
						{{ record.jqsl }}
						<icon-arrow-up class="upColor" v-if="record.jqDirection === 1"/>
						<icon-arrow-down class="downColor" v-else-if="record.jqDirection === 0"/>
						<!-- <icon-arrow-down v-else-if="record.jqDirection === ''" /> -->
						<span :class="formatText(record.jqDirection)">{{ record.jqhb }}</span>	
					</span>
				</template>
				<template #ajsl="{ record }">
					<span>
						{{ record.ajsl }}
						<icon-arrow-up class="upColor" v-if="record.ajDirection === 1"/>
						<icon-arrow-down class="downColor" v-else-if="record.ajDirection === 0"/>
						<!-- <icon-arrow-down v-else-if="record.ajDirection === ''" /> -->
						<span :class="formatText(record.ajDirection)">{{ record.ajhb }}</span>
					</span>
				</template>
				<template #dzsl="{ record }">
					<span>
						{{ record.dzsl }}
						<icon-arrow-up class="upColor" v-if="record.dzDirection === 1"/>
						<icon-arrow-down class="downColor" v-else-if="record.dzDirection === 0"/>
						<!-- <icon-arrow-down v-else-if="record.dzDirection === ''" /> -->
						<span :class="formatText(record.dzDirection)">{{ record.dzhb }}</span>
					</span>
				</template>
				<template #yqsl="{ record }">
					<span>
						{{ record.yqsl }}
						<icon-arrow-up class="upColor" v-if="record.yqDirection === 1"/>
						<icon-arrow-down class="downColor" v-else-if="record.yqDirection === 0"/>
						<!-- <icon-arrow-down v-else-if="record.yqDirection === ''" /> -->
						<span :class="formatText(record.yqDirection)">{{ record.yqhb }}</span>
					</span>
				</template>
			</a-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { pcsList } from '@/api';
import { mainStore } from '@/store';
import { color } from 'echarts';
import { onMounted } from 'vue';
import { ref, reactive, computed } from 'vue';

const store: any = mainStore();

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
	},
	sortDirection: {
		type: Number,
		default: 0
	}
})

const formatText = (type: any) => {
	console.log(type);
	if( type === 0 ) {
		return 'downColor';	
	} else if( type === 1 ) {
		return 'upColor';
	} else if( type === '' ){
		return '';
	}
}	

const emit = defineEmits(['pageChange', 'changeSort']);

const currentPage = ref(1);
const pageChange = (data: number) => {
	currentPage.value = data;
	
	emit('pageChange', data);
}

let showLeave = computed(() => {
	return (djdj: any) => {
		switch(djdj) {
			case 1:
				return 'redText';
			case 2:
				return 'orangeText';
			case 3:
				return 'blueText'
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

const handleChangeSort = (data: any, extra: any, currentDataSource: any) => {
	emit('changeSort', extra);
}


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
	.downColor {
		color: #f73131;
	}

	.upColor {
		color: #0ebe98;
	}



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

