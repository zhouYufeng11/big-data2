<template>
	<div class="btn-box">
		<button type="button" class="btn" :class="[showType === 1 && 'active']" @click="setType(1)">指令执行</button>
		<button type="button" class="btn" :class="[showType === 2 && 'active']" @click="setType(2)">通报情况</button>
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps({
	showType: {
		type: Number,
		default: 1
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
.btn-box {
	position: absolute;
	top: 20px;
	right: 20px;

	.btn {
		width: 80px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		font-size: 14px;
		border: 1px solid #0c81ff;
		background: transparent;
		color: #0c81ff;

		&.active,
		&:hover {
			background: rgba(0, 100, 255, .4);
			color: #fff;
		}
	}
}
</style>