import { mapState } from 'vuex'
import store from "@/store"
import { serviceReportConfig } from '@/utils/charts_config.js';
// 尝试将用户在根目录中的store/index.js的vuex的state变量，全部加载到全局变量中
let $uStoreKey = [];
try{
	$uStoreKey = store.state ? Object.keys(store.state) : [];
}catch(e){
	
}

module.exports = {
	data(){
		return {
			serviceReportConfig,
			empty_tag:false,
			genders: [
				{
					value:1,
					label:'男'
				},
				{
					value:2,
					label: '女'
				}
			],
			positions:[
				{
					value:1,
					label:'职员'
				},
				{
					value:2,
					label:'科室主任'
				},
				{
					value:3,
					label:'科室副主任'
				},
				{
					value:4,
					label:'院长'
				},
				{
					value:5,
					label:'副院长'
				}
			],
			jobs:[
				{
					value:1,
					label:'医士'
				},
				{
					value:2,
					label:'医师'
				},
				{
					value:3,
					label:'主治医师'
				},
				{
					value:4,
					label:'副主任医师'
				},
				{
					value:5,
					label:'主任医师'
				},
				{
					value:6,
					label:'护士'
				},
				{
					value:7,
					label:'护师'
				},
				{
					value:8,
					label:'主管护师'
				},
				{
					value:9,
					label:'副主任护师'
				},
				{
					value:10,
					label:'主任护师'
				},
				{
					value:11,
					label:'初级药士'
				},
				{
					value:12,
					label:'初级药师'
				},
				{
					value:13,
					label:'中级主管药师'
				},
				{
					value:14,
					label:'副主任药剂师'
				},
				{
					value:15,
					label:'主任药剂师'
				},
				{
					value:16,
					label:'初级中药士'
				},
				{
					value:17,
					label:'初级中药师'
				},
				{
					value:18,
					label:'中级主管中药师'
				},
				{
					value:19,
					label:'副主任药剂师'
				},
				{
					value:20,
					label:'主任药剂师'
				},
				{
					value:21,
					label:'初级检验技士'
				},
				{
					value:22,
					label:'初级检验技师'
				},
				{
					value:23,
					label:'检验主管技师'
				},
				{
					value:24,
					label:'副主任检验师'
				},
				{
					value:25,
					label:'主任检验师'
				},
				{
					value:26,
					label:'初级放射技士'
				},
				{
					value:27,
					label:'初级放射技师'
				},
				{
					value:28,
					label:'放射主管技师'
				},
				{
					value:29,
					label:'副主任放射技师'
				},
				{
					value:30,
					label:'主任放射技师'
				},
				{
					value:31,
					label:'康复治疗士'
				},
				{
					value:32,
					label:'初级康复治疗师'
				},
				{
					value:33,
					label:'中级治疗师'
				},
				{
					value:34,
					label:'高级治疗师'
				}
			]
		}
	},
	created() {
		// 将vuex方法挂在到$u中
		// 使用方法为：如果要修改vuex的state中的user.name变量为"史诗" => this.$u.vuex('user.name', '史诗')
		// 如果要修改vuex的state的version变量为1.0.1 => this.$u.vuex('version', '1.0.1')
		this.$u.vuex = (name, value) => {
			this.$store.commit('$uStore', {
				name,value
			})
		}
	},
	computed: {
		// 将vuex的state中的所有变量，解构到全局混入的mixin中
		...mapState($uStoreKey)
	}
}