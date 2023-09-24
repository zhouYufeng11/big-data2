<template>
	<div class="detail-wrap">
		<TableFixTowRow 
			:pageSize="pageSize"
			:tableList="tableList"
			:tableTotal="tableTotal"
			:columns="columns"
			:levelList="levelDicList"
			@pageChange="pageChange"
		>
			<template #form>
				<a-form :model="form">
					<a-row :gutter="20">
						<a-col :span="8">
							<a-form-item field="startTime" label="日期" label-col-flex="40px">
								<a-range-picker v-model="pickerValue" format="YYYY-MM-DD" @change="onTimePickerChange" />
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item field="level" label="优先等级" label-col-flex="60px">
								<a-select v-model="form.level" placeholder="请选择优先等级" :style="{ width: '200px' }">
									<a-option v-for="item of levelDicList" :value="item.dictValue" :label="item.dictLabel" />
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item field="status" label="处置状态" label-col-flex="60px">
								<a-select v-model="form.status" placeholder="请选择状态" :style="{ width: '200px' }">
									<a-option v-for="item of statuslDicList" :value="item.dictValue" :label="item.dictLabel" />
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="20">
						<a-col :span="6">
							<a-form-item field="djdw" label="单位名称" label-col-flex="60px">
								<a-select ref="djdwSelect" v-model="form.djdw" placeholder="请选择单位名称" :style="{ width: '200px' }">
									<a-option v-for="item of pcsDicList" :value="item.groupKey" :label="item.groupKeyName" />
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item field="content" label="警情内容" label-col-flex="60px">
								<a-input v-model="form.content" allow-clear placeholder="请输入内容" :style="{ width: '500px' }" />
							</a-form-item>	
						</a-col>
						<a-col :span="5">
							<div class="btn-group">
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
							</div>
						</a-col>
					</a-row>
				</a-form>
			</template>
		</TableFixTowRow>
	</div>
</template>

<script setup lang="ts">
	import { Message } from '@arco-design/web-vue';
	import { ref, reactive, computed, onMounted } from 'vue';
	//	组件
	import TableFix from '@/components/TableDetail/TableFix/index.vue';
	import TableFixTowRow from '@/components/TableDetail/TableFixTowRow/index.vue';
	//  接口
	import { djxxList, jjxxStatisticsByDep } from '@/api/index';
	import { dic_dj_level, dic_jjxx_status } from '@/api/dic';
	import { mainStore } from '@/store';

	//	hooks
	import { 
		pcsDicList, 
		usePcsDicList,
		levelDicList,
		useLevelDicList,
		statuslDicList,
		useStatusDicList
	} from './hooks';

	const store: any = mainStore();

	//	盯警详情配置 - 分页
	const pageNum = ref(1),
				pageSize = ref(10);

	//	数据接收
	const tableTotal = ref(0),
				tableList = ref([]);

	//	from 表单数据
	const pickerValue: any = ref([]);
	const form: any = reactive({
		startTime: '',
		endTime: '',
		status: '',
		content: '',
		level: '',
		djdw: ''
	});

	//	配置项参数
	const option = computed(() => {
		return {
			pageNum: pageNum.value,
			pageSize: pageSize.value,
			bjdhsjBegin: form.startTime,
			bjdhsjEnd: form.endTime,
			cjbs: form.status,
			bjnr: form.content,
			djdj: form.level,
			djdw: form.djdw
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
			pickerValue.value = [];
			form.startTime = '';
			form.endTime = '';
			form.status = '';
			form.content = '';
			form.djdw = '';
			form.level = ''

			pageNum.value = 1;	//	回到第一页

		fetchData(option.value);
	}

	const pageChange = (data: any = {}) => {
		pageNum.value = data;
		fetchData(option.value);
	}

	//	设置时间
	const initSelectDate = (startTime: any, endTime: any) => {
		pickerValue.value = [startTime, endTime];
		form.startTime = startTime;
		form.endTime = endTime;
	}

	//	设置优先等级
	const initSelectLevel = (value: any) => {
		form.level = value;
	}

	//	初始化选择
	const initSelectPcs = (value: any = {}) => {
		console.log('value', value);
		pcsDicList.value.forEach((s: any) => {
			if(value == s.organCode) {
				form.djdw = s.groupKey;
			} else if ( value == s.oldOrgCode ) {
				form.djdw = s.groupKey;
			}		
		})
	}

	const fetchData = async (opt: any) => {
		let { key, value, value1, date } = store.pageMsg;

		if(value) {	//	判断value值是否存在
			const { startTime, endTime } = date;
			if( key == 'pcs' ) {
				opt = { pageNum: 1, pageSize: pageSize.value, djdw: value, bjdhsjBegin: startTime, endTime: endTime };
				initSelectPcs(value);
				initSelectDate(startTime, endTime);
			} else if(key == 'level') {
				opt = { pageNum: 1, pageSize: pageSize.value, djdj: value, djdw: value1, bjdhsjBegin: startTime, endTime: endTime };
				initSelectPcs(value1);
				initSelectDate(startTime, endTime);
				initSelectLevel(value);
			}

 			//	在第一请求的时候初始化 数据筛选 配置项，并清空配置项
			store.setpageMsg({});
		}

		djxxList(opt).then((res: any) => {
			if (res.code === 200) {
				tableTotal.value = res.total;
				tableList.value = res.rows.map((s: any, i: number) => {
					s.no = i + 1;
					s.levelValue = formatLevel(s.djdj);
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
	function onTimePickerChange (data: any = ['', '']) {
		form.startTime = data[0];
		form.endTime = data[1];
	}

	//	处理等级项显示
	function formatLevel(data: any) {
		switch(data) {
			case 1:
				return { value: 1, text: '一级' };
			case 2:
				return { value: 2, text: '二级' };
			case 3: 
				return { value: 3, text: '三级' };
			default: 
				return {value: 0, text: '暂无' };
		}
	}

	onMounted(async () => {
		//	处置状态
		useStatusDicList();
		//  优先等级
		await useLevelDicList();
		//	派出所名字
		await usePcsDicList();

		//	盯警列表数据
		fetchData({
			pageNum: pageNum.value,
			pageSize: pageSize.value
		});
	})

	const columns: any = [
		{ title: '序号', dataIndex: 'no', width: 80, align: 'center', },
		{
			title: '时间', dataIndex: 'bjdhsj',
			// sortable: {
			// 	sortDirections: ['ascend', 'descend'],
			// },
			width: 150,
		},
		{
			title: '报警内容', slotName: 'bjnr', dataIndex: 'bjnr', ellipsis: true,
			tooltip: { position: 'left' },
		},
		{
			title: '优先等级', slotName: 'djdj', dataIndex: 'djdj', width: 120, align: 'center', ellipsis: true,
			tooltip: { position: 'left' },
		},
		{ title: '处置状态', slotName: 'status', dataIndex: 'cjbsMc', width: 100, align: 'center', },
	];

</script>

<style lang="scss" scoped>
.detail-wrap {
	height: 100%;
	width: 100%;

	.top-wrap {
		display: flex;
		justify-content: flex-start;
	}

	.bottom-wrap {
		display: flex;
		justify-content: flex-start;

		.btn-group {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
	}
}
</style>