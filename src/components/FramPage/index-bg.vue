<template>
	<div v-if="showPage" class="dialog-pop animate__animated animate__zoomIn">
		<div class="dialog-wrap">
			<div class="dialog-title">{{ pageName }}</div>
			<div class="close" @click="closeDialog">
				<p class="close-img"><img src="../../assets/images/pop-close.png" alt="关闭"></p>
			</div>
			<div class="dialog-content">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { mainStore } from "@/store/index"
// 状态
const store = mainStore()

const props = defineProps({
	pageName: {
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
	width: 878px;
	height: 638px;
	margin-left: -439px;
	margin-top: -270px;
	// transform: translate(-50%, -50%);
	// animation-fill-mode: backwards;
	padding: 20px;
	overflow-x: hidden;
	overflow-y: auto;
	background: url('../../assets/images/pop-bg.png') center / cover no-repeat;

	&.animate__animated {
		animation-duration: .4s;
	}

	.dialog-wrap {
		position: relative;
		height: 100%;
		width: 100%;
		background: linear-gradient(0deg, rgba(1, 16, 39, .8) 0, rgba(1, 16, 39, .4) 100%, transparent);
	}

	.dialog-title {
		text-align: center;
		font-size: 30px;
		color: #00bbfa;
		height: 42px;
		line-height: 42px;
		font-family: "YouSheBiaoTiHei";
		user-select: none;
		text-shadow: 0 0 12px #038fea;
		letter-spacing: 10px;
		text-indent: 10px;
	}

	.dialog-content {
		height: 557px;
		width: 100%;
		padding: 30px;
		overflow: hidden;
	}

	.close {
		position: absolute;
		right: 35px;
		top: 10px;
		z-index: 3;
		width: 20px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		cursor: pointer;
		overflow: hidden;


		.close-img {
			width: 100%;
			height: 100%;
			font-size: 0;
			text-align: center;
			vertical-align: middle;

			img {
				height: 100%;
				width: 100%;
				transition: all .3s linear;
				font-size: 30px;
			}
		}

		&:hover {
			.close-img {
				img {
					transition: all .3s linear;
					transform: rotate(180deg);
				}
			}
		}

	}
}
</style>