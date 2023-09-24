<template>
	<div class="circular">
		<div class="circular-content">
			<div class="circular-item left">
				<p class="text">已签收</p>
				<p class="num"><CountNum :num="(dataList.asqs + dataList.csqs) || 0" /></p>
			</div>
			<div class="circular-item center">
				<p class="text">总量</p>
				<p class="num"><CountNum :num="dataList.all || 0" /></p>
			</div>
			<div class="circular-item right">
				<p class="text">未签收</p>
				<p class="num"><CountNum :num="dataList.wqs || 0" /></p>
			</div>
		</div>
		<!-- <Instruct :showType="showType" @btnClick="setType" /> -->
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

// const props = defineProps({
// showType: {
// 	type: Number,
// 	default: 1
// }
// })

const props = defineProps({
	dataList: {
		type: [Object, Array],
		default: {}
	}
})

const showType = ref(1);
const emit = defineEmits(['btnClick']);
const setType = (type: number) => {
	showType.value = type;
	emit('btnClick', type)
}
</script>

<style lang="scss" scoped>
.circular {
	padding-top: 40px;
	.circular-content {
		display: flex;
		justify-content: center;
		width: 434;
		height: 176px;
		margin: 0 auto;
		padding-top: 50px;
		background: url('../../assets/images/circular.png') center / cover no-repeat;

		.circular-item {
			text-align: center;

			&.center {
				flex: 1;
				margin-top: -50px;
				.text {
					font-size: 30px;
				}
				.num {
					font-size: 40px;
				}
			}

			&.left {
				flex: 0 0 120px;
				margin-left: 10px;
			}

			&.right {
				flex: 0 0 120px;
				margin-left: 5px;
			}

			.text {
				font-size: 20px;
				margin-bottom: 25px;
			}

			.num {
				font-size: 30px;
			}
		}
	}
}
</style>