import { RouterMount, createRouter, runtimeQuit } from 'uni-simple-router';
import store from '@/store';
import { checkBind } from '@/api/login.js';
import wxAuth from './wx_auth.js';
import onceLogin from './once_login.js';

import { statisticsInfo } from '@/api/statistics.js';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES],
	detectBeforeLock: (router, to, navType) => {
		router.$lockStatus=false;
	},
	routerErrorEach: ({
		type,
		msg
	}, router) => {
		// #ifdef APP-PLUS
		const curPage = router.currentRoute;
		const curPageName = curPage.name;
		
		if (type === 3) {
			if (curPageName !== 'index') {
				// app页面栈只有一个页面时, 且不是首页, 跳转到首页
				router.replaceAll({
					name: 'index'
				});
			} else {
				// 处理 app 首页多次返回
				router.$lockStatus = false;
				runtimeQuit(); // 退出app
			}
		}
		// #endif
	}
});
//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
	
	// #ifdef H5
	await wxAuth(to,next)
	// #endif
	
	// #ifdef APP-PLUS
	const user_info = store.state.yy_app_user_info;
	const token = user_info.token;
	const openid = store.state.yy_app_openid;
	
	// 判断当前页面是不是login
	if(to.path.indexOf('login') !== -1){
		// 判断是否授权
		if(openid == '' || openid == 'undefined' || openid == null){
			next()
		} else {
			if(token){
				next({
					path: '/pages/index/index',
					NAVTYPE: 'replace'
				});
			}	
		}
	} else {
		if(openid == '' || openid == 'undefined' || openid == null){
			// 若无授权登录，则去登录页
			next({
				path: '/pages/login/login',
				NAVTYPE: 'replace'
			});	
		} else {
			onceLogin(to,next,user_info);
		}
	}
	// #endif
});
// 全局路由后置守卫
router.afterEach((to, from) => {
	
	// 页面统计
	// statisticsInfo({ from, to });
})

export {
	router,
	RouterMount
}