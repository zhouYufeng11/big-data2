<template>
  <div class="root" ref="root">
    <router-view :key="currentRoute" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import {  } from '@/config/dic';  //  字典项接口

const currentRoute: any = ref(useRouter().currentRoute);

const root = ref();
const screenParams = ref({
  innerWidth: innerWidth,
  innerHeight: innerHeight,
  screenWidth: window.screen.availWidth,
  screenHeight: window.screen.availHeight,
  devicePixelRatio: window.devicePixelRatio,
});

const getSize = () => {
  screenParams.value = {
    innerWidth: innerWidth,
    innerHeight: innerHeight,
    screenWidth: window.screen.availWidth,
    screenHeight: window.screen.availHeight,
    devicePixelRatio: window.devicePixelRatio,
  }
  resizeWidth();
}
const resizeWidth = () => {
  // 第一种
  var ratio = screenParams.value.innerWidth / (root.value?.width || 1920);
  root.value.style.transform = "scale(" + ratio + ")";
  // 第二种
  // root.value.style.transform = `scaleY(${innerHeight / 1080}) scaleX(${innerWidth / 1920})`;
}
onBeforeMount(() => {
  window.onresize = () => {
    getSize();
  }
  //set tmp token when setting isNeedLogin false
});
onMounted(() => {
  getSize();
});

</script> 
<style lang="scss">
@import 'animate.css';
@import '@/assets/css/reset.scss';
@import '@/assets/css/minemap.css';
@import '@/assets/fonts/fonts.scss';
@import '@/assets/iconfonts/iconfont.css';

.d-control-progress,
.d-player-state,
.d-player-top {
  display: none !important;
}

.root {
  width: 1920px;
  height: 1080px;
  background-size: 100%;
  transform-origin: 0 0 0;
}
</style>