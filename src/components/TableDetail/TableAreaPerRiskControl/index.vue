<template>
	<div class="detail-table" :style="{height: height + 'px'}">
		<div class="detail-table-container">
			<a-table :columns="columns" :data="dataList" :bordered="false" hoverable :pagination="false" />
		</div>
	</div>
</template>

<script setup lang="ts">

const props = defineProps({
	dataList: {
		type: Array<any[]>,
		default: []
	},
	width: {
		type: Number,
		default: 560
	},
	height: {
		type: Number,
		default: 400
	}
})

const columns: any = [
	{ title: '序号', dataIndex: 'no', align: 'center' },
	{
		title: '派出所', dataIndex: 'gkzrdwName',
		align: 'center',
		// ellipsis: true,
		// sortable: {
		// 	sortDirections: ['ascend', 'descend'],
		// },
	},
	{
		title: '数量（件）', dataIndex: 'number',
		align: 'center',
		tooltip: { position: 'left' },
	},
	{ title: '百分比（%）', dataIndex: 'percentage', align: 'center', },
];

</script>

<style lang="scss" scoped>
.detail-table {
	height: 100%;
	width: 100%;
	padding: 10px 10px 0 10px;

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
		height: 100%;

		.arco-table {
			height: 100%;
			padding-bottom: 10px;
		}
	}
}
</style>
