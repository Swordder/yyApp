
// #ifdef H5
import store from '@/store';
import { wxRedirectUrl, wxAuthUserInfo } from '@/api/wx_h5.js';
import { wxLogin } from '@/api/login.js';
import { getUrlParam } from '@/utils/index.js';
import { httpUrl } from '@/config/env.js';
import onceLogin from './once_login.js';
const md5 = require('md5');

export default async function(to,next) {
	const user_info = store.state.yy_app_user_info;
	const token = user_info.token;
	const openid = store.state.yy_web_openid;
	// 判断本地存储内是否有openid
	if(openid == '' || openid == 'undefined' || openid == null){
		// 判断URL上是否有openid
		let href = window.location;
		let search = href.search.substr(1);
		let state = getUrlParam('state');
		let code = getUrlParam('code');
		// 判断URL上是否已经完成回调，如果已经完成回调，则进行用户信息的获取，并保存openid
		if (search.indexOf(code) != -1) {
			const res = await wxAuthUserInfo({
				state,
				code
			});
			store.commit('$uStore', {
				name: 'yy_web_openid',
				value: res.data.openid
			});
		} else {
			const redirect = `${httpUrl}${to.fullPath}`
			const res = await wxRedirectUrl({
				is_silent:0,
				'state':md5(Math.random(new Date().getTime()).toString()),
				redirect
			});
			if(res.errcode != 0){
				this.$u.toast(res.errmsg)
				return
			}
			window.location = res.data.url;
		}
	} else {
		onceLogin(to,next,user_info)
	}
}
// #endif