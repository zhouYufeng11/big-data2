<template>
	<div class="home-pannel" :style="{ width: width + 'px' }">
		<div class="pannel-title" :class="type === 1 ? 'left' : 'right'" @click="jumpTo">
			<div class="tip-wrap">
			{{ title }}
			</div>
			<template v-if="showDetail">
				<div class="tip-arrow">
					<p class="bg"></p>
				</div>
				<div class="more" @click="showPage">数据分析>></div>
			</template>
		</div>
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
		type: [Number, Array],
		default: 0
	},
	pageType: {
		type: String,
		default: ''
	},
	subTitle: {
		type: String,
		default: ''
	},
	showDetail: {
		type: Boolean,
		default: false
	}
})

// 状态
const store = mainStore()

const showPage = () => {
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
		position: relative;
		width: 100%;
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

		.tip-arrow {
			position: absolute;
			right: 100px;
			top: 28px;
			width: 70px;
			height: 16px;

			.bg {
			width: 70px;
			height: 16px;
			background: url('../../assets/images/arrow.png') center left / cover no-repeat;
			animation: fadeCur 2s ease-out infinite;
			}
		}

		.more {
			position: absolute;
			right: 5px;
			top: 12px;
			padding: 0 10px;
			height: 50px;
			font-size: 16px;
			line-height: 50px;
			cursor: pointer;
			color: #038fea;

			&:hover {
			color: #08e9eb;
			}
		}
	}

	.pannel-wrap {
		width: 100%;
		margin-top: -25px;
	}
}
</style>