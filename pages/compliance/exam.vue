<template>
	<view class="content">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :up="upOption">
		<u-sticky :enable="true">
			<view class="sticky u-p-t-30 u-p-l-30 u-p-r-30 u-p-b-70">
				<view class="search_hd">
					<u-search 
					class="u-m-b-40"
					bg-color="#ffffff"
					placeholder="请输入关键字" 
					v-model="keyword" 
					:show-action="false" 
					input-align="center"
					@change="$u.debounce(search, 500)">
					</u-search>
				</view>
				<view class="u-flex u-row-between">
					<view class="">试卷共计{{list.length}}套</view>
					<view class="condition u-font-24" @click="show = true">
						<text class="custom-icon u-font-28">&#xe645;</text>
						{{status_value}}
					</view>
				</view>
			</view>
		</u-sticky>
		<view class="exam u-p-t-40 u-p-l-30 u-p-r-30">
			<view class="exam_item u-p-30 u-m-b-30" 
			v-for="(item,index) in list" 
			:key="item.id" @click="toNextPage(item.status,item.id)">
				<view class="u-font-32 u-m-b-30">{{item.name}}</view>
				<view class="u-flex u-row-between">
					<template>
						<template v-if="item.is_time_unlimited == 0">
							<view class="">
								<view class="u-m-b-20">
									<text class="custom-icon u-m-r-20">&#xe60e;</text>
									<text class=" u-m-r-20" :style="{color:'#999999'}">开始时间</text>
									{{item.start}}
								</view>
								<view class="">
									<text class="custom-icon u-m-r-20">&#xe60e;</text>
									<text class="u-m-r-20" :style="{color:'#999999'}">结束时间</text>
									{{item.end}}
								</view>
							</view>
						</template>
						<view v-else-if="item.is_time_unlimited == 1" class="">
							<u-icon class="u-m-r-20" name="clock-fill" top="8" color="#5870FE" size="50"></u-icon>
							<text :style="{color:'#5870FE',fontWeight:'bold'}">无时限</text>
						</view>
						
					</template>
					<template>
						<view class="">
							<u-image v-if="item.status == 0 || item.status == 1" width="120" height="88" src="http://img.youyao99.com/6fd4005e027ddb459b1114e1ad0f683f.png"></u-image>
							<u-image v-else-if="item.status == 2" width="120" height="88" src="http://img.youyao99.com/cf78c29467fbacdc1b7614a7898e7054.png"></u-image>
							<u-image v-else-if="item.status == 3" width="120" height="88" src="http://img.youyao99.com/2a6536eae71882fd143cfec959fb61b5.png"></u-image>
							<u-image v-else-if="item.status == 4" width="120" height="88" src="http://img.youyao99.com/fe8da94d04ef4f6d6776e3a0344f2289.png"></u-image>
						</view>
					</template>
				</view>	
			</view>
			<u-empty v-show="empty_tag" text="没有搜索到数据哦~"></u-empty>
		</view>
		</mescroll-body>
		<!-- popup层 -->
		<view>
			<u-popup v-model="show" mode="right" width="400rpx">
				<view class="u-p-40">
					<view 
					class="popup_item u-m-b-20" 
					:class="{active:status_id == item.id}"
					v-for="item in status_list" 
					:key="item.id"
					@click="toSearch(item.id,item.value)">
						{{item.value}}
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>
<script>
	import { examList } from '@/api/compliance.js';
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data(){
			return {
				keyword:'',
				list:[],
				show:false,
				status:0,
				status_id:0,
				status_value:'全部',
				status_list:[
					{
						id:0,
						value:'全部'
					},
					{
						id:1,
						value:'进行中'
					},
					{
						id:2,
						value:'未通过'
					},
					{
						id:3,
						value:'已通过'
					},
					{
						id:4,
						value:'已过期'
					},
				],
				upOption: {
					auto: true,
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
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
				},
			}
		},
		methods:{
			async search(){
				this.list = [];
				this.mescroll.resetUpScroll();
			},
			toSearch(id,value){
				this.status = id;
				this.status_id = id;
				this.status_value = value;
				this.show = false;
				this.search();
			},
			async upCallback(page){
				let current = page.num, limit = page.size;
				let params = {
					keywords:this.keyword,
					status:this.status,
					current,
					limit
				};
				let res = await examList(params);
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
			downCallback(){
				
			},
			toNextPage(status,id){
				if(status == 4){
					return
				}
				this.$Router.push({
					path:'/pages/compliance/examDetail',
					query:{
						id
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.sticky{
		background-color: $color-31;
		padding-bottom: 40rpx;
		.u-flex{
			color: $color-xf;
		}
		.condition{
			color: $color-31;
			background-color: $color-xf;
			border-radius: 30rpx;
			padding: 8rpx 20rpx;
		}
	}
	.exam{
		margin-top: -30rpx;
		background-color: $color-xf;
		border-radius: 30rpx 30rpx 0 0;
		.exam_item{
			border-radius: 16rpx;
			box-shadow: 0px 2px 10px 0px rgba(216, 216, 216, 0.5);
			.u-font-32{
				font-weight: bold;
			}
		}
		.custom-icon{
			color: $color-31;
		}
		/* .collapse_item_bd{
			background-color: #F9FAFF;
			.collapse_con_item{
				border-bottom: 2rpx solid $color-f5;
				.custom-icon{
					color: #DEE2E6;
				}
			}
		}	 */
	}
	
	.popup_item{
		padding: 12rpx 30rpx;
		
	}
	.active{
		color: $color-31;
		background-color: #E9ECFF;
		border-radius: 32rpx;
	}
</style>
