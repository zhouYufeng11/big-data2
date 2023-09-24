<template>
	<div class="radio-nav-box" ref="RadioBox">
		<a-space direction="vertical" size="large">
      <a-checkbox-group v-model="deviceValue" :options="deviceOptions" @change="deviceFilterChange" />
    </a-space>
	</div>
</template>

<script setup lang='ts'>
import { mainStore } from '@/store';
import { ref } from 'vue';

const store: any = mainStore();

const props = defineProps({
	showType: {
		type: Number,
		default: 1
	}
});

const emit: any = defineEmits(['btnClick', 'changeMap']);

const deviceValue = ref([]);
deviceValue.value = store.getChooseIndex();

const deviceOptions: any = [
	{ label: '警情', value: 'jjxxResult' },
	{ label: '案件', value: 'ajxxResult' },
	// { label: '勤务', value: 'deviceResult' },
	// { label: '风控', value: '' },
	{ label: '舆情', value: 'yqResult' },
	// { label: '感知', value: '' },
]
// const deviceOptions = ['警情', '案件', '勤务', '风控', '舆论', '感知'];

const deviceFilterChange = (data: any) => {
  deviceValue.value = data;
	emit('changeMap', deviceValue.value);
	store.setChooseIndex(data);
}

</script>

<style lang="scss">
.radio-nav-box {
	position: absolute;
	display: flex;
	top: 150px;
  left: 500px;
  z-index: 10;

	&:hover .arco-checkbox-group {
			visibility: visible;
		}

  .arco-checkbox-group {
		visibility: hidden;

			.arco-checkbox {
				.arco-checkbox-label {
					font-size: 30px;
          color: #08e9eb;
				}

				&:nth-child(1) {
					.arco-checkbox-label {
						color: #FF0000;
					}
				}

				&:nth-child(2) {
					.arco-checkbox-label {
						color: #FF7D00;
					}
				}

				&:nth-child(3) {
					.arco-checkbox-label {
						color: #FFFF00;
					}
				}

				&:nth-child(4) {
					.arco-checkbox-label {
						color: #00FF00;
					}
				}

				&:nth-child(5) {
					.arco-checkbox-label {
						color: #00FFFF;
					}
				}

				&:nth-child(6) {
					.arco-checkbox-label {
						color: yellowgreen;
					}
				}
			}

			.arco-checkbox:hover .arco-checkbox-icon-hover::before {
				background: transparent;
			}

			.arco-checkbox-icon {
				width: 20px;
				height: 20px;

				&::after {
					background: #4484F2;
				}
			}

			.arco-checkbox-icon-check {
				transform: scale(3);
				margin-top: 6px;
			}
		}
}
</style>