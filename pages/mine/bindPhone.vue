<template>
	<view class="page-wrap u-flex u-flex-col ">
		<u-image width="750rpx" height="320rpx" src="/static/images/top-img-1.png"></u-image>

		<view class="form-wrap u-m-t-40 u-p-t-40">
			<u-form :model="formData" :border-bottom="false" ref="uForm" :error-type="errorType">
				<u-form-item prop="phone">
					<view class="u-flex u-flex-1">
						<text class="custom-icon u-m-r-8 u-font-40">&#xe73d;</text>
						<u-input v-model.trim="formData.phone" type="number" :maxlength="11" placeholder="请输入手机号码" />
					</view>
				</u-form-item>
				<u-form-item prop="smsCode" :border-bottom="false">
					<view class="u-flex">
						<text class="custom-icon u-m-r-8 u-font-40">&#xe614;</text>
						<u-input v-model.trim="formData.smsCode" :maxlength="6" placeholder="请输入验证码" />
					</view>
					<u-button slot="right" size="mini" type="primary" plain shape="circle" @click="getCode()">{{ codeTips }}</u-button>
				</u-form-item>
			</u-form>

			<u-button class="u-m-t-40" type="primary" shape="circle" ripple :customStyle="btnCustomStyle" @click="submit">绑定</u-button>
		</view>

		<!-- 倒计时提示 -->
		<u-verification-code seconds="60" ref="uCode" change-text="倒计时Xs" end-text="获取验证码" unique-key="login" keep-running  @change="codeTipsChange"></u-verification-code>
	</view>
</template>

<script>
import { sendCode, wxMobilLogin } from '@/api/login.js';
export default {
	data() {
		return {
			formData: {
				phone: '',
				smsCode: ''
			},
			errorType: ['border-bottom', 'toast'],
			rules: {
				phone: [
					{
						required: true,
						message: '请输入手机号码',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					},
					{
						// 自定义验证函数
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						trigger: ['change', 'blur']
					}
				],
				smsCode: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['change', 'blur']
					}
				]
			},

			codeTips: '',
			btnCustomStyle: {
				background: '#5870FE',
				height: '88rpx'
			}
		};
	},
	watch:{
		'formData.smsCode'(newVal) {
			if(newVal.length <= 6) {
				this.formData.smsCode = newVal;
			} else {
				this.formData.smsCode = newVal.substr(0, 6);
			}
		}
	},
	onLoad() {
		console.log(this.$Route.query.replacePath)
	},
	onReady() {},
	methods: {
		// 验证码倒计时
		codeTipsChange(text) {
			this.codeTips = text;
		},
		// 获取验证码
		getCode() {
			this.$refs.uForm.setRules({ phone: this.rules.phone });
			this.$refs.uForm.validate(valid => {
				if (valid) {
					// 判断是否可以点击(倒计时是否结束)
					if (this.$refs.uCode.canGetCode) {
						sendCode({
							'mobile':this.formData.phone
						}).then(res => {
							if(process.env.NODE_ENV != 'production') {
								this.$u.toast(res.data.code + '', 1500);
							}
							this.$refs.uCode.start();
						});
					} else {
						this.$u.toast('倒计时结束后再发送');
					}
				} else {
					console.log('验证失败');
				}
			});
		},
		// 提交表单
		submit() {
			this.$refs.uForm.setRules(this.rules);
			this.$refs.uForm.validate(valid => {
				let params = {
					"openid": this.yy_app_openid,
					"auth_type": 1,
					"mobile": this.formData.phone,
					"code": this.formData.smsCode
				};
				if (valid) {
					wxMobilLogin(params).then(res => {
						this.$u.vuex('yy_app_user_info',Object.assign({}, this.yy_app_user_info, res.data.auth))
						if(res.errcode != 0){
							return
						};
						if(this.$Route.query.replacePath){
							this.$Router.push({
								path:replacePath
							})
						} else {
							this.$Router.pushTab({
								path:'/pages/index/index'
							})	
						}
					});
				} else {
					console.log('验证失败');
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.page-wrap {
}
.form-wrap {
	width: 75vw;
}
.custom-icon{
	color: $color-31;
}
.tips-wrap {
	font-size: 24rpx;

	.link {
		color: var(--color-31);
	}
}
</style>
