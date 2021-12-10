import { RouterMount, createRouter, runtimeQuit } from 'uni-simple-router';
import store from '@/store';
import { checkBind } from '@/api/login.js';

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
router.beforeEach((to, from, next) => {
	const user_info = store.state.yy_app_user_info;
	const openid = store.state.yy_app_openid;
	// 判断当前页面是否需要登录
	if(to.meta.requireLogin){
		// 若需要，判断是否已授权登录
		if(openid == ''){
			// 若无授权登录，则去登录页
			next({
				path: '/pages/login/login',
				NAVTYPE: 'replace'
			});	
		} else {
			// 若已授权登录，判断当前是否需要绑定手机号
			// 若需要绑定，判断是否已经绑定
			if(to.meta.requireBind){
				// check是否已绑定
				
				// 若无绑定，则去绑定
				if(user_info.auth_status == 2){
					next({
						path: '/pages/mine/bindPhone',
						query: {
							replacePath: to.fullPath
						},
						NAVTYPE: 'push'
					});
				} else {
					// 若已绑定，则判断是否需要认证
					// 若需要，则判断是否已经认证
					if(to.meta.requireAuth){
						if(user_info.verify_status == 1 || user_info.verify_status == 4){
							next({
								path: '/pages/authentication/authentication',
								query: {
									replacePath: to.fullPath
								},
								NAVTYPE: 'replace'
							});
						} else {
							next();
						}
					}  else {
						next()
					}
				}
			} else {
				next()
			}
		}
	}  else {
		next()
	}
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