<template>
	<div class="map-pannel">
		<BaseMap @mapObj="showMap" />
		<div class="device-filter animate__animated animate__fadeInDown animate__delay-1s" v-if="showDeviceFilter">
			<a-space direction="vertical" size="large">
				<a-checkbox-group v-model="deviceValue" :options="deviceOptions" @change="deviceFilterChange" />
			</a-space>
		</div>
	</div>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import BaseMap from '@/components/Map/BaseMap.vue';
import useMap1 from '@/components/Map/modules/map1';
import useMap2 from '@/components/Map/modules/map2';
import useMap3 from '@/components/Map/modules/map3';
import useMap4 from '@/components/Map/modules/map4';
import useMap5 from '@/components/Map/modules/map5';
import useMap6 from '@/components/Map/modules/map6';

const router = useRouter();
const curRouterName = ref('');

const props = defineProps({
	curType: {
		type: Number,
		default: 1
	}
})

type GisInfo = {
	minGisX: number,
	minGisY: number,
	maxGisX: number,
	maxGisY: number,
	type?: number
}

let minemap: any = null;
let map: any = null;

const showDeviceFilter = ref(false);
const deviceValue = ref(['警车', '车台', '手台']);
const deviceOptions = ['警车', '车台', '手台'];
const showInit = () => {
	showDeviceFilter.value = false;
}
const deviceFilterChange = (data: any) => {
	useMap3(minemap, map, data);
}

const showMap = (minemapObj: any, mapObj: any, type?: any) => {

	!minemap && (minemap = minemapObj);
	!map && (map = mapObj);
	switch (curRouterName.value) {
		case 'Show1':
			showInit();
			useMap1(minemap, map, type || props.curType);
			break;
		case 'Show2':
			showInit();
			useMap2(minemap, map, type || props.curType);
			break;
		case 'Show3':
			// 设备筛选
			showDeviceFilter.value = true;
			useMap3(minemap, map, deviceValue.value);
			break;
		case 'Show4':
			showInit();
			useMap4(minemap, map);
			break;
		case 'Show5':
			showInit();
			useMap5(minemap, map, type || props.curType);
			break;
		case 'Show6':
			showInit();
			useMap6(minemap, map);
			break;
		default:
			showInit();
			useMap1(minemap, map, type || props.curType);
			break;
	}
}

onMounted(() => {
	//	监听 curType 的变化
	watch(() => props.curType, (newValue: any) => {
		showMap(minemap, map, newValue);
	})

	// 监听当前路由
	watch(() => router.currentRoute.value, (newValue: any) => {
		curRouterName.value = newValue.name;
	}, {
		immediate: true
	});
})

</script>

