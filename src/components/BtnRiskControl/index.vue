<template>
	<div class="btn-box">
		<button v-for="(item, index) of btnNameList" type="button" class="btn" :class="[showType === (index) && 'active']" @click="setType(index)">{{ item.name }}</button>
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps({
	showType: {
		type: Number,
		default: 1
	},
	btnNameList: {
		type: Array,
		default: []
	}
})

const showType = ref(0);
const emit = defineEmits(['btnClick']);
const setType = (type: number) => {
	showType.value = type;
	emit('btnClick', type)
}
</script>

<style lang="scss" scoped>
.btn-box {
	position: absolute;
	top: 6px;
	right: 20px;

	.btn {
		height: 30px;
		padding: 0 4px;
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