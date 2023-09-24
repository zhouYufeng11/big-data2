<template>
	<div class="con-table">
		<div class="table-box-header">
			<table align="center" vertical="center" border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col v-for="(t, s) in columns" :key="'head_col_head_' + s" :width="t.width" />
				</colgroup>
				<thead>
					<tr>
						<th :style="{ textAlign: h.align || 'left' }" v-for="(h, i) in columns" :key="'head_' + i">{{ h.title }}</th>
					</tr>
				</thead>
			</table>
		</div>
		<div class="table-box-body" :style="{ minHeight: height - 36 + 'px' }">
			<table align="center" vertical="center" border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col v-for="(t, s) in columns" :key="'head_col_body_' + s" :width="t.width" />
				</colgroup>
				<tbody>
					<tr v-for="(v, k) in dataList" :key="'list_' + k">
						<td :style="{ textAlign: t.align || 'left' }" v-for="(t, s) in columns" :key="'list_td_' + k + s">
							<p :class="[t.hasClassname ? v.classname : t.classname, isShowLevel && showLeave(v.djdj)]">{{ v[t.dataIndex] }}</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { mainStore } from "@/store/index"

// 状态
const store = mainStore()

// 关闭 dialog
const closeDialog = () => {
	store.setPage(false);
}
// 展示一个 dialog
const showOne = (obj: any) => {
	// closeDialog();
	// setTimeout(() => {
	// 	store.setPage(true);
	// }, 100);
}

const props = defineProps({
	columns: {
		type: Array<any[]>,
		default: []
	},
	dataList: {
		type: Array,
		default: []
	},
	height: {
		type: Number,
		default: 369
	},
	isShowLevel: {
		type: Boolean,
		default: true
	}
})

const tableHeight = props.height - 20 + 'px';
const showListHeight = ref((props.height - 60) + 'px');
const sliderSecond: any = ref('20s');

watch(() => props.dataList, (newValue: any) => {
	// 子项个数 * 40 < 总高度 = 停止滚动
	if (newValue.length * 40 < props.height) {
		showListHeight.value = '100%'
	}
	sliderSecond.value = `${Math.floor(newValue.length * 1.1)}s`
})


let showLeave = (val: any) => {
	switch(val) {
		case 1:
			return 'redText';
		case 2:
			return 'orangeText';
		case 3:
			return 'blueText'
		default: 
			return '';
	}
}

</script>

<style lang="scss" scoped>

.con-table {
	margin: 10px 20px 0 20px;
	// border: 1px solid #00bbfa;
	// border-radius: 6px;
	height: v-bind(tableHeight);
	overflow: hidden;

	.table-box-body {
		overflow: auto;

		table {
			animation: scrollBot 20s linear infinite;
			animation-duration: v-bind(sliderSecond);

			&:hover {
				animation-play-state: paused;
			}
		}
	}


	table {
		width: 100%;
		text-align: center;
		word-wrap: break-word;
		word-break: break-all;
		table-layout: fixed;
		border-collapse: separate;
		border: 0.6px solid #00366b;

		tr {
			th {
				color: #6CAEFF;
			}
		}

		td,
		th {
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			vertical-align: middle !important;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			text-align: left;
			padding: 0 10px;
		}

		th {
			font-size: 18px;
		}

		tbody {
			tr {
				height: 40px;
				line-height: 40px;
				cursor: pointer;

				&:nth-child(2n) {
					background: rgba(52, 112, 214, 0.2);
				}

				&:hover {
					background: rgba(52, 112, 214, 0.4);

					td {
						color: #00bbfa;
					}
				}
			}
		}

		tr td {
			color: #fff;

			.type {
				margin: 0 auto;
				height: 22px;
				line-height: 22px;
				background: url('../../assets/images/type.png') center / contain no-repeat;
			}

			&.danger {
				color: #eb9682;
			}

			&.warning {
				color: #ddcb9d;
			}

			&.success {
				color: #61d893;
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