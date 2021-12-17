<template>
	<view class="content">
		<view class="personal_data u-p-l-30 u-p-r-30 u-p-t-20">
			<u-cell-group :border="false">
				<u-cell-item
				:arrow="true" class="u-p-l-0 u-p-r-0 u-p-t-20 u-p-b-20" 
				@click="editAvatarImg"
				title="头像">
					<yq-avatar
						ref="avatarEdit"
						selWidth="500upx"
						selHeight="500upx"
						@upload="uploadAvatarImg"
						:avatarSrc="show_info.avatar"
						avatarStyle="width: 90upx; height: 90upx; border-radius: 50%;background: #e4e4e4;"
					></yq-avatar>
					<!-- <u-avatar :src="show_info.avatar"></u-avatar> -->
				</u-cell-item>
				<u-cell-item
				:arrow="true" class="u-p-l-0 u-p-r-0 u-p-t-20 u-p-b-20" 
				title="昵称" 
				:value="show_info.name" 
				:value-style="{'color':'#666666'}"
				@click="showModel(0)">
				</u-cell-item>
				<u-cell-item
				:arrow="false" class="u-p-l-0 u-p-r-0 u-p-t-20 u-p-b-20" 
				title="微信号" 
				:value="show_info.wechat_nickname" 
				:value-style="{'color':'#666666'}">
				</u-cell-item>
				<u-cell-item 
				:arrow="true" class="u-p-l-0 u-p-r-0 u-p-t-20 u-p-b-20" 
				title="手机号" 
				:value="show_info.mobile" 
				:value-style="{'color':'#666666'}"
				@click="showModel(1)">
				</u-cell-item>
				<u-cell-item 
				v-if="show_info.verify_status == 1"
				class="u-p-l-0 u-p-r-0 u-p-t-20 u-p-b-20" 
				title="身份认证状态" 
				value="未认证" 
				hover-class="none"
				:arrow="true" 
				@click="toNextPage(show_info.verify_status)"
				:value-style="{'color':'#666666'}"></u-cell-item>
				<u-cell-item
				v-else-if="show_info.verify_status == 2"
				class="u-p-l-0 u-p-r-0 u-p-t-20 u-p-b-20" 
				title="身份认证状态" 
				value="认证中" 
				hover-class="none"
				:arrow="true" 
				@click="toNextPage(show_info.verify_status)"
				:value-style="{'color':'#5870FE'}"></u-cell-item>
				<u-cell-item
				v-else-if="show_info.verify_status == 3"
				class="u-p-l-0 u-p-r-0 u-p-t-20 u-p-b-20" 
				title="身份认证状态" 
				value="已认证" 
				hover-class="none"
				:arrow="true" 
				@click="toNextPage(show_info.verify_status)"
				:value-style="{'color':'#5870FE'}"></u-cell-item>
				<u-cell-item
				v-else-if="show_info.verify_status == 4"
				class="u-p-l-0 u-p-r-0 u-p-t-20 u-p-b-20" 
				title="身份认证状态" 
				value="重新认证" 
				hover-class="none"
				:arrow="true" 
				@click="toNextPage(show_info.verify_status)"
				:value-style="{'color':'#666666'}"></u-cell-item>
			</u-cell-group>
		</view>
		<u-gap height="20" bg-color="#F5F5F5"></u-gap>
		<view v-if="show_info.verify_status == 1" class="status u-p-30">
			<u-image width="100%" height="400" mode="heightFix" src="http://img.youyao99.com/C481F1B4FD169FC582AC233CDE977D1A.png"></u-image>
		</view>
		<view v-else-if="show_info.verify_status == 2" class="status u-p-30">
			<u-image 
			class="sub_status"
			width="240" height="210" mode="heightFix" 
			src="http://img.youyao99.com/0D3D9C0472FD04D431089836D3C7AA29.png"></u-image>
			<view class="u-text-center u-font-32 u-m-t-24" :style="{fontWeight:'bold'}">认证资料已提交</view>
			<view class="u-text-center u-m-t-10">我们将在1-2个工作日内完成审核</view>
		</view>
		<view v-else-if="show_info.verify_status == 4" class="status u-p-30">
			<u-image 
			width="280" height="210" mode="heightFix" 
			src="http://img.youyao99.com/81DE77586D43D715DD7ABF3DA6D5ED26.png"
			:style="{margin:'0 auto'}"></u-image>
			<view class="u-text-center u-m-t-20">{{show_info.reject_reason}}</view>
		</view>
		<u-button class="u-m-l-30 u-m-r-30 u-m-t-30" type="error" shape="circle" @click="logoutApp">退出登录</u-button>
		<!-- model修改手机号 -->
		<view>
			<u-modal 
			v-model="show" 
			:title="titles[type]" 
			show-cancel-button
			:confirm-style="{color:'#5870FE'}"
			@confirm="changeMobile"
			>
				<view v-if="type == 0" class="u-p-l-60 u-p-r-60 u-p-t-40 u-p-b-40">
					<u-input type="text" :border="true" v-model="name" placeholder="请输入昵称" />
				</view>
				<view v-else-if="type == 1" class="u-p-l-60 u-p-r-60 u-p-t-40 u-p-b-40">
					<u-form :model="form" ref="uForm">
						<u-form-item label="手机号" label-width="130rpx">
							<u-input v-model="form.phone" type="number" :maxlength="11" placeholder="请输入手机号" />
						</u-form-item>
						<u-form-item label="验证码" label-width="130rpx">
							<u-input v-model="form.code" type="number" :maxlength="6" />
							<u-button slot="right" hover-class="none" shape="circle" type="primary" size="mini" @tap="getCode">{{tips}}</u-button>
							<u-verification-code :seconds="seconds" ref="uCode" 
									@change="codeChange" />
						</u-form-item>
					</u-form>
				</view>
				
				
			</u-modal>
		</view>
	</view>
