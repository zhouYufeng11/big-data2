<template>
	<div class="detail-table">
		<div class="detail-filter">
			<a class="detail-filter-btn" :class="[curStatus == i && 'active']" v-for="(v, i) in filterTypeList" :key="v.dictLabel"
				href="javascript:void(0)" @click="goAnchor(v, i)">{{ v.dictLabel }}</a>
		</div>
		<div class="bth-group">
			<button :class="['next', { disabled: isNextDisabled }]" :disabled="isNextDisabled"
				@click="nextDay">&lt;&lt;</button>
			<div class="date-wrap">{{ curDate }}</div>
			<button :class="['prev', { disabled: isPrevDisabled }]" :disabled="isPrevDisabled" @click="prevDay">>></button>
		</div>
		<div class="detail-table-container" ref="tableContainer">
			<div class="table-item" v-if="tableObj.dbldxm">
				<div class="police-title">分局局领导、指挥长</div>
				<div class="police">
					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.dbldxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">主班领导</p>
						<p class="name">{{ tableObj.dbldxm }}</p>
						<p class="phone">{{ tableObj.dblddh }}</p>
					</div>
					<div class="police-item">
						<!-- <p class="img-box"><img :src="tableObj.fbldxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">副班领导</p>
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
				<div class="police-title" v-if="tableObj.zhglxm">分局实战赋能中心</div>
				<div class="police">
					<div class="police-item" v-if="tableObj.zhglxm">
						<!-- <p class="img-box"><img :src="tableObj.zhglxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">综合管理</p>
						<p class="name">{{ tableObj.zhglxm }}</p>
						<p class="phone">{{ tableObj.zhgldh }}</p>
					</div>

					<div class="police-item" v-if="tableObj.qbzxzbxm">
						<!-- <p class="img-box"><img :src="tableObj.qbzxzbxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">情报中心</p>
						<p class="name">{{ tableObj.qbzxzbxm }}</p>
						<p class="phone">{{ tableObj.qbzxzbdh }}</p>
					</div>

					<div class="police-item" v-if="tableObj.ypzcxm">
						<!-- <p class="img-box"><img :src="tableObj.ypzcxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">研判支撑</p>
						<p class="name">{{ tableObj.ypzcxm }}</p>
						<p class="phone">{{ tableObj.ypzcdh }}</p>
					</div>
					<div class="police-item" v-if="tableObj.yqczxm">
						<!-- <p class="img-box"><img :src="tableObj.yqczxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">舆情处置</p>
						<p class="name">{{ tableObj.yqczxm }}</p>
						<p class="phone">{{ tableObj.yqczdh }}</p>
					</div>

					<div class="police-item" v-if="tableObj.jcgkxm">
						<!-- <p class="img-box"><img :src="tableObj.jcgkxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">基础管控</p>
						<p class="name">{{ tableObj.jcgkxm }}</p>
						<p class="phone">{{ tableObj.jcgkdh }}</p>
					</div>

					<div class="police-item" v-if="tableObj.spypxm">
						<!-- <p class="img-box"><img :src="tableObj.spypxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">视频研判</p>
						<p class="name">{{ tableObj.spypxm }}</p>
						<p class="phone">{{ tableObj.spypdh }}</p>
					</div>

					<div class="police-item" v-if="tableObj.zfzdxm">
						<!-- <p class="img-box"><img :src="tableObj.zfzdxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">执法指导</p>
						<p class="name">{{ tableObj.zfzdxm }}</p>
						<p class="phone">{{ tableObj.zfzddh }}</p>
					</div>

					<div class="police-item" v-if="tableObj.kjbzxm">
						<!-- <p class="img-box"><img :src="tableObj.kjbzxmUrl || Avatar" @error="imgError" alt="avatar"></p> -->
						<p class="pos">科技保障</p>
						<p class="name">{{ tableObj.kjbzxm }}</p>
						<p class="phone">{{ tableObj.kjbzdh }}</p>
					</div>
				</div>
			</div>
			<div class="table-item" v-for="(v, i) in tableList" :key="v.pcsName">
				<div class="police-title">{{ v.pcsName }} <span v-if="v.zbdh">（{{ v.zbdh }}）</span></div>
				<div class="police">
					<div class="police-item" v-if="v.dbldxm">
						<p class="pos">带班领导</p>
						<p class="name">{{ v.dbldxm }}</p>
						<p class="phone">{{ v.dblddh }}</p>
					</div>
					<div class="police-item" v-if="v.zbmj1xm">
						<p class="pos">主班民警1</p>
						<p class="name">{{ v.zbmj1xm }}</p>
						<p class="phone">{{ v.zbmj1dh }}</p>
					</div>
					<div class="police-item" v-if="v.zbmj2xm">
						<p class="pos">主班民警2</p>
						<p class="name">{{ v.zbmj2xm }}</p>
						<p class="phone">{{ v.zbmj2dh }}</p>
					</div>
					<div class="police-item" v-if="v.zbmj3xm">
						<p class="pos">主班民警3</p>
						<p class="name">{{ v.zbmj3xm }}</p>
						<p class="phone">{{ v.zbmj3dh }}</p>
					</div>
					<div class="police-item" v-if="v.zbmj4xm">
						<p class="pos">主班民警4</p>
						<p class="name">{{ v.zbmj4xm }}</p>
						<p class="phone">{{ v.zbmj4dh }}</p>
					</div>
					<div class="police-item" v-if="v.swbfjxm">
						<p class="pos">上午班辅警</p>
						<p class="name">{{ v.swbfjxm }}</p>
						<p class="phone">{{ v.swbfjdh }}</p>
					</div>
					<div class="police-item" v-if="v.xwbfjxm">
						<p class="pos">下午班辅警</p>
						<p class="name">{{ v.xwbfjxm }}</p>
						<p class="phone">{{ v.xwbfjdh }}</p>
					</div>
					<div class="police-item" v-if="v.yjbfjxm">
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
import { ref, onMounted, computed, nextTick } from 'vue';
import { Message } from '@arco-design/web-vue';
import { pcszb, fjzb } from '@/api/index';
import { mainStore } from '@/store';

