<template>
  <div class="home-category">
    <div class="cate-item" v-for="(v, i) in dataList" :key="i">
      <p class="cate-item-text">{{ v.text }}</p>
      <p class="cate-item-img"></p>
      <p class="cate-item-num">{{ v.num }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  dataList: {
    type: Array<any>,
    default: []
  },
})


</script>

<style lang="scss" scoped>
.home-category {
  position: relative;
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  padding: 20px 0 0 20px;

  .cate-item {
    width: 60px;
    text-align: center;
    position: relative;

    .cate-item-text {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      font-size: 16px;
    }
    .cate-item-num {
      font-size: 24px;
    }
    .cate-item-img {
      height: 81px;
      width: 60px;
    }

    &:nth-child(1) {
      .cate-item-img {
        background: url('../../assets/images/hg1.png') center / cover no-repeat;
      }
    }
    &:nth-child(2) {
      .cate-item-img {
        background: url('../../assets/images/hg2.png') center / cover no-repeat;
      }
    }
    &:nth-child(3) {
      .cate-item-img {
        background: url('../../assets/images/hg3.png') center / cover no-repeat;
      }
    }
    &:nth-child(4) {
      .cate-item-img {
        background: url('../../assets/images/hg4.png') center / cover no-repeat;
      }
    }
    &:nth-child(5) {
      .cate-item-img {
        background: url('../../assets/images/hg5.png') center / cover no-repeat;
      }
    }
    &:nth-child(6) {
      .cate-item-img {
        background: url('../../assets/images/hg6.png') center / cover no-repeat;
      }
    }
  }
}
</style>