</template>
<script>
	import { getUserInfo,logout,sendCode } from '@/api/login.js';
	import { updateAvatar,updateMobile,updateName } from "@/api/mine.js";
	import { getPicToken,uploadFile } from '@/api/common.js';
	import * as qiniu from 'qiniu-js';
	export default {
		data(){
			return {
				show_info:{},
				form:{
					phone:'',
					code:''
				},
				seconds:60,
				tips:'',
				titles:[
					'修改昵称',
					'修改手机号'
				],
				name:'',
				type:0,
				show:false,
				can_back:true
			}
		},
		beforeRouteLeave(to, from, next) {
			// 导航离开该组件的对应路由时调用
			// 可以访问组件实例 `this`
			if (this.can_back) {
				next();
			} else {
				this.can_back = true;
				this.$refs.avatarEdit.fClose();
			}
		},
		onLoad() {
			this.getUserInfo()
		},
		methods:{
			// 获取更新用户信息
			async getUserInfo(){
				// 登录后获取用户信息
				let user_res = await getUserInfo();
				this.show_info = {...user_res.data.info};
				this.form.phone = this.show_info.mobile;
				this.name = user_res.data.info.name;
				this.$u.vuex('yy_app_user_info',Object.assign({}, this.yy_app_user_info, user_res.data.info))
			},
			// 修改头像
			editAvatarImg() {
				this.can_back = false;
				this.$refs.avatarEdit.fSelect();
			},
			async uploadAvatarImg(img) {
				const img_file = img.path;
				let params = {
					type:2,
					business:'avatar'
				}
				let res1 = await getPicToken(params);
				const upload_option = res1.data.config;
				let key = upload_option.path;
				let num = parseInt(Math.random()*10*new Date().getTime())+'.png';
				uni.uploadFile({
					// 上传图片到七牛
					url: 'https://upload.qiniup.com/' + upload_option.bucket, // 七牛
					filePath: img_file,
					name:'file',
					formData: {
						token: upload_option.token,
						key: key+num
					},
					success:  async upload_file_res => {
						let file_key;
						try {
							file_key = JSON.parse(upload_file_res.data).key;
						} catch (e) {
							file_key = upload_file_res.data.key;
						}
						let upload_params = {
							bucket:upload_option.bucket,
							key:file_key,
							name:num,
							url:`${upload_option.baseUri}/${key}${num}`
						};
						let res2 = await uploadFile(upload_params);
						let res3 = await updateAvatar({
								'avatar_id':res2.data.info.id
							})
						this.getUserInfo()
					}
				});
			},
			// 修改手机号
			showModel(value){
				this.show = true;
				this.type = value;
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode(){
				let reg = /^1[0-9]{10}$/;
				if(!this.form.phone){
					this.show = true;
					this.$u.toast('手机号不能为空');
					return
				} else if(!reg.test(this.form.phone)){
					this.show = true;
					this.$u.toast('手机号码不正确');
					return
				};
				if (this.$refs.uCode.canGetCode) {
					sendCode({
						'mobile':this.form.phone
					}).then(res => {
						if(process.env.NODE_ENV != 'production') {
							this.$u.toast(res.data.code + '', 1500);
						}
						this.$refs.uCode.start();
					});
				}else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			async changeMobile(){
				if(this.type == 0){
					if(this.name == ''){
						this.$u.toast('请输入昵称');
						return
					};
					let res = await updateName({name:this.name});
					this.$u.toast(res.errmsg);
					this.getUserInfo()
					return
				} else if(this.type == 1){
					let reg = /^1[0-9]{10}$/;
					let reg_code = /^[0-9]{6}$/;
					if(!this.form.phone || !this.form.code){
						this.show = true;
						this.$u.toast('不能为空');
						return
					} else if(!reg.test(this.form.phone)){
						this.show = true;
						this.$u.toast('手机号码不正确');
						return
					} else if(!reg_code.test(this.form.code)){
						this.show = true;
						this.$u.toast('验证码格式不正确');
						return
					};
					let res = await updateMobile({'mobile':this.phone});
					if(res.errcode == 0){
						this.getUserInfo();
						this.form = {
							phone:'',
							code:''
						};
						this.getUserInfo()
					} else {
						this.$u.toast(res.errmsg);
					}	
				}
			},
			// 退出登录
			async logoutApp(){
				let res = await logout();
				this.$u.vuex('yy_app_user_info',{});
				this.$u.vuex('yy_app_openid','');
				if(res.errcode == 0){
					this.$Router.replace({
						path:'/pages/login/login'
					})	
				}
			},
			toNextPage(status){
				if(status == 1 || status == 4){
					this.$Router.push({
						path:'/pages/authentication/authentication'
					})
				} else {
					this.$Router.push({
						path:'/pages/mine/verifyInfo'
					})	
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.sub_status{
		margin: 0 auto;
	}
</style>
