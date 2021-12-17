<template>
	<view class="page-wrap u-p-30">
		<u-form :model="form" ref="uForm" label-position="top" :border-bottom="false">
			<u-form-item label="反馈内容" required :border-bottom="false"><u-input v-model="form.content" type="textarea" border /></u-form-item>
			<u-form-item label="上传图片 (最多6张)" :border-bottom="false">
				<!-- :max-size="5 * 1024 * 1024" -->
				<u-upload
					ref="uUpload"
					:max-count="6"
					:preview-full-image="false"
					:multiple="false"
					:action="actionUrl"
					:form-data="uploadParams"
					:before-upload="handleBeforeUpload"
					@on-choose-complete="handleChooseImg"
					@on-success="handleUploadFinished"
					@on-error="handleError"
					@on-remove="handleDelete"
				></u-upload>
			</u-form-item>

			<u-form-item label="联系方式" required :border-bottom="false"><u-input v-model="form.contact_information" border /></u-form-item>
		</u-form>

		<view class="u-p-40 u-m-40"><u-button type="primary" @click="submitForm">提交</u-button></view>
	</view>
</template>

<script>
import { getPicToken, uploadFile } from '@/api/common.js';
import { sendFeedback } from '@/api/setting.js';
export default {
	data() {
		return {
			form: {
				content: '',
				contact_information: '',
				picurl: []
			},

			actionUrl: '',
			uploadParams: {
				token: '',
				key: ''
			},
			qiniuConfig: {},

			errorCount: 0

		};
	},
	onLoad() {

		this.fetchQiniuConfig();

	},
	methods: {
		// 获取 qiniu 配置
		async fetchQiniuConfig() {
			let config = this.qiniuConfig;
			let validFlag = false; // 配置是否在有效期内

			if (config.expireTime) {
				const expireTime = config.expireTime.replace(/-/g, '/'); // ios 不识别 -
				validFlag = new Date(expireTime) - new Date() > 5 * 60 * 1000; // 小于 5分钟 重新请求
			}

			if (!validFlag) {
				const resData = await getPicToken({
					type: 2,
					business: 'feedback'
				});
				const resConfig = resData.data && resData.data.config ? resData.data.config : {};
				this.qiniuConfig = resConfig;

				await this.fetchQiniuConfig();
			} else {
				this.actionUrl = `${config.uploadUri}`;
				this.uploadParams = {
					token: config.token,
					key: ''
				};
			}
		},

		// 每次选择图片后触发
		handleChooseImg(lists, name) {
			this.fetchQiniuConfig();
		},

		// 上传失败
		async handleError(res, index, lists, name) {
			if (this.errorCount < 10) {
				this.errorCount++;
				// 清除并重新获取 qiniu 配置
				this.qiniuConfig = {};
				await this.fetchQiniuConfig();
				// 重新上传
				this.$refs.uUpload.reUpload();
			} else {
				uni.hideLoading();
				this.errorCount = 0;
				lists.splice(index, 1);
			}
		},


		async handleBeforeUpload(index, list) {
			uni.showLoading({
				title: '图片上传中...'
			});

			const fileType = list[index].url.split('.').pop();

			const config = this.qiniuConfig;

			// 指定文件返回的 key, 上传成功后 返回
			this.uploadParams.key = `${config.bucket}/${config.path}${this.$u.guid()}.${fileType}`;

			return true;
		},

		// 图片上传 qiniu 成功
		async handleUploadFinished(res, index, lists, name) {
			uni.hideLoading();
			this.errorCount = 0;

			let key; // 上传前配置的 key
			try {
				key = JSON.parse(res).key;
			} catch (e) {
				key = res.key;
			}

			const { baseUri, bucket } = this.qiniuConfig;

			const upload_params = {
				bucket: bucket,
				key: `${key.split(`${bucket}/`).pop()}`,
				name: `${key.split('/').pop()}`,
				url: `${baseUri}/${key}`
			};

			// 记录已上传 qiniu 图片
			uploadFile(upload_params).then(result => {
				this.form.picurl.push(result.data.info.url);
			});
		},

		handleDelete(index) {
			this.form.picurl.splice(index, 1);
		},

		submitForm() {
			const { content, contact_information, picurl } = this.form;
			if(!content || !contact_information) {
				this.$u.toast('请输入必填信息!');
				return;
			}

			let platform = 1;

			// #ifdef APP-PLUS
			platform = 2
			// #endif

			sendFeedback({
				platform, content, contact_information, picurl: picurl.join(',')
			}).then(res => {
				this.$u.toast('反馈提交成功!');
				this.form = {
					content: '',
					contact_information: '',
					picurl: []
				}

				setTimeout(() => {
					this.$Router.back();
				}, 1000)
			})
		}
	}
}
</script>

<style lang="scss" scoped></style>
