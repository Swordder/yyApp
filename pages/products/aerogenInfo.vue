<template>
	<view class="content">
		<view class="video_wrap">
			<!-- <video 
				id="video" 
				src="http://1253663427.vod2.myqcloud.com/e6fbef6evodtransgzp1253663427/8313a6cf5285890802758292190/v.f20.mp4"
			    enable-danmu danmu-btn controls>
			</video> -->
		</view>
		<view class="aerogen u-p-b-40">
			<view class="aerogen_hd u-p-40">
				<u-avatar src="http://img.youyao99.com/5DF4B4265D21F8E8F36257F34F84A8E4.png" size="200"></u-avatar>
				<view class="u-m-t-20 u-font-36">Aerogen爱尔真雾化系统</view>
				<view class="u-font-sm u-m-t-8">高效雾化给药技术领导者，全球领先企业</view>
			</view>
			<view class="aerogen_propty u-p-l-56 u-p-r-56">
				<view class="u-m-b-16">独一无二的钯振动网筛技术</view>
				<view class="">
					Aerogen拥有超过40项国际专利的获奖技术，其中钯合金振动网格技术Aerogen Vibronic® 是气雾剂输送技术的突破，也是我们的核心产品。中心孔板直径只有5mm，分布着1000个精密成形微孔，每秒振动128,000次，形成大小最利于深度肺部沉积的液滴。
				</view>
			</view>
			<view class="aerogen_apply u-m-t-60">
				<view class="u-m-b-40">应用领域</view>
				<view class="u-flex">
					<u-image width="20%" height="150rpx" src="http://img.youyao99.com/56EC6503A3453E08F7620A4F5393D7B5.png"></u-image>
					<u-line color="#0077C8" direction="col"/>
					<u-image width="20%" height="150rpx" src="http://img.youyao99.com/62CBDDD4F413CD39DCD6D20A33C4BD4D.png"></u-image>
					<u-line color="#0077C8" direction="col"/>
					<u-image width="20%" height="150rpx" src="http://img.youyao99.com/3E024BFDBAC77AAD5DF43C3D10E81E2A.png"></u-image>
					<u-line color="#0077C8" direction="col" />
					<u-image width="20%" height="150rpx" src="http://img.youyao99.com/CE780B625B859C25F061F29782936151.png"></u-image>
					<u-line color="#0077C8" direction="col" />
					<u-image width="20%" height="150rpx" src="http://img.youyao99.com/3257C7497280AE1EA1C53EFB33EECFD5.png"></u-image>
				</view>
				<u-row gutter="16" class="u-p-t-26">
					<u-col span="2.4" text-align="center">
						自主呼吸
					</u-col>
					<u-col span="2.4" text-align="center">
						HFNC
					</u-col>
					<u-col span="2.4" text-align="center">
						机械通气
					</u-col>
					<u-col span="2.4" text-align="center">
						NIV
					</u-col>
					<u-col span="2.4" text-align="center">
						HFOV
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="aerogen_field">
			<u-section class="u-p-30" title="产品解读" line-color="#0077C8" :right="false" :bold="false"></u-section>
			<view class=" u-p-l-30 u-p-r-30 u-p-b-20">
				<u-row 
					gutter="16" 
					class="u-m-b-20 u-p-8 field_item" 
					v-for="(item,index) in field_list" 
					:key="index"
					@click="toNextPage(item.field_url)">
					<u-col span="4" text-align="center">
						<template v-if="index <= 2">
							<u-image width="104" height="104" :src="item.field_src"></u-image>
						</template>
						<template v-else>
							<view class="aerogen_pic">
								<u-image width="64" height="60" :src="item.field_src"></u-image>
							</view>
						</template>
					</u-col>
					<u-col span="4" text-align="center">{{item.field_title}}</u-col>
					<u-col span="4" text-align="right">
						<text class="custom-icon">&#xe61e;</text>
					</u-col>
				</u-row>
			</view>
		</view>
		<view class="aerogen_partner u-p-b-20">
			<view class="title u-p-26">合作伙伴</view>
			<u-image width="100%" height="184" src="http://img.youyao99.com/162B9064424A35775427D6A5A6F73D48.png"></u-image>
		</view>
		<view class="fix_bt_btn u-p-30">
			<u-button 
			type="primary" 
			shape="circle" 
			hover-class="none"  
			:custom-style="{backgroundColor:'#0077C8'}"
			@click="toNextPage('/pages/webview/aerogenSurvey')">成为经销商</u-button>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				field_list:[
					{
						field_title:'SOLO',
						field_src:'http://img.youyao99.com/5DF4B4265D21F8E8F36257F34F84A8E4.png',
						field_url:'/pages/products/aerogenApply/aerogenSolo'
					},
					{
						field_title:'Ultra',
						field_src:'http://img.youyao99.com/C282FC664BA21ABA52349B9196680502.png',
						field_url:'/pages/products/aerogenApply/aerogenUltra'
					},
					{
						field_title:'控制器',
						field_src:'http://img.youyao99.com/040D6BCBEC40BF962CAD01D0512883AA.png',
						field_url:'/pages/products/aerogenApply/aerogenController'
					},
					{
						field_title:'竞品分析',
						field_src:'http://img.youyao99.com/F8247A71F3913016AAABADF941881E44.png',
						field_url:'/pages/products/aerogenApply/aerogenAnalysis'
					},
					{
						field_title:'Q&A',
						field_src:'http://img.youyao99.com/3813539E01F7A549C97397DAA6ED2BA4.png',
						field_url:'/pages/products/aerogenApply/aerogenQaDetail'
					},
				]
			};
		},
		methods:{
			toNextPage(url){
				this.$Router.push({
					path:url
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content{
	padding-bottom: 160rpx;
}
.aerogen{
	color: #FFFFFF;
	background-color: $color-41;
	.aerogen_hd{
		text-align: center;
	}
	.aerogen_propty{
		line-height: 1.5;
		.u-m-b-16{
			font-weight: bold;
			text-align: center;
		}
	}
	.aerogen_apply{
		.u-m-b-40{
			font-weight: bold;
			text-align: center;
		}
	}
}	
.aerogen_field{
	font-weight: bold;
	.field_item{
		box-shadow: 0px 0px 6px 0px rgba(210, 210, 210, 0.5);
	}
	.aerogen_pic{
		width: 104rpx;
		height: 104rpx;
		position: relative;
		.u-image{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
	}
	.custom-icon{
		color: $color-41;
	}
}
.aerogen_partner{
	background-color: $color-f7;
	.title{
		text-align: center;
		color:$color-41;
		font-weight: bold;
	}
}
</style>
