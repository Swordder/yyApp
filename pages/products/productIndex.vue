<template>
	<view class="content">
		<u-image width="100%" height="420rpx" :src="prod_detail.pic"></u-image>
		<view class="u-padding-30">
			<ProdBaseInfo v-if="$Route.query.series_id == 6" :prod_base_info="prod_base_info"></ProdBaseInfo>
			<ProdBaseInfo v-else-if="$Route.query.series_id == 9" :prod_base_info="prod_base_info_otc"></ProdBaseInfo>
			<u-line color="#F3F3F3" :hair-line="false"/>
			<view class="u-m-t-30 u-p-b-10">
				<u-row gutter="16" align="top" class="u-m-b-20">
					<u-col span="3" class="u-p-0">
						<view class="demo-layout bg-purple-light">
							<text class="custom-icon u-m-r-12">&#xe60e;</text>
							产品类别
						</view>
					</u-col>
					<u-col span="9" class="u-p-0">
						<view class="demo-layout bg-purple-dark">{{prod_detail.type}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" align="top" class="u-m-b-20">
					<u-col span="3" class="u-p-0">
						<view class="demo-layout bg-purple-light">
							<text class="custom-icon u-m-r-12">&#xe60e;</text>
							批准文号
						</view>
					</u-col>
					<u-col span="9" class="u-p-0">
						<view class="demo-layout bg-purple-dark">{{prod_detail.approveal}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" align="top" class="u-m-b-20">
					<u-col span="3" class="u-p-0">
						<view class="demo-layout bg-purple-light">
							<text class="custom-icon u-m-r-12">&#xe60e;</text>
							生产企业
						</view>
					</u-col>
					<u-col span="9" class="u-p-0">
						<view class="demo-layout bg-purple-dark">{{prod_detail.manufacturer}}</view>
					</u-col>
				</u-row>
				<u-row gutter="16" align="top" class="u-m-b-20">
					<u-col span="3" class="u-p-0">
						<view class="demo-layout bg-purple-light">
							<text class="custom-icon u-m-r-12">&#xe60e;</text>
							产品简介
						</view>
					</u-col>
					<u-col span="9" class="u-p-0">
						<view class="demo-layout bg-purple-dark">{{prod_detail.desc}}</view>
					</u-col>
				</u-row>
			</view>
			<u-line color="#F3F3F3" :hair-line="false" />
			<view class="prod_intro u-p-t-26 u-p-r-26 u-p-l-26 ">
				<button class="to_prod_intro" @click="toNextPage('/pages/products/productIntro')">查看说明书</button>
			</view>
		</view>
		<view class="">
			<u-line class="y_m_20" color="#F5F5F5" :hair-line="false" />
			<view class="">
				<u-section class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" title="产品解读" line-color="#5870FE" :right="false" :bold="false"></u-section>
				<u-line color="#F3F3F3" :hair-line="false" />
				<view class="u-p-30" @click="open('1')">
					<view class="box_sw u-flex u-p-l-60 u-p-r-60 u-p-t-40 u-p-b-40">
						<view class="img_pic">
							<u-image width="48" height="48" src="http://img.youyao99.com/EF7BAB0A754FDBFD77272A5012A56C6C.png"></u-image>
						</view>
						<text class="u-m-l-40">产品应用与招商范围</text>
					</view>
				</view>
			</view>	
		</view>
		<view class="">
			<u-line class="y_m_20" color="#F5F5F5" :hair-line="false" />
			<view>
				<u-section class="u-p-l-30 u-p-r-30 u-p-t-20 u-p-b-20" title="招商政策" line-color="#5870FE" :right="false" :bold="false"></u-section>
				<u-line color="#F3F3F3" :hair-line="false" />
				<view class="u-p-30" @click="open('2')">
					<view class="box_sw u-flex u-p-l-60 u-p-r-60 u-p-t-40 u-p-b-40">
						<view>
							<u-image width="60" height="66" src="http://img.youyao99.com/F9D72BC0D2C21533A7E4DD10F44B8442.png"></u-image>
						</view>
						<text class="u-m-l-40">平台政策与结算细节</text>
					</view>
				</view>
			</view>	
		</view>
		<u-line class="y_m_20" color="#F5F5F5" :hair-line="false" />
		<view class="fix_bt_btn u-p-30">
			<u-button 
			class="selected" 
			type="primary" 
			shape="circle" 
			hover-class="none" 
			@click="toNextPage('/pages/hospital/hospital')">申请服务</u-button>
		</view>
		<!-- modal窗口 -->
		<view>
			<u-modal v-model="show" :show-title="false" :confirm-style="{color:'#5870FE'}">
				<view class="slot-content">
					<view class="prod_rules">
						<view class="title u-rela">
							<u-image width="100%" height="120" src="http://img.youyao99.com/C53B254E0B9462B35397A359202AF456.png"></u-image>
							<view class="u-abso u-font-32">
								{{model_title[type]}}
							</view>
						</view>	
						<view v-if="type=='1'" class="u-p-t-40 u-p-l-60 u-p-r-60">
							<u-row class="u-m-b-30" gutter="16" align="top">
								<u-col span="4">
									<view class="u-font-md">产品应用</view>
								</u-col>
								<u-col class="font_blue" span="8">
									<view class="u-font-md">{{prod_detail.series_direct}}</view>
								</u-col>
							</u-row>	
							<u-row class="u-m-b-30" gutter="16" align="top">
								<u-col span="4">
									<view class="u-font-md">市场分析</view>
								</u-col>
								<u-col class="font_blue" span="8">
									<view class="u-font-md">{{prod_detail.market_analyze}}</view>
								</u-col>
							</u-row>
							<u-row class="u-m-b-30" gutter="16" align="top">
								<u-col span="4">
									<view class="u-font-md">招商范围</view>
								</u-col>
								<u-col class="font_blue" span="8">
									<view class="u-font-md">{{prod_detail.settlement_rules}}</view>
								</u-col>
							</u-row>
							<u-row class="u-m-b-30" gutter="16" align="top">
								<u-col span="4">
									<view class="u-font-md">区域价格</view>
								</u-col>
								<u-col class="font_blue" span="8">
									<view class="u-font-md">{{prod_detail.zone_price}}</view>
								</u-col>
							</u-row>
						</view>
						<view v-else-if="type=='2'" class="u-p-t-40 u-p-l-60 u-p-r-60">
							<u-row class="u-m-b-30" gutter="16" align="top">
								<u-col span="4">
									<view class="u-font-md">平台政策</view>
								</u-col>
								<u-col class="font_blue" span="8">
									<view class="u-font-md">{{prod_detail.platform_policy}}</view>
								</u-col>
							</u-row>	
							<u-row class="u-m-b-30" gutter="16" align="top">
								<u-col span="4">
									<view class="u-font-md">结算细则</view>
								</u-col>
								<u-col class="font_blue" span="8">
									<view class="u-font-md">{{prod_detail.settlement_rules}}</view>
								</u-col>
							</u-row>
						</view>
					</view>
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import ProdBaseInfo from '@/components/products/ProdBaseInfo.vue';
	import { productDetail } from '@/api/products.js'
	export default {
		data() {
			return {
				prod_detail:{},
				prod_base_info:{
					prod_img_url:'http://img.youyao99.com/913443AB0672F8D9CDC2BEFDAD45E6A6.png',
					prod_name:'力蜚能',
					prod_g_name:'多糖铁复合物胶囊',
					prod_type:'产品宝典'
				},
				prod_base_info_otc:{
					prod_img_url:'http://img.youyao99.com/55ea763f0532487c0ccc5edf4edc1624.png',
					prod_name:'力蜚能OTC',
					prod_g_name:'多糖铁复合物胶囊',
					prod_type:'产品宝典'
				},
				show:false,
				model_title:{
					'1':'产品应用与招商范围',
					'2':'平台政策与结算细节',
				},
				type:''
			};
		},
		components:{
			ProdBaseInfo
		},
		beforeRouteLeave(to, from, next) {
			if(to.BACKTYPE) {
			   next({
					path: '/pages/index/index',
					NAVTYPE: 'pushTab'
			   })
			} else {
			   next()
			}
		},
		onLoad(){
			this.detail();
		},
		methods:{
			async detail(){
				let res = await productDetail(this.$Route.query.series_id);
				this.prod_detail = {...res.data.info};
			},
			toNextPage(page){
				this.$Router.push({
					path:page,
					query:{
						...this.$Route.query
					}
				})
			},
			open(type){
				this.type = type;
				this.show = true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		padding-bottom: 160rpx;
	}
	.custom-icon{
		font-size: 28rpx;
		color: $color-31;
	}
	.bg-purple-dark{
		color: $color-x6;
	}
	.to_prod_intro{
		border: 2rpx solid $color-31;
		@include btn_common(200rpx,60rpx,$color-xf,$color-31,30rpx,24rpx);
	}
	.box_sw{
		color: $color-31;
		border-radius: 8px;
		box-shadow: 0px 2px 10px 0px rgba(216, 216, 216, 0.5);
		.img_pic{
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			background-color: $color-31;
			padding: 10rpx 0 0 12rpx;
		}
	}
	
	.prod_rules{
		line-height: 40rpx;
		.u-abso{
			color: $color-xf;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.font_blue{
			color: $color-31;
		}
	}
</style>
