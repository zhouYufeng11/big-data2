<template>
	<div class="show-wrap" :style="{ height: height + 'px' }">
		<div class="show-list">
			<div class="show-item">
				<p class="img-box"><img src="../../assets/images/rg6.png" alt="图标"></p>
				<p class="num active">
					<CountNum :num="dataObj.MonitorCount" />
				</p>
				<p class="text">任务总量</p>
			</div>
			<div class="show-item">
				<p class="img-box"><img src="../../assets/images/rg7.png" alt="图标"></p>
				<p class="num active">
					<CountNum :num="dataObj.Increase" />
				</p>
				<p class="text">今日新增</p>
			</div>
		</div>
		<BarTask :dataList="dataList" />
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BarTask from '@/components/Echarts/BarTask/index.vue';

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

const dataList: any = ref([]);

watch(()=> props.dataObj, (newValue) => {
	dataList.value = newValue;
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
			height: 51px;
			width: 195px;

			.img-box {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				height: 51px;
				width: 195px;
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
				z-index: 1;
			}

			.num {
				margin: 0 0 22 px 0;
				height: 30px;
				font-size: 28px;

				&.active {
					color: #00F5FF;
				}
			}

			.text {
				font-size: 22px;
			}
		}
	}
}
</style>