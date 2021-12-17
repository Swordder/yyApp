<template>
	<view class="content">
		<view class="header u-p-40">
			<view class="u-font-36 u-m-b-24">Aerogen Pro-X控制器/USB控制器</view>
			<u-avatar class="u-m-r-40" size="208" src="http://img.youyao99.com/AC280190D60B180FF00A192413FA07EB.png"></u-avatar>
			<u-avatar size="208" src="http://img.youyao99.com/040D6BCBEC40BF962CAD01D0512883AA.png"></u-avatar>
		</view>
		<!-- 产品优势 -->
		<view class="adv_list u-p-40">
			<view class="h3_title">优势-slogan</view>
			<SpecialList class="u-p-t-32" :special_list="special_list" :styles="styles"></SpecialList>
		</view>
		<!-- 产品特点 -->
		<view class="u-p-40" :style="{'backgroundColor':'#138CDE'}">
			<view class="h3_title u-m-b-54">产品特点</view>
			<u-image width="100%" height="540" src="http://img.youyao99.com/AF5C37EFF346256213CF2B1EE6A9FB70.png"></u-image>
		</view>
		<u-image class="u-p-t-40 u-p-b-40 u-p-l-40" width="100%" height="640" src="http://img.youyao99.com/CD8EC26346C41A2423F85E226F6115E4.png"></u-image>
		<!-- 设置举例 -->
		<view class="u-p-40" :style="{'backgroundColor':'#0077C8'}">
			<view class="h3_title u-m-b-54">设置举例</view>
			<view class="setting_item u-m-b-60" v-for="(item,index) in setting_list" :key="index">
				<view class="title u-p-t-20 u-p-b-20 u-p-l-30 u-p-r-30">{{item.title}}</view>
				<u-image width="100%" height="648" :src="item.image_url"></u-image>
			</view>
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
	import SpecialList from '@/components/products/SpecialList.vue';
	export default {
		data() {
			return {
				special_list:[
					{
						title:'使用快捷，设置简单',
						sub_title:''
					},
					{
						title:'驱动Aerogen Solo',
						sub_title:''
					},
					{
						title:'完全静音',
						sub_title:''
					},
					{
						title:'不增加流量',
						sub_title:''
					},
					{
						title:'具有30分钟和连续模式选项',
						sub_title:''
					},
				],
				styles:{
					width:'40rpx',
					height:'40rpx',
					backgroundColor:'#0077C8',
					indexColor:'#FFD100',
					color:'#FFD100',
					fontColor:'#0077C8',
					textAlign:'center'
				},
				setting_list:[
					{
						title:'Aerogen Pro-X控制器驱动Aerogen Solo成为一个易于使用的设备，服务于整个医院',
						image_url:'http://img.youyao99.com/0AE591BCB91A3672104DC7DEB6FB0283.png'
					},
				]
			};
		},
		components:{
			SpecialList
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
.header{
	color: $color-xf;
	text-align: center;
	background-color: $color-42;
}
.adv_list{
	color: #FFFFFF;
	background-color: $color-41;
}
.h3_title{
	position: relative;
	text-align: center;
	color: $color-xf;
	&::after{
		content: '';
		position: absolute;
		bottom: -10rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 36rpx;
		height: 6rpx;
		background-color: $color-xf;
	}
}
.setting_item{
	.title{
		color: $color-43;
		text-align: center;
		border: 2rpx solid $color-xf;
	}
}
</style>
