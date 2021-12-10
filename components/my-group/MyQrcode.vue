<template>
	<u-popup v-model="showQrcode" mode="center" border-radius="16" @close="hidePopup">
		<view class="content-wrap u-rela u-p-30">
			<image class="preview-img" mode="scaleToFill" :src="shareImg" @load="hideLoading" @error="hideLoading" @longpress="showShareMenu"></image>
			<view class="tips-text">长按分享给好友</view>
			<uqrcode v-if="type != 'image'" ref="uqrcode" class="canvas-hide"></uqrcode>
		</view>
	</u-popup>
</template>

<script>
/*
	show	是否显示
	type	url 类型
	url		显示的内容(根据 type 判断, image 直接显示, 其他转为二维码)
*/
export default {
	name: 'MyQrcode',
	props: {
		show: {
			type: Boolean,
			default: false
		},
		type: {
			type: String,
			default: 'image'
		},
		url: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			shareImg: '',
			showQrcode: false
		};
	},
	created() {
		this.showQrcode = this.show;
		uni.showLoading({
		    title: '加载中'
		});
	},
	mounted() {
		if (this.type === 'image') {
			this.shareImg = this.url;
		} else {
			setTimeout(() => {
				this.$refs.uqrcode
					.make({
						size: 400,
						text: this.url
					})
					.then(res => {
						// 返回的res与uni.canvasToTempFilePath返回一致
						this.shareImg = res.tempFilePath;
					});
			}, 10);
		}
	},
	methods: {
		// 长按图片
		showShareMenu() {
			// #ifdef APP-PLUS
			// TODO app 分享
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 2,
				imageUrl: this.shareImg,
				success: res => {
					console.log('success:' + JSON.stringify(res));
				},
				fail: err => {
					console.log('fail:' + JSON.stringify(err));
				}
			});
			// #endif
		},

		hidePopup() {
			this.$emit('hide');
		},
		
		hideLoading() {
			uni.hideLoading();
		}
	}
};
</script>

<style lang="scss" scoped>
.content-wrap {
}
.tips-text {
	margin-top: 10rpx;
	text-align: center;
	font-size: 24rpx;
	color: #f00;
}
.preview-img {
	display: block;
	width: 400rpx;
	height: 400rpx;
}
.canvas-hide {
	position: fixed;
	right: 100vw;
	bottom: 100vh;
	z-index: -9999;
	opacity: 0;
}
</style>
