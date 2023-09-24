<template>
	<div class="show-wrap" :style="{ height: height + 'px' }">
		<div class="total">
			<p class="num">
				<CountNum :num="dataObj.all" />
			</p>
		</div>
		<div class="num-box">
			<div class="num-item">
				<p class="num-top"><CountNum :num="dataObj.yzp" /></p>
				<p class="num-middle">已抓拍</p>
				<p class="num-bot">
					<img src="../../assets/images/g1.png" alt="图例">
				</p>
			</div>
			<div class="num-item">
				<p class="num-top"><CountNum :num="dataObj.wzp" /></p>
				<p class="num-middle">未抓拍</p>
				<p class="num-bot">
					<img src="../../assets/images/g1.png" alt="图例">
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
	dataObj: {
		type: Object,
		default: {}
	},
	height: {
		type: Number,
		default: 239
	}
})


</script>

<style lang="scss" scoped>
.show-wrap {
	position: relative;
	padding: 20px;

	.total {
		height: 45px;
		position: relative;
		border: 1px solid;
		border-image: linear-gradient(270deg, rgba(0, 200, 254, 0.00), rgba(0, 200, 255, 0.50) 49%, rgba(8, 197, 249, 0.00)) 1 1;

		p {
			height: 37px;
			margin-top: 4px;
			line-height: 37px;
			font-size: 24px;
			background: linear-gradient(270deg, rgba(0, 200, 255, 0.00), rgba(0, 200, 255, 0.30) 49%, rgba(0, 200, 254, 0.00));
		}
	}

	.num-box {
		display: flex;
		justify-content: space-around;
		margin-top: 10px;

		.num-item {
			margin: 20px;

			.num-bot {
				img {
					width: 80px;
				}
			}
		}

	}
}
</style>