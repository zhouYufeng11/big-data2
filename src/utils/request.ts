import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
import '@arco-design/web-vue/es/message/style/css.js';
import { getCookie } from '@/utils/cookie';

// 根据后台返回格式 进行修改
export interface HttpResponse<T = unknown> {
	msg: string;
	code: number;
	data: T;
}

export interface HttpErrorResponse {
	error: string;
	message: string;
	path: string;
	status: number;
	timestamp: string;
}

// create an axios instance
const service = axios.create({
	baseURL: import.meta.env.DEV ? import.meta.env.VITE_APP_API : import.meta.env.VITE_APP_API, // request url
	timeout: 30000, // request timeout
	headers: {
		// 'Content-Type': 'application/x-www-form-urlencoded'
		'Content-Type': 'application/json;charset=UTF-8;'
	}
})

let loading = null;

service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		!loading && (loading = Message.loading({
			content: `loading...`,
			duration: 1000
		}));
		// Token
		if (!(config as any).url.includes("/login")) {
			(config as any).headers["Authorization"] = `Bearer ${getCookie('token') || ''}`
		}
		// POST
		// 默认为 Content-Type: application/x-www-form-urlencoded
		// 接口单独配置的为 Content-Type: application/json; charset=utf-8
		if (config.method === 'post') {
			if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
				config.transformRequest = [function (data) {
					// 将数据拼接
					let ret = '';
					for (let it in data) {
						ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
					}
					return ret;
				}];
			}
		}
		return config
	},
	error => {
		// do something with request error
		console.log(error) // for debug
		return Promise.reject(error)
	}
)
// response interceptor
service.interceptors.response.use(
	(response: AxiosResponse<HttpResponse | HttpErrorResponse>) => {
		// filedown blob
		if (response.config?.responseType === 'blob') {
			return response
		}

		const res = response.data
		if (response.status !== 200) {
			Message.error({
				content: res.msg || 'error',
				duration: 2000
			})
			return Promise.reject(res.msg || '网络错误，稍后再试！' || 'error')
		} else {
			return res
		}
	},
	error => {
		console.log('err' + error) // for debug
		Message.error({
			content: error.message || '网络错误，稍后再试！' || 'error',
			duration: 2000
		})
		return Promise.reject(error)
	}
)

export default service
