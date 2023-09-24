<template>
	<div class="imgBoxSlider">
		<swiper :slidesPerView="1" :spaceBetween="30" :loop="false" :centeredSlides="true" 
			:pagination="false" :autoplay="{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true }" :navigation="false" :modules="modules">
			<swiper-slide class="imgBox-item" v-for="(s, n) in dataList" :key="n">
				<div class="slider-item" v-for="(v, i) in s" :key="i">
					<div class="item-title" @click="setPCS(v.dwdm)">{{ v.dwmc }}</div>
					<div class="item-flex-content">
						<div v-for="(d, i) of v.statisticsList" :class="['item-flex', 'item-flex' + (i + 1) ]" @click="setLevel(d.dictValue, v.dwdm)">
							<p :class="['flex-num', 'flex-num' + (i + 1) ]">{{ d.groupValue }}</p>
							<p class="flex-title">{{ d.dictLabel }}</p>
						</div>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onActivated, onMounted, getCurrentInstance } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue"; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { jjxxStatisticsByDjdj } from '@/api/index';
import { mainStore } from "@/store";
import { timeSlotChange } from "@/utils";
const modules = [Autoplay, Pagination, Navigation, A11y];

// 状态
const store = mainStore();

// 状态
const props = defineProps({
	dataList: {
		type: Array<any>,
		default: []
	},
	isTable4Data: {
		type: Boolean,
		default: true
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

const emit = defineEmits([ 'setPCS', 'setLevel' ]);
const setPCS = (value: any) => {
	const type = store.jqDate;
	const date = timeSlotChange(type);
	emit('setPCS', { key: 'pcs', value, date });
}

const setLevel = (levelCode: any, pcsCode: any) => {
	//  获取精确的 type 修改时间
	const type = store.jqDate;
	const date = timeSlotChange(type);
	emit('setLevel', { key: 'level', value: levelCode, value1: pcsCode, date });
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
			background: url('../../../assets/images/tip-title.png') center / cover no-repeat;
			height: 44px;
			line-height: 44px;
			width: 437px;
			margin: 5px auto;
			font-size: 24px;
		}

		.item-flex-content {
			display: flex;
			justify-content: space-between;
			padding: 0 30px;

			.item-flex {
				.flex-num {
					width: 68px;
					height: 75px;
					font-size: 24px;
					color: #fff;
					line-height: 75px;
					margin: 0 auto 10px auto;
					margin-bottom: 10px;
				}

				.flex-title {
					font-size: 18px;
					width: 95px;
					height: 23px;
					line-height: 23px;
					margin: 0 auto;
				}

				&.item-flex1 {
					.flex-num {
						background: url('../../../assets/images/l1.png') center / cover no-repeat;
					}

					.flex-title {
						background: url('../../../assets/images/l1-bot.png') center / cover no-repeat;
					}
				}

				&.item-flex2 {
					.flex-num {
						background: url('../../../assets/images/l2.png') center / cover no-repeat;
					}

					.flex-title {
						background: url('../../../assets/images/l2-bot.png') center / cover no-repeat;
					}
				}

				&.item-flex3 {
					.flex-num {
						background: url('../../../assets/images/l3.png') center / cover no-repeat;
					}

					.flex-title {
						background: url('../../../assets/images/l3-bot.png') center / cover no-repeat;
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
