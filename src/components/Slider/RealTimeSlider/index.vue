<template>
	<div class="imgBoxSlider">
		<swiper class="imgBoxContainer" :slidesPerView="1" :spaceBetween="30" :loop="false" :centeredSlides="true"
			:pagination="false" :autoplay="{ delay: 5000, disableOnInteraction: false }" :navigation="false" :modules="modules">
			<swiper-slide class="imgBox-item" v-for="(s, n) of dataList" :key="n">
				<div class="slider-item" v-for="(v, i) in s" :key="i">
					<div class="item-title">
						<p class="tip" @click="setMapCenter(v.gisCenter)">{{ v.groupKeyName }}</p>
						<span class="more" @click="setPCS(v.groupKey)"> >> </span>
					</div>
					<div class="item-flex-content">
						<div class="item-flex" @click="setKind('01', v.groupKey)">
							<p class="flex-title">违法犯罪</p>
							<p class="flex-num flex-num1">{{ v.value1 }}</p>
						</div>
						<div class="item-flex" @click="setKind('02', v.groupKey)">
							<p class="flex-title">社会稳定</p>
							<p class="flex-num flex-num2">{{ v.value2 }}</p>
						</div>
						<div class="item-flex" @click="setKind('03', v.groupKey)">
							<p class="flex-title">公共安全</p>
							<p class="flex-num flex-num3">{{ v.value3 }}</p>
						</div>
						<div class="item-flex" @click="setKind('04', v.groupKey)">
							<p class="flex-title">群众求助</p>
							<p class="flex-num flex-num4">{{ v.value4 }}</p>
						</div>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onActivated, onMounted, getCurrentInstance } from "vue";
import { mainStore, watchStore } from "@/store/index";
import { Swiper, SwiperSlide } from "swiper/vue"; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { timeSlotChange } from "@/utils";
const modules = [Autoplay, Pagination, Navigation, A11y];

// 状态
const store = mainStore();

const props = defineProps({
	dataList: {
		type: Array,
		default: []
	}
	// width: {
	// 	type: [Number, String],
	// 	default: '70%'
	// },
	// height: {
	// 	type: [Number, String],
	// 	default: '80%'
	// }
})

const emit = defineEmits(['setKind', 'setPCS']);
const setKind = (value: any, value2: any) => {
	//  获取精确的 type 修改时间
	const type = store.jqDate;
	const date = timeSlotChange(type);
	emit('setKind', { key: 'kind', value, value2, date });
}	

const setPCS = (value: any) => {
	const type = store.jqDate;
	const date = timeSlotChange(type);
	emit('setPCS', { key: 'pcs', value, date });
}

const setMapCenter = (mapCenter: any) => {
	store.setMapCenter1(mapCenter);
}
</script>
	
<style lang = "scss" scoped >
// @import "swiper/swiper-bundle.css";
.imgBoxSlider {
	width: 100%;
	height: 500px;
	overflow: hidden;


	.imgBoxContainer {
		display: flex;
		// animation: sliderLeft 3s linear infinite forwards;
	}

	.imgBox-item {
		width: 457px;

		.slider-item {
			margin: 0 auto;
			user-select: none;
		}

		.item-title {
			position: relative;
			background: url('../../../assets/images/tip-title.png') center / cover no-repeat;
			height: 44px;
			line-height: 44px;
			width: 437px;
			margin: 0 auto 5px auto;
			display: flex;
			cursor: pointer;
			box-sizing: border-box;

			.tip {
				font-size: 24px;
				flex: 1;
				padding-left: 40px;

				&:hover {
					color: #66E2FF;
				}
			}

			.more {
				flex: 0 0 40px;
				font-size: 22px;
				margin-right: 5px;
				color: #038fea;

				&:hover {
					color: #66E2FF;
				}
			}
		}

		.item-flex-content {
			display: flex;
			justify-content: space-between;
			margin: 0 10px;

			&::-webkit-scrollbar-track {
				background-color: transparent;
			}

			&::-webkit-scrollbar {
				width: 0px;
				height: 0px;
				background-color: transparent;
			}

			&::-webkit-scrollbar-thumb {
				background-color: transparent;
			}

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
					width: 73px;
					height: 85px;
					font-size: 24px;
					color: #66E2FF;
					line-height: 130px;
					margin: 0 auto;

					&.flex-num1 {
						background: url('../../../assets/images/j1.png') center / cover no-repeat;
					}

					&.flex-num2 {
						background: url('../../../assets/images/j2.png') center / cover no-repeat;
					}

					&.flex-num3 {
						background: url('../../../assets/images/j3.png') center / cover no-repeat;
					}

					&.flex-num4 {
						background: url('../../../assets/images/j4.png') center / cover no-repeat;
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
