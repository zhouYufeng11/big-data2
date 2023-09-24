<template>
	<div class="detail-table">
		<div class="detail-filter">
			<p class="detail-filter-btn" :class="[v.active && 'active']" @click="typeChange(v.dictValue, i)"
				v-for="(v, i) in filterTypeList" :key="v.dictValue">{{ v.dictLabel }}</p>
		</div>
		<div class="bth-group">
			<button :class="['next', { disabled: isNextDisabled }]" :disabled="isNextDisabled"
				@click="nextDay">&lt;&lt;</button>
			<div class="date-wrap">{{ curDate }}</div>
			<button :class="['prev', { disabled: isPrevDisabled }]" :disabled="isPrevDisabled" @click="prevDay">>></button>
		</div>
		<div class="detail-table-container">
			<div class="table-item" v-for="(v, i) in tableList" :key="v.posName">
				<div class="police-title">{{ v.posName }} <span v-if="v.zbdh">（{{ v.zbdh }}）</span></div>
				<div class="police">
					<div class="police-item" v-if="v.dbldxm">
						<p class="img-box"><img :src="v.dbldxmUrl || Avatar" @error="imgError" alt="avatar"></p>
						<p class="pos">带班领导</p>
						<p class="name">{{ v.dbldxm }}</p>
						<p class="phone">{{ v.dblddh }}</p>
					</div>
					<div class="police-item" v-if="v.zbmj1xm">
						<p class="img-box"><img :src="v.zbmj1xmUrl || Avatar" @error="imgError" alt="avatar"></p>
						<p class="pos">主班民警1</p>
						<p class="name">{{ v.zbmj1xm }}</p>
						<p class="phone">{{ v.zbmj1dh }}</p>
					</div>
					<div class="police-item" v-if="v.zbmj2xm">
						<p class="img-box"><img :src="v.zbmj2xmUrl || Avatar" @error="imgError" alt="avatar"></p>
						<p class="pos">主班民警2</p>
						<p class="name">{{ v.zbmj2xm }}</p>
						<p class="phone">{{ v.zbmj2dh }}</p>
					</div>
					<div class="police-item" v-if="v.zbmj3xm">
						<p class="img-box"><img :src="v.zbmj3xmUrl || Avatar" @error="imgError" alt="avatar"></p>
						<p class="pos">主班民警3</p>
						<p class="name">{{ v.zbmj3xm }}</p>
						<p class="phone">{{ v.zbmj3dh }}</p>
					</div>
					<div class="police-item" v-if="v.zbmj4xm">
						<p class="img-box"><img :src="v.zbmj4xmUrl || Avatar" @error="imgError" alt="avatar"></p>
						<p class="pos">主班民警4</p>
						<p class="name">{{ v.zbmj4xm }}</p>
						<p class="phone">{{ v.zbmj4dh }}</p>
					</div>
					<div class="police-item" v-if="v.swbfjxm">
						<p class="img-box"><img :src="v.swbfjxmUrl || Avatar" @error="imgError" alt="avatar"></p>
						<p class="pos">上午班辅警</p>
						<p class="name">{{ v.swbfjxm }}</p>
						<p class="phone">{{ v.swbfjdh }}</p>
					</div>
					<div class="police-item" v-if="v.xwbfjxm">
						<p class="img-box"><img :src="v.xwbfjxmUrl || Avatar" @error="imgError" alt="avatar"></p>
						<p class="pos">下午班辅警</p>
						<p class="name">{{ v.xwbfjxm }}</p>
						<p class="phone">{{ v.xwbfjdh }}</p>
					</div>
					<div class="police-item" v-if="v.yjbfjxm">
						<p class="img-box"><img :src="v.yjbfjxmUrl || Avatar" @error="imgError" alt="avatar"></p>
						<p class="pos">夜间班辅警</p>
						<p class="name">{{ v.yjbfjxm }}</p>
						<p class="phone">{{ v.yjbfjdh }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { Message } from '@arco-design/web-vue';
import { pcszb } from '@/api/index';
import { dic_interface } from '@/api/dic';
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

// 下辖派出所
/**
pcsbmDicttext 派出所名称
zbdh 值班电话
zbrq 值班日期
zbrqDicttext 值班日期Text
pcsbm 派出所编码

dbldxm 带班领导姓名
dblddh 带班领导电话

zbmj1xm 主班民警1姓名
zbmj2xm 主班民警2姓名
zbmj3xm 主班民警3姓名
zbmj4xm 主班民警4姓名
zbmj1dh 主班民警1电话
zbmj2dh 主班民警2电话
zbmj3dh 主班民警3电话
zbmj4dh 主班民警4电话

swbfjxm 上午班辅警姓名
swbfjdh 上午班辅警电话

xwbfjxm 下午班辅警姓名
xwbfjdh 下午班辅警电话

yjbfjxm 夜间班辅警姓名
yjbfjdh 夜间班辅警电话

*/
const filterTypeList: any = ref([]);
const posType: any = ref('');
const tableList: any = ref([]);

const typeChange = (type: string, index: number) => {
	posType.value = type;
	// 获取数据
	fetchData({
		zbrq: curDate.value,
		pcsbmDicttext: posType.value
	});
	filterTypeList.value.forEach((s: any, i: number) => {
		s.active = index === i;
	});
};

const fetchDataDic = () => {
	dic_interface({
		dictType: 'jwpt_zrdw'
	}).then(async (res: any) => {
		if (res.code === 200) {
			filterTypeList.value = [
				{ dictLabel: '全部', dictValue: '', active: true },
				...res.data.map((s: any) => {
					s.active = false;
					return s;
				})
			];

			// 获取数据
			fetchData({
				zbrq: curDate.value,
				pcsbmDicttext: posType.value
			});
		} else {
			Message.error(res.msg)
		}
	}).catch((err: any) => {
		console.log(err)
	})
}
// 获取派出所名称
const getPosName = (name: string) => {
	const findOne = filterTypeList.value.find((s: any) => {
		return s.dictValue === name;
	});
	return findOne.dictLabel || '';
}
const fetchData = (opt: any = {}) => {
	pcszb(opt).then(async (res: any) => {
		if (res.code === 200) {
			tableList.value = res.data.map((s: any) => {
				s.posName = getPosName(s.pcsbmDicttext);
				return s;
			});
		} else {
			Message.error(res.msg)
		}
	}).catch((err: any) => {
		console.log(err)
	})
}

onMounted(() => {
	fetchDataDic();
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
		margin-bottom: 10px;

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

			&:nth-child(11n) {
				margin-right: 0;
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
		height: 560px;
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
				height: 270px;
				margin: 20px;
				position: relative;

				.img-box {
					height: 200px;
					width: 100%;
					font-size: 0;

					img {
						width: 100%;
						height: 100%;
					}
				}

				.pos {
					position: absolute;
					top: 0;
					left: 0;
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
