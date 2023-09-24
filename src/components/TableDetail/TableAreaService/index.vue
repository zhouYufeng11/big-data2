<template>
	<div class="detail-table">
		<!-- <div class="detail-filter">
			<p class="detail-filter-btn" :class="[v.active && 'active']" @click="typeChange(v.gkzrdw, i)"
				v-for="(v, i) in filterTypeList" :key="v.gkzrdw">{{ v.gkzrdwName }}</p>
		</div> -->
		<div class="bth-group">
			<button :class="['next', { disabled: isNextDisabled }]" :disabled="isNextDisabled"
				@click="nextDay">&lt;&lt;</button>
			<div class="date-wrap">{{ curDate }}</div>
			<button :class="['prev', { disabled: isPrevDisabled }]" :disabled="isPrevDisabled" @click="prevDay">>></button>
		</div>
		<div class="detail-table-container">
			<div class="table-item">
				<div class="police-title">局领导、指挥长</div>
				<div class="police">
					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.dbldxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">主班</p>
						<p class="name">{{ tableObj.dbldxm }}</p>
						<p class="phone">{{ tableObj.dblddh }}</p>
					</div>
					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.fbldxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">副班</p>
						<p class="name">{{ tableObj.fbldxm }}</p>
						<p class="phone">{{ tableObj.fblddh }}</p>
					</div>
					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.zzbzxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">指挥长A</p>
						<p class="name">{{ tableObj.zzbzxm }}</p>
						<p class="phone">{{ tableObj.zzbzdh }}</p>
					</div>
					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.zhzxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">指挥长B</p>
						<p class="name">{{ tableObj.zhzxm }}</p>
						<p class="phone">{{ tableObj.zhzdh }}</p>
					</div>
				</div>
			</div>
			<div class="table-item">
				<div class="police-title">其他部门</div>
				<div class="police">
					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.zhglxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">综合管理</p>
						<p class="name">{{ tableObj.zhglxm }}</p>
						<p class="phone">{{ tableObj.zhgldh }}</p>
					</div>

					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.qbzxzbxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">情报中心</p>
						<p class="name">{{ tableObj.qbzxzbxm }}</p>
						<p class="phone">{{ tableObj.qbzxzbdh }}</p>
					</div>

					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.ypzcxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">研判支撑</p>
						<p class="name">{{ tableObj.ypzcxm }}</p>
						<p class="phone">{{ tableObj.ypzcdh }}</p>
					</div>
					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.yqczxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">舆情处置</p>
						<p class="name">{{ tableObj.yqczxm }}</p>
						<p class="phone">{{ tableObj.yqczdh }}</p>
					</div>

					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.jcgkxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">基础管控</p>
						<p class="name">{{ tableObj.jcgkxm }}</p>
						<p class="phone">{{ tableObj.jcgkdh }}</p>
					</div>

					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.spypxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">视频研判</p>
						<p class="name">{{ tableObj.spypxm }}</p>
						<p class="phone">{{ tableObj.spypdh }}</p>
					</div>

					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.zfzdxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">执法指导</p>
						<p class="name">{{ tableObj.zfzdxm }}</p>
						<p class="phone">{{ tableObj.zfzddh }}</p>
					</div>

					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.kjbzxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">科技保障</p>
						<p class="name">{{ tableObj.kjbzxm }}</p>
						<p class="phone">{{ tableObj.kjbzdh }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Message } from '@arco-design/web-vue';
import { fjzb } from '@/api/index';
import Avatar from '@/assets/images/avatar.png';

const count: any = ref(0);	//	用来记录当前是第几天
//	默认是今天的
const isPrevDisabled: any = computed(() => {
	if (count.value <= 0) {
		return true;
	} else {
		return false;
	}
});
const isNextDisabled: any = ref(false);

//	显示当前时间
const curDate: any = computed(() => {
	const zbrq = formatDate(count.value);
	return zbrq;
})

function formatDate(payload: any) {
	const timeout = 1000 * 60 * 60 * 24; //	获取一天的毫秒
	payload = Date.now() - (payload * timeout);
	const d = new Date(payload);

	let month: any = d.getMonth() + 1;
	if (month < 10) month = '0' + month;
	let day: any = d.getDate();
	if (day < 10) day = '0' + day;

	//格式化
	return d.getFullYear() + '' + month + '' + day;
}


//	前一天
const prevDay = () => {
	if (count.value > 0) {
		count.value--;
		fetchData({ zbrq: curDate.value });
	}
}

//  后一天
const nextDay = () => {
	count.value++;
	fetchData({ zbrq: curDate.value });
}


const imgError = (e: any) => {
	return e.target.src = Avatar
};

