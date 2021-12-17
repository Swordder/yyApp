<template>
	<view class="content">
		<mescroll-body
			ref="mescrollRef" 
			@init="mescrollInit" 
			@down="downCallback" 
			@up="upCallback" 
			:up="upOption">
			<u-sticky>
				<view class="search_hd u-p-l-30 u-p-r-30">
					<u-search 
						class="u-p-t-20 u-p-b-20" 
						placeholder="请输入科室" 
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
					<view :key="item.id" class="u-flex u-row-between u-p-t-20 u-p-b-20" @click="selectDep(item)">
						<text>{{item.name}}</text>
						<text v-if="select_ids.indexOf(item.id) == -1" class="custom-icon">&#xe668;</text>
						<text v-else class="custom-icon active">&#xe601;</text>
					</view>
					<u-line :hair-line="false"></u-line>
				</template>
				<u-empty class="u-m-t-80" v-show="empty_tag" mode="search"></u-empty>
			</view>
		 </mescroll-body>
		 <view class="btn u-p-30">
		 	<u-button class="selected" type="primary" shape="circle" hover-class="none" @click="backPage">确定</u-button>
		 </view>
	</view>
</template>
<script>
	import { departments,serveDeps } from '@/api/common.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default{
		mixins: [MescrollMixin],
		data(){
			return{
				keyword:'',
				list:[],
				select_list:[],
				select_ids:[],
				upOption: {
					auto: true,
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 20 // 每页数据的数量,默认10
					},
					noMoreSize: 5, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					textNoMore: '~ 呀, 到底了 ~',
					empty: {
						use: false // 不使用自带组件
					},
					toTop: {
						offset: 800,
						radius: 16
					}
				}
			}
		},
		onLoad() {
			// 判断页面来源
			let query = this.$Route.query;
			if(query.type&&query.type === 'visit'){
				if(!this.visit_checkout.departs){
					return
				}
				this.select_list = [...this.visit_checkout.departs];
			} else if(query.type&&query.type === 'doctor'){
				if(!this.doctor_info.departs){
					return
				}
				this.select_list = [...this.doctor_info.departs];
			} else {
				if(!this.auth_data.departments){
					return
				}
				this.select_list = [...this.auth_data.departments];
			}
			this.select_ids = this.select_list.length !== 0?this.select_list.map(item => {
				return item.id
			}):[];
		},
		onShow() {
			
		},
		methods:{
			async upCallback(page){
				let current = page.num, limit = page.size;
				let params = {
					keywords:this.keyword,
					current,
					limit
				}
				let res = await departments(params);
				const cur_list = res.data.list;
				const total_size = res.data.page.total;
				if(total_size == 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
				const cur_page_len = cur_list.length;
				if (page.num == 1) {
					this.list = []; //如果是第一页需手动制空列表
				}
				this.list = this.list.concat(cur_list); //追加新数据
				this.mescroll.endBySize(cur_page_len, total_size);
				setTimeout(() => {
					this.mescroll.endSuccess(cur_page_len);
				}, 20);
			},
			search(){
				this.list = [];
				this.mescroll.resetUpScroll();
			},
			// 选择适科室
			selectDep(data){
				let query = this.$Route.query;
				let num = 0;
				let len = this.select_list.length;
				if(query.type === 'doctor'){
					this.select_list[0] = data;
				} else {
					if(len === 0){
						this.select_list.push(data)
					} else {
						this.select_list.forEach((item,index) => {
							if(item.id == data.id){
								this.select_list.splice(index,1)
							} else {
								num++
							}
							if(num == len){
								this.select_list.push(data)
							}
						})
					};
				}
				this.select_ids = this.select_list.length !== 0?this.select_list.map(item => {
					return item.id
				}):[];
				if(query.type === 'visit'){
					this.$u.vuex('visit_checkout.departs',[...this.select_list]);
					return
				} else if(query.type === 'doctor'){
					this.$u.vuex('doctor_info.departs',[...this.select_list]);
					return
				} else {
					this.$u.vuex('auth_data.departments',[...this.select_list]);
				}
				
			},
			downCallback(){
			},
			toHosDetail(){
				
			},
			async backPage(){
				// 判断页面回退
				let query = this.$Route.query;
				if(query.type && query.type === 'visit'){
					let _this = this;
					let params = {
						hospital_id:query.hospital_id,
						depart_ids:this.select_ids
					}
					let res = await serveDeps(params);
					this.$u.toast('添加成功')
					setTimeout(function(){
						_this.$Router.back();
					},500);
				} else {
					this.$Router.back();
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		padding-bottom: 140rpx;
	}
	.search_hd{
		background-color: $color-xf;
	}
	.custom-icon{
		font-size: 48rpx;
		color: $color-x6;
	}
	.active{
		color: $color-31;
	}
	.btn{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $color-xf;
		.selected{
			background-color: $color-31;
		}
	}
</style>
