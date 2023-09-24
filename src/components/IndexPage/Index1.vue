<template>
  <div class="qw-wrap-1">
    <div class="top-wrap">
      <div class="item">
        <p>局领导主班</p>
        <p>{{ showObj[0].name }}</p>
      </div>
      <div class="item">
        <p>局领导副班</p>
        <p>{{ showObj[1].name }}</p>
      </div>
      <div class="item">
        <p>指挥长A</p>
        <p>{{ showObj[2].name }}</p>
      </div>
      <div class="item">
        <p>指挥长B</p>
        <p>{{ showObj[3].name }}</p>
      </div>
    </div>
    <div class="bottom-wrap">
      <div class="table">
        <div class="item" v-for="(s, i) of showList">
          <p class="p-left">{{ s.grade }}</p>
          <p class="p-right">{{ s.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch, computed } from 'vue';

const props = defineProps({
  dataList: {
    type: Array<any[]>,
    default: []
  },
  height: {
    type: Number,
    default: 200
  }
})

const tableHeight = props.height - 20 + 'px';
const showListHeight = ref(props.height + 'px');
const sliderSecond: any = ref('20s');
const showList: any = ref([]);
const showObj: any = ref([]);

watch(() => props.dataList, (newValue: any) => {
  console.log(newValue);
  showObj.value = newValue.slice(0, 4);
  showList.value = newValue.slice(4);
  // 子项个数 * 40 < 总高度 ===> 停止滚动
  if (showList.length * 40 < props.height) {
    showListHeight.value = '100%'
  }
  sliderSecond.value = `${Math.floor(showList.value.length * 1)}s`
})
</script>
<style lang="scss" scoped>
.qw-wrap-1 {
  height: 100%;

  .top-wrap {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px 0;

    .item {
      margin-bottom: 4px;
      padding-top: 8px;
      padding-left: 50px;
      width: 196px;
      height: 44px;
      box-sizing: border-box;
      background: url('@/assets/images/index1.png') center / cover no-repeat;
    }
  }

  .bottom-wrap {
    position: relative;
    height: v-bind(tableHeight);
    margin-top: -10px;
    overflow: hidden;

    .table {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0 20px;
      animation: scrollBot 20s linear infinite;
      animation-duration: v-bind(sliderSecond);
      box-sizing: border-box;

      &:hover {
        animation-play-state: paused;
      }

      .item {
        padding: 0 10px;
        margin-bottom: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 196px;
        height: 32px;
        box-sizing: border-box;
        font-size: 13px;
        cursor: pointer;
        background: center/contain no-repeat url('@/assets/images/index2.png');

        &:nth-child(2n) {
          background: rgba(52, 112, 214, 0.2);
        }

        &:hover {
          background: rgba(52, 112, 214, 0.4);

          div {
            color: #00bbfa;
          }
        }
      }
    }
  }
}

@keyframes scrollBot {
  0% {
    transform: translateY(0)
  }

  to {
    transform: translateY(calc(-100% + v-bind(showListHeight)))
  }
}
</style>