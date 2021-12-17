<template>
	<view class="content u-abso u-p-30">
		<view 
		v-for="(item,index) in list"
		class="data_item u-m-b-30 u-p-l-40 u-p-r-40 u-p-b-30"
		>
			<view class="u-flex u-p-t-40 u-p-b-40 u-border-bottom u-row-between title">
				<view class="u-font-32 font_bold">{{item.name}}</view>
				<view class="font_10 u-p-l-20 u-p-r-20">{{item.last_serve_month}}月服务月报</view>
			</view>
			<view class="">
				<template>
					<view class="u-border-bottom">
						<view class="u-m-t-30" :style="{color:'#999999'}">
							{{item.last_serve_month}}月数据
						</view>
						<u-row gutter="16">
							<u-col class="u-p-30" span="4">
								<view class="u-text-center">
									<view class="font_bold u-font-32">
										{{item.current_month.total?item.current_month.total:'-'}}
									</view>
									<view class="font_10 font_gray">
										流向
									</view>
								</view>
							</u-col>
							<u-col class="u-p-30" span="4">
								<view class="u-text-center">
									<view v-if="Number(item.current_month.mom) > 0 " class="font_bold u-font-32 font_color_red">
										<u-icon name="arrow-upward" color="#F65B6A" size="32"></u-icon>
										{{item.current_month.mom?item.current_month.mom:'-'}} <text class="font_10 font_color_red"> %</text>
									</view>
									<view v-else-if="Number(item.current_month.mom) < 0 " class="font_bold u-font-32 font_color_green">
										<u-icon name="arrow-downward" color="#4ED79C" size="32"></u-icon>
										{{item.current_month.mom?item.current_month.mom:'-'}} <text class="font_10 font_color_green"> %</text>
									</view>
									<view v-else class="font_bold u-font-32">
										{{item.current_month.mom?item.current_month.mom:'-'}}
									</view>
									<view class="font_10 font_gray">
										环比
									</view>
								</view>
							</u-col>
							<u-col class="u-p-30" span="4">
								<view class="u-text-center">
									<view v-if="Number(item.current_month.yoy) > 0 " class="font_bold u-font-32 font_color_red">
										<u-icon name="arrow-upward" color="#F65B6A" size="32"></u-icon>
										{{item.current_month.yoy?item.current_month.yoy:'-'}} <text class="font_10 font_color_red"> %</text>
									</view>
									<view v-else-if="Number(item.current_month.yoy) < 0 " class="font_bold u-font-32 font_color_green">
										<u-icon name="arrow-downward" color="#4ED79C" size="32"></u-icon>
										{{item.current_month.yoy?item.current_month.yoy:'-'}} <text class="font_10 font_color_green"> %</text>
									</view>
									<view v-else class="font_bold u-font-32">
										{{item.current_month.yoy?item.current_month.yoy:'-'}}
									</view>
									<view class="font_10 font_gray">
										同比
									</view>
								</view>
							</u-col>
						</u-row>	
					</view>
					<view class="u-border-bottom">
						<view class="u-m-t-30" :style="{color:'#999999'}">
							{{item.last_three_month.title?item.last_three_month.title:'-'}}月数据
						</view>
						<u-row gutter="16">
							<u-col class="u-p-30" span="4">
								<view class="u-text-center">
									<view class="font_bold u-font-32">
										{{item.last_three_month.total?item.last_three_month.total:'-'}}
									</view>
									<view class="font_10 font_gray">
										流向
									</view>
								</view>
							</u-col>
							<u-col class="u-p-30" span="4">
								<view class="u-text-center">
									<view v-if="Number(item.last_three_month.mom) > 0 " class="font_bold u-font-32 font_color_red">
										<u-icon name="arrow-upward" color="#F65B6A" size="32"></u-icon>
										{{item.last_three_month.mom?item.last_three_month.mom:'-'}} <text class="font_10 font_color_red"> %</text>
									</view>
									<view v-else-if="Number(item.last_three_month.mom) < 0 " class="font_bold u-font-32 font_color_green">
										<u-icon name="arrow-downward" color="#4ED79C" size="32"></u-icon>
										{{item.last_three_month.mom?item.last_three_month.mom:'-'}} <text class="font_10 font_color_green"> %</text>
									</view>
									<view v-else class="font_bold u-font-32">
										{{item.last_three_month.mom?item.last_three_month.mom:'-'}}
									</view>
									<view class="font_10 font_gray">
										环比
									</view>
								</view>
							</u-col>
							<u-col class="u-p-30" span="4">
								<view class="u-text-center">
									<view v-if="Number(item.last_three_month.yoy) > 0 " class="font_bold u-font-32 font_color_red">
										<u-icon name="arrow-upward" color="#F65B6A" size="32"></u-icon>
										{{item.last_three_month.yoy?item.last_three_month.yoy:'-'}} <text class="font_10 font_color_red"> %</text>
									</view>
									<view v-else-if="Number(item.last_three_month.yoy) < 0 " class="font_bold u-font-32 font_color_green">
										<u-icon name="arrow-downward" color="#4ED79C" size="32"></u-icon>
										{{item.last_three_month.yoy?item.last_three_month.yoy:'-'}} <text class="font_10 font_color_green"> %</text>
									</view>
									<view v-else class="font_bold u-font-32">
										{{item.last_three_month.yoy?item.last_three_month.yoy:'-'}}
									</view>
									<view class="font_10 font_gray">
										同比
									</view>
								</view>
							</u-col>
						</u-row>	
					</view>
					<u-button 
					:custom-style="custom_style" 
					class="u-m-t-30 u-font-28" 
					hover-class="none" 
					shape="circle"
					@click="toNextPage('/pages/report/serviceReport',item.id)">查看详情</u-button>	
				</template>
				<!-- <view class="u-m-t-40">
					<u-empty text="暂无数据" mode="data"></u-empty>
				</view> -->
			</view>
		</view>
		<u-empty v-show="empty_tag" text="没有数据哦~"></u-empty>
	</view>
</template>

<script>
	import { transactionList } from '@/api/flowReport.js';
	export default {
		data() {
			return {
				list:[],
				empty_tag:false,
				custom_style:{
					lineHeight:'72rpx',
					height:'72rpx',
					color:'#ffffff',
					backgroundColor:'#5870FE'
				}
			};
		},
		onLoad() {
			this.getList()
		},
		methods:{
			async getList(){
				let res = await transactionList();
				this.list = [...res.data.list];
				if(this.list.length === 0){
					this.empty_tag = true;
				} else {
					this.empty_tag = false;
				}
			},
			toNextPage(path,id){
				this.$Router.push({
					path,
					query:{
						id
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	width: 100%;
	height: 100%;
	background-color: $color-f5;
	.data_item{
		background-color: $color-xf;
		border-radius: 16rpx;
		.title{
			.font_10{
				line-height: 40rpx;
				border-radius: 20rpx 0 20rpx 0;
				color: $color-31;
				background-color: #F2F3FF;
			}
		}
	}
	.font_10{
		transform-origin: center;
	}
	.font_gray{
		color: $color-x9;
	}
	
}
</style>
