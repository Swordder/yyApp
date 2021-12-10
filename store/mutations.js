/* 
 *create-date:2021/09/18
 *author:MTT
 */
import * as types from './mutations-type.js';
import { saveStorageData } from '../utils/index.js';
import { saveLifeData } from './state.js';

export default {
	$uStore(state, payload) {
		// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
		let name_arr = payload.name.split('.');
		let save_key = '';
		let len = name_arr.length;
		if (name_arr.length >= 2) {
			let obj = state[name_arr[0]];
			for (let i = 1; i < len - 1; i++) {
				obj = obj[name_arr[i]];
			}
			obj[name_arr[len - 1]] = payload.value;
			save_key = name_arr[0];
		} else {
			// 单层级变量，在state就是一个普通变量的情况
			state[payload.name] = payload.value;
			save_key = payload.name;
		}
		// 保存变量到本地，见顶部函数定义
		saveLifeData(save_key, state[save_key]);
	},
	// 认证信息
	[types.AUTHDATA](state,obj){
		state.auth_data = {...state.auth_data,...obj};
	},
	// 选择曾服务的医院
	[types.SELECTHOS](state,hos_data){
		let auth_data = state.auth_data;
		if(!auth_data.hos_list){
			auth_data.hos_list = [];
		}
		let hos_list = auth_data.hos_list;
		let len = hos_list.length;
		let num = 0;
		if(len === 0){
			hos_list.push(hos_data);
		} else {
			hos_list.forEach((item,index) => {
				if(item.id == hos_data.id){
					hos_list.splice(index,1)
				} else {
					num++
				}
				if(num == len){
					hos_list.push(hos_data);
				}
			})
		};
	},
	
}