<template>
	<div class="file-box">
		<vue-office-excel :src="fileUrl" @rendered="rendered"/>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue";
import VueOfficeExcel from '@vue-office/excel';
import '@vue-office/excel/lib/index.css';
const props = defineProps({
	fileUrl: {
		type: String,
		default: ''
	},
	requestOptions: {
		type: Object,
		default: () => ({})
	}
})
const rendered = () => {
	console.log("渲染完成")
}

</script>

<style lang="scss" scoped>

.file-box {
	width: 100%;
	height: 100%;
	overflow: auto;

	:deep(.arco-spin) {
		margin-top: 100px;

		.arco-spin-icon {
			color: #fff;
		}
	}

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
}
</style>