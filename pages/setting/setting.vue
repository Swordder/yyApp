<template>
	<view>
		
		<u-cell-group>
			<u-cell-item 
				v-for="(item,index) in list" 
				:icon="item.icon" 
				:title="item.title"
				@click="$Router.push(item.link)"
			></u-cell-item>
		</u-cell-group>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						icon: '',
						title: '用户反馈',
						link: '/pages/setting/feedback'
					},
					{
						icon: '',
						title: '关于我们',
						link: '/pages/aboutUs/aboutUs'
					},
					// #ifdef APP-PLUS
					{
						icon: '',
						title: '版本更新',
						link: '/pages/setting/version'
					},
					{
						icon: '',
						title: '隐私政策',
						link: `/pages/webview/webview?link=${encodeURIComponent('http://static.youyao99.com/permission-youyao.html')}`
					},
					{
						icon: '',
						title: '服务协议',
						link: `/pages/webview/webview?link=${encodeURIComponent('http://static.youyao99.com/protocol-youyao.html')}`
					},
					// #endif
				]
			};
		}
	}
</script>

<style lang="scss" scoped>

</style>
