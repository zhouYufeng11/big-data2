<template>
	<div class="detail-table">
		<div class="detail-filter">
			<a-form :model="formData" auto-label-width>
				<a-space size="medium" align="baseline">
					<a-form-item field="scsj" label="上传日期">
						<a-date-picker v-model="scsj" format="YYYY-MM-DD" />
					</a-form-item>
					<a-form-item field="urlName" label="文件名称">
						<a-input v-model="urlName" allow-clear placeholder="请输入内容" />
					</a-form-item>
					<a-space size="medium" align="baseline">
						<a-button type="primary" @click="fetchData">
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
			<a-table :columns="fileColumns" :data="fileList" :bordered="false" hoverable @page-change="pageChange"
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
				<template #view="{ record }">
					<a-button type="primary" ghost @click="showFile(record)">预览</a-button>
				</template>
			</a-table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { zyqwInfoList } from '@/api/index';

const emit = defineEmits(['showFile'])

const showFile = (obj: any) => {
	emit('showFile', obj.wjlx, obj.url)
}
// 重要勤务-文件列表
const pageNum: any = ref(1);
const pageSize: any = ref(12);
const tableTotal: any = ref(0);
const scsj: any = ref('');
const urlName: any = ref('');
const formData = {};

const fileColumns: any = ref([
	{ title: '标题', dataIndex: 'urlName', align: 'left', },
	{ title: '日期', dataIndex: 'scsj', width: 150, align: 'right' },
	{ title: '预览', slotName: 'view', width: 100, align: 'center', },
]);
const fileList: any = ref([]);
const filePrefix = import.meta.env.VITE_APP_API.slice(0, -1);
const fetchData = () => {
	zyqwInfoList({
		pageNum: pageNum.value,
		pageSize: pageSize.value,
		scsj: scsj.value,
		urlName: urlName.value
	}).then((res: any) => {
		if (res.code === 200) {
			tableTotal.value = res.total;
			fileList.value = res.rows.map((s: any) => {
				s.url = filePrefix + s.url;
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

const resetData = () => {
	scsj.value = '';
	urlName.value = '';
	fetchData();
}

onMounted(() => {
	fetchData();
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
		height: 100%;

		.arco-table {
			height: 100%;
			padding-bottom: 10px;

			:deep(.arco-table-cell) {}
		}
	}
}
</style>

