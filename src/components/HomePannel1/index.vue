<template>
	<div class="home-pannel" :style="{ width: width + 'px' }">
		<p class="pannel-title" :class="type === 1 ? 'left' : 'right'" @click="showPage">{{ title }}</p>
		<div class="pannel-wrap">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { mainStore } from "@/store/index"

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	path: {
		type: String,
		default: '/'
	},
	type: {
		type: Number,
		default: 1
	},
	width: {
		type: [Number],
		default: 446
	},
	height: {
		type: [Number, Array]
	},
	pageType: {
		type: String,
		default: ''
	},
	subTitle: {
		type: String,
		default: ''
	}
})

// 状态
const store = mainStore()

const showPage = () => {
	console.log('jjjjjj');
	store.setPage(true);
	store.setPageTitle((props.subTitle || props.title) + '详情');
	store.setPageType(props.pageType);
}

const router = useRouter();

const jumpTo = () => {
	console.log('oo');
	router.push(props.path);
}

</script>

<style lang="scss" scoped>
.home-pannel {
	position: relative;
	margin-bottom: 10px;
	width: 100%;

	.pannel-title {
		font-size: 25px;
		height: 76px;
		line-height: 70px;
		cursor: pointer;

		&:hover {
			color: #08e9eb;
		}

		&.left {
			text-align: left;
			padding-left: 100px;
			background: url('../../assets/images/ht-left.png') center / cover no-repeat;
		}

		&.right {
			text-align: right;
			padding-right: 100px;
			background: url('../../assets/images/ht-right.png') center / cover no-repeat;
		}
	}

	.pannel-wrap {
		width: 100%;
		margin-top: -25px;
	}
}
</style>