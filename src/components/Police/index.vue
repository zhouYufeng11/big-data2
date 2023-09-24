<template>
  <div class="policeList">
    <div class="police-item" v-for="(v, i) in policeList" :key="i">
      <div class="police-wrap" :class="[v.active && 'active']">
        <p class="type">{{ v.policeTypeName }}</p>
        <p class="img-box">
          <img :src="v.policePicUrl" alt="附件">
        </p>
        <p class="name">{{ v.policeName }}</p>
        <p class="code">{{ v.policeCode }}</p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { dutyPolice } from '@/api/index'
import { dic_PoliceType } from '@/api/dic'
import { Message } from "@arco-design/web-vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
})

const typeList: any = ref([]);
const policeList: any = ref([]);
const checkType = (type: string): string => {
  return typeList.value.find((s: any) => s.key === type)?.value || '未知';
}

const fetchDicData = async () => {
  return await dic_PoliceType({}).then((res: any) => {
    if (res.code = 200) {
      typeList.value = res.data.map((s: any) => {
        return { key: s.dictValue, value: s.dictLabel }
      });
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

const fetchData = async () => {
  return await dutyPolice({}).then((res: any) => {
    if (res.code = 200) {
      policeList.value = res.rows.map((s: any) => {
        s.policeTypeName = checkType(s.policeType);
        s.active = s.policeType === '1' ? 1 : 0;
        return s;
      });
    } else {
      Message.error(res.msg)
    }
  }).catch(err => {
    console.log(err)
  })
}

onMounted(async () => {
  await fetchDicData();
  await fetchData();
  // policeList.value = [
  //   { type: '代班领导', name: '王小辉', num: '129666', img: '', active: 1 },
  //   { type: '指挥长', name: '李明华', num: '129666', img: '', active: 0 },
  //   { type: '综合民警', name: '赵晓田', num: '129666', img: '', active: 0 },
  //   { type: '情报民警', name: '周武一', num: '129666', img: '', active: 0 },
  // ]
});

// const router = useRouter()

// const jumpTo = () => {
//   router.push("/")
// }
</script>

<style lang="scss" scoped>
.policeList {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 0 30px;

  .police-item {
    width: 131px;
    height: 203px;
    text-align: center;
    background: linear-gradient(180deg, rgba(0, 20, 69, 0.91) 5%, rgba(2, 42, 103, 0.33) 98%);

    .police-wrap {
      height: 100%;
      width: 100%;
      background: url('../../assets/images/p2.png') center / cover no-repeat;

      &.active {
        background-image: url('../../assets/images/p1.png');

        .name,
        .code {
          color: #1AEEB9;
        }
      }
    }

    .img-box {
      width: 90px;
      height: 110px;
      margin: 10px auto 0 auto;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .type {
      text-align: center;
      height: 22px;
      line-height: 22px;
    }

    .name,
    .code {
      color: #19C0FF;
      letter-spacing: 3px;
      text-indent: 3px;
    }

    .name {
      font-size: 16px;
      margin: 8.5px auto 3px auto;
    }
  }
}
</style>