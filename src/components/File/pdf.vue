<template>
	<div class="file-box">
		<a-spin :size="100" color="#fff" v-if="loading" />
		<!-- <div class="page-tool">
			<div class="page-tool-item" @click="lastPage">上一页</div>
			<div class="page-tool-item" @click="nextPage">下一页</div>
			<div class="page-tool-item">{{ state.pageNum }}/{{ state.numPages }}</div>
			<div class="page-tool-item" @click="pageZoomOut">放大</div>
			<div class="page-tool-item" @click="pageZoomIn">缩小</div>
		</div> -->
		<vue-pdf-embed ref='pdf' :source="state.source" :style="scale" :page="state.pageNum" class="vue-pdf-embed" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed } from "vue";
import VuePdfEmbed from 'vue-pdf-embed';
import * as pdfjsLib from 'pdfjs-dist';

const props = defineProps({
	fileUrl: {
		type: String,
		default: ''
	},
})
const loading = ref(false);
//定义
const state = reactive({
	source: '', // 预览pdf文件地址
	pageNum: 0, // 当前页面
	scale: .8, // 缩放比例
	numPages: 0 // 总页数
})
const scale = computed(() => `transform:scale(${state.scale});transform-origin: 50% 0 0;`);


function getPdfUrl(data) {
	state.source = data;
	// pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.js'
	loading.value = false;
	const loadingTask = pdfjsLib.getDocument(data);
	loadingTask.promise.then(pdf => {
		// state.numPages = pdf.numPages
	});
}

// // 上一页
// function lastPage() {
// 	if (state.pageNum > 1) {
// 		state.pageNum -= 1
// 	}
// }
// // 下一页
// function nextPage() {
// 	if (state.pageNum < state.numPages) {
// 		state.pageNum += 1
// 	}
// }
// // 放大
// function pageZoomOut() {
// 	if (state.scale < 2) {
// 		state.scale += 0.1
// 	}
// }
// // 缩小
// function pageZoomIn() {
// 	if (state.scale > 1) {
// 		state.scale -= 0.1
// 	}
// }

onMounted(() => {
	getPdfUrl(props.fileUrl);
})

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

	.page-tool {
		display: flex;
		position: absolute;
		top: 5px;
		left: 50%;
		z-index: 100;
		transform: translateX(-50%);
		align-items: center;
		background: rgb(66 66 66);
		color: white;
		border-radius: 19px;
		cursor: pointer;
		justify-content: center;
		font-size: 15px;
	}

	.page-tool-item {
		padding: 4px 10px;
		cursor: pointer;
	}
}
</style>