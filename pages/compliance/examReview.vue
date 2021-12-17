<template>
	<view class="content u-p-l-40 u-p-r-40 u-p-b-40">
		<view class="qu_list">
			<view 
			class="qu_list_item u-border-bottom u-m-t-40"
			v-for="item in list" 
			:key="item.id">
				<view class="question u-flex u-row-left u-col-top u-m-b-40">
					<view class="u-m-r-20 qu_type">
						[{{item.type.desc}}]
					</view>
					<view class="u-flex-1">
						{{item.name}}
					</view>
				</view>
				<view class="answer">
					<view 
					class="answer_item u-flex u-row-left u-col-top u-m-b-30"
					v-for="item2 in item.options" 
					:key="item2.id">
						<template v-if="item.type.id == 1">
							<view class="u-m-r-20 qu_type">
								<text v-if="item2.is_choosed == 0" class="custom-icon">&#xe668;</text>
								<text v-else-if="item2.is_right == 1 &&item2.is_choosed == 1" class="custom-icon selected">&#xe601;</text>
								<text v-else-if="item2.is_right == 0 &&item2.is_choosed == 1" class="custom-icon font_color_red">&#xe601;</text>
							</view>
						</template>
						<template v-else-if="item.type.id == 2">
							<view class="u-m-r-20 qu_type">
								<text v-if="item2.is_choosed == 0" class="custom-icon">&#xe69c;</text>
								<text v-else-if="item2.is_right == 1 &&item2.is_choosed == 1" class="custom-icon selected">&#xe620;</text>
								<text v-else-if="item2.is_right == 0 &&item2.is_choosed == 1" class="custom-icon font_color_red">&#xe620;</text>
							</view>
						</template>
						<view class="u-flex-1">
							<view v-if="item2.is_right == 1 &&item2.is_choosed == 0" class="font_blue">
								{{item2.name}}	<text class="u-m-l-20 font_10 correct">正确答案</text>
							</view>
							<view v-else class="">
								{{item2.name}}	
							</view>
							
						</view>
					</view>
					<!-- <view class="answer_item" :style="{lineHeight:'40rpx'}">
					</view> -->
				</view>
				<view v-show="item.is_right == 0" class="answer_an u-rela">
					<view class="title u-p-30 u-text-center">
						答案解析
					</view>
					<text class="u-abso left"></text>
					<text class="u-abso right"></text>
					<view class="u-p-30 u-m-b-30">
						{{item.explain}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { examReview } from '@/api/compliance.js';
	export default {
		data() {
			return {
				type:1,
				list:[]
			};
		},
		onLoad() {
			this.getDetail();
		},
		methods:{
			async getDetail(){
				let params = {
					id : this.$Route.query.id,
					request_id:''
				};
				let res = await examReview(params);
				
				this.list = [...res.data.list];
			}
		}
	}
</script>

<style lang="scss" scoped>
	.qu_list_item{
		padding-bottom: 10rpx;
		.question{
			font-weight: bold;
			.qu_type{
				color: $color-31;
			}	
		}	
	}
	.answer_item{
		color: $color-x6;
		.custom-icon{
			font-size: 40rpx;
		}
		.selected{
			color: $color-31;
		}
	}
	.answer_an{
		background-color: #FFEEEE;
		line-height: 40rpx;
		.title{
			color: #FF5555;
			font-weight: bold;
			border-bottom: 2rpx dashed #FFB9B9;
		}
		.u-abso{
			width: 30rpx;
			height: 30rpx;
			background-color: $color-xf;
			border-radius: 50%;
			top: 88rpx;
		}
		.left{
			left: -16rpx;
		}
		.right{
			right: -16rpx;
		}
		
	}
	.correct{
		background-color: #E5E8FF;
		color: $color-31;
		border-radius: 30rpx;
		padding: 4rpx 20rpx;
	}

</style>
