<template>
	<view class="qrcode">
		<u-popup v-model="show" mode="center" width="460" height="520" :zoom="true" close-icon="close" border-radius="20" :mask="true" @close="closePopup">
			<image class="share-img" :src="imgUrl" mode="widthFix" v-if="imgUrl" @longpress="share"></image>
		</u-popup>
		<!-- <image class="image-hide" :src="url" mode="" v-if="type=='doctor'"></image> -->
		<view class="canvas-hide"><canvas style="width: 460px; height: 520px;" canvas-id="myCanvas" id="myCanvas"></canvas></view>
		<uqrcode ref="uqrcode" class="canvas-hide"></uqrcode>
	</view>
</template>

<script>
import {getStoreQrCode} from '@/api/youyunInvite.js'
export default {
	props: ['copyStoreId', 'copyDrugId', 'copyDrugName','showPopup','url','type'],
	data() {
		return {
			imgUrl: '',
			canvas_w: 460,
			canvas_h: 520,
			canvas_r: 1,
			show:this.showPopup
		};
	},

	created() {
		console.log(this.url)
	},
	
	mounted() {
		setTimeout(this.log,0)
	},

	methods: {
		//生成二维码并绘制在画布中
		async log() {
			uni.showToast({
				title: "正在生成二维码",
				icon: "none",
				mask: true,
				duration: 100000
			})
			const ctx = uni.createCanvasContext('myCanvas');
			let qrcode
			if (this.type == 'store') {
				qrcode = await this.drawQRcode();
				
				ctx.drawImage(qrcode, 30, 20, 400, 400);
			}
			else if (this.type == 'doctor') {
				qrcode = this.url
				ctx.drawImage(qrcode,30,20,400,400)
			}
			ctx.beginPath()
			this.drawBorder(ctx)
			this.drawText(ctx);
			ctx.draw();

			setTimeout(() => {
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: this.canvas_w,
					height: this.canvas_h,
					// destWidth: 0,
					// destHeight: 0,
					canvasId: 'myCanvas', // canvas id
					success: (res) => {
						const savedFilePath = res.tempFilePath;
						uni.hideToast();
						this.imgUrl = savedFilePath;
						console.log(this.imgUrl); 

						// const path = plus.io.convertLocalFileSystemURL(savedFilePath); //绝对路径
						// const fileReader = new plus.io.FileReader();
						// fileReader.readAsDataURL(path);
						// fileReader.onloadend = res => {
						// 	//读取文件成功完成的回调函数

						// };
					}
				});
			}, 500);

		},

		// 加载图片
		loadImage(imgURL) {
			const reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
			if (reg.test(imgURL)) {
				return imgURL;
			}

			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src: imgURL,
					success: image => {
						console.log(3333);
						resolve(image.path);
					},
					fail: err => {
						console.log(imgURL, err);
					}
				});
			}).catch(err => console.log(err));
		},

		// 绘制药店二维码
		async drawQRcode() {
			let qrcodeText
			if (this.type == 'doctor') {
				qrcodeText = this.url
			}
			else if (this.type == 'store') {
				qrcodeText = `${this.url}?drugStoreId=${this.copyStoreId}&drugId=${this.copyDrugId}&drugName=${this.copyDrugName}`;
			}
			console.log(qrcodeText);
			return new Promise((resolve, reject) => {
				this.$refs.uqrcode
					.make({
						size: 300,
						text: qrcodeText
					})
					.then(res => {
						resolve(res.tempFilePath);
					});
			}).catch(err => console.log(err));
		},
		//绘制文字边框
		drawBorder(ctx) {
			ctx.arc(90, 460, 30, 0.5*Math.PI,1.5* Math.PI,false);
			ctx.moveTo(90,430);
			ctx.lineTo(390,430);
			ctx.arc(390,460,30,-0.5*Math.PI,0.5*Math.PI,false);
			ctx.lineTo(90,490);
			ctx.setLineWidth(3);
			ctx.setStrokeStyle('#5870FE')
			ctx.stroke()
		}, 
		// 绘制文字
		drawText(ctx) {
			let txt;
			if (this.type == 'doctor') {
				txt = '扫码查询附近药房'
			}
			else if (this.type == 'store') {
				txt = '扫码更多售后服务'
			}
			ctx.moveTo(90,460);
			ctx.setTextBaseline('middle');
			ctx.moveTo(240,460);
			ctx.setTextAlign('center')
			ctx.setFontSize(32);
			ctx.fillStyle = '#5870FE';
			ctx.fillText(txt, 240, 460);
		},
		//关闭弹窗销毁组件
		closePopup() {
			this.$emit('handleClosePopup',false)
		},
		//长按分享
		share() {
				// #ifdef APP-PLUS
				// TODO app 分享
				uni.share({
					provider: 'weixin',
					scene: 'WXSceneSession',
					type: 2,
					imageUrl: this.imgUrl,
					success: res => {
						console.log('success:' + JSON.stringify(res));
					},
					fail: err => {
						console.log('fail:' + JSON.stringify(err));
					}
				});
				// #endif
		}
		
	}
};
</script>

<style>
.share-img {
	display: block;
	width: 460rpx;
	height: 520rpx;
}	
.canvas-hide {
	position: fixed;
	/* left: 0;
	bottom: 0; */
	right: 100vw;
	bottom: 100vh;
	z-index: -9999;
	opacity: 0;
}
.image-hide {
	position: fixed;
	/* left: 0;
	bottom: 0; */
	left: 100vw;
	bottom: 100vh;
	z-index: -9999;
	opacity: 0;
}
</style>
