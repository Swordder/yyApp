<template>
	<view class="upload_com u-flex u-row-left u-flex-wrap">
		<view class="u-flex u-row-left">
			<view class="pre_item u-rela u-m-r-20" v-for="(item, index) in imgs_list" @click="deleteImg(item.id)" :key="item.id">
				<u-image width="160" height="160" class="pre_item_image" :src="item.url" mode="aspectFit"></u-image>
				<u-icon class="u-abso" size="40" color="#666666" name="close-circle-fill"></u-icon>
			</view>
		</view>
		<u-upload
			class="u-flex-1"
			width="160"
			height="160"
			ref="uUpload"
			:custom-btn="true"
			:multiple="false"
			:show-upload-list="false"
			:source-type="['camera']"
			:action="action"
			:form-data="form_data"
			:before-upload="handleBeforeUpload"
			@on-choose-complete="handleChooseImg"
			@on-success="handleUploadFinished"
			@on-error="handleError"
		>
			<view slot="addBtn" class="btn-upload u-flex u-flex-col u-col-center u-row-center">
				<u-icon name="photo" size="72"></u-icon>
				<view class="u-font-24">拍照上传</view>
			</view>
		</u-upload>
	</view>
</template>

<script>
import { getPicToken, uploadFile } from '@/api/common.js';
export default {
	props: ['pics_list', 'type'],
	data() {
		return {
			imgs_list: [],

			action: '',
			form_data: {},

			errorCount: 0
		};
	},
	watch: {
		pics_list(val) {
			this.imgs_list = [...val];
		}
	},
	created() {
		this.fetchQiniuConfig();
	},
	mounted() {
		let pics = [];
		if (this.type == 'checkin') {
			pics = this.visit_checkin.pics;
		} else if (this.type == 'checkout') {
			pics = this.visit_checkout.pics;
		}
		this.imgs_list = pics ? [...pics] : [];
	},
	methods: {
		// 获取 qiniu 配置
		async fetchQiniuConfig() {
			let config = this.qiniu_visit_config;
			let validFlag = false; // 配置是否在有效期内

			if (config.expireTime) {
				const expireTime = config.expireTime.replace(/-/g, '/'); // ios 不识别 -
				validFlag = new Date(expireTime) - new Date() > 5 * 60 * 1000; // 小于 5分钟 重新请求
			}

			if (!validFlag) {
				const resData = await getPicToken({
					type: 2,
					business: 'visit'
				});
				const resConfig = resData.data && resData.data.config ? resData.data.config : {};
				this.$u.vuex('qiniu_visit_config', resConfig);

				await this.fetchQiniuConfig();
			} else {
				this.action = `${config.uploadUri}`;
				this.form_data = {
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
				this.$u.vuex('qiniu_visit_config', {});
				await this.fetchQiniuConfig();
				// 重新上传
				this.$refs.uUpload.reUpload();
			} else {
				uni.hideLoading();
				this.errorCount = 0;
			}
		},

		async handleBeforeUpload(index, list) {
			uni.showLoading({
				title: '图片上传中...'
			});

			const fileType = list[index].url.split('.').pop();

			const config = this.qiniu_visit_config;

			// 指定文件返回的 key, 上传成功后 返回
			this.form_data.key = `${config.bucket}/${config.path}${this.$u.guid()}.${fileType}`;

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

			const { baseUri, bucket } = this.qiniu_visit_config;

			const upload_params = {
				bucket: bucket,
				key: `${key.split(`${bucket}/`).pop()}`,
				name: `${key.split('/').pop()}`,
				url: `${baseUri}/${key}`
			};

			// 记录已上传 qiniu 图片
			uploadFile(upload_params).then(result => {
				this.imgs_list.push(result.data.info);
				this.$emit('receiveImgList', this.imgs_list);
			});
		},

		deleteImg(id) {
			this.imgs_list.map((item, index) => {
				if (item.id == id) {
					this.imgs_list.splice(index, 1);
					// console.log(this.imgs_list)
					this.$emit('receiveImgList', this.imgs_list);
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.pre_item {
	width: 160rpx;
	height: 160rpx;
	border-radius: 8rpx;
	.u-abso {
		position: absolute;
		top: -10rpx;
		right: -0rpx;
	}
}
.btn-upload {
	width: 160rpx;
	height: 160rpx;
	border-radius: 8rpx;
	background-color: $color-f5;
}
</style>
