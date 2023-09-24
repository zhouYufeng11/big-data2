<template>
	<div class="detail-table">
		<div class="detail-filter">
			<p class="detail-filter-btn" :class="[v.active && 'active']" v-for="v in filterTypeList">{{ v.text }}</p>
		</div>
		<div class="detail-table-container">
			<a-table :columns="columns" :data="data.filter((item, index) => index < 6)" :bordered="false" hoverable :pagination="{
				current: current,
				total: total,
				size: 'large',
				showTotal: true,
				showJumper: true,
				showPageSize: true,
				pageItemStyle: {},
				activePageItemStyle: {},
			}" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';

const props = defineProps({
	list: {
		type: Array<{ bjnr: string, cjbsMc: string }>,
		default: []
	},
	width: {
		type: Number,
		default: 750
	},
	height: {
		type: Number,
		default: 690
	}
})

const current = ref(1);
const total = ref(500);

const filterTypeList = [
	{ text: '全部', value: '', active: true },
	{ text: '涉稳', value: 1, active: false },
	{ text: '涉军', value: 2, active: false },
	{ text: '涉警', value: 3, active: false },
];

const columns: any = [
	{
		title: '序号', dataIndex: 'key',
		sortable: {
			sortDirections: ['ascend', 'descend'],
		},
		width: 80,
	},
	{
		title: '人员', dataIndex: 'name',
		sortable: {
			sortDirections: ['ascend', 'descend'],
		},
		width: 80,
	},
	{
		title: '类型', dataIndex: 'kind',
		sortable: {
			sortDirections: ['ascend', 'descend'],
		},
		width: 80,
	},
	{ title: '细节', dataIndex: 'detail', width: 100, },
	{ title: '反应诉求', dataIndex: 'appeal', width: 150, },
	{
		title: '所属辖区', dataIndex: 'area',
		sortable: {
			sortDirections: ['ascend', 'descend'],
		},
		width: 120,
	},
	{ title: '管控民警', dataIndex: 'menage', width: 150, },
];

const data = [{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
{
	key: '1',
	name: '王某某',
	kind: '类型',
	detail: '类型',
	appeal: '诉求信息',
	area: '兴泰所',
	menage: '王某某',
},
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
			width: 160px;
			height: 35px;
			line-height: 35px;
			text-align: center;
			color: #fff;
			cursor: pointer;
			font-size: 20px;
			margin-right: 23px;
			margin-bottom: 10px;
			background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.20) 49%, rgba(9, 157, 254, 0.00));
			border: 1px solid;
			border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.35) 52%, rgba(255, 255, 255, 0.00)) 1 1;
			box-shadow: 0px 0px 11px 0px rgba(0, 22, 133, 0.24);

			&:nth-child(4n) {
				margin-right: 0;
			}

			&:nth-child(n + 4) {
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
	}
}
</style>
