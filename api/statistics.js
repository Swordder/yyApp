import {
	browserInfo,
	getOnlyMark,
	getOnceMark
} from '@/utils';

import {
	statisticUrl
} from '@/config/env.js';

// 用户行为统计
export const statisticsInfo = ({
	from,
	to
}) => {

	const os = uni.getSystemInfoSync();
	const timestamp = new Date().getTime();

	// #ifdef APP-PLUS
	const appRuntime = plus.runtime;
	// #endif

	const paramsData = {
		// #ifdef APP-PLUS
		app_version: appRuntime.versionCode, // app 版本
		app_download_channel: appRuntime.channel, // app 下载渠道
		source_type: 4, // 项目类型
		page_url: to.fullPath, // 页面完整路径(带参数)
		// #endif

		// #ifdef H5
		source_type: 3, // 项目类型
		page_url: location.href, // 页面完整路径(带参数)
		// #endif

		browser: (os.brand || '') + os.model, // 设备品牌
		browser_ua: os.platform,
		os: os.system,
		screen: `${os.screenWidth}*${os.screenHeight}*${parseInt(os.pixelRatio)}`, // 屏幕宽高, 像素比

		api_version: '', // 接口版本
		api_request_params: JSON.stringify(to.query), // 接口参数

		last_page_name: from.name, // 上个页面名称
		current_page_name: to.name, // 当前页面名称

		is_pretend_login: 2,
		gen_data_time: uni.$u.timeFormat(timestamp, 'yyyy-mm-dd hh:MM:ss'),
		gen_data_date: uni.$u.timeFormat(timestamp, 'yyyy-mm-dd'),
		cookie_id: getOnlyMark(),
		trace_id: getOnceMark(),

		business_id: '',
		event_id: 1,

		// #ifdef APP-PLUS
		host_name: 'app_youyao',
		// #endif
		// #ifdef H5
		host_name: location.origin,
		// #endif

	}

	let url = '';
	// #ifdef APP-PLUS
	url = '/statistic/app'
	// #endif
	// #ifdef H5
	url = '/statistic/wap'
	// #endif
	return uni.$request.post(
		url,
		paramsData, {
			_baseUrl: statisticUrl
		}
	)
}
