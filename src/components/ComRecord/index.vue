<template>
	<div class="show-wrap" :style="{ height: height + 'px' }">
		<swiper 
			ref="swiperBox"
			class="imgBoxContainer"
			:slidesPerView="1" 
			:spaceBetween="30" 
			:loop="false"
			:pagination="false" 
			:controller="{ control: controlledSwiper }"
			:autoplay="{ 
				delay: 5000, 
				disableOnInteraction: false,
				pauseOnMouseEnter: true
			}" 
			:navigation="false"
			:modules="modules"
		>
			<swiper-slide>
				<div class="show-list">
					<div class="show-item">
						<p class="img-box"><img src="../../assets/images/rg8.png" alt="图标"></p>
						<p class="text">人员档案</p>
						<p class="num">
							<CountNum :num="dataObj.FaceData.FileCount" />
						</p>
					</div>
					<div class="show-item">
						<p class="img-box"><img src="../../assets/images/rg9.png" alt="图标"></p>
						<p class="text">归档抓拍</p>
						<p class="num">
							<CountNum :num="dataObj.FaceData.ParticipateInAggregationCaptureCount" />
						</p>
					</div>
					<div class="show-item">
						<p class="img-box"><img src="../../assets/images/rg10.png" alt="图标"></p>
						<p class="text">人脸结构化</p>
						<p class="num">
							<CountNum :num="dataObj.FaceData.CaptureCount" />
						</p>
					</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="show-list">
					<div class="show-item">
						<p class="img-box"><img src="../../assets/images/rg11.png" alt="图标"></p>
						<p class="text">车辆档案</p>
						<p class="num">
							<CountNum :num="dataObj.VehicleData.FileCount" />
						</p>
					</div>
					<div class="show-item">
						<p class="img-box"><img src="../../assets/images/rg12.png" alt="图标"></p>
						<p class="text">归档抓拍</p>
						<p class="num">
							<CountNum :num="dataObj.VehicleData.ParticipateInAggregationCaptureCount" />
						</p>
					</div>
					<div class="show-item">
						<p class="img-box"><img src="../../assets/images/rg13.png" alt="图标"></p>
						<p class="text">车辆结构化</p>
						<p class="num">
							<CountNum :num="dataObj.VehicleData.CaptureCount" />
						</p>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from "swiper/vue"; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { jjxxStatisticsByDjdj } from '@/api/index';
const modules = [Autoplay, Pagination, Navigation, A11y];

const swiperBox = ref();

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

const controlledSwiper = () => {
	
}

</script>

<style lang="scss" scoped>
.show-wrap {
	position: relative;
	padding: 20px;

	.show-list {
		text-align: center;
		.show-item {
			display: flex;
			position: relative;
			height: 72px;
			width: 402px;
			padding: 0 20px 0 100px;

			.img-box {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				height: 72px;
				width: 402px;
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
				line-height: 60px;
			}

			.text {
				font-size: 22px;
				text-align: left;
			}

			.num {
				font-size: 24px;
				text-align: right;

			}
		}
	}
}
</style>