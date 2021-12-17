<template>
	<view class="u-flex u-flex-col u-row-center u-col-center" style="height: 100vh;">
		<!-- #ifdef APP-PLUS -->
		<u-button type="primary" v-if="showOpenBtn" @click="handleBtnClick">打开 优佳医app 观看直播</u-button>
		<u-button type="primary" v-else @click="handleBtnClick">下载 优佳医app 观看直播</u-button>
		<!-- #endif -->
	</view>
</template>

<script>
	
	// #ifdef APP-PLUS
	import TOOLS from '@/utils/openOtherApp.js';
	// #endif
	
	export default {
		data() {
			return {
				h5URL: 'http://doctor.youyao99.com/uniapp/',
				
				showOpenBtn: false
			};
		},
		
		onShow() {
			// #ifdef APP-PLUS
			if(TOOLS.checkApp()) {
				this.showOpenBtn = true;
			}
			// #endif
			
		},
		
		onLoad() {
			
			// #ifdef H5
			window.location.replace(this.h5URL);
			// #endif
			
		},
		
		methods: {
			handleBtnClick() {
				// #ifdef APP-PLUS
				TOOLS.launchApp();
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
