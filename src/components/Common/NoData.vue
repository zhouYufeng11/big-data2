<script lang="ts" setup>
  const props = defineProps({
    height: {
      type: Number,
      default: 0
    }
  })
</script>

<template>
  <div class="no-data-wrap" :style="{ height: height ? height + 'px' : '100%' }">-- 暂无数据 --</div>
</template>


<style lang="scss" scoped>
  .no-data-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-size: 22px;
    font-weight: bold;
  }
</style>
