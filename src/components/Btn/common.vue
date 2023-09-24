<template>
	<div class="btn-box">
		<button type="button" v-for="(s, i) of dataList" class="btn" :class="[showType === i && 'active']" @click="setType( i )">{{ s }}</button>
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps({
	showType: {
		type: Number,
		default: 0
	},
	dataList: {
		type: Array,
		default: [ '日', '周', '月' ]
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
	top: 20px;
  left: 20px;

	.btn {
		height: 30px;
		padding: 0 14px;
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