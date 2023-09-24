<script setup lang='ts'>
import { type } from 'os';
import { ref } from 'vue';

const props = defineProps({
	showType: {
		type: Number,
		default: 1
	},
	top: {
		type: [ Number, String ],
		default: '240px'
	},
	right: {
		type: [ Number, String ],
		default: '490px'
	}
})

const emit = defineEmits(['btnClick']);
const setType = (type: number) => {
	emit('btnClick', type)
}
</script>

<template>
	<div class="btn-box animate__animated animate__fadeInDown animate__delay-1s" :style="{top, right}">
		<button type="button" class="btn" :class="[showType === 1 && 'active']" @click="setType(1)">日</button>
		<button type="button" class="btn" :class="[showType === 2 && 'active']" @click="setType(2)">周</button>
		<button type="button" class="btn" :class="[showType === 3 && 'active']" @click="setType(3)">月</button>
	</div>
</template>

<style lang="scss" scoped>
.btn-box {
	position: fixed;

	.btn {
		width: 40px;
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