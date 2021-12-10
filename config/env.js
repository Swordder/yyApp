/*
 *   create:2021/09/01
 *   author:MTT
 *
 *   baseUrl: api请求地址
 *   baseToken: 校验戳
 *   appId： 微信的appid
 *   callbackUrl: 微信跳转的回调
 *   httpUrl: 域名,
 *   routerMode: 路由模式
 *
 */

let baseUrl = '';
let baseToken = '';
let appId = '';
let callbackUrl = '';
let httpUrl = '';
let signUrl = '';
let articleUrl = '';
let statisticUrl = '';

if (process.env.NODE_ENV === 'development') {
	// qa环境
	baseUrl = 'http://wx.qa.youyao99.com/apibeta/newapi';
	baseToken = '&QA:8F86727E527411E79E6C68F728954D54188D51B5534511E79E6C68F728954D54';
	appId = 'wx61985e60730ea1e7';
	callbackUrl = 'api.qa.youyao99.com';
	httpUrl = 'http://wx.qa.youyao99.com/';
	signUrl = 'http://activity.qa.yyimgs.com/sign-in-touch/';
	articleUrl = 'http://category-article.qa.youyao99.com/';
	statisticUrl = 'http://wx.qa.youyao99.com/apibeta';
} else if (process.env.NODE_ENV === 'testing') {
	// qa2环境
	baseUrl = 'http://wx.qa2.youyao99.com/v2api';
	baseToken = '&QA:6F86727E527411E79E6C68F728954D54188D51B5534511E79E6C68F728954D54';
	appId = 'wx3d474ed4079354db';
	callbackUrl = 'api.qa2.youyao99.com';
	httpUrl = 'http://wx.qa2.youyao99.com/';
	signUrl = 'http://activity.qa2.yyimgs.com/sign-in-touch/';
	articleUrl = 'http://category-article.qa2.youyao99.com/';
	statisticUrl = 'http://wx.qa2.youyao99.com/v2api';
} else if (process.env.NODE_ENV === 'production') {
	// 线上环境
	baseUrl = 'http://wx.qa.youyao99.com/apibeta/newapi';
	baseToken = '&QA:8F86727E527411E79E6C68F728954D54188D51B5534511E79E6C68F728954D54';
	appId = 'wx61985e60730ea1e7';
	callbackUrl = 'api.qa.youyao99.com';
	httpUrl = 'http://wx.qa.youyao99.com/';
	signUrl = 'http://activity.youyao99.com/sign-in-touch/';
	articleUrl = 'http://category-article.youyao99.com/';
	statisticUrl = 'http://doctor.youyao99.com/v2api';
}

export {
	baseUrl,
	baseToken,
	appId,
	callbackUrl,
	httpUrl,
	signUrl,
	articleUrl,
	statisticUrl
}
