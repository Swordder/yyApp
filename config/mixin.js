/* 
 *create:2021/10/08
 *author:MTT
 *
 */
import { mapState } from 'vuex';
import store from '@/store/index.js';

let total_state = store.state?Object.keys(store.state):[];


export default {
	data(){
		return {
			empty_tag:false
		}
	},
	computed:{
		...mapState(total_state)
	},
	
}