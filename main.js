/* 
*  modify:MTT
*  date:2021/09/15
 */

import App from './App'
import Vue from 'vue'
// 路由引插件入
import { router,RouterMount } from './router/index.js';
Vue.use(router);
// 添加store
import store from '@/store/index.js';

/*add UI组件*/
import uView from "uview-ui";
Vue.use(uView);
// 引入请求组件
import instance from '@/request/index.js'
// 混入
import vuexStore from '@/store/$u.mixin.js';
Vue.mixin(vuexStore)

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	store,
    ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif