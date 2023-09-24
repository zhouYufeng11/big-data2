<script lang="ts" setup>
</script>

<template>
  <router-link to="/">
    <div class="back-index animate__animated animate__fadeInLeft">
      <p>返回首页</p>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.back-index {
  position: fixed;
  top: 90px;
  left: 30px;
  width: 159px;
  height: 48px;
  background: url('@/assets/images/backIndex.png') center / cover no-repeat;
  z-index: 1;

  p {
    line-height: 48px;
    font-size: 20px;
    text-indent: 30px;
    color: #ffffff;
  }
}
</style>