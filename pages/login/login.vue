<template>
	<view class="content">
		<u-image width="750rpx" height="470rpx" src="/static/images/top-img-1.png"></u-image>
		<view class="u-p-40"></view>
		<view class="u-font-36 u-m-t-40 u-text-center" style="font-weight: 900; color: #5870FE; letter-spacing: 4rpx;">用户登录</view>

		<view class="form-wrap u-p-t-40">
			<!-- #ifdef H5 -->
			<u-button class="u-m-t-40" type="primary" shape="circle" ripple :customStyle="btnCustomStyle" @click="wxLoginH5">微信一键登录</u-button>
			<!-- #endif -->

			<!-- #ifdef APP-PLUS -->
			<template v-if="isAndroid">
				<u-button class="u-m-t-40" type="primary" shape="circle" ripple :customStyle="btnCustomStyle" :disabled="!checked" @click="wxLoginApp">微信一键登录</u-button>
				<view class="tips-wrap u-flex u-m-t-30">
					<u-checkbox shape="circle" v-model="checked" active-color="#5870FE" />
					<view class="">
						点击【微信一键登录】即为已阅读并同意
						<text class="link" @click="previewWebview(1)">《优药服务协议》</text>
						和
						<text class="link" @click="previewWebview(2)">《优药隐私政策》</text>
					</view>
				</view>
			</template>
			<template v-if="isIOS">
				<u-button class="u-m-t-40" type="primary" shape="circle" ripple :customStyle="btnCustomStyle" :disabled="!checked" @click="appleLoginApp">通过 Apple 注册</u-button>
				<u-button class="u-m-t-40" type="primary" shape="circle" ripple :customStyle="btnCustomStyle" :disabled="!checked" @click="wxLoginApp">绑定微信</u-button>
				<view class="tips-wrap u-flex u-m-t-30">
					<u-checkbox shape="circle" v-model="checked" active-color="#5870FE" />
					<view class="">
						点击【通过 Apple 注册】即为已阅读并同意
						<text class="link" @click="previewWebview(1)">《优药服务协议》</text>
						和
						<text class="link" @click="previewWebview(2)">《优药隐私政策》</text>
					</view>
				</view>
			</template>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
	import { recordWechatInfo, wxLogin, getUserInfo } from '@/api/login.js';
	export default {
		data() {
			return {
				checked: false,
				btnCustomStyle: {
					background: '#5870FE',
					height: '88rpx'
				},
				
				isIOS: false,
				isAndroid: false
			};
		},
		onLoad() {
			this.isIOS = this.$u.os() == 'ios';
			this.isAndroid = this.$u.os() == 'android';
			// this.$u.vuex('yy_app_openid','o74tD6vs11Kz8NR43y2KMNGyfeSk')
		},
		onReady() {},
		beforeRouteLeave(to,from,next) {
			next()
		},
		methods: {
			async wxLoginH5(){
				// #ifdef H5
				this.login()
				// #endif
			},
			// APP微信登录
			wxLoginApp(){
				let _this = this;
				_this.$u.vuex('yy_app_user_info', {});
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						// 获取登录信息
						uni.getUserInfo({
							provider: 'weixin',
							success: function (infoRes) {
								const { openId, nickName, gender, province, city, country, avatarUrl, unionId } = infoRes.userInfo;
								_this.$u.vuex('yy_app_openid', openId);
								recordWechatInfo({
									"openid": openId,
									"nickname": nickName,
									"sex": gender,
									province,
									city,
									country,
									"headimgurl":avatarUrl,
									"unionid": unionId
								}).then(res => {
									_this.login();
								})
							}
						});
					}
				});
			},
			// 登录接口
			async login(){
				let params = {
					"openid":this.yy_app_openid,
					// "auth_type": 1
				};
				let res = await wxLogin(params);
				if(res.data.auth.auth_status == 2){
					this.$Router.push({
						path:'/pages/mine/bindPhone'
					})
				} else {
					let status = {...res.data.auth};
					this.$u.vuex('yy_app_user_info',Object.assign({}, this.yy_app_user_info, status));
					this.$Router.pushTab({
						path:'/pages/index/index'
					})
				}
			},
			
			// 查看协议
			previewWebview(type) {
				const links = {
					1: 'http://static.youyao99.com/protocol-youyao.html',
					2: 'http://static.youyao99.com/permission-youyao.html'
				};
				this.$Router.push({
					path: '/pages/webview/webview',
					query: {
						link: links[type]
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
.form-wrap {
	padding: 10vw;
}
.tips-wrap {
	font-size: 24rpx;
	.link {
		color: $color-31;
	}
}
</style>
