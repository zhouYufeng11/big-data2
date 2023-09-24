<template>
	<div class="detail-wrap">
		<TableImportant @showFile="showFile" />
	</div>
</template>

<script setup lang="ts">
import TableImportant from '@/components/TableDetail/TableImportant/index.vue';

const emit = defineEmits(['showFile'])

const showFile = (type: string, url: string) => {
	emit('showFile', type, url)
}

</script>

<style lang="scss" scoped>
.detail-wrap {
	height: 100%;
	width: 100%;
}
</style>