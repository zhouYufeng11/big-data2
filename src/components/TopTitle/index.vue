<template>
  <div class="top-title animate__animated animate__fadeInDown">
    <p class="left-loading">
      <span class="span-1"></span>
      <span class="span-2"></span>
      <span class="span-3"></span>
      <span class="span-4"></span>
      <span class="span-5"></span>
      <span class="span-6"></span>
      <span class="span-7"></span>
    </p>
    <p class="right-loading">
      <span class="span-1"></span>
      <span class="span-2"></span>
      <span class="span-3"></span>
      <span class="span-4"></span>
      <span class="span-5"></span>
      <span class="span-6"></span>
      <span class="span-7"></span>
    </p>
    <h1 class="title-box">
      <p class="logo-box"><img class="logo" src="../../assets/logo.png" alt="logo"></p>
      <p class="title" @click="jumpTo">{{ title }}</p>
    </h1>
    <p class="time">{{ timer }}</p>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"

const props = defineProps({
  title: {
    type: String,
    default: "堰上云数据驾驶舱",
  },
})

const timer = ref('');
const getNowTime = () => {
  setInterval(() => {
    //获取年月日
    var time = new Date();
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    //获取时分秒
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    //检查是否小于10
    month = checkTime(month);
    day = checkTime(day);
    h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
    timer.value = `${year}/${month}/${day} ${h}:${m}:${s}`;
  }, 1000);
}

const checkTime = (i: any) => { // 时间数字小于10，则在之前加个 '0' 补位。
  var num;
  i < 10 ? num = '0' + i : num = i;
  return num;
}

onMounted(() => {
  getNowTime();
})

const router = useRouter()

const jumpTo = () => {
  router.push("/")
}
</script>

<style lang="scss" scoped>
$loadingLens: 7;

.top-title {
  width: 100%;
  height: 110px;
  margin-bottom: 45px;
  position: relative;
  background: url("../../assets/images/top.png") center / contain no-repeat;

  .left-loading,
  .right-loading {
    display: flex;
    position: absolute;
    top: 57px;

    span {
      width: 12px;
      height: 24px;
      margin: 0 7px;
      box-shadow: 0 0 20px rgba(9, 156, 247, 0.9);
      border: 1px solid #038fea;
    }
  }

  .left-loading {
    left: 340px;

    span {
      transform: skewX(45deg);
    }

    @for $i from 1 through $loadingLens {
      .span-#{$i} {
        background: rgba(0, 255, 255, calc($i / $loadingLens));
        animation: fade 1.5s ease-out infinite forwards;
        animation-delay: ($loadingLens - $i) * .1s;
      }
    }
  }

  .right-loading {
    right: 340px;

    span {
      transform: skewX(-45deg);
    }

    @for $i from 1 through 7 {
      .span-#{$i} {
        background: rgba(0, 253, 255, calc((10 - $i) / 10));
        animation: fade 1.5s ease-out infinite forwards;
        animation-delay: $i * .1s;
      }
    }
  }

  .title-box {
    height: 90px;
    display: flex;
    justify-content: center;

    .logo-box {
      margin: 7px 15px 0 0;
      font-size: 0;
      height: 76px;

      .logo {
        height: 100%;
      }
    }

    .title {
      padding-right: 8px;
      line-height: 90px;
      font-family: "YouSheBiaoTiHei";
      user-select: none;
      cursor: pointer;
      font-size: 66px;
      letter-spacing: 5px;
      text-indent: 2px;
      text-shadow: 0 0 8px #038fea, 0 0 12px #d7f2ff;

      // background: linear-gradient(135deg, #44b0f8, #fff);
      // background-size: 200% 200%;
      // -webkit-text-fill-color: transparent;
      // -webkit-background-clip: text;
      // animation: gradientAnimation 2s linear infinite alternate;
      &:hover {
        color: #08e9eb;
      }
    }
  }

  .time {
    position: absolute;
    right: 30px;
    top: 75px;
    cursor: pointer;
    user-select: none;
    font-size: 20px;
  }
}

@keyframes gradientAnimation {
  0% {
    background-position: 0 50%;
  }

  50% {
    background-position: 100% 100%;
  }

  100% {
    background-position: 0 50%;
  }
}
</style>