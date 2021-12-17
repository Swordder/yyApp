<template>
	<view class="content u-p-30">
		<view class="u-text-center">
			<view class="u-m-b-20">
				交卷时间
			</view>
			<view class="u-font-36">
				{{$Route.query.last_time}}
			</view>
		</view>
		<view class="u-m-t-80">
			<u-image :style="{margin:'0 auto'}" v-if="$Route.query.is_exam_pass == 0" width="212" height="160" src="http://img.youyao99.com/cf78c29467fbacdc1b7614a7898e7054.png"></u-image>
			<u-image :style="{margin:'0 auto'}" v-else-if="$Route.query.is_exam_pass == 1" width="212" height="160" src="http://img.youyao99.com/2a6536eae71882fd143cfec959fb61b5.png"></u-image>
		</view>
		<view v-if="$Route.query.with_agreement == 1" class="agree_btn u-text-center" @click="getAgreeCon">
			协议书
		</view>
		<!-- popup -->
		<u-popup v-model="show" mode="bottom" height="100%" :closeable="true">
			<view class="agree_content u-p-l-40 u-p-r-40 u-p-t-60 u-p-b-180">
				<view class="u-text-center u-font-36 u-m-b-20 font_bold">协议书</view>
				<view class="u-content">
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
		<!-- 签名 -->
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
	import { examSubmit,examAgreement } from '@/api/compliance.js';
	import Signature from '@/components/sin-signature/sin-signature.vue'
	export default {
		data() {
			return {
				show:false,
				checked:false,
				show_sign_pop:false,
				customStyle:{
					backgroundColor:'#5870FE',
					color:'#ffffff'
				},
				result:{},
				content:'',
				sign_con:''
			};
		},
		components: {
			Signature,
		},
		beforeRouteLeave(to, from, next) {
			if(to.BACKTYPE) {
			   next({
					delta: 2,
					NAVTYPE: 'back'
			   })
			} else {
			   next()
			}
		},
		// onBackPress(options) {  
		// 	if (options.from === 'navigateBack') {  
		// 		return false;  
		// 	}  
		// 	uni.navigateBack({  
		// 		delta: 2  
		// 	});    
		// 	return true;  
		// },  
		methods:{
			async getAgreeCon(){
				this.show = true;
				let params = {
					id : this.$Route.query.id
				};
				let res= await examAgreement(1,params);
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
			}
		}
	}
</script>
<style lang="scss" scoped>
.agree_btn{
	position: fixed;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 120rpx;
	line-height: 120rpx;
	box-shadow: 0px 0px 10px 0px rgba(204, 213, 224, 0.5);
	font-weight: bold;
}
.agree_content{
	padding-bottom: 210rpx;
}
</style>
