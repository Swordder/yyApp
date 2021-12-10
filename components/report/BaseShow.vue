<template>
	<view>
		<view class="u-m-b-30">
			{{data.title?data.title:'无数据展示'}}
		</view>
		<u-row gutter="16" justify="between">
			<u-col span="3" class="u-p-t-20 u-p-b-20" :style="{borderRight:'5rpx solid #ffffff'}">
				<view class="u-text-center">
					<view class="font_bold u-font-32">
						{{data.target?data.target:'-'}}
					</view>
					<view class="font_10">
						潜力
					</view>
				</view>
			</u-col>
			<u-col span="9" class="u-p-t-20 u-p-b-20" :style="{borderLeft:'5rpx solid #ffffff'}">
				<u-row gutter="16">
					<u-col span="4">
						<view class="u-text-center">
							<view class="font_bold u-font-32">
								{{data.total?data.total:'-'}}
							</view>
							<view v-if="title_type == 1" class="font_10 font_gray">
								实际
							</view>
							<view v-else class="font_10 font_gray">
								流向
							</view>
						</view>
					</u-col>
					<u-col span="4">
						<view class="u-text-center">
							<view v-if="Number(data.mom) > 0 " class="font_bold u-font-32 font_color_red">
								<u-icon name="arrow-upward" color="#F65B6A" size="32"></u-icon>
								{{data.mom?data.mom:'-'}} <text class="font_10 font_color_red"> %</text>
							</view>
							<view v-else-if="Number(data.mom) < 0 " class="font_bold u-font-32 font_color_green">
								<u-icon name="arrow-downward" color="#4ED79C" size="32"></u-icon>
								{{data.mom?data.mom:'-'}} <text class="font_10 font_color_green"> %</text>
							</view>
							<view v-else class="font_bold u-font-32">
								{{data.mom?data.mom:'-'}}
							</view>
							<view class="font_10 font_gray">
								环比
							</view>
						</view>
					</u-col>
					<u-col span="4">
						<view class="u-text-center">
							<view v-if="Number(data.yoy) > 0 " class="font_bold u-font-32 font_color_red">
								<u-icon name="arrow-upward" color="#F65B6A" size="32"></u-icon>
								{{data.yoy?data.yoy:'-'}} <text class="font_10 font_color_red"> %</text>
							</view>
							<view v-else-if="Number(data.yoy) < 0 " class="font_bold u-font-32 font_color_green">
								<u-icon name="arrow-downward" color="#4ED79C" size="32"></u-icon>
								{{data.yoy?data.yoy:'-'}} <text class="font_10 font_color_green"> %</text>
							</view>
							<view v-else class="font_bold u-font-32">
								{{data.yoy?data.yoy:'-'}}
							</view>
							<view class="font_10 font_gray">
								同比
							</view>
						</view>
					</u-col>
				</u-row>	
			</u-col>
		</u-row>
	</view>
</template>
<script>
	export default {
		name:"report",
		props:['data','title_type'],
		data() {
			return {
				
			};
		}
	}
</script>
<style lang="scss" scoped>
.u-col{
	background-color: #F7F8FF;
	.font_10{
		transform-origin: center;
	}
	.font_gray{
		color: $color-x9;
	}
}
</style>
