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
	top: 15px;
	right: 150px;

	.btn {
		padding: 0 10px;
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