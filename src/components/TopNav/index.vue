<template>
  <div class="topNav animate__animated animate__fadeInDown animate__delay-1s">
    <button v-for="v in routerList" :key="v.text" class="btn" type="button" :class="[v.active && 'active']"
      @click="jumpTo(v)">{{ v.text }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const routerList = ref([
  { text: '警情', path: '/show1', active: false },
  { text: '案件', path: '/show2', active: false },
  { text: '勤务', path: '/show3', active: false },
  { text: '风控', path: '/show4', active: false },
  { text: '舆情', path: '/show5', active: false },
  { text: '感知', path: '/show6', active: false },
]);

onBeforeMount(() => {
  const curPath = router?.currentRoute?.value?.path;
  routerList.value = routerList.value.map((s: any) => {
    if (s.path === curPath) s.active = true;
    else s.active = false;
    return s;
  })
})

const activeIndex = ref<number>(1);

const jumpTo = (item: any): void => {
  router.push(item.path);
}

</script>

<style lang="scss" scoped>
.topNav {
  position: absolute;
  left: 477px;
  top: 155px;
  width: 966px;
  height: 45px;
  display: flex;

  .btn {
    flex: 1;
    position: relative;
    text-align: center;
    font-size: 35px;
    color: #fff;
    background: transparent;

    &::after {
      content: '';
      position: absolute;
      bottom: -35px;
      left: 0;
      height: 87px;
      width: 166px;
      background: url('../../assets/images/btn.png') center / cover no-repeat;
    }

    &:hover,
    &.active {
      color: $color-theme;

      &::after {
        background: url('../../assets/images/btn-active.png') center / cover no-repeat;
      }
    }
  }
}
</style>