<template>
  <div class="weather">
    <div class="weather-item">
      <p class="img-box"></p>
      <p class="text">暴雨</p>
    </div>
    <div class="weather-item">
      <p class="img-box"></p>
      <p class="text">大风</p>
    </div>
    <div class="weather-item">
      <p class="img-box"></p>
      <p class="text">冰雹</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const props = defineProps({
  dataObj: {
    type: Object,
    default: {},
  },
})

</script>

<style lang="scss" scoped>
.weather {
  padding: 0 20px 0 20px;
  display: flex;
  justify-content: space-between;

  .weather-item {
    text-align: center;

    .img-box {
      height: 106px;
      width: 106px;
      position: relative;

      &::before {
        content: '';
        position: absolute;
        top: 18px;
        left: 25px;
        width: 70px;
        height: 70px;
        border: 2px solid #239ee5;
        border-radius: 50%;
        box-shadow: 0 0 5px #239ee5, 0 0 20px #36f0e6;
        animation: loopShow 2s linear infinite forwards;
      }
    }

    &:nth-child(1) {
      .img-box {
        background: url('../../assets/images/cloud1.png') center / cover no-repeat;
      }
    }

    &:nth-child(2) {
      .img-box {
        background: url('../../assets/images/cloud2.png') center / cover no-repeat;
      }
    }

    &:nth-child(3) {
      .img-box {
        background: url('../../assets/images/cloud3.png') center / cover no-repeat;
      }
    }

    .text {
      margin-top: 10px;
      line-height: 25px;
      font-size: 20px;
      background: linear-gradient(270deg, rgba(102, 226, 255, 0.00), rgba(102, 226, 255, 0.40) 49%, rgba(102, 226, 255, 0.00));
      border: 1px solid;
      border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.50) 50%, rgba(255, 255, 255, 0.00)) 0.6 0.6;
    }
  }
}

@keyframes loopShow {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>