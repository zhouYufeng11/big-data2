<template>
	<div class="circular">
		<div class="circular-content">
			<div class="circular-item left">
				<p class="text">已处置</p>
				<p class="num">
					<CountNum :num="dataObj.ycz || 0" />
				</p>
			</div>
			<div class="circular-item center">
				<p class="text">总量</p>
				<p class="num">
					<CountNum :num="dataObj.all" />
				</p>
			</div>
			<div class="circular-item right">
				<p class="text">未处置</p>
				<p class="num">
					<CountNum :num="dataObj.wcz || 0" />
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
const props = defineProps({
	dataObj: {
		type: [Object],
		default: {}
	}
})

</script>

<style lang="scss" scoped>
.circular {
	padding-top: 40px;

	.circular-content {
		display: flex;
		justify-content: center;
		width: 434;
		height: 176px;
		margin: 0 auto;
		padding-top: 50px;
		background: url('../../assets/images/circular.png') center / cover no-repeat;

		.circular-item {
			text-align: center;

			&.center {
				flex: 1;
				margin-top: -50px;

				.text {
					font-size: 30px;
				}

				.num {
					font-size: 40px;
				}
			}

			&.left {
				flex: 0 0 120px;
				margin-left: 10px;
			}

			&.right {
				flex: 0 0 120px;
				margin-left: 5px;
			}

			.text {
				font-size: 20px;
				margin-bottom: 25px;
			}

			.num {
				font-size: 30px;
			}
		}
	}
}</style>