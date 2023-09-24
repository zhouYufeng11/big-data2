<template>
	<div class="subPannel">
		<component :is="changeCom" :title="props.title" />
		<!-- <SubTitle  /> -->
		<div class="subPannel-wrap" :style="{ height: currentHeight, width: currentWidth }">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import SubTitle from '@/components/SubTitle/index.vue';
import SubChooseTitle from '@/components/SubChooseTitle/index.vue';

const props = defineProps({
	title: {
		type: [String, Array],
		default: ''
	},
	width: {
		type: [Number, String],
		default: '100%'
	},
	height: {
		type: [Number, String],
		default: '198px'
	}
})

let changeCom = computed(() => {
	return typeof props.title === 'string' ? SubTitle : SubChooseTitle;
});

let currentHeight = computed(() => {
	if (typeof props.height === 'string')
		if (/^\d$/g.test(props.height)) return props.height + 'px'
		else return props.height
	else return props.height + 'px'
});

let currentWidth = computed(() => {
	if (typeof props.width === 'string')
		if (/^\d$/g.test(props.width)) return props.width + 'px'
		else return props.width
	else return props.width + 'px'
})


</script>

<style lang="scss" scoped>
.subPannel {
	width: 100%;
	position: relative;
	margin-bottom: 20px;

	// .subPannel-wrap {
	// padding: 20px 10px;
	// }
}
</style>