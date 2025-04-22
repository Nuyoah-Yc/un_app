import axios from 'axios';
const baseURL = 'http://cyymzy.com:8000'
// 创建 axios 实例
const service = axios.create({
	baseURL, // 设置你的 API 基础 URL
	timeout: 5000 // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use((config) => {
		// 在发送请求之前做些什么，例如添加 token
		// const token = uni.getStorageSync('token');
		// if (token) {
		//   config.headers['Authorization'] = 'Bearer ' + token;
		// }
		return config;
	},
	(error) => {
		// 对请求错误做些什么
		console.error('Request Error:', error);
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	response => {
		// 对响应数据做点什么
		const res = response.data;
		// 这里可以根据后端接口的实际返回结构进行调整
		if (res.code !== 200 && res.code !== 0) { // 假设 0 或 200 是成功的状态码
			uni.showToast({
				title: res.message || 'Error',
				icon: 'none'
			});
			return Promise.reject(new Error(res.message || 'Error'));
		}
		return res;
	},
	error => {
		// 对响应错误做点什么
		console.error('Response Error:', error);
		uni.showToast({
			title: error.message || '网络错误',
			icon: 'none'
		});
		return Promise.reject(error);
	}
);

export default service;