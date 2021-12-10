/* 
 * create-date:2021/09/18
 * author:MTT
 *
 */
// 定义永久存储变量
let life_data = {};
try{
	// 尝试获取本地是否存在life_data变量，第一次启动APP时是不存在的
	life_data = uni.getStorageSync('yy_life_data');
}catch(e){
	
}
// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let save_state_keys = ['yy_app_openid','yy_app_user_info','auth_data', 'edit_doctor_group', 'APP_LAUNCH_TIME'];
// 保存变量到本地存储中
export const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(save_state_keys.indexOf(key) != -1) {
		// 获取本地存储的life_data对象，将变量添加到对象中
		let tmp = uni.getStorageSync('yy_life_data');
		// 第一次打开APP，不存在life_data变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的life_data对象中
		uni.setStorageSync('yy_life_data', tmp);
	}
}
export default {
	// 保存openid
	yy_app_openid:life_data.yy_app_openid?life_data.yy_app_openid:'',
	// 保存登录状态和用户信息
	yy_app_user_info:life_data.yy_app_user_info?life_data.yy_app_user_info:{},
	// 认证环节数据支配
	auth_data:life_data.auth_data?life_data.auth_data:{},
	// 七牛上传拜访配置信息
	qiniu_visit_config: {},
	// 拜访
	visit_checkin:{},
	visit_checkout:{},
	doctor_info:{},
	visit_search_condition:{},
	// 我的医生群组信息
	edit_doctor_group: life_data.edit_doctor_group?life_data.edit_doctor_group:{},
	
	APP_LAUNCH_TIME: life_data.APP_LAUNCH_TIME?life_data.APP_LAUNCH_TIME:0,
}
