<template>
	<view><web-view :src="url"></web-view></view>
</template>

<script>
import { articleUrl } from '@/config/env.js';
export default {
	data() {
		return {
			url: ''
		};
	},
	onLoad() {
		this.url = articleUrl + `cureAreas?platform=1`;
	}
};
</script>

<style lang="scss" scoped></style>
