<template>
	<div class="detail-table">
		<div class="detail-filter">
			<a-form :model="form" auto-label-width>
				<a-space size="medium" align="baseline">
					<a-form-item field="startTime" label="日期">
						<a-range-picker v-model="pickerValue" format="YYYY-MM-DD" @change="onTimePickerChange" />
					</a-form-item>
					<a-form-item field="unit" label="受理单位">
            <a-select v-model="form.unit" placeholder="请选择单位" :style="{ width: '150px' }">
              <a-option v-for="item of pcsNameList" :value="item.groupKey" :label="item.groupKeyName" />
            </a-select>
          </a-form-item>
					<a-form-item field="content" label="案件内容">
						<a-input v-model="form.content" allow-clear placeholder="请输入内容" />
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
</template>, mergeProps

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { type } from 'os';

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
	statusList: {
		type: Array,
		default: []
	},
	levelList: {
		type: Array,
		default: []
	},
	columns: {
		type: Array,
		default: []
	},
	isShowLevel: {
		type: Boolean,
		default: true
	},
	unitList: {
		type: Array,
		default: []
	},
	pcsNameList: {
		type: Array,
		default: []
	}
})



// 警情列表 - 表格
const pageNum: any = ref(1);;
const pickerValue: any = ref([]);
const form: any = reactive({
	startTime: '',
  endTime: '',
  content: '',
  unit: '',
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
    basjBegin: form.startTime,
    basjEnd: form.endTime,
    jyaq: form.content, // 简要案情
    sldw: form.unit, // 受理单位
	}

	emit('searchData', opt);
}

const resetData = () => {
	pageNum.value = 1;	//  让其显示第一页
	pickerValue.value = [];
	form.startTime = '';
	form.endTime = '';
	form.content = '';
	form.status = '';
	form.unit = '';

	const opt = {
		pageNum: pageNum.value,
    pageSize: props.pageSize,
    basjBegin: form.startTime,
    basjEnd: form.endTime,
    jyaq: form.content, // 简要案情
    sldw: form.unit, // 受理单位
	}

	emit('resetData', opt);
}

const pageChange = (data: number) => {
	pageNum.value = data;

	const opt = {
		pageNum: pageNum.value,
    pageSize: props.pageSize,
    basjBegin: form.startTime,
    basjEnd: form.endTime,
    jyaq: form.content, // 简要案情
    sldw: form.unit, // 受理单位
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

