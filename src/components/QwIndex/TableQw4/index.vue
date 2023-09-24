<template>
	<div class="imgBoxSlider">
		<swiper class="imgBoxContainer" :slidesPerView="1" :spaceBetween="30" :loop="false" :centeredSlides="true"
			:pagination="false" :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }" :navigation="false" :modules="modules">
			<swiper-slide class="imgBox-item" v-for="(s, n) in dataList" :key="n">
				<div class="slider-item" v-for="(v, i) in s" :key="i">
					<div class="item-title" @click="setPCS(v)">{{ v.groupKeyName }}</div>
					<div class="item-flex-content">
						<div class="item-flex">
							<p class="flex-title">警车</p>
							<p class="flex-num flex-num1">{{ v.jcCount }}</p>
						</div>
						<div class="item-flex">
							<p class="flex-title">车台</p>
							<p class="flex-num flex-num2">{{ v.ctCount }}</p>
						</div>
						<div class="item-flex">
							<p class="flex-title">手台</p>
							<p class="flex-num flex-num3">{{ v.stCount }}</p>
						</div>
						<div class="item-flex">
							<p class="flex-title">其他</p>
							<p class="flex-num flex-num4">{{ v.otherCount }}</p>
						</div>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue"; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const modules = [Autoplay, Pagination, Navigation, A11y];

// 状态
const props = defineProps({
	dataList: {
		type: Array<any[]>,
		default: []
	},
})

const emit = defineEmits(['setPCS'])
const setPCS = (data: any) => {
	emit('setPCS', data)
}


</script>
	
<style lang = "scss" scoped >
// @import "swiper/swiper-bundle.css";

.imgBoxSlider {
	width: 100%;
	height: 320px;
	overflow: hidden;

	.imgBoxContainer {
		display: flex;
		// animation: sliderLeft 3s linear infinite forwards;
	}

	.imgBox-item {
		width: 457px;

		.slider-item {
			height: 150px;
			margin: 0 auto;
			user-select: none;
		}

		.item-title {
			background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.50) 49%, rgba(9, 157, 254, 0.00));
			border: 1px solid;
			border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), #ffffff 52%, rgba(255, 255, 255, 0.00)) 1 1;
			box-shadow: 0px 0px 11px 0px rgba(0, 22, 133, 0.24);
			height: 22px;
			line-height: 22px;
			width: 437px;
			margin: 5px auto 10px auto;
			font-size: 20px;
		}

		.item-flex-content {
			display: flex;
			justify-content: space-between;
			padding: 0 10px;

			.item-flex {

				.flex-title {
					font-size: 18px;
					width: 85px;
					height: 21px;
					line-height: 21px;
					margin-bottom: 10px;
					background: url('../../../assets/images/short-title.png') center / cover no-repeat;
				}

				.flex-num {
					width: 75px;
					height: 47px;
					font-size: 20px;
					color: #fff;
					line-height: 120px;
					margin: 15px auto 0 auto;

					&.flex-num1 {
						background: url('../../../assets/images/p11.png') center / cover no-repeat;
					}

					&.flex-num2 {
						background: url('../../../assets/images/p22.png') center / cover no-repeat;
					}

					&.flex-num3 {
						background: url('../../../assets/images/p33.png') center / cover no-repeat;
					}

					&.flex-num4 {
						background: url('../../../assets/images/p55.png') center / cover no-repeat;
					}
				}
			}
		}
	}
}

@keyframes sliderLeft {
	0% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(-100%);
	}
}
</style>
