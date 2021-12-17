<template>
	<view class="content">
		<view class="exam_item u-p-30">
			<view class="u-font-32 u-m-b-30" :style="{fontWeight:'bold'}">
				{{info.name}}
			</view>
			<view class="u-flex u-row-between">
				<template>
					<view v-if="info.is_time_unlimited == 0" class="">
						<u-icon class="u-m-r-20" name="clock-fill" top="8" color="#5870FE" size="50"></u-icon>
						<text :style="{color:'#5870FE',fontWeight:'bold'}">无时限</text>
					</view>
					<template v-if="info.is_time_unlimited == 1">
						<view class="">
							<view class="u-m-b-20">
								<text class="custom-icon u-m-r-20">&#xe60e;</text>
								<text class=" u-m-r-20" :style="{color:'#999999'}">开始时间</text>
								{{info.start?info.start:'无'}}
							</view>
							<view class="">
								<text class="custom-icon u-m-r-20">&#xe60e;</text>
								<text class="u-m-r-20" :style="{color:'#999999'}">结束时间</text>
								{{info.end?info.end:'无'}}
							</view>
						</view>
					</template>
				</template>
				<template>
					<view class="">
						<u-image v-if="info.status == 0 || info.status == 1" width="120" height="88" src="http://img.youyao99.com/6fd4005e027ddb459b1114e1ad0f683f.png"></u-image>
						<u-image v-else-if="info.status == 2" width="120" height="88" src="http://img.youyao99.com/cf78c29467fbacdc1b7614a7898e7054.png"></u-image>
						<u-image v-else-if="info.status == 3" width="120" height="88" src="http://img.youyao99.com/2a6536eae71882fd143cfec959fb61b5.png"></u-image>
						<u-image v-else-if="info.status == 4" width="120" height="88" src="http://img.youyao99.com/fe8da94d04ef4f6d6776e3a0344f2289.png"></u-image>
					</view>
				</template>
			</view>	
		</view>
		<view class="exam_tip_wrap u-p-30 u-p-m-t-60">
			<view class="exam_tip u-p-30">
				<u-section title="考试说明" line-color="#5870FE" :right="false"></u-section>
				<view class="u-p-l-18 u-m-t-20 u-font-24" :style="{color:'#999999'}">
					{{info.desc?info.desc:'暂无考试说明'}}
				</view>
			</view>
		</view>
		<view class="exam_status u-p-l-30 u-p-r-30">
			<view v-if="info.is_review == 1" class="exam_status_item u-m-b-40 u-rela">
				<u-image width="100%" height="360" src="http://img.youyao99.com/f4e4ca8be71dab6a14c5268f30e8ff63.png"></u-image>
				<view class="exam_status_title u-text-center u-abso">
					<view class="u-m-b-20" :style="{fontWeight:'bold'}">回顾答题</view>
					<view class="" :style="{color:'#4ED79C'}">交卷时间：{{info.last_time}}</view>
				</view>
				<u-button class="exam_status_btn u-abso" shape="circle" hover-class="none" @click="toNextPage('/pages/compliance/examReview')">回顾</u-button>
			</view>
			<view v-show="info.with_agreement == 1" class="exam_status_item u-m-b-40 u-rela">
				<u-image width="100%" height="360" src="http://img.youyao99.com/265bc6953e593da47223ec6f5c4abbf2.png"></u-image>
				<template v-if="info.is_sign == 0">
					<view class="exam_status_title u-text-center u-abso">
						<view :style="{fontWeight:'bold'}">协议签署</view>
						<!-- <view class="" :style="{color:'#5870FE'}">签署时间：{{info.sign_time}}</view> -->
					</view>
					<u-button 
					class="exam_status_btn u-abso" 
					:style="{backgroundColor:'#5870FE'}" shape="circle" 
					hover-class="none"
					@click="getAgreeCon">签署</u-button>
				</template>
				<template v-else-if="info.is_sign == 1">
					<view class="exam_status_title u-text-center u-abso">
						<view class="u-m-b-20" :style="{fontWeight:'bold'}">协议签署</view>
						<view class="" :style="{color:'#5870FE'}">签署时间：{{info.sign_time}}</view>
					</view>
					<u-button 
					class="exam_status_btn u-abso" 
					:style="{backgroundColor:'#5870FE'}" 
					shape="circle" hover-class="none"
					@click="toNextPage('/pages/compliance/agreeView')">查看协议</u-button>
				</template>
			</view>
		</view>
		<view v-show="info.status == 1 || info.status == 2" class="exam_btn u-p-30">
			<u-button 
			class="selected" 
			type="primary" 
			shape="circle" 
			hover-class="none" 
			v-if="info.status == 1"
			@click="toNextPage('/pages/compliance/examContent')">开始考试</u-button>
			<u-button
			class="selected" 
			type="primary" 
			shape="circle" 
			hover-class="none" 
			v-if="info.status == 2"
			@click="toNextPage('/pages/compliance/examContent')">重新考试</u-button>
		</view>
		<!-- 签署协议 -->
		<u-popup v-model="show" mode="bottom" height="100%" :closeable="true">
			<view class="agree_content u-p-l-40 u-p-r-40 u-p-t-60 u-p-b-180" :style="{height:'100%'}">
				<view class="u-text-center u-font-36 u-m-b-20 font_bold">协议书</view>
				<view class="u-content u-rela" :style="{height:'100%'}">
					<u-parse :html="content"></u-parse>
				</view>	
				<view class="fix_bt_btn u-p-30">
					<view class="u-flex u-row-center u-m-b-30 u-text-center">
						<u-checkbox shape="circle" v-model="checked" active-color="#5870FE" />
						<view class="">
							我已阅读并同意《协议书》
						</view>
					</view>
					<u-button 
					shape="circle" 
					:custom-style="customStyle" 
					hover-class="none"
					@click="showSign">确定</u-button>
				</view>
			</view>
		</u-popup>
		<!-- 签署协议 -->
		<u-popup v-model="show_sign_pop" mode="bottom" height="100%" :closeable="true">
			<view class="content" style="padding: 10rpx;">
				<view style="border: 1rpx dashed #555555;">
					<Signature ref="sig" v-model="sign_con"></Signature>
				</view>
				<view class="u-flex u-m-t-30">
					<u-button class="u-flex-1 u-m-r-20" @tap="startSign" :style="{backgroundColor:'#5870FE',color:'#ffffff'}">弹出签名页</u-button>
					<u-button class="u-flex-1" @tap="signEnd" :style="{color:'#5870FE'}">确定签名</u-button>
				</view>
			</view>	
		</u-popup>
	</view>
