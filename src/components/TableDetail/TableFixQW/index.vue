<template>
	<div class="detail-table">
		<div class="detail-filter">
			<a-form :model="form" auto-label-width>
				<a-space size="medium" align="baseline">
					<a-form-item field="dwdm" label="单位代码">
						<a-select v-model="form.dwdm" placeholder="请选择派出所" :style="{ width: '150px' }">
							<a-option v-for="item of pcsNameList" :value="item.organCode" :label="item.name" />
						</a-select>
					</a-form-item>
					<a-form-item field="zdlx" label="终端类型">
						<a-select v-model="form.zdlx" placeholder="请选择终端类型" :style="{ width: '150px' }">
							<a-option v-for="item of sbNameList" :value="item.dictValue" :label="item.dictLabel" />
						</a-select>
					</a-form-item>
					<a-space size="medium" align="baseline">
						<a-button type="primary" @click="searchData">
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
				<template #djdj="{ record }">
					<span :class="showLeave(record.djdj)">{{ record.djLevel }}</span>
				</template>
				<template #status="{ record }">
					<span :class="showStatus(record.cjbs)">{{ record.cjbsMc }}</span>
				</template>
			</a-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

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
	pcsNameList: {
		type: Array,
		default: []
	},
	sbNameList: {
		type: Array,
		default: []
	}
})



// 警情列表 - 表格
const pageNum: any = ref(1);;
const pickerValue: any = ref([]);
const form: any = reactive({
	dwdm: '',
	zdlx: ''
});


/**
 * @deprecated 自定义事件
 * @param searchData 点击搜索按钮，触发事件
 * @param resetData  点击重置按钮，触发事件
 * @param  pageChange 点击分页，切换页面
*/
const emit = defineEmits(['searchData', 'resetData', 'pageChange']);
const searchData = () => {
	pageNum.value = 1;	//  让其显示第一页

	const opt = {
		pageNum: pageNum.value,
		pageSize: props.pageSize,
		dwdm: form.dwdm,
		zdlx: form.zdlx
	}

	emit('searchData', opt);
}

const resetData = () => {
	pageNum.value = 1;	//  让其显示第一页
	pickerValue.value = [];
	form.dwdm = '';
	form.zdlx = '';

	const opt = {
		pageNum: pageNum.value,
		pageSize: props.pageSize,
		dwdm: form.dwdm,
		zdlx: form.zdlx
	}

	emit('resetData', opt);
}

const pageChange = (data: number) => {
	pageNum.value = data;

	const opt = {
		pageNum: pageNum.value,
		pageSize: props.pageSize,
		dwdm: form.dwdm,
		zdlx: form.zdlx
	}

	emit('pageChange', opt);
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


const onTimePickerChange = (data: any = ['', '']) => {
	form.startTime = data[0];
	form.endTime = data[1];
}

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

