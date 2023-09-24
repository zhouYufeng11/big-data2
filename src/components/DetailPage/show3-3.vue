<template>
	<div class="detail-wrap">
		<TableFixQW 
			:pageSize="pageSize"
			:tableList="tableList"
			:tableTotal="tableTotal"
			:columns="columns"
      :sbNameList="sbNameList"
      :pcsNameList="pcsNameList"
			@searchData="searchData"
			@resetData="resetData" 
			@pageChange="pageChange"
		/>
	</div>
</template>

<script setup lang="ts">
	import { Message } from '@arco-design/web-vue';
	import { ref } from 'vue';
	//	组件
	import TableFixQW from '@/components/TableDetail/TableFixQW/index.vue';
	//  接口
	import { ajxxList, deviceList } from '@/api/index';
	import { dic_pcsList, dic_interface } from '@/api/dic';
	import { onMounted } from 'vue';


	//	盯警详情配置 - 分页
	const pageNum = ref(1),
				pageSize = ref(12);

	//	数据接收
	const tableTotal: any = ref(0),
				tableList: any = ref([]),
				sbNameList: any = ref([]),  // 设备列表
				pcsNameList: any = ref([]); // 派出所列表


	const searchData = (opt: any = {}) => {
		fetchData(opt);
	}

	const resetData = (opt: any = {}) => {
		fetchData(opt);
	}

	const pageChange = (opt: any = {}) => {
		fetchData(opt);
	}


	const fetchData = async (opt: any = {}) => {
		deviceList(opt).then((res: any) => {
			if (res.code === 200) {
				tableTotal.value = res.total;
				tableList.value = res.rows.map((s: any, i: number) => {
					s.no = i + 1;
					return s;
				});
			} else {
				Message.error(res.msg)
			}
		}).catch(err => {
			console.log(err)
		})
	}

	const fetchDicData = async () => {
    //	获取派出所名称
		dic_pcsList().then((res: any) => {
			if (res.code === 200) {
				pcsNameList.value = [
        { name: '全部', organCode: ''},
					...res.rows.map((s: any) => {
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

    //	获取在线设备类型
		dic_interface({dictType: 'ga_zdlx'}).then((res: any) => {
			if (res.code === 200) {
				sbNameList.value = [
					{ dictLabel: '全部', dictValue: ''},
					...res.data.map((s: any) => {
            s.dictValue = s.dictLabel;
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
		//	盯警列表数据
		fetchData({
			pageNum: pageNum.value,
			pageSize: pageSize.value
		})
		//	处置状态
		fetchDicData();
	})


	const columns: any = [
		{ title: '序号', dataIndex: 'no', width: 80 },
    { title: '单位名称', dataIndex: 'dwmc' },
    { title: '姓名', dataIndex: 'xm', },
    { title: '设备名称', dataIndex: 'zdlx'}
	];

</script>

<style lang="scss" scoped>
.detail-wrap {
	height: 100%;
	width: 100%;
}
</style>