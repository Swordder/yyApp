<template>
	<view><web-view :src="activityUrl"></web-view></view>
</template>

<script>
import { signUrl } from '@/config/env.js';
export default {
	data() {
		return {
			activityUrl: ''
		};
	},
	onLoad() {
		let platform = 'yy-1';
		
		// #ifdef APP-PLUS
		platform = 'yy-2';
		// #endif
		
		// #ifdef MP-WEIXIN
		platform = 'yy-5';
		// #endif

		let redirect = '/pages/login/login';
		const queryStr = `?platform=${platform}&token=Bearer ${this.yy_app_user_info.token}&redirect=${redirect}`;

		this.activityUrl = signUrl + queryStr;
	}
};
</script>

<style lang="scss" scoped></style>
