<template>
	<div class="detail-pannel" :style="{ height: height + 'px', width: width + 'px' }">
		<div class="detail-pannel-wrap" :style="{ height: height - 40 + 'px', width: width + 'px' }">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	width: {
		type: [Number, String],
		default: 560
	},
	height: {
		type: [Number, String],
		default: 305
	},
})


</script>

<style lang="scss" scoped>
.detail-pannel {
	position: relative;
	margin-bottom: 30px;
	width: 100%;
	height: 100%;
	border: 1px solid #71a8db;

	.detail-pannel-title {
		height: 40px;
		line-height: 40px;
		width: 100%;
		text-align: center;
		color: #fff;
		font-size: 20px;
		background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.50) 49%, rgba(9, 157, 254, 0.00));
		border: 1px solid;
		border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), #ffffff 52%, rgba(255, 255, 255, 0.00)) 1 1;
		box-shadow: 0px 0px 11px 0px rgba(0, 22, 133, 0.24);
	}

	.detail-pannel-wrap {
		position: relative;
	}
}
</style>