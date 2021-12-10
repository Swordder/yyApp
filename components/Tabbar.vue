<template>
	<view>
		<u-tabbar :list="list" active-color="#5870FE"></u-tabbar>
	</view>
</template>
<script>
	export default {
		name:"Tabbar",
		data() {
			return {
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						pagePath:'/pages/index/index'
					},
					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						pagePath:'/pages/mine/mine'
					},
				],
			};
		}
	}
</script>
