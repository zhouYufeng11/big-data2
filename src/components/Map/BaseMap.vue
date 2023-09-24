<template>
	<div id="map"></div>
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, onMounted, ref, watch } from 'vue';
// @ts-ignore
import minemap from '@/plugins/minemap.js';

// 配置
minemap.domainUrl = import.meta.env.VITE_DOMAIN_URL;
minemap.dataDomainUrl = import.meta.env.VITE_DATA_DOMAIN_URL;
minemap.serverDomainUrl = import.meta.env.VITE_SERVER_DOMAIN_URL;
minemap.spriteUrl = import.meta.env.VITE_SPRITE_URL;
minemap.serviceUrl = import.meta.env.VITE_SERVICE_URL;
minemap.key = import.meta.env.VITE_MAP_KEY;
minemap.solution = import.meta.env.VITE_MAP_SOLUTION;

const MAP_STYLE = import.meta.env.VITE_MAP_JSON;
const PROJECTION = import.meta.env.VITE_MAP_PROJECTION;
const emit = defineEmits(['mapObj']);

let map: any = null;


const initMap = () => {
	map = new minemap.Map({
		container: 'map',
		style: MAP_STYLE, /* 底图样式 */
		center: [120.142298, 32.503710], // 姜堰中心
		// center: [120.26871, 32.01717], // 测试用
		zoom: 13/* 地图默认缩放等级 */,
		pitch: 0 /* 地图俯仰角度 */,
		maxZoom: 17 /* 地图最大缩放等级 */,
		minZoom: 3 /* 地图最小缩放等级 */,
		projection: PROJECTION,
	})
	// 缩放
	map.addControl(new minemap.Navigation(), 'bottom-right');
	map.on('load', () => {
		emit('mapObj', minemap, map);
	})
}

onMounted(() => {
	let timer: any = setTimeout(() => {
		initMap();
		clearTimeout(timer);
		timer = null;
	}, 1000);
})

</script>
<style scoped lang='scss'>
#map {
	height: 100%;
	width: 100%;
}
</style>