const store: any = mainStore();
const curStatus: any = ref(0);

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
		fetchData2({ zbrq: curDate.value });
	}
}

//  后一天
const nextDay = () => {
	count.value++;
	fetchData({ zbrq: curDate.value });
	fetchData2({ zbrq: curDate.value });
}


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
const tableContainer = ref();
const filterTypeList: any = ref([]);
const tableObj: any = ref({});
const tableList: any = ref([]);
// 滚动
const goAnchor = (obj: any, index: any) => {
	curStatus.value = index;
	tableContainer.value.scrollTo({
		top: obj.scrollTop,
		behavior: "smooth"
	});
}
// 分局
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

const fetchData2 = async (opt: any = {}) => {
	return await pcszb(opt).then(async (res: any) => {
		if (res.code === 200) {
			tableList.value = res.data;
			filterTypeList.value = [
				{ dictLabel: '分局局领导、指挥长', active: true, scrollTop: 0, },
				{ dictLabel: '分局实战赋能中心', active: false, scrollTop: 225, },
				...res.data.map((s: any, i: number) => {
					return {
						dictLabel: s.pcsName,
						active: false,
						scrollTop: (i + 2) * 225,
					};
				})
			];
			
			nextTick(() => {
				//	初始化数据的位置
				initStatus(filterTypeList.value);
			})
		} else {
			Message.error(res.msg)
		}
	}).catch((err: any) => {
		console.log(err)
	})
}

const initStatus = (dic: any) => {
	let { key, value } = store.pageMsg;
	
if(value) {	//	判断value值是否存在
	let item: any = null;
	let doc: any = null;
	let parent: any = tableContainer.value.children;
	if( key == 'pcs' ) {
		dic.some((s: any, i: any) => {
			if(s.dictLabel === value) {
				goAnchor(s, i);
			}

			return s.dictLabel === value;
		})
	}

	 //	在第一请求的时候初始化 数据筛选 配置项，并清空配置项
	store.setpageMsg({});
}
}


onMounted(async () => {
	fetchData({ zbrq: curDate.value });
	fetchData2({ zbrq: curDate.value });
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
			color: rgba(134, 144, 156, .5);
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
			color: rgba(134, 144, 156, .5);
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
			padding: 0 14px;
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
		height: 500px;
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
			height: 225px;
			overflow: hidden;

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
					margin: 20px 0 10px 0;
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
