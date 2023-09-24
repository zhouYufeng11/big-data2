<template>
	<div class="btn-box animate__animated animate__fadeInUp">
		<router-link to="show1">
			<div class="item item1">
				<p>警情</p>
			</div>
		</router-link>
		<router-link to="show2">
			<div class="item item2">
				<p>案件</p>
			</div>
		</router-link>
		<router-link to="show3">
			<div class="item item3">
				<p>勤务</p>
			</div>
		</router-link>
		<router-link to="show4">
			<div class="item item4">
				<p>风控</p>
			</div>
		</router-link>
		<router-link to="show5">
			<div class="item item5">
				<p>舆情</p>
			</div>
		</router-link>
		<router-link to="show6">
			<div class="item item6">
				<p>感知</p>
			</div>
		</router-link>
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const props = defineProps({
	showType: {
		type: Number,
		default: 1
	}
})

const showType = ref(1);
const emit = defineEmits(['btnClick']);
const setType = (type: number) => {
	showType.value = type;
	emit('btnClick', type)
}
</script>

<style lang="scss" scoped>
.btn-box {
	position: absolute;
	width: 100%;
	display: flex;
	justify-content: center;
	bottom: 60px;
	z-index: 0;

	.item {
		position: relative;
		width: 88px;
		height: 88px;
		float: left;
		margin-left: 79px;

		p {
			position: absolute;
			width: 100%;
			bottom: -10px;
			font-size: 20px;
			color: #ffffff;
		}

		&:hover p {
			color: #08e9eb;
		}
		
		&.item1 {
			margin-left: 0;
			background: url('@/assets/images/nav1.png') center / cover no-repeat;
		}
		&.item2 {
			background: url('@/assets/images/nav2.png') center / cover no-repeat;
		}
		&.item3 {
			background: url('@/assets/images/nav3.png') center / cover no-repeat;
		}
		&.item4 {
			background: url('@/assets/images/nav4.png') center / cover no-repeat;
		}
		&.item5 {
			background: url('@/assets/images/nav5.png') center / cover no-repeat;
		}
		&.item6 {
			background: url('@/assets/images/nav6.png') center / cover no-repeat;
		}
	}
}
</style>