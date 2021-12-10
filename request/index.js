/* 
 * author:MTT
 * time:2021/09/01
 */
import ajax from 'uni-ajax';
import {
	baseUrl,
	baseToken
} from '@/config/env.js';
import handleRequestConfig from './config.js';
import store from '@/store/index.js';
import {
	router
} from '@/router';
const md5 = require('md5');
// 创建实例
const instance = ajax.create({
	baseURL: baseUrl,
	data: {},
	showLoading: true,	// 请求 loading 状态
	validateStatus: statusCode => {
		const curPage = router.currentRoute;
		const curPageName = curPage.name;
		// 添加状态码的判断
		if (statusCode) {
			return statusCode >= 200 && statusCode < 300
		} else {
			if (curPageName != 'notFound') {
				router.push('/pages/notFound');
			}
		}
	}
	// validateStatus: statusCode => statusCode >= 200 && statusCode < 300 // 默认
});
// 请求拦截
instance.interceptors.request.use(config => {
	// 对请求数据做些什么
	// 判断是否有token，如果有，添加到header中
	let token = store.state.yy_app_user_info.token;
	if (token) {
		config.header['Authorization'] = `Bearer ${token}`;
	}
	
	return handleRequestConfig(config)
}, error => {
	uni.hideLoading();
	// 对响应错误做些什么
	return Promise.reject(error)
});
// 响应拦截
instance.interceptors.response.use(
	response => {
		
		const showLoading = response.config.showLoading;
		
		showLoading && uni.hideLoading();
		// 对响应数据做些什么
		// request_time --;
		console.log('========响应数据=========', response);
		const curPage = router.currentRoute;
		const responseData = response.data;
		if (responseData.errcode == 0) {
			return responseData
		} else if (responseData.errcode == 10401) {
			showLoading && uni.showToast({
				title: '请重新登录',
				duration: 2000,
				icon: 'error'
			});

			// 清除失效 token
			store.commit('$uStore', {
				name: 'yy_app_user_info',
				value: {}
			})
			store.commit('$uStore', {
				name: 'yy_app_openid',
				value: ''
			})

			if (curPage.name != 'login') {
				router.push('/pages/login/login');
			}
		} else if (responseData.errcode == 4005) {
			router.push('/pages/mine/bindPhone')
		}

		showLoading && uni.$u.toast(responseData.errmsg);
		return false;
	},
	error => {
		const showLoading = error.config.showLoading;
		showLoading && uni.hideLoading();
		// 对响应错误做些什么
		return Promise.reject(error)
	}
);
uni.$request = instance;
