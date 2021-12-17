<template>
	<view class="page-wrap">
		<web-view ref="webview" :src="link"></web-view>

	</view>
</template>

<script>
export default {
	data() {
		return {
			link: ''
		};
	},
	onShow() {
		// 对url参数解码, 避免特殊符号报错
		let URL = decodeURIComponent(this.$Route.query.link);
		const noTimestamp = this.$Route.query.notimestamp;

		if (!/^http/.test(URL)) {
			URL = 'http://' + URL;
		}

		// 处理带参问题
		if (!noTimestamp) {
			if (URL.indexOf('?') > -1) {
				URL = URL + '&_t=' + +new Date();
			} else {
				URL = URL + '?_t=' + +new Date();
			}
		}

		this.link = URL;
	},
	onReady() {
		
	}
};
</script>

<style lang="scss"></style>
