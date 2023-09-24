<template>
  <count-to :startVal="0" :endVal="num" :duration="duration" />
</template>

<script setup lang="ts">
import { CountTo } from 'vue3-count-to';

const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    default: 3000,
  }
})

</script>

<style lang="scss" scoped>
.showNum {}
</style>