<style lang="scss">
.map-pannel {
	width: 100%;
	height: 100%;
	position: relative;
	margin-top: 100px;

	.device-filter {
		position: absolute;
		top: 10px;
		right: 480px;

		.arco-checkbox-group {
			.arco-checkbox {
				.arco-checkbox-label {
					font-size: 30px;
				}

				&:nth-child(1) {
					.arco-checkbox-label {
						color: #4484F2;
					}
				}

				&:nth-child(2) {
					.arco-checkbox-label {
						color: #9EFF55;
					}
				}

				&:nth-child(3) {
					.arco-checkbox-label {
						color: #FE5580;
					}
				}

				// &:nth-child(4) {
				// 	.arco-checkbox-label {
				// 		color: #64FFF9;
				// 	}
				// }

				&:nth-child(4) {
					.arco-checkbox-label {
						color: #BB9F0A;
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
}

a.minemap-ctrl-logo {
	display: none !important;
}

.customerIcon {
	height: 55px;
	width: 20px;
	user-select: none;

	.pointIcon {
		position: relative;
		height: 100%;
		width: 100%;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 20px;
			height: 20px;
			border-radius: 50%;
			// box-shadow: 0 0 2px rgba(60, 235, 235, 1), 0 0 4px rgba(182, 218, 249, 1);
			background: rgba(60, 235, 235, .8);
		}

		&::after {
			content: '';
			position: absolute;
			top: 20px;
			left: 9px;
			width: 2px;
			height: 30px;
			background: rgba(60, 235, 235, .8);
		}

		&::before,
		&::after,
		.botIcon {
			animation: fadeIcon 2s linear infinite forwards;
		}

		.botIcon {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 10px;
			border-radius: 50%;
			border: 1px solid rgba(60, 235, 235, .8);
			transform: rotateX(45deg);

			&::before {
				content: '';
				position: absolute;
				bottom: -7px;
				left: -37%;
				width: 170%;
				height: 17px;
				border-radius: 50%;
				border: 1px solid rgba(60, 235, 235, .8);
			}
		}

		&.map-icon-red {

			&::before,
			&::after {
				background: rgba(226, 80, 83, .8);
			}

			.botIcon,
			.botIcon::before {
				border: 1px solid rgba(226, 80, 83, .8);
			}
		}

		&.map-icon-yellow {

			&::before,
			&::after {
				background: rgba(245, 202, 72, .8);
			}

			.botIcon,
			.botIcon::before {
				border: 1px solid rgba(245, 202, 72, .8);
			}
		}

		&.map-icon-blue {

			&::before,
			&::after {
				background: rgba(122, 255, 250, 0.8);
			}

			.botIcon,
			.botIcon::before {
				border: 1px solid rgba(122, 255, 250, .8);
			}
		}

		&.map-icon-default {

			&::before,
			&::after {
				background: rgba(122, 255, 250, 0.8);
			}

			.botIcon,
			.botIcon::before {
				border: 1px solid rgba(122, 255, 250, 0.8);
			}
		}
	}

	&.noBlink {
		z-index: 99;

		.pointIcon {

			&::before,
			&::after,
			.botIcon {
				animation: none;
			}
		}
	}
}

.jqIcon {
	width: 58px;
	height: 56px;
	user-select: none;
	animation: fadeIcon 3s linear infinite forwards;
	background: url('../../assets/images/blue.png') center / cover no-repeat;


	&.map-icon-1-1 {
		background: url('../../assets/images/red-success.png') center / cover no-repeat;
	}

	&.map-icon-1-2 {
		background: url('../../assets/images/red-fail.png') center / cover no-repeat;
	}

	&.map-icon-2-1 {
		background: url('../../assets/images/orange-success.png') center / cover no-repeat;
	}

	&.map-icon-2-2 {
		background: url('../../assets/images/orange-fail.png') center / cover no-repeat;
	}

	&.map-icon-3-1 {
		background: url('../../assets/images/blue-success.png') center / cover no-repeat;
	}

	&.map-icon-3-2 {
		background: url('../../assets/images/blue-fail.png') center / cover no-repeat;
	}
}

.caseIcon {
	width: 24px;
	height: 32px;
	user-select: none;
	animation: fadeIcon 3s linear infinite forwards;

	&.map-icon-1 {
		background: url('../../assets/images/p1.png') center / cover no-repeat;
	}

	&.map-icon-2 {
		background: url('../../assets/images/p2.png') center / cover no-repeat;
	}

	&.map-icon-3 {
		background: url('../../assets/images/p3.png') center / cover no-repeat;
	}

	&.map-icon-4 {
		background: url('../../assets/images/p4.png') center / cover no-repeat;
	}

	&.map-icon-5 {
		background: url('../../assets/images/p5.png') center / cover no-repeat;
	}
}


.popInfo {
	text-align: left;
	padding: 10px;

	.popInfoItem {
		line-height: 30px;
		margin-bottom: 20px;
		font-size: 20px;
		color: #fff;
		display: flex;
		justify-content: space-between;
		overflow: hidden;
		text-overflow: ellipsis;

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.minemap-popup {
	.minemap-popup-tip {
		border-color: transparent;
	}

	.minemap-popup-content {
		background: rgba(1, 16, 39, .9);
		max-width: 600px !important;
		width: 400px;

		.minemap-popup-close-button {
			color: #fff;
			font-size: 30px;
			right: 10px;
			top: 10px;

			&:hover {
				color: rgb(43, 134, 237);
			}
		}
	}
}

.minemap-ctrl-bottom-right {
	bottom: 50px;
	right: 490px;
}

.minemap-ctrl-group {
	border-radius: 4px;
	background: #313d4f
}

.minemap-ctrl-group:not(:empty) {
	-moz-box-shadow: 0 0 2px rgba(0, 0, 0, .1);
	-webkit-box-shadow: 0 0 2px rgba(0, 0, 0, .1);
	box-shadow: 0 0 0 2px rgba(0, 0, 0, .1)
}

@media (-ms-high-contrast:active) {
	.minemap-ctrl-group:not(:empty) {
		box-shadow: 0 0 0 2px ButtonText
	}
}

.minemap-ctrl-group button {
	width: 29px;
	height: 29px;
	display: block;
	padding: 0;
	outline: none;
	border: 0;
	box-sizing: border-box;
	background-color: transparent;
	cursor: pointer
}

.minemap-ctrl-group button+button {
	border-top: 1px solid #ddd
}

.minemap-ctrl button .minemap-ctrl-icon {
	display: block;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-position: 50%
}

@media (-ms-high-contrast:active) {
	.minemap-ctrl-icon {
		background-color: transparent
	}

	.minemap-ctrl-group button+button {
		border-top: 1px solid ButtonText
	}
}

.minemap-ctrl button::-moz-focus-inner {
	border: 0;
	padding: 0
}

.minemap-ctrl button:disabled {
	cursor: not-allowed
}

.minemap-ctrl button:disabled .minemap-ctrl-icon {
	opacity: .25
}

.minemap-ctrl button:not(:disabled):hover {
	background-color: rgba(0, 0, 0, .05)
}

.minemap-ctrl-group button:focus:first-child {
	border-radius: 4px 4px 0 0
}

.minemap-ctrl-group button:focus:last-child {
	border-radius: 0 0 4px 4px
}

.minemap-ctrl-group button:focus:only-child {
	border-radius: inherit
}

.minemap-ctrl button.minemap-ctrl-zoom-out {
	background-repeat: no-repeat;
	background-position: 50%;
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAKElEQVQ4jWNgGAWjYBgCRgYGBoaGnnn/qWFYQ0kSIxM1DBoFo2DYAwCCbgQEkNaDdAAAAABJRU5ErkJggg==")
}

.minemap-ctrl button.minemap-ctrl-zoom-in {
	background-repeat: no-repeat;
	background-position: 50%;
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAVElEQVQ4jWNgoDJgZGBgYGjomUdI3X9k9eigvjgRIsnIyMBELZfBwKiBI8FAFij9H68qBMCqrrF3PozJSDMXYs0BSIConNJQkjQEImXUwEFoINUBAKAWC34J9C+mAAAAAElFTkSuQmCC")
}

.minemap-ctrl button.minemap-ctrl-fullscreen .minemap-ctrl-icon {
	background-size: 20px 20px;
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB10lEQVRYR9WX0VECMRRFb1j9lhK0ArED7EA7EGhAZ9b/fCszjA2wUIF2oCVoBVIC/gNxNrJhN3mbvERnduQ3m9yTvNz7gkDHP9GxPgyAnM4VE2Yp8/GN/a2cFX1sd2+AOOesI/Ox1o4FIMUrwRiIFACveCxELABLPAYiBmCNTJzJu9GaU1sD8VgMIdRr25wYAEDhHUfikgshH4oBelq8nw6g1BeEODELMCE44uWaoRNYIhO3jq0CELS4+kDWu8J291K3qA/AXDjSVi0QHvFhWTp7rTYA57ZzIELilDsogAWVcLpeTsrpY9U744zXL2K1lswng0YShix2gADq4u7u6HEbooKPakYaojyRlkwIjVObjAIInVLK+P8C0Lf9GKtOSmCsprCiYlnXf7PP/kBsl986l1BO5+02tLPdCiMjLqCt5esd1bfyfnxBPEjUQuaTUcMyZGMJ5QANUQf1RPEBgptwdBg1IexTCjQjtcCu9+S21ObOWe/Cn3JdY6OeUZWI0Q0JS/vFY15DnHZsAfDEYyBC74E6QNqTbFacYqs+019EjZmuO3yx69iS+DjmBPbTeRAc8YQ7UG3BD8EV/wWAjjknrEwOlFFcs5q3TPZfs5RW+hdzOm/H3/JjszAKfmaRAAAAAElFTkSuQmCC")
}

.minemap-ctrl button.minemap-ctrl-shrink .minemap-ctrl-icon {
	background-size: 20px 20px;
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACDElEQVRYR+2XTVbCMBCAZ1L2cgO5geUGcAO8gQUv4BNdZ+3DxwXEegO5AdzAegO4Ae5t40sgadI2JLTV54Ku+tpk5sv8ZQZBe+g87kGahnR6u9S/t/VOZy8jCII1vYt2UibKF/oUh0DYCgC6gCyi95O3thRzOfR5cQMMY2CQAMOIPkYJ/y4ADOUKrQxB53EXvtmKPoz7VXB0tkggIAP9hIbyfNMOMhxyCKxUXgEhlQNCSKdjZTnDhbNXJk7YwaGEUCcvEwsIFH4B8m41N7IICFnyk3Pl4kTHAPiCAwRk2UiY3fpk13sXSP/YV24AoKfixQWwX2jsKYk+xFkehG4IJcNpAVf0akFu+NLDEkJ0I4BChpWCyQeiNkBFepcBeKql7EP3edGiNQE2EGC/mKKmCw55LqPd5sqaACo7qiuhp/LGMVCoE/s0PEF5YwCtTnBLVFY0Vxa1+f8McLbA/7CASMM0WwPglU+E1y5ESjj7lI1LfhueANEMIFfOecql2MMS9QFM5SUAVRXTLAHAy3bvAraFgIRHLyPP7qh+P+C6jn16gcZ3ga0h8VXeGEA4Pm/5PZtSttVjwi8IzT3WptS7Ldeyww2wj3avtlwMJpitAfHCRqllhyhWxwHMVLO6lrEv6JAwH82KEBURKysmnU7EgFLqFX1HM66ckYEYzaQQwxK/OZyCsxKmg78cz38A6BSKx5j1KTAAAAAASUVORK5CYII=")
}

.minemap-ctrl button.minemap-ctrl-compass .minemap-ctrl-compass-arrow {
	display: block;
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-position: 50%;
	background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='29' height='29' viewBox='0 0 29 29' xmlns='http://www.w3.org/2000/svg' fill='%23333'%3E%3Cpath d='M10.5 14l4-8 4 8h-8z'/%3E%3Cpath d='M10.5 16l4 8 4-8h-8z' fill='%23ccc'/%3E%3C/svg%3E");
	background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAB/ElEQVQ4ja2Uv2vbQBTHP9ez1VqT7RQKUleNpiFLp26mkDFQKNRT52bP6CX/RYYudQeTqUO8mWQshAPXQyCQNUOaUloXnFY/XgefXFVS7NjkCw89vfe+H92J4xQ5iQgolS8DPLPPUaEjgsp5HpQRbtFbG+tJRBDIhyNwZcMp9EXWBu8IiI2d+wGLOOI4R3Ow4xyJiLM+WESLyIZ0u5sCYWbFoXS7myKyISJ6NfAM+kREPPH9/Qx0Fr6/LyKendGrgB9boyfV6nkBXK2ez/uz2QKn7Lg9BBwA2u0twjAoTIRhQLu9Zd8c6/lPlRJwbZ4Z8xrgstXic6cDwPNeD288Tnsm4/m9DPyvpvWEev3D8e7uqxfb248AjhuNmzd7e4doPVnEKQPPNR4Of4pIEo9GulabbSSu1fSXk5MfSqlfrQXeMnCcJkmSPI3juON5HoPBAADP86pRFL3TWvfKPIvAN9j/7LpufzKZdBqNBvV6HWB+2biu2894pnlI2amYAhFAEASnSqmLFJhClVIXQRCc2vnILmYpGOA7kABUKpV+vpmpJXa2oFKwMSYEroGo2WwepjtIV5ipXdvZu4EtPDLGXPm+f6aUGqZ1pdTQ9/0z4KsxJrrNv/C42Q9MgQPgJYCIHNjaQi0FW30CvmXypbor+A/wMZPfGxjg/Qqz/AXWWC0nt/NzKwAAAABJRU5ErkJggg==")
}
</style>