</template>

<script>
	import { examDetail,examAgreement,examAgreeView } from '@/api/compliance.js';
	import Signature from '@/components/sin-signature/sin-signature.vue';
	export default {
		data() {
			return {
				
				show:false,
				content:'',
				info:{},
				checked:false,
				show_sign_pop:false,
				customStyle:{
					backgroundColor:'#5870FE',
					color:'#ffffff'
				},
				result:{},
				content:'',
				sign_con:'',
				
			};
		},
		components: {
			Signature,
		},
		onLoad() {
			this.getDetail();
		},
		methods:{
			async getDetail(){
				let res = await examDetail(this.$Route.query.id);
				this.info = res.data.info;
			},
			async getAgreeCon(){
				this.show = true;
				let params = {
					id : this.$Route.query.id
				};
				let res = await examAgreement(1,params);
				this.content = res.data.content;
			},
			async showSign(){
				if(!this.checked){
					this.$u.toast('请勾选同意书')
					return
				};
				this.show_sign_pop = true;
			},
			async startSign() {
				this.$refs.sig.showSignature()
			},
			async signEnd(){
				if(!this.sign_con){
					this.$u.toast('请签字');
					return
				}
				this.$refs.sig.getSyncSignature().then(res => {
					console.log(res)
				}).catch(err => {
					console.log(err)
				});
				let params = {
					id:this.$Route.query.id,
					sign_img:this.sign_con
				}
				let res = await examAgreement(2,params);
				this.show_sign_pop = false;
				this.$Router.push({
					path:'/pages/compliance/exam'
				})
			},
			toNextPage(path){
				this.$Router.push({
					path,
					query:{
						id : this.$Route.query.id
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.content{
		padding-bottom: 160rpx;
		.exam_tip{
			box-shadow: 0px 2px 10px 0px rgba(216, 216, 216, 0.5);
		}
		.exam_status_item{
			height: 360rpx;
			.exam_status_title{
				width: 100%;
				top: 40rpx;
			}
			.exam_status_btn{
				width: 480rpx;
				bottom: 128rpx;
				z-index: 1;
				background-color: $color-37;
				color: $color-xf;
			}	
		}
		.custom-icon{
			color: $color-31;
		}
		.exam_btn{
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 2;
			background-color: $color-xf;
			.selected{
				background-color: $color-31;
			}
		}
	}

</style>
