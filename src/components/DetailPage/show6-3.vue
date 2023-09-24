<template>
	<div class="detail-wrap">
		<TableFix
			:pageSize="pageSize"
			:tableList="tableList"
			:tableTotal="tableTotal"
			:columns="columns"
			@pageChange="pageChange"
		>
			<template #form>
				<a-form :model="form" auto-label-width>
					<a-space size="medium" align="baseline">
						<a-form-item field="zpsj" label="日期">
							<a-date-picker value-format="YYYYMMDD" v-model="form.zpsj" style="width: 200px;" @change="onTimePickerChange" />
						</a-form-item>
						<a-form-item field="sensorCategory" label="抓拍设备">
							<a-select v-model="form.sensorCategory" placeholder="请选择抓拍设备" :style="{ width: '150px' }">
								<a-option v-for="item of zpsbDicList" :value="item.dictValue" :label="item.dictLabel" />
							</a-select>
						</a-form-item>
						<a-form-item field="zpType" label="抓拍类型">
							<a-select v-model="form.zpType" placeholder="请选择抓拍设备" :style="{ width: '150px' }">
								<a-option v-for="item of zpztDicList" :value="item.dictValue" :label="item.dictLabel" />
							</a-select>
						</a-form-item>
						<a-form-item field="orgName" label="所属组织">
							<a-input v-model="form.orgName" allow-clear placeholder="请输入所属组织" />
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
			</template>
		</TableFix>
	</div>
</template>

<script setup lang="ts">
	import { Message } from '@arco-design/web-vue';
	import { ref, reactive, computed, onMounted } from 'vue';
	//	组件
	import TableFix from '@/components/TableDetail/TableFix/index.vue';
	//  接口
	import { gzList } from '@/api/index';
	import { mainStore } from '@/store';

	import { zpsbDicList ,useZpsbDicList } from './hooks/index';
	import { formatDate } from '@/utils';
	


	const zpztDicList: any = ref([
		{ dictLabel: '全部', dictValue: '' },
		{ dictLabel: '已抓拍', dictValue: '1' },
		{ dictLabel: '未抓拍', dictValue: '0' }
	]);

	const store: any = mainStore();

	//	盯警详情配置 - 分页
	const pageNum = ref(1),
				pageSize = ref(12);

	//	数据接收
	const tableTotal = ref(0),
				tableList = ref([]);

	const form: any = reactive({
		zpsj: '', //	抓拍时间
		zpType: '1',	//	抓拍类型
		sensorCategory: '', // 抓拍设备,
		orgName: '',	// 所属组织
	});

	//	配置项参数
	const option = computed(() => {
		return {
			pageNum: pageNum.value,
			pageSize: pageSize.value,
			zpsj: form.zpsj ? form.zpsj : formatDate(1),
			zpType: form.zpType,
			sensorCategory: form.sensorCategory,
			orgName: form.orgName
		}
	});

	/**
	 * @deprecated 自定义事件
	 * @param searchData 点击搜索按钮，触发事件
	 * @param resetData  点击重置按钮，触发事件
	 * @param  pageChange 点击分页，切换页面
	*/

	const searchData = () => {
		pageNum.value = 1;
		fetchData(option.value);
	}

	const resetData = () => {
		form.zpsj = '', //	抓拍时间
		form.zpType = '',	//	抓拍类型
		form.sensorCategory = '', // 抓拍设备,
		form.orgName = '',	// 所属组织

			pageNum.value = 1;	//	回到第一页

		fetchData(option.value);
	}

	const pageChange = (data: any) => {
		pageNum.value = data;
		fetchData(option.value);
	}

	const fetchData = async (opt: any = {zpsj: formatDate(1), pageNum: pageNum.value, pageSize: pageSize.value, zpType: '1'}) => {
		gzList(opt).then((res: any) => {
			if (res.code === 200) {
				tableTotal.value = res.total;
				tableList.value = res.rows.map((s: any, i: number) => {
					s.no = i + 1;
					s.zpStatus = s.zpType == 1 ? '已抓拍' : '未抓拍';
					return s;
				});
			} else {
				Message.error(res.msg)
			}
		}).catch(err => {
			console.log(err)
		})
	}

		//	修改日期
		const onTimePickerChange = (data: any = ['', '']) => {
			console.log('ddd', data);
			if(typeof data == 'object') {
				form.selectDate = data[0];
			} else if(typeof data == 'string'){
				form.searchData = data;
			}
		}

	onMounted(async () => {
		//	获取接警状态字典项
		await useZpsbDicList();
		//	盯警列表数据
		fetchData();
	})

	const columns: any = [
		{ title: '序号', dataIndex: 'no', width: 80},
		{ title: '设备名称', dataIndex: 'sensorName', width: 150 },
		{ title: '抓拍类型', dataIndex: 'zpStatus', width: 150 },
		{ title: '所属组织', dataIndex: 'orgName', width: 150 },
		{ title: '平均日抓拍量', dataIndex: 'captureTotalAverage', width: 100},
		{ title: '抓拍总数', dataIndex: 'captureTotal', width: 100 },
	];

</script>

<style lang="scss" scoped>
.detail-wrap {
	height: 100%;
	width: 100%;
}
</style>