/* 
 *create-date:2021/09/18
 *author:MTT
 */
import {
	getOnlyMark,
	getOnceMark,
	systemInfo,
	getCurrentAppNo
} from '../utils/index.js';
// 请求之前对配置信息进行处理
const handleRequestConfig = (requestConfig) => {
	/* 对header进行处理开始 */
	// 获取平台信息和设备ID
	const platform = uni.getSystemInfoSync().platform;
	const deviceId = uni.getSystemInfoSync().deviceId;
	
	let app_version = '1.0.0',
		app_platform = 3,	// 非 app
		device_id = deviceId;

	// #ifdef APP-PLUS
	getCurrentAppNo(res => {
		app_version = res.version;
	})
	
	// 判断设备平台
	if (platform === 'android') {
		app_platform = 1
	} else if (platform === 'ios') {
		app_platform = 2
	}
	
	// #endif


	let header = {
		'app-version': app_version,
		'app-platform': app_platform,
		'device-id': device_id
	};

	// 覆盖默认 baseURL
	requestConfig._baseUrl && (requestConfig.baseURL = requestConfig._baseUrl);
	
	// 处理统计请求header
	if(requestConfig.url.indexOf('/statistic/') != -1) {
		requestConfig.header = {}
	} else {
		requestConfig.header = Object.assign({}, header, requestConfig.header);
	}
	
	
	requestConfig.showLoading && uni.showLoading({
		title: 'Loading',
	});
	
	/* 对header进行处理结束*/
	return requestConfig;
}
export default handleRequestConfig
