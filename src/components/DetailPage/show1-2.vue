<template>
	<div class="detail-wrap">
		<TableFixTowRow 
			:pageSize="pageSize"
			:tableList="tableList"
			:tableTotal="tableTotal"
			:columns="columns"
			@pageChange="pageChange"
		>
			<template #form>
				<a-form :model="form">
					<a-row :gutter="20">
						<a-col :span="8">
							<a-form-item field="startTime" label="日期">
								<a-range-picker v-model="pickerValue" format="YYYY-MM-DD" @change="onTimePickerChange" />
							</a-form-item>
						</a-col>
						<a-col :span="5">
							<a-form-item field="jjdw" label="单位名称" label-col-flex="60px">
								<a-select ref="jjdwSelect" v-model="form.jjdw" placeholder="请选择单位名称" :style="{ width: '150px' }">
									<a-option v-for="item of pcsDicList" :value="item.groupKey" :label="item.groupKeyName" />
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="5">
							<a-form-item field="status" label="处置状态" label-col-flex="60px">
								<a-select v-model="form.status" placeholder="请选择状态" :style="{ width: '150px' }">
									<a-option v-for="item of statuslDicList" :value="item.dictValue" :label="item.dictLabel" />
								</a-select>
							</a-form-item>
						</a-col>
						<a-col :span="5">
							<a-form-item field="jjdfl" label="警情类型" label-col-flex="60px">
								<a-select v-model="form.jjdfl" placeholder="请选择类型" :style="{ width: '150px' }">
									<a-option v-for="item of jjdflDicList" :value="item.dictValue" :label="item.dictLabel" />
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="20">
						<a-col :span="8">
							<a-form-item field="content" label="警情内容">
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


				<!-- <a-form :model="form" auto-label-width>
					<a-space size="medium" align="baseline">
						<a-form-item field="startTime" label="日期">
							<a-range-picker v-model="pickerValue" format="YYYY-MM-DD" @change="onTimePickerChange" />
						</a-form-item>
						<a-form-item field="status" label="处置状态">
							<a-select v-model="form.status" placeholder="请选择状态" :style="{ width: '150px' }">
								<a-option v-for="item of statuslDicList" :value="item.dictValue" :label="item.dictLabel" />
							</a-select>
						</a-form-item>
						<a-form-item field="jjdfl" label="警情类型">
							<a-select v-model="form.jjdfl" placeholder="请选择类型" :style="{ width: '150px' }">
								<a-option v-for="item of jjdflDicList" :value="item.dictValue" :label="item.dictLabel" />
							</a-select>
						</a-form-item>
						<a-form-item field="jjdw" label="单位名称">
							<a-select ref="jjdwSelect" v-model="form.jjdw" placeholder="请选择单位名称" :style="{ width: '150px' }">
								<a-option v-for="item of pcsDicList" :value="item.groupKey" :label="item.groupKeyName" />
							</a-select>
						</a-form-item>
						<a-form-item field="content" label="警情内容">
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
				</a-form> -->
			</template>
		</TableFixTowRow>
	</div>
</template>

<script setup lang="ts">
	import { Message } from '@arco-design/web-vue';
	import { ref, reactive, computed } from 'vue';
	//	组件
	import TableFixTowRow from '@/components/TableDetail/TableFixTowRow/index.vue';
	//  接口
	import { jjxxList } from '@/api/index';
	import { onMounted } from 'vue';
	import { mainStore } from '@/store';

//	hooks
	import { 
		pcsDicList, 
		usePcsDicList,
		levelDicList,
		useLevelDicList,
		statuslDicList,
		useStatusDicList,
		jjdflDicList,
		usejjdflDicList
	} from './hooks';
import { time } from 'console';

	const store: any = mainStore();

	//	盯警详情配置 - 分页
	const pageNum = ref(1),
				pageSize = ref(12);

	//	数据接收
	const tableTotal = ref(0),
				tableList = ref([]),
				levelList = ref([]),
				statusList = ref([]);

	//	from 表单数据
	const pickerValue: any = ref([]);
	const form: any = reactive({
		startTime: '',
		endTime: '',
		status: '',
		content: '',
		level: '',
		jjdw: '',
		jjdfl: ''
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
			jjdw: form.jjdw,
			jjdfl: form.jjdfl
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
			form.jjdw = '';
			form.jjdfl = '';

			pageNum.value = 1;	//	回到第一页

		fetchData(option.value);
	}

	const pageChange = (data: any) => {
		pageNum.value = data;
		fetchData(option.value);
	}

	//	初始化选择
	const initSelectPcs = (value: any = {}) => {
		pcsDicList.value.forEach((s: any) => {
			if(value == s.organCode) {
				form.jjdw = s.groupKey;
			} else if ( value == s.oldOrgCode ) {
				form.jjdw = s.groupKey;
			}		
		})
	}

	//	设置时间
	const initSelectDate = (startTime: any, endTime: any) => {
		pickerValue.value = [startTime, endTime];
		form.startTime = startTime;
		form.endTime = endTime;
	}

	const initSelectKind = (value: any = {}) => {
		form.jjdfl = value;
	}

	const fetchData = async (opt: any) => {
		let { key, value, value2, date } = store.pageMsg;

		if(value) {	//	判断value值是否存在
			const { startTime, endTime } = date;
			if( key == 'pcs' ) {
				opt = { pageNum: 1, pageSize: pageSize.value, jjdw: value, bjdhsjBegin: startTime, bjdhsjEnd: endTime };
				initSelectPcs(value);
				initSelectDate(startTime, endTime);
			} else if( key == 'kind' ) {
				opt = { pageNum: 1, pageSize: pageSize.value, jjdfl: value, jjdw: value2, bjdhsjBegin: startTime, bjdhsjEnd: endTime };
				initSelectKind(value);
				initSelectPcs(value2);
				initSelectDate(startTime, endTime);
			}

 			//	在第一请求的时候初始化 数据筛选 配置项，并清空配置项
			store.setpageMsg({});
		}

		jjxxList(opt).then((res: any) => {
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

		//	修改日期
		const onTimePickerChange = (data: any = ['', '']) => {
			form.startTime = data[0];
			form.endTime = data[1];
		}

	onMounted(async () => {
		//	处置状态字典项列表
		useStatusDicList();
		//  优先等级字典项列表
		useLevelDicList();
		//	获取派出所字典项列表
		await usePcsDicList();
		//	获取接警状态字典项
		await usejjdflDicList();

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
			title: '时间', dataIndex: 'bjdhsj', width: 150,
		},
		{
			title: '报警内容', dataIndex: 'bjnr', ellipsis: true,
			tooltip: { position: 'left' },
		},
		{ title: '处置状态', slotName: 'status', width: 100, align: 'center', },
	];

</script>

<style lang="scss" scoped>
.detail-wrap {
	height: 100%;
	width: 100%;
}
</style>