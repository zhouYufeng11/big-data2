<template>
	<div class="showContent">
		<div class="block">
			<div class="info">
				<p class="left">类型：</p>
				<p class="right">{{ stateObj.typeName }}</p>
			</div>
			<div class="info">
				<p class="left">时间：</p>
				<p class="right">{{ stateObj.time }}</p>
			</div>
			<div class="info">
				<p class="left">接警人：</p>
				<p class="right">{{ stateObj.name }}</p>
			</div>
		</div>
		<div class="block">
			<div class="info">
				<p class="left">内容：</p>
				<p class="right">{{ stateObj.content }}</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { mainStore } from "@/store/index"

// 状态
const store = mainStore()
const stateObj = ref(store.$state.showContent)

const props = defineProps({
	// width: {
	// 	type: [Number, String],
	// 	default: '70%'
	// },
	// height: {
	// 	type: [Number, String],
	// 	default: '80%'
	// }
})

</script>

<style lang="scss" scoped>
.showContent {
	width: 100%;
	height: 500px;
	overflow: auto;
	.block {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-bottom: 20px;
	}

	.info {
		flex: 1;
		display: flex;
		height: 40px;

		p {
			height: 40px;
			line-height: 40px;
			font-size: 23px;
			text-align: left;
		}

		.left {
			flex: 0 0 100px;
		}

		.right {
			flex: 1;
		}
	}

}
</style>