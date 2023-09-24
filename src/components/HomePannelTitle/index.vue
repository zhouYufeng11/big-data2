<template>
  <div class="tip-title">
    <div class="tip-wrap">
      {{ title }}
    </div>
    <div class="tip-arrow">
      <p class="bg"></p>
    </div>
    <div class="more" @click="showPage">更多>></div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive, onBeforeUnmount } from 'vue';

// let { proxy } = getCurrentInstance();
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  pageType: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['showPage']);

const showPage = () => {
  emit('showPage')
}

</script>

<style lang="scss" scoped>
.tip-title {
  font-family: 'YouSheBiaoTiHei';
  height: 50px;
  line-height: 50px;
  position: relative;
  text-align: left;
  margin-left: 12px;
  text-shadow: 0px 0px 8px 0px #038fea;

  // border: 1px solid transparent;
  // border-image: linear-gradient(75deg, rgba(26, 201, 255, .95) 20%, rgba(26, 201, 255, .5) 50%, rgba(0, 28, 65, 0.8) 70%, transparent) 0 0 1 0;

  // &::before {
  //   position: absolute;
  //   left: -12px;
  //   top: 0;
  //   content: '';
  //   width: 8px;
  //   height: 34px;
  //   background: linear-gradient(to right, rgba(26, 201, 255, .5) 30%, transparent);
  // }

  .tip-wrap {
    padding-left: 20px;
    width: 100%;
    // background: linear-gradient(to right, rgba(26, 201, 255, .5) 5%, transparent);
    font-size: 22px;
    letter-spacing: 2px;
    text-indent: 2px;
    user-select: none;
    position: relative;
    color: #fff;
    text-shadow: 0 0 8px #038fea, 0 0 8px #d7f2ff;
    ;
  }

  .more {
    position: absolute;
    right: 5px;
    top: 12px;
    width: 65px;
    height: 20px;
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
    color: #038fea;

    &:hover {
      color: #08e9eb;
    }
  }

  .tip-arrow {
    position: absolute;
    right: 80px;
    top: 14px;
    width: 70px;
    height: 16px;

    .bg {
      width: 70px;
      height: 16px;
      background: url('../../assets/images/arrow.png') center left / cover no-repeat;
      animation: fadeCur 2s ease-out infinite;
    }
  }
}
</style>