<template>
	<div v-if="showPage" class="dialog-pop animate__animated animate__zoomIn">
		<div class="dialog-wrap">
			<div class="dialog-title">{{ pageTitle }}</div>
			<div class="close" @click="closeDialog">
				<icon-close />
			</div>
			<div class="dialog-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { mainStore } from "@/store/index";

// 状态
const store = mainStore()

const props = defineProps({
	pageTitle: {
		type: String,
		default: '查看明细'
	},
	showPage: {
		type: Boolean,
		default: false,
	},
})

// 关闭 dialog
const closeDialog = () => {
	store.setPage(false);
}

</script>

<style lang="scss" scoped>
.dialog-pop {
	position: absolute;
	left: 50%;
	top: 50%;
	z-index: 2;
	width: 1400px;
	height: 760px;
	margin-left: -700px;
	margin-top: -350px;
	overflow-x: hidden;
	overflow-y: auto;

	&.animate__animated {
		animation-duration: .4s;
	}

	.dialog-wrap {
		position: relative;
		height: 100%;
		width: 100%;
		background: linear-gradient(270deg, #02458f, #0b5fa5 49%, #02458f);
	}

	.dialog-title {
		text-align: center;
		font-size: 40px;
		color: #fff;
		height: 80px;
		line-height: 80px;
		user-select: none;
		letter-spacing: 10px;
		text-indent: 10px;
		background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.50) 49%, rgba(9, 157, 254, 0.00));
		box-shadow: 0px 0px 11px 0px rgba(0, 22, 133, 0.24);
	}

	.dialog-content {
		height: 680px;
		width: 100%;
		padding: 20px 30px;
		overflow: hidden;
	}

	.close {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		right: 20px;
		top: 15px;
		z-index: 3;
		cursor: pointer;
		overflow: hidden;
		height: 50px;
		line-height: 50px;
		width: 50px;
		font-size: 35px;
		color: #fff;
		font-family: 'Microsoft YaHei';
		transition: all .3s linear;

		&:hover {
			transform: rotate(180deg);
			color: #08e9eb;
		}
	}
}
</style>