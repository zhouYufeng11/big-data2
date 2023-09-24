<template>
	<div class="btn-box">
		<button type="button" class="btn" :class="[showType === 1 && 'active']" @click="setType(1)">日</button>
		<button type="button" class="btn" :class="[showType === 2 && 'active']" @click="setType(2)">周</button>
		<button type="button" class="btn" :class="[showType === 3 && 'active']" @click="setType(3)">月</button>
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps({
	showType: {
		type: Number,
		default: 3
	}
})

const emit = defineEmits(['btnClick']);
const setType = (type: number) => {
	emit('btnClick', type)
}
</script>

<style lang="scss" scoped>
.btn-box {
	position: absolute;
	top: 15px;
	right: 200px;

	.btn {
		width: 60px;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 20px;
		border: 1px solid #339FFF;
		background: transparent;
		color: #eee;

		&.active,
		&:hover {
			background: #0970CC;
			color: #fff;
		}
	}
}
</style>