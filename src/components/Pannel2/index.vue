<template>
	<div class="pannel" :class="changePannel" :style="{ height: height + 'px', width: width + 'px' }">
		<PannelTitle2 :title="title" />
		<div class="pannel-wrap" :style="{ height: height - 70 + 'px', width: width + 'px' }">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PannelTitle2 from '@/components/PannelTitle2/index.vue';
// import { mainStore } from "@/store/index"


const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	width: {
		type: [Number],
		default: 457
	},
	height: {
		type: [Number],
		default: 309
	},
	pannelType: {
		type: Number,
		default: 1
	},
	pageType: {
		type: String,
		default: ''
	},
	subTitle: {
		type: String,
		default: ''
	}
})

// // 状态
// const store = mainStore()

// const showPage = () => {
// 	fkData([ 'list' ], opt).then((res: any) => {
//     if (res.code === 200) {
// 			tableAreaTotal.value = res.total;
//       tableAreaList.value = res.rows.map((item: any, index: any) => {
//         item.xh = index + 1;
//         return item;
//       });
//     } else {
//       Message.error(res.msg)
//     }
//   }).catch((err: any) => {
//     console.log(err)
//   })
// 	store.setPage(true);
// 	store.setPageTitle((props.subTitle || props.title) + '详情');
// 	store.setPageType(props.pageType);
// }

let changePannel = computed(() => {
	const status = props.pannelType;

	switch (status) {
		case 1:
			return 'pannel1';
		case 2:
			return 'pannel2';
		case 3:
			return 'pannel3';
		case 4:
			return 'pannel4';
		case 5:
			return 'pannel5';
		case 6:
			return 'pannel6';
		default:
			return 'pannel1'
	}
})

</script>

<style lang="scss" scoped>
.pannel {
	position: relative;
	margin-bottom: 20px;
	width: 100%;
	height: 100%;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;

	&.pannel1 {
		background-image: url('../../assets/images/pannel1.png');
	}

	&.pannel2 {
		background-image: url('../../assets/images/pannel2.png');
	}

	&.pannel3 {
		background-image: url('../../assets/images/pannel3.png');
	}

	&.pannel4 {
		background-image: url('../../assets/images/pannel4.png');
	}

	&.pannel5 {
		background-image: url('../../assets/images/pannel5.png');
	}

	&.pannel6 {
		background-image: url('../../assets/images/pannel6.png');
	}

	.pannel-wrap {
		position: relative;
		background: linear-gradient(180deg, rgba(1, 16, 39, .5) 20%, rgba(1, 16, 39, .9) 50%, transparent);
	}
}
</style>