<template>
  <div class="detail-wrap">
    <iframe v-if="iframeUrl" class="iframe" :src="iframeUrl" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const IFRAME_PREFIX = import.meta.env.VITE_APP_IFRAME_PREFIX;

const props = defineProps({
  caseId: {
    type: String,
    default: ''
  },
})
// 地址
let iframeUrl = props.caseId ? `${IFRAME_PREFIX}${props.caseId}/second` : '';



</script>

<style lang="scss" scoped>
.detail-wrap {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .iframe {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>