// 姜堰分局
/**
dblddh 局主班领导电话
dbldxm 局主班领导姓名
fblddh 局副班领导电话
fbldxm 局副班领导姓名

zzbzdh 指挥长A电话
zzbzxm 指挥长A姓名
zhzdh 指挥长B电话
zhzxm 指挥长B姓名

zhgldh 综合管理电话
zhglxm 综合管理姓名

qbzxzbdh 情报中心值班电话
qbzxzbxm 情报中心值班姓名

ypzcdh 研判支撑电话
ypzcxm 研判支撑姓名

yqczdh 舆情处置电话
yqczxm 舆情处置姓名

jcgkdh 基础管控电话
jcgkxm 基础管控姓名

spypdh 视频研判电话
spypxm 视频研判姓名

zfzddh 执法指导电话
zfzdxm 执法指导姓名

kjbzdh 科技保障电话
kjbzxm 科技保障姓名

 */
const tableObj: any = ref([]);
const fetchData = (opt: any = {}) => {
	fjzb(opt).then((res: any) => {
		if (res.code === 200) {
			tableObj.value = res.data[0] || {};
		} else {
			Message.error(res.msg)
		}
	}).catch((err: any) => {
		console.log(err)
	})
}


onMounted(() => {
	fetchData({ zbrq: curDate.value });
})

</script>

<style lang="scss" scoped>
.bth-group {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 0 16px;

	.prev {
		width: 80px;
		height: 60px;
		font-size: 30px;
		color: #08e9eb;
		background: transparent;
		box-sizing: border-box;


		&.disabled {
			color: #808080;
		}
	}

	.date-wrap {
		font-size: 30px;
		padding: 0 20px;
	}

	.next {
		width: 80px;
		height: 60px;
		font-size: 30px;
		color: #08e9eb;
		background: transparent;


		&.disabled {
			color: #808080;
		}
	}
}

.detail-table {
	height: 100%;
	width: 100%;

	.detail-filter {
		display: flex;
		flex-wrap: wrap;

		.detail-filter-btn {
			width: 110px;
			height: 25px;
			line-height: 25px;
			text-align: center;
			color: #fff;
			cursor: pointer;
			font-size: 16px;
			margin-right: 10px;
			margin-bottom: 10px;
			background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.20) 49%, rgba(9, 157, 254, 0.00));
			border: 1px solid;
			border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), rgba(255, 255, 255, 0.35) 52%, rgba(255, 255, 255, 0.00)) 1 1;
			box-shadow: 0px 0px 11px 0px rgba(0, 22, 133, 0.24);

			&:nth-child(6n) {
				margin-right: 0;
			}

			&:nth-child(n + 12) {
				margin-bottom: 0;
			}

			&.active,
			&:hover {
				background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.50) 49%, rgba(9, 157, 254, 0.00));
				border: 1px solid;
				border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), #ffffff 52%, rgba(255, 255, 255, 0.00)) 1 1;
				box-shadow: 0px 2px 4px 0px rgba(0, 43, 176, 0.50), 0px 0px 11px 0px rgba(0, 22, 133, 0.24);
			}
		}
	}

	.detail-table-container {
		position: relative;
		height: 570px;
		overflow-y: auto;

		/* SCROLL STYLE */
		&::-webkit-scrollbar-track {
			background-color: transparent;
		}

		&::-webkit-scrollbar {
			width: 10px;
			background-color: transparent;
		}

		&::-webkit-scrollbar-thumb {
			background-color: rgba(134, 144, 156, .5);
			border-radius: 6px;
		}

		.table-item {
			text-align: center;

			.police-title {
				height: 40px;
				line-height: 40px;
				width: 100%;
				text-align: center;
				color: #fff;
				font-size: 30px;
				background: linear-gradient(270deg, rgba(10, 147, 254, 0.00), rgba(9, 134, 254, 0.50) 49%, rgba(9, 157, 254, 0.00));
				border: 1px solid;
				border-image: linear-gradient(270deg, rgba(255, 255, 255, 0.00), #ffffff 52%, rgba(255, 255, 255, 0.00)) 1 1;
				box-shadow: 0px 0px 11px 0px rgba(0, 22, 133, 0.24);
			}

			.police {
				display: flex;
				width: 100%;
				overflow-x: auto;

				/* SCROLL STYLE */
				&::-webkit-scrollbar-track {
					background-color: transparent;
				}

				&::-webkit-scrollbar {
					height: 10px;
					background-color: transparent;
				}

				&::-webkit-scrollbar-thumb {
					background-color: rgba(134, 144, 156, .5);
					border-radius: 6px;
				}
			}

			.police-item {
				width: 145px;
				height: 130px;
				margin: 20px;
				position: relative;

				// .img-box {
				// 	height: 200px;
				// 	width: 100%;
				// 	font-size: 0;

				// 	img {
				// 		height: 100%;
				// 		width: 100%;
				// 	}
				// }

				.pos {
					height: 30px;
					line-height: 30px;
					width: 100%;
					font-size: 22px;
					background: #003C90;
				}

				.name {
					font-size: 26px;
					margin: 10px 0;
					color: #4cead0;
				}

				.phone {
					font-size: 20px;
					color: #08e9eb;
				}
			}
		}
	}
}
</style>
