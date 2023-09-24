<template>
	<div class="file-box">
		<a-spin :size="100" color="#fff" v-if="loading" />
		<div class="vue-office-docx" ref="rootRef"></div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { renderAsync } from 'docx-preview';

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

const rootRef = ref();
const loading = ref(true);

function getData(src, options = {}) {
	if (typeof src === 'string') {
		return fetchDocx(src, options)
	}
	return Promise.resolve(src)
}

function fetchDocx(src, options) {
	return fetch(src, options).then(res => {
		if (res.status !== 200) {
			return Promise.reject(res)
		}
		return res
	})
}

function render(data, container) {
	if (!data) {
		container.innerHTML = ''
		return Promise.resolve()
	}
	let blob
	if (data instanceof Blob) {
		blob = data
	} else if (data instanceof Response) {
		blob = data.blob()
	} else if (data instanceof ArrayBuffer) {
		blob = new Blob([data])
	}
	return renderAsync(blob, container);
}

const init = () => {
	let container = rootRef.value;

	getData(props.fileUrl, props.requestOptions).then(res => {
		render(res, container).then(() => {
			loading.value = false;
			console.log('rendered')
		}).catch(e => {
			render('', container)
			console.log(e)
		})
	}).catch(e => {
		render('', container)
		console.log(e)
	})
}

onMounted(() => {
	loading.value = true;
	init();
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

	:deep(.docx-wrapper) {
		background: transparent;

		.docx {
			width: 1000px !important;

			p {
				font-size: 25px;

				&.docx_1 {
					span {
						font-size: 25px;
					}
				}
			}
		}
	}
}
</style>