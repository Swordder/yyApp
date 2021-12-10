<template>
	<view class="data_show">
		<view class="rp_list_item u-m-b-30 u-p-l-30 u-p-r-30 u-p-b-20">
			<view class=" u-p-t-30 u-p-b-30" @click="show(value_report.product_name_cn)">
				<text class="u-m-r-12 u-font-24" :style="{color:'#5870FE'}">{{value_report.level_str}}</text>
				<u-icon name="arrow-down" color="#5870FE" size="28"></u-icon>
			</view>
			<view class="u-m-b-20 u-p-l-40 u-p-r-40 u-p-t-20 u-p-b-20" :style="{backgroundColor:'#F7F8FF'}">
				<u-section class="u-p-r-30 u-p-t-20 u-m-b-30" title="月销量" line-color="#5870FE" :right="false" :bold="false"></u-section>
				<u-row gutter="16" align="top">
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.month_target}}</view>
						<view class="grid-text u-font-xs">指标</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.month_sales}}</view>
						<view class="grid-text u-font-xs">销售</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.month_ach}}</view>
						<view class="grid-text u-font-xs">达成率</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.ly_sales}}</view>
						<view class="grid-text u-font-xs">去年历史销售</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.month_gr}}</view>
						<view class="grid-text u-font-xs">增长率</view>
					</u-col>
				</u-row>
			</view>	
			<view class="u-m-b-20 u-p-l-40 u-p-r-40 u-p-t-20 u-p-b-20" :style="{backgroundColor:'#F7F8FF'}">
				<u-section class="u-p-r-30 u-p-t-20 u-m-b-30" title="季销量" line-color="#5870FE" :right="false" :bold="false"></u-section>
				<u-row gutter="16" align="top">
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.qtd_target}}</view>
						<view class="grid-text u-font-xs">指标</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.qtd_sales}}</view>
						<view class="grid-text u-font-xs">销售</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.qtd_ach}}</view>
						<view class="grid-text u-font-xs">达成率</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.qtd_ly_sales}}</view>
						<view class="grid-text u-font-xs">去年历史销售</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.qtd_gr}}</view>
						<view class="grid-text u-font-xs">增长率</view>
					</u-col>
				</u-row>
			</view>	
			<view class="u-m-b-20 u-p-l-40 u-p-r-40 u-p-t-20 u-p-b-20" :style="{backgroundColor:'#F7F8FF'}">
				<u-section class="u-p-r-30 u-p-t-20 u-m-b-30" title="年销量" line-color="#5870FE" :right="false" :bold="false"></u-section>
				<u-row gutter="16" align="top">
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.ytd_target}}</view>
						<view class="grid-text u-font-xs">指标</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.ytd_sales}}</view>
						<view class="grid-text u-font-xs">销售</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.ytd_ach}}</view>
						<view class="grid-text u-font-xs">达成率</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.ytd_ly_sales}}</view>
						<view class="grid-text u-font-xs">去年历史销售</view>
					</u-col>
					<u-col class="u-m-b-30" span="4">
						<view class="grid-text u-font-32">{{value_report.ytd_gr}}</view>
						<view class="grid-text u-font-xs">增长率</view>
					</u-col>
				</u-row>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['value_report'],
		data(){
			return {
				
			}
		},
		methods:{
			show(name){
				this.$emit('showCurSelect',name)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.data_show{
		.rp_list_item{
			border-radius: 16rpx;
			box-shadow: 0px 2px 12px 0px rgba(204, 213, 224, 0.5);
		}
		.u-font-32{
			font-weight: bold;
		}
		.u-font-xs{
			color: $color-x9;
			transform: scale(0.9);
			transform-origin: left;
		}
	}
</style>
