<template>
	<div class="detail-wrap">
		 
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { jjxxStatisticsByType, jjxxTendency, jjxxList } from '@/api/index';
import { Message } from '@arco-design/web-vue';

// 警情趋势 - 折线图
const lineCategoryName: any = ref([]);
const lineCategoryXAxisData: any = ref([]);
const lineCategoryYAxisData: any = ref([]);
const fetchData = async () => {
	return await jjxxTendency({ }).then((res: any) => {
		if (res.code === 200) {
			let nameList: any = [];
			let xAxisData: any = [];
			let yAxisData: any = [];
			res.rows.forEach((s: any) => {
				nameList.push(s.groupKeyName);
				yAxisData.push(s.groupList.map((v: any, i: number) => {
					if (i === 0) {
						xAxisData.push(v.dateKey);
					}
					return v.groupValue
				}));
			});
			lineCategoryName.value = nameList;
			lineCategoryXAxisData.value = xAxisData;
			lineCategoryYAxisData.value = yAxisData;
		} else {
			Message.error(res.msg)
		}
	}).catch(err => {
		console.log(err)
	})
}

onMounted(() => {
	// fetchData();
})
</script>
<style lang="scss" scoped>
.detail-wrap {
	display: flex;

	.detail-left {
		margin-right: 30px;
	}
}
</style>