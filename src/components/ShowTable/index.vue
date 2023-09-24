<template>
	<div class="con-table">
		<div class="table-box-header">
			<table align="center" vertical="center" border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col v-for="(t, s) in head" :key="'head_col_head_' + height + s" :width="t.width" />
				</colgroup>
				<thead>
					<tr>
						<th v-for="(h, i) in head" :key="'head_' + height + i">{{ h.text }}</th>
					</tr>
				</thead>
			</table>
		</div>
		<div class="table-box-body" :style="{ minHeight: height - 36 + 'px' }">
			<table align="center" vertical="center" border="0" cellspacing="0" cellpadding="0">
				<colgroup>
					<col v-for="(t, s) in head" :key="'head_col_body_' + height + s" :width="t.width" />
				</colgroup>
				<tbody>
					<tr v-for="(v, k) in list" :key="'list_' + height + k" @click="showOne(v)">
						<td>
							<p class="type">{{ v.typeName }}</p>
						</td>
						<td>{{ v.content }}</td>
						<td>{{ v.time }}</td>
						<td>{{ v.name }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { mainStore } from "@/store/index"

// 状态
const store = mainStore()

// 关闭 dialog
const closeDialog = () => {
	store.setPage(false);
}
// 展示一个 dialog
const showOne = (obj: any) => {
	closeDialog();
	setTimeout(() => {
		store.setPage(true);
	}, 100);
}

const props = defineProps({
	head: {
		type: Array<{ text: string, width: number }>,
		default: []
	},
	list: {
		type: Array<{ name: string, content: string, time: string, typeName: number }>,
		default: []
	},
	height: {
		type: Number,
		default: 218
	}
})

const tableHeight = props.height - 20 + 'px';

const sliderSecond: any = ref('20s');

watch(() => props.list, (newValue: any) => {
	sliderSecond.value = `${Math.floor(newValue.length * 0.9)}s`
})


</script>

<style lang="scss" scoped>
.con-table {
	margin: 10px 30px 0 30px;
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
			height: 36px;
			line-height: 36px;
			font-size: 14px;
			vertical-align: middle !important;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
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
		transform: translateY(-80%)
	}
}
</style>