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
							<a-form-item field="startTime" label="下发时间" label-col-flex="60px">
								<a-range-picker v-model="pickerValue1" format="YYYY-MM-DD" @change="onTimePickerChange1" />
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item field="content" label="指令标题" label-col-flex="60px">
								<a-input v-model="form.zlbt" allow-clear placeholder="请输入指令标题" :style="{ width: '200px' }" />
							</a-form-item>	
						</a-col>
						<a-col :span="4">
							<a-form-item field="qsbs" label="签收状态" label-col-flex="60px">
								<a-select v-model="form.qsbs" placeholder="请选择签收状态" :style="{ width: '200px' }">
									<a-option v-for="(s, i) of qsztDicList" :value="s.dictValue" :label="s.dictLabel" />
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="20">
						<a-col :span="8">
							<a-form-item field="startTime" label="签收时间" label-col-flex="60px">
								<a-range-picker v-model="pickerValue2" format="YYYY-MM-DD" @change="onTimePickerChange2" />
							</a-form-item>
						</a-col>
						<a-col :span="6">
							<a-form-item field="qsdwDicttext" label="签收单位" label-col-flex="60px">
								<a-input v-model="form.qsdwDicttext" allow-clear placeholder="请输入签收单位" :style="{ width: '200px' }" />
							</a-form-item>	
						</a-col>
						<a-col :span="4">
							<a-form-item field="qsrDicttext" label="签收人" label-col-flex="60px">
								<a-input v-model="form.qsrDicttext" allow-clear placeholder="请输入签收人" :style="{ width: '150px' }" />
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
	import { ref, reactive, computed } from 'vue';
	//	组件
	import TableFixTowRow from '@/components/TableDetail/TableFixTowRow/index.vue';
	//  接口
	import { zlList } from '@/api/index';
	import { onMounted } from 'vue';
import { dic_interface } from '@/api/dic';

	import { qsztDicList, useQsztDicList } from './hooks/index';
	

	// 分页
	const pageNum = ref(1),
				pageSize = ref(10),
				tableTotal = ref(0),
				tableList = ref([]);

	//	from 表单数据
	const pickerValue1: any = ref([]);
	const pickerValue2: any = ref([]);

	const form: any = reactive({
		xfsjBegin: '',		// 下发开始时间
		xfsjEnd: '',			// 下发结束时间
		qssjDicttextBegin: '',	//	签收开始时间
		qssjDicttextEnd: '',    //  签收结束时间
		zlbt: '',					//  签收标题
		qsrDicttext: '',	//  签收人
		qsbs: '', //	签收状态
		qsdwDicttext: ''  //	签收单位
	});

	//	配置项参数
	const option = computed(() => {
		return {
			pageNum: pageNum.value,
			pageSize: pageSize.value,
			xfsjBegin: form.xfsjBegin,		// 下发开始时间
			xfsjEnd: form.xfsjEnd,		// 下发结束时间
			qssjDicttextBegin: form.qssjDicttextBegin,	//	签收开始时间
			qssjDicttextEnd: form.qssjDicttextEnd,   //  签收结束时间
			zlbt: form.zlbt,					//  签收标题
			qsrDicttext: form.qsrDicttext,	//  签收人
			qsbs: form.qsbs, //	签收状态
			qsdwDicttext: form.qsdwDicttext, //	签收单位
		}
	});

		//	修改日期

 	const onTimePickerChange1 = (data: any = ['', '']) => {
		form.xfsjBegin = data[0];
		form.xfsjEnd = data[1];
	}
	const onTimePickerChange2 = (data: any = ['', '']) => {
		form.qssjDicttextBegin = data[0];
		form.qssjDicttextEnd = data[1];
	}

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
		pickerValue1.value = [];
		pickerValue2.value = [];
		form.xfsjBegin = '',		// 下发开始时间
		form.xfsjEnd = '',		// 下发结束时间
		form.qssjDicttextBegin = '',	//	签收开始时间
		form.qssjDicttextEnd = '',   //  签收结束时间
		form.zlbt = '',					//  签收标题
		form.qsrDicttext = '',	//  签收人
		form.qsbs = '', //	签收状态
		form.qsdwDicttext = '', //	签收单位

		pageNum.value = 1;	//	回到第一页

		fetchData(option.value);
	}

	const pageChange = (data: any = {}) => {
		pageNum.value = data;
		fetchData(option.value);
	}

	const fetchData = async (opt: any) => {

		zlList(opt).then((res: any) => {
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

	onMounted(() => {
		//	签收状态
		useQsztDicList();
		//	盯警列表数据
		fetchData({
			pageNum: pageNum.value,
			pageSize: pageSize.value
		});
	})

	const columns: any = [
		{ title: '序号', dataIndex: 'no', width: 80, align: 'center', },
		{ title: '下发时间', dataIndex: 'xfsj', width: 300 },
		{ title: '指令标题', dataIndex: 'zlbt',  ellipsis: true, tooltip: { position: 'left' } },
		{
			title: '签收标识', dataIndex: 'qsbsDicttext', width: 120, ellipsis: true,
			tooltip: { position: 'left' },
		},
		{
			title: '签收单位', dataIndex: 'qsdwDicttext', width: 150, ellipsis: true,
			tooltip: { position: 'left' },
		},
		{ title: '签收时间', dataIndex: 'qssjDicttext', width: 300 },
		{ title: '签收人', dataIndex: 'qsrDicttext', width: 100 },
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