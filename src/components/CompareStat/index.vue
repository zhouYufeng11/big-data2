<template>
	<div class="show-wrap" :style="{ height: height + 'px' }">
		<div class="show-list">
			<div class="show-item">
				<p class="img-box"><img src="../../assets/images/rg1.png" alt="图标"></p>
				<p class="num">
					<CountNum :num="dataObj.num1" />
				</p>
				<p class="text">人脸</p>
			</div>
			<div class="show-item">
				<p class="img-box"><img src="../../assets/images/rg2.png" alt="图标"></p>
				<p class="num">
					<CountNum :num="dataObj.num2" />
				</p>
				<p class="text">库总量</p>
			</div>
			<div class="show-item">
				<p class="img-box"><img src="../../assets/images/rg3.png" alt="图标"></p>
				<p class="num">
					<CountNum :num="dataObj.num3" />
				</p>
				<p class="text">车辆库</p>
			</div>
		</div>
		<div class="stat-list">
			<div class="stat-item">
				<div class="img-box"><img src="../../assets/images/rg4.png" alt="图标"></div>
				<p class="num">
					<CountNum :num="dataObj.num1" />
				</p>
				<p class="text">人员数量</p>
			</div>
			<div class="stat-item">
				<div class="img-box"><img src="../../assets/images/rg5.png" alt="图标"></div>
				<p class="num">
					<CountNum :num="dataObj.num3" />
				</p>
				<p class="text">车辆数量</p>
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

	.show-list {
		display: flex;
		justify-content: space-between;
		text-align: center;

		.show-item {
			position: relative;
			height: 124px;
			width: 124px;

			.img-box {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				height: 124px;
				width: 124px;
				font-size: 0;
				animation: rotate360 2s linear infinite forwards;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.num,
			.text {
				width: 100%;
				position: relative;
				z-index: 1;
			}

			.num {
				margin: 35px 0 3px 0;
				height: 30px;
				font-size: 24px;
			}

			.text {
				font-size: 18px;
			}
		}
	}

	.stat-list {
		margin-top: 10px;
		display: flex;
		justify-content: space-between;

		.stat-item {
			position: relative;
			height: 82px;
			width: 200px;

			.img-box {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				height: 82px;
				width: 200px;
				font-size: 0;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.num,
			.text {
				width: 100%;
				position: relative;
				padding-left: 70px;
				z-index: 1;
			}

			.num {
				margin: 9px 0 1px 0;
				height: 26px;
				font-size: 24px;
			}

			.text {
				font-size: 18px;
			}
		}
	}
}
</style>