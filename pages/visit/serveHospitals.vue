<template>
	<view class="content">
		<u-sticky>
			<view class="search_hd u-p-l-30 u-p-r-30">
				<u-search 
					class="u-p-t-20 u-p-b-20" 
					placeholder="请输入医院名称" 
					v-model="keyword" 
					:show-action="false" 
					input-align="center"
					@change="$u.debounce(search, 500)">
				</u-search>
				<u-line color="#F3F3F3" :hair-line="false"></u-line>	
			</view>	
		</u-sticky>
		<view class="u-p-l-30 u-p-r-30">
			<template v-for="item in list">
				<view :key="item.id" class="u-flex u-row-between u-p-t-20 u-p-b-20" @click="selectHos(item)">
					<text>{{item.name}}</text>
					<text v-if="select_hos.id == item.id" class="custom-icon active">&#xe601;</text>
					<text v-else class="custom-icon ">&#xe668;</text>
				</view>
				<u-line :hair-line="false"></u-line>
			</template>
			<u-empty class="u-m-t-80" v-show="empty_tag" mode="data"></u-empty>
		</view>
		
		 <view class="fix_bt_btn u-p-30">
		 	<u-button class="selected" type="primary" shape="circle" hover-class="none" @click="backPage">确定</u-button>
		 </view>
	</view>
</template>

<script>
	import { serveHosList } from '@/api/hospital.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin],
		data(){
			return{
				keyword:'',
				list:[],
				select_hos:{},
				select_id:'',
				empty_tag:true,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.init();
			this.getList()
		},
		methods:{
			// 获取初始值
			init(){
				let { hospital } = this.visit_checkin;
				this.select_hos = hospital?hospital:{};
			},
			async getList(){
				let params = {
					keywords:this.keyword
				};
				let res = await serveHosList(params);
				this.list = [...res.data.list];
				if(res.data.list.length === 0){
					this.empty_tag = true
				} else {
					this.empty_tag = false;
				}
			},
			search(){
				this.list = [];
				this.getList();
			},
			// 选择拜访医院
			selectHos(data){
				// let checkin_data = {};
				this.select_hos = {...data};
				this.select_id = data.id;
				this.$u.vuex('visit_checkin.hospital',data);
				// let obj = Object.assign({},{'checkin_hos':data})
				// uni.setStorageSync('checkin_data',obj);
			},
			backPage(){
				this.$Router.back();
			}
		}
	}
</script>
<style lang="scss" scoped>
.active{
	color: $color-31;
}
</style>
