<template>
  <div class="imgBoxSlider">
    <swiper class="imgBoxContainer" :slidesPerView="1" :spaceBetween="30" :loop="false" :centeredSlides="true"
      :pagination="false" :autoplay="{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }" :navigation="false" :modules="modules">
      <swiper-slide class="imgBox-item" v-for="(s, n) in dataList" :key="n">
        <div class="slider-item" v-for="(v, i) in s" :key="i" @click="setPCS(v.posName)">
          <div class="left">{{ v.posName }}</div>
          <div class="right">
            <p class="text-item">
              <span class="text-item-left">{{ v.name1 }}</span>
              <span class="text-item-right">{{ v.grade1 }}</span>
            </p>
            <p class="text-item">
              <span class="text-item-left">{{ v.name2 }}</span>
              <span class="text-item-right">{{ v.grade2 }}</span>
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue"; // swiper所需组件
// 这是分页器和对应方法，swiper好像在6的时候就已经分离了分页器和一些其他工具
import { Autoplay, Navigation, Pagination, A11y } from "swiper";
// 引入swiper样式，对应css 如果使用less或者css只需要把scss改为对应的即可
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const modules = [Autoplay, Pagination, Navigation, A11y];

const props = defineProps({
  dataList: {
    type: Array<any[]>,
    default: []
  },
  height: {
    type: Number,
    default: 309
  }
});

const emit = defineEmits(['setPCS'])
const setPCS = (value: any) => {	
  console.log(value);
	emit('setPCS', { key: 'pcs', value });
}

</script>
<style lang="scss" scoped>
.imgBoxSlider {
  width: 100%;
  height: 369px;
  overflow: hidden;
  padding-top: 5px;

  .imgBoxContainer {
    display: flex;
    // animation: sliderLeft 3s linear infinite forwards;
  }

  .imgBox-item {
    width: 457px;

    .slider-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      height: 50px;
      box-sizing: border-box;
      font-size: 16px;
      cursor: pointer;


      &:nth-child(2n) {
        background: rgba(52, 112, 214, 0.2);
      }

      &:hover {
        background: rgba(52, 112, 214, 0.4);

        div {
          color: #00bbfa;
        }
      }

      .left {
        width: 120px;
        height: 35px;
        line-height: 35px;
        background: url('@/assets/images/qw2.png') center / contain no-repeat;
        box-sizing: border-box;
        font-size: 20px;
        text-align: center;
        padding-left: 20px;
      }

      .right {
        flex: 1;

        .text-item {
          line-height: 25px;
          display: flex;
          align-items: center;

          .text-item-left {
            flex: 1;
            text-align: right;
            font-size: 18px;
          }

          .text-item-right {
            font-size: 18px;
            flex: 0 0 60px;
            margin-left: 20px;
            width: 45px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            border-radius: 10px;
            border: 1px solid #0384ff;
            background: linear-gradient(270deg, rgba(60, 225, 236, 0.40), rgba(1, 135, 244, 0.60) 49%, rgba(63, 226, 235, 0.40));
          }
        }
      }
    }
  }
}

</style>